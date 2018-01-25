const path = require('path');
const webpack = require('webpack');

const webpackConfiguration = {
  entry: {
    'order-placed-v1': './src/order-placed-v1.js',
    'cornerstone-v1': './src/themes/cornerstone-v1.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(analytics-v1\.js)/,
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
    path: path.resolve(__dirname, 'build/bundle'),
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

module.exports = webpackConfiguration;
