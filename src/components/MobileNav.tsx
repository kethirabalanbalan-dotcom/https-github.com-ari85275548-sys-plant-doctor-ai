import React from 'react';
import { Home, Camera, History, BookOpen, User as UserIcon } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentLanguage: Language;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  currentLanguage
}) => {
  const t = UI_TRANSLATIONS[currentLanguage];

  const items = [
    { id: 'dashboard', label: t.home, icon: Home },
    { id: 'analyze', label: t.analyze, icon: Camera, primary: true },
    { id: 'history', label: t.history, icon: History },
    { id: 'library', label: t.library, icon: BookOpen },
    { id: 'profile', label: t.profile, icon: UserIcon }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg border-t border-stone-200 dark:border-stone-800 px-2 py-1.5 shadow-lg safe-area-pb">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.primary) {
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center -mt-5 focus:outline-hidden"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 active:scale-95 transition-transform">
                  <Camera className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
