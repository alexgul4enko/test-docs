function devServer(isDevelopment) {
  if (!isDevelopment) {
    return {};
  }
  return {
    devServer: {
      client: {
        overlay: false
      },
      devMiddleware: {
        publicPath: '/'
      },
      port: process.env.PORT || 3000,
      historyApiFallback: true,
      liveReload: false,
      open: true,
      hot: true,
      host: process.env.DEV_SERVER_HOST || 'localhost',
      https: false,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      allowedHosts: ['all']
    }
  };
}

module.exports = devServer;
