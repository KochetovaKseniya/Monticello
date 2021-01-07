const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/scss/styles.scss'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
    writeToDisk: true,
    overlay: true,
    open: true,
    hot: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: false
        }
      }],
    },
    {
      test: /\.css$/i,
      use: [
        'style-loader',
        'css-loader'
      ],
    },
    {
      test: /\.(png|jp(e*)g|svg)$/,  
      use: [{
          loader: 'url-loader',
          options: { 
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]',
              publicPath: '../',
              useRelativePaths: true
          } 
      }]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        {
          loader: 'file-loader',
          options: {
            name: 'css/[name].css',
          }
        },
        {
          loader: 'extract-loader'
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },        
        {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        } 
      ]
    }]
  },
  plugins: [

    new HtmlWebpackPlugin({
      title: 'My Beets App',
      template: './src/index.html',
      favicon: './src/img/favicon.ico'
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
