
import React, { useState } from 'react';
import { CaptionResponse, Language } from '../types';
import { translations } from '../utils/translations';

interface Props {
  result: CaptionResponse;
  lang: Language;
}

const CaptionResult: React.FC<Props> = ({ result, lang }) => {
  const [copied, setCopied] = useState(false);
  const t = translations[lang];

  const copyToClipboard = () => {
    const fullText = `${result.caption}\n\n${result.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden animate-fade-in">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
        <h3 className="font-bold text-gray-800">{t.readyText} ✨</h3>
        <button
          onClick={copyToClipboard}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            copied ? 'bg-green-100 text-green-600' : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
          }`}
        >
          <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
          <span>{copied ? t.copied : t.copyBtn}</span>
        </button>
      </div>
      <div className="p-6">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed mb-6 italic">
          {result.caption}
        </div>
        <div className="flex flex-wrap gap-2">
          {result.hashtags.map((tag, i) => (
            <span key={i} className="text-sm font-medium text-blue-500 hover:underline cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaptionResult;
