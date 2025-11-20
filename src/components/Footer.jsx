import React from 'react';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

const Footer = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();

    return (
        <footer className={`border-t py-8 transition-colors duration-300 ${isDark ? 'bg-black border-white/10' : 'bg-gray-100 border-gray-200'}`}>
            <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
                <p>{t.footer.rights}</p>
            </div>
        </footer>
    );
};

export default Footer;
