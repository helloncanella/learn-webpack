const { mode } = require("webpack-nano/argv");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");

module.exports = {
  entry: ["./src", "webpack-plugin-serve/client"],
  watch: mode === "development",
  mode,
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: "webpack demo",
      },
    }),
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: "./dist",
      liveReload: true,
      waitForBuild: true,
    }),
  ],
};
