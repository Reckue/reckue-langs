const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        page: "./src/page.ts",
        popup: "./src/popup.ts"
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
    }
};

