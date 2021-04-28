/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
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
		getTypes({ commit, state, dispatch }, args) {
			if (typeof args != "undefined" && args.reload) state.types = [];
			if (state.types.length <= 0 && !state.loadingTypes) {
				state.loadingTypes = true;
				api()
					.get("types")
					.then((r) => {
						console.log("TIPOS RECIBIDOS", r.data);
						if (typeof args == "undefined") args = { data: null };
						args["data"] = r.data;
						commit("setTypes", args);
					});
			}
		},
		typeUpdate({ commit, state, dispatch }, args) {
			if (args.mode == "edit")
				api()
					.put(`types/${args.typeId}`, args.type)
					.then((r) => {
						// dispatch("getTypes", { reload: true });
						return args.cb(r.data);
					});
			else {
				args.type.created_by = args.type.updated_by;
				api()
					.post(`types`, args.type)
					.then((r) => {
						// dispatch("getTypes", { reload: true });
						return args.cb(r.data);
					});
			}
		},
		getSubtypes({ commit, state, dispatch }, args) {
			if (typeof args != "undefined" && args.reload) state.subtypes = [];
			if (state.subtypes.length <= 0 && !state.loadingSubtypes) {
				state.loadingSubtypes = true;
				api()
					.get("subtypes")
					.then((r) => {
						console.log("SUBTIPOS RECIBIDOS", r.data);
						if (typeof args == "undefined") args = { data: null };
						args["data"] = r.data;
						commit("setSubtypes", args);
					});
			}
		},
		subtypeUpdate({ commit, state, dispatch }, args) {
			if (args.mode == "edit")
				api()
					.put(`subtypes/${args.subtypeId}`, args.subtype)
					.then((r) => {
						// dispatch("getSubtypes", { reload: true });
						return this._vm.$isFunction(args.cb) ? args.cb(r.data) : null;
					});
			else {
				args.subtype.created_by = args.subtype.updated_by;
				api()
					.post(`subtypes`, args.subtype)
					.then((r) => {
						// dispatch("getSubtypes", { reload: true });
						return args.cb(r.data);
					});
			}
		},
		subtypeEnable({ commit, state, dispatch }, args) {
			api()
				.put(`types/${args.typeId}/subtypes/${args.subtypeId}/active`, args.subtype)
				.then((r) => {
					return this._vm.$isFunction(args.cb) ? args.cb(r.data) : null;
				});
		},
	},
	mutations: {
		setTypes(state, args) {
			state.loadingTypes = false;
			state.types = this._vm.$objectSort(args.data, "t_name");
			if (this._vm.$isFunction(args.cb)) args.cb(args.data);
		},
		setSubtypes(state, args) {
			state.loadingSubtypes = false;
			state.subtypes = this._vm.$objectSort(args.data, "st_name");
			if (this._vm.$isFunction(args.cb)) args.cb(args.data);
		},
	},
	getters: {
		types: (state, getters) => {
			return state.types;
		},
		subtypes: (state, getters) => {
			return state.subtypes;
		},
		subtypesByType: (state, getters) => (id) => {
			if (typeof id === "string")
				id = window.clasifier.find(
					(o) =>
						o.name
							.toString()
							.toLowerCase()
							.trim() === id.toLowerCase().trim()
				).id;
			return state.subtypes.filter((o) => o.type_id.toString() === id.toString());
		},
		subtypesByParent: (state, getters) => (id) => {
			return state.subtypes.filter((o) => o.parent_id.toString() === id.toString());
		},
	},
};

export default store;
