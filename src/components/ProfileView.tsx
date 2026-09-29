import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Activity, 
  Globe, 
  Save, 
  CheckCircle2, 
  ShieldCheck,
  Edit2
} from 'lucide-react';
import { User, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { updateProfile } from '../services/api';

interface ProfileViewProps {
  user: User | null;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onUpdateUser: (user: User) => void;
  onOpenAuth: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  currentLanguage,
  onLanguageChange,
  onUpdateUser,
  onOpenAuth
}) => {
  const t = UI_TRANSLATIONS[currentLanguage];

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [preferredLang, setPreferredLang] = useState<Language>(user?.preferred_language || currentLanguage);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
          Sign In to Access Your Farmer Profile
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Save your diagnostic scans, track crop recovery, and customize default languages.
        </p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
        >
          {t.loginBtn}
        </button>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);

    try {
      const updated = await updateProfile({
        full_name: fullName,
        preferred_language: preferredLang
      });
      onUpdateUser(updated);
      onLanguageChange(preferredLang);
      setIsEditing(false);
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 flex items-center space-x-2">
          <UserIcon className="w-6 h-6 text-emerald-600" />
          <span>{t.profile}</span>
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Farmer account credentials, language preferences, and diagnostic statistics.
        </p>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* User Card Top */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.user_id}`}
            alt={user.full_name}
            className="w-24 h-24 rounded-2xl border-4 border-emerald-500 shadow-md bg-stone-100"
          />

          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-center sm:justify-between">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                {user.full_name}
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="hidden sm:flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            </div>

            <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              @{user.user_id}
            </p>

            <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center justify-center sm:justify-start space-x-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
            </p>

            <p className="text-[11px] text-stone-400 flex items-center justify-center sm:justify-start space-x-1 pt-1">
              <Calendar className="w-3 h-3" />
              <span>Member since {new Date(user.created_at).toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        {/* Edit Form or Read-Only Details */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-700">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Preferred Language
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'en' as Language, label: 'English' },
                  { id: 'ta' as Language, label: 'தமிழ் (Tamil)' },
                  { id: 'tanglish' as Language, label: 'Tanglish' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setPreferredLang(lang.id)}
                    className={`py-2 px-3 rounded-xl text-center text-xs font-bold border transition-all ${
                      preferredLang === lang.id
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 shadow-xs'
                        : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/20"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-bold hover:bg-stone-50"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100 dark:border-stone-700">
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-700">
              <span className="text-[11px] text-stone-400 block mb-0.5">Preferred Language</span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                {user.preferred_language === 'ta' ? 'தமிழ் (Tamil)' : user.preferred_language === 'tanglish' ? 'Tanglish' : 'English'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-700">
              <span className="text-[11px] text-stone-400 block mb-0.5">{t.plantsAnalyzed}</span>
              <span className="text-xs font-black text-stone-900 dark:text-stone-100">
                {user.plants_analyzed ?? 1} Plants Scanned
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-700 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-stone-400 block mb-0.5">Account Role</span>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Agri User</span>
              </span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
