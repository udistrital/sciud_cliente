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
		async getAll({ commit, state }, callback) {
			await api()
			.get("entities")
			.then((r) => {
				commit("SetData", r.data);
                console.warn("data estore=>",r.data);
				if (this._vm.$isFunction(callback)) callback(r.data);
			});
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
