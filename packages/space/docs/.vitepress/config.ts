import { UserConfig, defineConfig } from 'vitepress';
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin';
import { join } from 'path';

import packageJson from '../../package.json';

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    }
  },
  title: packageJson.name,
  description: packageJson.description,
  base: `/${packageJson.name}`,
  outDir: join(__dirname, `./dist/${packageJson.name}`),
  themeConfig: {
    logo: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.bTTn1-D9WG6TCaI-9t9iDQAAAA?w=149&h=150&c=7&r=0&o=5&pid=1.7',
    siteTitle: packageJson.name, // 会显示在页面左上角
    aside: true,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/iqseternal/suey-rokcetry' },
    ],
    footer: {
      message: `Released under the ${packageJson.license} License.`,
      copyright: 'Copyright © 2019-present Evan You'
    },
    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // },
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    langMenuLabel: 'Change language',
    search: { provider: 'local', options: { locales: { } } }
  },
  locales: {

  },
  vue: {

  }
});
