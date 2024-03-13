

export interface Graphic {
  name: string;
  icon: `l-${string}`;
  id?: number;
  data: {
    text?: string;
    width: number;
    height: number;
    name: string;
    borderRadius?: number;
    background?: string;
    offsetX?: number;
    lineWidth?: number;
    textBaseline?: string;
    textTop?: number;
    textWidth?: number;
    lineTop?: number;
    lineLeft?: number;
    textLeft?: number;
    fillStyle?: string;
    strokeStyle?: string;
    textHeight?: number;
    textAlign?: 'left' | 'right' | 'center';
    list?: unknown[];
    props?: unknown;
    z?: number;
    anchors?: unknown;
    lineName?: string;
    type?: number;
  },
}

export type GraphicGroup = {
  name: string;
  show: boolean;
  list: Graphic[];
}[];


