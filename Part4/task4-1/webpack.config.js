module.exports = {
    entry: './src/main.js',
    output: {
        path: './src',
        filename: 'build.js',
        publicPath: '/src/'
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}