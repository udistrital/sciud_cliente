/* eslint-disable no-unused-vars */
import vuex from "vuex";
import vue from "vue";
import api from "@/store/api";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		items: [],
	},
	actions: {
		getSnies({ commit, state }, callback) {
			if (state.items.length <= 0) {
				api()
					.get("snies")
					.then((r) => {
						commit("SetData", r.data.data);
						if (this._vm.$isFunction(callback)) callback(r.data.data);
					});
			} else {
				if (this._vm.$isFunction(callback)) callback;
			}
		},
	},
	mutations: {
		SetData(state, data) {
			state.items = data;
		},
	},
	getters: {
		items: (state, getters) => {
			return state.items;
		},
	},
};

export default store;
