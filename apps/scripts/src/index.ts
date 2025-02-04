
import { randomRegionForInt, toNil, apiPost, apiGet } from '@rapid/libs';
import { Printer, print, toColor, toPrintClear } from '@suey/printer';

const edge: number[] = [], next: number[] = [], value: number[] = [], head: number[] = [];
let index = 0;

const map = [
  [1, 2, 1],

  [1, 3, 2],

  [1, 4, 1],

  [2, 4, 1],

  [4, 5, 1]
];

;; (async () => {
  for (let i = 0; i < map.length; i++) {
    const [x, y, v] = map[i];

    // add, x -> y
    edge[++index] = y, next[index] = head[x], value[index] = v, head[x] = index;
  }

  let str = ``;
  let cost = 0;
  let isCanArrived = false;

  const visited: boolean[] = new Array(5 + 1).fill(false);
  function dfs(x: number) {
    if (x === 5) {
      isCanArrived = true;
      print(toColor('blue', `cost: ${cost} ====>`), toPrintClear(), str);
      return;
    }

    for (let index = head[x]; index !== void 0 && index > 0; index = next[index]) {
      const e = edge[index], v = value[index];

      if (visited[e]) continue;

      visited[e] = true;

      const pStr = str, pCost = cost;

      str += `${x} -> ${e},`, cost += v;

      dfs(e);

      visited[e] = false;

      str = pStr;
      cost = pCost;
    }
  }

  visited[1] = true;
  dfs(1);


  if (!isCanArrived) {
    Printer.printError('No path found');
    return;
  }
})();




