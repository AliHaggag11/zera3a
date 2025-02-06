"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Shield, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

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
  }
};

export default function StartPage() {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    farmSize: "",
    cropTypes: [] as string[]
  });
  const [showFarmSizeDropdown, setShowFarmSizeDropdown] = useState(false);
  const [showCropTypesDropdown, setShowCropTypesDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${
      lang === 'ar' ? 'font-[El_Messiri]' : 'font-[Afacad]'
    }`}>
      <Navbar variant="simple" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {translations.title[lang]}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {translations.subtitle[lang]}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translations.form.name.label[lang]}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={translations.form.name.placeholder[lang]}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600
                    focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translations.form.phone.label[lang]}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={translations.form.phone.placeholder[lang]}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600
                    focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translations.form.email.label[lang]}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={translations.form.email.placeholder[lang]}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600
                    focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20"
                />
              </div>

              {/* Farm Size Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translations.form.farmSize.label[lang]}
                </label>
                <button
                  type="button"
                  onClick={() => setShowFarmSizeDropdown(!showFarmSizeDropdown)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600
                    focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20 text-left flex items-center justify-between"
                >
                  <span className={formData.farmSize ? "text-gray-900 dark:text-white" : "text-gray-500"}>
                    {formData.farmSize || translations.form.farmSize.placeholder[lang]}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${showFarmSizeDropdown ? "rotate-180" : ""}`} />
                </button>
                
                {showFarmSizeDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
                    {translations.form.farmSize.options.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, farmSize: option[lang] });
                          setShowFarmSizeDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 first:rounded-t-xl last:rounded-b-xl"
                      >
                        {option[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Crop Types Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {translations.form.cropTypes.label[lang]}
                </label>
                <button
                  type="button"
                  onClick={() => setShowCropTypesDropdown(!showCropTypesDropdown)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600
                    focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20 text-left flex items-center justify-between"
                >
                  <span className={formData.cropTypes.length > 0 ? "text-gray-900 dark:text-white" : "text-gray-500"}>
                    {formData.cropTypes.length > 0 
                      ? formData.cropTypes.join(", ") 
                      : translations.form.cropTypes.placeholder[lang]}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${showCropTypesDropdown ? "rotate-180" : ""}`} />
                </button>
                
                {showCropTypesDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
                    {translations.form.cropTypes.options.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          const newCropTypes = formData.cropTypes.includes(option[lang])
                            ? formData.cropTypes.filter(type => type !== option[lang])
                            : [...formData.cropTypes, option[lang]];
                          setFormData({ ...formData, cropTypes: newCropTypes });
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600 first:rounded-t-xl last:rounded-b-xl
                          flex items-center justify-between"
                      >
                        <span>{option[lang]}</span>
                        {formData.cropTypes.includes(option[lang]) && (
                          <Check className="w-5 h-5 text-[#3A8B50]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-[#3A8B50] text-white font-medium text-lg
                  hover:bg-[#2d6e3e] transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>{translations.form.submit[lang]}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {translations.benefits.title[lang]}
            </h2>

            <div className="space-y-6">
              {translations.benefits.items.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
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
            <div className="flex items-center gap-3 p-4 bg-[#3A8B50]/5 dark:bg-gray-800/50 rounded-xl">
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