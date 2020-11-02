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
        compress: true,
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

exports.loadSCSS = () => ({
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.loadImages = ({ limit }) => ({
  module: {
    rules: [
      {
        test: /\.svg/,
        type: "asset",
      },
      {
        test: /\.(png|jpg)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: limit,
          },
        },
      },
    ],
  },
});

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: (info) => {
            return [
              { loader: MiniCssExtractPlugin.loader, options },
              "css-loader",
            ].concat(loaders);
          },

          // If you distribute your code as a package and want to
          // use _Tree Shaking_, then you should mark CSS extraction
          // to emit side effects. For most use cases, you don't
          // have to worry about setting flag.
          sideEffects: true,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
  };
};
