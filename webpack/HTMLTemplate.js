const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function HTMLTemplate() {
  const template = path.resolve(__dirname, '../public/index.html');
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template,
        title: 'brokrete',
        templateParameters: {
          REACT_APP_GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
          REACT_APP_SOURCE_VERSION: process.env.REACT_APP_SOURCE_VERSION,
          REACT_APP_HOTJAR_API_KEY: process.env.REACT_APP_HOTJAR_API_KEY
        }
      })
    ]
  };
}

module.exports = HTMLTemplate;
