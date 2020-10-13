const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entry = "./src/main.ts";

module.exports.entry = entry;
module.exports.config = () => ({
	mode: "development",
	entry,
	output: {
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.(css|less|sass)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: "css-loader", options: { importLoaders: 1 } },
					"postcss-loader",
					"sass-loader",
				],
			},
		],
	},
	plugins: [
		new htmlWebpackPlugin({
			meta: { viewport: "width=device-width, initial-scale=1" },
		}),
		new MiniCssExtractPlugin(),
	],
});
