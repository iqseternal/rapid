import type { EventType, EventBehavior } from './events.declare';
import { EventAction } from '@meta2d/core';

// 事件类型
export const eventsType: EventType[] = [
  {
    name: '鼠标移入',
    event: 'enter'
  },
  {
    name: '鼠标移出',
    event: 'leave'
  },
  {
    name: '选中',
    event: 'active'
  },
  {
    name: '取消选中',
    event: 'inactive'
  },
  {
    name: '单击',
    event: 'click'
  },
  {
    name: '双击',
    event: 'dbclick'
  }
]

// 事件行为
export const eventsBehavior: EventBehavior[] = [
  {
    name: '打开链接',
    behavior: EventAction.Link,
    depend: [
      {
        name: '链接地址',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'URL'
        },
        bindData: ''
      },
      {
        name: '打开方式',
        type: 'select',
        bindProp: 'params',
        option: {
          list: [
            {
              name: '新窗口打开',
              value: '_blank'
            }, {
              name: '覆盖当前页面',
              value: 'self'
            }
          ]
        },
        bindData: ''
      }
    ]
  },
  {
    name: '执行动画',
    behavior: EventAction.StartAnimate,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      },
    ]
  },
  {
    name: '暂停动画',
    behavior: EventAction.PauseAnimate,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      },
    ]
  },
  {
    name: '停止动画',
    behavior: EventAction.StopAnimate,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      },
    ]
  },
  {
    name: '播放视频',
    behavior: EventAction.StartVideo,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      },
    ]
  },
  {
    name: '暂停视频',
    behavior: EventAction.PauseVideo,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      },
    ]
  },
  {
    name: '停止视频',
    behavior: EventAction.StopVideo,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      },
    ]
  }
]
