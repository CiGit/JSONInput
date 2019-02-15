import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

import * as pkg from './package.json';

const env = process.env.NODE_ENV;

const external = Object.keys(pkg.peerDependencies).concat(
  Object.keys(pkg.dependencies),
);
export default {
  input: 'src/index.ts',
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    env === 'production' && terser({ mangle: { toplevel: true } }),
    filesize(),
  ],
  external: function ext(module) {
    return external.includes(module);
  },
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
};
