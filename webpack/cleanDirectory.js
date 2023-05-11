const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function cleanDirectory() {
  return {
    plugins: [new CleanWebpackPlugin({ verbose: true })]
  };
}

module.exports = cleanDirectory;
