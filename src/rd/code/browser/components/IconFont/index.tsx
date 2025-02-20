import { memo } from 'react';
import { printError } from '@suey/printer';

import type { default as iconInstance } from '@ant-design/icons';
import * as icons from '@ant-design/icons';

export type IconInstance = typeof iconInstance;
export type IconProps = Parameters<IconInstance>[0];

export type IconRealKey = Exclude<keyof typeof icons, 'createFromIconfontCN' | 'default' | 'IconProvider' | 'setTwoToneColor' | 'getTwoToneColor'>;
export type IconKey = IconRealKey | `icon-${string}`;

export interface IconFontProps extends Partial<IconProps> {

  icon: IconKey;
}

/**
 * antd icon font
 * @param props
 * @returns
 */
export const IconFont = memo((props: IconFontProps) => {
  const { icon, ...iconProps } = props;

  if (!icon) {
    printError(`IconFont 组件 icon 参数传递错误`);
    return <></>;
  }

  const Icon = icons[props.icon];
  return <Icon {...iconProps} />
});

export default IconFont;
