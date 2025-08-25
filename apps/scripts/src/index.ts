import { isArray, isUndefined } from 'lodash';

const compareDepsEqual = <T, K>(deps?: T[], nextDeps?: K[]) => {
  // 如果两个都是 undefined, 则认为相等
  if (isUndefined(deps) && isUndefined(nextDeps)) return true;

  // 如果两个都是数组, 则判断数组中的每个元素是否相等
  if (isArray(deps) && isArray(nextDeps)) {
    if (deps.length !== nextDeps.length) return false;
    return deps.every((dep, index) => Object.is(dep, nextDeps[index]));
  }

  // 其他情况认为不相等
  return false;
}

