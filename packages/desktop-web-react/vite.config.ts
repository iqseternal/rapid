import type { UserConfig } from 'vite';
import { mergeConfig, defineConfig } from 'vite';
import { defineVars } from '../config/structure';
import { PLATFORMS, ENV, CONFIG_ENV_COMMAND } from '../../target.config';
import { DEV_DESKTOP_WEB_DIR, DIST_DESKTOP_DIR, DIST_WEB_DIR } from '../config/dirs';

import rendererConfig, { inputHtmlPosition } from './structure';

import * as fs from 'fs';
import * as path from 'path';

const devDir = DEV_DESKTOP_WEB_DIR;
const devPageRootDir = path.join(DEV_DESKTOP_WEB_DIR, '/src/pages/index');

const distDir = DIST_WEB_DIR;
const distSrcPageDir = path.join(distDir, './src');

export default defineConfig((configEnv) => {
  const vars = defineVars(configEnv);

  vars.CURRENT_PLATFORM = PLATFORMS.WEB;

  /** 当前是否在构建 */
  const IS_BUILD = configEnv.command === CONFIG_ENV_COMMAND.BUILD;


  return mergeConfig<UserConfig, UserConfig>(rendererConfig(configEnv), {
    define: vars,
    server: {
      port: 8000
    },
    root: IS_BUILD ? void 0 : devPageRootDir,
    publicDir: IS_BUILD ? void 0 :  path.join(devDir, 'public'),

    build: {
      emptyOutDir: true,
      rollupOptions: {
        input: inputHtmlPosition,
        output: {
          dir: DIST_WEB_DIR
        }
      },
      chunkSizeWarningLimit: 2000,
      assetsDir: 'static',
      minify: 'terser',
      manifest: false,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      sourcemap: false
    },
    plugins: [
      {
        name: 'move-html-to-root',
        closeBundle() {
          // 遍历 src/pages 目录，将 HTML 文件移动到 dist 目录的根目录
          function moveHtmlFiles(dir: string) {
            if (!fs.statSync(dir).isDirectory()) return;

            /** 获得文件夹中的所有列表 */
            const files = fs.readdirSync(dir);

            files.forEach(file => {
              const filePath = path.join(dir, file);

              const fileStat = fs.statSync(filePath);

              if (fileStat.isDirectory()) moveHtmlFiles(filePath);
              else if (fileStat.isFile() && path.extname(file) === '.html') fs.renameSync(filePath, path.join(distDir, file));
            });
          }

          moveHtmlFiles(distSrcPageDir);

          // 删除空的 src/pages 目录
          fs.rmSync(path.join(DIST_WEB_DIR, 'src'), { recursive: true });
        }
      }
    ]
  })
});
