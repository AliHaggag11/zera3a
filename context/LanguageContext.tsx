"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type LanguageContextType = {
  lang: 'en' | 'ar';
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  toggleLanguage: () => {} // Default no-op function
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  // Update document direction whenever language changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = useCallback(() => {
    setLang(currentLang => currentLang === 'en' ? 'ar' : 'en');
  }, []);

  const value = {
    lang,
    toggleLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 