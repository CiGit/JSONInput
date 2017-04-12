const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: ['react-hot-loader/patch', 'eventsource-polyfill', 'webpack-hot-middleware/client', './src/play/index'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    resolve: {
        mainFields: ['module', 'jsnext:main', 'browser', 'main']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css',
                include: [
                    path.join(__dirname, 'css')
                ],
            }
        ]
    },
    devServer: {
        reload: false,
        inline: true
    }
};
