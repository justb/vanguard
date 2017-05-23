const path = require('path');
module.exports = {
    entry: './public/controllers/main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
       
    }
}