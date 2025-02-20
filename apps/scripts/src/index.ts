
interface Item {
  id: number;
  name: string;
}

const arr: Item[] = [
  { id: 1, name: 'a', },
  { id: 3, name: 'c', },
  { id: 3, name: 'c', },
];

(() => {
  const s = new Set();

  const tArr = arr.filter(item => {
    if (s.has(item.id)) return false;
    s.add(item.id);
    return true;
  })

  console.log(tArr);
})();


