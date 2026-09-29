import React, { useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Calendar,
  CloudSun,
  Leaf,
  Bug,
  Activity,
  BookOpen,
  Bell,
  Heart,
  Lightbulb,
  Search,
  ScanLine,
  ChevronRight,
  Shield,
  Layers,
  Thermometer
} from 'lucide-react';
import { User, Language, PlantAnalysisData } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { SAMPLE_PLANTS, SampleLeaf } from '../utils/sampleImages';

interface DashboardViewProps {
  user: User | null;
  currentLanguage: Language;
  onNavigateToAnalyze: (mode?: 'upload' | 'camera') => void;
  onSelectSample: (sample: SampleLeaf) => void;
  recentAnalyses: PlantAnalysisData[];
  onSelectHistoryItem: (item: PlantAnalysisData) => void;
  onOpenAuth: () => void;
  onStartAnalysis?: (base64: string, mime?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  currentLanguage,
  onNavigateToAnalyze,
  onSelectSample,
  recentAnalyses,
  onSelectHistoryItem,
  onOpenAuth,
  onStartAnalysis
}) => {
  const t = UI_TRANSLATIONS[currentLanguage];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const totalAnalyzed = recentAnalyses.length;
  const healthyCount = recentAnalyses.filter(a => a.status === 'Healthy').length;
  const diseasedCount = recentAnalyses.filter(a => a.status === 'Diseased').length;

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

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 pb-16">
      
      {/* Top Welcome Bar (Matching Screen 1) */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
            {currentLanguage === 'ta' ? 'வணக்கம்!' : currentLanguage === 'tanglish' ? 'Vanakkam!' : 'Good Day!'}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center space-x-1.5">
            <span>{user ? `Welcome Back, ${user.full_name.split(' ')[0]}!` : 'Welcome to Plant Doctor'}</span>
          </h1>
        </div>

        {user ? (
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.user_id}`}
            alt={user.full_name}
            className="w-11 h-11 rounded-full border-2 border-emerald-500 shadow-sm object-cover bg-stone-100"
          />
        ) : (
          <button
            onClick={onOpenAuth}
            className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            {t.loginBtn}
          </button>
        )}
      </div>

      {/* Main Hero Card: Your Daily Discovery (Exact Match to Screen 1) */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-xl shadow-emerald-700/15 overflow-hidden">
        {/* Background decorative botanical leaf watermark */}
        <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none translate-x-6 translate-y-6">
          <Leaf className="w-56 h-56 stroke-[1]" />
        </div>

        <div className="relative z-10 max-w-lg space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-white">
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>AI Plant & Disease Identifier</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider block">
              {currentLanguage === 'ta' ? 'தினசரி பயிர் சோதனை' : 'Your Daily Discovery'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-0.5 leading-snug">
              {currentLanguage === 'ta' 
                ? 'செடியை சோதிக்க படம் எடுக்கவும்' 
                : currentLanguage === 'tanglish' 
                ? 'Plant photo eduthu check pannunga' 
                : 'Identify a plant & disease today'}
            </h2>
          </div>

          <div className="flex items-center space-x-3 pt-1">
            {/* Counter badge matching Screen 1 */}
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20">
              <span className="text-lg font-black text-white">{totalAnalyzed || 1}</span>
              <span className="text-[11px] font-medium text-emerald-100">Plants Identified</span>
            </div>
          </div>

          {/* Quick Action Buttons on Hero */}
          <div className="flex flex-wrap gap-2.5 pt-3">
            <button
              onClick={() => onNavigateToAnalyze('camera')}
              className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-white text-emerald-800 font-extrabold text-xs hover:bg-emerald-50 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>{t.takePhoto}</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleDirectFile}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-emerald-500/40 hover:bg-emerald-500/60 text-white font-extrabold text-xs backdrop-blur-md border border-white/30 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{t.uploadPhoto}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Circular Action Icons (Matching Screen 1) */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 py-1">
        <button
          onClick={() => onNavigateToAnalyze('camera')}
          className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <ScanLine className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-stone-800 dark:text-stone-200 text-center leading-tight">
            Identify Plant
          </span>
        </button>

        <button
          onClick={() => onNavigateToAnalyze('upload')}
          className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <BookOpen className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-stone-800 dark:text-stone-200 text-center leading-tight">
            Care Guide
          </span>
        </button>

        <button
          onClick={() => onNavigateToAnalyze('upload')}
          className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <Leaf className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-stone-800 dark:text-stone-200 text-center leading-tight">
            My Collection
          </span>
        </button>

        <button
          onClick={() => onNavigateToAnalyze('upload')}
          className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs">
            <Bell className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-stone-800 dark:text-stone-200 text-center leading-tight">
            Reminders
          </span>
        </button>
      </div>

      {/* Quick Test Samples (Instant 1-Click Scan) */}
      <div className="bg-emerald-50/70 dark:bg-stone-800/60 rounded-3xl p-5 border border-emerald-100 dark:border-stone-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
              {t.trySample} (Instant Test)
            </h3>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
            Click to diagnose
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {SAMPLE_PLANTS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="cursor-pointer rounded-2xl bg-white dark:bg-stone-800 p-2 border border-stone-200 dark:border-stone-700 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-1.5 relative bg-stone-100">
                <img
                  src={sample.imageUrl}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className={`absolute top-1 right-1 text-[8px] font-black px-1 rounded-sm text-white ${
                  sample.status === 'Healthy' ? 'bg-emerald-600' : sample.status === 'Invalid' ? 'bg-rose-600' : 'bg-amber-600'
                }`}>
                  {sample.status}
                </span>
              </div>
              <p className="text-[11px] font-bold text-stone-800 dark:text-stone-200 truncate">
                {sample.name.split(' ')[0]}
              </p>
              <p className="text-[9px] text-stone-400 truncate">
                {sample.disease || sample.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Identifications (Matching Screen 1) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-stone-900 dark:text-stone-100 flex items-center space-x-2">
            <span>Recent Identifications</span>
          </h2>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer">
            View All ({recentAnalyses.length})
          </span>
        </div>

        <div className="space-y-2.5">
          {recentAnalyses.slice(0, 4).map((item) => (
            <div
              key={item.id || Math.random().toString()}
              onClick={() => onSelectHistoryItem(item)}
              className="cursor-pointer rounded-2xl bg-white dark:bg-stone-800 p-3.5 border border-stone-200/80 dark:border-stone-700 hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <img
                  src={item.image_path || 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=150'}
                  alt={item.plantName}
                  className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-stone-100 dark:border-stone-700 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-stone-900 dark:text-stone-100 truncate">
                    {item.plantName}
                  </h4>
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-bold truncate">
                    {item.diseaseName}
                  </p>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      ★ {item.confidence}% Match
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {item.analysis_date ? new Date(item.analysis_date).toLocaleDateString() : 'Today'}
                    </span>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips Card (Matching Screen 1) */}
      <div className="rounded-2xl p-4 bg-amber-50/70 dark:bg-stone-800/80 border border-amber-200/60 dark:border-stone-700 flex items-start space-x-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">
            Quick Plant-Care Tip
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">
            Water in the early morning directly at the soil base. Wetting the leaf surface promotes spore germination for blights and rusts.
          </p>
        </div>
      </div>

      {/* 4 Feature Highlights (Matching Bottom of Screenshot) */}
      <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
        <h3 className="text-xs font-extrabold text-stone-400 uppercase tracking-wider">
          AI Botanist Capabilities
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              1
            </div>
            <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">
              Instant Identification
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal">
              Snap a photo and get accurate plant & disease diagnosis in seconds using AI.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              2
            </div>
            <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">
              Care Guidance
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal">
              Get verified care instructions for watering, sunlight, fertilizer, and medicine.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              3
            </div>
            <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">
              Track & Organize
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal">
              Save your plants, track disease recovery, and manage your green collection.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              4
            </div>
            <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">
              Smart Reminders
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-normal">
              Never miss a care routine with treatment repeat cycles and seasonal tips.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
