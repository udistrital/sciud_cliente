/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
import api from "./api";
import vuex from "vuex";
import vue from "vue";

vue.use(vuex);

const URL = 'http://9df7e625273a.ngrok.io/api/v1';
// Store
const store = {
	namespaced: true,
	state: {
		items: [],
	},
	actions: {
		all({ commit, state }, args) {
			console.log("mio pob", args.unidadId);
		
			let long = state.items.length
			long = 0
			
			if (long <= 0) {
				api()
					.get(`research_group/${args.unidadId}/ip_livestock_breeds`)
					.then((r) => {
						commit("SetData", r.data);
						
					});
					
			}
		},
		saveChange({ commit, state,dispatch }, args) {
		
				console.log("mi post", args);

				args.created_by = 1;
				console.log("mi nuevo objeto", args);

				api()
					.post(`research_group/${args.unidadId}/ip_livestock_breeds`,{ip_livestock_breed: args})
					.then((r) => {
						r.data = args;
						console.log("entro al post...",JSON.stringify(r.data));
					});
			},
		updateChange({ commit, state,dispatch }, args) {
		
				console.log("mi put", args);

				args.created_by = 1;
				args.updated_by	= 1	;
				console.log("mi nuevo put", args);

			
				api()
					.put(`research_group/${args.unidadId}/ip_livestock_breeds/${args.id}`,{ip_livestock_breed: args})
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
