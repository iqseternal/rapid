import { useCallback, useEffect, useState } from 'react';

import type { I18nInterface, Language } from './declare';
import { I18n } from './declare';

declare global {
  interface Window {
    i18n: I18n
  }

  const i18n: I18n;
}

export interface Transition {
  t: () => void;
}

export const useTranslation = (): Transition => {
  const [_, updateState] = useState({});

  const t = useCallback(() => {


  }, []);

  useEffect(() => {
    const refresh = () => updateState({});

    window.i18n.subscribe(refresh)

    return () => {
      window.i18n.unsubscribe(refresh)
    }
  }, []);

  return {
    t

  }
}

export const defineMessages = () => {

}
