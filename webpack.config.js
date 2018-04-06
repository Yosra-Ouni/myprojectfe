const path = require('path');

module.exports = {
    context: path.join(__dirname, "src"),
    entry:"./main.js",
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },


    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-2'],
                    plugins: ["transform-decorators-legacy", "transform-object-rest-spread"]

                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },

    resolve: {
        modules: [path.join(__dirname, 'node_modules')]
    },
    devtool: 'cheap-module-eval-source-map',

};