// 这是dev分支写的代码
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const { resolve } = require('path');
const r =  url => resolve(__dirname,url);
const extractSass = new ExtractTextPlugin({
    filename: 'index.css'
})
module.exports = {
    entry: './index.js', // 入口起点，可以指定多个入口起点
    output: { // 输出，只可指定一个输出配置
        filename: 'bundle.js', // 输出文件名
        path: r('./dist')
    },
    devtool: false,
    devServer: { // 检测代码变化并自动重新编译并自动刷新浏览器
        contentBase: r('./dist'), // 设置静态资源的根目录
        hot: true, // 告诉 dev-server 我们在用 HMR
        hotOnly: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            // options: {
            //     presets: [
            //         'env'
            //     ]
            // }
        },
            {
                test: /\.sass$/,
                use:extractSass.extract({
                    use:[
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')({
                                        browsers: [
                                            'last 2 versions'
                                        ]
                                    })
                                ]
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                indentedSyntax: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        extractSass
    ]
};