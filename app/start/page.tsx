"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, ChevronDown, Shield, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/navigation';

const translations = {
  title: {
    ar: "ابدأ رحلتك مع زراعة",
    en: "Start Your Journey with Zera3a"
  },
  subtitle: {
    ar: "انضم إلى مجتمع المزارعين وابدأ في تحسين إنتاجك",
    en: "Join the farming community and start improving your yield"
  },
  form: {
    name: {
      label: { ar: "الاسم", en: "Name" },
      placeholder: { ar: "أدخل اسمك", en: "Enter your name" }
    },
    phone: {
      label: { ar: "رقم الهاتف", en: "Phone Number" },
      placeholder: { ar: "أدخل رقم هاتفك", en: "Enter your phone number" }
    },
    email: {
      label: { ar: "البريد الإلكتروني", en: "Email" },
      placeholder: { ar: "أدخل بريدك الإلكتروني", en: "Enter your email" }
    },
    farmSize: {
      label: { ar: "مساحة المزرعة", en: "Farm Size" },
      placeholder: { ar: "اختر مساحة المزرعة", en: "Select farm size" },
      options: [
        { ar: "أقل من فدان", en: "Less than 1 acre" },
        { ar: "١-٥ فدان", en: "1-5 acres" },
        { ar: "٥-١٠ فدان", en: "5-10 acres" },
        { ar: "أكثر من ١٠ فدان", en: "More than 10 acres" }
      ]
    },
    cropTypes: {
      label: { ar: "أنواع المحاصيل", en: "Crop Types" },
      placeholder: { ar: "اختر أنواع المحاصيل", en: "Select crop types" },
      options: [
        { ar: "خضروات", en: "Vegetables" },
        { ar: "فواكه", en: "Fruits" },
        { ar: "حبوب", en: "Grains" },
        { ar: "أعلاف", en: "Fodder" }
      ]
    },
    submit: {
      ar: "ابدأ الآن",
      en: "Start Now"
    }
  },
  benefits: {
    title: { ar: "مميزات العضوية", en: "Membership Benefits" },
    items: [
      {
        title: { ar: "أسعار مباشرة", en: "Live Prices" },
        description: { ar: "تابع أسعار السوق لحظة بلحظة", en: "Track market prices in real-time" }
      },
      {
        title: { ar: "تحليلات متقدمة", en: "Advanced Analytics" },
        description: { ar: "تحليل أداء محاصيلك", en: "Analyze your crop performance" }
      },
      {
        title: { ar: "دعم فني", en: "Technical Support" },
        description: { ar: "دعم فني على مدار الساعة", en: "24/7 technical support" }
      }
    ]
  },
  validation: {
    required: {
      ar: "هذا الحقل مطلوب",
      en: "This field is required"
    },
    email: {
      ar: "بريد إلكتروني غير صالح",
      en: "Invalid email address"
    },
    phone: {
      ar: "رقم هاتف غير صالح",
      en: "Invalid phone number"
    },
    cropTypes: {
      ar: "اختر محصول واحد على الأقل",
      en: "Select at least one crop type"
    }
  },
  loading: {
    ar: "جاري التسجيل...",
    en: "Registering..."
  },
  success: {
    title: {
      ar: "تم التسجيل بنجاح!",
      en: "Registration Successful!"
    },
    message: {
      ar: "سيتم التواصل معك قريباً",
      en: "We'll contact you soon"
    },
    button: {
      ar: "العودة للرئيسية",
      en: "Back to Home"
    }
  }
};

type ValidationErrors = {
  name?: string;
  phone?: string;
  email?: string;
  farmSize?: string;
  cropTypes?: string;
};

export default function StartPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    farmSize: "",
    cropTypes: [] as string[]
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showFarmSizeDropdown, setShowFarmSizeDropdown] = useState(false);
  const [showCropTypesDropdown, setShowCropTypesDropdown] = useState(false);

  // Add refs for dropdowns
  const farmSizeRef = useRef<HTMLDivElement>(null);
  const cropTypesRef = useRef<HTMLDivElement>(null);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!farmSizeRef.current?.contains(event.target as Node)) {
        setShowFarmSizeDropdown(false);
      }
      if (!cropTypesRef.current?.contains(event.target as Node)) {
        setShowCropTypesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close other dropdown when one opens
  const handleDropdownToggle = (dropdown: 'farmSize' | 'cropTypes') => {
    if (dropdown === 'farmSize') {
      setShowFarmSizeDropdown(!showFarmSizeDropdown);
      setShowCropTypesDropdown(false);
    } else {
      setShowCropTypesDropdown(!showCropTypesDropdown);
      setShowFarmSizeDropdown(false);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = translations.validation.required[lang];
    }

    if (!formData.phone.trim()) {
      newErrors.phone = translations.validation.required[lang];
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = translations.validation.phone[lang];
    }

    if (!formData.email.trim()) {
      newErrors.email = translations.validation.required[lang];
    } else if (!validateEmail(formData.email)) {
      newErrors.email = translations.validation.email[lang];
    }

    if (!formData.farmSize) {
      newErrors.farmSize = translations.validation.required[lang];
    }

    if (formData.cropTypes.length === 0) {
      newErrors.cropTypes = translations.validation.cropTypes[lang];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${
        lang === 'ar' ? 'font-[El_Messiri]' : 'font-[Afacad]'
      }`}>
        <Navbar variant="simple" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 
              flex items-center justify-center"
            >
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {translations.success.title[lang]}
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {translations.success.message[lang]}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/')}
              className="px-6 py-3 rounded-xl bg-[#3A8B50] text-white font-medium
                hover:bg-[#2d6e3e] transition-colors duration-200"
            >
              {translations.success.button[lang]}
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ${
      lang === 'ar' ? 'font-[El_Messiri]' : 'font-[Afacad]'
    }`}>
      <Navbar variant="simple" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl
              border border-gray-200/50 dark:border-gray-700/50 relative"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(58,139,80,0.15) 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }} />
            </div>

            {/* Form Content */}
            <div className="relative">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                  bg-[#3A8B50]/10 dark:bg-[#3A8B50]/20 mb-4"
                >
                  <div className="w-2 h-2 rounded-full bg-[#3A8B50]" />
                  <span className="text-sm font-medium text-[#3A8B50]">
                    {lang === 'ar' ? 'نموذج التسجيل' : 'Registration Form'}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {translations.title[lang]}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {translations.subtitle[lang]}
                </p>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.form.name.label[lang]}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) {
                        setErrors({ ...errors, name: undefined });
                      }
                    }}
                    placeholder={translations.form.name.placeholder[lang]}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 
                      border ${errors.name 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600'
                      } focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.form.phone.label[lang]}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) {
                        setErrors({ ...errors, phone: undefined });
                      }
                    }}
                    placeholder={translations.form.phone.placeholder[lang]}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 
                      border ${errors.phone 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600'
                      } focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.form.email.label[lang]}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) {
                        setErrors({ ...errors, email: undefined });
                      }
                    }}
                    placeholder={translations.form.email.placeholder[lang]}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 
                      border ${errors.email 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-200 dark:border-gray-600'
                      } focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Dropdowns Container */}
                <div className="space-y-6">
                  {/* Farm Size Dropdown */}
                  <div className="relative" ref={farmSizeRef}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {translations.form.farmSize.label[lang]}
                    </label>
                    <button
                      type="button"
                      onClick={() => handleDropdownToggle('farmSize')}
                      className={`relative z-[1] w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 
                        border ${errors.farmSize 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-200 dark:border-gray-600'
                        } focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20 
                        text-left flex items-center justify-between
                        transition-colors duration-200
                        ${showFarmSizeDropdown ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                    >
                      <span className={formData.farmSize ? "text-gray-900 dark:text-white" : "text-gray-500"}>
                        {formData.farmSize || translations.form.farmSize.placeholder[lang]}
                      </span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 
                        ${showFarmSizeDropdown ? "rotate-180" : ""}`} />
                    </button>
                    
                    {/* Farm Size Dropdown Menu */}
                    <AnimatePresence>
                      {showFarmSizeDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-[100] w-full mt-2 bg-white dark:bg-gray-700 rounded-xl 
                            shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden"
                          style={{ 
                            top: 'calc(100% - 5px)',
                            maxHeight: '240px',
                            overflowY: 'auto'
                          }}
                        >
                          {translations.form.farmSize.options.map((option, index) => (
                            <motion.button
                              key={index}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, farmSize: option[lang] });
                                setShowFarmSizeDropdown(false);
                                if (errors.farmSize) {
                                  setErrors({ ...errors, farmSize: undefined });
                                }
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600
                                text-gray-700 dark:text-gray-300 transition-colors duration-150"
                              whileHover={{ x: 5 }}
                            >
                              {option[lang]}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {errors.farmSize && (
                      <p className="mt-1 text-sm text-red-500">{errors.farmSize}</p>
                    )}
                  </div>

                  {/* Crop Types Dropdown */}
                  <div className="relative" ref={cropTypesRef}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {translations.form.cropTypes.label[lang]}
                    </label>
                    <button
                      type="button"
                      onClick={() => handleDropdownToggle('cropTypes')}
                      className={`relative z-[1] w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 
                        border ${errors.cropTypes 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-200 dark:border-gray-600'
                        } focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20 
                        text-left flex items-center justify-between
                        transition-colors duration-200
                        ${showCropTypesDropdown ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                    >
                      <span className={formData.cropTypes.length > 0 ? "text-gray-900 dark:text-white" : "text-gray-500"}>
                        {formData.cropTypes.length > 0 
                          ? formData.cropTypes.join(", ") 
                          : translations.form.cropTypes.placeholder[lang]}
                      </span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 
                        ${showCropTypesDropdown ? "rotate-180" : ""}`} />
                    </button>
                    
                    {/* Crop Types Dropdown Menu */}
                    <AnimatePresence>
                      {showCropTypesDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute z-[100] w-full bg-white dark:bg-gray-700 rounded-xl 
                            shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden
                            max-h-[240px] overflow-y-auto"
                          style={{ 
                            bottom: 'calc(100% - 5px)',
                            maxHeight: '240px'
                          }}
                        >
                          {translations.form.cropTypes.options.map((option, index) => (
                            <motion.button
                              key={index}
                              type="button"
                              onClick={() => {
                                const newCropTypes = formData.cropTypes.includes(option[lang])
                                  ? formData.cropTypes.filter(type => type !== option[lang])
                                  : [...formData.cropTypes, option[lang]];
                                setFormData({ ...formData, cropTypes: newCropTypes });
                                if (errors.cropTypes) {
                                  setErrors({ ...errors, cropTypes: undefined });
                                }
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600
                                text-gray-700 dark:text-gray-300 transition-colors duration-150
                                flex items-center justify-between"
                            >
                              <span>{option[lang]}</span>
                              {formData.cropTypes.includes(option[lang]) && (
                                <Check className="w-5 h-5 text-[#3A8B50]" />
                              )}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {errors.cropTypes && (
                      <p className="mt-1 text-sm text-red-500">{errors.cropTypes}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button with gradient background */}
                <div className="relative z-[60]">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-4 rounded-xl font-medium text-lg
                      flex items-center justify-center gap-2 relative overflow-hidden
                      ${isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-[#3A8B50] to-[#2d6e3e] hover:from-[#2d6e3e] hover:to-[#3A8B50]'
                      } text-white transition-all duration-300`}
                  >
                    <span className="relative z-10">
                      {isSubmitting 
                        ? translations.loading[lang]
                        : translations.form.submit[lang]
                      }
                    </span>
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <ArrowRight className="w-5 h-5 relative z-10" />
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 space-y-8 h-fit"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
              bg-[#3A8B50]/10 dark:bg-[#3A8B50]/20"
            >
              <div className="w-2 h-2 rounded-full bg-[#3A8B50]" />
              <span className="text-sm font-medium text-[#3A8B50]">
                {translations.benefits.title[lang]}
              </span>
            </div>

            <div className="space-y-4">
              {translations.benefits.items.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 
                    shadow-lg border border-gray-200/50 dark:border-gray-700/50
                    hover:border-[#3A8B50]/20 dark:hover:border-[#3A8B50]/20
                    transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title[lang]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description[lang]}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-3 p-4 bg-[#3A8B50]/5 dark:bg-[#3A8B50]/10 
              rounded-xl border border-[#3A8B50]/10 dark:border-[#3A8B50]/20"
            >
              <Shield className="w-5 h-5 text-[#3A8B50]" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {lang === 'ar' 
                  ? 'بياناتك محمية ومشفرة بالكامل'
                  : 'Your data is fully protected and encrypted'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 