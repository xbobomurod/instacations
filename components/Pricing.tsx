
import React from 'react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface Props {
  onUpgrade: () => void;
  isPremium: boolean;
  lang: Language;
}

const Pricing: React.FC<Props> = ({ onUpgrade, isPremium, lang }) => {
  const t = translations[lang];
  
  if (isPremium) return (
    <div className="mt-12 bg-green-50 border border-green-100 p-6 rounded-3xl text-center">
      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
        <i className="fa-solid fa-crown text-xl"></i>
      </div>
      <h3 className="text-green-800 font-bold text-lg">{t.premiumActive}</h3>
    </div>
  );

  return (
    <div className="mt-12 bg-gray-900 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-pink-500/20 blur-[100px] rounded-full"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
            <span>Premium Plan</span>
          </div>
          <h2 className="text-3xl font-black mb-3">{t.premiumTitle}</h2>
          <p className="text-gray-400 text-sm max-w-sm">
            {t.premiumSubtitle}
          </p>
        </div>
        
        <div className="w-full md:w-auto bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
          <div className="mb-4">
            <span className="text-4xl font-black">10,000</span>
            <span className="text-gray-400 text-sm ml-1">UZS / week</span>
          </div>
          <button
            onClick={onUpgrade}
            className="w-full px-8 py-4 bg-white text-gray-900 rounded-2xl font-black hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl"
          >
            {t.buyBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
