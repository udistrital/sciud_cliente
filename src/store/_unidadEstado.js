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
					.get("group_states")
					.then((r) => {
						commit("SetData", { data: r.data, callback: callback });
					});
			} else {
				if (window.vm.$isFunction(callback)) callback;
			}
		},
	},
	mutations: {
		SetData(state, o) {
			console.log("SetData", o.data);
			o.data.forEach((item) => {
				item.name = window.vm.$titleCase(item.name);
			});
			state.items = window.vm.$objectSort(o.data, "id");
			console.log("state.items", state.items);
			if (window.vm.$isFunction(o.callback)) o.callback(state.items);
		},
	},
	getters: {
		// items: (state, getters) => (sortBy) => {
		items: (state, getters) => {
			console.log("items", state.items);
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
