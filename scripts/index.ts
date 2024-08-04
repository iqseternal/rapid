
import {} from 'typescript';


// 使用示例
async function example() {
  const promise = new Promise<string, number>((resolve, reject) => {
    // 模拟异步操作
    setTimeout(() => {
      resolve("Success");
      // 或者 reject(new Error("Failure"));
    }, 1000);
  });


  const p = new Promise<{
    a: number;
  }, number>((resolve, reject) => {

  });


  p
  .then(res => {

    console.log(res.a);

    return Promise.reject(2);
  }, err => {

    return 2;
  })
  .catch(err => {

    err.toFixed(2);

  })




  return promise;
}

example();
