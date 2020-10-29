const { WebpackPluginServe } = require("webpack-plugin-serve");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");

exports.devServer = () => {
  return {
    watch: true,
    plugins: [
      new WebpackPluginServe({
        port: process.env.PORT || 8080,
        static: "./dist",
        liveReload: true,
        waitForBuild: true,
      }),
    ],
  };
};

exports.page = ({ title }) => {
  return {
    plugins: [
      new MiniHtmlWebpackPlugin({
        context: {
          title,
        },
      }),
    ],
  };
};

exports.loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
