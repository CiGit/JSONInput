import babel from 'rollup-plugin-babel';
// import commonjs from 'rollup-plugin-commonjs';
// import nodeResolve from 'rollup-plugin-node-resolve';
import babili from 'rollup-plugin-babili';
import filesize from 'rollup-plugin-filesize';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies));
export default {
    entry: 'src/index.js',
    plugins: [
        babel({
            // nodeResolve({
            //     module: true,
            //     jsnext: true,
            //     main: true,
            //     skip: external,
            //     browser: true,
            //     preferBuiltins: false
            // }),
            // commonjs({
            //     include: 'node_modules/**'
            // }),
            exclude: 'node_modules/**',
            plugins: ['external-helpers']
        }),
        babili(),
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
