const blocks = require('./webpack');
const { merge } = require('webpack-merge');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = merge([
  blocks.setEntry(),
  blocks.resolveExtensions(),
  blocks.resolveModules(),
  blocks.setOutput(),
  blocks.setMode(isDev),
  blocks.runDevServer(isDev),
  blocks.generateSourceMaps(isDev),
  blocks.modulejs(),
  blocks.typescript(isDev),
  blocks.files(),
  blocks.css(isDev),
  blocks.sass(),
  blocks.HTMLTemplate(isDev),
  blocks.cleanDirectory(),
  blocks.minicss(isDev),
  blocks.optimisation(isDev),
  blocks.setEnv(),
  blocks.setTarget(isDev),
  blocks.fastRefresh(isDev),
  blocks.graphql(),
  blocks.aliases(),
  blocks.sentry()
]);
