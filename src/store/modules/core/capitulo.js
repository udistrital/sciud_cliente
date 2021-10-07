/* eslint-disable no-unused-vars */
import api from "@/store/api";
import vuex from "vuex";
import vue from "vue";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		item: null,
	},
	actions: {
		// 202110070113: Carga todos los capitulos de un objeto
		async update({ commit, state, dispatch }, args) {
			return await api()
				.put(`${args.context}/${args.id}/chapters/${args.item.id}`, { chapter: args.item })
				.then((r) => {
					return r.data;
				});
		},
		// 202110070113: Carga todos los capitulos de un objeto
		async add({ commit, state, dispatch }, args) {
			return await api()
				.post(`${args.context}/${args.id}/chapters`, { chapter: args.item })
				.then((r) => {
					return r.data;
				});
		},
		// 202110070113: Carga todos los capitulos de un objeto
		async getAll({ commit, state, dispatch }, args) {
			return await api()
				.get(`${args.context}/${args.id}/chapters?take=10000`)
				.then((r) => {
					return r.data.data;
				});
		},
		// 202110070113: Actualiza todos los capitulos de un objeto
		async updateAll({ commit, state, dispatch }, args) {
			let res = [];
			for (let x = 0; x < args.items.length; x++) {
				const item = args.items[x];
				let chapter = await dispatch(item.is_new ? "add" : "update", { id: args.id, context: args.context, item: item });
				res.push(chapter);
			}
			return res;
		},
		// 202110070113: Crea todos los capitulos de un objeto
		async createAll({ commit, state, dispatch }, args) {
			let res = [];
			console.log("createAll =>", args.items);
			for (let x = 0; x < args.items.length; x++) {
				const item = args.items[x];
				if (item.ch_parent_id != null) {
					let parents = res.filter((o) => o.id_o == item.ch_parent_id);
					if (parents.length > 0) item.ch_parent_id = parents[0].id;
				}
				let chapter = await dispatch("add", { id: args.id, context: args.context, item: item });
				chapter["id_o"] = item.id;
				res.push(chapter);
			}
			return res;
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
