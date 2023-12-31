const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './backend/src/main.ts',
    output: {
        path: path.resolve('backend/dist'),
        filename: 'server.js',
    },
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '~db': path.resolve('db'),
            '~core': path.resolve('core'),
            '~backend': path.resolve('backend/src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    mode: 'development',
    devtool: 'inline-source-map',
};