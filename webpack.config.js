const { mode } = require("webpack-nano/argv");

const { merge } = require("webpack-merge");

const parts = require("./webpack.parts.js");
const { glob } = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const commonConfig = merge([
  {
    mode,
    output: {
      publicPath: "/",
      path: require("path").resolve(process.cwd(), "dist"),
    },
    entry: { style: glob.sync("./src/**/*.css"), babaca: ["./src"] },
    plugins: [new CleanWebpackPlugin()],
  },
  parts.page({ title: "webpack demo" }),
  parts.extractCSS(),
  parts.loadImages({ limit: 1 }),
  parts.loadJavascript(),
  parts.attachRevision(),
]);

const productionConfig = merge([
  parts.generateSourceMaps({ type: "source-map" }),
]);

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
