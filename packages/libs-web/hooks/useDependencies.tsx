
export type AppendDepFn<DepType> = (...deps: DepType[]) => void;
export type RemoveDepFn<DepType> = (...deps: DepType[]) => void;

/**
 * 使用一个依赖列表
 *
 * @example
 * // 创建一个副作用函数列表
 * type Callback = () => void;
 *
 * const { dependenciesList, appendDep, removeDep } = useDependenciesListHook<Callback>();
 *
 * const refresh = useRefresh();
 *
 * useEffect(() => {
 *   appendDep(refresh);
 *
 *   return () => {
 *     removeDep(refresh);
 *   }
 * }, []);
 *
 */
export function useDependenciesListHook<DepType extends any>() {
  /** 依赖列表 */
  const dependenciesList: DepType[] = [];

  /** 添加依赖 */
  const appendDep: AppendDepFn<DepType> = (...deps) => {
    const filterDeps = deps.filter(dep => {
      return dependenciesList.findIndex(dependence => dependence === dep) === -1;
    });
    dependenciesList.push(...filterDeps);
  }

  /** 移除依赖 */
  const removeDep: RemoveDepFn<DepType> = (...deps) => {
    deps.forEach(dep => {
      const index = dependenciesList.findIndex((dependence) => dependence === dep);

      if (index !== -1) dependenciesList.splice(index, 1);
    })
  }

  return {
    dependenciesList,
    appendDep,
    removeDep
  }
}

