import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-babel-minify';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript';

const pkg = require('./package.json');

const env = process.env.NODE_ENV;

const external = Object.keys(pkg.dependencies).concat(
    Object.keys(pkg.peerDependencies)
);
export default {
    input: 'src/index.ts',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true,
        }),
        replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
        typescript({
            typescript: require('typescript'),
        }),
        babel({
            exclude: 'node_modules/**',
        }),
        commonjs(),
        env === 'production' && minify(),
        filesize(),
    ],
    external: function ext(module) {
        return external.indexOf(module.split('/')[0]) > -1;
    },
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            name: pkg.name,
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    sourcemap: true,
};
