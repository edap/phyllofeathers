/* eslint-env node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PUBLIC = __dirname + "/www";
const webpack = require('webpack');
const TITLE = "Example Title";


const plugins = [
        // create an html page
		new HtmlWebpackPlugin({
			title: TITLE,
			filename: 'index.html',
			template: 'src/index.html'
		}),
		//copy the assets (with no css compilation)
    new CopyWebpackPlugin([
        {from:'src/textures',to:'textures'},
        {from:'src/css',to:'css'},
        {from:'src/sounds', to: 'sounds'}
    ]),
    // clean the output folder
    new CleanWebpackPlugin(['www']),
    new webpack.optimize.UglifyJsPlugin({
			  include: /\.min\.js$/,
			  sourceMap: true,
			  compressor: {
				    warnings: false
			  }
		})
];

module.exports = {
    target: 'web',
    devtool: 'source-map',
    entry: {
        "bundle": "./src/application.js",
        //"bundle.min": "./src/application.js"
    },

    output: {
        filename: "[name].js",
        path: PUBLIC
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /src/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    },
    performance: {
    hints: false
    }
};
