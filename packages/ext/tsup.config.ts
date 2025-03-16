import { defineConfig } from 'tsup';
import { join } from 'path';

export default defineConfig({
  entry: ['./src/index.ts'],
  plugins: [

  ],
  tsconfig: join(__dirname, './tsconfig.json'),
  dts: true,
  outDir: 'dist', // 输出目录
  format: [
    'esm', 'cjs'
  ], // 不输出 JS 文件
});
