function generateSourceMaps(isDevelopment) {
  return {
    devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map'
  };
}

module.exports = generateSourceMaps;
