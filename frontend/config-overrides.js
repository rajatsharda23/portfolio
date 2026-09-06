const webpack = require("webpack");

module.exports = function override(config) {
  const processBrowser = require.resolve("process/browser.js");

  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer/"),
    stream: require.resolve("stream-browserify"),
    process: processBrowser,
    vm: require.resolve("vm-browserify"),
    zlib: require.resolve("browserify-zlib"),
  };

  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    "process/browser": processBrowser,
  };

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: processBrowser,
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    /Failed to parse source map/,
  ];

  return config;
};
