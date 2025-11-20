import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

const Education = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();

    return (
        <section id="formacao" className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-12 transition-colors duration-300 flex items-center gap-3`}>
                    <span className="bg-violet-500 h-8 w-1 rounded-full"></span>
                    {t.education.title}
                </h2>

                <div className="grid gap-6">
                    {t.education.items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-6 rounded-xl border transition-all duration-300 group ${isDark ? 'bg-zinc-800/30 border-white/10 hover:bg-zinc-800/50 hover:border-violet-500/30' : 'bg-white border-gray-200 hover:border-violet-500/30 shadow-sm hover:shadow-md'}`}
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <div>
                                    <h3 className={`text-xl font-bold ${isDark ? 'text-gray-200 group-hover:text-violet-400' : 'text-gray-900 group-hover:text-violet-600'} transition-colors`}>{item.institution}</h3>
                                    <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.course}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`block text-sm font-medium ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>{t.education.status[item.statusKey]}</span>
                                    <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.periodo}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
