import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

const Experience = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();

    return (
        <section id="experiencia" className={`py-20 ${isDark ? 'bg-zinc-900/50' : 'bg-gray-50'} transition-colors duration-300`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-12 transition-colors duration-300 flex items-center gap-3`}>
                    <span className="bg-cyan-500 h-8 w-1 rounded-full"></span>
                    {t.experience.title}
                </h2>

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`relative pl-8 border-l-2 ${isDark ? 'border-zinc-700' : 'border-gray-200'}`}
                >
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 ${isDark ? 'border-zinc-900 bg-cyan-500' : 'border-white bg-cyan-500'}`}></div>

                    <div className={`p-6 rounded-2xl border transition-all duration-300 ${isDark ? 'bg-zinc-800/50 border-white/5 hover:border-cyan-500/30' : 'bg-white border-gray-200 hover:border-cyan-500/30 shadow-sm hover:shadow-md'}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-cyan-500">{t.experience.role}</h3>
                                <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t.experience.company}</p>
                            </div>
                            <span className={`text-sm px-3 py-1 rounded-full ${isDark ? 'bg-zinc-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                {t.experience.current}
                            </span>
                        </div>

                        <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mb-4`}>
                            {t.experience.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {['Power BI', 'SQL', 'ETL', 'Data Analysis'].map(skill => (
                                <span key={skill} className={`text-xs px-2 py-1 rounded border ${isDark ? 'border-cyan-500/20 text-cyan-400 bg-cyan-500/5' : 'border-cyan-200 text-cyan-700 bg-cyan-50'}`}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
