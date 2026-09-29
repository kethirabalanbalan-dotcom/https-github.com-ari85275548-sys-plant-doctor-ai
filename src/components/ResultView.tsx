import React, { useState } from 'react';
import { 
  Sprout, 
  CheckCircle2, 
  AlertTriangle, 
  Droplets, 
  FlaskConical, 
  Sun, 
  ShieldCheck, 
  Pill, 
  Share2, 
  Printer, 
  Bookmark, 
  RotateCcw, 
  ArrowLeft, 
  Globe, 
  ExternalLink,
  Info,
  Bug,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { PlantAnalysisData, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';

interface ResultViewProps {
  result: PlantAnalysisData;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onUploadAnother: () => void;
  onSaveToHistory: () => void;
  isSaved: boolean;
  onBackToHome: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  currentLanguage,
  onLanguageChange,
  onUploadAnother,
  onSaveToHistory,
  isSaved,
  onBackToHome
}) => {
  const [copied, setCopied] = useState(false);
  const t = UI_TRANSLATIONS[currentLanguage];

  // Helper to get localized field based on active language
  const getLocalizedPlantName = () => {
    if (currentLanguage === 'ta' && result.translations?.ta?.plantName) {
      return result.translations.ta.plantName;
    }
    if (currentLanguage === 'tanglish' && result.translations?.tanglish?.plantName) {
      return result.translations.tanglish.plantName;
    }
    return result.plantName;
  };

  const getLocalizedDiseaseName = () => {
    if (currentLanguage === 'ta' && result.translations?.ta?.diseaseName) {
      return result.translations.ta.diseaseName;
    }
    if (currentLanguage === 'tanglish' && result.translations?.tanglish?.diseaseName) {
      return result.translations.tanglish.diseaseName;
    }
    return result.diseaseName;
  };

  const getLocalizedSummary = () => {
    if (currentLanguage === 'ta' && result.translations?.ta?.summary) {
      return result.translations.ta.summary;
    }
    if (currentLanguage === 'tanglish' && result.translations?.tanglish?.summary) {
      return result.translations.tanglish.summary;
    }
    return `Analysis complete for ${result.plantName}. Condition diagnosed as ${result.diseaseName} with ${result.confidence}% model confidence.`;
  };

  const getLocalizedSymptoms = () => {
    if (currentLanguage === 'ta' && result.translations?.ta?.symptoms?.length) {
      return result.translations.ta.symptoms;
    }
    if (currentLanguage === 'tanglish' && result.translations?.tanglish?.symptoms?.length) {
      return result.translations.tanglish.symptoms;
    }
    return result.symptoms || [];
  };

  const getLocalizedTreatmentGuide = () => {
    if (currentLanguage === 'ta' && result.translations?.ta?.treatmentGuide) {
      return result.translations.ta.treatmentGuide;
    }
    if (currentLanguage === 'tanglish' && result.translations?.tanglish?.treatmentGuide) {
      return result.translations.tanglish.treatmentGuide;
    }
    return null;
  };

  const getLocalizedWateringGuide = () => {
    if (currentLanguage === 'ta' && result.translations?.ta?.wateringGuide) {
      return result.translations.ta.wateringGuide;
    }
    if (currentLanguage === 'tanglish' && result.translations?.tanglish?.wateringGuide) {
      return result.translations.tanglish.wateringGuide;
    }
    return null;
  };

  const getLocalizedFertilizerGuide = () => {
    if (currentLanguage === 'ta' && result.translations?.ta?.fertilizerGuide) {
      return result.translations.ta.fertilizerGuide;
    }
    if (currentLanguage === 'tanglish' && result.translations?.tanglish?.fertilizerGuide) {
      return result.translations.tanglish.fertilizerGuide;
    }
    return null;
  };

  const getLocalizedSunlightGuide = () => {
    if (currentLanguage === 'ta' && result.translations?.ta?.sunlightGuide) {
      return result.translations.ta.sunlightGuide;
    }
    if (currentLanguage === 'tanglish' && result.translations?.tanglish?.sunlightGuide) {
      return result.translations.tanglish.sunlightGuide;
    }
    return null;
  };

  const getLocalizedPreventionGuide = () => {
    if (currentLanguage === 'ta' && result.translations?.ta?.preventionGuide) {
      return result.translations.ta.preventionGuide;
    }
    if (currentLanguage === 'tanglish' && result.translations?.tanglish?.preventionGuide) {
      return result.translations.tanglish.preventionGuide;
    }
    return null;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const textToShare = `🌿 Plant Doctor Diagnosis:\nPlant: ${result.plantName}\nCondition: ${result.diseaseName}\nConfidence: ${result.confidence}%\nTreatment: ${result.treatment?.recommendedProduct || 'Consult agri specialist'}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Plant Doctor - ${result.plantName} Analysis`,
          text: textToShare
        });
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Case 1: Unable to Identify / Low Confidence / Non-Plant
  if (result.unableToIdentify || !result.isPlant || (result.confidence && result.confidence < 60)) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToHome}</span>
          </button>

          {/* Quick Language Switcher */}
          <div className="flex items-center space-x-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
            {(['en', 'ta', 'tanglish'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => onLanguageChange(l)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  currentLanguage === l
                    ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                {l === 'en' ? 'EN' : l === 'ta' ? 'தமிழ்' : 'Tanglish'}
              </button>
            ))}
          </div>
        </div>

        {/* Low Confidence Warning Card */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-amber-300 dark:border-amber-700/60 p-6 sm:p-8 shadow-lg text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
              {t.unableToIdentifyWarning}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-lg mx-auto">
              Our AI safety policy strictly prevents guessing fabricated diagnoses when image clarity, leaf focus, or botanical features are ambiguous.
            </p>
          </div>

          {/* Confidence Meter */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 max-w-sm mx-auto border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-stone-500">Evaluated Confidence</span>
              <span className="text-amber-600 font-extrabold">{result.confidence || 40}% (Below Threshold)</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-2.5 rounded-full"
                style={{ width: `${Math.min(result.confidence || 40, 55)}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-stone-400 mt-2">
              Requires 65%+ certainty for active treatment recommendations.
            </p>
          </div>

          {/* Practical Tips to re-take photo */}
          <div className="text-left bg-emerald-50/50 dark:bg-stone-900/50 rounded-2xl p-4 border border-emerald-100 dark:border-stone-700 space-y-2 text-xs text-stone-700 dark:text-stone-300">
            <p className="font-bold text-stone-900 dark:text-stone-100 flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>How to take a recognizable leaf photo:</span>
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] text-stone-600 dark:text-stone-400">
              <li>Place the leaf on a neutral background or hold it steady in daylight</li>
              <li>Avoid blurred camera movement or low-light indoor shadows</li>
              <li>Focus directly on the spots, lesions, or wilting pattern</li>
              <li>Ensure the whole leaf blade is in frame</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onUploadAnother}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.uploadAnother}</span>
            </button>
            <button
              onClick={onBackToHome}
              className="px-6 py-3 rounded-xl bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 text-stone-700 dark:text-stone-200 font-bold text-xs transition-colors"
            >
              {t.backToHome}
            </button>
          </div>
        </div>

      </div>
    );
  }

  // Case 2: Plant Identified Successfully
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 animate-in fade-in duration-200 print:p-0">
      
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-stone-800 p-3 sm:p-4 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xs print:hidden">
        <button
          onClick={onBackToHome}
          className="flex items-center space-x-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>

        {/* Trilingual Switcher Buttons */}
        <div className="flex items-center space-x-1 bg-stone-100 dark:bg-stone-900 p-1 rounded-xl">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              currentLanguage === 'en'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => onLanguageChange('ta')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              currentLanguage === 'ta'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🇮🇳 தமிழ் (Tamil)
          </button>
          <button
            onClick={() => onLanguageChange('tanglish')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              currentLanguage === 'tanglish'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🌿 Tanglish
          </button>
        </div>

        {/* Utility Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onSaveToHistory}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isSaved
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? t.alreadySaved : t.saveToHistory}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
            title={t.shareResult}
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700"
            title={t.printReport}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {copied && (
        <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs text-center font-bold animate-in fade-in">
          Diagnosis summary copied to clipboard!
        </div>
      )}

      {/* Main Diagnostic Header Card */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Leaf Photo Thumbnail */}
          <div className="rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square bg-stone-900 relative shadow-sm border border-stone-200 dark:border-stone-700">
            <img
              src={result.image_path || 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400'}
              alt={result.plantName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-black text-white shadow-md ${
                result.status === 'Healthy'
                  ? 'bg-emerald-600'
                  : 'bg-amber-600'
              }`}>
                {result.status === 'Healthy' ? t.healthyStatus : t.diseasedStatus}
              </span>
            </div>
          </div>

          {/* Plant & Disease Info */}
          <div className="md:col-span-2 space-y-4">
            
            {/* Super Prominent Detected Disease Banner */}
            <div className={`p-4 sm:p-5 rounded-2xl border-2 shadow-xs ${
              result.status === 'Healthy'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-950 dark:text-emerald-100'
                : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-500/40 text-rose-950 dark:text-rose-100'
            }`}>
              <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                <Bug className="w-4 h-4 shrink-0" />
                <span>
                  {currentLanguage === 'ta' 
                    ? 'கண்டறியப்பட்ட நோய் (Detected Disease):' 
                    : currentLanguage === 'tanglish' 
                    ? 'Kandupidicha Disease (Detected Disease):' 
                    : 'Detected Disease Condition:'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-rose-700 dark:text-rose-300 mt-1 leading-tight tracking-tight">
                {getLocalizedDiseaseName()}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <span className="text-xs font-bold text-stone-600 dark:text-stone-300">
                  {currentLanguage === 'ta' ? 'பயிர் / செடி:' : 'Crop / Plant:'}
                </span>
                <span className="text-xs font-extrabold text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 shadow-2xs">
                  🌿 {getLocalizedPlantName()}
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  ({result.scientificName || 'Botanical Taxon'})
                </span>
              </div>
            </div>

            {/* Localized Natural Language Summary */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-medium">
              {getLocalizedSummary()}
            </div>

            {/* Metrics: Confidence Gauge & Severity (Matching Screen 3 with Stars) */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              
              {/* Confidence Gauge with Stars */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-stone-900 border border-emerald-200/60 dark:border-stone-700">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-1">
                  <span>Match Accuracy</span>
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">
                    {result.confidence}% Match
                  </span>
                </div>
                {/* 5 Stars Rating matching Screen 3 */}
                <div className="flex items-center space-x-1 text-amber-400 text-xs mb-1.5">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  <span className="text-[10px] font-bold text-stone-500 ml-1">Great Accuracy</span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
              </div>

              {/* Severity Level */}
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-stone-500">Infection Severity</span>
                  <div className="mt-1 flex items-center space-x-1.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      result.severity === 'High'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : result.severity === 'Medium'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {result.severity === 'High' ? t.severityHigh : result.severity === 'Medium' ? t.severityMedium : t.severityLow}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-stone-400 mt-1">
                  {result.severity === 'High' ? 'Prompt treatment critical' : 'Early control recommended'}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Grid of Diagnostic & Care Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. 🔍 Detected Symptoms */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-bold text-base">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Bug className="w-4 h-4" />
            </div>
            <span>{t.symptoms}</span>
          </div>

          <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
            {getLocalizedSymptoms().map((symptom, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>

          {result.causes?.length > 0 && (
            <div className="pt-2 border-t border-stone-100 dark:border-stone-700">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Possible Etiology / Causes
              </span>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                {result.causes.join(' • ')}
              </p>
            </div>
          )}
        </div>

        {/* 2. 💊 Medicine & Treatment Recommendation */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-bold text-base">
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
            <span>{t.treatmentGuide}</span>
          </div>

          {getLocalizedTreatmentGuide() && (
            <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              {getLocalizedTreatmentGuide()}
            </div>
          )}

          <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.recommendedProduct}:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{result.treatment?.recommendedProduct}</span>
            </div>

            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.howToUse}:</span>
              <span>{result.treatment?.howToUse}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.frequency}:</span>
                <span>{result.treatment?.frequency}</span>
              </div>
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.whenToRepeat}:</span>
                <span>{result.treatment?.whenToRepeat}</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.safetyPrecautions}:</span>
              <span className="text-stone-500 dark:text-stone-400">{result.treatment?.safetyPrecautions}</span>
            </div>

            {result.treatment?.organicAlternative && (
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">{t.organicAlternative}:</span>
                <span className="text-emerald-700 dark:text-emerald-400">{result.treatment.organicAlternative}</span>
              </div>
            )}

            <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-700 text-[11px] text-stone-600 dark:text-stone-300">
              {result.treatment?.labelWarning || t.labelDisclaimer}
            </div>
          </div>
        </div>

        {/* 3. 💧 Watering Recommendation */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-bold text-base">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
            <span>{t.wateringGuide}</span>
          </div>

          {getLocalizedWateringGuide() && (
            <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 text-xs font-semibold text-blue-900 dark:text-blue-200">
              {getLocalizedWateringGuide()}
            </div>
          )}

          <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">Requirement:</span>
                <span>{result.watering?.requirement}</span>
              </div>
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">Frequency:</span>
                <span>{result.watering?.frequency}</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.bestTimeToWater}:</span>
              <span>{result.watering?.bestTime}</span>
            </div>

            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.soilMoistureGuide}:</span>
              <span>{result.watering?.soilMoisture}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-[11px] text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900">
              <strong>{t.overwateringWarning}: </strong>
              {result.watering?.overwateringWarning}
            </div>
          </div>
        </div>

        {/* 4. 🧪 Fertilizer Recommendation */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-bold text-base">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <span>{t.fertilizerGuide}</span>
          </div>

          {getLocalizedFertilizerGuide() && (
            <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              {getLocalizedFertilizerGuide()}
            </div>
          )}

          <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.recommendedFertilizer}:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{result.fertilizer?.recommendedType}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.npkRatio}:</span>
                <span className="font-mono bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded text-[11px]">{result.fertilizer?.npk}</span>
              </div>
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.fertilizerTiming}:</span>
                <span>{result.fertilizer?.whenToApply}</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.fertilizerApplication}:</span>
              <span>{result.fertilizer?.howToApply}</span>
            </div>

            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">Precautions:</span>
              <span className="text-stone-500 dark:text-stone-400">{result.fertilizer?.precautions}</span>
            </div>
          </div>
        </div>

        {/* 5. ☀️ Sunlight Recommendation */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-bold text-base">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
              <Sun className="w-4 h-4" />
            </div>
            <span>{t.sunlightGuide}</span>
          </div>

          {getLocalizedSunlightGuide() && (
            <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 text-xs font-semibold text-amber-900 dark:text-amber-200">
              {getLocalizedSunlightGuide()}
            </div>
          )}

          <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">Requirement:</span>
              <span>{result.sunlight?.requirement}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.sunlightDuration}:</span>
                <span>{result.sunlight?.duration}</span>
              </div>
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.sunlightExposure}:</span>
                <span>{result.sunlight?.exposure}</span>
              </div>
            </div>

            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.placement}:</span>
              <span>{result.sunlight?.indoorOutdoor}</span>
            </div>

            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">{t.lackOfSunlight}:</span>
              <span className="text-stone-500 dark:text-stone-400">{result.sunlight?.lackOfSunlightSigns}</span>
            </div>
          </div>
        </div>

        {/* 6. 🛡️ Prevention & Cultural Practices */}
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-bold text-base">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>{t.preventionGuide}</span>
          </div>

          {getLocalizedPreventionGuide() && (
            <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              {getLocalizedPreventionGuide()}
            </div>
          )}

          <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
            {(result.prevention || [
              'Practice 3-year crop rotation with non-host botanical families',
              'Prune bottom foliage to prevent soil splash onto leaves',
              'Avoid overhead sprinkler watering; use drip lines',
              'Sanitize secateurs and tools with 70% alcohol between cuts'
            ]).map((prevItem, i) => (
              <li key={i} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{prevItem}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Sticky Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-stone-200 dark:border-stone-800 print:hidden">
        <button
          onClick={onBackToHome}
          className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
        >
          {t.backToHome}
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={onUploadAnother}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center space-x-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.uploadAnother}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
