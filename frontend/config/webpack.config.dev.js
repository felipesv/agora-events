const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].bundle.js",
    assetModuleFilename: 'assets/[hash].[ext]',
    path: path.resolve(__dirname, "../dist"),
  },
  performance: {
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000,
  },
  devServer: {
    hot: true,
    contentBase: path.resolve("./dist"),
    compress: true,
    historyApiFallback: true,
    port: 8564,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      // favicon: './public/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/mystyles.css'
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
//    new Dotenv()
  ],
  resolve: {
    extensions: ['.js' , '.jsx'],
    alias: {
      '@assets': path.resolve(__dirname, '../src/assets/'),
      '@stylesComponents': path.resolve(__dirname, '../src/assets/styles/components'),
      '@stylesViews': path.resolve(__dirname, '../src/assets/styles/views'),
      '@stylesContainers': path.resolve(__dirname, '../src/assets/styles/Containers'),
      '@components': path.resolve(__dirname, '../src/components/'),
      '@views': path.resolve(__dirname, '../src/views/'),
      '@containers': path.resolve(__dirname, '../src/containers/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
