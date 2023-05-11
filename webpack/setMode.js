function setMode(isDevelopment) {
  return {
    mode: isDevelopment ? 'development' : 'production'
  };
}

module.exports = setMode;
