const webpack = require('webpack')

// CRA build uses frontend/config-overrides.js.
// Do NOT hardcode API keys here. Use Netlify env / local .env instead.
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    })
  ],
}
