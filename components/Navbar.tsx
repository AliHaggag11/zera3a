"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type NavLink = {
  id: string;
  label: {
    ar: string;
    en: string;
  };
};

const links: NavLink[] = [
  { id: 'home', label: { ar: 'الرئيسية', en: 'Home' } },
  { id: 'features', label: { ar: 'المميزات', en: 'Features' } },
  { id: 'prices', label: { ar: 'الأسعار', en: 'Prices' } },
  { id: 'pricing', label: { ar: 'الباقات', en: 'Plans' } },
  { id: 'contact', label: { ar: 'تواصل معنا', en: 'Contact' } },
];

type NavbarProps = {
  variant?: 'full' | 'simple';
};

export default function Navbar({ variant = 'full' }: NavbarProps) {
  const { lang, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();
  const router = useRouter();
  const isPricesPage = pathname === '/prices';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Close menu before scrolling
      setIsOpen(false);
      
      // Add a small delay to allow the menu to close smoothly
      setTimeout(() => {
        const navHeight = 64; // Height of the navbar
        const sectionTop = section.offsetTop - navHeight;
        
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
        
        setActiveSection(sectionId);
      }, 100);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Close menu on resize (if screen becomes larger)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) { // 768px is the md breakpoint
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
        border-b border-gray-200/20 dark:border-gray-700/20`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <Logo />
              </motion.div>
            </Link>

            {/* Only show nav items if variant is 'full' */}
            {variant === 'full' && (
              <div className="hidden md:flex items-center gap-6">
                {links.map((link) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${activeSection === link.id
                        ? 'text-[#3A8B50] bg-[#3A8B50]/10'
                        : 'text-gray-700 hover:text-[#3A8B50] hover:bg-[#3A8B50]/5 dark:text-gray-300'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label[lang]}
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Back button - only show in simple variant */}
            {variant === 'simple' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800
                  text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{lang === 'ar' ? 'العودة' : 'Back'}</span>
              </motion.button>
            )}

            {/* Language Toggle - always show */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 
                text-gray-700 dark:text-gray-300 text-sm font-medium
                hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>

            {/* Only show additional buttons if variant is 'full' */}
            {variant === 'full' && (
              <>
                {/* Mobile Menu Button - Only show if not on prices page */}
                {!isPricesPage && (
                  <div className="md:hidden">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="p-2 rounded-lg text-gray-600 dark:text-gray-300
                        hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu - Only show if not on prices page */}
        {!isPricesPage && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-b-2xl shadow-lg border-t border-gray-100 dark:border-gray-800"
          >
            <motion.div 
              className="px-2 pt-2 pb-3 space-y-1"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.1
                  }
                },
                closed: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1
                  }
                }
              }}
            >
              {links.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors
                    ${activeSection === link.id
                      ? 'text-[#3A8B50] bg-[#3A8B50]/10'
                      : 'text-gray-700 hover:text-[#3A8B50] hover:bg-[#3A8B50]/5 dark:text-gray-300'
                    }`}
                  variants={{
                    open: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 24
                      }
                    },
                    closed: {
                      opacity: 0,
                      y: 20,
                      transition: {
                        duration: 0.2
                      }
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label[lang]}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
} 