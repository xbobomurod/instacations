
import React from 'react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

const Header: React.FC<Props> = ({ currentLang, onLangChange }) => {
  const langLabels = {
    [Language.UZ]: 'O\'zbekcha',
    [Language.EN]: 'English',
    [Language.RU]: 'Русский'
  };

  return (
    <header className="py-6 px-4 bg-white border-b sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl instagram-gradient flex items-center justify-center text-white text-xl shadow-lg">
            <i className="fa-brands fa-instagram"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">
              InstaCaptions
            </h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Global AI Engine</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative group">
            <button className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-1.5 transition-colors">
              <span className="text-xs font-bold text-gray-700">{langLabels[currentLang]}</span>
              <i className="fa-solid fa-globe text-[12px] text-gray-400"></i>
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] overflow-hidden">
              {Object.values(Language).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLangChange(lang)}
                  className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-pink-50 transition-colors ${currentLang === lang ? 'text-pink-600 bg-pink-50/50' : 'text-gray-600'}`}
                >
                  {langLabels[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
