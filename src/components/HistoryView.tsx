import React, { useState } from 'react';
import { 
  History as HistoryIcon, 
  Search, 
  Trash2, 
  Calendar, 
  Camera, 
  Leaf, 
  CheckCircle2, 
  AlertTriangle, 
  Heart,
  X
} from 'lucide-react';
import { PlantAnalysisData, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';

interface HistoryViewProps {
  history: PlantAnalysisData[];
  currentLanguage: Language;
  onSelectRecord: (record: PlantAnalysisData) => void;
  onDeleteRecord: (id: string) => void;
  onClearAllRecords?: () => void;
  onNavigateToAnalyze: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  currentLanguage,
  onSelectRecord,
  onDeleteRecord,
  onClearAllRecords,
  onNavigateToAnalyze
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Healthy' | 'Diseased'>('ALL');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const t = UI_TRANSLATIONS[currentLanguage];

  const diseasedCount = history.filter(h => h.status === 'Diseased').length;
  const healthyCount = history.filter(h => h.status === 'Healthy').length;

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteRecord(id);
  };

  const filtered = history.filter((item) => {
    const pName = (item.plantName || (item as any).plant_name || '').toLowerCase();
    const dName = (item.diseaseName || (item as any).disease_name || '').toLowerCase();
    const query = searchTerm.toLowerCase();
    const matchesSearch = !query || pName.includes(query) || dName.includes(query);
    const matchesStatus =
      statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center space-x-2">
            <HistoryIcon className="w-6 h-6 text-purple-600" />
            <span>{currentLanguage === 'ta' ? 'பரிசோதனை வரலாறு' : 'Diagnosis History'}</span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {currentLanguage === 'ta' 
              ? 'முன்பு ஸ்கேன் செய்து கண்டறியப்பட்ட பயிர்கள் மற்றும் தாவர நோய்கள்.' 
              : 'Your previously scanned plants, detected diseases, and care records.'}
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {history.length > 0 && onClearAllRecords && (
            <div>
              {showClearConfirm ? (
                <div className="flex items-center space-x-1 bg-rose-50 dark:bg-rose-950/60 p-1 rounded-2xl border border-rose-300">
                  <span className="text-[11px] font-bold text-rose-700 px-2">
                    {currentLanguage === 'ta' ? 'அனைத்தையும் நீக்கவா?' : 'Delete all?'}
                  </span>
                  <button
                    onClick={() => {
                      onClearAllRecords();
                      setShowClearConfirm(false);
                    }}
                    className="px-2.5 py-1 rounded-xl bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 cursor-pointer"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-2 py-1 rounded-xl bg-stone-200 text-stone-700 text-[11px] font-bold cursor-pointer"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-3 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer border bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:text-rose-600 hover:border-rose-300"
                >
                  <Trash2 className="w-3.5 h-3.5 text-stone-400" />
                  <span>{currentLanguage === 'ta' ? 'அனைத்தையும் நீக்கு' : 'Clear All'}</span>
                </button>
              )}
            </div>
          )}

          <button
            onClick={onNavigateToAnalyze}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>{t.analyzePlantBtn || 'Scan Plant'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={currentLanguage === 'ta' ? "பயிர் அல்லது நோய் பெயர் கொண்டு தேடுங்கள்..." : "Search plant name or disease..."}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-800 border border-purple-100 dark:border-stone-700 rounded-2xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500 shadow-2xs font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'ALL'
                ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 border border-stone-200 dark:border-stone-700'
            }`}
          >
            {currentLanguage === 'ta' ? 'அனைத்தும்' : 'All'} ({history.length})
          </button>
          <button
            onClick={() => setStatusFilter('Diseased')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'Diseased'
                ? 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-300'
                : 'bg-white dark:bg-stone-800 text-rose-600 hover:bg-rose-50 border border-stone-200 dark:border-stone-700'
            }`}
          >
            {currentLanguage === 'ta' ? 'நோய் தாக்கியவை' : 'Diseased'} ({diseasedCount})
          </button>
          <button
            onClick={() => setStatusFilter('Healthy')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              statusFilter === 'Healthy'
                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                : 'bg-white dark:bg-stone-800 text-emerald-600 hover:bg-emerald-50 border border-stone-200 dark:border-stone-700'
            }`}
          >
            {currentLanguage === 'ta' ? 'ஆரோக்கியமானவை' : 'Healthy'} ({healthyCount})
          </button>
        </div>
      </div>

      {/* Plant History Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-stone-800/50 rounded-3xl border border-stone-200 dark:border-stone-700 p-8 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mx-auto shadow-inner">
            <Leaf className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
              {searchTerm 
                ? (currentLanguage === 'ta' ? 'பயிர்கள் எதுவும் கிடைக்கவில்லை' : 'No matching plants found')
                : (currentLanguage === 'ta' ? 'வரலாற்றில் பதிவுகள் இல்லை' : 'No scan history yet')}
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {searchTerm 
                ? (currentLanguage === 'ta' ? 'வேறு பயிர் பெயர் கொண்டு தேடவும்.' : 'Try searching for another crop name or clear filter.')
                : (currentLanguage === 'ta' ? 'கேமரா மூலம் செடியை படம் எடுத்து நோயைக் கண்டறியுங்கள்.' : 'Scan a plant with the camera to start tracking plant health.')}
            </p>
          </div>
          <button
            onClick={onNavigateToAnalyze}
            className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold shadow-md shadow-purple-500/20 active:scale-95 transition-all inline-flex items-center space-x-2 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>{currentLanguage === 'ta' ? 'செடியை ஸ்கேன் செய்க' : 'Scan First Plant'}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((item, idx) => {
            const isDiseased = item.status === 'Diseased';
            const id = item.id || (item as any)._id || `hist_${idx}`;
            const isFavorited = !!favorites[id];
            const dateStr = item.analysis_date 
              ? new Date(item.analysis_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : 'Recent Scan';

            return (
              <div
                key={id}
                onClick={() => onSelectRecord(item)}
                className="group bg-white dark:bg-stone-800 rounded-3xl p-3 border border-stone-200/90 dark:border-stone-700/80 shadow-2xs hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Top Thumbnail Image */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900 mb-2.5 shadow-inner">
                  <img
                    src={item.image_path || 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=300&q=80'}
                    alt={item.plantName || 'Plant'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide flex items-center space-x-1 shadow-sm ${
                      isDiseased 
                        ? 'bg-rose-500/90 backdrop-blur-xs text-white' 
                        : 'bg-emerald-600/90 backdrop-blur-xs text-white'
                    }`}>
                      {isDiseased ? (
                        <>
                          <AlertTriangle className="w-2.5 h-2.5 mr-0.5 stroke-[2.5]" />
                          <span>Diseased</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-2.5 h-2.5 mr-0.5 stroke-[2.5]" />
                          <span>Healthy</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(id, e)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs flex items-center justify-center text-stone-400 hover:text-rose-500 transition-colors shadow-xs"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Bottom Date Overlay */}
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] text-white/95 font-semibold bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-2.5 h-2.5 inline mr-1" />
                      {dateStr}
                    </span>
                  </div>
                </div>

                {/* Plant Info */}
                <div className="space-y-1 px-1">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100 truncate group-hover:text-purple-600 transition-colors">
                      {item.plantName || 'Unknown Plant'}
                    </h4>
                  </div>

                  <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    {isDiseased 
                      ? (item.diseaseName || 'Pest / Pathogen detected') 
                      : 'Healthy Crop'}
                  </p>
                </div>

                {/* Bottom Match Score & Direct Delete Button */}
                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-100 dark:border-stone-700/60 px-0.5">
                  <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400">
                    {item.confidence || 95}% match
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => handleDeleteItem(id, e)}
                      title="Delete record"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-bold text-stone-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all">
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
