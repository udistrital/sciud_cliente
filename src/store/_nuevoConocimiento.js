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
	},
	actions: {
		all({ commit, state }, args) {
			if (state.items.length <= 0) {
				api("local")
					.get("nuevo_conocimiento")
					.then((r) => {
						commit("SetData", r.data);
					});
			}
		},
		deletecar ({commit}, id) {
			api("local")
			.delete("nuevo_conocimiento" + id)
			.then((r) => {              
				commit('DelData', r.id)
			})
		}
	},
	mutations: {
		SetData(state, data) {
			// for (let x = 0; x < data.length; x++) {
			// 	let o = data[x];
			// 	if (o.avance !== null) o.avance = o.avance.toString().replace(".", ",") + "%";
			// }
			state.items = data;
		},
		DelData(state, id){
			var index = state.items.findIndex(item => item.id == id)
			state.items.splice(index, 1)
		}
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
