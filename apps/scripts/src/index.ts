
const data = (() => {

  return eval(`() => { return 1 }`);
})();

console.log(data);
