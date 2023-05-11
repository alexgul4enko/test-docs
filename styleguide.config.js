const path = require('path');
const wepbackConfig = require('./webpack.config');
module.exports = {
  components: 'src/**/*.{js,jsx,ts,tsx}',
  ignore: [
    '**/assets/**',
    '**/**stories**',
    '**/data/**',
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    '**/types.ts',
    '**/index.ts',
    '**/*.style.{js,jsx,ts,tsx}'
  ],
  propsParser: require('react-docgen-typescript').withDefaultConfig({
    savePropValueAsString: true
  }).parse,
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  webpackConfig: env => {
    const { devServer, ...config } = wepbackConfig;
    return {
      ...config,
      devServer: {
        client: {
          overlay: false
        }
      }
    };
  },
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    return {
      ...webpackConfig,
      entry: [
        // path.resolve(__dirname, './src/assets/styles/base.scss'),
        // path.resolve(__dirname, './src/assets/styles/antd.less'),
        ...webpackConfig.entry
      ]
    };
  },
  styleguideDir: '.docs',
  configureServer: app => {
    // `app` is the instance of the express server running Styleguidist
    // app.get('/custom-endpoint', (req, res) => {
    //   res.status(200).send({ response: 'Server invoked' })
    // })
  },
  pagePerSection: true,
  serverPort: 3000,
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, './src/docs/components/Wrapper')
  }
};
