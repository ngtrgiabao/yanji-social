const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js", // Dẫn tới file index.js ta đã tạo
  output: {
    path: path.join(__dirname, "/build"), // Thư mục chứa file được build ra
    filename: "bundle.js", // Tên file được build ra
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Sẽ sử dụng babel-loader cho những file .js
        exclude: /node_modules/, // Loại trừ thư mục node_modules
        use: ["babel-loader"],
      },
      {
        test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource", // Use asset/resource to emit the asset to the output directory
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      manifest: "./public/manifest.json",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new Dotenv({
      path: path.join(__dirname, ".env"),
      systemvars: true, //Set to true if you would rather load all system variables as well (useful for CI purposes)
    }),
  ],
  devServer: {
    port: 3000, // Specify the port here
    open: true, // Automatically open the browser
    historyApiFallback: true, // Enable history API fallback so React Router works
  },
};
