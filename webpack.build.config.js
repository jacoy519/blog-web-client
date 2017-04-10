//webpack.config.js
var webpack = require('webpack');//引入Webpack模块供我们调用，这里只能使用ES5语法，使用ES6语法会报错
var ExtractTextPlugin = require("extract-text-webpack-plugin");




module.exports = {
    devtool: false,
    entry: {
        bundle : __dirname + '/app/main.js',
        vendor: [
            'react',
            'react-dom',
            'react-router',
        ]
    },
    output: {
        path: __dirname + '/output',
        publicPath: '/',
        filename: './[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
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
        new webpack.DefinePlugin({ // <-- 减少 React 大小的关键
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),//合并块
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        })

    ],

    devServer: {
        contentBase: './build',
        historyApiFallback: true,
        inline: true,
        port: 8080,
    }
};