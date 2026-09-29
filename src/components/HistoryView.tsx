import React, { useState } from 'react';
import { 
  History as HistoryIcon, 
  Search, 
  Trash2, 
  ArrowRight, 
  Calendar, 
  Camera, 
  Leaf, 
  Filter,
  CheckCircle2,
  AlertTriangle,
  Heart
} from 'lucide-react';
import { PlantAnalysisData, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';

interface HistoryViewProps {
  history: PlantAnalysisData[];
  currentLanguage: Language;
  onSelectRecord: (record: PlantAnalysisData) => void;
  onDeleteRecord: (id: string) => void;
  onNavigateToAnalyze: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  currentLanguage,
  onSelectRecord,
  onDeleteRecord,
  onNavigateToAnalyze
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Healthy' | 'Diseased'>('ALL');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const t = UI_TRANSLATIONS[currentLanguage];

  const diseasedCount = history.filter(h => h.status === 'Diseased').length;
  const healthyCount = history.filter(h => h.status === 'Healthy').length;

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = history.filter((item) => {
    const matchesSearch =
      item.plantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.diseaseName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center space-x-2">
            <HistoryIcon className="w-6 h-6 text-emerald-600" />
            <span>My Collection</span>
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Your saved plants, identified diseases, and monitored crop records.
          </p>
        </div>

        <button
          onClick={onNavigateToAnalyze}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Identify New Plant</span>
        </button>
      </div>

      {/* Filter and Search Bar (Matching Screen 4 Pills) */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search plant name or disease..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-2xs"
          />
        </div>

        {/* Filter Pills matching Screen 4: All (12), Diseased (3), Healthy (9) */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
              statusFilter === 'ALL'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-emerald-400'
            }`}
          >
            All ({history.length})
          </button>

          <button
            onClick={() => setStatusFilter('Diseased')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
              statusFilter === 'Diseased'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-rose-400'
            }`}
          >
            Diseased ({diseasedCount})
          </button>

          <button
            onClick={() => setStatusFilter('Healthy')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
              statusFilter === 'Healthy'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-emerald-400'
            }`}
          >
            Healthy ({healthyCount})
          </button>
        </div>
      </div>

      {/* Records List / Grid (Matching Screen 4 Aesthetic 2-column cards) */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-700 text-stone-400 flex items-center justify-center mx-auto">
            <Leaf className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            No plants in this category
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            {searchTerm || statusFilter !== 'ALL'
              ? 'Try adjusting your search query or filter.'
              : 'Scan your first plant leaf or upload a photo to build your collection.'}
          </p>
          <button
            onClick={onNavigateToAnalyze}
            className="mt-2 px-5 py-2.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
          >
            {t.analyzePlantBtn}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((item) => {
            const isFav = favorites[item.id || ''] || false;
            return (
              <div
                key={item.id || Math.random().toString()}
                onClick={() => onSelectRecord(item)}
                className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200/80 dark:border-stone-700 p-3 shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Image with Heart Favorite Button (Matching Screen 4) */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-2.5 bg-stone-100 dark:bg-stone-700">
                    <img
                      src={item.image_path || 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400'}
                      alt={item.plantName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />

                    {/* Heart button */}
                    <button
                      onClick={(e) => toggleFavorite(item.id || '', e)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xs"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} />
                    </button>

                    <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full text-white shadow-xs ${
                        item.status === 'Healthy' ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-0.5 px-0.5">
                    <h3 className="font-extrabold text-xs sm:text-sm text-stone-900 dark:text-stone-100 truncate">
                      {item.plantName}
                    </h3>

                    <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400 truncate">
                      {item.diseaseName}
                    </p>

                    <p className="text-[10px] text-stone-400">
                      {item.analysis_date ? new Date(item.analysis_date).toLocaleDateString() : 'Identified today'}
                    </p>
                  </div>
                </div>

                {/* Bottom Match Score */}
                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-100 dark:border-stone-700/60 px-0.5">
                  <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    ★ {item.confidence}% Match
                  </span>

                  {item.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this plant record?')) {
                          onDeleteRecord(item.id!);
                        }
                      }}
                      className="p-1 rounded-lg text-stone-300 hover:text-rose-600 transition-colors"
                      title={t.delete}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
