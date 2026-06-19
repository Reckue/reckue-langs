const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        page: "./src/page.ts",
        popup: "./src/popup.tsx",
        reader: "./src/reader.ts"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                type: 'asset/source',
            },
            {
                // pdfjs-dist раздаётся как .mjs с не полностью специфицированными импортами
                test: /\.mjs$/,
                resolve: {fullySpecified: false},
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "src/reader/index.html", to: "dist/reader/index.html"},
                {from: "node_modules/pdfjs-dist/build/pdf.worker.min.mjs", to: "dist/reader/pdf.worker.mjs"},
            ],
        }),
    ],
    output: {
        path: path.resolve(__dirname),
        filename: "dist/[name]/[name].js"
    }
};
