import React, { useState, useEffect } from 'react';
import { Sprout, CheckCircle2, Loader2, Sparkles, ShieldAlert, HeartPulse } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';

interface AnalysisLoadingViewProps {
  currentLanguage: Language;
}

export const AnalysisLoadingView: React.FC<AnalysisLoadingViewProps> = ({ currentLanguage }) => {
  const t = UI_TRANSLATIONS[currentLanguage];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { title: t.step1, desc: 'Analyzing resolution, pixel RGB variances & leaf geometry' },
    { title: t.step2, desc: 'Matching botanical taxon against deep agronomic taxonomy' },
    { title: t.step3, desc: 'Screening for fungal lesions, bacterial blights & chlorosis' },
    { title: t.step4, desc: 'Localizing verified treatment dosage, watering & nutrition' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="max-w-md mx-auto py-12 px-4 text-center space-y-8 animate-in fade-in duration-300">
      
      {/* Animated Botanical Pulse Logo */}
      <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping duration-1000"></div>
        <div className="absolute inset-2 rounded-full bg-emerald-500/30 animate-pulse"></div>
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xl shadow-emerald-600/30">
          <Sprout className="w-10 h-10 animate-bounce" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center justify-center space-x-2">
          <Sparkles className="w-5 h-5 text-emerald-600 animate-spin" />
          <span>{t.analyzingPlant}</span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Google Gemini AI model is inspecting your plant image. Please wait a few seconds.
        </p>
      </div>

      {/* 4 Diagnostic Steps */}
      <div className="space-y-3 text-left bg-white dark:bg-stone-800 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 shadow-sm">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-start space-x-3 p-2.5 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800'
                  : ''
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-stone-300 dark:border-stone-600 flex items-center justify-center text-[10px] font-bold text-stone-400">
                    {idx + 1}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-xs font-bold ${
                  isCurrent
                    ? 'text-emerald-900 dark:text-emerald-200'
                    : isDone
                    ? 'text-stone-800 dark:text-stone-200'
                    : 'text-stone-400 dark:text-stone-500'
                }`}>
                  {step.title}
                </p>
                <p className="text-[10px] text-stone-500 dark:text-stone-400">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scientific AI Assurance Note */}
      <div className="flex items-center justify-center space-x-2 text-[11px] text-stone-500 dark:text-stone-400">
        <HeartPulse className="w-4 h-4 text-emerald-600" />
        <span>Phytosanitary & precision farming model</span>
      </div>

    </div>
  );
};
