

export type Language = 'en-US' | 'ch-ZN';

export type EffectCallback = () => void;

export interface I18nInterface {

  changeLanguage(language: Language): void;
}

export class I18n implements I18nInterface {
  private language: Language = 'ch-ZN';
  private effects: EffectCallback[] = [];

  public getLanguage(): Language {
    return this.language;
  }

  public changeLanguage(language: Language): void {
    if (this.language !== language) {
      this.language = language;
      this.effects.forEach(effect => effect());
    }
  }

  public subscribe(effect: EffectCallback): void {
    this.effects.push(effect);
  }

  public unsubscribe(effect: EffectCallback): void {
    this.effects = this.effects.filter(tEffect => tEffect !== effect);
  }
}
