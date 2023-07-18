const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const ExternalTemplateRemotePlugin = require('external-remotes-plugin')

const deps = require("./package.json").dependencies

module.exports = (_, argv) => ({
  mode: "development",
  entry: "./src/index",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      'event-bus': path.resolve(__dirname, '../event-bus/event-bus.js'),
    },
  },
  devServer: {
    //static: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: true,
    compress: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authroization',
    }
  },
  output: {
    publicPath: 'http://localhost:3000/',
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      // {
      //   test: /\.jsx?$/,
      //   loader: "babel-loader",
      //   exclude: /node_modules/,
      //   options: {
      //     presets: ['@babel/preset-react']
      //   },
      // },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
    new ExternalTemplateRemotePlugin(),
    new ModuleFederationPlugin({
      name: "containerApp",
      remotes: {
        vueCounterApp: 'vueCounterApp@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "react-router-dom": {
          singleton: true
        },
        "react-query": {
          singleton: true,
          requiredVersion: deps["react-query"]
        }
      }
    }),
  ],
});
