import { defineConfig } from 'rspress/config';
import { DIRS } from '../../config/builder';
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
        content: 'https://github.com/iqseternal/rapid',
      },
    ],
    footer: {
      message: '<br>'
    }
  },
  base: '/',
  globalStyles: join(__dirname, './theme/global.css'),

  outDir: DIRS.DIST_DOC_DIR,
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
