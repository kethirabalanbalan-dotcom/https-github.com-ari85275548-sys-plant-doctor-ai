import React, { useState } from 'react';
import { 
  Sprout, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Globe,
  Sun,
  Moon,
  ShieldCheck,
  Leaf
} from 'lucide-react';
import { User, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { loginUser, registerUser, forgotPassword } from '../services/api';

interface LoginGateViewProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onAuthSuccess: (user: User) => void;
  onContinueAsGuest?: () => void;
}

export const LoginGateView: React.FC<LoginGateViewProps> = ({
  currentLanguage,
  onLanguageChange,
  theme,
  onToggleTheme,
  onAuthSuccess,
  onContinueAsGuest
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regLanguage, setRegLanguage] = useState<Language>(currentLanguage);

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Forgot Password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotMsg, setForgotMsg] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[currentLanguage];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError(currentLanguage === 'ta' ? 'மின்னஞ்சல் முகவரி மற்றும் கடவுச்சொல்லை உள்ளிடவும்' : 'Please enter Email ID and password');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await loginUser(loginEmail, loginPassword);
      onAuthSuccess(data.user);
    } catch (err: any) {
      setError(err.message || 'Invalid Email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await loginUser('demo@plantdoctor.ai', 'password123');
      onAuthSuccess(data.user);
    } catch (err: any) {
      setError(err.message || 'Quick login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    if (!regEmail.trim()) {
      setError(currentLanguage === 'ta' ? 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்' : 'Please enter a valid email address');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError(currentLanguage === 'ta' ? 'கடவுச்சொற்கள் பொருந்தவில்லை' : 'Passwords do not match');
      return;
    }

    if (regPassword.length < 6) {
      setError(currentLanguage === 'ta' ? 'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்' : 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser({
        full_name: regFullName || regEmail.split('@')[0],
        email: regEmail,
        password: regPassword,
        preferred_language: regLanguage
      });

      setSuccessNotice(currentLanguage === 'ta' ? 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது! இப்போது உள்நுழையலாம்.' : 'Account created successfully! You can now log in.');
      setLoginEmail(regEmail);
      setLoginPassword(regPassword);
      setTab('login');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Email might already exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotInput.trim()) return;

    try {
      const msg = await forgotPassword(forgotInput);
      setForgotMsg(msg);
    } catch (err: any) {
      setForgotMsg(err.message || 'Failed to process request.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/70 via-stone-50 to-emerald-100/50 dark:from-stone-950 dark:via-stone-900 dark:to-emerald-950/30 flex flex-col justify-between p-4 sm:p-6 transition-colors">
      
      {/* Top Bar: Language & Theme controls */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between py-2">
        {/* Language selector chips */}
        <div className="flex items-center space-x-1 bg-white/80 dark:bg-stone-800/80 backdrop-blur-md p-1 rounded-2xl border border-stone-200/80 dark:border-stone-700 shadow-2xs">
          {(['en', 'ta', 'tanglish'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                currentLanguage === lang
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-emerald-600'
              }`}
            >
              {lang === 'en' ? 'English' : lang === 'ta' ? 'தமிழ்' : 'Tanglish'}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700 text-stone-600 dark:text-stone-300 shadow-2xs hover:scale-105 active:scale-95 transition-all"
          title="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Login / Register Card */}
      <div className="max-w-md w-full mx-auto my-auto py-4 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Branding Header */}
        <div className="text-center mb-6 space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/30 mb-1">
            <Sprout className="w-9 h-9 stroke-[2.2]" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
            {currentLanguage === 'ta' ? 'பயிர் மருத்துவர்' : 'Plant Doctor AI'}
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium max-w-xs mx-auto">
            {currentLanguage === 'ta' 
              ? 'செயற்கை நுண்ணறிவு மூலம் தாவர நோய் கண்டறிதல் மற்றும் மருந்து பரிந்துரை' 
              : currentLanguage === 'tanglish' 
              ? 'AI moolam plant disease kandupidichi treatment therinjikonga'
              : 'AI Agricultural Phytopathology & Leaf Care'}
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-white dark:bg-stone-800/95 backdrop-blur-md rounded-3xl border border-stone-200/90 dark:border-stone-700/80 shadow-xl shadow-black/5 p-6 sm:p-8 space-y-5">
          
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-stone-100 dark:bg-stone-900 rounded-2xl">
            <button
              onClick={() => {
                setTab('login');
                setError(null);
              }}
              className={`py-2 rounded-xl text-xs font-black transition-all ${
                tab === 'login'
                  ? 'bg-white dark:bg-stone-800 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              {currentLanguage === 'ta' ? 'உள்நுழைய (Login)' : 'Sign In'}
            </button>

            <button
              onClick={() => {
                setTab('register');
                setError(null);
              }}
              className={`py-2 rounded-xl text-xs font-black transition-all ${
                tab === 'register'
                  ? 'bg-white dark:bg-stone-800 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              {currentLanguage === 'ta' ? 'புதிய கணக்கு (Register)' : 'Create Account'}
            </button>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successNotice && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* 1. LOGIN TAB FORM */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  {currentLanguage === 'ta' ? 'மின்னஞ்சல் முகவரி (Email ID)' : 'Email ID'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="farmer@gmail.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    {currentLanguage === 'ta' ? 'கடவுச்சொல் (Password)' : 'Password'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    {currentLanguage === 'ta' ? 'மறந்துவிட்டதா?' : 'Forgot password?'}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{currentLanguage === 'ta' ? 'உள்நுழைக (Enter App)' : 'Log In & Enter'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick 1-Click Demo Login */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-700/60 space-y-2">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  disabled={loading}
                  className="w-full py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>
                    {currentLanguage === 'ta' ? '🚀 1-கிளிக் உடனடி உள்நுழைவு (Demo)' : '🚀 1-Click Demo Login (demo@plantdoctor.ai)'}
                  </span>
                </button>

                {onContinueAsGuest && (
                  <button
                    type="button"
                    onClick={onContinueAsGuest}
                    className="w-full text-center text-[11px] font-semibold text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 py-1"
                  >
                    {currentLanguage === 'ta' ? 'விருந்தினராக தொடர (Guest Mode)' : 'Continue as Guest'}
                  </button>
                )}
              </div>
            </form>
          )}

          {/* 2. REGISTER TAB FORM */}
          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  {currentLanguage === 'ta' ? 'மின்னஞ்சல் முகவரி (Email ID)' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="farmer@gmail.com"
                    required
                    className="w-full pl-10 pr-4 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  {currentLanguage === 'ta' ? 'பெயர் (விருப்பமானது)' : 'Full Name (Optional)'}
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-10 pr-4 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    {currentLanguage === 'ta' ? 'கடவுச்சொல்' : 'Password'}
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    required
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    {currentLanguage === 'ta' ? 'உறுதிசெய்க' : 'Confirm'}
                  </label>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    required
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  {currentLanguage === 'ta' ? 'விருப்பமான மொழி' : 'Preferred Language'}
                </label>
                <select
                  value={regLanguage}
                  onChange={(e) => setRegLanguage(e.target.value as Language)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="en">English</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="tanglish">Tanglish</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{currentLanguage === 'ta' ? 'கணக்கை உருவாக்கு (Create Account)' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>

      {/* Footer Info */}
      <div className="text-center text-[11px] text-stone-400 dark:text-stone-500 py-2">
        <span>Plant Doctor AI • Multi-lingual Plant & Disease Classifier</span>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-stone-200 dark:border-stone-700 animate-in fade-in zoom-in-95">
            <h3 className="font-black text-base text-stone-900 dark:text-stone-100">
              {currentLanguage === 'ta' ? 'கடவுச்சொல் மீட்பு' : 'Password Recovery'}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {currentLanguage === 'ta' 
                ? 'உங்கள் மின்னஞ்சல் அல்லது பயனர் ஐடியை உள்ளிடவும்.' 
                : 'Enter your email or user ID to receive reset instructions.'}
            </p>
            <input
              type="text"
              value={forgotInput}
              onChange={(e) => setForgotInput(e.target.value)}
              placeholder="demo@plantdoctor.ai"
              className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
            />
            {forgotMsg && (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {forgotMsg}
              </p>
            )}
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotMsg(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 dark:text-stone-300"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleForgotSubmit}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
