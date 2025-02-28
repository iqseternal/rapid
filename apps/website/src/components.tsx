import { MenuOutlined } from '@ant-design/icons';
import { memo, useState, type ReactNode, useLayoutEffect, useRef, forwardRef } from 'react';
import { useDebounceHook, useRefresh, useShallowReactive } from '@rapid/libs-web/hooks';

export interface ItemProps {
  children: ReactNode;
}

export const Item = memo<ItemProps>(forwardRef((props, ref) => {
  const { children } = props;

  const [shallowState] = useShallowReactive(() => ({
    moreText: ``
  }))

  return (
    <div
      className='max-h-full bg-red-100 overflow-y-hidden w-max p-1 flex items-center flex-shrink-0 flex-grow-0 select-none cursor-pointer mx-1'
      onClick={() => {
        shallowState.moreText += `O`;
      }}
      ref={ref}
    >
      {children}
      {shallowState.moreText}
    </div>
  )
}))

