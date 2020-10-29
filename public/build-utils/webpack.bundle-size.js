const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;

module.exports.config = ({}) => {
	return {
		plugins: [new BundleAnalyzerPlugin()],
	};
};
