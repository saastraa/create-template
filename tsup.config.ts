import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['bin/index.ts'],
    sourcemap: true,
    clean: true,
    minify: !options.watch,
    dts: true,
    format: ['cjs', 'esm'],
  };
});
