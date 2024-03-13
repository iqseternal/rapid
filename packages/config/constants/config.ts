/**
 * ==========================================
 * 更偏向于项目的配置类常量
 * 例如:
 *  TOOLTIP——HOVER 需要的时间
 *  RSA--KEY 加密的KEY值
 *  FADE--IN
 *  FADE--OUT 前端 useFade 转场时间
 * 通过抽离这个以达到快速修改项目配置额需求
 * ==========================================
 */

export const CONFIG = {
  PROJECT: 'SPACE',
  VIEW: {
    TOOLTIP_ENTER_TIME: 1, // tooltip 进入x s后显示
    WIDGET_TOOLTIP_ENTER_TIME: 1,
  },
  FADE: {
    FADE_IN: {
      TIMER: 20
    },
    FADE_OUT: {
      TIMER: 30
    }
  },
  DIALOG: {
    INFO: {
      NAME: 'info',
      SVG: ''
    },
    WARN: {
      NAME: 'warn',
      SVG: ''
    },
    ERROR: {
      NAME: 'error',
      SVG: ''
    }
  }
} as const;

// don't modify it!
export const RSA_PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCS56315ZowpncDwXZhXb4j6BHK
Gor8OZe+06s73C4H5b/Iyy/vbAzFFWsfL1y04AnNDkZ9swoFWnmYjon1XGUTvN3Z
BuLWKW9UjDCcTcno4MEhP1qrk3X0iiBeu09aJdiWogjbN4kaBq/KcKRQ5kvXdcTP
hvcDZhJI/YiPgbRW9wIDAQAB
-----END PUBLIC KEY-----
` as const;

// don't modify it!
export const AES_KEY = `drawingbed` as const;
