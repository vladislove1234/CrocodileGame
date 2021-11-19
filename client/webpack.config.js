const path = require(`path`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const CopyWebpackPlugin = require(`copy-webpack-plugin`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  entry: `./src/index.jsx`,
  output: {
    path: path.join(__dirname, `dist`),
    filename: `bundle.js`,
    publicPath: '/',
  },

  devServer: {
    // contentBase: path.join(__dirname, `dist`),
    historyApiFallback: true,
    compress: false,
    // overlay: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    proxy: {
      target: `localhost:5050/`,
      changeOrigin: true,
      ws: true,
      // '/socket.io': {
      //   target: `http://localhost:5000`,
      //   ws: true,
      // },
    },
  },

  watchOptions: {
    ignored: [
      path.resolve(__dirname, `public/img/users`),
      path.resolve(__dirname, `dist/img/users`),
      path.resolve(__dirname, `img/users`),
    ],
  },

  module: {
    rules: [{
      test: /\.(jsx?)$/,
      exclude: /node_modules/,
      use: {
        loader: `babel-loader`,
      },
    }, { // sass|scss
      test: /\.(scss|sass)$/,
      use: [
        MiniCssExtractPlugin.loader,
        { // css-loader
          loader: `css-loader`,
          options: {
            sourceMap: true,
            url: false,
          },
        },

        `postcss-loader`,
        `csscomb-loader`,
        { // sass-loader
          loader: `sass-loader`,
          options: {
            sourceMap: true,
          },
        },
      ],
    }, { // css
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        { // css-loader
          loader: `css-loader`,
          options: {
            sourceMap: true,
            url: false,
          },
        },
        `postcss-loader`,
        `csscomb-loader`,
      ],
    }],
  },

  devtool: `eval-source-map`,
  resolve: {
    extensions: [`.js`, `.jsx`],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/style.bundle.css`,
    }),

    new HtmlWebpackPlugin({
      template: `./public/index.html`,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {from: `./public/img/`, to: `./img/`},
        {from: `./public/fonts/`, to: `./css/fonts/`},
        {from: `./public/favicon.ico`, to: `./favicon.ico`},
      ],
    }),

    new WebpackBuildNotifierPlugin({
      title: 'WORKERS!!!',
      suppressSuccess: true, // don't spam success notifications
      suppressWarning: true,
      suppressCompileStart: true,
      warningSound: false,
      successSound: false,
    }),
  ],
};
