const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: './frontend/src/index.tsx',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "react": "preact/compat",
            "react-dom": "preact/compat",
            "~db": path.resolve('db'),
            "~core": path.resolve('core'),
            "~frontend": path.resolve('frontend/src'),
        }
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                use: 'ts-loader', 
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/, 
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/www/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: './frontend/assets', to: 'assets' }
            ]
        }),
        new CompressionPlugin({
            test: /.*.js$/,
        })
    ]
}