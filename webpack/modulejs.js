function modulejs() {
  return {
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        }
      ]
    }
  };
}

module.exports = modulejs;
