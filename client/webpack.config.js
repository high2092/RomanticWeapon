const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  entry: {
    app: path.join(__dirname, 'index.tsx'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.mp3$/,
        use: ['file-loader'],
      },
      {
        test: /\.gif$/,
        use: ['file-loader'],
      },
      {
        test: /\.png$/,
        use: ['file-loader'],
      },
    ],
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new dotenv(),
  ],
};
