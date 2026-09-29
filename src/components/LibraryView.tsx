import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sprout, 
  Droplets, 
  Sun, 
  FlaskConical, 
  Bug, 
  Search, 
  Info,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Language, DiseaseLibraryItem, PlantCareLibraryItem } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { getDiseasesLibrary } from '../services/api';

interface LibraryViewProps {
  currentLanguage: Language;
  onSelectPlantToAnalyze: (plantName: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ currentLanguage, onSelectPlantToAnalyze }) => {
  const t = UI_TRANSLATIONS[currentLanguage];
  const [diseases, setDiseases] = useState<DiseaseLibraryItem[]>([]);
  const [plantCare, setPlantCare] = useState<PlantCareLibraryItem[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<string>('Tomato');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getDiseasesLibrary().then((data) => {
      setDiseases(data.diseases);
      setPlantCare(data.plant_care);
    });
  }, []);

  const supportedPlants = ['Tomato', 'Potato', 'Rice', 'Apple', 'Grape', 'Corn', 'Pepper'];

  const currentCare = plantCare.find(
    (c) => c.plant_name.toLowerCase() === selectedPlant.toLowerCase()
  );

  const plantDiseases = diseases.filter(
    (d) => d.plant_name.toLowerCase() === selectedPlant.toLowerCase()
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          <span>Supported Agricultural Species & Disease Catalog</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Explore botanical care standards, common pathogens, and cultural practices for benchmark crop classes.
        </p>
      </div>

      {/* Unsupported Species Notice Card */}
      <div className="rounded-2xl p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Model Class Coverage: </span>
          The core model dataset is pre-calibrated for major food and cash crops: Tomato, Potato, Rice, Apple, Grape, Corn, and Pepper (both healthy leaves and virulent pathogens). If you upload an unsupported or ornamental plant, the AI will evaluate whether confidence is high enough or safely report <em>“Unable to identify confidently”</em> rather than guessing inaccurate diagnoses.
        </div>
      </div>

      {/* Plant Selector Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {supportedPlants.map((plant) => (
          <button
            key={plant}
            onClick={() => setSelectedPlant(plant)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPlant === plant
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-400'
            }`}
          >
            {plant}
          </button>
        ))}
      </div>

      {/* Selected Plant Overview & Standard Care */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-700">
          <div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Botanical Benchmark
            </span>
            <h2 className="text-xl font-black text-stone-900 dark:text-stone-100">
              {selectedPlant} Care Standard & Diseases
            </h2>
          </div>

          <button
            onClick={() => onSelectPlantToAnalyze(selectedPlant)}
            className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors self-start sm:self-auto"
          >
            Analyze {selectedPlant} Photo
          </button>
        </div>

        {/* 3 Pillar Care Guidelines */}
        {currentCare && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2">
              <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 font-bold text-xs">
                <Droplets className="w-4 h-4" />
                <span>Watering Routine</span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {currentCare.watering}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                <FlaskConical className="w-4 h-4" />
                <span>Fertilization Strategy</span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {currentCare.fertilizer}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-300 font-bold text-xs">
                <Sun className="w-4 h-4" />
                <span>Sunlight Exposure</span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {currentCare.sunlight}
              </p>
            </div>
          </div>
        )}

        {/* Common Diseases in this Plant */}
        <div className="space-y-4 pt-2">
          <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center space-x-2">
            <Bug className="w-4 h-4 text-rose-600" />
            <span>Documented Diseases & Pathology</span>
          </h3>

          <div className="space-y-4">
            {plantDiseases.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {d.disease_name}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                    Pathogen Profile
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-stone-600 dark:text-stone-400 block mb-1">
                      Primary Symptoms:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-700 dark:text-stone-300">
                      {d.symptoms.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-stone-600 dark:text-stone-400 block mb-1">
                      Causes & Vectors:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-stone-700 dark:text-stone-300">
                      {d.causes.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                      Treatment Guidance:
                    </span>
                    <span className="text-stone-700 dark:text-stone-300">{d.treatment}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                      Prevention Protocol:
                    </span>
                    <span className="text-stone-700 dark:text-stone-300">{d.prevention}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
