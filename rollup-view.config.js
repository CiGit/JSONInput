import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const pkg = require('./package.json');

const env = process.env.NODE_ENV;

const external = Object.keys(pkg.dependencies).concat(
  Object.keys(pkg.peerDependencies),
);
export default {
  input: 'src/Comps/Views/index.ts',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
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
    return external.indexOf(module.split('/')[0]) > -1;
  },
  output: [
    {
      file: 'lib/views.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'lib/views.es2015.js',
      format: 'es',
      sourcemap: true,
    },
  ],
};
