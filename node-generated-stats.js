const webpack = require("webpack");
const config = require("./webpack.config").getConfig("production");

webpack(config, (err, stats) => {
  if (err) {
    return console.error(err);
  }

  if (stats.hasErrors()) {
    return console.error(stats.toString("errors-only"));
  }

  console.log(JSON.stringify(stats.toJson(), null, 2));
});
