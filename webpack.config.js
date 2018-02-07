const path = require('path');
const webpack = require('webpack');

const webpackConfiguration = {
  entry: {
    'src/order-placed': './src/order-placed.js',
    'src/checkout-success': './src/checkout-success.js',
    'src/themes/cornerstone': './src/themes/cornerstone.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(analytics\.js)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: '[name].bundle.js',
  },
  plugins: [],
};

if (process.env.NODE_ENV === 'production') {
  webpackConfiguration.output.filename = '[name].bundle.min.js';
  webpackConfiguration.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
  }));
}

module.exports = [
  webpackConfiguration,
];
