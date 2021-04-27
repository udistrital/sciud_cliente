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
			if (args.rute === null) args.rute = "research_units";
			if (typeof args.rute == "undefined") args.rute = "research_units";
			console.log("CREATE!");
			api()
				.post(`${args.rute}/${args.unidadId}/${args.stringEP}`, args.objectSend)
				.then((r) => {
					args.cb(r.data);
				});
		},
		update({ commit, state, dispatch }, args) {
			if (args.rute === null) args.rute = "research_units";
			if (typeof args.rute == "undefined") args.rute = "research_units";
			console.log("UPDATE!");
			api()
				.put(`${args.rute}/${args.unidadId}/${args.stringEP}/${args.mod}`, args.objectSend)
				.then((r) => {
					args.cb(r.data);
				});
		},
		active({ commit, state, dispatch }, args) {
			console.log("Activa o desactiva libros", args);
			//console.log("args", args, null, "\t") );
			console.log("args.paper", args.data);
			api()
				.put(args.url, args.data)
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
