const path = require('path');
function resolveModules(modules) {
  return {
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, '../src')]
    }
  };
}

module.exports = resolveModules;
