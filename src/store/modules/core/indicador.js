/* eslint-disable no-unused-vars */
import api from "@/store/api";
import vuex from "vuex";
import vue from "vue";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		loadingTypes: false,
		loadingSubypes: false,
		types: [],
		subtypes: [],
		subtype_names: [],
	},
	actions: {
		set({ commit, state, dispatch }, args) {
			if (args.mode == "edit")
				api()
					.put(`indicators/${args.obj.id}`, { indicator: args.obj })
					.then((r) => {
						return args.cb(r.data);
					});
			else {
				api()
					.post(`indicators`, { indicator: args.obj })
					.then((r) => {
						return args.cb(r.data);
					});
			}
		},
	},
	mutations: {
		setTypes(state, args) {
			state.loadingTypes = false;
			state.types = this._vm.$objectSort(args.data, "t_name");
			if (this._vm.$isFunction(args.cb)) args.cb(args.data);
		},
	},
	getters: {
		item: (state, getters) => {
			return state.types;
		},
	},
};

export default store;
