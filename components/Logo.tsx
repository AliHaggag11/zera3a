import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  const { lang } = useLanguage();
  
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 text-2xl font-bold text-[#3A8B50] hover:text-[#2d6e3e] transition-colors
        ${lang === 'ar' ? 'font-[Noto_Kufi_Arabic]' : 'font-[Afacad]'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Sprout className="w-8 h-8" />
      <span className="bg-gradient-to-r from-[#3A8B50] to-[#2d6e3e] bg-clip-text text-transparent">
        {lang === 'ar' ? 'زراعة' : 'Zera3a'}
      </span>
    </motion.button>
  );
} 