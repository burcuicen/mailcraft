const path = require("path");
const webpack = require("webpack");

const { VueLoaderPlugin } = require("vue-loader");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/main.js",
  mode: "development",

  output: {
    path: path.resolve(__dirname, "dist"),
    environment: {
      asyncFunction: true,
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "img/[name].[hash:7].[ext]",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_URL": JSON.stringify("/"),
    }),
    new ModuleFederationPlugin({
      name: "main",
      filename: "remoteEntry.js",
      remotes: {
        editor: "editor@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: "^2.7.16",
          eager: true,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
};
