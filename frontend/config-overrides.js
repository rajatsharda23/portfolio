const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer/"),
    stream: require.resolve("stream-browserify"),
    process: require.resolve("process/browser"),
    zlib: require.resolve("browserify-zlib"),
    vm: require.resolve("vm-browserify"),
  };

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  return config;
};
