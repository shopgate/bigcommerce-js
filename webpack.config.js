const path = require('path');
const webpack = require('webpack');

const webpackConfiguration = {
  entry: {
    'src/order-placed': './src/order-placed.js',
    'src/shopgate-analytics': './src/shopgate-analytics.js',
    'src/themes/cornerstone': './src/themes/cornerstone.js',
    'src/themes/fortune': './src/themes/fortune.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(bigcommerce\.js)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              'transform-class-properties',
            ],
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
    sourceMap: true,
  }));
}

module.exports = [
  webpackConfiguration,
];
