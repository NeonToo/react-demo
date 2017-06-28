/**
 * Created by I326950 on 6/28/2017.
 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');
const rootPath = path.resolve(__dirname, '../');

module.exports = webpackMerge(commonConfig, {
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(rootPath, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
        hotOnly: true,
        proxy: {
            "/": "http://localhost:9001"
        }
    },
    watchOptions: {
        aggregateTimeout: 10,
        ignored: /node_modules/
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
});