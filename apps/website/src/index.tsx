import { StrictMode, memo, useCallback } from 'react';

import { Container } from './demo';
import ReactDOM from 'react-dom/client';
import { useShallowReactive } from '@rapid/libs-web/hooks';
import { Item } from './components';

import './index.css';
import { Button } from 'antd';

interface Data {
  content: string;
}

let index = 0;

export const App = memo(() => {
  const [state] = useShallowReactive(() => ({
    list: [
      {
        content: `asdasda`
      },
      {
        content: `desdasda`
      },
      {
        content: `asdasda`
      },
      {
        content: `desdasda`
      }
    ] as Data[],
  }))

  const append = useCallback(() => {
    state.list = [...state.list, {
      content: `新数据-${Date.now()}`
    }];
  }, []);

  const render = useCallback((item: Data) => {

    return (
      <Item
        key={index ++}

      >
        {item.content}
      </Item>
    )
  }, []);

  const hiddenRender = useCallback((item: Data) => {

    return (
      <div
        key={index ++}
      >
        这就被隐藏了？
      </div>
    )
  }, []);

  return (
    <div
      className='w-full h-full'
    >
      <Container
        className='w-full'
        list={state.list}
        render={render}
        hiddenRender={hiddenRender}
      />

      <div
        className='w-full flex justify-center'
      >
        <Button
          onClick={append}
        >
          添加
        </Button>
      </div>
    </div>
  )
})

// ===========================================================================================
const rootContainer = document.getElementById('root');

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

