import React from 'react';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();
    const { isDark } = useTheme();

    return (
        <button
            onClick={toggleLanguage}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
            aria-label={`Switch to ${language === 'pt' ? 'English' : 'Portuguese'}`}
            title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
        >
            {language === 'pt' ? (
                // Minimalist Brazil Flag
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="4" width="20" height="16" rx="2" fill="#009c3b" />
                    <path d="M12 20L22 12L12 4L2 12L12 20Z" fill="#ffdf00" />
                    <circle cx="12" cy="12" r="3.5" fill="#002776" />
                    <path d="M10 13C10 13 11 11 14 11" stroke="white" strokeWidth="0.5" strokeLinecap="round" />
                </svg>
            ) : (
                // Minimalist US Flag
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="4" width="20" height="16" rx="2" fill="#b22234" />
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke={isDark ? "#333" : "#ccc"} strokeWidth="0.5" />
                    <path d="M2 6H22M2 10H22M2 14H22M2 18H22" stroke="white" strokeWidth="2" />
                    <rect x="2" y="4" width="9" height="9" fill="#3c3b6e" />
                    <path d="M3.5 5.5H7.5M3.5 7H7.5M3.5 8.5H7.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeDasharray="0.1 1.5" />
                </svg>
            )}
        </button>
    );
};

export default LanguageSwitcher;
