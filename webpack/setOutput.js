const path = require('path');

function setOutput() {
  return {
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].[contenthash].js',
      chunkFilename: '[id].[contenthash].chunk.js',
      publicPath: '/'
    }
  };
}

module.exports = setOutput;
