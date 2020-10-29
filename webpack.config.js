const { mode } = require("webpack-nano/argv");

const { merge } = require("webpack-merge");

const parts = require("./webpack.parts.js");

const commonConfig = merge([
  { entry: ["./src"] },
  parts.page({ title: "webpack demo" }),
  parts.loadCSS(),
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  { entry: ["webpack-plugin-serve/client"] },
  parts.devServer(),
]);

const getConfig = (mode) => {
  const configs = {
    production: merge(commonConfig, productionConfig),
    development: merge(commonConfig, developmentConfig),
  };

  const config = configs[mode];

  if (!config) throw new Error(`Trying to use an unknown mode ${mode}`);

  return config;
};

module.exports = getConfig(mode);
