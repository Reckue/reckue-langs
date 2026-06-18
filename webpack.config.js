const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        page: "./src/page.ts",
        popup: "./src/popup.tsx"
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
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname),
        filename: "dist/[name]/[name].js"
    }
};

