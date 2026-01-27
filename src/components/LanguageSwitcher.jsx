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
                // Brazil Flag - improved
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="20" rx="2" fill="#009c3b" />
                    <path d="M14 2L26 10L14 18L2 10L14 2Z" fill="#ffdf00" />
                    <circle cx="14" cy="10" r="4" fill="#002776" />
                    <path d="M10.5 11.5C10.5 11.5 12 9 17.5 9.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                    <circle cx="11.5" cy="10" r="0.4" fill="white" />
                    <circle cx="13" cy="8.5" r="0.3" fill="white" />
                    <circle cx="15" cy="9" r="0.35" fill="white" />
                    <circle cx="16.5" cy="10.5" r="0.3" fill="white" />
                    <circle cx="14.5" cy="11" r="0.25" fill="white" />
                </svg>
            ) : (
                // USA Flag - improved
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="20" rx="2" fill="#bf0a30" />
                    <rect y="1.54" width="28" height="1.54" fill="white" />
                    <rect y="4.62" width="28" height="1.54" fill="white" />
                    <rect y="7.69" width="28" height="1.54" fill="white" />
                    <rect y="10.77" width="28" height="1.54" fill="white" />
                    <rect y="13.85" width="28" height="1.54" fill="white" />
                    <rect y="16.92" width="28" height="1.54" fill="white" />
                    <rect width="12" height="10.77" fill="#002868" />
                    {/* Stars - simplified 3x3 grid */}
                    <circle cx="2" cy="1.8" r="0.6" fill="white" />
                    <circle cx="4" cy="1.8" r="0.6" fill="white" />
                    <circle cx="6" cy="1.8" r="0.6" fill="white" />
                    <circle cx="8" cy="1.8" r="0.6" fill="white" />
                    <circle cx="10" cy="1.8" r="0.6" fill="white" />
                    <circle cx="3" cy="3.6" r="0.6" fill="white" />
                    <circle cx="5" cy="3.6" r="0.6" fill="white" />
                    <circle cx="7" cy="3.6" r="0.6" fill="white" />
                    <circle cx="9" cy="3.6" r="0.6" fill="white" />
                    <circle cx="2" cy="5.4" r="0.6" fill="white" />
                    <circle cx="4" cy="5.4" r="0.6" fill="white" />
                    <circle cx="6" cy="5.4" r="0.6" fill="white" />
                    <circle cx="8" cy="5.4" r="0.6" fill="white" />
                    <circle cx="10" cy="5.4" r="0.6" fill="white" />
                    <circle cx="3" cy="7.2" r="0.6" fill="white" />
                    <circle cx="5" cy="7.2" r="0.6" fill="white" />
                    <circle cx="7" cy="7.2" r="0.6" fill="white" />
                    <circle cx="9" cy="7.2" r="0.6" fill="white" />
                    <circle cx="2" cy="9" r="0.6" fill="white" />
                    <circle cx="4" cy="9" r="0.6" fill="white" />
                    <circle cx="6" cy="9" r="0.6" fill="white" />
                    <circle cx="8" cy="9" r="0.6" fill="white" />
                    <circle cx="10" cy="9" r="0.6" fill="white" />
                </svg>
            )}
        </button>
    );
};

export default LanguageSwitcher;
