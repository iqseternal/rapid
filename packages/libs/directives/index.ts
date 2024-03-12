
import type { Plugin } from 'vue';

import vResizeWidthPlugin from './vResizeWidth';

export * from './vResizeWidth';

export default <Plugin>{
  install(app, ...options) {
    app.use(vResizeWidthPlugin);
  }
};


