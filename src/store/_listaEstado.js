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
	
	},
	actions: {
		all({ commit, state }, args) {
			// console.log("args de estado", args);

			if (typeof args !== "undefined") {
				
				var mipais= args.geo_country_id;
			
			console.log("mi idpais",mipais);
			
			let long = state.items.length
			long = 0
			if (long<= 0 && typeof mipais !== "undefined") {
				api()
					.get(`geo_countries/${mipais}/geo_states`)
					.then((r) => {
						// console.log("mi idpais",mipais);
						commit("SetData", r.data);
						// console.log("mi nueva lista",r.data);
						
					}); 
					
			}
		} else{
		return null
		}
		
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
			console.log("mi items nuevos",state.items);

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
