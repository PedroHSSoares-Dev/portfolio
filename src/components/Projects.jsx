import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { AnimatedTitle } from '../utils/animations';

const ProjectCard = ({ title, badge, badgeTooltip, description, tags, githubUrl, impact, viewCodeLabel, impactLabel }) => {
    const { isDark } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative p-6 rounded-2xl border transition-all duration-300 h-full flex flex-col ${isDark ? 'bg-zinc-800/40 border-white/10 hover:border-cyan-500/40 hover:bg-zinc-800/60' : 'bg-white border-gray-200 hover:border-cyan-500/40 shadow-sm hover:shadow-xl'}`}
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{title}</h3>
                {badge && (
                    <div className="relative group/badge flex-shrink-0 ml-3">
                        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-cyan-500/20 whitespace-nowrap">
                            {badge}
                        </span>
                        {badgeTooltip && (
                            <div className={`absolute right-0 top-full mt-2 w-max px-3 py-2 rounded-lg text-xs shadow-xl border z-20 opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none ${isDark ? 'bg-zinc-900 border-white/10 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                                {badgeTooltip}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 flex-grow leading-relaxed`}>
                {description}
            </p>

            {impact && (
                <div className={`mb-6 p-3 rounded-lg ${isDark ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-cyan-50 border border-cyan-100'}`}>
                    <p className={`text-sm font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                        {impactLabel} <span className="font-normal opacity-90">{impact}</span>
                    </p>
                </div>
            )}

            <div className="space-y-4 mt-auto">
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${isDark ? 'bg-white/5 text-gray-300 border border-white/5' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                            {tag}
                        </span>
                    ))}
                </div>

                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-900'}`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        {viewCodeLabel}
                    </a>
                )}
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();
    const [showAll, setShowAll] = useState(false);

    // Add githubUrl to translation items
    const projectsWithLinks = t.projects.items.map((item, index) => {
        const urls = [
            'https://github.com/PedroHSSoares-Dev/ClickBus',
            'https://github.com/PedroHSSoares-Dev/fraud-detection-realtime',
            'https://github.com/PedroHSSoares-Dev/aws-ccp-simulator',
            'https://github.com/PedroHSSoares-Dev/crud'
        ];
        return { ...item, githubUrl: urls[index] };
    });

    const visibleProjects = showAll ? projectsWithLinks : projectsWithLinks.slice(0, 3);
    const hasMoreProjects = projectsWithLinks.length > 3;

    return (
        <section id="projetos" className={`py-20 ${isDark ? 'bg-zinc-900/50' : 'bg-gray-50'} transition-colors duration-300`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <AnimatedTitle>
                    <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-12 transition-colors duration-300 flex items-center gap-3`}>
                        <span className="bg-blue-500 h-8 w-1 rounded-full"></span>
                        {t.projects.title}
                    </h2>
                </AnimatedTitle>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleProjects.map((projeto, idx) => (
                        <ProjectCard
                            key={idx}
                            {...projeto}
                            viewCodeLabel={t.projects.viewCode}
                            impactLabel={t.projects.impactLabel}
                        />
                    ))}
                </div>

                {hasMoreProjects && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-1"
                        >
                            {showAll ? t.projects.showLess : t.projects.showMore}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
