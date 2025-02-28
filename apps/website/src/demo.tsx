

import { MenuOutlined } from '@ant-design/icons';
import { memo, useState, type ReactNode, useLayoutEffect, useRef } from 'react';
import { useDebounceHook, useRefresh, useShallowReactive } from '@rapid/libs-web/hooks';
import { Item } from './components';
import { classnames } from '@rapid/libs-web/common';
import { Popover } from 'antd';

const pixelToNumber = (pixel: string) => {
  const x = parseInt(pixel, 10);
  if (Number.isNaN(x)) return 0;
  return x;
}

const calcSize = (el: Element) => {
  const { paddingLeft, paddingRight, marginLeft, marginRight, columnGap, rowGap } = getComputedStyle(el);

  const plx = pixelToNumber(paddingLeft);
  const prx = pixelToNumber(paddingRight);
  const mlx = pixelToNumber(marginLeft);
  const mrx = pixelToNumber(marginRight);
  const cgx = pixelToNumber(columnGap);
  const rgx = pixelToNumber(rowGap);

  return {
    plx,
    prx,
    mlx,
    mrx,
    cgx,
    rgx,
  }
}


const wArrFromElement = (element: Element) => {
  const wArr: number[] = [];



  for (let i = 0;i < element.children.length;i ++) {
    const el = element.children[i];

    const lSize = calcSize(el);

    wArr[i] = el.clientWidth + lSize.mlx + lSize.mrx;
  }

  return wArr;
}


interface ContainerProps<Data> {
  className?: string;

  list: Data[];
  render: (data: Data) => ReactNode;
  hiddenRender: (data: Data) => ReactNode;
  overlayRender: () => ReactNode;
}

export const Container = memo(<Data,>(props: ContainerProps<Data>) => {
  const { className, list, render, hiddenRender } = props;

  const refresh = useRefresh();

  const [normalState] = useState({
    wArr: [] as number[],

  })
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    normalState.wArr = wArrFromElement(container);

    const eSize = calcSize(container);

    console.log(normalState.wArr);

    const resizeObserver = new ResizeObserver(() => {

    });

    resizeObserver.observe(container);


    return () => {

      resizeObserver.disconnect();
    }
  }, [list, containerRef.current]);

  return (
    <div
      className={classnames(
        'flex gap-x-1 border-red-100 border-solid border-s-2 p-2 items-center bg-orange-100 max-w-[200px]',
        className
      )}
      ref={containerRef}
    >
      {list.map(li => render(li))}

      <Popover
        title='这是被隐藏的元素'
        autoAdjustOverflow
        content={list.map(li => hiddenRender(li))}
      >
        <Item>
          <MenuOutlined />
        </Item>

      </Popover>
    </div>
  )
})
