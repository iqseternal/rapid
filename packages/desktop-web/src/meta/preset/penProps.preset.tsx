/**
 * Vue Antd Select组件
 */

export const _lineDashMap = {
  '直线': [0, 0],
  '虚线': [5, 5],
  '点线': [10, 10, 2, 10]
}

export const _findSameLineDash = (lineDash?: number[]): string => {
  if (!lineDash || lineDash.length === 0) return Object.keys(_lineDashMap)[0];

  findName:for (const name in _lineDashMap) {
    const _lineDash = _lineDashMap[name];

    if (_lineDash.length !== lineDash.length) continue;

    for (let i = 0;i < _lineDash.length;i ++) {
      if (_lineDash[i] !== lineDash[i]) continue findName;
    }

    return name;
  }

  return '';
}
