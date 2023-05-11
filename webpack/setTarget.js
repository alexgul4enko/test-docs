function setTarget(isDevelopment) {
  return {
    target: isDevelopment ? 'web' : 'browserslist'
  };
}

module.exports = setTarget;
