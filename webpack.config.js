const path = require('path');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    resolve: {
        extensions: ['.js','.jsx'],
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                },

            },
            {
                test: /\.(sa|sc|c)ss$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.png|svg|jpg|gif$/,
                type: "asset/resource",
            }, 
        ]
    },
    devServer: {
        static: {
            publicPath: '/',
            directory: path.resolve(__dirname)
        },
        proxy:{
            "/api":{
              target: "http://localhost:3000"
            }
          },
    },
};