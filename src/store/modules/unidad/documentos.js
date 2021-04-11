/* eslint-disable no-unused-vars */
import vuex from "vuex";
import vue from "vue";
import api from "@/store/api";
vue.use(vuex);
const store = {
	namespaced: true,
	state: {
		items: [],
	},
	actions: {
		get({ commit, state }, args) {
			api()
				.get(`research_units/${args.id}/documents/`)
				.then((r) => {
					args.cb(r.data.data);
				});
		},
		add({ commit, state }, args) {
			api()
				.post(`research_units/${args.id}/documents/`, { document: args.document })
				.then((r) => {
					args.cb(r.data);
				});
		},
		edit({ commit, state }, args) {
			api()
				.put(`research_units/${args.id}/documents/`, { document: args.document })
				.then((r) => {
					args.cb(r.data);
				});
		},
		save({ commit, state, dispatch }, args) {
			console.log("CREATE!");
			let url = args.url;
			let objSen = args.obj;
			api()
				.post(url, objSen)
				.then((r) => {
					args.cb(r.data);
				});
		},
		update({ commit, state, dispatch }, args) {
			console.log("UPDATE!");
			let url = args.url;
			let objSen = args.obj;
			console.log("UPDATE!", objSen);
			api()
				.put(url, objSen)
				.then((r) => {
					args.cb(r.data);
				});
		},
		active({ commit, state, dispatch }, args) {
			console.log("Indica si el archivo esta activado", args);
			let url = args.url;
			let objSen = args.obj;
			api()
				.put(url, objSen)
				.then((r) => {
					console.log("Guardado", r.data);
					return this._vm.$isFunction(args.cb) ? args.cb(r.data) : null;
				});
		},
		documents({ commit, state, dispatch }, args) {
			let url = args.url;
			// let objSen=args.obj;
			api()
				.get(url)
				.then((r) => {
					console.log("Guardado", r.data);
					return this._vm.$isFunction(args.cb) ? args.cb(r.data) : null;
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
		item: (state, getters) => (id) => {
			if (state.items.length > 0) {
				let item = state.items.find((o) => o.id.toString() === id.toString());
				return item;
			}
		},
	},
};

export default store;
