/**
 * Created by I326950 on 6/28/2017.
 */
const webpack = require('webpack');
const path = require('path');
const root = path.resolve(__dirname, '../');

module.exports = {
    entry: {
        'main': path.resolve(root, 'src/index.js'),
        'vendor': ['moment', 'react']
    },
    output: {
        path: path.resolve(root, 'dist'),
        publicPath: "dist",
        filename: "[name].js",
        sourceMapFilename: "[name].map"
    },
    resolve: {
        extensions: [".js", ".json", "jsx", ".css", ".less"]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                loader: "url-loader",
                query: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [

    ]
};