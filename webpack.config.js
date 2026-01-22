const path = require("path");
const dist = path.resolve(__dirname, "dist");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  const plugins = [
    new CleanWebpackPlugin(),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "crate"),
      extraArgs: "--target bundler",
    }),
    new CopyWebpackPlugin({
      patterns: [
        "js/styles.css",
        "manifest.json",
        "privacy.html",
        { from: "assets/*" },
      ],
    }),
    new HtmlWebpackPlugin({ template: "index.html" }),
  ];

  // Only add service worker in production to avoid watch mode warnings
  if (isProduction) {
    plugins.push(
      new GenerateSW({
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            urlPattern: /\.html$/,
            handler: "StaleWhileRevalidate",
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 300,
              },
            },
          },
        ],
      })
    );
  }

  return {
    entry: "./js/bootstrap.js",
    output: {
      path: dist,
      filename: "[name].[contenthash].js",
      publicPath: "/",
    },
    devServer: {
      static: dist,
      allowedHosts: "all",
      historyApiFallback: true,
    },
    experiments: {
      asyncWebAssembly: true,
    },
    mode: isProduction ? "production" : "development",
    devtool: "source-map",
    plugins,
  module: {
    rules: [
      {
        test: /\.(glsl|frag|vert)$/,
        use: "raw-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: "glslify-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-syntax-dynamic-import"],
          },
        },
      },
    ],
  },
  };
};
