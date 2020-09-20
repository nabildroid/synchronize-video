const { entry } = require("./webpack.development");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports.config = () => ({
	mode: "production",
	entry,
	module: {
		rules: [
			{
				test: /\.(css|less|sass)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
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
	devtool: "eval",
});
