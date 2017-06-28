/**
 * Created by I326950 on 6/28/2017.
 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base');

module.exports = webpackMerge(commonConfig, {
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: false,
            minimize: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                warnings: false
            }
        })
    ]
});