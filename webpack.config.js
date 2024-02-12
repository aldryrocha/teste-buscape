const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin')
const webpack = require('webpack');

module.exports = {
    entry: './controllers/listProducts.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: false 
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [ 'style-loader', 'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                        sourceMap: true,
                        sassOptions: { outputStyle: "compressed"}
                        },
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
            }
        ]
    }    
};