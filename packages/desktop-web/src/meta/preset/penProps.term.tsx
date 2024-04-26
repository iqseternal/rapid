import { useSelectionsHook, usePenPropsHook, refresh } from '@/meta';
import { makePenProp, ShowTypeMode } from './penProps.declare';
import { usePickColorsAttrsHook } from '@hooks/usePickColors';

const { selections } = useSelectionsHook();
const { penPropsState, setCurrentPenProps } = usePenPropsHook();

const { pickColorsAttrs } = usePickColorsAttrsHook();

/**
 * 横向坐标
 */
export const x = makePenProp({
  prop: 'x',
  label: '横向坐标',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    min: 0,
    max: 100,
    type: 'number',
    placeholder: 'px'
  },
  onChange: value => {
    meta2d.canvas.calcActiveRect();

    setCurrentPenProps({ x: value });
  }
});

/**
 * 纵向坐标
 */
export const y = makePenProp({
  prop: 'y',
  label: '纵向坐标',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number',
  },
  onChange: value => {
    meta2d.canvas.calcActiveRect();

    setCurrentPenProps({ y: value });
  }
})

/**
 * 宽度
 */
export const width = makePenProp({
  prop: 'width',
  label: '宽度',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    min: 0,
    type: 'number',
    placeholder: 'px'
  },
  onChange: value => {
    meta2d.canvas.calcActiveRect();

    if (!selections.pen) return;
    if (selections.pen?.ratio) {
      if (!selections.pen.width || !selections.pen.height) return;

      setCurrentPenProps({
        width: value,
        height: value / selections.pen.width * selections.pen.height
      })
    }
    else {

      setCurrentPenProps({
        width: value
      })
    }

  }
})

/**
 * 高度
 */
export const height = makePenProp({
  prop: 'height',
  label: '高度',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    min: 0,
    type: 'number',
    placeholder: 'px'
  },
  onChange: value => {
    if (!selections.pen) return;
    if (selections.pen?.ratio) {
      if (!selections.pen.width || !selections.pen.height) return;

      setCurrentPenProps({
        height: value,
        width: value / selections.pen.height * selections.pen.width
      })
    }
    else {

      setCurrentPenProps({
        height: value
      })
    }
  }
})

/**
 * 锁定纵横比
 */
export const ratio = makePenProp({
  prop: 'ratio',
  label: '锁定纵横比',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    if (!selections.pen) return;

    selections.pen.ratio = value;

    refresh();
  }
})

/**
 * 圆角像素
 */
export const borderRadius = makePenProp({
  prop: 'borderRadius',
  label: '圆角像素',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number',
    min: 0,
    placeholder: '<1为比例'
  },
  onChange: value => {

    setCurrentPenProps({
      borderRadius: value
    })
  }
})

/**
 * 旋转
 */
export const rotate = makePenProp({
  prop: 'rotate',
  label: '旋转',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    placeholder: '角度'
  },
  onChange: value => {
    setCurrentPenProps({
      rotate: value
    })
  }
})

/**
 * 圆角
 */
export const paddingTop = makePenProp({
  prop: 'paddingTop',
  label: '圆角',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    placeholder: 'px'
  },
  onChange: value => {
    setCurrentPenProps({
      paddingTop: value
    })
  }
})

/**
 * 内 右边距
 */
export const paddingRight = makePenProp({
  prop: 'paddingRight',
  label: '内 右边距',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    placeholder: 'px'
  },
  onChange: value => {
    setCurrentPenProps({
      paddingRight: value
    })
  }
})

/**
 * 内 下边距
 */
export const paddingBottom = makePenProp({
  prop: 'paddingBottom',
  label: '内 下边距',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    placeholder: 'px'
  },
  onChange: value => {
    setCurrentPenProps({
      paddingBottom: value
    })
  }
})

/**
 * 内 左边距
 */
export const paddingLeft = makePenProp({
  prop: 'paddingLeft',
  label: '内 左边距',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    placeholder: 'px'
  },
  onChange: value => {
    setCurrentPenProps({
      paddingLeft: value
    })
  }
})

/**
 * 进度
 */
export const process = makePenProp({
  prop: 'progress',
  label: '进度',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    placeholder: 'px',
    min: 0,
    max: 1,
    step: 0.1
  },
  onChange: value => {
    setCurrentPenProps({
      progress: value
    })
  }
})

/**
 * 垂直进度
 */
export const verticalProgress = makePenProp({
  prop: 'verticalProgress',
  label: '垂直进度',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      verticalProgress: value
    })
  }
})

/**
 * x 翻转
 */
export const flipX = makePenProp({
  prop: 'flipX',
  label: 'x 翻转',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      flipX: value
    })
  }
})

/**
 * y 翻转
 */
export const flipY = makePenProp({
  prop: 'flipY',
  label: 'y 翻转',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      flipY: value
    })
  }
})

/**
 * 线形
 */
export const lineDash = makePenProp({
  prop: 'lineDash',
  label: '线形',
  showType: ShowTypeMode.Select,
  attrs: {

  },
  onChange: value => {
    setCurrentPenProps({
      lineDash: value
    })
  },

  options: [
    {
      attrs: {
        value: 0
      },
      content: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="height: 20px;width: 80px;">
        <g fill="none" stroke="black" stroke-width="1">
          <path d="M0 9 l85 0" />
        </g>
      </svg>
    },
    {
      attrs: {
        value: 1
      },
      content: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="height: 20px;width: 80px;">
        <g fill="none" stroke="black" stroke-width="1">
          <path stroke-dasharray="5 5" d="M0 9 l85 0" />
        </g>
      </svg>
    },
    {
      attrs: {
        value: 2
      },
      content: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="height: 20px;width: 80px;">
        <g fill="none" stroke="black" stroke-width="1">
          <path stroke-dasharray="10 10 2 10" d="M0 9 l85 0" />
        </g>
      </svg>
    }
  ]
})



/**
 * 连接样式
 */
export const lineJoin = makePenProp({
  prop: 'lineJoin',
  label: '连接样式',
  showType: ShowTypeMode.Select,
  onChange: value => {
    setCurrentPenProps({ lineJoin: value })
  },
  options: [
    {
      attrs: {
        value: 'mitter'
      },
      content: <>默认</>
    },
    {
      attrs: {
        value: 'round'
      },
      content: <>圆型</>
    },
    {
      attrs: {
        value: 'bevel'
      },
      content: <>斜角</>
    }
  ]
})


/**
 * 末端样式
 */
export const lineCap = makePenProp({
  prop: 'lineCap',
  label: '末端样式',
  showType: ShowTypeMode.Select,
  onChange: value => {
    setCurrentPenProps({ lineCap: value })
  },
  options: [
    {
      attrs: {
        value: 'butt'
      },
      content: <>默认</>
    },
    {
      attrs: {
        value: 'square'
      },
      content: <>方形</>
    },
    {
      attrs: {
        value: 'round'
      },
      content: <>圆形</>
    }
  ]
})


/**
 * 颜色
 */
export const color = makePenProp({
  prop: 'color',
  label: '颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps(({ color: value }))
  }
})


/**
 * 浮动颜色
 */
export const hoverColor = makePenProp({
  prop: 'hoverColor',
  label: '浮动颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps(({ hoverColor: value }))
  }
})

/**
 * 选中颜色
 */
export const activeColor = makePenProp({
  prop: 'activeColor',
  label: '选中颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps(({ activeColor: value }))
  }
})


/**
 * 线条宽度
 */
export const lineWidth = makePenProp({
  prop: 'lineWidth',
  label: '线条宽度',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number'
  },
  onChange: value => {
    setCurrentPenProps({ lineWidth: value })
  }
})

/**
 * 背景颜色
 */
export const background = makePenProp({
  prop: 'background',
  label: '背景颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps(({ background: value }))
  }
})

/**
 * 浮动背景颜色
 */
export const hoverBackground = makePenProp({
  prop: 'hoverBackground',
  label: '浮动背景颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps(({ hoverBackground: value }))
  }
})

/**
 * 选中背景颜色
 */
export const activeBackground = makePenProp({
  prop: 'activeBackground',
  label: '选中背景颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps(({ activeBackground: value }))
  }
})


/**
 * 透明度
 */
export const globalAlpha = makePenProp({
  prop: 'globalAlpha',
  label: '透明度',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number',
    min: 0,
    max: 1,
    step: 0.1
  },
  onChange: value => {
    setCurrentPenProps({
      globalAlpha: value
    })
  }
})

/**
 * 锚点颜色
 */
export const anchorColor = makePenProp({
  prop: 'anchorColor',
  label: '锚点颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps(({ anchorColor: value }))
  }
})

/**
 * 阴影颜色
 */
export const shadowColor = makePenProp({
  prop: 'shadowColor',
  label: '阴影颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps(({ shadowColor: value }))
  }
})

/**
 * 阴影模糊
 */
export const shadowBlur = makePenProp({
  prop: 'shadowBlur',
  label: '阴影模糊',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number'
  },
  onChange: value => {
    setCurrentPenProps({
      shadowBlur: value
    })
  }
})


/**
 * 阴影x偏移
 */
export const shadowOffsetX = makePenProp({
  prop: 'shadowOffsetX',
  label: '阴影x偏移',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number'
  },
  onChange: value => {
    setCurrentPenProps({
      shadowOffsetX: value
    })
  }
})



/**
 * 阴影y偏移
 */
export const shadowOffsetY = makePenProp({
  prop:'shadowOffsetY',
  label: '阴影y偏移',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number'
  },
  onChange: value => {
    setCurrentPenProps({
      shadowOffsetY: value
    })
  }
})

/**
 * 文字阴影
 */
export const textHasShadow = makePenProp({
  prop: 'textHasShadow',
  label: '文字阴影',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      textHasShadow: value
    })
  }
})

/**
 * 字体名
 */
export const fontFamily = makePenProp({
  prop: 'fontFamily',
  label: '字体名',
  showType: ShowTypeMode.Select,
  onChange: value => {
    setCurrentPenProps({
      fontFamily: value
    })
  },
  options: [
    {
      attrs: {
        value: '宋体'
      },
      content: <>宋体</>
    },
    {
      attrs: {
        value: '黑体'
      },
      content: <>黑体</>
    }
  ]
});

/**
 * 字体大小
 */
export const fontSize = makePenProp({
  prop: 'fontSize',
  label: '字体大小',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number'
  },
  onChange: value => {
    setCurrentPenProps({
      fontSize: value
    })
  }
})


/**
 * 字体颜色
 */
export const textColor = makePenProp({
  prop: 'textColor',
  label: '字体颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps(({ textColor: value }))
  }
})

/**
 * 浮动字体颜色
 */
export const hoverTextColor = makePenProp({
  prop: 'hoverTextColor',
  label: '浮动字体颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps(({ hoverTextColor: value }))
  }
})

/**
 * 选中文字颜色
 */
export const activeTextColor = makePenProp({
  prop: 'activeTextColor',
  label: '选中文字颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps({ activeTextColor: value })
  }
})


/**
 * 文字背景颜色
 */
export const textBackground = makePenProp({
  prop: 'textBackground',
  label: '文字背景颜色',
  showType: ShowTypeMode.Color,
  attrs: pickColorsAttrs,
  onChange: value => {
    setCurrentPenProps(({ textBackground: value }))
  }
})

/**
 * 水平对齐
 */
export const textAlign = makePenProp({
  prop: 'textAlign',
  label: '水平对齐',
  showType: ShowTypeMode.Select,
  onChange: value => {
    setCurrentPenProps({ textAlign: value })
  },
  options: [
    {
      attrs: {
        value: 'left'
      },
      content: <>左对齐</>
    },
    {
      attrs: {
        value: 'center'
      },
      content: <>居中</>
    },
    {
      attrs: {
        value: 'right'
      },
      content: <>右对齐</>
    }
  ]
})

/**
 * 垂直对齐
 */
export const textBaseline = makePenProp({
  prop: 'textBaseline',
  label: '垂直对齐',
  showType: ShowTypeMode.Select,
  onChange: value => {
    setCurrentPenProps({ textBaseline: value })
  },
  options: [
    {
      attrs: {
        value: 'top'
      },
      content: <>顶部</>
    },
    {
      attrs: {
        value:'center'
      },
      content: <>居中</>
    },
    {
      attrs: {
        value: 'bottom'
      },
      content: <>底部</>
    }
  ]
})

/**
 * 行高
 */
export const lineHeight = makePenProp({
  prop: 'lineHeight',
  label: '行高',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number'
  },
  onChange: value => {
    setCurrentPenProps({
      lineHeight: value
    })
  }
})

/**
 * 换行
 */
export const whiteSpace = makePenProp({
  prop: 'whiteSpace',
  label: '换行',
  showType: ShowTypeMode.Select,
  onChange: value => {
    setCurrentPenProps({
      whiteSpace: value
    })
  },
  options: [
    {
      attrs: {
        value: 'nowrap'
      },
      content: <>默认</>
    },
    {
      attrs: {
        value: 'nowrap'
      },
      content: <>不换行</>
    },
    {
      attrs: {
        value: 'pre-line'
      },
      content: <>回车换行</>
    },
    {
      attrs: {
        value: 'break-all'
      },
      content: <>永远换行</>
    }
  ]

})

/**
 * 文字宽度
 */
export const textWidth = makePenProp({
  prop: 'textWidth',
  label: '文字宽度',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number'
  },
  onChange: value => {
    setCurrentPenProps({
      textWidth: value
    })
  }
})

/**
 * 文字高度
 */
export const textHeight = makePenProp({
  prop: 'textHeight',
  label: '文字高度',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number'
  },
  onChange: value => {
    setCurrentPenProps({
      textHeight: value
    })
  }
})

/**
 * 文字省略
 */
export const ellipsis = makePenProp({
  prop: 'ellipsis',
  label: '文字省略',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      ellipsis: value
    })
  }
})

/**
 * 隐藏文字
 */
export const hiddenText = makePenProp({
  prop: 'hiddenText',
  label: '隐藏文字',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      hiddenText: value
    })
  }
})

/**
 * 文字内容
 */
export const text = makePenProp({
  prop: 'text',
  label: '文字内容',
  showType: ShowTypeMode.InputString,
  onChange: value => {
    setCurrentPenProps({
      text: value
    })
  }
})

/**
 * 禁止输入文字
 */
export const disableInput = makePenProp({
  prop: 'disableInput',
  label: '禁止输入',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      disableInput: value
    })
  }
})

/**
 * 禁止旋转
 */
export const disableRotate = makePenProp({
  prop: 'disableRotate',
  label: '禁止旋转',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      disableRotate: value
    })
  }
})

/**
 * 禁止缩放
 */
export const disableSize = makePenProp({
  prop: 'disableSize',
  label: '禁止缩放',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      disableSize: value
    })
  }
})

/**
 * 禁止锚点
 */
export const disableAnchor = makePenProp({
  prop: 'disableAnchor',
  label: '禁止锚点',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      disableAnchor: value
    })
  }
})
