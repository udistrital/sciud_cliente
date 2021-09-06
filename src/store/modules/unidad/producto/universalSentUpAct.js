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

		getAll({ commit, state }, args) {
			//console.warn("store subtipos",args.id_subtipos);
			api()
				.get(args.url+'?filter=[["active","=","true"]]')
				.then((r) => {
					args.cb(r.data.data);
					commit("SetData", r.data.data);
				});
		},


		get({ commit, state }, args) {
			api()
				.get(args.url)
				.then((r) => {
					args.cb(r.data);
				});
		},

		save({ commit, state, dispatch }, args) {
			let ruta = null;
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
			let ruta = null;

			if (args.rute === null) args.rute = "research_units";
			if (typeof args.rute == "undefined") args.rute = "research_units";

			if (typeof args.newFormat !== 'undefined' && args.newFormat === true)
				ruta = `/${args.stringEP}/${args.mod}`;
			else
				ruta = `${args.rute}/${args.unidadId}/${args.stringEP}/${args.mod}`;

			console.log("UPDATE!");
			api()
				.put(ruta, args.objectSend)
				.then((r) => {
					args.cb(r.data);
				});
		},

		active({ commit, state, dispatch }, args) {
			console.log("Activa o desactiva elemento", args);
			console.log("args.paper", args.data);
			if (typeof args.newFormat !== 'undefined' && args.newFormat === true) {
				console.info("Actualizado mediante patch");
				api()
					.patch(args.url, args.data)
					.then((r) => {
						console.info("Actualizado mediante patch", r.data);
						return this._vm.$isFunction(args.cb) ? args.cb(r.data) : null;
					});
			} else {
				api()
					.put(args.url, args.data)
					.then((r) => {
						console.log("Actualizado mediante put", r.data);
						return this._vm.$isFunction(args.cb) ? args.cb(r.data) : null;
					});
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


		item: (state, getters) => (id) => {
			if (state.items.length > 0) {
				let item = state.items.find((o) => o.id.toString() === id.toString());
				return item;
			}
		},
	},
};

export default store;
