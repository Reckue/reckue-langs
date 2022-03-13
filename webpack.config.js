const path = require("path");

module.exports = {
    mode: "development",
    entry: "./rebuildpage.js",
    output: {
        path: path.resolve(__dirname, "parser"),
        filename: "parser.js"
    }
};