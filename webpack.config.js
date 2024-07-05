const webpack = require('webpack');

module.exports = {
  // ... other webpack configurations ...
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'REACT_APP_GROQ_API_KEY': JSON.stringify('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')
      }
    })
  ]
};