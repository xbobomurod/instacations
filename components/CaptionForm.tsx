
import React, { useState, useEffect } from 'react';
import { CaptionRequest, CaptionStyle, Language } from '../types';
import { translations } from '../utils/translations';

interface Props {
  onSubmit: (data: CaptionRequest) => void;
  isLoading: boolean;
  freeLeft: number;
  lang: Language;
}

const SUGGESTED_CTAS: Record<Language, string[]> = {
  [Language.UZ]: ["Do'stlaringizni belgilang", "Narxini so'rang", "Directga yozing", "Chegirmadan foydalaning"],
  [Language.EN]: ["Tag your friends", "DM for price", "Limited stock", "Order now", "Shop link in bio"],
  [Language.RU]: ["Отметьте друзей", "Цена в директ", "Спешите купить", "Заказывайте сейчас"]
};

const CaptionForm: React.FC<Props> = ({ onSubmit, isLoading, freeLeft, lang }) => {
  const t = translations[lang];
  const [formData, setFormData] = useState<CaptionRequest>({
    productName: '',
    color: '',
    style: CaptionStyle.SOTUVCHI,
    language: lang,
    actionCall: '',
    additionalInfo: ''
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, language: lang }));
  }, [lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.productName.trim() && formData.color.trim()) {
      onSubmit(formData);
    }
  };

  const isLimitReached = freeLeft <= 0 && freeLeft !== 999;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{t.prodName}</label>
          <input
            type="text"
            placeholder="Nike Air Max"
            className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm text-gray-900 font-medium"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{t.prodColor}</label>
          <input
            type="text"
            placeholder="White/Blue"
            className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm text-gray-900 font-medium"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{t.styleLabel}</label>
        <div className="flex overflow-x-auto pb-2 -mx-1 px-1 sm:flex-wrap gap-2 scrollbar-hide">
          {Object.values(CaptionStyle).map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setFormData({ ...formData, style })}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                formData.style === style
                  ? 'instagram-gradient text-white border-transparent shadow-md'
                  : 'bg-white border-gray-100 text-gray-400 hover:border-pink-200'
              }`}
            >
              {t.styles[style]}
            </button>
          ))}
        </div>
        <div className="mt-2 px-3 py-2 bg-pink-50/50 rounded-xl border border-pink-100/50 flex items-start space-x-2 animate-fade-in">
          <i className="fa-solid fa-circle-info text-pink-400 text-[10px] mt-1"></i>
          <p className="text-[11px] text-pink-700/80 leading-snug font-medium italic">
            {t.styleTips[formData.style]}
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{t.ctaLabel}</label>
        <div className="flex overflow-x-auto pb-2 -mx-1 px-1 gap-2 mb-2 scrollbar-hide">
          {SUGGESTED_CTAS[lang].map((cta) => (
            <button
              key={cta}
              type="button"
              onClick={() => setFormData({ ...formData, actionCall: cta })}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                formData.actionCall === cta
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400'
              }`}
            >
              {cta}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder={t.ctaPlaceholder}
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-sm text-gray-900 font-medium"
          value={formData.actionCall}
          onChange={(e) => setFormData({ ...formData, actionCall: e.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{t.additionalInfo}</label>
        <textarea
          placeholder={t.additionalPlaceholder}
          rows={2}
          className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all resize-none text-sm text-gray-900 font-medium"
          value={formData.additionalInfo}
          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center justify-center space-x-2 ${
          isLoading ? 'bg-gray-400 opacity-70' : 'instagram-gradient hover:shadow-pink-500/20 hover:scale-[1.01] active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <i className="fa-solid fa-spinner fa-spin text-xl"></i>
        ) : (
          <>
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>{isLimitReached ? t.limitReached : t.generateBtn}</span>
          </>
        )}
      </button>
      
      {!isLimitReached && freeLeft !== 999 && (
        <div className="flex items-center justify-center space-x-2">
          <div className="h-1 flex-grow bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-pink-500 transition-all duration-500" 
              style={{ width: `${(freeLeft / 3) * 100}%` }}
            ></div>
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            {freeLeft}/3 {t.freeLeft}
          </span>
        </div>
      )}
    </form>
  );
};

export default CaptionForm;
