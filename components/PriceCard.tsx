"use client";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

type PriceRange = {
  min: number;
  max: number;
  average: number;
};

const getPriceStatus = (currentPrice: number, dailyStats: { high: number; low: number; openPrice: number }) => {
  // Calculate position in the range (0 to 1)
  const position = (currentPrice - dailyStats.low) / (dailyStats.high - dailyStats.low);
  
  if (position <= 0.33) return { 
    status: 'low',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    message: { ar: 'سعر منخفض', en: 'Low' }
  };
  if (position <= 0.66) return { 
    status: 'normal',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    message: { ar: 'سعر معتدل', en: 'Normal' }
  };
  return { 
    status: 'high',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    message: { ar: 'سعر مرتفع جداً', en: 'Very High' }
  };
};

type PriceCardProps = {
  item: {
    name: { ar: string; en: string };
    price: number;
    previousPrice: number;
    unit: { ar: string; en: string };
    trend: 'up' | 'down' | 'stable';
    icon?: React.ReactNode;
    priceRange?: PriceRange;
  };
  index?: number;
};

export default function PriceCard({ item, index = 0 }: PriceCardProps) {
  const { lang } = useLanguage();
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(item.price);
  const [previousPrice, setPreviousPrice] = useState(item.price);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>(item.trend);

  // Keep track of daily high/low
  const [dailyStats, setDailyStats] = useState({
    high: currentPrice,
    low: currentPrice,
    openPrice: currentPrice
  });

  useEffect(() => {
    // Update stats when price changes
    setDailyStats(prev => ({
      high: Math.max(prev.high, currentPrice),
      low: Math.min(prev.low, currentPrice),
      openPrice: prev.openPrice
    }));
  }, [currentPrice]);

  // Calculate price change percentage
  const change = ((currentPrice - previousPrice) / previousPrice * 100).toFixed(1);

  // Add default price range if not provided
  const priceRange = item.priceRange || {
    min: item.price * 0.7,
    max: item.price * 1.3,
    average: item.price
  };

  const priceStatus = getPriceStatus(currentPrice, dailyStats);

  // Simulate price updates (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      const maxChange = 0.5; // Maximum price change
      const randomChange = (Math.random() - 0.5) * maxChange;
      const newPrice = Number((currentPrice + randomChange).toFixed(2));
      
      // Only update if within reasonable bounds
      if (newPrice >= dailyStats.low && newPrice <= dailyStats.high) {
        setIsUpdating(true);
        setPreviousPrice(currentPrice);
        setCurrentPrice(newPrice);
        
        // Update trend based on price change
        if (randomChange > 0) {
          setTrend('up');
        } else if (randomChange < 0) {
          setTrend('down');
        } else {
          setTrend('stable');
        }
        
        setTimeout(() => setIsUpdating(false), 300);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPrice, dailyStats]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
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

        {/* Current Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <motion.div
            key={currentPrice}
            initial={{ opacity: 0, y: isUpdating ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-[#3A8B50] to-[#2d6e3e] bg-clip-text text-transparent"
          >
            {currentPrice.toFixed(2)}
          </motion.div>
        </div>

        {/* Price Range Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {lang === 'ar' ? 'نطاق السعر' : 'Price Range'}
            </span>
            <span className={`px-2 py-1 rounded-md text-xs font-medium 
              ${priceStatus.color} ${priceStatus.bgColor}`}
            >
              {priceStatus.message[lang]}
            </span>
          </div>

          <div className="relative h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            {/* Price range indicators */}
            <div className="absolute inset-y-0 left-0 bg-green-500" 
              style={{ width: `${((priceRange.min - dailyStats.low) / (dailyStats.high - dailyStats.low)) * 100}%` }} 
            />
            <div className="absolute inset-y-0 bg-yellow-500" 
              style={{ 
                left: `${((priceRange.min - dailyStats.low) / (dailyStats.high - dailyStats.low)) * 100}%`,
                width: `${((priceRange.max - priceRange.min) / (dailyStats.high - dailyStats.low)) * 100}%` 
              }} 
            />
            <div className="absolute inset-y-0 right-0 bg-red-500" 
              style={{ width: `${((dailyStats.high - priceRange.max) / (dailyStats.high - dailyStats.low)) * 100}%` }} 
            />
          </div>

          {/* Price labels */}
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{priceRange.min.toFixed(2)}</span>
            <span>{priceRange.average.toFixed(2)}</span>
            <span>{priceRange.max.toFixed(2)}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Open</div>
            <div className="font-medium">{dailyStats.openPrice.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">High</div>
            <div className="font-medium text-green-500">{dailyStats.high.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Low</div>
            <div className="font-medium text-red-500">{dailyStats.low.toFixed(2)}</div>
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
} 