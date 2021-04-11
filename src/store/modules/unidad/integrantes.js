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
		// Agregado por camorenos@udistrital.edu.co 08-04-2021-02:30
		async participantCreate({ commit, state, dispatch }, dto) {
			console.log("SEND", dto.obj);
			let data = dto.obj;
			return await api()
				.post(dto.url, data)
				.then((r) => {
					return dto.cb(r.data);
				});
		},
		async participantUpdate({ commit, state, dispatch }, dto) {
			console.log("SEND", dto.obj);
			let data = dto.obj;
			let url = dto.url + "/" + dto.idint;
			console.log("url update participants", dto.url + "/" + dto.obj.id);
			return await api()
				.put(url, data)
				.then((r) => {
					return dto.cb(r.data);
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
