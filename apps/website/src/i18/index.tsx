
import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import autoLanguage from 'i18next-browser-languagedetector';

import zhCN from './zh_CN.json';
import enGB from './en_GB.json';
import ruRu from './ru_Ru.json';

export const resources = {
  zh: { translation: zhCN },
  en: { translation: enGB },
  ru: { translation: ruRu }
};

export const instance = i18n
.use(autoLanguage)
.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources
});


export type LangMap = typeof resources;

export type LangType = keyof LangMap;

export type LangTextMap = typeof zhCN;

export type LangTextKey = keyof LangTextMap;

export const $t: <Key extends LangTextKey>(key: Key) => LangTextMap[Key] = i18n.t;

globalThis.$t = $t;

export default instance;
