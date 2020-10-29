const { WebpackPluginServe } = require("webpack-plugin-serve");

const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");

exports.devServer = () => {
  return {
    watch: true,
    plugins: [
      new WebpackPluginServe({
        port: process.env.PORT || 8080,
        static: "./dis",
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
