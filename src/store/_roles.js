/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
import api from "./api";
import vuex from "vuex";
import vue from "vue";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		items: [],
		loading: true,
	},
	actions: {
		all({ commit, state }, args) {
			if (state.items.length <= 0) {
				api()
					.get("role")
					.then((r) => {
						commit("SetData", r.data);
					});
			}
		},
	},
	mutations: {
		SetData(state, data) {
			state.items = data;
			state.loading = false;
		},
	},
	getters: {
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
