
function merge_sort(arr: number[], start: number, end: number): number[] {
  if (start > end) return [];
  if (start === end) return [arr[start]];

  const mid = Math.floor((start + end) / 2);

  const left = merge_sort(arr, start, mid);
  const right = merge_sort(arr, mid + 1, end);

  let i = 0, j = 0, k = 0;

  const target: number[] = [];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) target[k++] = left[i++];
    else target[k++] = right[j++];
  }

  while (i < left.length) target[k++] = left[i++];
  while (j < right.length) target[k++] = right[j++];
  return target;
}

const arr = [5, 3, 8, 4, 2];

const sortedArr = merge_sort(arr, 0, arr.length - 1);

console.log(sortedArr);
