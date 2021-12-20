const HtmlWebpack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",

	output: {
		clean: true,
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
		],
	},

	optimization: {},

	plugins: [
		new HtmlWebpack({
			template: "./src/index.html",
			filename: "index.html",
			//[name] le digo que tome el mismo nombre que el archivo de base,
			//[fullhash] pone un hash unico que cambia cada vez que buildeo con modificaciones
		}),
		new MiniCssExtract({
			filename: "[name].css",
			ignoreOrder: false,
		}),
		new CopyPlugin({
			patterns: [{ from: "src/assets/", to: "assets/" }],
		}),
	],
};
