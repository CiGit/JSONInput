import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import babili from 'rollup-plugin-babili';
import filesize from 'rollup-plugin-filesize';

const pkg = require('./package.json');

const env = process.env.NODE_ENV;

const external = Object.keys(pkg.dependencies).concat(
    Object.keys(pkg.peerDependencies)
);
export default {
    entry: 'src/index.js',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
        babel({
            exclude: 'node_modules/**'
        }),
        commonjs(),
        env === 'production' && babili(),
        filesize()
    ],
    external: function ext(module) {
        return external.indexOf(module.split('/')[0]) > -1;
    },
    targets: [
        {
            dest: pkg.main,
            format: 'cjs',
            moduleName: pkg.name,
            sourceMap: true
        },
        {
            dest: pkg.module,
            format: 'es',
            sourceMap: true
        }
    ]
};
