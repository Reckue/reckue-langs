const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        parser: "./rebuildpage.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    }
};