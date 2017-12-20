const webpack = require("webpack");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2

let libraryName = "clappr-playback-rate-plugin";

let plugins = [],
  outputFile;

if (env === "build") {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + ".min.js";
} else {
  outputFile = libraryName + ".js";
}

const config = {
  entry: __dirname + "/src/main.js",
  devtool: "source-map",
  output: {
    path: __dirname + "/lib",
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  externals: {
    "clappr": "clappr",
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        use: [
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              includePaths: [
                path.resolve(__dirname, "./node_modules/compass-mixins/lib"),
                path.resolve(__dirname, "./node_modules/clappr/src/base/scss")
              ]
            }
          }
        ]
      },
      {
        test: /\.html/,
        loader: "html-loader",
        options: {
          minimize: false
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".js"]
  },
  plugins: plugins
};

module.exports = config;
