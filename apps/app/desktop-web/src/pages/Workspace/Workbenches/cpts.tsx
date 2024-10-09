import { useAsyncEffect, useShallowReactive, useUnmount, useMount } from '@rapid/libs-web/hooks';
import { userUpdateInfo } from '@/features';
import { isNull, toPicket } from '@suey/pkg-utils';
import { Card } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FullSize, FullSizeHeight, FullSizeWidth, classnames } from '@rapid/libs-web';

import { Leafer, Rect, UI } from 'leafer-ui';
import { Leaf } from 'leafer';

import { initLeaferApp, destroyLeaferApp, leaferApp } from '@/leafer';


export interface InstructionProps extends BaseProps {

}

/**
 * 指令、当选择工具后, 通过该组件对工具参数进行修正
 */
export function Instruction(props: InstructionProps) {
  const { className } = props;

  return <div
    className={classnames(className)}
  >

  </div>
}

export interface InstrumentProps extends BaseProps {

}

/**
 * 器具、器皿. 这里是存储一些工具或者图形的器具, 为整个工作绘制区域提供创作能力
 */
export function Instrument(props: InstrumentProps) {
  const { className } = props;

  return <div
    className={classnames(className)}
  >

  </div>
}


export interface LeaferUIAttributeProps extends BaseProps {

}

/**
 *
 * leafer ui 元素的属性设置
 *
 * @returns
 */
export function LeaferUIAttribute(props: LeaferUIAttributeProps) {
  const { className } = props;

  return <div
    className={classnames(className)}
  >

  </div>
}
