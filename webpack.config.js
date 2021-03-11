// Webpack 4 configuration
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');

var name = 'clappr-playback-rate-plugin'
var outputFile, plugins = [], optimization = {}

if (process.env.npm_lifecycle_event === 'dist') {
  outputFile = name + '.min.js'
  optimization.minimizer = [
    new TerserPlugin({
      cache: true, // TODO: set to false if Webpack upgraded to 5.x ?
    }),
  ]
} else {
  outputFile = name + '.js'
  optimization.minimize = false
}

module.exports = {
  entry: path.resolve(__dirname, 'src/main.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: outputFile,
    library: 'PlaybackRatePlugin',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  optimization: optimization,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        include: [
          path.resolve(__dirname, 'src')
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: false
          }
        },
      },
    ],
  },
  plugins: plugins,
  externals: {
   '@clappr/player': {
    amd: '@clappr/player',
    commonjs: '@clappr/player',
    commonjs2: '@clappr/player',
    root: 'Clappr'
   }
  },
  devServer: {
    contentBase: [
      path.resolve(__dirname, "public"),
    ],
    // publicPath: '/js/',
    disableHostCheck: true, // https://github.com/webpack/webpack-dev-server/issues/882
    compress: true,
    host: "0.0.0.0",
    port: 8080
  }
}
