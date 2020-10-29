const { mode, quico } = require("webpack-nano/argv");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");

console.log({ mode, quico });

module.exports = {
  mode,
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: "webpack demo",
      },
    }),
  ],
};
