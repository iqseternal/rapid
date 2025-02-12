import { useCallback, useEffect, useState } from 'react';

import type { I18nInterface, Language } from './declare';
import { I18n } from './declare';

declare global {
  interface Window {
    i18n: I18n
  }

  const i18n: I18n;
}

window.i18n = new I18n();

export const locales: Record<string, Record<Language, string>> = {

}

let index = 0;

export const defineMessages = <Data extends Record<string, Record<Language, string>>>(data: Data) => {
  const message = {} as Record<keyof Data, string>;
  for (const key in data) {
    locales[`${index}__${key}`] = data[key];
    message[key] = `${index}__${key}`;
    index ++;
  }
  return message;
}

export interface Transition {
  t: <Key extends string>(key: Key) => string;
}

export const useTranslation = (): Transition => {
  const [_, updateState] = useState({});

  const t = useCallback(<Key extends string>(key: Key) => {
    const lang = i18n.getLanguage();
    return locales[key][lang];
  }, []);

  useEffect(() => {
    const refresh = () => updateState({});

    window.i18n.subscribe(refresh)

    return () => {
      window.i18n.unsubscribe(refresh)
    }
  }, []);

  return { t }
}
