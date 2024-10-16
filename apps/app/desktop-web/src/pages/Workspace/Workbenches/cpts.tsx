import { useAsyncEffect, useShallowReactive, useUnmount, useMount } from '@rapid/libs-web/hooks';
import { userUpdateInfo } from '@/features';
import { isNull, toPicket } from '@suey/pkg-utils';
import { Card } from 'antd';
import { useEffect, useRef, useState, memo } from 'react';
import { FullSize, FullSizeHeight, FullSizeWidth, classnames } from '@rapid/libs-web';
import { Leafer, Rect, UI } from 'leafer-ui';
import { Leaf } from 'leafer';
import { initLeaferApp, destroyLeaferApp, leaferApp } from '@/leafer';
import { windowForwardDataTakeIn } from '@/actions';

import Widget from '@components/Widget';

export interface InstrumentProps extends BaseProps {

}

/**
 * 器具、器皿. 这里是存储一些工具或者图形的器具, 为整个工作绘制区域提供创作能力
 */
export const Instrument = memo((props: InstrumentProps) => {
  const { className } = props;

  return <div
    className={classnames(className)}
  >
    <Widget
      icon='ReconciliationFilled'
      tipText='矩形'
      draggable
      onClick={async () => {


      }}
      onDragStart={async () => {

        await windowForwardDataTakeIn('graphic', UI.one({ tag: 'Rect', width: 200, height: 200, fill: '#a352', draggable: true, editable: true }).toJSON());
      }}
    >

    </Widget>

    <Widget
      icon='ReconciliationFilled'
      draggable
      tipText='圆形'
      onDragStart={async () => {

        await windowForwardDataTakeIn('graphic', UI.one({ tag: 'Rect', width: 200, height: 200, fill: '#a352', draggable: true, cornerRadius: [100, 100, 100, 100], editable: true }).toJSON());
      }}
    >

    </Widget>
  </div>
})




export interface InstructionProps extends BaseProps {

}

/**
 * 指令、当选择工具后, 通过该组件对工具参数进行修正
 */
export const Instruction = memo((props: InstructionProps) => {
  const { className } = props;

  return <div
    draggable={false}
    className={classnames(className)}
  >

  </div>
})


export interface LeaferUIAttributeProps extends BaseProps {

}

/**
 *
 * leafer ui 元素的属性设置
 *
 * @returns
 */
export const LeaferUIAttribute = memo((props: LeaferUIAttributeProps) => {
  const { className } = props;

  return <div
    className={classnames(className)}
  >

  </div>
})
