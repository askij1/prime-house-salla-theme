const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ThemeWatcher = require('@salla.sa/twilight/watcher.js');
const path = require('path');

const asset = (file = '') => path.resolve('src/assets', file);
const output = (file = '') => path.resolve('public', file);

module.exports = {
  entry: {
    app: [asset('styles/main.scss'), asset('js/app.js')],
    home: asset('js/home.js'),
    product: asset('js/product.js'),
    checkout: asset('js/cart.js'),
    brands: asset('js/brands.js'),
  },
  output: {
    path: output(),
    clean: true,
    filename: '[name].js',
    chunkFilename: '[name].[contenthash].js',
  },
  stats: { modules: false, assetsSort: 'size', assetsSpace: 40 },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [new ThemeWatcher(), new MiniCssExtractPlugin()],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
};
