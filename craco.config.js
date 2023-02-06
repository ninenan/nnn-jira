const path = require("node:path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  // ...
  webpack: {
    alias: {
      "@": resolve("src"),
      "@components": resolve("src/components"),
      "@helpers": resolve("src/helpers"),
      "@hooks": resolve("src/hooks"),
      "@constants": resolve("src/constants"),
      "@context": resolve("src/context"),
      "@assets": resolve("src/assets"),
    },
  },
};
