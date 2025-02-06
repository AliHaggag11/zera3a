"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
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
  ArrowRight,
  Send,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Play,
  TrendingUp,
  ChevronDown,
  Star,
  User2,
  Check,
  Shield
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import VideoModal from "@/components/VideoModal";
import { useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

// Add translations
const translations = {
  hero: {
    title: {
      ar: "بيع محاصيلك بأسعار أفضل",
      en: "Sell Your Crops at Better Prices"
    },
    subtitle: {
      ar: "من غير ما تروح للسوق!",
      en: "Without Going to the Market!"
    },
    watchVideo: {
      ar: "شاهد كيف يمكنك زيادة أرباحك",
      en: "Watch How to Increase Your Profits"
    }
  },
  stats: {
    activeUsers: {
      number: { ar: "١٠٠٠+", en: "1000+" },
      label: { ar: "مزارع نشط", en: "Active Farmers" }
    },
    markets: {
      number: { ar: "٥٠+", en: "50+" },
      label: { ar: "سوق محلي", en: "Local Markets" }
    },
    satisfaction: {
      number: { ar: "٩٥٪", en: "95%" },
      label: { ar: "رضا العملاء", en: "Customer Satisfaction" }
    }
  },
  prices: {
    title: { ar: "أسعار اليوم", en: "Today's Prices" },
    items: [
      { 
        name: { ar: "طماطم", en: "Tomatoes" },
        price: { ar: "٨", en: "8" },
        trend: "up",
        unit: { ar: "جنيه/كجم", en: "EGP/kg" }
      },
      { 
        name: { ar: "بطاطس", en: "Potatoes" },
        price: { ar: "١٠", en: "10" },
        trend: "down",
        unit: { ar: "جنيه/كجم", en: "EGP/kg" }
      },
      { 
        name: { ar: "برتقال", en: "Oranges" },
        price: { ar: "١٥", en: "15" },
        trend: "up",
        unit: { ar: "جنيه/كجم", en: "EGP/kg" }
      },
      { 
        name: { ar: "ذرة", en: "Corn" },
        price: { ar: "٧", en: "7" },
        trend: "down",
        unit: { ar: "جنيه/كجم", en: "EGP/kg" }
      }
    ],
    viewMore: {
      ar: "عرض المزيد",
      en: "View More"
    }
  },
  cta: {
    title: { ar: "ابدأ رحلتك معنا اليوم", en: "Start Your Journey Today" },
    subtitle: { ar: "احصل على تجربة مجانية لمدة ٣٠ يوم", en: "Get a 30-day free trial" },
    startButton: { ar: "ابدأ مجاناً", en: "Start Free" },
    contactButton: { ar: "تواصل معنا على واتساب", en: "Contact us on WhatsApp" }
  },
  features: {
    title: { ar: "مميزات تطبيقنا", en: "Our Features" },
    items: [
      {
        title: { ar: "تحكم صوتي", en: "Voice Control" },
        description: { 
          ar: "أضف محاصيلك بسهولة عن طريق الصوت", 
          en: "Add your crops easily using voice commands" 
        },
        icon: <Mic className="w-6 h-6" />,
        color: "from-green-500/20 to-green-600/20"
      },
      {
        title: { ar: "أجهزة استشعار ذكية", en: "Smart Sensors" },
        description: { 
          ar: "راقب جودة التربة والري", 
          en: "Monitor soil quality and irrigation" 
        },
        icon: <Smartphone className="w-6 h-6" />,
        color: "from-orange-500/20 to-orange-600/20"
      },
      {
        title: { ar: "نظام المقايضة", en: "Barter System" },
        description: { 
          ar: "تبادل البذور والمعدات مع المزارعين", 
          en: "Exchange seeds and equipment with farmers" 
        },
        icon: <HandshakeIcon className="w-6 h-6" />,
        color: "from-blue-500/20 to-blue-600/20"
      }
    ]
  },
  testimonials: {
    title: { ar: "آراء المزارعين", en: "Farmer Testimonials" },
    items: [
      {
        quote: {
          ar: "الميزانية اللي كنت بدهورها في السوق وفرتها!",
          en: "I saved the money I used to waste at the market!"
        },
        author: { ar: "أحمد محمد", en: "Ahmed Mohamed" },
        role: { ar: "مزارع قمح", en: "Wheat Farmer" }
      },
      {
        quote: {
          ar: "التطبيق سهل الاستخدام وساعدني في تحسين دخلي",
          en: "The app is easy to use and helped me improve my income"
        },
        author: { ar: "محمود علي", en: "Mahmoud Ali" },
        role: { ar: "مزارع خضروات", en: "Vegetable Farmer" }
      }
    ]
  },
  footer: {
    contact: {
      title: { ar: "تواصل معنا", en: "Contact Us" },
      phone: { ar: "هاتف: ١٢٣٤٥٦٧٨٩٠", en: "Phone: 1234567890" },
      email: { ar: "البريد: info@zera3a.com", en: "Email: info@zera3a.com" }
    },
    links: {
      title: { ar: "روابط مهمة", en: "Important Links" },
      items: [
        { ar: "عن التطبيق", en: "About" },
        { ar: "الشروط والأحكام", en: "Terms" },
        { ar: "سياسة الخصوصية", en: "Privacy" }
      ]
    },
    social: {
      title: { ar: "تابعنا", en: "Follow Us" }
    },
    copyright: { 
      ar: "© ٢٠٢٤ زراعة. جميع الحقوق محفوظة", 
      en: "© 2024 Zera3a. All rights reserved" 
    }
  },
  pricing: {
    title: { ar: "باقات الاشتراك", en: "Subscription Plans" },
    subtitle: { 
      ar: "اختر الباقة المناسبة لاحتياجاتك", 
      en: "Choose the plan that fits your needs" 
    },
    plans: [
      {
        name: { ar: "مجاني", en: "Free" },
        price: { ar: "٠", en: "0" },
        currency: { ar: "جنيه/شهر", en: "EGP/mo" },
        features: [
          { ar: "إضافة ٥ محاصيل", en: "Add 5 crops" },
          { ar: "تحديثات الأسعار اليومية", en: "Daily price updates" },
          { ar: "دعم محدود", en: "Basic support" }
        ]
      },
      {
        name: { ar: "احترافي", en: "Pro" },
        price: { ar: "١٩٩", en: "199" },
        currency: { ar: "جنيه/شهر", en: "EGP/mo" },
        features: [
          { ar: "محاصيل غير محدودة", en: "Unlimited crops" },
          { ar: "تحليلات متقدمة", en: "Advanced analytics" },
          { ar: "دعم على مدار الساعة", en: "24/7 support" },
          { ar: "تنبيهات الأسعار", en: "Price alerts" }
        ]
      },
      {
        name: { ar: "مؤسسات", en: "Enterprise" },
        price: { ar: "اتصل بنا", en: "Contact us" },
        currency: { ar: "", en: "" },
        features: [
          { ar: "حلول مخصصة", en: "Custom solutions" },
          { ar: "API مخصص", en: "Custom API" },
          { ar: "مدير حساب مخصص", en: "Dedicated account manager" }
        ]
      }
    ]
  }
};

// First, add these constants at the top with your other translations
const heroCards = [
  {
    gradient: "from-green-100 to-green-200 dark:from-green-900 dark:to-green-800",
    icon: <Sprout className="w-24 h-24 text-green-600 dark:text-green-400" />,
    stat: {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      label: { ar: "زيادة في الأرباح", en: "Profit Increase" },
      value: "+45%"
    }
  },
  {
    gradient: "from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800",
    icon: <Leaf className="w-24 h-24 text-yellow-600 dark:text-yellow-400" />,
    stat: {
      icon: <Users className="w-6 h-6 text-yellow-600" />,
      label: { ar: "مزارع نشط", en: "Active Farmers" },
      value: "1000+"
    }
  },
  {
    gradient: "from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800",
    icon: <BarChart3 className="w-24 h-24 text-blue-600 dark:text-blue-400" />,
    stat: {
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      label: { ar: "سوق محلي", en: "Local Markets" },
      value: "50+"
    }
  }
];

// Add this new type and hook at the top of your file
type AnimatedNumberProps = {
  value: number;
  duration?: number;
  formatter?: (value: number) => string;
};

const useAnimatedNumber = (targetValue: number, duration: number = 2000) => {
  const [current, setCurrent] = useState(0);
  const startTime = useRef<number | null>(null);
  const frameId = useRef<number>();

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCurrent(Math.floor(easeOutQuart * targetValue));

      if (percentage < 1) {
        frameId.current = requestAnimationFrame(animate);
      }
    };

    frameId.current = requestAnimationFrame(animate);
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [targetValue, duration]);

  return current;
};

// Add this new component
const AnimatedNumber = ({ value, duration = 2000, formatter = (v) => v.toString() }: AnimatedNumberProps) => {
  const animatedValue = useAnimatedNumber(value, duration);
  return <>{formatter(animatedValue)}</>;
};

// Update the stats data
const statsCards = [
  {
    icon: <Users className="w-12 h-12 text-green-600" />,
    gradient: "from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50",
    accentColor: "green",
    number: 1000,
    label: { ar: "مزارع نشط", en: "Active Farmers" },
    suffix: "+",
    description: { 
      ar: "يستخدمون التطبيق يومياً", 
      en: "Using the app daily" 
    }
  },
  {
    icon: <Building2 className="w-12 h-12 text-blue-600" />,
    gradient: "from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50",
    accentColor: "blue",
    number: 50,
    label: { ar: "سوق محلي", en: "Local Markets" },
    suffix: "+",
    description: { 
      ar: "متصلين بالمنصة", 
      en: "Connected to platform" 
    }
  },
  {
    icon: <ThumbsUp className="w-12 h-12 text-yellow-600" />,
    gradient: "from-yellow-50 to-yellow-100 dark:from-yellow-900/50 dark:to-yellow-800/50",
    accentColor: "yellow",
    number: 95,
    label: { ar: "رضا العملاء", en: "Satisfaction Rate" },
    suffix: "%",
    description: { 
      ar: "من المزارعين راضون", 
      en: "Farmer satisfaction" 
    }
  }
];

// Update the PriceItem type
type PriceItem = {
  name: { ar: string; en: string };
  price: number;
  previousPrice: number;
  unit: { ar: string; en: string };
  trend: 'up' | 'down' | 'stable';
  icon?: React.ReactNode; // Make icon optional
};

// Update the usePriceFluctuation hook for less frequent updates
const usePriceFluctuation = (initialPrice: number, delay: number = 0) => {
  const [price, setPrice] = useState<number>(initialPrice);
  const [previousPrice, setPreviousPrice] = useState<number>(initialPrice);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Update every 30 seconds instead of random intervals
    const interval = setInterval(() => {
      if (!isUpdating) {
        setIsUpdating(true);
        setPreviousPrice(price);
        
        // Smaller price changes (0.01 to 0.1)
        const fluctuation = (Math.random() * 0.09 + 0.01) * (Math.random() > 0.5 ? 1 : -1);
        const newPrice = Math.max(0, price + fluctuation);
        
        setPrice(Number(newPrice.toFixed(2)));
        setTrend(newPrice > price ? 'up' : newPrice < price ? 'down' : 'stable');
        
        // Reset updating state after 2 seconds
        setTimeout(() => setIsUpdating(false), 2000);
      }
    }, 30000); // Update every 30 seconds

    // Initial delay to stagger updates
    const initialTimeout = setTimeout(() => {
      interval;
    }, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [price, isUpdating, delay]);

  return { price, previousPrice, trend, isUpdating };
};

// Update the PriceCard component
const PriceCard = ({ item, index }: { item: PriceItem; index: number }) => {
  const { lang } = useLanguage();
  const { price, previousPrice, trend, isUpdating } = usePriceFluctuation(
    item.price,
    index * 1000 // Stagger initial updates by 1 second each
  );
  const change = ((price - previousPrice) / previousPrice * 100).toFixed(1);
  
  // Keep track of daily high/low
  const [dailyStats, setDailyStats] = useState({
    high: price,
    low: price,
    openPrice: price
  });

  useEffect(() => {
    setDailyStats(prev => ({
      high: Math.max(prev.high, price),
      low: Math.min(prev.low, price),
      openPrice: prev.openPrice
    }));
  }, [price]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl 
        border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center
              ${trend === 'up' ? 'bg-green-100 text-green-600' : 
                trend === 'down' ? 'bg-red-100 text-red-600' : 
                'bg-gray-100 text-gray-600'}`}
            >
              {item.icon || <Leaf className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.name[lang]}
              </h3>
              <span className="text-sm text-gray-500">
                {item.unit[lang]}
              </span>
            </div>
          </div>
          <motion.div
            animate={{
              backgroundColor: trend === 'up' ? 'rgb(220 252 231)' : 
                           trend === 'down' ? 'rgb(254 226 226)' : 
                           'rgb(229 231 235)',
              color: trend === 'up' ? 'rgb(22 163 74)' : 
                   trend === 'down' ? 'rgb(220 38 38)' : 
                   'rgb(107 114 128)',
            }}
            className="px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {Math.abs(Number(change))}%
          </motion.div>
        </div>

        {/* Current Price with update animation */}
        <div className="flex items-baseline gap-2 mb-6">
          <motion.div
            key={price}
            initial={{ opacity: 0, y: isUpdating ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-[#3A8B50] to-[#2d6e3e] bg-clip-text text-transparent"
          >
            {price.toFixed(2)}
          </motion.div>
        </div>

        {/* Daily Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="text-center">
            <div className="text-gray-500 dark:text-gray-400 mb-1">
              {lang === 'ar' ? 'الافتتاح' : 'Open'}
            </div>
            <div className="font-medium">
              {dailyStats.openPrice.toFixed(2)}
            </div>
          </div>
          <div className="text-center text-green-600">
            <div className="text-gray-500 dark:text-gray-400 mb-1">
              {lang === 'ar' ? 'الأعلى' : 'High'}
            </div>
            <div className="font-medium">
              {dailyStats.high.toFixed(2)}
            </div>
          </div>
          <div className="text-center text-red-600">
            <div className="text-gray-500 dark:text-gray-400 mb-1">
              {lang === 'ar' ? 'الأدنى' : 'Low'}
            </div>
            <div className="font-medium">
              {dailyStats.low.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Market Status */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-500">
              {lang === 'ar' ? 'السوق مفتوح' : 'Market Open'}
            </span>
          </div>
          <span className="text-gray-500">
            {new Date().toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Add this with your other constants
const additionalPrices = [
  { 
    name: { ar: "خيار", en: "Cucumber" },
    price: { ar: "٦", en: "6" },
    trend: "up",
    unit: { ar: "جنيه/كجم", en: "EGP/kg" }
  },
  { 
    name: { ar: "باذنجان", en: "Eggplant" },
    price: { ar: "٩", en: "9" },
    trend: "down",
    unit: { ar: "جنيه/كجم", en: "EGP/kg" }
  },
  { 
    name: { ar: "فلفل", en: "Bell Pepper" },
    price: { ar: "١٢", en: "12" },
    trend: "up",
    unit: { ar: "جنيه/كجم", en: "EGP/kg" }
  },
  { 
    name: { ar: "بصل", en: "Onions" },
    price: { ar: "٥", en: "5" },
    trend: "stable",
    unit: { ar: "جنيه/كجم", en: "EGP/kg" }
  }
];

export default function Home() {
  const { lang } = useLanguage();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [prices, setPrices] = useState(translations.prices.items);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % heroCards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Initial random prices
    const initialPrices = translations.prices.items.map(item => ({
      ...item,
      currentPrice: parseFloat(item.price[lang]),
      trend: Math.random() > 0.5 ? "up" : "down"
    }));
    setPrices(initialPrices);

    // Update prices every 5 seconds instead of every render
    const interval = setInterval(() => {
      setPrices(currentPrices => 
        currentPrices.map(item => {
          const change = (Math.random() - 0.5) * 2; // Random price change
          const newPrice = Math.max(1, item.currentPrice + change);
          return {
            ...item,
            currentPrice: Number(newPrice.toFixed(2)),
            trend: change >= 0 ? "up" : "down"
          };
        })
      );
    }, 5000); // Changed from 1000 to 5000 milliseconds

    return () => clearInterval(interval);
  }, [lang]); // Only depend on language changes

  return (
    <div className={`min-h-screen relative bg-[#f8f9fa] dark:bg-gray-900 overflow-x-hidden ${
      lang === 'ar' ? 'font-[El_Messiri]' : 'font-[Afacad]'
    }`}>
      {/* Update Navbar to use full variant */}
      <Navbar variant="full" />
      
      {/* Global background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top-right gradient */}
        <div 
          className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-green-200/30 to-green-300/30 blur-[100px]
          transform sm:translate-x-1/4 lg:translate-x-1/2" 
        />
        {/* Middle-left gradient */}
        <div 
          className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-yellow-200/30 to-yellow-300/30 blur-[100px]
          transform sm:-translate-x-1/4 lg:-translate-x-1/2" 
        />
        {/* Bottom-right gradient */}
        <div 
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-green-200/30 to-blue-300/30 blur-[100px]
          transform sm:translate-x-1/4 lg:translate-x-1/2" 
        />
        {/* Bottom-left gradient */}
        <div 
          className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-yellow-200/30 to-green-300/30 blur-[100px]
          transform sm:-translate-x-1/4 lg:-translate-x-1/2" 
        />
      </div>

      {/* Hero Section */}
      <section id="home" className="relative w-full min-h-[calc(100vh-4rem)] pt-24 pb-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full">
          <motion.div
            {...fadeInUp}
              className="flex-1 text-center md:text-left"
            >
              <div className="inline-block mb-4 px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                🌱 {lang === 'ar' ? 'مستقبل الزراعة' : 'The Future of Farming'}
              </div>
              
              <div className="mb-6">
                <h1 className="text-4xl sm:text-6xl font-bold text-[#3A8B50] dark:text-[#4CAF50] mb-4">
              {translations.hero.title[lang]}
            </h1>
                <div className="relative inline-block">
                  <h2 className="text-4xl sm:text-6xl font-bold text-[#F5A623]">
                    {translations.hero.subtitle[lang]}
                  </h2>
            <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <div 
                      className={`h-full bg-[#F5A623] transform ${lang === 'ar' ? 'origin-right' : 'origin-left'}`}
                      style={{ clipPath: 'polygon(0 45%, 100% 0, 100% 100%, 0% 100%)' }}
                    />
                  </motion.div>
                </div>
              </div>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
                {translations.hero.watchVideo[lang]}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Start Free Button */}
                <motion.button
              whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/start')}
                  className="group relative w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] rounded-xl blur-md opacity-75 transition-all duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#3A8B50] to-[#2d6e3e] text-white px-8 py-4 rounded-xl font-medium text-lg min-w-[200px]
                    border border-white/10 shadow-xl backdrop-blur-sm">
                    <span>{translations.cta.startButton[lang]}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
                </motion.button>

                {/* Watch Video Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group relative w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl blur-md opacity-75 transition-all duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-center gap-3 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white px-8 py-4 rounded-xl font-medium text-lg min-w-[200px]
                    border border-gray-200 dark:border-gray-700 shadow-xl backdrop-blur-sm hover:border-[#3A8B50]/20">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3A8B50]/10 dark:bg-[#3A8B50]/20">
                        <Play className="w-4 h-4 text-[#3A8B50] dark:text-[#4CAF50]" />
              </div>
                      <span className="bg-gradient-to-r from-[#3A8B50] to-[#2d6e3e] bg-clip-text text-transparent">
                        {translations.hero.watchVideo[lang]}
                      </span>
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Trust badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16 pt-8 border-t border-gray-200/20 dark:border-gray-700/20"
              >
                <div className="flex flex-col items-center gap-6">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <span className="w-12 h-[1px] bg-gray-300 dark:bg-gray-700" />
                    {lang === 'ar' ? 'يثق بنا' : 'Trusted by'}
                    <span className="w-12 h-[1px] bg-gray-300 dark:bg-gray-700" />
                  </span>
                  
                  <div className="flex flex-wrap justify-center gap-6 items-center">
                    {[
                      {
                        name: lang === 'ar' ? 'وزارة الزراعة' : 'Ministry of Agriculture',
                        icon: <Building2 className="w-6 h-6" />,
                        color: "from-green-500 to-green-600"
                      },
                      {
                        name: lang === 'ar' ? 'جمعية المزارعين' : 'Farmers Association',
                        icon: <Users className="w-6 h-6" />,
                        color: "from-blue-500 to-blue-600"
                      },
                      {
                        name: lang === 'ar' ? 'البنك الزراعي' : 'Agricultural Bank',
                        icon: <Building2 className="w-6 h-6" />,
                        color: "from-yellow-500 to-yellow-600"
                      }
                    ].map((partner, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + (index * 0.1) }}
                        whileHover={{ y: -5 }}
                        className="relative group"
                      >
                        {/* Card */}
                        <div className="relative px-6 py-4 rounded-xl bg-white/50 dark:bg-gray-800/50 
                          backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 
                          hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300
                          shadow-sm hover:shadow-md"
                        >
                          {/* Gradient Hover Effect */}
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${partner.color} 
                            opacity-0 group-hover:opacity-5 transition-opacity duration-300`} 
                          />
                          
                          {/* Content */}
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${partner.color} 
                              flex items-center justify-center text-white/90 shadow-sm`}
                            >
                              {partner.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {partner.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {lang === 'ar' ? 'شريك موثوق' : 'Verified Partner'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative w-full max-w-[500px] mx-auto mt-12 lg:mt-0"
            >
              {/* Background cards */}
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full">
                {heroCards.map((card, index) => {
                  const isActive = index === currentCardIndex;
                  const offset = (index - currentCardIndex + heroCards.length) % heroCards.length;
                  
                  return (
                    <motion.div
                      key={index}
                      className={`absolute inset-0 rounded-2xl shadow-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : 0.9 - (offset * 0.05),
                        opacity: isActive ? 1 : 0.5 - (offset * 0.2),
                        zIndex: heroCards.length - offset,
                        y: offset * 20,
                        rotateY: offset * -5,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ 
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 0.5
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {card.icon}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Floating stats card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: -20, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-6 left-6 sm:-left-6 bg-white dark:bg-gray-800 rounded-xl 
                    shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl p-4 
                    flex items-center gap-3 z-50"
                >
                  <div className="p-2 bg-[#3A8B50]/10 dark:bg-[#3A8B50]/20 rounded-lg">
                    {heroCards[currentCardIndex].stat.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {heroCards[currentCardIndex].stat.label[lang]}
                    </div>
                    <div className="text-lg font-bold bg-gradient-to-r from-[#3A8B50] to-[#2d6e3e] 
                      bg-clip-text text-transparent">
                      {heroCards[currentCardIndex].stat.value}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        id="stats"
            initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative w-full py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statsCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${stat.gradient} backdrop-blur-sm rounded-2xl shadow-lg p-8
                  border border-white/50 dark:border-white/10 hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-${stat.accentColor}-100 dark:bg-${stat.accentColor}-900/30 rounded-xl`}>
                    {stat.icon}
              </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-bold text-${stat.accentColor}-600 dark:text-${stat.accentColor}-400`}>
                        <AnimatedNumber 
                          value={stat.number} 
                          formatter={(value) => value.toLocaleString()}
                        />
                      </span>
                      <span className={`text-2xl font-semibold text-${stat.accentColor}-600 dark:text-${stat.accentColor}-400`}>
                        {stat.suffix}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {stat.label[lang]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {stat.description[lang]}
                    </p>
                  </div>
                </div>
          </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

          {/* Live Price Ticker */}
      <section id="prices" className="relative w-full py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden
              border border-gray-200 dark:border-gray-700"
          >
            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#3A8B50] to-[#2d6e3e] bg-clip-text text-transparent">
              {translations.prices.title[lang]}
            </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {lang === 'ar' 
                        ? 'أسعار السوق المحدثة' 
                        : 'Updated Market Prices'}
                    </p>
                </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    {lang === 'ar' ? 'ارتفاع' : 'Up'}
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    {lang === 'ar' ? 'انخفاض' : 'Down'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {prices.map((item, index) => (
                  <PriceCard 
                    key={index}
                    index={index}
                    item={{ 
                      ...item, 
                      price: Number(item.price[lang]), 
                      previousPrice: Number(item.price[lang]),
                      trend: item.trend as 'up' | 'down' | 'stable',
                      icon: <Leaf className="w-6 h-6" />
                    }} 
                  />
              ))}
            </div>

              {/* View More Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <motion.button
                  onClick={() => router.push('/prices')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-6 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 
                    border border-gray-200 dark:border-gray-700 shadow-sm
                    text-gray-700 dark:text-gray-300 font-medium
                    hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    {translations.prices.viewMore[lang]}
                    <motion.div
                      animate={{ rotate: showMore ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5" />
          </motion.div>
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

          {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden my-24"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 to-white/50 dark:from-gray-900/90 dark:to-gray-800/50" />
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(58,139,80,0.03) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-24">
            <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden">
              {/* Glass Background */}
              <div className="absolute inset-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl" />
              <div className="absolute inset-0 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl" />
              
              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Text Content */}
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                    bg-[#3A8B50]/5 dark:bg-gray-800/60">
                    <div className="w-2 h-2 rounded-full bg-[#3A8B50]/40" />
                    <span className="text-sm font-medium text-[#3A8B50]/80 dark:text-gray-300">
                      {lang === 'ar' ? 'نمو مستمر' : 'Growing Together'}
                    </span>
                  </div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white"
                  >
                    {translations.cta.title[lang]}
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    {translations.cta.subtitle[lang]}
                  </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative overflow-hidden px-8 py-4 rounded-xl 
                        bg-[#3A8B50] font-bold text-lg shadow-sm hover:shadow-md
                        transition-all duration-200 flex items-center justify-center gap-2 text-white"
                    >
                      <span>{translations.cta.startButton[lang]}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group px-8 py-4 rounded-xl border border-gray-300 dark:border-gray-600
                        font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2
                        text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <Send className="w-5 h-5" />
                      <span>{translations.cta.contactButton[lang]}</span>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Right side - Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { 
                      value: "1000+",
                      label: lang === 'ar' ? "مزارع نشط" : "Active Farmers",
                      icon: <Users className="w-6 h-6" />
                    },
                    {
                      value: "50+",
                      label: lang === 'ar' ? "سوق محلي" : "Local Markets",
                      icon: <Building2 className="w-6 h-6" />
                    },
                    {
                      value: "95%",
                      label: lang === 'ar' ? "رضا العملاء" : "Satisfaction Rate",
                      icon: <ThumbsUp className="w-6 h-6" />
                    },
                    {
                      value: "24/7",
                      label: lang === 'ar' ? "دعم فني" : "Support",
                      icon: <Phone className="w-6 h-6" />
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                      className="relative group rounded-2xl p-6 overflow-hidden"
                    >
                      {/* Card Background */}
                      <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm" />
                      <div className="absolute inset-0 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl" />
                      
                      {/* Content */}
                      <div className="relative">
                        <div className="mb-3 bg-[#3A8B50]/5 dark:bg-gray-700/50 w-12 h-12 rounded-xl 
                          flex items-center justify-center text-[#3A8B50]/70 dark:text-gray-400">
                          {stat.icon}
                        </div>
                        <div className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

          {/* Features Section */}
          <motion.section
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 to-white/50 dark:from-gray-900/90 dark:to-gray-800/50" />
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(58,139,80,0.03) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                bg-[#3A8B50]/5 dark:bg-gray-800/60 mb-4"
            >
              <div className="w-2 h-2 rounded-full bg-[#3A8B50]/40" />
              <span className="text-sm font-medium text-[#3A8B50]/80 dark:text-gray-300">
                {lang === 'ar' ? 'ميزات حصرية' : 'Exclusive Features'}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              {translations.features.title[lang]}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400"
            >
              {lang === 'ar' 
                ? 'تقنيات متطورة تساعدك في إدارة مزرعتك بكفاءة عالية'
                : 'Advanced technologies to help you manage your farm efficiently'}
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {translations.features.items.map((feature, index) => (
                <motion.div
                  key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                className="relative group rounded-2xl p-8 overflow-hidden"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm" />
                <div className="absolute inset-0 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl" />
                
                {/* Content */}
                <div className="relative">
                  <div className="mb-6 bg-[#3A8B50]/5 dark:bg-gray-700/50 w-14 h-14 rounded-xl 
                    flex items-center justify-center text-[#3A8B50]/70 dark:text-gray-400
                    group-hover:scale-110 transition-transform duration-300"
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title[lang]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description[lang]}
                  </p>
                  
                  {/* Learn More Link */}
                  <div className="mt-6 flex items-center gap-2 text-[#3A8B50] dark:text-green-500 
                    group-hover:gap-3 transition-all duration-300"
                  >
                    <span className="text-sm font-medium">
                      {lang === 'ar' ? 'اكتشف المزيد' : 'Learn More'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                </motion.div>
              ))}
          </div>
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section
        id="testimonials"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 to-white/50 dark:from-gray-900/90 dark:to-gray-800/50" />
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(58,139,80,0.03) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                bg-[#3A8B50]/5 dark:bg-gray-800/60 mb-4"
            >
              <div className="w-2 h-2 rounded-full bg-[#3A8B50]/40" />
              <span className="text-sm font-medium text-[#3A8B50]/80 dark:text-gray-300">
                {lang === 'ar' ? 'قصص نجاح' : 'Success Stories'}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              {translations.testimonials.title[lang]}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400"
            >
              {lang === 'ar' 
                ? 'اسمع من مزارعينا عن تجربتهم مع زراعة'
                : 'Hear from our farmers about their experience with Zera3a'}
            </motion.p>
          </div>

          {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {translations.testimonials.items.map((testimonial, index) => (
                <motion.div
                  key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative rounded-2xl overflow-hidden">
                  {/* Background */}
                  <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm" />
                  <div className="absolute inset-0 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl" />
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-8 text-[#3A8B50]/10 dark:text-white/5">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                        >
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </motion.div>
              ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      "{testimonial.quote[lang]}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#3A8B50]/10 dark:bg-gray-700 
                        flex items-center justify-center text-[#3A8B50] dark:text-gray-300"
                      >
                        <User2 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {testimonial.author[lang]}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role[lang]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
            </div>
          </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        className="relative w-full py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
          <motion.div
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px'],
              transition: { duration: 20, repeat: Infinity, ease: 'linear' }
            }}
            className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.15]"
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                bg-[#3A8B50]/5 dark:bg-gray-800/60 mb-6 backdrop-blur-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#3A8B50]"
              />
              <span className="text-sm font-medium bg-gradient-to-r from-[#3A8B50] to-[#2d6e3e] 
                dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent">
                {lang === 'ar' ? 'خطط مرنة' : 'Flexible Plans'}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent"
            >
              {translations.pricing.title[lang]}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              {translations.pricing.subtitle[lang]}
            </motion.p>
          </div>

          {/* Pricing Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {translations.pricing.plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative ${index === 1 ? 'md:-mt-8' : ''}`}
              >
                {/* Card */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative rounded-[2rem] p-8 overflow-hidden backdrop-blur-xl
                    ${index === 1 
                      ? 'bg-gradient-to-b from-[#3A8B50]/10 to-transparent border-[#3A8B50]/20' 
                      : 'bg-white/60 dark:bg-gray-800/60 border-gray-200/50 dark:border-gray-700/50'
                    } border-2`}
                >
                  {/* Plan Content */}
                  <div className="relative">
                    {/* Plan Name & Price */}
                    <div className="mb-8">
                      <h3 className={`text-2xl font-bold mb-4 ${
                        index === 1 
                          ? 'text-[#3A8B50] dark:text-green-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {plan.name[lang]}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-5xl font-bold ${
                          index === 1 
                            ? 'text-[#3A8B50] dark:text-green-400' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {plan.price[lang]}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {plan.currency[lang]}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + (i * 0.1) }}
                          className="flex items-start gap-3"
                        >
                          <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center 
                            ${index === 1 
                              ? 'bg-[#3A8B50]/10 text-[#3A8B50]' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-gray-600 dark:text-gray-300">
                            {feature[lang]}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300
                        ${index === 1 
                          ? 'bg-gradient-to-r from-[#3A8B50] to-[#2d6e3e] text-white shadow-lg hover:shadow-xl' 
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                        }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {index === 2 
                          ? (lang === 'ar' ? 'تواصل معنا' : 'Contact Us')
                          : (lang === 'ar' ? 'ابدأ الآن' : 'Get Started')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16">
            {/* Money Back Guarantee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 px-6 py-3 rounded-full 
                bg-[#3A8B50]/5 dark:bg-gray-800/60 text-[#3A8B50] dark:text-green-400"
            >
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">
                {lang === 'ar' 
                  ? 'ضمان استعادة الأموال لمدة ٣٠ يوماً' 
                  : '30-Day Money-Back Guarantee'}
              </span>
            </motion.div>

            {/* Support Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 px-6 py-3 rounded-full 
                bg-[#3A8B50]/5 dark:bg-gray-800/60 text-[#3A8B50] dark:text-green-400"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium">
                {lang === 'ar' 
                  ? 'دعم فني على مدار الساعة' 
                  : '24/7 Technical Support'}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative pt-32 pb-12 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-gray-100/90 dark:from-gray-900/50 dark:to-gray-800/90" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 dark:to-gray-900/80" />
          {/* Animated Gradient Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3A8B50]/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-200/10 dark:bg-green-900/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pre-Footer CTA */}
          <div className="relative mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#3A8B50]/90 to-[#2d6e3e]/90 backdrop-blur-xl" />
              <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="max-w-xl">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    {lang === 'ar' ? 'جاهز لتنمية أعمالك؟' : 'Ready to grow your business?'}
                  </h2>
                  <p className="text-white/80 text-lg">
                    {lang === 'ar' 
                      ? 'انضم إلى آلاف المزارعين الذين يستخدمون زراعة لتحسين إنتاجهم'
                      : 'Join thousands of farmers using Zera3a to improve their yield'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-xl bg-white text-[#3A8B50] font-semibold text-lg
                    hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 group"
                >
                  {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 pb-16 border-b border-gray-200/30 dark:border-gray-700/30">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Image
                  src="/logo.png"
                  alt="Zera3a"
                  width={140}
                  height={40}
                  className="dark:brightness-200"
                />
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {lang === 'ar' 
                    ? 'نساعد المزارعين على تحقيق أقصى استفادة من محاصيلهم من خلال التكنولوجيا المبتكرة'
                    : 'Helping farmers maximize their crop value through innovative technology'}
                </p>
                {/* Social Links */}
                <div className="flex gap-4">
                  {[
                    { icon: <Facebook className="w-5 h-5" />, color: "hover:bg-blue-500" },
                    { icon: <Instagram className="w-5 h-5" />, color: "hover:bg-pink-500" },
                    { icon: <Twitter className="w-5 h-5" />, color: "hover:bg-blue-400" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ y: -3 }}
                      className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center
                        text-gray-600 dark:text-gray-400 ${social.color} hover:text-white transition-all duration-200`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  {translations.footer.contact.title[lang]}
                </h3>
                <ul className="space-y-4">
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#3A8B50]/10 dark:bg-gray-800 
                      flex items-center justify-center text-[#3A8B50] dark:text-green-500"
                    >
                      <Phone className="w-4 h-4" />
                    </div>
                    {translations.footer.contact.phone[lang]}
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#3A8B50]/10 dark:bg-gray-800 
                      flex items-center justify-center text-[#3A8B50] dark:text-green-500"
                    >
                      <Mail className="w-4 h-4" />
                    </div>
                    {translations.footer.contact.email[lang]}
                  </motion.li>
                </ul>
              </motion.div>

              {/* Links Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  {translations.footer.links.title[lang]}
                </h3>
                <ul className="space-y-4">
                {translations.footer.links.items.map((link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                    >
                      <a href="#" className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 
                        hover:text-[#3A8B50] dark:hover:text-green-500 transition-colors duration-200"
                      >
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        {link[lang]}
                      </a>
                    </motion.li>
                ))}
              </ul>
              </motion.div>

              {/* Newsletter Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  {lang === 'ar' ? 'النشرة البريدية' : 'Newsletter'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {lang === 'ar' 
                    ? 'اشترك للحصول على آخر التحديثات'
                    : 'Subscribe for latest updates'}
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder={lang === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                      focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20 dark:focus:ring-green-500/20"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-[#3A8B50] text-white font-medium hover:bg-[#2d6e3e]
                      transition-colors duration-200"
                  >
                    {lang === 'ar' ? 'اشترك' : 'Subscribe'}
                  </motion.button>
            </div>
              </motion.div>
              </div>
            </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-400 text-sm"
            >
              {translations.footer.copyright[lang]}
            </motion.p>
            <div className="flex items-center gap-8">
              {['Privacy', 'Terms', 'Cookies'].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#3A8B50] 
                    dark:hover:text-green-500 transition-colors duration-200"
                >
                  {item}
                </motion.a>
              ))}
          </div>
          </div>
        </div>
      </footer>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="/your-video-url.mp4" // Replace with your actual video URL
      />
    </div>
  );
}
