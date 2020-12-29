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
		items2: [],
	},
	actions: {
		all2({ commit, state }, args) {
			if (state.items2.length <= 0) {
				api()
					.get("categories/?product_type_id=2")
					.then((r) => {
						commit("SetData", r.data);
					});
			}
		},
	},
	mutations: {
		SetData(state, data) {
			// for (let x = 0; x < data.length; x++) {
			// 	let o = data[x];
			// 	if (o.avance !== null) o.avance = o.avance.toString().replace(".", ",") + "%";
			// }
			state.items2 = data;
		},
	},
	getters: {
		items2: (state, getters) => {
			return state.items2;
		},
		item: (state, getters) => (id) => {
			if (state.items2.length > 0) {
				let item = state.items2.find((o) => o.id.toString() === id.toString());
				return item;
			}
		},
	},
};

export default store;
