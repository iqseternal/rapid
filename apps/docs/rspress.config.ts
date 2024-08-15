import { defineConfig } from 'rspress/config';
import { DIST_DOC_DIR } from '@rapid/config/dirs';

import { join } from 'path';

export default defineConfig({
  // 文档根目录
  root: 'docs',
  title: 'rapid-doc',
  description: 'rapid程序描述文档',
  icon: './docs/public/icon.ico',
  logo: '/icon.png',
  logoText: 'Rapid',



  search: {
    versioned: true,
  },
  multiVersion: {
    default: 'v1',
    versions: ['v1']
  },

  themeConfig: {
    outlineTitle: '此页上',
    prevPageText: '上一页',
    nextPageText: '下一页',
    lastUpdated: true,
    lastUpdatedText: '最后更新于',
    searchPlaceholderText: '全局查询',
    searchNoResultsText: 'No results',
    searchSuggestedQueryText: '请尝试重新查询',
    darkMode: true,
    hideNavbar: 'never',
    enableContentAnimation: true,
    search: true,
    enableScrollToTop: false,
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/sanyuan0704/island.js',
      },
      {
        icon: 'wechat',
        mode: 'text',
        content: '微信号 foo',
      },
      {
        icon: 'qq',
        mode: 'img',
        content: '/qrcode.png',
      },
      {
        icon: 'github',
        mode: 'dom',
        content:
          '<img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/rjhwzy/ljhwZthlaukjlkulzlp/rspress/rspress-navbar-logo-0904.png" alt="logo" id="logo" class="mr-4 rspress-logo dark:hidden">',
      },
    ],
    footer: {
      message: '<br>'
    }
  },
  base: '/',
  globalStyles: join(__dirname, './theme/global.css'),

  outDir: DIST_DOC_DIR,
  builderConfig: {
    server: {
      port: 8900
    },

    output: {
      cleanDistPath: true
    }
  },
  markdown: {
    showLineNumbers: true,
    defaultWrapCode: true
  }
});
