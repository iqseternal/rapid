
/**
 * 比较器
 */
export interface EffectComparator<V> {
  /**
   * 比较器, 返回结果为
   * 0 标识相等,
   * 正数: v1 > v2,
   * 负数: v1 < v2
   */
  (v1: V, v2: V): boolean;
}

/**
 * 副作用 KEY
 */
export type EffectKey = string | number | symbol;

export type EffectValue = unknown;

/**
 * 副作用管理, 用于记录一个 key 对应的副作用列表
 */
export class EffectManager<Entries extends Record<EffectKey, EffectValue>> {
  private readonly effectMap = new Map<keyof Entries, Entries[keyof Entries][]>();

  /**
   * 比较器, 副作用可能具有多种形式
   */
  protected comparator: EffectComparator<Entries[keyof Entries]> = (v1, v2) => (v1 === v2);

  /**
   * 设置比较器
   */
  public setComparator(comparator: EffectComparator<Entries[keyof Entries]>): void {
    this.comparator = comparator;
  }

  /**
   * 获得当前的 KEY 对应的副作用列表
   */
  public getEffects<K extends keyof Entries>(key: K): Entries[K][] {
    if (!this.effectMap.has(key)) {
      const effects: Entries[K][] = [];
      this.effectMap.set(key, effects);
      return effects;
    }
    const effects = this.effectMap.get(key);
    if (Array.isArray(effects)) return effects as Entries[K][];
    throw new Error("Invalid");
  }

  /**
   * 设置 KEY 对应的副作用列表
   */
  public setEffects<K extends keyof Entries>(key: K, effects: Entries[K][]) {
    this.effectMap.set(key, effects);
  }

  /**
   * 向副作用列表中插入一个 EFFECT
   */
  public combine<K extends keyof Entries>(key: K, effect: Entries[K]) {
    const effects = this.getEffects(key);
    effects.push(effect);
  }

  /**
   * 向副作用列表中剔除 EFFECT
   */
  public eliminate<K extends keyof Entries>(key: K, effect: Entries[K]) {
    const effects = this.getEffects(key);
    const nextEffects = effects.filter(e => !this.comparator(effect, e));
    this.effectMap.set(key, nextEffects);
  }

  /**
   * 清空列表
   */
  public clear() {
    this.effectMap.clear();
  }
}

