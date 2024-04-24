import { makePenProp, ShowTypeMode } from './penProps.declare';
import { useSelectionsHook, usePenPropsHook, refresh } from '@/meta';

const { selections } = useSelectionsHook();
const { penPropsState, setCurrentPenProps } = usePenPropsHook();

export const x = makePenProp({
  prop: 'x',
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

export const y = makePenProp({
  prop: 'y',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number',
  },
  onChange: value => {
    meta2d.canvas.calcActiveRect();

    setCurrentPenProps({ y: value });
  }
})

export const width = makePenProp({
  prop: 'width',
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

export const height = makePenProp({
  prop: 'height',
  showType: ShowTypeMode.InputNumber,
  attrs: {
    type: 'number',
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


export const ratio = makePenProp({
  prop: 'ratio',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    if (!selections.pen) return;

    selections.pen.ratio = value;

    refresh();
  }
})


export const borderRadius = makePenProp({
  prop: 'borderRadius',
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


export const rotate = makePenProp({
  prop: 'rotate',
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

export const paddingTop = makePenProp({
  prop: 'paddingTop',
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

export const paddingRight = makePenProp({
  prop: 'paddingRight',
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

export const paddingBottom = makePenProp({
  prop: 'paddingBottom',
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

export const paddingLeft = makePenProp({
  prop: 'paddingLeft',
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

export const process = makePenProp({
  prop: 'progress',
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

export const verticalProgress = makePenProp({
  prop: 'verticalProgress',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      verticalProgress: value
    })
  }
})

export const flipX = makePenProp({
  prop: 'flipX',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      flipX: value
    })
  }
})

export const flipY = makePenProp({
  prop: 'flipY',
  showType: ShowTypeMode.Switch,
  onChange: value => {
    setCurrentPenProps({
      flipY: value
    })
  }
})

export const lineDash = makePenProp({
  prop: 'lineDash',
  showType: ShowTypeMode.Select,

  onChange: value => {
    setCurrentPenProps({
      lineDash: value
    })
  },

  options: [
    {
      attrs: {

      },
      content: <>


      </>
    }


  ]
})
