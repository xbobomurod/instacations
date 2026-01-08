
import React, { useState } from 'react';
import { Language } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  lang: Language;
}

const PaymentModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, lang }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const content = {
    [Language.UZ]: {
      title: "Premiumga o'tish 🚀",
      info: "Haftalik cheksiz foydalanish uchun 10,000 so'm to'lovni amalga oshiring.",
      cardLabel: "Qabul qiluvchi kartasi",
      copy: "Nusxa",
      paid: "To'lovni qildim",
      verifying: "To'lov tekshirilmoqda",
      wait: "Tizim avtomatik ravishda tranzaksiyani qidirmoqda. Iltimos, bir oz kuting.",
      verifyBtn: "Tekshirishni boshlash",
      back: "Orqaga qaytish"
    },
    [Language.EN]: {
      title: "Go Premium 🚀",
      info: "Pay 10,000 UZS for a weekly unlimited pass.",
      cardLabel: "Receiver Card",
      copy: "Copy",
      paid: "I have paid",
      verifying: "Verifying Payment",
      wait: "System is automatically searching for transaction. Please wait.",
      verifyBtn: "Start Verification",
      back: "Go Back"
    },
    [Language.RU]: {
      title: "Перейти на Premium 🚀",
      info: "Оплатите 10,000 сум за недельный безлимитный доступ.",
      cardLabel: "Карта получателя",
      copy: "Копия",
      paid: "Я оплатил",
      verifying: "Проверка платежа",
      wait: "Система автоматически ищет транзакцию. Пожалуйста, подождите.",
      verifyBtn: "Начать проверку",
      back: "Вернуться"
    }
  };

  const c = content[lang];

  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onConfirm();
    }, 2000);
  };

  const copyCard = () => {
    navigator.clipboard.writeText("8600 1234 5678 9012");
    alert(lang === Language.UZ ? "Nusxalandi!" : "Copied!");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">{c.title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <i className="fa-solid fa-xmark text-gray-500"></i>
            </button>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <p className="text-sm text-blue-700 leading-relaxed">
                  {c.info}
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border-2 border-dashed border-gray-200 rounded-2xl">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-2">{c.cardLabel}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-mono font-bold text-gray-800">8600 1234 5678 9012</span>
                    <button onClick={copyCard} className="text-pink-600 hover:text-pink-700 font-bold text-sm underline">{c.copy}</button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">InstaCaptions MCHJ (Global Pay)</p>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg hover:bg-black transition-all"
              >
                {c.paid}
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                <i className="fa-solid fa-earth-world animate-pulse"></i>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">{c.verifying}</h4>
                <p className="text-sm text-gray-500">
                  {c.wait}
                </p>
              </div>

              <button 
                onClick={handleVerify}
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg flex items-center justify-center space-x-2 ${
                  isLoading ? 'bg-gray-400' : 'instagram-gradient'
                }`}
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <span>{c.verifyBtn}</span>
                )}
              </button>
              
              <button onClick={() => setStep(1)} className="text-sm text-gray-400 font-medium">{c.back}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
