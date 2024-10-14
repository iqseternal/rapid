

import { SinglyLinkedList } from './SinglyLinkedList';

test('测试单链表功能是否正常', () => {
  const linkedList = new SinglyLinkedList();

  const values = [1, 2];

  linkedList.insert(...values);

  let index = 0;
  linkedList.forEach((value) => {
    expect(value).toBe(values[index ++]);
  })

  linkedList.deleteAtTail();
  values.pop();
  index = 0;
  linkedList.forEach((value) => {
    expect(value).toBe(values[index ++]);
  })

  linkedList.insertAtHead(5);
  values.unshift(5);
  index = 0;
  linkedList.forEach((value) => {
    expect(value).toBe(values[index ++]);
  })

});
