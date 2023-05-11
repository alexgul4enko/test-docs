const SentryWebpackPlugin = require('@sentry/webpack-plugin');

function sentry() {
  if (!process.env.REACT_APP_SENTRY_AUTH_TOKEN) {
    return {};
  }
  return {
    plugins: [
      new SentryWebpackPlugin({
        include: '../build',
        ignore: ['node_modules'],
        project: 'brokrete-dashboard',
        org: 'brokrete',
        ext: ['map', 'js'],
        authToken: process.env.REACT_APP_SENTRY_AUTH_TOKEN,
        release: process.env.SOURCE_VERSION
      })
    ]
  };
}

module.exports = sentry;
