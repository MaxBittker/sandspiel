const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './bootstrap.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bootstrap.js',
  },
  mode: 'development',
  plugins: [new CopyWebpackPlugin(['index.html'])],
  module: {
    rules: [
      {test: /\.(glsl|frag|vert)$/, use: 'raw-loader', exclude: /node_modules/},
      {
        test: /\.(glsl|frag|vert)$/,
        use: 'glslify-loader',
        exclude: /node_modules/
      }
    ]
  }
};
