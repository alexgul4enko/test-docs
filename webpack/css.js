function css(isDevelopment) {
  return {
    module: {
      rules: [
        {
          test: /^.*\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                // insert css on top to make it posible to override
                insert: function insertAtTop(element) {
                  const parent = document.querySelector('head');
                  const lastInsertedElement = window._lastElementInsertedByStyleLoader;

                  if (!lastInsertedElement) {
                    parent.insertBefore(element, parent.firstChild);
                  } else if (lastInsertedElement.nextSibling) {
                    parent.insertBefore(element, lastInsertedElement.nextSibling);
                  } else {
                    parent.appendChild(element);
                  }

                  window._lastElementInsertedByStyleLoader = element;
                }
              }
            },
            'css-loader'
          ]
        }
      ]
    }
  };
}

module.exports = css;
