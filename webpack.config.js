var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebapackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: './webapp/src/index.js',
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: 'bundle.js',
        publicPath: './webapp/dist',
        sourceMapFilename: '[file].map',
        path: path.resolve(__dirname, './webapp/dist')
    },
    plugins :[             
        new CleanWebapackPlugin(['./webpack/dist']),
        new HtmlWebpackPlugin({
            template: './webapp/profile.ejs'
        }),       
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
          })
    ],
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
              ]
          }         
        ],    
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
    optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: 'initial',
              name: 'vendor',
              test: 'vendor',
              enforce: true
            },
          }
        },
        runtimeChunk: true
    },
    devtool: 'source-map'    

}