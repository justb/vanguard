const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
module.exports = {
    // entry: './public/controllers/main.js',
    // output: {
    //     path: path.resolve(__dirname, 'public'),
    //     filename: 'index.js',
    // },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader' }) //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
        }]
       
    },
    plugins: [
        new ExtractTextPlugin("style.css") //提取出来的样式放在style.css文件中
    ]
}