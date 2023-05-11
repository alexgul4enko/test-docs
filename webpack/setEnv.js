require('./utils/init-env');
const Dotenv = require('dotenv-webpack');
const path = require('path');

function setEnv() {
  return {
    plugins: [
      new Dotenv({
        path: path.join(__dirname, '../', process.env.ENVFILE || '.env.development.local'),
        safe: path.join(__dirname, '../.env.development.local'),
        allowEmptyValues: true,
        systemvars: true,
        defaults: false
      })
    ]
  };
}

module.exports = setEnv;
