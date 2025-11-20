import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import BackgroundScene from './background/NeuralNetwork';

const Hero = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();

    return (
        <section id="sobre" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10">
            <BackgroundScene />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 text-center max-w-4xl mx-auto"
                >
                    <div className="inline-block mb-4">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${isDark ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'}`}>
                            {t.hero.role}
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent leading-tight tracking-tight">
                        Pedro H. S. Soares
                    </h1>

                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-light ${isDark ? 'text-gray-200' : 'text-gray-800'} transition-colors duration-300`}>
                        {t.hero.title} <span className="font-semibold text-cyan-500">{t.hero.impact}</span>
                    </h2>

                    <p className={`text-lg sm:text-xl md:text-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed max-w-2xl mx-auto px-4 transition-colors duration-300 whitespace-pre-line`}>
                        {t.hero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button
                            onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-1"
                        >
                            {t.hero.viewProjects}
                        </button>
                        <button
                            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                            className={`px-8 py-4 rounded-full border font-semibold text-lg transition-all ${isDark ? 'border-white/20 hover:bg-white/10 text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-900'}`}
                        >
                            {t.hero.contact}
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
