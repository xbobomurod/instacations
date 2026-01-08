
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CaptionForm from './components/CaptionForm';
import CaptionResult from './components/CaptionResult';
import Pricing from './components/Pricing';
import PaymentModal from './components/PaymentModal';
import { CaptionRequest, CaptionResponse, UserStats, Language } from './types';
import { generateCaption } from './services/geminiService';
import { getStats, decrementLimit, upgradeToPremium } from './utils/storage';
import { translations } from './utils/translations';

const App: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(getStats());
  const [lang, setLang] = useState<Language>(Language.UZ);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CaptionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const t = translations[lang];

  const handleGenerate = async (data: CaptionRequest) => {
    if (stats.freeGenerationsLeft <= 0 && !stats.isPremium) {
      setError(lang === Language.UZ ? "Bugungi bepul limitlaringiz tugadi. Premiumga o'ting!" : "Free limit reached. Upgrade to Premium!");
      setIsPaymentOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generateCaption({ ...data, language: lang });
      setResult(response);
      const newStats = decrementLimit();
      setStats(newStats);
    } catch (err: any) {
      setError(lang === Language.UZ ? "Xatolik yuz berdi. Iltimos keyinroq urinib ko'ring." : "Error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgradeSuccess = () => {
    const newStats = upgradeToPremium();
    setStats(newStats);
    setIsPaymentOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header currentLang={lang} onLangChange={setLang} />
      
      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full relative">
        {/* Decorative Global Reach Background Icon */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 opacity-[0.03] -z-10 pointer-events-none">
          <i className="fa-solid fa-earth-americas text-[400px]"></i>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight">
            {t.heroTitle.split('AI')[0]}
            <span className="text-pink-600">AI</span>
            {t.heroTitle.split('AI')[1]}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto px-4">
            {t.heroSubtitle}
          </p>
        </div>

        <div className="glass-card rounded-[2.5rem] p-5 sm:p-10 shadow-2xl border border-white/50">
          <CaptionForm 
            onSubmit={handleGenerate} 
            isLoading={isLoading} 
            freeLeft={stats.isPremium ? 999 : stats.freeGenerationsLeft}
            lang={lang}
          />
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center space-x-3 text-sm font-medium animate-shake">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}

          {result && <CaptionResult result={result} lang={lang} />}
        </div>

        <Pricing onUpgrade={() => setIsPaymentOpen(true)} isPremium={stats.isPremium} lang={lang} />
        
        <div className="mt-16 text-center text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest pb-12">
          <p>© 2024 InstaCaptions Global. Powered by Advanced Gemini AI.</p>
        </div>
      </main>

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        onConfirm={handleUpgradeSuccess}
        lang={lang}
      />

      <a 
        href="https://wa.me/998901234567?text=Support"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all z-40"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
