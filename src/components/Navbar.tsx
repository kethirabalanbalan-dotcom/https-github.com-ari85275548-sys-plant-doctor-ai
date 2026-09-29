import React, { useState } from 'react';
import { 
  Sprout, 
  Globe, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  Database, 
  BookOpen, 
  History, 
  Camera, 
  Home, 
  Sun, 
  Moon,
  Sparkles
} from 'lucide-react';
import { User, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';

interface NavbarProps {
  user: User | null;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  currentLanguage,
  onLanguageChange,
  activeTab,
  onTabChange,
  onOpenAuth,
  onLogout,
  theme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = UI_TRANSLATIONS[currentLanguage];

  const languages: { code: Language; label: string; sub: string }[] = [
    { code: 'en', label: 'English', sub: 'Global' },
    { code: 'ta', label: 'தமிழ்', sub: 'Tamil' },
    { code: 'tanglish', label: 'Tanglish', sub: 'Tamil in English' }
  ];

  const navItems = [
    { id: 'dashboard', label: t.home, icon: Home },
    { id: 'analyze', label: t.analyze, icon: Camera },
    { id: 'history', label: t.history, icon: History },
    { id: 'library', label: t.library, icon: BookOpen },
    { id: 'database', label: t.database, icon: Database }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-stone-900/90 border-b border-emerald-100 dark:border-stone-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onTabChange('dashboard')} 
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-stone-900 dark:text-stone-100">
                  Plant<span className="text-emerald-600 dark:text-emerald-400">Doctor</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5" /> AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400 hidden sm:block leading-none mt-0.5">
                {currentLanguage === 'ta' ? 'பயிர் நோய் கண்டறிதல் & பராமரிப்பு' : 'AI Crop Pathology & Care'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-xs'
                      : 'text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-stone-50 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language, Theme, User */}
          <div className="flex items-center space-x-2">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                title="Change Language (English / தமிழ் / Tanglish)"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="uppercase font-bold tracking-wider">{currentLanguage}</span>
              </button>

              {langMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-stone-800 shadow-xl border border-stone-200 dark:border-stone-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  <div className="px-3 py-1 text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                    Select Language
                  </div>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onLanguageChange(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors ${
                        currentLanguage === l.code
                          ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/70 dark:bg-emerald-950/20'
                          : 'text-stone-700 dark:text-stone-200'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[10px] text-stone-400 dark:text-stone-500">{l.sub}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Toggle Dark / Light theme"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>

            {/* User Profile or Login */}
            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onTabChange('profile')}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-left"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.user_id}`}
                    alt={user.full_name}
                    className="w-8 h-8 rounded-full border-2 border-emerald-500 bg-stone-100"
                  />
                  <div className="hidden lg:block">
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-200 leading-tight">
                      {user.full_name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium leading-tight">
                      @{user.user_id}
                    </p>
                  </div>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title={t.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t.loginBtn}</span>
              </button>
            )}

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          {user && (
            <button
              onClick={() => {
                onTabChange('settings');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800"
            >
              <UserIcon className="w-5 h-5 text-stone-400" />
              <span>{t.settings}</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
