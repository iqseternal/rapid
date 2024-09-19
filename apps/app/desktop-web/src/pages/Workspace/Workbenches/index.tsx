import { useAsyncEffect, useShallowReactive, useUnmount } from '@rapid/libs-web/hooks';
import { userUpdateInfo } from '@/features';
import { isNull, toPicket } from '@suey/pkg-utils';
import { Card } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FullSize, FullSizeHeight, FullSizeWidth } from '@rapid/libs-web';

import { Leafer, Rect, UI } from 'leafer-ui';
import { Leaf } from 'leafer';

import IMessage from '@components/IMessage';
import styles from './index.module.scss';

function LeaferView() {
  const [state] = useState({ leafer: void 0 as Leafer | undefined });
  const [selectedShape, setSelectedShape] = useState<Rect | null>(null);
  const viewContainerRef = useRef<HTMLDivElement>(null);

  const [shapeAttributes] = useShallowReactive({
    color: '#32cd79',
    width: 100,
    height: 100
  });

  useEffect(() => {
    if (!viewContainerRef.current) return;
    state.leafer = new Leafer({ view: viewContainerRef.current });

    return () => {
      state.leafer?.destroy();
    };
  }, [viewContainerRef.current]);


  // 添加图形函数
  function addShape(type: 'rect' | 'circle') {
    if (!state.leafer) return;

    let shape;
    if (type === 'rect') {
      shape = new Rect({ x: 50, y: 50, width: shapeAttributes.width, height: shapeAttributes.height, fill: shapeAttributes.color, cornerRadius: [50] });
    } else if (type === 'circle') {
      shape = new Rect({ x: 50, y: 50, cornerRadius: shapeAttributes.width / 2, fill: shapeAttributes.color });
    }

    shape.on('click', () => {
      setSelectedShape(shape);  // 选中图形后设置当前选中的图形
    });
    shape.on('drag', (e) => {
      shape.x += e.moveX;
      shape.y += e.moveY;
    });

    state.leafer.add(shape);
  }

  useEffect(() => {
    addShape('rect');
  }, []);

  return (
    <div>
      <FullSizeWidth>
        {/* 左侧形状选择 */}
        <button onClick={() => addShape('rect')}>矩形</button>
        <button onClick={() => addShape('circle')}>圆形</button>
      </FullSizeWidth>

      <FullSize
        ref={viewContainerRef}
        style={{
          width: 1200,
          height: 800
        }}
      >

      </FullSize>

      <FullSizeWidth>
        {/* 右侧属性编辑 */}
        {selectedShape && (
          <div>
            <label>颜色：</label>
            <input
              type="color"
              value={shapeAttributes.color}
              onChange={(e) => {
                shapeAttributes.color = e.target.value;
                selectedShape.fill = e.target.value;  // 同时更新图形的颜色
              }}
            />
            <label>宽度：</label>
            <input
              type="number"
              value={shapeAttributes.width}
              onChange={(e) => {
                const width = parseInt(e.target.value, 10);
                shapeAttributes.width = width;
                selectedShape.width = width;
              }}
            />
            {/* 添加更多属性如高度等 */}
          </div>
        )}
      </FullSizeWidth>
    </div>
  );
}

export default function Workbenches() {
  return <FullSize
    className={styles.workbenches}
  >
    <LeaferView />
  </FullSize>
}
