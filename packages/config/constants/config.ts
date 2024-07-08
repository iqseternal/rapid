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
import * as rootPackageJson from '../../../package.json';

export const CONFIG = {
  API: {
    // URL: 'https://www.oupro.cn:3000/api/v1.0.0/',
    URL: 'http://localhost:3000/api/v1.0.0/',
    TIMEOUT: 5000,
  },
  REPOSITORY: {
    TYPE: rootPackageJson.repository.type,
    URL: rootPackageJson.repository.url
  },
  PROJECT: 'Rapid',
  VIEW: {
    TOOLTIP_ENTER_TIME: 1, // tooltip 进入x s后显示
    WIDGET_TOOLTIP_ENTER_TIME: 1,
  },
  FADE: {
    FADE_IN: {
      TIMER: 50
    },
    FADE_OUT: {
      TIMER: 200
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
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIh/EEwXyKA67uoWZj23NnAuxI
j+g8Kr8WeDVQ9sQJ/gZ9IxyyGPNPRQhy6ecxOY1dzi74qFyADboOOvGakfDWGuFN
rBEWNfFPubsm1J1LD5qXx1/VePI0wdERXM8u0Hn/Ow48b9iVnEBuYtF7FuSRrzcy
kt8mv5biNp18x8QaDwIDAQAB
-----END PUBLIC KEY-----
` as const;

// don't modify it!
export const AES_KEY = `drawingbed` as const;
