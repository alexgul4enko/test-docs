const path = require('path');

function setEntry() {
  return {
    entry: {
      app: path.resolve(__dirname, '../src/index.tsx'),
      // styles: path.resolve(__dirname, '../src/assets/styles/base.scss')
    }
  };
}

module.exports = setEntry;
