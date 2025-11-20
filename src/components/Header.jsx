import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const ThemeSwitcher = () => {
    const { isDark, toggleTheme } = useTheme();

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

const Header = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();
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

                <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                    {navItems.map(item => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item)}
                            className={`text-sm ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-500'} transition-colors capitalize font-medium`}
                        >
                            {t.nav[item]}
                        </button>
                    ))}
                    <div className="flex items-center gap-2 ml-4 border-l pl-4 border-gray-200 dark:border-gray-700">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </div>
                </nav>

                <div className="md:hidden flex items-center gap-4">
                    <LanguageSwitcher />
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
                                className={`block w-full text-left py-2 ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-500'} transition-colors capitalize font-medium`}
                            >
                                {t.nav[item]}
                            </button>
                        ))}
                    </nav>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
