const { mode } = require("webpack-nano/argv");
const path = require("path");

const { merge } = require("webpack-merge");

const parts = require("./webpack.parts.js");
const { glob } = require("glob");

const commonConfig = merge([
  {
    mode,
    output: {
      publicPath: "/",
      path: require("path").resolve(process.cwd(), "dist"),
      chunkFilename: "[name].[contenthash:4].js",
      filename: "[name].[contenthash:4].js",
      assetModuleFilename: "[name].[contenthash:4][ext][query]",
    },
    entry: { style: glob.sync("./src/**/*.css"), babaca: ["./src"] },
  },
  parts.page({ title: "webpack demo" }),
  parts.cleanBuild(),
  parts.extractCSS(),
  parts.loadImages({ limit: 1 }),
  parts.loadJavascript(),
  parts.attachRevision(),
  parts.minifyJavascript(),
  parts.setFreeVariable("HELLO", "hello from config"),
]);

const productionConfig = merge([
  parts.generateSourceMaps({ type: "source-map" }),
  {
    recordsPath: path.join(__dirname, "records.json"),
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: {
        name: "runtime",
      },
    },
  },
  {
    performance: {
      hints: "warning", // "error" or false are valid too
      maxEntrypointSize: 50000, // in bytes, default 250k
      maxAssetSize: 100000, // in bytes
    },
  },
]);

const developmentConfig = merge([
  { entry: ["webpack-plugin-serve/client"] },
  parts.devServer(),
]);

const getConfig = (mode = "development") => {
  const configs = {
    production: merge(commonConfig, productionConfig),
    development: merge(commonConfig, developmentConfig),
  };

  const config = configs[mode];

  if (!config) throw new Error(`Trying to use an unknown mode ${mode}`);

  return config;
};

module.exports = getConfig(mode);
