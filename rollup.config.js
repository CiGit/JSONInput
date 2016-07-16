import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import rollupUglify from 'rollup-plugin-uglify';
import { uglify } from 'uglify-js';

const pkg = require('./package.json');
const external = Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies));

export default {
    entry: 'src/index.js',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true,
            preferBuiltins: false
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers']
        }),
        rollupUglify({}, uglify)
    ],
    external,
    targets: [
        {
            dest: pkg.main,
            format: 'umd',
            moduleName: pkg.name,
            sourceMap: true
        },
        {
            dest: pkg['jsnext:main'],
            format: 'es',
            sourceMap: true
        }
    ]
};
