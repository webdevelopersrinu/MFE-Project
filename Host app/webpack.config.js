const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = require("webpack").container;

// const LOGIN_PAGE = "https://mfe-login.surge.sh/"
// const HOME_PAGE = "https://mfe-home-page.surge.sh/"
// const PRODUCT_PAGE = "https://150-products-cards.surge.sh/"
// const CART_PAGE = "https://mfe-card-page.surge.sh/"
// const PRODUCT_INFO_PAGE = "https://mfe-product-info.surge.sh/"

const CART_PAGE = "http://localhost:5001/"
const HOME_PAGE = "http://localhost:5002/"
const LOGIN_PAGE = "http://localhost:5003/"
const PRODUCT_PAGE = "http://localhost:5004/"
const PRODUCT_INFO_PAGE = "http://localhost:5005/"

module.exports = {
  // mode: "production",
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, ".dist"),
    filename: "[name].bundle.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, ".dist"),
    },
    open: true,
    port: 5010,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "HostApp",
      filename: "remoteEntry.js",
      remotes: {
        Product: `ProductCard@${PRODUCT_PAGE}remoteEntry.js`,
        Cart: `Cart@${CART_PAGE}remoteEntry.js`,
        ProductInfo: `ProductInfo@${PRODUCT_INFO_PAGE}remoteEntry.js`,
        Login: `Login@${LOGIN_PAGE}remoteEntry.js`,
        Home: `Home@${HOME_PAGE}remoteEntry.js`,
      },
      exposes: {
        "./store": "./src/store.jsx",
      },
      shared: ["react", "react-dom"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpeg|gif|jpg)$/i,
        type: "asset/resource",
      },
    ],
  },
};
