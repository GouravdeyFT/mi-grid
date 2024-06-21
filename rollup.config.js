import { isAbsolute } from 'node:path';
import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

const devMode = process.env.NODE_ENV === 'development';
const extensions = ['.ts', '.tsx'];

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './lib/bundle.js',
        format: 'es',
        generatedCode: 'es2015',
        sourcemap: true,
      },
      {
        file: './lib/bundle.cjs',
        format: 'cjs',
        generatedCode: 'es2015',
        sourcemap: true,
      },
    ],
    external: (id) => !id.startsWith('.') && !isAbsolute(id),
    plugins: [
      babel({
        babelHelpers: 'runtime',
        extensions,
        shouldPrintComment: (comment) => /^[@#]__.+__$/.test(comment),
      }),
      nodeResolve({ extensions }),
      terser({
        ecma: 2020,
        mangle: { toplevel: true },
        compress: {
          module: true,
          toplevel: true,
          unsafe_arrows: true,
          drop_console: !devMode,
          drop_debugger: !devMode,
        },
        output: { quote_style: 1 },
      }),
    ],
  },
  {
    input: './constants/models/MiTable/index.ts',
    output: [
      {
        file: 'lib/index.d.ts',
        format: 'es',
        plugins: [],
      },
    ],
    plugins: [dts()],
  },
];
