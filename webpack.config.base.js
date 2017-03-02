const webpack = require('webpack');
const path = require('path');

module.exports = {
  output: {
    library: 'BrandibbleRedux',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
        include: /src/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },
  externals: {
    redux: 'redux',
  },
  plugins: [
    new webpack.EnvironmentPlugin(['BRANDIBBLE_API_KEY']),
  ],
};
