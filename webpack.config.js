const { mode } = require("webpack-nano/argv");

const { merge } = require("webpack-merge");
const ASSET_PATH = process.env.ASSET_PATH || "/";

const parts = require("./webpack.parts.js");
const { glob } = require("glob");

const commonConfig = merge([
  {
    mode,
    output: { publicPath: ASSET_PATH },
    entry: { style: glob.sync("./src/**/*.css"), babaca: ["./src"] },
  },
  parts.page({ title: "webpack demo" }),
  parts.extractCSS(),
  parts.loadImages({ limit: 1 }),
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
