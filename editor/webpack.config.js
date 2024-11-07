const path = require("path");

const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = require("webpack").container;

const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config().parsed || {};

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
    port: 3001,
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
      "process.env": JSON.stringify(env),
    }),
    new ModuleFederationPlugin({
      name: "editor",
      filename: "remoteEntry.js",
      exposes: {
        "./components": "./src/components/index.js",
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: "^2.7.16",
          eager: true,
        },
        axios: {
          singleton: true,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src/"),
      "@api": path.resolve(__dirname, "src/api/"),
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
};
