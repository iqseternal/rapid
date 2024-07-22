
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
export function useDependenciesListHook<DepType extends unknown>() {
  const dependenciesList: DepType[] = [];

  const appendDep = (dep: DepType) => {
    const index = dependenciesList.findIndex(dependence => dependence === dep);

    if (index !== -1) return;

    dependenciesList.push(dep);
  }

  const removeDep = (dep: DepType) => {
    const index = dependenciesList.findIndex((dependence) => dependence === dep);

    if (index !== -1) {
      dependenciesList.splice(index, 1);
    }
  }

  return {
    dependenciesList,
    appendDep,
    removeDep
  }
}

