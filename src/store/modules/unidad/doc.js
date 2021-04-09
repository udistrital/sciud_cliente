/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
import vuex from "vuex";
import vue from "vue";
import api from "@/store/api";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		items: [],
		areas: [],
		subareas: [],
		disciplines: [],
	},
	actions: {
		get({ commit, state }, args) {
			api()
				.get(`research_units/${args.id}/documents/`)
				.then((r) => {
					args.cb(r.data);
				});
		},
		add({ commit, state }, args) {
			// 	    "document": {
			//     "doc_name": "Documento de Constitución",
			//     "doc_path": "/documents/books/libro_de_pruebas_demo_2021%.pdf",
			//     "doc_size": 367751,
			//     "document_type_id": 108,
			//     "created_by": 8085
			// }
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
	},
};

export default store;
