"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Leaf, ArrowLeft, Filter, Search, Calendar, MapPin, X, ChevronDown } from "lucide-react";
import PriceCard from "@/components/PriceCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Navbar";

// Add crop seasons data
const cropSeasons = {
  winter: {
    title: { ar: "المحاصيل الشتوية", en: "Winter Crops" },
    months: { ar: "نوفمبر - فبراير", en: "Nov - Feb" },
    crops: [
      { ar: "القمح", en: "Wheat" },
      { ar: "الشعير", en: "Barley" },
      { ar: "البصل", en: "Onions" },
      { ar: "الثوم", en: "Garlic" }
    ]
  },
  summer: {
    title: { ar: "المحاصيل الصيفية", en: "Summer Crops" },
    months: { ar: "مارس - يونيو", en: "Mar - Jun" },
    crops: [
      { ar: "الذرة", en: "Corn" },
      { ar: "القطن", en: "Cotton" },
      { ar: "الأرز", en: "Rice" },
      { ar: "السمسم", en: "Sesame" }
    ]
  },
  nili: {
    title: { ar: "المحاصيل النيلية", en: "Nili Crops" },
    months: { ar: "يوليو - أكتوبر", en: "Jul - Oct" },
    crops: [
      { ar: "الذرة النيلية", en: "Nili Corn" },
      { ar: "البطاطس", en: "Potatoes" },
      { ar: "الطماطم", en: "Tomatoes" },
      { ar: "الخيار", en: "Cucumber" }
    ]
  }
};

// Add more comprehensive price data
const allCropsData = [
  // Vegetables
  { 
    name: { ar: "طماطم", en: "Tomatoes" }, 
    price: { ar: "٨", en: "8" }, 
    trend: "up" as const, 
    unit: { ar: "جنيه/كجم", en: "EGP/kg" }, 
    season: "nili", 
    category: "vegetables",
    updatedAt: new Date('2024-03-10T10:00:00').getTime(),
    priceRange: {
      min: 6,
      max: 12,
      average: 8
    }
  },
  { 
    name: { ar: "بطاطس", en: "Potatoes" }, 
    price: { ar: "١٠", en: "10" }, 
    trend: "down" as const, 
    unit: { ar: "جنيه/كجم", en: "EGP/kg" }, 
    season: "nili", 
    category: "vegetables",
    updatedAt: new Date('2024-03-10T09:30:00').getTime()
  },
  { name: { ar: "خيار", en: "Cucumber" }, price: { ar: "٦", en: "6" }, trend: "up" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "summer", category: "vegetables", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "باذنجان", en: "Eggplant" }, price: { ar: "٩", en: "9" }, trend: "down" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "summer", category: "vegetables", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "فلفل", en: "Bell Peppers" }, price: { ar: "١٢", en: "12" }, trend: "up" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "summer", category: "vegetables", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "كوسة", en: "Zucchini" }, price: { ar: "٧", en: "7" }, trend: "stable" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "summer", category: "vegetables", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "بصل", en: "Onions" }, price: { ar: "٥", en: "5" }, trend: "down" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "winter", category: "vegetables", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "ثوم", en: "Garlic" }, price: { ar: "٢٥", en: "25" }, trend: "up" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "winter", category: "vegetables", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "جزر", en: "Carrots" }, price: { ar: "٦", en: "6" }, trend: "stable" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "winter", category: "vegetables", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  
  // Fruits
  { name: { ar: "برتقال", en: "Oranges" }, price: { ar: "١٥", en: "15" }, trend: "up" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "winter", category: "fruits", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "عنب", en: "Grapes" }, price: { ar: "٢٠", en: "20" }, trend: "down" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "summer", category: "fruits", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "مانجو", en: "Mangoes" }, price: { ar: "٣٠", en: "30" }, trend: "up" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "summer", category: "fruits", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "موز", en: "Bananas" }, price: { ar: "١٨", en: "18" }, trend: "stable" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "summer", category: "fruits", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "تفاح", en: "Apples" }, price: { ar: "٢٥", en: "25" }, trend: "down" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "winter", category: "fruits", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "فراولة", en: "Strawberries" }, price: { ar: "٢٢", en: "22" }, trend: "up" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "winter", category: "fruits", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  
  // Grains
  { name: { ar: "قمح", en: "Wheat" }, price: { ar: "١٢", en: "12" }, trend: "up" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "winter", category: "grains", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "ذرة", en: "Corn" }, price: { ar: "٧", en: "7" }, trend: "stable" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "summer", category: "grains", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "شعير", en: "Barley" }, price: { ar: "٩", en: "9" }, trend: "down" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "winter", category: "grains", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "أرز", en: "Rice" }, price: { ar: "١٤", en: "14" }, trend: "up" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "summer", category: "grains", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "فول", en: "Fava Beans" }, price: { ar: "١٦", en: "16" }, trend: "stable" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "winter", category: "grains", updatedAt: new Date('2024-03-10T10:00:00').getTime() },
  { name: { ar: "عدس", en: "Lentils" }, price: { ar: "٢٠", en: "20" }, trend: "down" as const, unit: { ar: "جنيه/كجم", en: "EGP/kg" }, season: "winter", category: "grains", updatedAt: new Date('2024-03-10T10:00:00').getTime() }
];

export default function PricesPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<keyof typeof cropSeasons | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'highest' | 'lowest'>('latest');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter and sort prices
  const filteredPrices = allCropsData
    // First filter the data
    .filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name[lang].toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeason = !selectedSeason || item.season === selectedSeason;
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      
      return matchesSearch && matchesSeason && matchesCategory;
    })
    // Then sort the filtered data
    .sort((a, b) => {
      switch (sortBy) {
        case 'highest':
          return parseFloat(b.price.en) - parseFloat(a.price.en);
        case 'lowest':
          return parseFloat(a.price.en) - parseFloat(b.price.en);
        case 'latest':
          return b.updatedAt - a.updatedAt;
        default:
          return 0;
      }
    })
    // Finally map the sorted data to PriceCard props
    .map(item => ({
      ...item,
      price: Number(item.price[lang]),
      previousPrice: Number(item.price[lang]),
      trend: item.trend,
      icon: <Leaf className="w-6 h-6" />
    }));

  // Categories data
  const categories = [
    { id: 'vegetables', label: { ar: 'خضروات', en: 'Vegetables' } },
    { id: 'fruits', label: { ar: 'فواكه', en: 'Fruits' } },
    { id: 'grains', label: { ar: 'حبوب', en: 'Grains' } }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3A8B50]/5 to-transparent dark:from-green-900/10" />
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(58,139,80,0.03) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            onClick={() => router.push('/')}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 
              hover:text-[#3A8B50] dark:hover:text-green-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </motion.button>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#3A8B50] to-[#2d6e3e] 
              bg-clip-text text-transparent mb-4">
              {lang === 'ar' ? 'أسعار اليوم' : "Today's Prices"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {lang === 'ar' 
                ? 'تابع أسعار المحاصيل في الوقت الحقيقي'
                : 'Track crop prices in real-time'}
            </p>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-12 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Search */}
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === 'ar' ? 'ابحث عن محصول...' : 'Search crops...'}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                      bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 
                      focus:ring-[#3A8B50]/20 dark:focus:ring-green-500/20"
                  />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                    hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  {lang === 'ar' ? 'الفلاتر' : 'Filters'}
                </button>

                {/* Clear Filters Button - Show only when filters are active */}
                {(searchQuery || selectedCategory || selectedSeason || sortBy !== 'latest') && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                      setSelectedSeason(null);
                      setSortBy('latest');
                    }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-red-500 hover:text-red-600 
                      border border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700
                      hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                    {lang === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                  </motion.button>
                )}

                {/* Improved Sorting Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'latest' | 'highest' | 'lowest')}
                    className="appearance-none pl-4 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                      bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A8B50]/20 
                      dark:focus:ring-green-500/20 cursor-pointer transition-colors"
                  >
                    <option value="latest">
                      {lang === 'ar' ? 'أحدث الأسعار' : 'Latest Prices'}
                    </option>
                    <option value="highest">
                      {lang === 'ar' ? 'الأعلى سعراً' : 'Highest Price'}
                    </option>
                    <option value="lowest">
                      {lang === 'ar' ? 'الأقل سعراً' : 'Lowest Price'}
                    </option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none
                    text-gray-500 dark:text-gray-400">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {lang === 'ar' ? 'التصنيفات' : 'Categories'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(
                          selectedCategory === category.id ? null : category.id
                        )}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors
                          ${selectedCategory === category.id
                            ? 'bg-[#3A8B50] text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                          }`}
                      >
                        {category.label[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Crop Seasons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(cropSeasons).map(([season, data]) => (
                    <motion.div
                      key={season}
                      whileHover={{ y: -2 }}
                      onClick={() => setSelectedSeason(season as keyof typeof cropSeasons)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all
                        ${selectedSeason === season
                          ? 'border-[#3A8B50] bg-[#3A8B50]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-[#3A8B50]/50'
                        }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-[#3A8B50]/10">
                          {season === 'winter' ? <Calendar className="w-5 h-5 text-[#3A8B50]" /> :
                           season === 'summer' ? <MapPin className="w-5 h-5 text-[#3A8B50]" /> :
                           <Leaf className="w-5 h-5 text-[#3A8B50]" />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {data.title[lang]}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {data.months[lang]}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {data.crops.map((crop, index) => (
                          <span
                            key={index}
                            className="text-sm px-2 py-1 rounded-lg bg-white dark:bg-gray-800
                              border border-gray-200 dark:border-gray-700"
                          >
                            {crop[lang]}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Results Count */}
          <div className="mb-6 text-gray-600 dark:text-gray-400">
            {lang === 'ar' 
              ? `${filteredPrices.length} نتيجة`
              : `${filteredPrices.length} results`}
          </div>

          {/* Price Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrices.map((item, index) => (
              <PriceCard
                key={item.name.en}
                item={item}
              />
            ))}
          </div>

          {/* No Results Message */}
          {filteredPrices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {lang === 'ar' 
                  ? 'لا توجد نتائج مطابقة لبحثك'
                  : 'No matching results found'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 