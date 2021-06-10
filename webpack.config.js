const path = require("path");

// ==== SERVE DEPENDENCES ====
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var serveStatic = require("serve-static");
const proxy = require("proxy-middleware");
const url = require("url");
const {
  setCompression,
  setHeaders,
  setHost,
  setBody,
} = require("./proxy.middleware.js");

// ==== SERVER CONFIG ====
const pkg = require("./package.json");
const $_HOST = `${pkg.accountName}.vtexcommercestable.com.br`;
const $_PROXY_CONFIG = url.parse(`https://${$_HOST}/`);
$_PROXY_CONFIG.preserveHost = true;
$_PROXY_CONFIG.cookieRewrite = `${pkg.accountName}.vtexlocal.com.br`;

module.exports = {
  mode: "production",
  entry: [
    __dirname + "/src/js/main-store.js",
    __dirname + "/src/scss/style-store.scss",
  ],
  output: {
    path: path.resolve(__dirname, "build/arquivos"),
    filename: "main-store.min.js",
  },
  plugins: [
    new BrowserSyncPlugin({
      host: `${pkg.accountName}.vtexlocal.com.br`,
      port: 443,
      https: true,
      server: "./src",
      watch: true,
      open: "external",
      middleware: [
        setCompression,
        setHeaders,
        setHost,
        setBody,
        serveStatic("./build"),
        proxy($_PROXY_CONFIG),
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "/",
              name: "style-store.min.css",
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
};
