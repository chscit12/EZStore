var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'index.js'
    },
    resolve: {
       modules: [
           path.join(__dirname, "src"),
           "node_modules"
       ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'stage-3']
                }
            }
        ]
    },
    stats: {
        colors: true
    }
};
