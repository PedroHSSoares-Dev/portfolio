import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('pt');

    useEffect(() => {
        const saved = localStorage.getItem('language');
        if (saved) setLanguage(saved);
    }, []);

    // Update HTML lang attribute when language changes
    useEffect(() => {
        const htmlElement = document.getElementById('html-root');
        if (htmlElement) {
            htmlElement.lang = language === 'pt' ? 'pt-BR' : 'en-US';
        }
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => {
            const newLang = prev === 'pt' ? 'en' : 'pt';
            localStorage.setItem('language', newLang);
            return newLang;
        });
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

