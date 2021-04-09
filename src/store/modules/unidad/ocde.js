/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
import vuex from "vuex";
import vue from "vue";
import api from "@/store/api";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		items: [],
		areas: [],
		subareas: [],
		disciplines: [],
	},
	actions: {
		getAll({ commit, state }, callback) {
			if (state.areas.length <= 0) {
				api()
					.get("oecd_knowledge_areas")
					.then((r) => {
						commit("SetData", { key: "areas", data: r.data });
						api()
							.get("oecd_knowledge_subareas")
							.then((r) => {
								commit("SetData", { key: "subareas", data: r.data });
								api()
									.get("oecd_disciplines")
									.then((r) => {
										commit("SetData", { key: "disciplines", data: r.data });
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
			if (args.key === "subareas") {
				args.data.forEach((element) => {
					var filtered = state.areas.filter((o) => o.id === element.oecd_knowledge_area_id);
					if (filtered.length > 0) element["oecd_knowledge_area_name"] = this._vm.$titleCase(filtered[0].name);
				});
			}
			state[args.key] = args.data;
		},
	},
	getters: {
		areas: (state, getters) => {
			return state.areas;
		},
		subareas: (state, getters) => {
			return state.subareas;
		},
		disciplines: (state, getters) => {
			return state.disciplines;
		},
	},
};

export default store;
