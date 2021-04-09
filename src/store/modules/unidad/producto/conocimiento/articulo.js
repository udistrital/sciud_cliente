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
		save({ commit, state, dispatch }, args) {
			console.log("CREATE!");
			api()
				.post(`research_units/${args.unidadId}/papers`, { paper: args.paper })
				.then((r) => {
					args.cb(r.data);
				});
		},
		update({ commit, state, dispatch }, args) {
			console.log("UPDATE!");
			api()
				.put(`research_units/${args.unidadId}/papers/${args.paper.id}`, { paper: args.paper })
				.then((r) => {
					args.cb(r.data);
				});
		},
		active({ commit, state, dispatch }, args) {
			console.log("Activa o desactiva libros", args);
			api()
				.put(args.url, args.paper)
				.then((r) => {
					console.log("Guardado", r.data);
					return this._vm.$isFunction(args.cb) ? args.cb(r.data) : null;
				});
		},
		participants({ commit, state, dispatch }, args) {
			api()
				.get(`papers/${args.id}/${args.type}_participants`)
				.then((r) => {
					console.log("Guardado", r.data);
					return this._vm.$isFunction(args.cb) ? args.cb(r.data) : null;
				});
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
