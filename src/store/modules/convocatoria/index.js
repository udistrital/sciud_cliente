/* eslint-disable no-unused-vars */
import vue from "vue";
import vuex from "vuex";
import api from "@/store/api";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		items: [],
		loading: true,
		baseEntity: null,
	},
	actions: {
		// 202107140044: Crea
		async getItem({ commit, state, dispatch }, id) {
			return await api()
				.get(`calls/${id}`)
				.then((r) => {
					return r.data;
				});
		},
		// 202107140044: Crea
		async saveItem({ commit, state, dispatch }, item) {
			return await api()
				.post(`calls`, { call: item })
				.then((r) => {
					return r.data;
				});
		},
		// 202107140045: Actualiza
		async updateItem({ commit, state, dispatch }, item) {
			return await api()
				.put(`calls/${item.id}`, { call: item })
				.then((r) => {
					return r.data;
				});
		},
		// 202107291208: Crea
		async saveFinancingItem({ commit, state, dispatch }, item) {
			return await api()
				.post(`/calls/${item.call_id}/call_items`, { call_item: item })
				.then((r) => {
					return r.data;
				});
		},
		// 202107291208: Actualiza
		async updateFinancingItem({ commit, state, dispatch }, item) {
			return await api()
				.put(`call_items/${item.id}`, { call_item: item })
				.then((r) => {
					return r.data;
				});
		},
		// 202107280712: Crea
		async saveCriteria({ commit, state, dispatch }, item) {
			return await api()
				.post(`calls/${item.call_id}/call_eval_criteria`, { call_eval_criterion: item })
				.then((r) => {
					return r.data;
				});
		},
		// 202107280712: Actualiza
		async updateCriteria({ commit, state, dispatch }, item) {
			return await api()
				.put(`call_eval_criteria/${item.id}`, { call_eval_criterion: item })
				.then((r) => {
					return r.data;
				});
		},
		// 202108171742: Crea
		async saveActivity({ commit, state, dispatch }, item) {
			return await api()
				.post(`calls/${item.call_id}/schedule_activities`, { schedule_activity: item })
				.then((r) => {
					return r.data;
				});
		},
		// 202108171742: Actualiza
		async updateActivity({ commit, state, dispatch }, item) {
			return await api()
				.put(`schedule_activities/${item.id}`, { schedule_activity: item })
				.then((r) => {
					return r.data;
				});
		},
		// 202108171742: Crea
		async saveDocument({ commit, state, dispatch }, item) {
			return await api()
				.post(`calls/${item.call_id}/call_documents`, { call_document: item })
				.then((r) => {
					return r.data;
				});
		},
		// 202108171742: Actualiza
		async updateDocument({ commit, state, dispatch }, item) {
			return await api()
				.put(`call_documents/${item.id}`, { call_document: item })
				.then((r) => {
					return r.data;
				});
		},
	},
	mutations: {},
	getters: {
		navItems: () => {
			return [
				{
					key: "info",
					icon: "icon-info",
					name: "Información",
				},
				{
					key: "documentos",
					icon: "icon-file-pdf",
					name: "Documentos",
				},
				{
					key: "criterios",
					icon: "icon-tree7",
					name: "Criterios",
				},
				{
					key: "rubros",
					icon: "icon-coins",
					name: "Rubros",
				},
				{
					key: "cronograma",
					icon: "icon-calendar",
					name: "Cronograma",
				},
				{
					key: "plantilla",
					icon: "icon-page-break2",
					name: "Plantilla",
				},
			];
		},
		getItem: (state, getters) => (id) => {
			if (state.items.length > 0) {
				let item = state.items.find((o) => o.id.toString() === id.toString());
				return item;
			}
		},
	},
};

export default store;
