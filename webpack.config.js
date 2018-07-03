var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebapackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        profile: './webapp/main/index.js',
        login: './webapp/login/index.js',
        vendor: ['react', 'react-dom', 'babel-polyfill','redux']
    },
    output: {
        filename: '[name]/[name].bundle.js',
        publicPath: '/webapp/dist',
        sourceMapFilename: '[file].map',
        path:  `${__dirname}/webapp/dist`
    },
    plugins :[             
        new CleanWebapackPlugin(['./webpack/dist']),
        new HtmlWebpackPlugin({
            chunks: ['vendor','profile'],
            inject: true,
            template: './webapp/profile.ejs',
            filename: `${__dirname}/webapp/dist/profile.html`
        }),   
        new HtmlWebpackPlugin({
          chunks: ['vendor','login'],
          inject: true,
          template: './webapp/index.ejs',
          filename: `${__dirname}/webapp/dist/index.html`
        }),     
        new MiniCssExtractPlugin({        
            filename: "assets/[name].css",
            chunkFilename: "assets/[name].css"
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
          },{
            test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,            
            use: [{
                loader: 'file-loader?name=/assets/[name].[ext]'
            }]
          },
          { 
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
            loader: "url-loader?limit=10000&mimetype=application/font-woff&name=/assets/[name].[ext]" 
          },       
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
        runtimeChunk: false
    },
    devtool: 'source-map'    

}