const path = require("path");

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    
    return {
        mode: isProduction ? "production" : "development",
        entry: {
            page: "./src/page.js",
            popup: "./src/popup.js"
        },
        output: {
            path: path.resolve(__dirname),
            filename: "[name]/[name].js"
        },
        devtool: isProduction ? false : 'source-map',
        optimization: {
            minimize: isProduction
        }
    };
};

