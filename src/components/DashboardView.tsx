import React, { useRef, useState, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Menu, 
  Bell, 
  Search, 
  Filter, 
  Lightbulb, 
  FileText, 
  Heart, 
  Scan, 
  Stethoscope, 
  X, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Droplets, 
  Sparkles, 
  Sun, 
  Moon, 
  LogOut, 
  Sprout, 
  ShieldCheck, 
  MapPin,
  RefreshCw,
  Info,
  BookOpen
} from 'lucide-react';
import { User, Language, PlantAnalysisData } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { SAMPLE_PLANTS, SampleLeaf } from '../utils/sampleImages';
import { PLANT_GUIDES, PlantGuideItem } from '../utils/plantGuideData';
import { 
  WeatherData, 
  fetchWeatherForCoordinates, 
  fetchIPLocationWeather, 
  detectLiveLocation,
  getSavedWeatherData,
  searchLocations,
  GeocodedLocation,
  POPULAR_LOCATIONS 
} from '../utils/weatherService';

interface DashboardViewProps {
  user: User | null;
  currentLanguage: Language;
  onLanguageChange?: (lang: Language) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onNavigateToAnalyze: (mode?: 'upload' | 'camera') => void;
  onNavigateToDiagnose?: () => void;
  onNavigateToPlantGuide?: () => void;
  onNavigateToHistory?: () => void;
  onSelectSample?: (sample: SampleLeaf) => void;
  recentAnalyses: PlantAnalysisData[];
  onSelectHistoryItem: (item: PlantAnalysisData) => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
  onStartAnalysis?: (base64: string, mime?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  currentLanguage,
  onLanguageChange,
  theme,
  onToggleTheme,
  onNavigateToAnalyze,
  onNavigateToDiagnose,
  onNavigateToHistory,
  recentAnalyses,
  onSelectHistoryItem,
  onOpenAuth,
  onLogout,
  onStartAnalysis
}) => {
  const t = UI_TRANSLATIONS[currentLanguage];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modals state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [favoriteOpen, setFavoriteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [tipsModalOpen, setTipsModalOpen] = useState(false);
  const [selectedTipCrop, setSelectedTipCrop] = useState<PlantGuideItem | null>(null);

  // Live Location & Weather state
  const [weatherData, setWeatherData] = useState<WeatherData>(() => {
    const saved = getSavedWeatherData();
    if (saved) return saved;
    return {
      city: 'Detecting Location...',
      temperature: 29,
      feelsLike: 30,
      humidity: 68,
      windSpeed: 10,
      condition: 'Optimal for Crops',
      gardeningAdviceEn: 'Mild conditions: Ideal for crop growth and health inspection.',
      gardeningAdviceTa: 'மிதமான வானிலை: பயிர்கள் வளர்ச்சி மற்றும் பூச்சி ஆய்வுக்கு ஏற்றது.',
      gardeningAdviceTanglish: 'Nalla climate: Chedi check panna nalla time.',
      weatherCode: 1,
      isDay: true,
      latitude: 9.9252,
      longitude: 78.1198,
      lastUpdated: 'Just now'
    };
  });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [customCitySearch, setCustomCitySearch] = useState('');
  const [citySearchResults, setCitySearchResults] = useState<GeocodedLocation[]>([]);
  const [isSearchingCity, setIsSearchingCity] = useState(false);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Favorites state
  const [favoriteCrops, setFavoriteCrops] = useState<string[]>(['rice_paddy', 'tomato_crop', 'coconut_crop', 'chilli_crop']);

  // Automatically detect user's live current location via browser GPS / Geolocation API or IP fallback
  const handleDetectLiveLocation = async () => {
    setIsDetectingLocation(true);
    try {
      const data = await detectLiveLocation();
      setWeatherData(data);
    } catch (err) {
      console.warn('Live location detection failed, using fallback', err);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  useEffect(() => {
    handleDetectLiveLocation();
  }, []);

  // Debounced search for any custom city/town/village
  useEffect(() => {
    if (customCitySearch.trim().length >= 2) {
      setIsSearchingCity(true);
      const timer = setTimeout(async () => {
        const results = await searchLocations(customCitySearch);
        setCitySearchResults(results);
        setIsSearchingCity(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setCitySearchResults([]);
      setIsSearchingCity(false);
    }
  }, [customCitySearch]);

  // Handle selecting a popular city manually
  const handleSelectCity = async (loc: { name: string; district?: string; lat: number; lon: number }) => {
    setIsDetectingLocation(true);
    setLocationModalOpen(false);
    setCustomCitySearch('');
    setCitySearchResults([]);
    try {
      const data = await fetchWeatherForCoordinates(loc.lat, loc.lon, loc.name, loc.district);
      setWeatherData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Handle selecting a geocoded search result
  const handleSelectGeocodedCity = async (loc: GeocodedLocation) => {
    setIsDetectingLocation(true);
    setLocationModalOpen(false);
    setCustomCitySearch('');
    setCitySearchResults([]);
    try {
      const data = await fetchWeatherForCoordinates(loc.lat, loc.lon, loc.name, loc.admin1);
      setWeatherData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Botanical Quiz Questions
  const quizQuestions = [
    {
      q: currentLanguage === 'ta' ? 'தக்காளி செடிகளுக்கு தண்ணீர் பாய்ச்ச உகந்த நேரம் எது?' : 'What is the best time to water tomato plants?',
      options: [
        currentLanguage === 'ta' ? 'அதிகாலை வேளையில் (Early Morning)' : 'Early in the morning at the soil base',
        currentLanguage === 'ta' ? 'மதிய வெயிலில் (Noon sun)' : 'During noon under hot sun',
        currentLanguage === 'ta' ? 'இரவு தூங்கும் போது (Midnight)' : 'Late at night wetting leaves',
        currentLanguage === 'ta' ? 'எப்போது வேண்டுமானாலும் (Anytime)' : 'Any random time'
      ],
      correct: 0,
      tip: currentLanguage === 'ta' ? 'அதிகாலை வேளையில் வேர்ப்பகுதியில் நீர் பாய்ச்சுவது இலைக்கருகல் பூஞ்சாணத்தை முற்றிலும் தடுக்கும்!' : 'Morning root watering prevents moisture lingering on foliage and stops blight spores!'
    },
    {
      q: currentLanguage === 'ta' ? 'இலைகளில் வெள்ளை மாவு போன்ற படலம் எந்த நோயின் அறிகுறி?' : 'White powdery coating on leaves is caused by which pathogen?',
      options: [
        currentLanguage === 'ta' ? 'சாம்பல் நோய் (Powdery Mildew)' : 'Powdery Mildew Fungus',
        currentLanguage === 'ta' ? 'வேரழுகல் (Root Rot)' : 'Pythium Root Rot',
        currentLanguage === 'ta' ? 'நைட்ரஜன் குறைபாடு (N Deficiency)' : 'Nitrogen Nutrient Deficiency',
        currentLanguage === 'ta' ? 'சூரிய ஒளி காயம் (Sunburn)' : 'Intense Sun Scald'
      ],
      correct: 0,
      tip: currentLanguage === 'ta' ? 'சாம்பல் நோய்க்கு 5 மிலி வேப்ப எண்ணெய் அல்லது புளித்த மோர் கரைசல் தெளிப்பது மிகச்சிறந்த இயற்கை மருந்து.' : 'Spray 5ml Neem oil with water or baking soda solution to eradicate powdery mildew.'
    }
  ];

  const handleQuizAnswer = (idx: number) => {
    setQuizSelectedAnswer(idx);
    if (idx === quizQuestions[quizIndex].correct) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setQuizSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const toggleFavorite = (cropId: string) => {
    setFavoriteCrops((prev) => 
      prev.includes(cropId) ? prev.filter(id => id !== cropId) : [...prev, cropId]
    );
  };

  // Direct file upload handler
  const handleDirectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onStartAnalysis) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onStartAnalysis(dataUrl, file.type);
      };
      reader.readAsDataURL(file);
    } else {
      onNavigateToAnalyze('upload');
    }
  };

  // Filtered search results
  const searchResults = searchQuery.trim() 
    ? PLANT_GUIDES.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tamilName.includes(searchQuery) ||
        c.tanglishName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Weather Advice string in active language
  const activeWeatherAdvice = 
    currentLanguage === 'ta' 
      ? weatherData.gardeningAdviceTa 
      : currentLanguage === 'tanglish' 
      ? weatherData.gardeningAdviceTanglish 
      : weatherData.gardeningAdviceEn;

  return (
    <div className="max-w-md sm:max-w-xl mx-auto space-y-4 animate-in fade-in duration-300 pb-20 px-1 sm:px-0">
      
      {/* ========================================================================= */}
      {/* 1. NIGHT SKY ATMOSPHERIC HERO CARD WITH LIVE LOCATION & WEATHER */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#030718] via-[#091538] to-[#12234f] text-white p-5 sm:p-7 min-h-[260px] sm:min-h-[290px] flex flex-col justify-between border border-[#1b2b52]/50">
        
        {/* Deep starry sky background sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-4 left-20 w-1 h-1 bg-white rounded-full opacity-80 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute top-12 left-10 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-90 shadow-xs" />
          <div className="absolute top-8 left-1/2 w-1 h-1 bg-white rounded-full opacity-60" />
          <div className="absolute top-20 left-1/4 w-1 h-1 bg-amber-100 rounded-full opacity-75" />
          <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-white rounded-full opacity-80" />
          <div className="absolute top-16 right-20 w-1 h-1 bg-cyan-200 rounded-full opacity-70" />
        </div>

        {/* Top Header Bar inside Sky: Hamburger Menu (Left) and Notification Bell (Right) */}
        <div className="relative z-20 flex items-center justify-between">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <Menu className="w-5 h-5 text-white stroke-[2.2]" />
          </button>

          <div className="flex items-center space-x-2">
            {/* Live GPS Refresh Indicator */}
            <button
              onClick={() => handleDetectLiveLocation()}
              disabled={isDetectingLocation}
              title="Refresh GPS Weather"
              className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center space-x-1 text-xs text-white transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin text-purple-300' : 'text-emerald-300'}`} />
              <span className="text-[11px] font-bold">
                {isDetectingLocation ? 'Detecting...' : 'Live GPS'}
              </span>
            </button>

            <button
              onClick={() => setNotificationsOpen(true)}
              aria-label="Notifications"
              className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#c4b5fd] active:scale-95 transition-all shadow-md cursor-pointer relative"
            >
              <Bell className="w-5 h-5 fill-[#b49bfb] text-[#b49bfb]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#081538]" />
            </button>
          </div>
        </div>

        {/* Luminous Full Moon & Cloud Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-5 right-14 sm:right-24 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#ffffff] via-[#f1f5f9] to-[#d8e2ec] shadow-[0_0_50px_rgba(255,255,255,0.65)] overflow-hidden">
            <div className="absolute top-4 left-6 w-5 h-5 rounded-full bg-[#cbd5e1]/45" />
            <div className="absolute top-9 left-11 w-7 h-6 rounded-full bg-[#cbd5e1]/35" />
            <div className="absolute bottom-6 left-5 w-8 h-8 rounded-full bg-[#cbd5e1]/40" />
          </div>

          <svg
            className="absolute bottom-8 -right-6 w-72 h-36 opacity-95"
            viewBox="0 0 300 150"
            fill="none"
          >
            <path
              d="M30 110 C40 70 80 70 100 80 C120 50 170 50 190 75 C210 55 260 65 270 95 C290 95 300 110 300 130 C300 150 250 150 200 150 L30 150 Z"
              fill="#102554"
            />
            <path
              d="M10 120 C25 85 65 85 85 95 C105 70 150 70 170 90 C190 75 235 85 245 110 C265 110 280 125 280 145 C280 150 240 150 180 150 L10 150 Z"
              fill="#183675"
            />
          </svg>

          <svg
            className="absolute bottom-0 left-0 right-0 w-full h-16 opacity-90"
            viewBox="0 0 400 65"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 45 Q 60 20, 130 40 T 260 25 T 400 40 L 400 65 L 0 65 Z"
              fill="#0d1b3f"
            />
          </svg>
        </div>

        {/* Real-time Temperature & Live Location Text */}
        <div className="relative z-10 pt-10 sm:pt-14 space-y-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
              {weatherData.temperature}°C
            </span>
            <span className="text-xs text-blue-200 font-semibold drop-shadow-xs">
              💧 {weatherData.humidity}% humidity
            </span>
          </div>

          {/* Interactive City Name Button (Tap to change location) */}
          <button
            onClick={() => setLocationModalOpen(true)}
            className="flex items-center space-x-1.5 text-base sm:text-lg font-bold text-white hover:text-purple-200 transition-colors cursor-pointer group"
          >
            <MapPin className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="underline decoration-dashed decoration-white/40 underline-offset-4">
              {weatherData.city} {weatherData.district ? `(${weatherData.district})` : ''}
            </span>
            <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold">
              Change
            </span>
          </button>

          {/* Real-time Weather condition & dynamic gardening tip */}
          <div className="text-xs sm:text-sm font-medium text-sky-200/90 drop-shadow-sm flex items-center space-x-1.5">
            <span>☀️ {weatherData.condition}</span>
            <span>•</span>
            <span className="truncate max-w-[240px] text-emerald-200 font-semibold">{activeWeatherAdvice}</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. FLOATING SEARCH BAR */}
      {/* ========================================================================= */}
      <div className="-mt-6 sm:-mt-7 mx-2 sm:mx-4 relative z-30">
        <div className="bg-white dark:bg-stone-800 rounded-2xl p-2 pl-4 shadow-xl shadow-indigo-950/10 dark:shadow-black/40 border border-stone-100 dark:border-stone-700/80 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Search className="w-5 h-5 text-[#9381ff] shrink-0 stroke-[2.2]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLanguage === 'ta' ? "பயிர்களைத் தேடுங்கள்..." : "Search plants"}
              className="w-full bg-transparent text-sm font-medium text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-stone-400 hover:text-stone-600 p-1 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            aria-label="Filter"
            className="w-11 h-11 rounded-xl bg-[#3b82f6] hover:bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Filter className="w-5 h-5 fill-white stroke-white" />
          </button>
        </div>

        {/* Real-time Search Dropdown */}
        {searchQuery.trim() && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-stone-800 rounded-2xl p-3 shadow-2xl border border-stone-200 dark:border-stone-700 z-50 max-h-72 overflow-y-auto space-y-2">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-1">
              Matching Crops ({searchResults.length})
            </div>
            {searchResults.length === 0 ? (
              <p className="text-xs text-stone-500 p-2 text-center">No plants matched. Try "Tomato", "Paddy", or "Rose".</p>
            ) : (
              searchResults.map((crop) => (
                <div
                  key={crop.id}
                  onClick={() => {
                    setSelectedTipCrop(crop);
                    setTipsModalOpen(true);
                    setSearchQuery('');
                  }}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <img src={crop.imageUrl} alt={crop.name} className="w-9 h-9 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">{crop.name} ({crop.tamilName})</h4>
                      <p className="text-[10px] text-emerald-600 font-semibold">{crop.growthDuration} • {crop.category}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </div>
              ))
            )}
          </div>
        )}

        {/* Filter Popup Menu */}
        {filterMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-stone-800 rounded-2xl p-3 shadow-2xl border border-stone-200 dark:border-stone-700 z-50 space-y-2 animate-in fade-in">
            <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block px-1">Filter Categories</span>
            {['All', 'Vegetable', 'Cereal', 'Cash Crop', 'Fruit', 'Spice'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setFilterMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                  selectedCategory === cat ? 'bg-blue-50 text-blue-700 font-bold' : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                }`}
              >
                <span>{cat}</span>
                {selectedCategory === cat && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. QUICK ACTIONS SECTION */}
      {/* ========================================================================= */}
      <div className="space-y-2 pt-2 px-1">
        <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100">
          {currentLanguage === 'ta' ? 'விரைவு செயல்பாடுகள்' : 'Quick Actions'}
        </h3>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
          {/* Action 1: Quiz */}
          <button
            onClick={() => {
              resetQuiz();
              setQuizOpen(true);
            }}
            className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-[#9b87f5] via-[#a78bfa] to-[#8b5cf6] text-white shadow-md shadow-purple-500/20 flex flex-col items-center justify-center gap-1.5 hover:opacity-95 active:scale-95 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <Lightbulb className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">
              {currentLanguage === 'ta' ? 'வினாடி வினா' : 'Quiz'}
            </span>
          </button>

          {/* Action 2: Change Location */}
          <button
            onClick={() => setLocationModalOpen(true)}
            className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-[#9b87f5] via-[#a78bfa] to-[#8b5cf6] text-white shadow-md shadow-purple-500/20 flex flex-col items-center justify-center gap-1.5 hover:opacity-95 active:scale-95 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide truncate max-w-full">
              {currentLanguage === 'ta' ? 'இடம்' : 'Location'}
            </span>
          </button>

          {/* Action 3: Scan History */}
          <button
            onClick={() => onNavigateToHistory ? onNavigateToHistory() : onNavigateToAnalyze('upload')}
            className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-[#9b87f5] via-[#a78bfa] to-[#8b5cf6] text-white shadow-md shadow-purple-500/20 flex flex-col items-center justify-center gap-1.5 hover:opacity-95 active:scale-95 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide whitespace-nowrap text-center leading-tight">
              {currentLanguage === 'ta' ? 'வரலாறு' : 'History'}
            </span>
          </button>

          {/* Action 4: Favorite */}
          <button
            onClick={() => setFavoriteOpen(true)}
            className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-[#9b87f5] via-[#a78bfa] to-[#8b5cf6] text-white shadow-md shadow-purple-500/20 flex flex-col items-center justify-center gap-1.5 hover:opacity-95 active:scale-95 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <Heart className="w-5 h-5 fill-white/30 text-white group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">
              {currentLanguage === 'ta' ? 'விருப்பம்' : 'Favorite'}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. ESSENTIAL QUICK TOOLS (2x2 Grid) */}
      {/* ========================================================================= */}
      <div className="space-y-2.5 pt-1 px-1">
        <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100">
          {currentLanguage === 'ta' ? 'முக்கிய கருவிகள்' : 'Quick Tools'}
        </h3>

        <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
          
          {/* Tool 1: Plant Scan */}
          <div
            onClick={() => onNavigateToAnalyze('camera')}
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#ebe8fc] via-[#eceafc] to-[#ded9fb] dark:bg-stone-800/90 border border-purple-100/90 dark:border-purple-900/40 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-white flex items-center justify-center shadow-md shadow-purple-500/25 mb-3 group-hover:scale-105 transition-transform">
              <Scan className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h4 className="text-base font-black text-stone-900 dark:text-stone-100">
              {currentLanguage === 'ta' ? 'தாவர ஸ்கேன்' : 'Plant Scan'}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-snug">
              {currentLanguage === 'ta' ? 'எந்த செடியையும் உடனடியாக கண்டறியுங்கள்' : 'Identify any plant instantly'}
            </p>
          </div>

          {/* Tool 2: AI Diagnose */}
          <div
            onClick={() => onNavigateToDiagnose ? onNavigateToDiagnose() : onNavigateToAnalyze('upload')}
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#def6f0] via-[#e6f9f5] to-[#cbf0ea] dark:bg-stone-800/90 border border-teal-100/90 dark:border-teal-900/40 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] text-white flex items-center justify-center shadow-md shadow-emerald-500/25 mb-3 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h4 className="text-base font-black text-stone-900 dark:text-stone-100">
              {currentLanguage === 'ta' ? 'AI நோய் பரிசோதனை' : 'AI Diagnose'}
            </h4>
            <p className="text-xs text-emerald-800 dark:text-emerald-400 font-bold mt-1 leading-snug">
              {currentLanguage === 'ta' ? 'இலை, பூ, தண்டு & வேர் நோய்கள்' : 'Leaves, stem, flower & roots'}
            </p>
          </div>

          {/* Tool 3: Scan History */}
          <div
            onClick={() => onNavigateToHistory && onNavigateToHistory()}
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#ebe8fc] via-[#eceafc] to-[#ded9fb] dark:bg-stone-800/90 border border-purple-100/90 dark:border-purple-900/40 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-white flex items-center justify-center shadow-md shadow-purple-500/25 mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h4 className="text-base font-black text-stone-900 dark:text-stone-100">
              {currentLanguage === 'ta' ? 'பரிசோதனை வரலாறு' : 'Scan History'}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-snug">
              {currentLanguage === 'ta' ? 'முந்தைய சோதனைகள் & முடிவுகள்' : 'View past diagnoses & remedies'}
            </p>
          </div>

          {/* Tool 4: Plant Care Tips */}
          <div
            onClick={() => {
              setSelectedTipCrop(PLANT_GUIDES[0]);
              setTipsModalOpen(true);
            }}
            className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#def6f0] via-[#e6f9f5] to-[#cbf0ea] dark:bg-stone-800/90 border border-teal-100/90 dark:border-teal-900/40 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 relative group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] text-white flex items-center justify-center shadow-md shadow-emerald-500/25 mb-3 group-hover:scale-105 transition-transform">
              <Sprout className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h4 className="text-base font-black text-stone-900 dark:text-stone-100">
              {currentLanguage === 'ta' ? 'பராமரிப்பு வழிகாட்டி' : 'Plant Care Tips'}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-snug">
              {currentLanguage === 'ta' ? 'ஆரோக்கிய பயிர் சாகுபடி குறிப்புகள்' : 'Seasonal farming & care advice'}
            </p>
          </div>

        </div>
      </div>

      {/* Hidden file input for direct photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleDirectFile}
        className="hidden"
      />

      {/* ========================================================================= */}
      {/* 5. SLIDE-OUT NAVIGATION DRAWER */}
      {/* ========================================================================= */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-start animate-in fade-in">
          <div className="w-80 max-w-[85vw] bg-white dark:bg-stone-900 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-md">
                    🌱
                  </div>
                  <div>
                    <h3 className="text-base font-black text-stone-900 dark:text-stone-100">Plant Doctor</h3>
                    <p className="text-xs text-stone-500">Agro Assistant</p>
                  </div>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 flex items-center justify-center hover:bg-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User Profile Card */}
              {user ? (
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 flex items-center space-x-3">
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.user_id}`}
                    alt={user.full_name}
                    className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">{user.full_name}</h4>
                    <p className="text-[11px] text-stone-500 truncate">{user.email || user.user_id}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  {t.loginBtn}
                </button>
              )}

              {/* Language Selection: English (Default), Tamil, Tanglish */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Language / மொழி
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { code: 'en' as Language, label: 'English' },
                    { code: 'ta' as Language, label: 'தமிழ்' },
                    { code: 'tanglish' as Language, label: 'Tanglish' }
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => onLanguageChange && onLanguageChange(l.code)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        currentLanguage === l.code
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    if (onNavigateToDiagnose) onNavigateToDiagnose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Stethoscope className="w-4 h-4 text-emerald-600" />
                    <span>{currentLanguage === 'ta' ? 'AI நோய் பரிசோதனை' : 'AI Disease Diagnosis'}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    if (onNavigateToHistory) onNavigateToHistory();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{currentLanguage === 'ta' ? 'பரிசோதனை வரலாறு' : 'Scan History'}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    setLocationModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{currentLanguage === 'ta' ? 'வானிலை & இடம் மாற்று' : 'Weather & Location'}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>

            </div>

            {/* Bottom: Theme toggle and Logout */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold"
                >
                  <div className="flex items-center space-x-2">
                    {theme === 'dark' ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                    <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                  </div>
                  <span className="text-[10px] text-stone-400">Toggle</span>
                </button>
              )}

              {user && onLogout && (
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-xl text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 text-xs font-bold cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.logout}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LOCATION & REAL WEATHER MODAL */}
      {/* ========================================================================= */}
      {locationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-purple-200 dark:border-stone-700 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center space-x-2 text-purple-600">
                <MapPin className="w-5 h-5" />
                <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
                  {currentLanguage === 'ta' ? 'வானிலை & இருப்பிடம்' : 'Location & Live Weather'}
                </h3>
              </div>
              <button
                onClick={() => setLocationModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* GPS Detection Button */}
            <button
              onClick={() => {
                handleDetectLiveLocation();
                setLocationModalOpen(false);
              }}
              disabled={isDetectingLocation}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-75"
            >
              <RefreshCw className={`w-4 h-4 text-emerald-300 ${isDetectingLocation ? 'animate-spin' : ''}`} />
              <span>
                {isDetectingLocation 
                  ? (currentLanguage === 'ta' ? 'GPS கண்டறியப்படுகிறது...' : 'Detecting Live GPS...')
                  : (currentLanguage === 'ta' ? '🛰️ தற்போதைய GPS இருப்பிடத்தை கண்டறி' : '🛰️ Use Current Live GPS Location')}
              </span>
            </button>

            {/* Current Weather Snapshot */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-purple-700 font-extrabold uppercase tracking-wider flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-purple-600" />
                    <span>{currentLanguage === 'ta' ? 'தற்போதைய இடம்' : 'Current Active Location'}</span>
                    {weatherData.source && (
                      <span className="ml-1 px-1.5 py-0.2 bg-purple-200 text-purple-800 rounded-sm text-[9px] font-black uppercase">
                        {weatherData.source}
                      </span>
                    )}
                  </span>
                  <h4 className="text-base font-black text-stone-900 dark:text-stone-100">
                    {weatherData.city} {weatherData.district ? `(${weatherData.district})` : ''}
                  </h4>
                </div>
                <span className="text-2xl font-black text-purple-700">
                  {weatherData.temperature}°C
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                <strong>{weatherData.condition}</strong> • {activeWeatherAdvice}
              </p>
            </div>

            {/* Live City / Town Search Bar */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
                <span>{currentLanguage === 'ta' ? 'எந்த நகரத்தையும் தேடலாம்:' : 'Search Any City / Town / Village:'}</span>
                {isSearchingCity && <span className="text-[10px] text-purple-600 animate-pulse">Searching...</span>}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customCitySearch}
                  onChange={(e) => setCustomCitySearch(e.target.value)}
                  placeholder={currentLanguage === 'ta' ? "எ.கா: மதுரை, பொள்ளாச்சி, தேனி, ஓசூர்..." : "e.g. Madurai, Pollachi, Theni, Hosur..."}
                  className="w-full pl-9 pr-8 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500 font-medium"
                />
                {customCitySearch && (
                  <button
                    onClick={() => {
                      setCustomCitySearch('');
                      setCitySearchResults([]);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Live search results list */}
              {citySearchResults.length > 0 && (
                <div className="bg-white dark:bg-stone-800 border border-purple-200 dark:border-stone-700 rounded-xl max-h-48 overflow-y-auto p-1 shadow-lg space-y-1">
                  {citySearchResults.map((res, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelectGeocodedCity(res)}
                      className="p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/50 cursor-pointer flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <div>
                          <strong className="text-stone-900 dark:text-stone-100 block">{res.name}</strong>
                          <span className="text-[10px] text-stone-500">{res.displayName}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Tamil Nadu / South Cities list */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-stone-500 block">
                {currentLanguage === 'ta' ? 'அல்லது முக்கிய விவசாய மாவட்டங்கள்:' : 'Or Select Agricultural Region:'}
              </span>

              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {POPULAR_LOCATIONS.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => handleSelectCity(loc)}
                    className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-purple-50 hover:text-purple-700 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 text-xs font-bold text-left transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="truncate">{loc.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setLocationModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PLANT CARE TIPS MODAL */}
      {/* ========================================================================= */}
      {tipsModalOpen && selectedTipCrop && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-teal-200 dark:border-stone-700 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center space-x-2 text-teal-600">
                <Sprout className="w-5 h-5" />
                <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
                  {selectedTipCrop.name} ({selectedTipCrop.tamilName})
                </h3>
              </div>
              <button
                onClick={() => setTipsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 text-blue-950 dark:text-blue-200 space-y-1">
                <span className="font-black flex items-center space-x-1">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>{currentLanguage === 'ta' ? 'நீர் பாய்ச்சும் முறை:' : 'Watering Advice:'}</span>
                </span>
                <p>
                  <strong>{selectedTipCrop.watering.frequency}:</strong>{' '}
                  {selectedTipCrop.watering[currentLanguage] || selectedTipCrop.watering.en}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-amber-950 dark:text-amber-200 space-y-1">
                <span className="font-black flex items-center space-x-1">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span>{currentLanguage === 'ta' ? 'சூரிய ஒளி தேவை:' : 'Sunlight Need:'}</span>
                </span>
                <p>
                  <strong>{selectedTipCrop.sunlight.hours}:</strong>{' '}
                  {selectedTipCrop.sunlight[currentLanguage] || selectedTipCrop.sunlight.en}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-emerald-950 dark:text-emerald-200 space-y-1">
                <span className="font-black flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{currentLanguage === 'ta' ? 'மண் மற்றும் உரம்:' : 'Soil & Nutrients:'}</span>
                </span>
                <p>
                  {selectedTipCrop.soilCare.soilType} (pH: {selectedTipCrop.soilCare.ph}) •{' '}
                  {selectedTipCrop.fertilizing[currentLanguage] || selectedTipCrop.fertilizing.en}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="font-black text-stone-900 dark:text-stone-100 block">
                  {currentLanguage === 'ta' ? 'பொதுவான பூச்சிகள் & இயற்கை தீர்வு:' : 'Pest Management & Solution:'}
                </span>
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1">
                  <strong className="text-rose-600">
                    {selectedTipCrop.pestControl.majorPests.join(', ')}:
                  </strong>
                  <p className="text-stone-700 dark:text-stone-300">
                    {selectedTipCrop.pestControl[currentLanguage] || selectedTipCrop.pestControl.en}
                  </p>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                    🌿 {selectedTipCrop.pestControl.remedy}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => {
                  setTipsModalOpen(false);
                  onNavigateToAnalyze('camera');
                }}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-md cursor-pointer"
              >
                Scan This Plant
              </button>
              <button
                onClick={() => setTipsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. QUIZ MODAL */}
      {/* ========================================================================= */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-purple-100 dark:border-stone-700">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center space-x-2 text-purple-600">
                <Lightbulb className="w-5 h-5" />
                <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
                  {currentLanguage === 'ta' ? 'விவசாய வினாடி வினா' : 'Plant Doctor Quiz'}
                </h3>
              </div>
              <button
                onClick={() => setQuizOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!quizFinished ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-400 font-bold">
                  <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
                  <span>Score: {quizScore}</span>
                </div>

                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  {quizQuestions[quizIndex].q}
                </h4>

                <div className="space-y-2">
                  {quizQuestions[quizIndex].options.map((opt, idx) => {
                    const isSelected = quizSelectedAnswer === idx;
                    const isCorrect = idx === quizQuestions[quizIndex].correct;
                    const showResult = quizSelectedAnswer !== null;

                    return (
                      <button
                        key={idx}
                        disabled={showResult}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full text-left p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          showResult && isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                            : showResult && isSelected && !isCorrect
                            ? 'bg-rose-50 border-rose-500 text-rose-800'
                            : isSelected
                            ? 'bg-purple-100 border-purple-500 text-purple-900'
                            : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-purple-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSelectedAnswer !== null && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 border border-amber-200 dark:border-stone-700">
                    💡 <strong>{currentLanguage === 'ta' ? 'விவசாயக் குறிப்பு: ' : 'Farming Tip: '}</strong>
                    {quizQuestions[quizIndex].tip}
                  </div>
                )}

                {quizSelectedAnswer !== null && (
                  <button
                    onClick={handleNextQuiz}
                    className="w-full py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    {quizIndex < quizQuestions.length - 1 ? 'Next Question →' : 'See Score! 🎉'}
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <span className="text-4xl">🏆</span>
                <h4 className="text-lg font-black text-stone-900 dark:text-stone-100">
                  {quizScore === quizQuestions.length ? 'Master Botanist!' : 'Great Effort!'}
                </h4>
                <p className="text-xs text-stone-500">
                  You scored {quizScore} out of {quizQuestions.length}!
                </p>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. FAVORITES MODAL */}
      {/* ========================================================================= */}
      {favoriteOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-stone-200 dark:border-stone-700 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center space-x-2 text-rose-500">
                <Heart className="w-5 h-5 fill-rose-500" />
                <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
                  {currentLanguage === 'ta' ? 'விருப்பமான பயிர்கள்' : 'Favorite Crops'}
                </h3>
              </div>
              <button
                onClick={() => setFavoriteOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {favoriteCrops.map((id) => {
                const crop = PLANT_GUIDES.find(c => c.id === id);
                if (!crop) return null;
                return (
                  <div
                    key={crop.id}
                    className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800 flex items-center justify-between hover:bg-stone-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={crop.imageUrl} alt={crop.name} className="w-11 h-11 rounded-xl object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">{crop.name} ({crop.tamilName})</h4>
                        <p className="text-[10px] text-emerald-600 font-semibold">{crop.growthDuration}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(crop.id)}
                      className="text-rose-500 p-1 cursor-pointer"
                    >
                      <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setFavoriteOpen(false)}
              className="w-full py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. NOTIFICATIONS MODAL */}
      {/* ========================================================================= */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center space-x-2 text-purple-600">
                <Bell className="w-5 h-5 fill-purple-600" />
                <h3 className="text-base font-black text-stone-900 dark:text-stone-100">
                  {currentLanguage === 'ta' ? 'அறிவிப்புகள்' : 'Weather & Crop Advisory'}
                </h3>
              </div>
              <button
                onClick={() => setNotificationsOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                <span className="font-bold text-amber-900 dark:text-amber-200 block mb-0.5">
                  📍 {weatherData.city} Weather Advisory:
                </span>
                <p className="text-stone-700 dark:text-stone-300">
                  Current temperature {weatherData.temperature}°C ({weatherData.condition}). {activeWeatherAdvice}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                <span className="font-bold text-emerald-900 dark:text-emerald-200 block mb-0.5">🌱 Disease Alert (Blight Prevention):</span>
                <p className="text-stone-700 dark:text-stone-300">
                  Check lower leaves for dark spots. Early camera diagnosis protects up to 95% crop yield.
                </p>
              </div>
            </div>

            <button
              onClick={() => setNotificationsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
