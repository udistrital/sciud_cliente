/* eslint-disable no-unused-vars */
var webpack = require("webpack");
module.exports = {
	productionSourceMap: process.env.NODE_ENV !== "production",
	// publicPath: process.env.BASE_URL,
	// publicPath: "/",
	publicPath: process.env.NODE_ENV === "production" ? "/udistrital/siciud-v2/" : "/",
	// https://stackoverflow.com/a/60402866
	// https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
	chainWebpack: (config) => {
		// 202103081150: Disable HotReload
		// https://stackoverflow.com/a/54099093
		config.plugins.delete("hmr");
		config.module
			.rule("vue")
			.use("vue-loader")
			.loader("vue-loader")
			.tap((options) => {
				options.hotReload = false;
				return options;
			});
		config.plugin("html").tap((args) => {
			args[0].title = "SICIUD v2.0";
			return args;
		});
	},
	// https://stackoverflow.com/a/53316440
	configureWebpack: (config) => {
		return {
			// 202103120309: https://vuejs.org/v2/cookbook/debugging-in-vscode.html
			devtool: "source-map",
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
