/* eslint-disable no-unused-vars */
var webpack = require("webpack");
module.exports = {
	publicPath: process.env.BASE_URL,
	// publicPath: process.env.NODE_ENV === "production" ? "/udistrital/siciud-v2/" : "/",
	// publicPath: process.env.NODE_ENV === "production" ? "/siciud-v2/" : "/",
	// https://stackoverflow.com/a/60402866
	// https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
	chainWebpack: (config) => {
		config.plugin("html").tap((args) => {
			args[0].title = "SICIUD v2.0";
			return args;
		});
	},
	//stackoverflow.com/a/53316440
	configureWebpack: (config) => {
		return {
			plugins: [
				new webpack.DefinePlugin({
					APPLICATION_VERSION: JSON.stringify(require("./package.json").version),
				}),
				new webpack.DefinePlugin({
					"process.env": {
						PACKAGE_JSON: `"${escape(JSON.stringify(require("./package.json")))}"`,
					},
				}),
			],
		};
	},
};
