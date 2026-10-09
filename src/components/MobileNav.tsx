import React from 'react';
import { 
  Home, 
  Scan, 
  Stethoscope, 
  History as HistoryIcon
} from 'lucide-react';
import { Language } from '../types';

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
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-4 py-2 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] safe-area-pb">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        
        {/* 1. Home Button */}
        <button
          onClick={() => onTabChange('dashboard')}
          className={`flex flex-col items-center justify-center transition-colors cursor-pointer py-1 px-3 ${
            activeTab === 'dashboard'
              ? 'text-[#8b5cf6] font-bold'
              : 'text-[#a78bfa] hover:text-[#7c3aed]'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'dashboard' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] font-bold mt-1 tracking-tight">
            {currentLanguage === 'ta' ? 'முகப்பு' : 'Home'}
          </span>
        </button>

        {/* 2. Diagnose Button (Choose Affected Part View) */}
        <button
          onClick={() => onTabChange('diagnose')}
          className={`flex flex-col items-center justify-center transition-colors cursor-pointer py-1 px-3 ${
            activeTab === 'diagnose'
              ? 'text-[#8b5cf6] font-bold'
              : 'text-[#a78bfa] hover:text-[#7c3aed]'
          }`}
        >
          <Stethoscope className={`w-5 h-5 ${activeTab === 'diagnose' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] font-bold mt-1 tracking-tight">
            {currentLanguage === 'ta' ? 'நோய் சோதனை' : 'Diagnose'}
          </span>
        </button>

        {/* 3. Center Elevated Floating Purple Scanner Button */}
        <div className="flex flex-col items-center -mt-7 shrink-0">
          <button
            onClick={() => onTabChange('analyze')}
            aria-label="Plant Scanner"
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8b5cf6] via-[#a78bfa] to-[#c4b5fd] text-white flex items-center justify-center shadow-xl shadow-purple-500/35 ring-4 ring-white active:scale-95 hover:scale-105 transition-all cursor-pointer group"
          >
            <Scan className="w-7 h-7 stroke-[2.2] text-white group-hover:scale-110 transition-transform" />
          </button>
          <span className="text-[10px] font-extrabold text-[#7c3aed] mt-0.5">
            {currentLanguage === 'ta' ? 'ஸ்கேன்' : 'Scan'}
          </span>
        </div>

        {/* 4. History Button */}
        <button
          onClick={() => onTabChange('history')}
          className={`flex flex-col items-center justify-center transition-colors cursor-pointer py-1 px-3 ${
            activeTab === 'history'
              ? 'text-[#8b5cf6] font-bold'
              : 'text-[#a78bfa] hover:text-[#7c3aed]'
          }`}
        >
          <HistoryIcon className={`w-5 h-5 ${activeTab === 'history' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[11px] font-bold mt-1 tracking-tight">
            {currentLanguage === 'ta' ? 'வரலாறு' : 'History'}
          </span>
        </button>

      </div>
    </div>
  );
};
