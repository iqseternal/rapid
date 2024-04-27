
import type {  } from '@meta2d/core';

export const animateType = [
  {
    name: "跳动",
    key: "bounce",
    frames: [
      {
        duration: 300,
        y: 10
      },
    ]
  },
  {
    name: "旋转",
    key: "rotate",
    frames: [
      {
        duration: 1000,
        rotate: 360
      }
    ]
  },
  {
    name: "提示",
    key: "tip",
    frames: [
      {
        duration: 300,
        scale: 1.3
      }
    ]
  }
]
