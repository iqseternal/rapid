
export const ClassDecorator1: ClassDecorator = (target) => {
  console.log('类装饰器1');
}
export const ClassDecorator2: ClassDecorator = (target) => {
  console.log('类装饰器2');
}

export const MethodDecorator1 = (target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => void>) => {
  console.log(`方法装饰器1`);

  if (descriptor.writable) {

    descriptor.value = function(...args) {


    }
  }
}
export const MethodDecorator2: MethodDecorator = (target, key, descriptor) => {
  console.log(`方法装饰器2`)
}

export const PropertyDecorator1: PropertyDecorator = (target, key) => {
  console.log(`属性装饰器1`);
}
export const PropertyDecorator2: PropertyDecorator = (target, key) => {
  console.log(`属性装饰器2`);
}
export const ParameterDecorator: ParameterDecorator = (target, key, index) => {
  console.log(`参数装饰器：${index} `);
}

@ClassDecorator1
@ClassDecorator2
export class A {
  @PropertyDecorator1
  @PropertyDecorator2
  a: number = 1;

  @MethodDecorator1
  @MethodDecorator2
  run(@ParameterDecorator a: number, @ParameterDecorator b: number) {

  }
}

const a = new A();
