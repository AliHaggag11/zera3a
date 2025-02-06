"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import {
  Sprout,
  Leaf,
  BarChart3,
  Users,
  Building2,
  ThumbsUp,
  Mic,
  Smartphone,
  HandshakeIcon,
  Shield,
  Bell,
  LineChart,
  Cloud,
  Zap,
  Map,
  MessageCircle,
  Share2,
  User2,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Settings,
  Wallet
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const translations = {
  hero: {
    badge: {
      ar: "مستقبل الزراعة",
      en: "The Future of Farming"
    },
    title: {
      ar: "مميزات مزرعتك الذكية",
      en: "Your Smart Farm's Features"
    },
    subtitle: {
      ar: "كل ما تحتاجه لبيع محاصيلك بأسعار أفضل، من غير تعب!",
      en: "Everything You Need to Sell Crops at Better Prices, Effortlessly!"
    }
  },
  categories: [
    {
      title: { ar: "إدارة المزرعة", en: "Farm Management" },
      description: {
        ar: "أدوات متكاملة لإدارة مزرعتك بكفاءة",
        en: "Integrated tools for efficient farm management"
      },
      icon: <Sprout className="w-6 h-6" />,
      features: [
        {
          title: { ar: "تتبع المحاصيل", en: "Crop Tracking" },
          description: {
            ar: "تتبع نمو محاصيلك وجدولة الري والتسميد",
            en: "Track crop growth, schedule irrigation and fertilization"
          },
          icon: <Leaf className="w-6 h-6" />
        },
        {
          title: { ar: "إدارة المخزون", en: "Inventory Management" },
          description: {
            ar: "تتبع المدخلات والمخرجات وإدارة المخزون",
            en: "Track inputs, outputs and manage inventory"
          },
          icon: <BarChart3 className="w-6 h-6" />
        },
        {
          title: { ar: "جدولة المهام", en: "Task Scheduling" },
          description: {
            ar: "جدولة وتتبع المهام اليومية والأسبوعية",
            en: "Schedule and track daily and weekly tasks"
          },
          icon: <Settings className="w-6 h-6" />
        }
      ]
    },
    {
      title: { ar: "التحليلات والتقارير", en: "Analytics & Reports" },
      description: {
        ar: "تحليلات متقدمة لتحسين الأداء",
        en: "Advanced analytics to improve performance"
      },
      icon: <LineChart className="w-6 h-6" />,
      features: [
        {
          title: { ar: "تحليل الأداء", en: "Performance Analysis" },
          description: {
            ar: "تحليل شامل لأداء المزرعة والمحاصيل",
            en: "Comprehensive analysis of farm and crop performance"
          },
          icon: <BarChart3 className="w-6 h-6" />
        },
        {
          title: { ar: "تقارير مالية", en: "Financial Reports" },
          description: {
            ar: "تقارير مفصلة عن الإيرادات والمصروفات",
            en: "Detailed reports on revenue and expenses"
          },
          icon: <Wallet className="w-6 h-6" />
        },
        {
          title: { ar: "توقعات الإنتاج", en: "Yield Predictions" },
          description: {
            ar: "توقعات دقيقة للإنتاج باستخدام الذكاء الاصطناعي",
            en: "Accurate yield predictions using AI"
          },
          icon: <Cloud className="w-6 h-6" />
        }
      ]
    },
    {
      title: { ar: "السوق والتسعير", en: "Market & Pricing" },
      description: {
        ar: "معلومات السوق وأدوات التسعير",
        en: "Market information and pricing tools"
      },
      icon: <Building2 className="w-6 h-6" />,
      features: [
        {
          title: { ar: "أسعار مباشرة", en: "Live Prices" },
          description: {
            ar: "أسعار السوق في الوقت الحقيقي",
            en: "Real-time market prices"
          },
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: { ar: "خريطة الأسواق", en: "Market Map" },
          description: {
            ar: "خريطة تفاعلية للأسواق القريبة",
            en: "Interactive map of nearby markets"
          },
          icon: <Map className="w-6 h-6" />
        },
        {
          title: { ar: "تنبيهات الأسعار", en: "Price Alerts" },
          description: {
            ar: "تنبيهات فورية عند تغير الأسعار",
            en: "Instant alerts on price changes"
          },
          icon: <Bell className="w-6 h-6" />
        }
      ]
    },
    {
      title: { ar: "التواصل والمجتمع", en: "Community & Communication" },
      description: {
        ar: "تواصل مع المزارعين والخبراء",
        en: "Connect with farmers and experts"
      },
      icon: <Users className="w-6 h-6" />,
      features: [
        {
          title: { ar: "منتدى المزارعين", en: "Farmers Forum" },
          description: {
            ar: "تبادل الخبرات والنصائح مع المزارعين",
            en: "Exchange experiences and tips with farmers"
          },
          icon: <MessageCircle className="w-6 h-6" />
        },
        {
          title: { ar: "استشارات خبراء", en: "Expert Consultations" },
          description: {
            ar: "استشارات مباشرة مع خبراء الزراعة",
            en: "Live consultations with agriculture experts"
          },
          icon: <HandshakeIcon className="w-6 h-6" />
        },
        {
          title: { ar: "مشاركة المعرفة", en: "Knowledge Sharing" },
          description: {
            ar: "مكتبة من الموارد والمقالات التعليمية",
            en: "Library of educational resources and articles"
          },
          icon: <Share2 className="w-6 h-6" />
        }
      ]
    }
  ],
  stats: {
    title: {
      ar: "أرقام تتحدث عن نجاحنا",
      en: "Numbers Speak for Our Success"
    },
    items: [
      {
        number: "5000+",
        label: { ar: "فلاح نشط", en: "Active Farmers" }
      },
      {
        number: "1000+",
        label: { ar: "تاجر مسجل", en: "Registered Traders" }
      },
      {
        number: "30%",
        label: { ar: "توفير في التكاليف", en: "Cost Savings" }
      }
    ]
  },
  testimonials: {
    title: {
      ar: "قصص نجاح حقيقية من المزارعين",
      en: "Real Success Stories from Farmers"
    },
    subtitle: {
      ar: "شوف إزاي المزارعين زيك استفادوا من زراعة",
      en: "See how farmers like you benefited from Zera3a"
    },
    items: [
      {
        quote: {
          ar: "كنت بتعب في بيع القمح وأخد سعر قليل. دلوقتي بعرف أحسن سعر في السوق وبوفر وقت ومجهود. الموسم اللي فات كسبت ٣٠٪ أكتر!",
          en: "I used to struggle selling wheat and get low prices. Now I know the best market prices and save time and effort. Last season I earned 30% more!"
        },
        author: { ar: "عم محمد سعيد", en: "Uncle Mohamed Said" },
        location: { ar: "المنيا - مزارع قمح", en: "Minya - Wheat Farmer" },
        image: "/farmers/farmer1.jpg",
        crop: { ar: "قمح", en: "wheat" }
      },
      {
        quote: {
          ar: "التطبيق ساعدني أعرف أفضل وقت للري والتسميد. المحصول زاد والجودة اتحسنت. والأهم إني بقيت أوفر في المياه والسماد.",
          en: "The app helped me know the best time for irrigation and fertilization. Yield increased and quality improved. Most importantly, I'm saving on water and fertilizer."
        },
        author: { ar: "الحاج أحمد علي", en: "Hajj Ahmed Ali" },
        location: { ar: "الفيوم - مزارع خضروات", en: "Fayoum - Vegetable Farmer" },
        image: "/farmers/farmer2.jpg",
        crop: { ar: "طماطم", en: "tomatoes" }
      },
      {
        quote: {
          ar: "المانجو بتاعي مبقتش تتلف في النقل. التطبيق وصلني لتجار كويسين وشاحنات مبردة. دخلي زاد وزباين جداد عرفوني من التطبيق.",
          en: "My mangoes don't spoil during transport anymore. The app connected me with good traders and refrigerated trucks. My income increased and new customers found me through the app."
        },
        author: { ar: "الحاجة سميرة", en: "Hajja Samira" },
        location: { ar: "الإسماعيلية - مزارعة فاكهة", en: "Ismailia - Fruit Farmer" },
        image: "/farmers/farmer3.jpg",
        crop: { ar: "مانجو", en: "mangoes" }
      }
    ]
  },
  pricing: {
    title: {
      ar: "باقات بسيطة تناسب احتياجاتك",
      en: "Simple Plans for Your Needs"
    },
    plans: [
      {
        name: { ar: "مجاني", en: "Free" },
        price: { ar: "مجاناً", en: "Free" },
        period: { ar: "للأبد", en: "Forever" },
        description: {
          ar: "ابدأ مجاناً وجرب المميزات الأساسية",
          en: "Start free and try basic features"
        },
        features: [
          { ar: "إعلانات SMS", en: "SMS Notifications" },
          { ar: "تحديث المحاصيل بالصوت", en: "Voice Crop Updates" },
          { ar: "معرفة أسعار السوق", en: "Market Price Access" }
        ]
      },
      {
        name: { ar: "بريميوم", en: "Premium" },
        price: { ar: "١٥٠", en: "150" },
        period: { ar: "جنيه / شهرياً", en: "EGP/month" },
        description: {
          ar: "كل المميزات المتقدمة لتنمية تجارتك",
          en: "All advanced features to grow your business"
        },
        features: [
          { ar: "قروض صغيرة", en: "Micro Loans" },
          { ar: "أسعار حصرية", en: "Exclusive Prices" },
          { ar: "شحن مجاني أول مرة كل شهر", en: "Free Shipping Once/Month" },
          { ar: "دعم فني على مدار الساعة", en: "24/7 Technical Support" }
        ],
        highlight: true
      }
    ]
  },
  faq: {
    title: {
      ar: "الأسئلة الشائعة",
      en: "Frequently Asked Questions"
    },
    items: [
      {
        question: {
          ar: "إزاي أبدأ؟",
          en: "How do I start?"
        },
        answer: {
          ar: "اتصل على ۰۱۰۰۱۲۳۴۵۶۷ أو اكتب 'أنا عايز أبدأ' على واتساب",
          en: "Call 0100123456 or write 'I want to start' on WhatsApp"
        }
      },
      {
        question: {
          ar: "هل التطبيق بيشتغل بدون إنترنت؟",
          en: "Does the app work without internet?"
        },
        answer: {
          ar: "أيوا! تقدر تضيف محاصيلك بالصوت وتستلم الأسعار برسالة SMS",
          en: "Yes! You can add crops by voice and receive prices via SMS"
        }
      }
    ]
  },
  keyFeatures: {
    title: {
      ar: "مميزات رئيسية",
      en: "Key Features"
    },
    items: [
      {
        title: { 
          ar: "تحديث المحاصيل بالصوت أو رسالة", 
          en: "Voice or SMS Crop Updates" 
        },
        subtitle: {
          ar: "لا تحتاج إنترنت ولا موبايل ذكي!",
          en: "No internet or smartphone needed!"
        },
        features: [
          {
            ar: "اكتب كمية المحاصيل بالصوت (مثال: 'ضيف ۲۰ كيلو طماطم')",
            en: "Add crop quantities by voice (e.g., 'Add 20kg tomatoes')"
          },
          {
            ar: "استلم أسعار السوق عبر رسالة SMS لو ملكش إنترنت",
            en: "Receive market prices via SMS when offline"
          },
          {
            ar: "استخدم أي موبايل قديم – حتى لو بدون كاميرا!",
            en: "Use any basic phone - even without a camera!"
          }
        ],
        icon: <Mic className="w-8 h-8" />,
        color: "green",
        testimonial: {
          quote: {
            ar: "بقيت أعرف أسعار القمح في القاهرة من غير ما اروح هناك. وفرت وقت ومصروف!",
            en: "I now know wheat prices in Cairo without going there. Saved time and money!"
          },
          author: { ar: "محمد", en: "Mohamed" },
          location: { ar: "المنيا", en: "Minya" }
        }
      },
      // Add other key features similarly...
    ]
  }
};

export default function FeaturesPage() {
  const { lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${
      lang === 'ar' ? 'font-[El_Messiri]' : 'font-[Afacad]'
    }`}>
      <Navbar variant="simple" />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')",
              filter: "brightness(0.7)"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50" />
        </div>

        {/* Content */}
        <div className="relative pt-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                bg-[#3A8B50]/20 backdrop-blur-sm mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#4CAF50]"
              />
              <span className="text-sm font-medium text-white">
                {translations.hero.badge[lang]}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl font-bold text-white max-w-4xl mb-6"
            >
              {translations.hero.title[lang]}
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-4xl text-[#F5A623] max-w-3xl mb-16"
            >
              {translations.hero.subtitle[lang]}
            </motion.h2>

            {/* Floating Features */}
            <div className="relative mt-24">
              {/* Desktop Layout */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] hidden md:block"
              >
                {[
                  {
                    icon: <Smartphone className="w-6 h-6" />,
                    title: {
                      ar: "يعمل على أي موبايل",
                      en: "Works on Any Phone"
                    },
                    description: {
                      ar: "حتى الموبايلات القديمة بدون إنترنت",
                      en: "Even on basic phones without internet"
                    },
                    position: { top: "5%", left: "5%" }
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: {
                      ar: "حماية كاملة",
                      en: "Full Protection"
                    },
                    description: {
                      ar: "بياناتك محمية ومشفرة بالكامل",
                      en: "Your data is fully encrypted and secure"
                    },
                    position: { top: "15%", right: "5%" }
                  },
                  {
                    icon: <ThumbsUp className="w-6 h-6" />,
                    title: {
                      ar: "سهل الاستخدام",
                      en: "Easy to Use"
                    },
                    description: {
                      ar: "واجهة بسيطة تناسب الجميع",
                      en: "Simple interface for everyone"
                    },
                    position: { top: "60%", left: "25%" }
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.5 + (index * 0.2),
                      duration: 0.8
                    }}
                    style={{
                      position: "absolute",
                      top: feature.position.top,
                      ...(feature.position.left ? { left: feature.position.left } : {}),
                      ...(feature.position.right ? { right: feature.position.right } : {}),
                    }}
                    className="w-64"
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6
                      border border-white/20 hover:bg-white/20 
                      transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 rounded-xl bg-[#3A8B50]/20 text-[#4CAF50]">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          {feature.title[lang]}
                        </h3>
                      </div>
                      <p className="text-gray-300">
                        {feature.description[lang]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-4 px-4 mb-24">
                {[
                  {
                    icon: <Smartphone className="w-6 h-6" />,
                    title: {
                      ar: "يعمل على أي موبايل",
                      en: "Works on Any Phone"
                    },
                    description: {
                      ar: "حتى الموبايلات القديمة بدون إنترنت",
                      en: "Even on basic phones without internet"
                    }
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: {
                      ar: "حماية كاملة",
                      en: "Full Protection"
                    },
                    description: {
                      ar: "بياناتك محمية ومشفرة بالكامل",
                      en: "Your data is fully encrypted and secure"
                    }
                  },
                  {
                    icon: <ThumbsUp className="w-6 h-6" />,
                    title: {
                      ar: "سهل الاستخدام",
                      en: "Easy to Use"
                    },
                    description: {
                      ar: "واجهة بسيطة تناسب الجميع",
                      en: "Simple interface for everyone"
                    }
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.5 + (index * 0.2),
                      duration: 0.8
                    }}
                    className="w-full"
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6
                      border border-white/20 hover:bg-white/20 
                      transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 rounded-xl bg-[#3A8B50]/20 text-[#4CAF50]">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          {feature.title[lang]}
                        </h3>
                      </div>
                      <p className="text-gray-300">
                        {feature.description[lang]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {translations.categories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8
                  border border-gray-200/50 dark:border-gray-700/50 space-y-8"
              >
                {/* Category Header */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#3A8B50]/10 dark:bg-[#3A8B50]/20 text-[#3A8B50]">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.title[lang]}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {category.description[lang]}
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-6">
                  {category.features.map((feature: { 
                    title: { ar: string; en: string };
                    description: { ar: string; en: string };
                    icon: React.ReactNode;
                  }, featureIndex: number) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (categoryIndex * 0.1) + (featureIndex * 0.1) }}
                      className="flex items-start gap-4 p-4 rounded-xl
                        hover:bg-[#3A8B50]/5 dark:hover:bg-[#3A8B50]/10
                        transition-colors duration-200"
                    >
                      <div className="p-2 rounded-lg bg-[#3A8B50]/10 dark:bg-[#3A8B50]/20 text-[#3A8B50]">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {feature.title[lang]}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description[lang]}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24">
        {/* Add decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A8B50]/5 to-transparent dark:from-[#3A8B50]/10" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#4CAF50]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3A8B50]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#3A8B50]/10 text-[#3A8B50] text-sm font-medium mb-4">
              {lang === 'ar' ? 'إحصائيات' : 'Statistics'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              {translations.stats.title[lang]}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {translations.stats.items.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A8B50]/20 to-[#4CAF50]/10 
                  rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8
                  border border-gray-200/50 dark:border-gray-700/50 text-center
                  hover:border-[#3A8B50]/50 transition-all duration-300
                  transform hover:-translate-y-1"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.2 
                    }}
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#3A8B50]/10 
                      flex items-center justify-center"
                  >
                    {index === 0 && <Users className="w-8 h-8 text-[#3A8B50]" />}
                    {index === 1 && <Building2 className="w-8 h-8 text-[#3A8B50]" />}
                    {index === 2 && <LineChart className="w-8 h-8 text-[#3A8B50]" />}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.3 }}
                    className="relative"
                  >
                    <div className="text-5xl font-bold text-[#3A8B50] mb-4 
                      bg-gradient-to-r from-[#3A8B50] to-[#4CAF50] bg-clip-text text-transparent"
                    >
                      {stat.number}
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                      {stat.label[lang]}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-[#3A8B50]/5 to-transparent dark:from-transparent dark:via-[#3A8B50]/10 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#3A8B50]/10 text-[#3A8B50] text-sm font-medium mb-4">
              {lang === 'ar' ? 'تجارب المزارعين' : 'Farmer Stories'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {translations.testimonials.title[lang]}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {translations.testimonials.subtitle[lang]}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {translations.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A8B50]/20 to-[#4CAF50]/10 
                  rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8
                  border border-gray-200/50 dark:border-gray-700/50
                  hover:border-[#3A8B50]/50 transition-all duration-300
                  transform hover:-translate-y-1"
                >
                  {/* Crop Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 rounded-full bg-[#3A8B50]/10 text-[#3A8B50] text-sm font-medium flex items-center gap-2">
                      <Sprout className="w-4 h-4" />
                      {testimonial.crop[lang]}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-8 mt-4">
                    <div className="absolute -top-6 -left-2 text-[#3A8B50] opacity-10 text-6xl font-serif">
                      &ldquo;
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {testimonial.quote[lang]}
                    </p>
                    <div className="absolute -bottom-4 -right-2 text-[#3A8B50] opacity-10 text-6xl font-serif rotate-180">
                      &ldquo;
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-16 h-1 bg-gradient-to-r from-[#3A8B50] to-[#4CAF50] rounded-full mb-6" />

                  {/* Farmer Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#3A8B50]/10 dark:bg-[#3A8B50]/20
                      flex items-center justify-center text-[#3A8B50] overflow-hidden border-2 border-[#3A8B50]/20"
                    >
                      <User2 className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-lg">
                        {testimonial.author[lang]}
                      </div>
                      <div className="text-[#3A8B50] font-medium">
                        {testimonial.location[lang]}
                      </div>
                    </div>
                  </div>

                  {/* Success Tag */}
                  <div className="absolute -top-3 left-4">
                    <div className="px-4 py-1 rounded-full bg-[#4CAF50] text-white text-sm font-medium shadow-lg shadow-[#4CAF50]/20">
                      {lang === 'ar' ? 'قصة نجاح' : 'Success Story'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#4CAF50]/10 rounded-full blur-3xl transform -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#3A8B50]/10 rounded-full blur-3xl transform -translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#3A8B50]/10 text-[#3A8B50] text-sm font-medium mb-4">
              {lang === 'ar' ? 'باقات الاشتراك' : 'Pricing Plans'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {translations.pricing.title[lang]}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {lang === 'ar' 
                ? 'اختر الباقة المناسبة لاحتياجاتك'
                : 'Choose the plan that fits your needs'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {translations.pricing.plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  plan.highlight 
                    ? 'from-[#3A8B50]/30 to-[#4CAF50]/20' 
                    : 'from-[#3A8B50]/20 to-[#4CAF50]/10'
                } rounded-2xl transform group-hover:scale-105 transition-transform duration-300`} />
                
                {/* Card Content */}
                <div className={`relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8
                  border ${plan.highlight 
                    ? 'border-[#3A8B50] dark:border-[#4CAF50]' 
                    : 'border-gray-200/50 dark:border-gray-700/50'
                  } hover:border-[#3A8B50]/50 transition-all duration-300
                  transform hover:-translate-y-1`}
                >
                  {/* Plan Badge */}
                  <div className="absolute -top-3 left-4">
                    <div className={`px-4 py-1 rounded-full ${
                      !plan.highlight
                        ? 'bg-gray-500/90 shadow-gray-500/20' 
                        : 'bg-[#4CAF50] shadow-[#4CAF50]/20'
                    } text-white text-sm font-medium shadow-lg`}>
                      {plan.name[lang]}
                    </div>
                  </div>

                  {/* Popular Badge */}
                  {plan.highlight && (
                    <div className="absolute -top-3 right-4">
                      <div className="px-4 py-1 rounded-full bg-yellow-500/90 text-white text-sm font-medium shadow-lg shadow-yellow-500/20">
                        {lang === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div className="text-center mt-8 mb-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className={`text-5xl font-bold ${
                        plan.highlight 
                          ? 'bg-gradient-to-r from-[#3A8B50] to-[#4CAF50]' 
                          : 'bg-gradient-to-r from-gray-700 to-gray-600'
                      } bg-clip-text text-transparent`}>
                        {plan.price[lang]}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-lg">
                        {plan.period[lang]}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {plan.description[lang]}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`w-16 h-1 ${
                    plan.highlight 
                      ? 'bg-gradient-to-r from-[#3A8B50] to-[#4CAF50]' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  } rounded-full mx-auto mb-8`} />

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (featureIndex * 0.1) }}
                        className="flex items-center gap-3"
                      >
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full ${
                          plan.highlight 
                            ? 'bg-[#3A8B50]/10' 
                            : 'bg-gray-100'
                        } flex items-center justify-center`}>
                          <Check className={`w-3 h-3 ${
                            plan.highlight 
                              ? 'text-[#3A8B50]' 
                              : 'text-gray-500'
                          }`} />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature[lang]}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link href="/start" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 px-6 rounded-xl font-medium text-white
                        transition-all duration-200 ${
                        plan.highlight
                          ? 'bg-[#3A8B50] hover:bg-[#2d6e3e] shadow-lg shadow-[#3A8B50]/20'
                          : 'bg-gray-500 hover:bg-gray-600 shadow-lg shadow-gray-500/20'
                      }`}
                    >
                      {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#4CAF50]/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3A8B50]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#3A8B50]/10 text-[#3A8B50] text-sm font-medium mb-4">
              {lang === 'ar' ? 'الدعم والمساعدة' : 'Help & Support'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {translations.faq.title[lang]}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {lang === 'ar' 
                ? 'إجابات لأكثر الأسئلة شيوعاً'
                : 'Answers to commonly asked questions'
              }
            </p>
          </motion.div>

          <div className="space-y-4">
            {translations.faq.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A8B50]/20 to-[#4CAF50]/10 
                  rounded-xl transform group-hover:scale-[1.02] transition-transform duration-300" />
                
                {/* Card Content */}
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl
                  border border-gray-200/50 dark:border-gray-700/50
                  hover:border-[#3A8B50]/50 transition-all duration-300"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3A8B50]/10 
                        flex items-center justify-center text-[#3A8B50]"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.question[lang]}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 text-[#3A8B50]">
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {/* Answer Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-6 pt-0 text-gray-600 dark:text-gray-300 ${
                      lang === 'ar' ? 'pr-20' : 'pl-20'
                    }`}>
                      <div className="h-px w-16 bg-gradient-to-r from-[#3A8B50] to-[#4CAF50] mb-4" />
                      {item.answer[lang]}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {lang === 'ar' 
                ? 'لم تجد إجابة لسؤالك؟'
                : 'Still have questions?'
              }
            </p>
            <motion.a
              href="https://wa.me/201001234567"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                bg-[#25D366] text-white font-medium shadow-lg shadow-[#25D366]/20
                hover:bg-[#20BD5A] transition-all duration-200"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {lang === 'ar' ? 'تواصل معنا على واتساب' : 'Contact Us on WhatsApp'}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 