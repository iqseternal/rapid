import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./packages/libs-web/src/index.ts'],
  format: ['esm', 'cjs'],
  target: 'esnext',
  dts: true,
  clean: true,
  shims: true,
});
