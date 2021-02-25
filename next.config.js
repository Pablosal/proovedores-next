const withImages = require("next-images");
module.exports = {
  withimage: withImages(),
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};
