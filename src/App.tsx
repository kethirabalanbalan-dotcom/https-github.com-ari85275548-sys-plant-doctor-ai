import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { DashboardView } from './components/DashboardView';
import { AnalyzeView } from './components/AnalyzeView';
import { AnalysisLoadingView } from './components/AnalysisLoadingView';
import { ResultView } from './components/ResultView';
import { HistoryView } from './components/HistoryView';
import { LibraryView } from './components/LibraryView';
import { DatabaseView } from './components/DatabaseView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { AuthModal } from './components/AuthModal';
import { LoginGateView } from './components/LoginGateView';
import { Sprout } from 'lucide-react';

import { User, Language, PlantAnalysisData } from './types';
import { SampleLeaf, SAMPLE_PLANTS } from './utils/sampleImages';
import { 
  getCurrentUser, 
  clearStoredToken, 
  getStoredLanguage, 
  setStoredLanguage, 
  analyzePlantPhoto, 
  getAnalysisHistory, 
  saveAnalysisResult, 
  deleteAnalysisResult 
} from './services/api';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [guestMode, setGuestMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getStoredLanguage());
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Modals & Navigation helpers
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Analysis workflow
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<PlantAnalysisData | null>(null);
  const [isCurrentResultSaved, setIsCurrentResultSaved] = useState(false);
  const [preloadedSample, setPreloadedSample] = useState<SampleLeaf | null>(null);
  const [initialAnalyzeMode, setInitialAnalyzeMode] = useState<'upload' | 'camera'>('upload');

  // History list
  const [history, setHistory] = useState<PlantAnalysisData[]>([]);

  // Apply dark theme class to root html/body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Load initial User and History
  useEffect(() => {
    getCurrentUser()
      .then((u) => {
        if (u) {
          setUser(u);
          if (u.preferred_language) {
            setCurrentLanguage(u.preferred_language);
          }
        }
      })
      .finally(() => {
        setIsAuthChecking(false);
      });

    getAnalysisHistory().then((hist) => {
      setHistory(hist);
    });
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    setStoredLanguage(lang);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    clearStoredToken();
    setUser(null);
    setGuestMode(false);
    setActiveTab('dashboard');
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    setGuestMode(false);
    if (loggedUser.preferred_language) {
      handleLanguageChange(loggedUser.preferred_language);
    }
    // Refresh history for this user
    getAnalysisHistory().then((hist) => setHistory(hist));
  };

  // Trigger AI Analysis
  const handleStartAnalysis = async (base64Image: string, mimeType: string = 'image/jpeg') => {
    setIsAnalyzing(true);
    setIsCurrentResultSaved(false);

    try {
      const response = await analyzePlantPhoto(base64Image, mimeType);

      if (!response.success && response.unableToIdentify) {
        // Fallback low-confidence object
        const unidentifiableData: PlantAnalysisData = {
          image_path: base64Image,
          isPlant: false,
          unableToIdentify: true,
          errorMessage: response.errorMessage || 'Unable to identify confidently. Please upload a clear plant/leaf image.',
          plantName: 'Unrecognized Plant',
          diseaseName: 'Diagnosis Inconclusive',
          confidence: response.confidence || 45,
          status: 'Unknown',
          severity: 'None',
          symptoms: ['Ambiguous or unidentifiable leaf features', 'Image lighting or contrast insufficient'],
          causes: [],
          treatment: {
            recommendedProduct: 'No chemical treatment recommended until verified',
            howToUse: 'Please re-take photo in direct daylight',
            frequency: 'N/A',
            whenToRepeat: 'N/A',
            safetyPrecautions: 'None required',
            organicAlternative: 'N/A',
            labelWarning: 'Follow local agricultural extension service advice.'
          },
          watering: {
            requirement: 'Standard moderate watering',
            frequency: 'Check topsoil daily',
            bestTime: 'Morning',
            soilMoisture: 'Keep moist not wet',
            overwateringWarning: 'Avoid standing water',
            underwateringWarning: 'Avoid bone-dry soil'
          },
          fertilizer: {
            recommendedType: 'Balanced organic compost',
            npk: 'Balanced',
            whenToApply: 'Monthly',
            howToApply: 'Soil level',
            precautions: 'Do not overfeed'
          },
          sunlight: {
            requirement: 'Natural sunlight',
            duration: '6 hours',
            exposure: 'Full sun to partial shade',
            indoorOutdoor: 'Outdoor',
            lackOfSunlightSigns: 'Pale color'
          },
          prevention: ['Take high-resolution photo with leaves in clear focus'],
          translations: {
            ta: {
              plantName: 'அடையாளம் காண முடியாத செடி',
              diseaseName: 'தெளிவற்ற நோய் நிலை',
              status: 'தெரியவில்லை',
              summary: 'நம்பிக்கையுடன் அடையாளம் காண முடியவில்லை. தயவுசெய்து இலையின் மேற்பரப்பு தெளிவாகத் தெரியும்படி புதிய புகைப்படத்தைப் பதிவேற்றவும்.',
              symptoms: ['தெளிவற்ற இலை பாகங்கள்'],
              treatmentGuide: 'சரியான இலை புகைப்படம் எடுக்கும் வரை மருந்து தெளிக்க வேண்டாம்.',
              wateringGuide: 'மண் காய்ந்ததும் மிதமாக தண்ணீர் ஊற்றவும்.',
              fertilizerGuide: 'இயற்கை உரம் மட்டுமே இடவும்.',
              sunlightGuide: 'நல்ல சூரிய வெளிச்சத்தில் வைக்கவும்.',
              preventionGuide: 'தெளிவான படம் எடுக்கவும்.'
            },
            tanglish: {
              plantName: 'Unrecognized Plant',
              diseaseName: 'Diagnosis Inconclusive',
              status: 'Clear-ah Theriyala',
              summary: 'Unable to identify confidently. Dayavu seidhu leaf surface nalla theriyura maathiri clear image upload pannunga.',
              symptoms: ['Leaf features ambiguous-ah irukku'],
              treatmentGuide: 'Clear photo upload panra varaikkum chemical spray pannathinga.',
              wateringGuide: 'Soil dry aana mattum water oothunga.',
              fertilizerGuide: 'Organic manure mattum use pannalam.',
              sunlightGuide: 'Good sunlight-la vainga.',
              preventionGuide: 'Sharp photo eduthu check pannunga.'
            }
          }
        };

        setCurrentResult(unidentifiableData);
        setActiveTab('result');
      } else if (response.data) {
        const enrichedResult: PlantAnalysisData = {
          ...response.data,
          image_path: base64Image
        };
        setCurrentResult(enrichedResult);
        setActiveTab('result');

        // If user is logged in, automatically save or allow one-click save
        if (user) {
          saveAnalysisResult(enrichedResult)
            .then((savedRecord) => {
              setIsCurrentResultSaved(true);
              setHistory((prev) => [savedRecord, ...prev]);
            })
            .catch((err) => console.warn('Autosave skipped:', err));
        }
      }
    } catch (err: any) {
      alert(err.message || 'Error running AI analysis. Please check your image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToHistory = async () => {
    if (!currentResult) return;
    if (!user) {
      handleOpenAuth('login');
      return;
    }
    try {
      const saved = await saveAnalysisResult(currentResult);
      setIsCurrentResultSaved(true);
      setHistory((prev) => [saved, ...prev.filter((h) => h.id !== saved.id)]);
    } catch (err: any) {
      alert(err.message || 'Failed to save to history');
    }
  };

  const handleDeleteHistory = async (id: string) => {
    try {
      await deleteAnalysisResult(id);
      setHistory((prev) => prev.filter((h) => h.id !== id));
      if (currentResult?.id === id) {
        setCurrentResult(null);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete record');
    }
  };

  const handleSelectHistoryItem = (item: PlantAnalysisData) => {
    setCurrentResult(item);
    setIsCurrentResultSaved(true);
    setActiveTab('result');
  };

  const handleSelectSample = (sample: SampleLeaf) => {
    setPreloadedSample(sample);
    // Start analysis immediately so the disease is diagnosed and shown right away
    handleStartAnalysis(sample.imageUrl, 'image/jpeg');
  };

  const handleNavigateToAnalyze = (mode: 'upload' | 'camera' = 'upload') => {
    setInitialAnalyzeMode(mode);
    setPreloadedSample(null);
    setActiveTab('analyze');
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-14 h-14 rounded-3xl bg-emerald-600 text-white flex items-center justify-center animate-pulse shadow-xl shadow-emerald-600/30">
          <Sprout className="w-8 h-8 stroke-[2.2]" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-black text-stone-900 dark:text-stone-100">
            Plant Doctor AI
          </p>
          <p className="text-xs text-stone-400">Loading farm workspace...</p>
        </div>
      </div>
    );
  }

  // App ulla pogurathuku munnadi login kekanum (Mandatory Login Gate)
  if (!user && !guestMode) {
    return (
      <LoginGateView
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onAuthSuccess={handleAuthSuccess}
        onContinueAsGuest={() => setGuestMode(true)}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors ${
      currentLanguage === 'ta' ? 'font-tamil' : ''
    }`}>
      {/* Top Navbar */}
      <Navbar
        user={user}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'analyze') {
            setPreloadedSample(null);
          }
          setActiveTab(tab);
        }}
        onOpenAuth={() => handleOpenAuth('login')}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-12">
        {/* Render View based on activeTab and isAnalyzing state */}
        {isAnalyzing ? (
          <AnalysisLoadingView currentLanguage={currentLanguage} />
        ) : activeTab === 'dashboard' ? (
          <DashboardView
            user={user}
            currentLanguage={currentLanguage}
            onNavigateToAnalyze={handleNavigateToAnalyze}
            onSelectSample={handleSelectSample}
            recentAnalyses={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onOpenAuth={() => handleOpenAuth('login')}
            onStartAnalysis={handleStartAnalysis}
          />
        ) : activeTab === 'analyze' ? (
          <AnalyzeView
            currentLanguage={currentLanguage}
            initialMode={initialAnalyzeMode}
            preloadedSample={preloadedSample}
            onStartAnalysis={handleStartAnalysis}
            onClearPreloadedSample={() => setPreloadedSample(null)}
          />
        ) : activeTab === 'result' && currentResult ? (
          <ResultView
            result={currentResult}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onUploadAnother={() => {
              setPreloadedSample(null);
              setActiveTab('analyze');
            }}
            onSaveToHistory={handleSaveToHistory}
            isSaved={isCurrentResultSaved}
            onBackToHome={() => setActiveTab('dashboard')}
          />
        ) : activeTab === 'history' ? (
          <HistoryView
            history={history}
            currentLanguage={currentLanguage}
            onSelectRecord={handleSelectHistoryItem}
            onDeleteRecord={handleDeleteHistory}
            onNavigateToAnalyze={() => handleNavigateToAnalyze('upload')}
          />
        ) : activeTab === 'library' ? (
          <LibraryView
            currentLanguage={currentLanguage}
            onSelectPlantToAnalyze={(plantName) => {
              const matchedSample = SAMPLE_PLANTS.find((s) =>
                s.name.toLowerCase().includes(plantName.toLowerCase())
              );
              if (matchedSample) {
                setPreloadedSample(matchedSample);
              }
              setActiveTab('analyze');
            }}
          />
        ) : activeTab === 'database' ? (
          <DatabaseView />
        ) : activeTab === 'profile' ? (
          <ProfileView
            user={user}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onUpdateUser={(updated) => setUser(updated)}
            onOpenAuth={() => handleOpenAuth('login')}
          />
        ) : activeTab === 'settings' ? (
          <SettingsView
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            user={user}
            onLogout={handleLogout}
            onOpenAuth={() => handleOpenAuth('login')}
          />
        ) : (
          <DashboardView
            user={user}
            currentLanguage={currentLanguage}
            onNavigateToAnalyze={handleNavigateToAnalyze}
            onSelectSample={handleSelectSample}
            recentAnalyses={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onOpenAuth={() => handleOpenAuth('login')}
            onStartAnalysis={handleStartAnalysis}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'analyze') {
            setPreloadedSample(null);
          }
          setActiveTab(tab);
        }}
        currentLanguage={currentLanguage}
      />

      {/* Login & Registration Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
}
