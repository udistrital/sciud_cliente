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
	},
	actions: {
		all({ commit, state }, callback) {
			if (state.items.length <= 0) {
				api()
					.get("research_focus")
					.then((r) => {
						r.data.forEach((element) => {
							element.name = this._vm.$titleCase(this._vm.$replaceAll(element.name, "DEMO- ", ""));
						});
						this._vm.$objectSort(r.data, "name");
						commit("SetData", r.data);
						if (this._vm.$isFunction(callback)) callback;
					});
			} else {
				if (this._vm.$isFunction(callback)) callback;
			}
		},
	},
	mutations: {
		SetData(state, data) {
			// for (let x = 0; x < data.length; x++) {
			// 	let o = data[x];
			// 	if (o.avance !== null) o.avance = o.avance.toString().replace(".", ",") + "%";
			// }
			state.items = data;
		},
	},
	getters: {
		// items: (state, getters) => (sortBy) => {
		items: (state, getters) => {
			return state.items;
		},
		item: (state, getters) => (id) => {
			if (state.items.length > 0) {
				let item = state.items.find((o) => o.id.toString() === id.toString());
				return item;
			}
		},
	},
};

export default store;
