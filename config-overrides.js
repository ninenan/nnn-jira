const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    "@components": path.resolve(__dirname, "src/components"),
    "@helpers": path.resolve(__dirname, "src/helpers"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@constants": path.resolve(__dirname, "src/constants"),
    "@context": path.resolve(__dirname, "src/context"),
  })
);
