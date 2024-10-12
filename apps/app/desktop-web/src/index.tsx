import { useState, StrictMode } from 'react';
import { useReactive } from '@rapid/libs-web';
import { themePlugins, app } from './plugins';
import { IS_DEV } from '@rapid/config/constants';

import ReactDOM from 'react-dom/client';
import RapidApp from './app';

import '@scss/index.scss';

app.use(themePlugins);
app.installAll();

const rootContainer = document.getElementById('root')!;

ReactDOM.createRoot(rootContainer).render(

  <StrictMode>
    <RapidApp />

  </StrictMode>
);


import { SinglyLinkedList } from './events/LinkedList';


const singlyLinkedList = new SinglyLinkedList<number>();

singlyLinkedList.insert(1);
singlyLinkedList.insert(2);

singlyLinkedList.insertAtHead(3);

const other = new SinglyLinkedList<number>();
other.insert(1);

for (const value of singlyLinkedList.merge(other)) {
  console.log(value);
}
