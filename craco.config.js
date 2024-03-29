const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
      "@styles": path.resolve(__dirname, "src/scss/"),
      "@svgs": path.resolve(__dirname, "src/assets/svgs/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
};
