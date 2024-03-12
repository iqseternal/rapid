// @ts-nocheck
import { print } from '@suey/printer';

interface Node {
  pre?: Node;
  next?: Node;
}

const node: Node = {

}

node.next = node;

let currentNode = node;
let is = false;

do {
  currentNode = node.next;

  if (currentNode === node) {
    is = true;
    break;
  }

} while (currentNode);


print(is);

