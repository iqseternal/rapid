
import { Printer } from '@suey/printer';

const xList = [3, 9, 27, 1324, 436, 192394932497329];

const solution = (x: number): boolean => {
  let base = 1;
  let stdBase = 3;

  while (true) {
    if (base === x) return true;
    if (base > x) return false;

    if (base * stdBase <= x) {
      base = base * stdBase;
      stdBase = base;
      continue;
    }

    while (base * stdBase > x) {
      if (stdBase / 3 >= 3) stdBase = stdBase / 3;
      else break;
    }

    base = base * stdBase;
    stdBase = base;
  }
}

for (const x of xList) {
  const isDivisibleByThree = solution(x);

  const methodName = isDivisibleByThree ? 'printInfo' : 'printError';

  Printer[methodName](`${x} ${isDivisibleByThree ? '能被 3 整除' : '不能被 3 整除'}`);
}




