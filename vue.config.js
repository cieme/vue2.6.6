const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin(),
      // new MonacoWebpackPlugin({
      //   languages: ["javascript"], //configure your languages here
      // }), // Place it here
    ],
  },
});
