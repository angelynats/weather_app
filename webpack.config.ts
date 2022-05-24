import path, {resolve} from "path";
import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";
import dotenv from "dotenv";

const globalCSS = resolve(__dirname, "./", "src/styles/globals");

const webpackConfig = (env): Configuration => ({
    entry: "./src/index.tsx",
    ...(env.production || !env.development ? {} : {devtool: "eval-source-map"}),
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss"],
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "build.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                },
                exclude: /dist/
            },
            {
                test: /\.s?(a|c)ss$/,
                exclude: [globalCSS],
                use: [
                    {loader: "style-loader"},
                    {loader: "css-modules-typescript-loader"},
                    {loader: "css-loader", options: {modules: true}},
                    {loader: "sass-loader", options: {sourceMap: true}}
                ]
            },
            {
                test: /\.s?(a|c)ss$/,
                include: [globalCSS],
                use: [
                    "style-loader",
                    {loader: "css-loader", options: {import: true}},
                    "sass-loader"
                ]
            },
            {
                test: /.js$/,
                loader: "source-map-loader",
                enforce: "pre"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": env.production || !env.development,
            "process.env.NAME": JSON.stringify(require("./package.json").name),
            "process.env.VERSION": JSON.stringify(require("./package.json").version),
            "process.env": JSON.stringify(dotenv.config().parsed)
        }),
        new ForkTsCheckerWebpackPlugin(),
        new ESLintPlugin({files: "./src/**/*.{ts,tsx,js,jsx}"})
    ]
});

export default webpackConfig;
