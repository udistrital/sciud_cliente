/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
import api from "./api";
import vuex from "vuex";
import vue from "vue";
vue.use(vuex);

// 202009091146: How to use Vue plugin in Store
// https://stackoverflow.com/a/52998442
import global from "../assets/js/global";
vue.use(global);

// Store
const store = {
	namespaced: true,
	state: {
		items: [],
		broad: [],
		specific: [],
		detailed: [],
	},
	actions: {
		all({ commit, state }, callback) {
			if (state.broad.length <= 0) {
				api()
					.get("cine_broad_areas")
					.then((r) => {
						this._vm.$objectSort(r.data, "name");
						commit("SetData", { key: "broad", data: r.data });
						api()
							.get("cine_specific_areas")
							.then((r) => {
								this._vm.$objectSort(r.data, "name");
								commit("SetData", { key: "specific", data: r.data });
								api()
									.get("cine_detailed_areas")
									.then((r) => {
										this._vm.$objectSort(r.data, "name");
										commit("SetData", { key: "detailed", data: r.data });
										if (this._vm.$isFunction(callback)) callback(r.data);
									});
							});
					});
			} else {
				if (this._vm.$isFunction(callback)) callback;
			}
		},
	},
	mutations: {
		SetData(state, args) {
			args.data.forEach((element) => {
				element.name = this._vm.$titleCase(this._vm.$replaceAll(element.name, "DEMO- ", ""));
			});
			if (args.key === "specific") {
				args.data.forEach((element) => {
					var filtered = state.broad.filter((o) => o.id === element.cine_broad_area_id);
					if (filtered.length > 0) element["cine_broad_area_name"] = this._vm.$titleCase(filtered[0].name);
				});
			}
			state[args.key] = args.data;
		},
	},
	getters: {
		broad: (state, getters) => {
			return state.broad;
		},
		specific: (state, getters) => {
			return state.specific;
		},
		detailed: (state, getters) => {
			return state.detailed;
		},
	},
};

export default store;
