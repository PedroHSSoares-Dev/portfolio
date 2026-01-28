import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { AnimatedTitle } from '../utils/animations';

const SkillCategory = ({ title, skills, color }) => {
    const { isDark } = useTheme();

    return (
        <div className="mb-8">
            <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{title}</h3>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill, idx) => (
                    <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 cursor-default ${isDark ? `bg-${color}-500/10 text-${color}-400 border-${color}-500/20 hover:bg-${color}-500/20` : `bg-${color}-50 text-${color}-700 border-${color}-200 hover:bg-${color}-100`}`}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

const Skills = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();

    const categories = [
        {
            title: t.skills.categories.ds,
            skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'K-Means', 'Isolation Forest', 'TensorFlow'],
            color: 'cyan'
        },
        {
            title: t.skills.categories.de,
            skills: ['SQL', 'PostgreSQL', 'Docker', 'Flask', 'FastAPI', 'ETL Pipelines', 'AWS'],
            color: 'blue'
        },
        {
            title: t.skills.categories.tools,
            skills: ['Git/GitHub', 'Power BI', 'Matplotlib', 'Seaborn', 'Jupyter Notebook', 'Google Colab'],
            color: 'violet'
        }
    ];

    return (
        <section id="habilidades" className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <AnimatedTitle>
                    <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-12 transition-colors duration-300 flex items-center gap-3`}>
                        <span className="bg-violet-500 h-8 w-1 rounded-full"></span>
                        {t.skills.title}
                    </h2>
                </AnimatedTitle>

                <div className={`p-8 rounded-2xl border ${isDark ? 'bg-zinc-800/30 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                    {categories.map((cat, idx) => (
                        <SkillCategory key={idx} {...cat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
