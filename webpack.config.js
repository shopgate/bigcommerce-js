const path = require('path');
const webpack = require('webpack');

const webpackConfiguration = {
  entry: {
    'src/themes/cornerstone': './src/themes/cornerstone.js',
    'src/themes/fortune': './src/themes/fortune.js',
    'src/themes/minimal': './src/themes/minimal.js',
    'src/trampoline': './src/trampoline.js',
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: '/node_modules/',
  },
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
