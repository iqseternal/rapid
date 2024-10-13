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

interface Item {
  name: string;
  age: number;
}

const singlyLinkedList = new SinglyLinkedList<Item>();

singlyLinkedList.insert({ name: 'suey', age: 18 });
singlyLinkedList.insert({ name: 'suey', age: 20 });
singlyLinkedList.insert({ name: 'suey', age: 19 });
singlyLinkedList.insert({ name: 'suey', age: 1 });
