// https://codesandbox.io/s/8l0m8qk0q0
// https://www.npmjs.com/package/vuex-rest-api
// 201906111259: https://vuex.vuejs.org/guide/modules.html
// 202104021019: https://vuex.vuejs.org/guide/modules.html#namespacing

// Setup
import vue from "vue";
import vuex from "vuex";
import persisted from "vuex-persistedstate";
vue.use(vuex);

//#region Modules

// Import all of the resource store files.
// https://webpack.js.org/guides/dependency-management/#requirecontext
// https://github.com/codesandbox/codesandbox-client/issues/723#issuecomment-508997007
let _modules = {};
function loadModules() {
	const context = require.context("./modules", true, /\.js$/);
	context.keys().forEach((filename) => {
		let name = filename.split("./")[1].split(".js")[0];
		let sname = name.split("/");
		if (sname[1] == "index") name = sname[0];
		console.log("name", name);
		const module = context(filename).default;
		_modules[name] = module;
	});
}
loadModules();

//#endregion

const store = new vuex.Store({
	modules: _modules,
	plugins: [
		// 202104020856: Persist vuex state between page reloads
		// https://github.com/robinvdvleuten/vuex-persistedstate
		// https://stackoverflow.com/a/58841356
		persisted({
			storage: window.sessionStorage,
		}),
	],
});

export default store;
