const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

function optimisation(isDevelopment) {
  return {
    plugins: [
      new webpack.ProgressPlugin({
        activeModules: false,
        entries: true,
        modules: true,
        modulesCount: 5000,
        profile: false,
        dependencies: true,
        dependenciesCount: 10000,
        percentBy: null
      })
    ],
    watchOptions: {
      ignored: /node_modules/
    },
    cache: {
      type: 'filesystem',
      allowCollectingMemory: true
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all'
      },
      minimize: !isDevelopment,
      minimizer: [
        !isDevelopment &&
          new TerserPlugin({
            minify: TerserPlugin.swcMinify
          }),
        !isDevelopment && new CssMinimizerPlugin()
      ].filter(Boolean)
    }
  };
}

module.exports = optimisation;
