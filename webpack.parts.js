const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");

const APP_SOURCE = "/";

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

exports.loadJavascript = () => ({
  module: {
    rules: [{ test: /\.js$/, include: APP_SOURCE, use: "babel-loader" }],
  },
});

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

exports.generateSourceMaps = ({ type }) => {
  return { devtool: type };
};

exports.attachRevision = () => {
  return {
    plugins: [
      new webpack.BannerPlugin({ banner: new GitRevisionPlugin().version() }),
    ],
  };
};

exports.minifyJavascript = () => ({
  optimization: {
    minimizer: [new TerserPlugin()],
  },
});

exports.cleanBuild = () => ({
  plugins: [new CleanWebpackPlugin()],
});

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new webpack.DefinePlugin(env)],
  };
};
