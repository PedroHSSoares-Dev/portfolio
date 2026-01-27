import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { formatPeriod, calculateSemesterProgress } from '../utils/dateUtils';

const ProgressPill = ({ current, total, isDark }) => {
    const progress = (current / total) * 100;
    const isComplete = current >= total;

    return (
        <div className="flex items-center gap-2">
            <div className={`relative w-16 h-2 rounded-full overflow-hidden ${isDark ? 'bg-zinc-700' : 'bg-gray-200'}`}>
                <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-green-500' : 'bg-violet-500'}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isComplete
                ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
                : (isDark ? 'bg-violet-500/20 text-violet-400' : 'bg-violet-100 text-violet-700')
                }`}>
                {current}/{total}
            </span>
        </div>
    );
};

const Education = () => {
    const { isDark } = useTheme();
    const { t, language } = useLanguage();

    return (
        <section id="formacao" className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-12 transition-colors duration-300 flex items-center gap-3`}>
                    <span className="bg-violet-500 h-8 w-1 rounded-full"></span>
                    {t.education.title}
                </h2>

                <div className="grid gap-6">
                    {t.education.items.map((item, idx) => {
                        const period = formatPeriod(item.startDate, item.endDate, language);
                        const semesterProgress = calculateSemesterProgress(item.startDate, item.endDate, item.totalSemesters);

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-6 rounded-xl border transition-all duration-300 group ${isDark ? 'bg-zinc-800/30 border-white/10 hover:bg-zinc-800/50 hover:border-violet-500/30' : 'bg-white border-gray-200 hover:border-violet-500/30 shadow-sm hover:shadow-md'}`}
                            >
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <div>
                                        <h3 className={`text-xl font-bold ${isDark ? 'text-gray-200 group-hover:text-violet-400' : 'text-gray-900 group-hover:text-violet-600'} transition-colors`}>{item.institution}</h3>
                                        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.course}</p>
                                    </div>
                                    <div className="flex flex-col items-start sm:items-end gap-2">
                                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{period}</span>
                                        <ProgressPill
                                            current={semesterProgress.current}
                                            total={semesterProgress.total}
                                            isDark={isDark}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Education;
