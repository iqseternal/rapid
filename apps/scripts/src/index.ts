

import { PriorityQueue } from '@rapid/libs';

const que = new PriorityQueue<number>();

que.setComparator((a, b) => b - a);

que.push(1, 4, 6, 67, 11, 45, 100, 3545, 40);

while (!que.isEmpty()) {
  console.log(que.pop());
}
