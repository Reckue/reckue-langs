const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        page: "./src/page.js",
        popup: "./src/popup.js"
    },
    output: {
        path: path.resolve(__dirname),
        filename: "[name]/[name].js"
    }
};