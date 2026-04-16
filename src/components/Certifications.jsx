import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { AnimatedTitle } from '../utils/animations';

const GenericCertIcon = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
            <linearGradient id="certGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#certGrad)" />
        <path d="M50 25 L56 42 L74 42 L60 53 L65 70 L50 60 L35 70 L40 53 L26 42 L44 42 Z" fill="white" opacity="0.9" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const CertificationCard = ({ cert, idx, t }) => {
    const { isDark } = useTheme();
    const isCompleted = cert.status === 'completed';
    const progress = isCompleted ? 100 : cert.progress;
    const statusLabel = t.certifications.status[cert.status];

    const cardClass = `relative p-6 rounded-2xl border transition-all duration-300 group flex flex-col ${
        isDark
            ? 'bg-zinc-800/30 border-white/10 hover:bg-zinc-800/50 hover:border-cyan-500/30'
            : 'bg-white border-gray-200 hover:border-cyan-500/30 shadow-sm hover:shadow-md hover:shadow-cyan-500/10'
    } ${isCompleted ? 'cursor-pointer' : ''}`;

    const cardContent = (
        <>
            {/* Status badge */}
            <div className="absolute top-4 right-4">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    isCompleted
                        ? (isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700')
                        : (isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700')
                }`}>
                    {statusLabel}
                </span>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-5 mt-2">
                <div className="w-32 h-32 shrink-0">
                    {cert.logoUrl
                        ? <img src={cert.logoUrl} alt={cert.name} className="w-32 h-32 min-w-[128px] min-h-[128px] object-contain" />
                        : <GenericCertIcon />
                    }
                </div>
            </div>

            {/* Name */}
            <h3 className={`text-base font-bold text-center mb-1 leading-snug pr-2 ${
                isDark ? 'text-gray-200 group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'
            } transition-colors`}>
                {cert.name}
            </h3>

            {/* Issuer + code */}
            <p className={`text-sm text-center mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {cert.issuer}
            </p>
            <p className={`text-xs text-center mb-4 font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {cert.code}
            </p>

            {/* Progress bar */}
            <div className="mt-auto">
                <div className="flex justify-between items-center mb-1.5">
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {t.certifications.progressLabel}
                    </span>
                    <span className={`text-xs font-semibold ${
                        isCompleted
                            ? (isDark ? 'text-cyan-400' : 'text-cyan-600')
                            : (isDark ? 'text-amber-400' : 'text-amber-600')
                    }`}>
                        {progress}%
                    </span>
                </div>
                <div className={`relative w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-zinc-700' : 'bg-gray-200'}`}>
                    <motion.div
                        className={`absolute left-0 top-0 h-full rounded-full ${
                            isCompleted
                                ? 'bg-cyan-500'
                                : 'bg-gradient-to-r from-cyan-500 to-blue-400'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 + 0.3, ease: 'easeOut' }}
                    />
                </div>

                {/* View credential footer */}
                {isCompleted && (
                    <div className={`mt-3 flex items-center justify-center gap-1.5 text-sm font-medium ${
                        isDark ? 'text-cyan-400' : 'text-cyan-600'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                        <span>{t.certifications.viewCredential}</span>
                        <ExternalLinkIcon />
                    </div>
                )}
            </div>
        </>
    );

    const motionProps = {
        layout: true,
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: idx * 0.1, duration: 0.4 },
        whileHover: { y: -4 },
    };

    if (isCompleted && cert.credentialUrl) {
        return (
            <motion.a
                {...motionProps}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${cert.name} — ${t.certifications.viewCredential}`}
                className={cardClass}
            >
                {cardContent}
            </motion.a>
        );
    }

    return (
        <motion.div {...motionProps} className={cardClass}>
            {cardContent}
        </motion.div>
    );
};

const Certifications = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState('all');

    const items = t.certifications.items;
    const issuers = ['all', ...Array.from(new Set(items.map(c => c.issuer)))];
    const filtered = activeFilter === 'all' ? items : items.filter(c => c.issuer === activeFilter);

    return (
        <section id="certificacoes" className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <AnimatedTitle>
                    <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-12 transition-colors duration-300 flex items-center gap-3`}>
                        <span className="bg-cyan-500 h-8 w-1 rounded-full"></span>
                        {t.certifications.title}
                    </h2>
                </AnimatedTitle>

                {/* Filter chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {issuers.map(issuer => {
                        const isActive = activeFilter === issuer;
                        const label = issuer === 'all' ? t.certifications.filterAll : issuer;
                        return (
                            <button
                                key={issuer}
                                onClick={() => setActiveFilter(issuer)}
                                aria-pressed={isActive}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                                    isActive
                                        ? 'bg-cyan-500 border-cyan-500 text-white shadow-sm shadow-cyan-500/20'
                                        : isDark
                                            ? 'bg-transparent border-white/20 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400'
                                            : 'bg-transparent border-gray-300 text-gray-600 hover:border-cyan-500/50 hover:text-cyan-600'
                                }`}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                {/* Cards grid */}
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((cert, idx) => (
                            <CertificationCard
                                key={cert.id}
                                cert={cert}
                                idx={idx}
                                t={t}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;
