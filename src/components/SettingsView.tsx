import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Moon, 
  Sun, 
  Bell, 
  ShieldAlert, 
  LogOut, 
  Lock, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { Language, User } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';

interface SettingsViewProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user: User | null;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentLanguage,
  onLanguageChange,
  theme,
  onToggleTheme,
  user,
  onLogout,
  onOpenAuth
}) => {
  const t = UI_TRANSLATIONS[currentLanguage];

  const [notifications, setNotifications] = useState({
    diseaseAlerts: true,
    careReminders: true,
    seasonalTips: false
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center space-x-2">
          <SettingsIcon className="w-6 h-6 text-emerald-600" />
          <span>{t.settings}</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Preferences for localization, theme, AI safety guardrails, and agricultural notifications.
        </p>
      </div>

      {/* 1. Language Setting */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-bold text-sm">
          <Globe className="w-4 h-4 text-emerald-600" />
          <span>Application Language (மொழி தேர்வு)</span>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Select how diagnoses, disease symptoms, treatments, and watering guidelines are explained:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'en' as Language, title: 'English', desc: 'Global agricultural terms' },
            { id: 'ta' as Language, title: 'தமிழ்', desc: 'எளிய தூய தமிழ் மொழியில்' },
            { id: 'tanglish' as Language, title: 'Tanglish', desc: 'Easy Tamil in English script' }
          ].map((lang) => (
            <button
              key={lang.id}
              onClick={() => onLanguageChange(lang.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                currentLanguage === lang.id
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold shadow-xs ring-1 ring-emerald-600'
                  : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-emerald-400'
              }`}
            >
              <div className="text-xs font-bold">{lang.title}</div>
              <div className="text-[10px] text-stone-400 mt-0.5">{lang.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Theme Setting */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-xs flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-bold text-sm">
            {theme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>Interface Appearance</span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Current mode: <strong className="capitalize">{theme}</strong>
          </p>
        </div>

        <button
          onClick={onToggleTheme}
          className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-xs font-bold text-stone-800 dark:text-stone-200 hover:bg-stone-100 transition-colors"
        >
          Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* 3. Notification Preferences */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-bold text-sm">
          <Bell className="w-4 h-4 text-emerald-600" />
          <span>Notification Preferences</span>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer text-xs">
            <div>
              <p className="font-bold text-stone-800 dark:text-stone-200">
                Pest & Disease Outbreak Alerts
              </p>
              <p className="text-[10px] text-stone-400">
                Notify when high humidity creates blight risks in your region
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.diseaseAlerts}
              onChange={(e) => setNotifications({ ...notifications, diseaseAlerts: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer text-xs pt-2 border-t border-stone-100 dark:border-stone-700">
            <div>
              <p className="font-bold text-stone-800 dark:text-stone-200">
                Treatment Repeat Reminders
              </p>
              <p className="text-[10px] text-stone-400">
                Reminders when it is time to repeat fungicide or neem oil sprays
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.careReminders}
              onChange={(e) => setNotifications({ ...notifications, careReminders: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* 4. AI Reliability & Safety Rule Card */}
      <div className="rounded-3xl p-6 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 space-y-3 text-xs">
        <div className="flex items-center space-x-2 text-emerald-900 dark:text-emerald-200 font-bold">
          <ShieldAlert className="w-4 h-4 text-emerald-600" />
          <span>AI Reliability & Agricultural Disclaimer</span>
        </div>
        <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
          <strong>Important AI Reliability Rule:</strong> The application does not claim 100% accuracy. Confidence scores are dynamically evaluated using Google Gemini AI computer vision. If confidence is below the diagnostic threshold or an image is blurred/dark, the system issues a clear safety warning: <em>“Unable to identify confidently. Please upload a clear plant/leaf image.”</em>
        </p>
        <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
          Always read the chemical product label and consult your local agricultural extension service or horticulturist before applying commercial chemical fungicides.
        </p>
      </div>

      {/* 5. Account Actions & Logout */}
      <div className="pt-2">
        {user ? (
          <button
            onClick={onLogout}
            className="w-full py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-900 flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Farmer Account</span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20"
          >
            <span>{t.loginBtn}</span>
          </button>
        )}
      </div>

    </div>
  );
};
