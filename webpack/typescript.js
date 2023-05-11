const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function typescript(isDevelopment) {
  return {
    plugins: [new ForkTsCheckerWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheCompression: false,
                cacheDirectory: true,
                presets: [
                  ['@babel/preset-react', { runtime: 'automatic' }],
                  '@babel/preset-typescript',
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'usage',
                      corejs: {
                        version: 3,
                        proposals: true
                      }
                    }
                  ]
                ],
                plugins: [
                  'const-enum',
                  'babel-plugin-replace-ts-export-assignment',
                  ['@babel/plugin-proposal-decorators', { legacy: true }],
                  '@babel/plugin-syntax-dynamic-import',
                  ['@babel/plugin-proposal-class-properties', { loose: false }],
                  '@babel/plugin-proposal-json-strings',
                  '@babel/plugin-proposal-export-namespace-from',
                  isDevelopment && 'react-refresh/babel',
                  ['babel-plugin-styled-components', {}]
                ].filter(Boolean)
              }
            }
          ]
        }
      ]
    }
  };
}

module.exports = typescript;
