function files() {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2|svg$)$/i,
          type: 'asset/resource'
        }
      ]
    }
  };
}

module.exports = files;
