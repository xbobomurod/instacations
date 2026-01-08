
export enum CaptionStyle {
  SOTUVCHI = 'SOTUVCHI',
  HISSIY = 'HISSIY',
  MINIMALIST = 'MINIMALIST',
  PROFESSIONAL = 'PROFESSIONAL',
  SHOSHILINCH = 'SHOSHILINCH'
}

export enum Language {
  UZ = 'uz',
  EN = 'en',
  RU = 'ru'
}

export interface CaptionRequest {
  productName: string;
  color: string;
  style: CaptionStyle;
  language: Language;
  actionCall?: string;
  additionalInfo?: string;
}

export interface CaptionResponse {
  caption: string;
  hashtags: string[];
}

export interface UserStats {
  freeGenerationsLeft: number;
  lastResetDate: string;
  isPremium: boolean;
}
