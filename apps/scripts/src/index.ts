// @ts-nocheck
class SingletonBase {
  // 用于存储唯一实例的静态变量
  static instance = null;

  // 构造函数
  constructor() {
    if (SingletonBase.instance) {
      return SingletonBase.instance;  // 如果实例已存在，直接返回它
    }

    // 否则，创建新的实例并存储
    SingletonBase.instance = this;
  }
}

class DerivedClass extends SingletonBase {

  getTimestamp() {
    console.log('创建对象时调用了该方法');
    return this.timestamp;
  }
}

class B extends SingletonBase {

}

const obj1 = new DerivedClass();
const obj2 = new DerivedClass();

const obj3 = new B();


console.log(obj1 === obj2);  // 输出: true，表示 obj1 和 obj2 是同一个实例

console.log(obj1 === obj3);

console.log(obj1.getTimestamp());  // 打印创建时间
console.log(obj2.getTimestamp());  // 打印相同的创建时间
