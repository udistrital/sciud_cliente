/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
import api from "./api";
import vuex from "vuex";
import vue from "vue";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		items: [],
		idlib:"",
	},
	actions: {
		all({ commit, state }, args) {
			console.log("mio participante int", args.id);
			state.idlib = args.id
			console.log("mio state id", state.idlib);
			let long = state.items.length
			long = 0
			
			if (long <= 0) {
				api()
					.get(`book_chapters/${args.id}/int_participants`)
					.then((r) => {
						commit("SetData", r.data);
						
					});
					
			}
		},
		saveChange({ commit, state,dispatch }, args) {
		
			console.log("mi post", args);
			var ids= state.idlib
			args.created_by = 1;
			console.log("mi stado id en post", ids);

			api()
				.post(`book_chapters/${ids}/int_participants`, args)
				.then((r) => {
					r.data = args;
					console.log("entro al post...",JSON.stringify(r.data));
				});
		},
		updateChange({ commit, state,dispatch }, args) {
	
			console.log("mi put", args);
			var ids= state.idlib
			args.created_by = 1;
			args.updated_by	= 1	;
			console.log("mi nuevo put", args);

		
			api()
				.put(`book_chapters/${ids}/int_participants/${args.id}`,args)
				.then((r) => {
					r.data = args;
					console.log("entro al put...",JSON.stringify(r.data));
				});
		}
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
