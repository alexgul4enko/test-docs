const dotenvExpand = require('dotenv-expand');
const dotenv = require('dotenv');

const config = dotenv.config({
  path: process.env.ENVFILE
});

const configLocal = dotenv.config({
  path: '.env.development.local'
});

dotenvExpand.expand(configLocal);

module.exports = process.env;
