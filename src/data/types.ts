// Типы для структуры данных языков программирования

export interface CardData {
  id: string;
  title: string;
  description: string;
  level: 'Начинающий' | 'Средний' | 'Продвинутый';
  duration: string;
}

export interface ContentSection {
  title: string;
  content?: string;
  code?: string;
  items?: string[];
}

export interface LanguageData {
  name: string;
  color: string;
  cards: CardData[];
  content: Record<string, ContentSection[]>;
}

export interface LanguagesData {
  [key: string]: LanguageData;
}
