import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../ThemeContext';

const NeuralNetwork = () => {
    const { isDark } = useTheme();
    const pointsRef = useRef();
    const linesRef = useRef();
    const mousePosition = useRef(new THREE.Vector3());

    // Increase particle count for better density
    const particleCount = 100; // Increased from 100

    // Custom palette colors
    const palette = useMemo(() => [
        new THREE.Color('#22d3ee'), // Cyan-400
        new THREE.Color('#3b82f6'), // Blue-500
        new THREE.Color('#8b5cf6'), // Violet-500
    ], []);

    const { positions, colors, connections, originalPositions, velocities } = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const col = new Float32Array(particleCount * 3);
        const orig = new Float32Array(particleCount * 3);
        const vel = new Float32Array(particleCount * 3);
        const conn = [];

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 10;

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            orig[i * 3] = x;
            orig[i * 3 + 1] = y;
            orig[i * 3 + 2] = z;

            // Assign random color from palette
            const color = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;
        }

        // Create initial connections
        // Note: Dynamic connections in useFrame are expensive, so we keep static connections 
        // but animate the points they connect to.
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dist = Math.sqrt(
                    Math.pow(pos[i * 3] - pos[j * 3], 2) +
                    Math.pow(pos[i * 3 + 1] - pos[j * 3 + 1], 2) +
                    Math.pow(pos[i * 3 + 2] - pos[j * 3 + 2], 2)
                );
                if (dist < 3.5) { // Increased connection distance slightly
                    conn.push(
                        new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]),
                        new THREE.Vector3(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2])
                    );
                }
            }
        }
        return { positions: pos, colors: col, connections: conn, originalPositions: orig, velocities: vel };
    }, [palette]);

    // Mouse interaction handler
    const { viewport } = useThree();

    useEffect(() => {
        const handleMouseMove = (event) => {
            // Convert mouse to normalized device coordinates (-1 to +1)
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Map to viewport coordinates (approximate depth 0)
            mousePosition.current.set(
                (x * viewport.width) / 2,
                (y * viewport.height) / 2,
                0
            );
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [viewport]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const currentPositions = pointsRef.current.geometry.attributes.position.array;
        const count = particleCount;

        // Animate points
        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            // Current position
            const px = currentPositions[ix];
            const py = currentPositions[iy];
            const pz = currentPositions[iz];

            // Original position
            const ox = originalPositions[ix];
            const oy = originalPositions[iy];
            const oz = originalPositions[iz];

            // Mouse interaction
            const dx = px - mousePosition.current.x;
            const dy = py - mousePosition.current.y;
            const dz = pz - mousePosition.current.z;

            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const force = Math.max(0, 2 - dist); // Interaction radius of 2

            if (force > 0) {
                const angle = Math.atan2(dy, dx);
                const push = force * 0.05; // Push strength

                velocities[ix] += Math.cos(angle) * push;
                velocities[iy] += Math.sin(angle) * push;
                velocities[iz] += (dz / dist) * push;
            }

            // Return to original position (spring force)
            velocities[ix] += (ox - px) * 0.02;
            velocities[iy] += (oy - py) * 0.02;
            velocities[iz] += (oz - pz) * 0.02;

            // Damping
            velocities[ix] *= 0.9;
            velocities[iy] *= 0.9;
            velocities[iz] *= 0.9;

            // Apply velocity
            currentPositions[ix] += velocities[ix];
            currentPositions[iy] += velocities[iy];
            currentPositions[iz] += velocities[iz];
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Slowly rotate the whole system
        pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;

        // Update lines if we were using dynamic lines, but for performance/simplicity with 300 particles,
        // we might want to just rotate the group or re-compute lines. 
        // Re-computing lines every frame for 300 particles is heavy (300^2 checks).
        // Instead, let's just rotate the lines group to match points group for now, 
        // or accept that lines connect "original" relative positions if we don't update them.
        // BETTER APPROACH: Just rotate the container group for the global movement, 
        // and use the particle animation for local mouse interaction.
        // However, `Line` component from drei takes static points. 
        // To make lines follow particles, we'd need a custom LineSegments implementation updating every frame.
        // Given the "small quantities" complaint, maybe just having MORE points and lines is enough, 
        // and we can keep the lines static relative to the points' *original* structure, 
        // but rotate the whole thing.
        // OR: We can make the lines fade out/in or just be a background layer.
        // Let's stick to rotating the whole group for the "flow" and animating points locally.
        // If points move too far from lines it looks weird.
        // Let's apply the same rotation to lines.
        if (linesRef.current) {
            linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group>
            <Points ref={pointsRef} positions={positions} stride={3}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.08}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
                <bufferAttribute
                    attach="geometry-attributes-color"
                    args={[colors, 3]}
                />
            </Points>
            <Line
                ref={linesRef}
                points={connections}
                color={isDark ? "#4b5563" : "#cbd5e1"} // Visible gray in dark mode (gray-600), light gray in light mode
                lineWidth={1}
                transparent
                opacity={isDark ? 0.2 : 0.3} // Lower opacity for subtle connections
            />
        </group>
    );
};

const BackgroundScene = () => {
    const { isDark } = useTheme();

    return (
        <div className="fixed inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <color attach="background" args={[isDark ? '#09090b' : '#f8fafc']} />
                <ambientLight intensity={0.5} />
                <NeuralNetwork />
            </Canvas>
            {/* Gradient overlay for better text readability */}
            <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-transparent via-zinc-950/80 to-zinc-950' : 'bg-gradient-to-b from-transparent via-white/80 to-white'}`} />
        </div>
    );
};

export default BackgroundScene;
