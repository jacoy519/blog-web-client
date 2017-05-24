//webpack.config.js
var webpack = require('webpack');//引入Webpack模块供我们调用，这里只能使用ES5语法，使用ES6语法会报错
var ExtractTextPlugin = require("extract-text-webpack-plugin");




module.exports = {
    devtool: 'eval-source-map',
    entry: ['webpack/hot/dev-server', __dirname + '/app/main.js'],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },

            {
                test: /\.css$/, // Only .css files
                loader: ExtractTextPlugin.extract({
                    fallback:"style-loader", use:"css-loader?modules"
                    })
            }
        ]
    },



    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热模块替换插件
        new ExtractTextPlugin("bundle.css")
    ],

    devServer: {
        contentBase: './build',
        historyApiFallback: true,
        inline: true,
        port: 8080,
    }
};