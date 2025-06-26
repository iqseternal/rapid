
import { Ansi } from '@suey/pkg-utils';

export function print(...message: string[]) {
  Ansi.print(Ansi.blue, Ansi.underline, '[RD Builder Host]', ' ', Ansi.normal, ...message);
}

export function printWarn(...message: string[]) {
  Ansi.print(Ansi.yellow, '[RD Builder Host]', ' ', Ansi.normal, ...message);
}

export function printInfo(...message: string[]) {
  Ansi.print(Ansi.blue, '[RD Builder Host]', ' ', Ansi.normal, ...message);
}

export function printError(...message: string[]) {
  Ansi.print(Ansi.red, '[RD Builder Host]', ' ', Ansi.normal, ...message);
}


