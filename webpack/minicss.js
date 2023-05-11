const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function minicss(isDev) {
  if (isDev) {
    return {};
  }
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name][contenthash].css',
        chunkFilename: '[id][contenthash].css',
        ignoreOrder: true
      })
    ]
  };
}

module.exports = minicss;
