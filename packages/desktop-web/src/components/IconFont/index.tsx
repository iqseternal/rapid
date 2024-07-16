import type { default as iconInstance } from '@ant-design/icons';
import * as icons from '@ant-design/icons';

export type IconInstance = typeof iconInstance;
export type IconProps = Parameters<IconInstance>[0];

export type IconRealKey = Exclude<keyof typeof icons, 'createFromIconfontCN' | 'default' | 'IconProvider' | 'setTwoToneColor' | 'getTwoToneColor'>;
export type IconKey = IconRealKey;

export interface IconFontProps extends IconProps {

  icon: IconRealKey;
}

/**
 * antd icon font
 * @param props
 * @returns
 */
export default function IconFont(props: IconFontProps) {
  const { icon, ...iconProps } = props;

  const Icon = icons[props.icon];


  return <Icon {...iconProps} />
}
