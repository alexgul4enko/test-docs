function sass() {
  return {
    module: {
      rules: [
        {
          test: [/\.less$/],
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        },
        {
          test: [/^.*\.sass$/, /^.*\.scss$/],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                  exportLocalsConvention: 'camelCase'
                }
              }
            },

            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  sourceMap: true,
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        stage: 4,
                        autoprefixer: { grid: true, flexbox: true }
                      }
                    ]
                  ]
                }
              }
            },
            { loader: 'resolve-url-loader' },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sassOptions: {
                  indentWidth: 4
                }
              }
            }
          ]
        }
      ]
    }
  };
}

module.exports = sass;
