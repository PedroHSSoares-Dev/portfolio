import React, { createContext, useContext, useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { title } from 'framer-motion/client';

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setIsDark(saved === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme Switcher Component
const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-500" style={{ transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)' }}>
        {isDark ? (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" className="text-cyan-400" />
        ) : (
          <>
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="currentColor" className="text-yellow-400" />
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-yellow-400" />
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-yellow-400" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-yellow-400" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-yellow-400" />
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-yellow-400" />
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-yellow-400" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-yellow-400" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-yellow-400" />
          </>
        )}
      </svg>
    </button>
  );
};

// K-Means Points Component
const KMeansPoints = () => {
  const { isDark } = useContext(ThemeContext);
  const pointsRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const velocities = useRef([]);

  const clusterColorsDark = [
    new THREE.Color('#00ffff'),
    new THREE.Color('#0080ff'),
    new THREE.Color('#ff00ff'),
    new THREE.Color('#00d4ff')
  ];

  const clusterColorsLight = [
    new THREE.Color('#0066cc'),
    new THREE.Color('#0033aa'),
    new THREE.Color('#9900cc'),
    new THREE.Color('#0088cc')
  ];

  const clusterColors = isDark ? clusterColorsDark : clusterColorsLight;

  const { positions, colors, originalPositions } = useMemo(() => {
    const count = 10000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    velocities.current = new Array(count * 3).fill(0);

    const clusters = 4;
    const clusterCenters = [
      [-2.5, 2, 0],
      [2.5, 2, 0],
      [-2.5, -2, 0],
      [2.5, -2, 0]
    ];

    for (let i = 0; i < count; i++) {
      const cluster = i % clusters;
      const center = clusterCenters[cluster];
      const spread = 1.5;

      const x = center[0] + (Math.random() - 0.5) * spread;
      const y = center[1] + (Math.random() - 0.5) * spread;
      const z = center[2] + (Math.random() - 0.5) * spread * 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      const color = clusterColors[cluster];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, colors: col, originalPositions: orig };
  }, [clusterColors]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const mouse3D = new THREE.Vector3(mousePos.current.x * 4, mousePos.current.y * 4, 0);

    for (let i = 0; i < positions.length; i += 3) {
      const px = positions[i];
      const py = positions[i + 1];
      const pz = positions[i + 2];

      const point = new THREE.Vector3(px, py, pz);
      const dist = point.distanceTo(mouse3D);
      const force = Math.max(0, 1 - dist / 2.5);

      if (force > 0) {
        const direction = point.clone().sub(mouse3D).normalize();
        velocities.current[i] += direction.x * force * 0.03;
        velocities.current[i + 1] += direction.y * force * 0.03;
        velocities.current[i + 2] += direction.z * force * 0.03;
      }

      velocities.current[i] *= 0.92;
      velocities.current[i + 1] *= 0.92;
      velocities.current[i + 2] *= 0.92;

      positions[i] += velocities.current[i];
      positions[i + 1] += velocities.current[i + 1];
      positions[i + 2] += velocities.current[i + 2];

      const ox = originalPositions[i];
      const oy = originalPositions[i + 1];
      const oz = originalPositions[i + 2];

      positions[i] += (ox - positions[i]) * 0.08;
      positions[i + 1] += (oy - positions[i + 1]) * 0.08;
      positions[i + 2] += (oz - positions[i + 2]) * 0.08;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
    </Points>
  );
};

// 3D Scene Component
const Scene3D = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4], fov: 90 }}>
        <Suspense fallback={null}>
          <KMeansPoints />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Header Component
const Header = () => {
  const { isDark } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = ['sobre', 'experiencia', 'formacao', 'projetos', 'habilidades', 'contato'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg ${isDark ? 'bg-zinc-900/80 border-white/10' : 'bg-white/80 border-gray-200'} border-b transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
          Pedro H. S. Soares
        </div>
        
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`text-sm ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-500'} transition-colors capitalize`}
            >
              {item}
            </button>
          ))}
          <ThemeSwitcher />
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <ThemeSwitcher />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-500'} transition-colors`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`md:hidden backdrop-blur-lg ${isDark ? 'bg-zinc-900/95 border-white/10' : 'bg-white/95 border-gray-200'} border-b transition-colors duration-300`}
        >
          <nav className="px-4 py-4 space-y-3">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`block w-full text-left py-2 ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-500'} transition-colors capitalize`}
              >
                {item}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

// Section Wrapper
const Section = ({ id, children, className = '', stagger = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = stagger ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  } : {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={`px-4 sm:px-6 py-12 sm:py-16 md:py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

// Hero Section
const HeroSection = () => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <section id="sobre" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10">
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-zinc-900/40 via-zinc-900/60 to-zinc-900' : 'bg-gradient-to-b from-white/40 via-white/60 to-white'} z-[1] transition-colors duration-300`}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6 text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent leading-tight">
            Pedro Henrique Simão Soares
          </h1>
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl ${isDark ? 'text-gray-200' : 'text-gray-800'} transition-colors duration-300`}>Estudante de Data Science</h2>
          <p className={`text-lg sm:text-xl md:text-2xl ${isDark ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>Focado em transformar dados em insights acionáveis.</p>
          <p className={`text-sm sm:text-base md:text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed max-w-2xl mx-auto px-4 transition-colors duration-300`}>
            Estudante na FIAP, técnico em Desenvolvimento de Sistemas e entusiasta de IA, apaixonado por modelagem de dados, visualização e ETL. Buscando aplicar meu perfil analítico para gerar valor em projetos de tecnologia.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Experiencia Section
const ExperienciaSection = () => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <Section id="experiencia" className={`${isDark ? 'bg-zinc-900/50' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-8 sm:mb-12 transition-colors duration-300`}>Experiência Profissional</h2>
        <motion.div
          variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
          className={`backdrop-blur p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${isDark ? 'bg-zinc-800/50 border-cyan-400/20 hover:border-cyan-400/40' : 'bg-white border-cyan-400/30 hover:border-cyan-400/50 shadow-lg'}`}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-cyan-400">Estagiário em Dados</h3>
              <p className={`text-lg sm:text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} mt-1 transition-colors duration-300`}>WorkWise Consulting</p>
              <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-3 sm:mt-4 leading-relaxed transition-colors duration-300`}>
                Responsável pelo desenvolvimento de dashboards e pela implementação de processos de ETL para a empresa.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

// Formacao Section
const FormacaoSection = () => {
  const { isDark } = useContext(ThemeContext);
  const items = [
    { instituicao: 'FIAP', curso: 'CST em Data Science', periodo: 'fev/2025 – dez/2026' },
    { instituicao: 'ETEC', curso: 'Técnico em Desenvolvimento de Sistemas', periodo: 'jan/2023 – jun/2024' }
  ];

  return (
    <Section id="formacao">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-8 sm:mb-12 transition-colors duration-300`}>Formação</h2>
        <div className="space-y-4 sm:space-y-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
              className={`backdrop-blur p-5 sm:p-6 rounded-xl border transition-all duration-300 ${isDark ? 'bg-zinc-800/30 border-white/10 hover:border-cyan-400/30' : 'bg-white border-gray-200 hover:border-cyan-400/40 shadow-md'}`}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-cyan-400">{item.instituicao}</h3>
              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} mt-2 transition-colors duration-300`}>{item.curso}</p>
              <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'} text-xs sm:text-sm mt-1`}>{item.periodo}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// Projeto Card Component
const ProjetoCard = ({ title, badge, badgeTooltip, descricao, tags, githubUrl }) => {
  const { isDark } = useContext(ThemeContext);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ scale: 1.03 }}
      className={`backdrop-blur p-5 sm:p-6 rounded-xl border transition-all duration-300 ${isDark ? 'bg-zinc-800/50 border-white/10 hover:border-cyan-400/40' : 'bg-white border-gray-200 hover:border-cyan-400/50 shadow-lg'}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
        <h3 className={`text-xl sm:text-2xl font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'} transition-colors duration-300`}>{title}</h3>
        {badge && (
          <div 
            className="relative flex-shrink-0"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
              {badge}
            </span>
            {showTooltip && badgeTooltip && (
              <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap shadow-xl border border-cyan-400/30 z-10 ${isDark ? 'bg-zinc-900 text-gray-200' : 'bg-white text-gray-900'}`}>
                {badgeTooltip}
              </div>
            )}
          </div>
        )}
      </div>
      <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 transition-colors duration-300`}>{descricao}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm transition-all duration-300 ${isDark ? 'bg-cyan-400/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600 border border-cyan-200'}`}>
            {tag}
          </span>
        ))}
      </div>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm sm:text-base text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        Ver Repositório
      </a>
    </motion.div>
  );
};

// Projetos Section
const ProjetosSection = () => {
  const { isDark } = useContext(ThemeContext);
  const projetos = [
    {
      title: 'Challenge ClickBus (FIAP)',
      badge: '🏆 TOP 3 / 140',
      badgeTooltip: 'Resultado final em 08/11',
      descricao: 'Análise e storytelling com dados reais, incluindo predição e segmentação de clientes.',
      tags: ['Python', 'Storytelling', 'Machine Learning', 'RFM', 'K-Means', 'XGBoost'],
      githubUrl: 'https://github.com/PedroHSSoares-Dev/ClickBus'
    },
    {
      title: 'Real-Time Fraud Detection',
      badge: '🛡️ 71.6% RECALL',
      badgeTooltip: 'Detecção de fraude em tempo real',
      descricao: 'Sistema completo com Flask API, PostgreSQL, Docker e ML (Isolation Forest). Detecta teleporte, card testing e anomalias.',
      tags: ['Python', 'Flask', 'PostgreSQL', 'Docker', 'ML', 'AWS'],
      githubUrl: 'https://github.com/PedroHSSoares-Dev/fraud-detection-realtime'
    },
    {
      title: 'Sistema Bancário Simples (CRUD com Docker)',
      descricao: 'Desenvolvimento de um sistema bancário simples utilizando operações CRUD, containerizado com Docker para a persistência e escalabilidade.',
      tags: ['Python','Docker', 'CRUD', 'Backend'],
      githubUrl: 'https://github.com/PedroHSSoares-Dev/crud'
    }
  ];

  return (
    <Section id="projetos" stagger className={`${isDark ? 'bg-zinc-900/50' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-8 sm:mb-12 transition-colors duration-300`}>Projetos Relevantes</h2>
        <motion.div variants={{ hidden: {}, visible: {} }} className="grid sm:grid-cols-1 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {projetos.map((projeto, idx) => (
            <ProjetoCard key={idx} {...projeto} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

// Habilidades Section
const HabilidadesSection = () => {
  const { isDark } = useContext(ThemeContext);
  const habilidades = [
    'SQL', 'Python', 'ETL', 'Modelagem de Dados',
    'Análise de Dados', 'Data Viz', 'Git/GitHub', 'Google Colab',
    'Jupyter Notebook', 'Docker', 'AWS', 'Pandas', 'NumPy', 'Matplotlib',
    'Seaborn'
  ];

  return (
    <Section id="habilidades">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-8 sm:mb-12 transition-colors duration-300`}>Habilidades</h2>
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="flex flex-wrap gap-2 sm:gap-3"
        >
          {habilidades.map(skill => (
            <motion.span
              key={skill}
              variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
              whileHover={{ scale: 1.05 }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-300 text-xs sm:text-sm ${isDark ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/20' : 'bg-cyan-50 text-cyan-600 border-cyan-200 hover:bg-cyan-100'}`}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

// Contato Section
const ContatoSection = () => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <Section id="contato" className={`${isDark ? 'bg-zinc-900/50' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-6 sm:mb-8 transition-colors duration-300`}>Vamos Conversar?</h2>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:pedrohssoares0@gmail.com"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Enviar e-mail
            </a>

            <a
              href="https://wa.me/5511956309230"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          <div className="flex justify-center gap-6 mt-8">
            <a
              href="https://www.linkedin.com/in/pedrohssoares/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://github.com/PedroHSSoares-Dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

// Footer
const Footer = () => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <footer className={`border-t py-8 transition-colors duration-300 ${isDark ? 'bg-black border-white/10' : 'bg-gray-100 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
        <p>© 2025 Pedro Henrique Simão Soares. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

// Main App Component
const AppContent = () => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <div className={`${isDark ? 'bg-zinc-900 text-gray-200' : 'bg-white text-gray-900'} min-h-screen font-['Inter'] transition-colors duration-300`}>
      <Header />
      <HeroSection />
      <ExperienciaSection />
      <FormacaoSection />
      <ProjetosSection />
      <HabilidadesSection />
      <ContatoSection />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}