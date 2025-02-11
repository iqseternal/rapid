import { readFile } from 'fs';

declare const foo: number;
declare const doSomething: () => void;

switch (foo) {
  case 1:
    doSomething();
    break;

  case 2:
    doSomething();
    break;


  default:



    break;
}
