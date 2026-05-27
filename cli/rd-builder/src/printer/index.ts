
import { ansi } from '@suey/pkg-utils';

export function print(...message: string[]) {
  ansi.print(ansi.blue, ansi.underline, '[RD Builder Host]', ' ', ansi.normal, ...message);
}

export function printWarn(...message: string[]) {
  ansi.print(ansi.yellow, '[RD Builder Host]', ' ', ansi.normal, ...message);
}

export function printInfo(...message: string[]) {
  ansi.print(ansi.blue, '[RD Builder Host]', ' ', ansi.normal, ...message);
}

export function printError(...message: string[]) {
  ansi.print(ansi.red, '[RD Builder Host]', ' ', ansi.normal, ...message);
}


