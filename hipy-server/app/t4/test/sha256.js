const CryptoJS = require("crypto-js");

module.exports = function sha256(thing) {
  return CryptoJS.SHA256(thing).toString()
}