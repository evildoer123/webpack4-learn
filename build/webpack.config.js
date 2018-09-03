const path = require('path')
const config = {
    target: "web",
    mode: "development",
    entry: path.join(__dirname,'../index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        paht: path.join(__dirname,'../dist'),
        publicPath: "/"
    },
    devServer: {
     host: '0.0.0.0',
     port: 8080,
     hot: true,
     overlay: {
        errors: true,
    },
    }
}

module.exports = config