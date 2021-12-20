const HtmlWebpack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");

module.exports = {
	mode: "production",

	output: {
		clean: true,
		filename: "main.[fullhash].js",
	},

	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
				options: {
					minimize: false,
					sources: false,
				},
			},
			{
				test: /\.css$/i,
				exclude: /styles.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /styles.css$/i,
				use: [MiniCssExtract.loader, "css-loader"],
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				loader: "file-loader",
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},

	optimization: {
		minimize: true,
		minimizer: [new CssMinimizer(), new Terser()],
	},

	plugins: [
		new HtmlWebpack({
			template: "./src/index.html",
			filename: "[name].html",
			//[name] le digo que tome el mismo nombre que el archivo de base,
			//[fullhash] pone un hash unico que cambia cada vez que buildeo con modificaciones
		}),
		new MiniCssExtract({
			filename: "[name].[fullhash].css",
			ignoreOrder: false,
		}),
		new CopyPlugin({
			patterns: [{ from: "src/assets/", to: "assets/" }],
		}),
	],
};
