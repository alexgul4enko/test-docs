const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

function fastRefresh(isDev) {
  if (!isDev) {
    return {};
  }
  return {
    plugins: [
      new ReactRefreshWebpackPlugin({
        exclude: /node_modules/,
        overlay: false,
        include: /\.([jt]sx?|flow)$/i
      }),
      new ErrorOverlayPlugin()
    ].filter(Boolean)
  };
}

module.exports = fastRefresh;
