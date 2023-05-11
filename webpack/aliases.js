const path = require('path');
function aliases() {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src'),
        '@architect-ui': path.resolve(__dirname, '../src', 'components', 'architectui'),
        '@pages': path.resolve(__dirname, '../src', 'view', 'pages'),
        '@components': path.resolve(__dirname, '../src', 'view', 'components'),
        '@layout': path.resolve(__dirname, '../src', 'view', 'layout'),
        '@shared-core': path.resolve(__dirname, '../src', 'shared', 'core')
      }
    }
  };
}

module.exports = aliases;
