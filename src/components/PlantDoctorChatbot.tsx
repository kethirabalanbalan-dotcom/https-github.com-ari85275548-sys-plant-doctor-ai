import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sprout, 
  Sparkles, 
  Minimize2, 
  Maximize2,
  RefreshCw,
  Globe
} from 'lucide-react';
import { Language } from '../types';
import { sendChatMessage } from '../services/api';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface PlantDoctorChatbotProps {
  currentLanguage: Language;
}

export const PlantDoctorChatbot: React.FC<PlantDoctorChatbotProps> = ({
  currentLanguage: initialLang
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(initialLang);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Sync language when prop changes
  useEffect(() => {
    setLanguage(initialLang);
  }, [initialLang]);

  // Initial welcome message per language
  useEffect(() => {
    const welcomeText = 
      language === 'ta'
        ? 'வணக்கம் விவசாயி நண்பரே! 🌿 நான் உங்கள் பயிர் மருத்துவர் AI. உங்கள் பயிரின் நோய், பூச்சித் தாக்குதல், உரம் அல்லது இயற்கை மருந்து பற்றி நீங்கள் என்னிடம் கேட்கலாம். (கீழே உள்ள மைக் பட்டனை அழுத்திப் பேசலாம் அல்லது டைப் செய்யலாம்).'
        : language === 'tanglish'
        ? 'Vanakkam! 🌿 Naan ungal Plant Doctor AI assistant. Ungal crop-la edhavathu disease, poochi thollai, fertilizer or neem oil pathi kelunga. (Mic click panni pesalam or type pannalam).'
        : 'Hello Farmer & Gardener! 🌿 I am your Plant Doctor AI. Ask me anything about crop diseases, organic neem sprays, chemical fungicides, NPK fertilizers, or watering schedules!';

    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Web Speech Synthesis (Text to Speech)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop current speech
    setIsSpeaking(true);

    // Clean markdown/bullet points for cleaner speech
    const cleanText = text.replace(/[*#_~`]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (language === 'ta') {
      utterance.lang = 'ta-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Speech Recognition (Microphone Voice Input)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(language === 'ta' ? 'உங்கள் பிரவுசரில் மைக் ஆப்ஷன் ஆதரிக்கப்படவில்லை. குரோம் பிரவுசரைப் பயன்படுத்தவும்.' : 'Speech Recognition is not supported by your browser. Please use Chrome.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;

      // Select speech recognition language
      if (language === 'ta') {
        recognition.lang = 'ta-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          // Automatically send the voice query
          handleSendQuery(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Failed to start microphone:', err);
      setIsListening(false);
    }
  };

  const handleSendQuery = async (queryToSend?: string) => {
    const text = (queryToSend || inputText).trim();
    if (!text || isLoading) return;

    setInputText('');
    stopSpeaking();

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        sender: m.sender,
        text: m.text
      }));

      const reply = await sendChatMessage(text, language, historyPayload);

      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);

      // Auto speak if enabled
      if (autoSpeak) {
        speakText(reply);
      }
    } catch (err: any) {
      const errorReply = 
        language === 'ta'
          ? 'மன்னிக்கவும், தகவல் பெறுவதில் சிறிய சிக்கல் ஏற்பட்டது. மீண்டும் ஒருமுறை கேட்கவும்.'
          : language === 'tanglish'
          ? 'Sorry, oru chinna issue aachu. Marubadiyum kelunga.'
          : 'Sorry, I encountered an issue. Please try asking again.';

      setMessages((prev) => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'bot',
          text: errorReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendQuery();
  };

  // Quick suggestion questions
  const SUGGESTIONS = 
    language === 'ta'
      ? [
          '🌾 நெல் குலை நோய் மருந்து என்ன?',
          '🍅 தக்காளி இலைக்கருகலுக்கு என்ன செய்ய வேண்டும்?',
          '🌿 வேப்பெண்ணெய் எவ்வாறு தெளிக்க வேண்டும்?',
          '💧 செடிகளுக்கு தண்ணீர் எப்போது பாய்ச்ச வேண்டும்?'
        ]
      : language === 'tanglish'
      ? [
          '🌾 Nel blast noi-ku enna spray pannanum?',
          '🍅 Tomato leaf karugal organic method?',
          '🌿 Neem oil epdi mix panni adikkanum?',
          '💧 Plant-ku best watering time enna?'
        ]
      : [
          '🌾 Best medicine for Rice Blast?',
          '🍅 How to treat Tomato Early Blight?',
          '🌿 How to prepare Neem oil spray?',
          '💧 What is the best watering schedule?'
        ];

  return (
    <>
      {/* 1. Floating Trigger Button (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 animate-in fade-in zoom-in duration-300">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-3 rounded-full shadow-xl shadow-emerald-700/30 hover:shadow-emerald-700/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-400/30"
          >
            {/* Green glowing pulse indicator */}
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
            </span>

            <div className="flex items-center space-x-1.5">
              <Sprout className="w-5 h-5 text-emerald-100" />
              <span className="font-extrabold text-xs tracking-wide">
                {language === 'ta' ? 'AI வாய்ஸ் உதவியாளர்' : language === 'tanglish' ? 'AI Voice Chat' : 'AI Voice Assistant'}
              </span>
            </div>

            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <Mic className="w-3.5 h-3.5 text-white" />
            </div>
          </button>
        </div>
      )}

      {/* 2. Expanded Chatbot Window (Compact Side Widget) */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-2 sm:right-6 z-50 w-[94vw] sm:w-[400px] h-[550px] max-h-[82vh] bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-700 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white p-3.5 flex items-center justify-between shadow-xs shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30 shadow-inner">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-black text-xs sm:text-sm text-white leading-tight">
                    {language === 'ta' ? 'பயிர் மருத்துவர் AI' : 'Plant Doctor AI'}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-emerald-100 font-medium">
                  {language === 'ta' ? 'குரல் வழி விவசாய ஆலோசகர்' : 'Voice Phytopathology Assistant'}
                </p>
              </div>
            </div>

            {/* Action buttons: Auto-speak toggle & Close */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setAutoSpeak(!autoSpeak);
                }}
                className={`p-1.5 rounded-xl transition-all ${
                  autoSpeak ? 'bg-white/25 text-white' : 'bg-white/10 text-emerald-200'
                }`}
                title={autoSpeak ? 'Voice output ON' : 'Voice output OFF'}
              >
                {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Language Switcher Bar inside Chatbot */}
          <div className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700/60 flex items-center justify-between text-xs shrink-0">
            <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 flex items-center space-x-1">
              <Globe className="w-3 h-3 text-emerald-600" />
              <span>{language === 'ta' ? 'மொழி:' : 'Language:'}</span>
            </span>

            <div className="flex items-center space-x-1">
              {(['ta', 'tanglish', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    stopSpeaking();
                    setLanguage(lang);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                    language === lang
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-emerald-600'
                  }`}
                >
                  {lang === 'ta' ? 'தமிழ்' : lang === 'tanglish' ? 'Tanglish' : 'English'}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-stone-50/50 dark:bg-stone-900/40 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-xs font-medium'
                      : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-xs border border-stone-200/80 dark:border-stone-700 font-normal'
                  }`}
                >
                  {msg.text}
                </div>

                <div className="flex items-center space-x-2 px-1 text-[9px] text-stone-400">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'bot' && (
                    <button
                      type="button"
                      onClick={() => speakText(msg.text)}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-0.5 cursor-pointer font-bold"
                    >
                      <Volume2 className="w-3 h-3 inline" />
                      <span>{language === 'ta' ? 'கேள்' : 'Listen'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 p-2 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 max-w-[70%]">
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs text-stone-500 font-bold">
                  {language === 'ta' ? 'மருத்துவர் பதிலளிக்கிறார்...' : 'Plant Doctor thinking...'}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2 bg-stone-100/70 dark:bg-stone-800/60 border-t border-stone-200 dark:border-stone-700/60 overflow-x-auto scrollbar-none flex items-center space-x-1.5 shrink-0">
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendQuery(item)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-stone-800 text-[10px] font-bold text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-emerald-500 hover:text-emerald-700 transition-all shrink-0 cursor-pointer shadow-2xs"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Voice status banner when listening */}
          {isListening && (
            <div className="bg-rose-500 text-white px-3 py-1.5 text-xs font-bold flex items-center justify-between animate-pulse shrink-0">
              <div className="flex items-center space-x-2">
                <Mic className="w-4 h-4 animate-bounce" />
                <span>
                  {language === 'ta' ? 'மைக் இயங்குகிறது... பேசவும்' : 'Listening... Speak your question now'}
                </span>
              </div>
              <button
                type="button"
                onClick={toggleListening}
                className="text-[10px] bg-white/20 px-2 py-0.5 rounded-lg"
              >
                Stop
              </button>
            </div>
          )}

          {/* Input Form Bar */}
          <form onSubmit={handleFormSubmit} className="p-2.5 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center space-x-2 shrink-0">
            {/* Microphone Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white ring-4 ring-rose-200 animate-pulse'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800'
              }`}
              title={isListening ? 'Stop Listening' : 'Speak Voice Question'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                language === 'ta' 
                  ? 'கேள்வியை கேட்கவும்...' 
                  : language === 'tanglish' 
                  ? 'Kelviya kelunga / type pannunga...' 
                  : 'Type or speak your crop question...'
              }
              className="flex-1 px-3.5 py-2.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white transition-all cursor-pointer shadow-xs"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
