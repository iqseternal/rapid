import { Printer, printClear } from '@suey/printer';

declare const React: any;

Printer.print('Hello');

let i = 0, j = true;

if (i < 0) console.log(`${i}`);

for (let i = 0;i < 100;i ++) {
  if (i === 0) continue;
  break;
}

abstract class A {
  public static readonly nameStr: string = 'a';

  abstract run(): void;
}

class B extends A {
  a = 1;

  override run(): void {
    this.a = parseInt(A.name);
  }
}

const b = new B();

interface Props {
  className?: string;
}

declare function Component(props: Props): JSX.Element;

declare const bc: string;

namespace React {
  export interface ReactElement {
    type: string;
  }
}

type P = Partial<React.ReactElement>;

enum Platform {
  Windows = 1
}

window.name;

const Home = <div>
  <Component
    className={'sdad'}
  >

  </Component>
</div>
