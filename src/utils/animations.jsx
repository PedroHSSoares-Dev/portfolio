import { motion } from 'framer-motion';

/**
 * Wraps a section with subtle fade-in animation when it enters the viewport
 */
export const AnimatedSection = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/**
 * Wraps section titles with animation
 */
export const AnimatedTitle = ({ children, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/**
 * Staggered children animation for lists/grids
 */
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};
