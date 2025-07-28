const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        page: "./src/api-page.ts",
        popup: "./src/api-popup.ts"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname),
        filename: "dist/[name]/[name].js"
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "dist/popup/popup.html",
                    to: "dist/popup/popup.html"
                }
            ]
        })
    ]
};