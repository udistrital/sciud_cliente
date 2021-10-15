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
		userdata:{},
		docUserItems:{},
	},
	actions: {
		
		// async getresearchersID({ commit, dispatch, state }, group_id) {
		// 	api()
		// 		.get(`researchers/${group_id}`)
		// 		.then((r) => {
		// 			console.warn("store id user", r.data);
		// 			return r.data;
		// 		});
		// },
		async searchEstructure({ commit, getters }, args) {
			try {
				console.log("getEstructuras => ", args);
				return await api()
					.get('research_units?faculties='+args.facults+'&filter=[["name","contains","'+args.nameEstruc+'"],"and",["group_state_id","=",2]]')
					.then((r) => {
						return r.data.data;
				});
			} catch (error) {
				//verifica si dentro del argumento existe una funccion callback
				return this._vm.$isFunction(args.cb) ? args.cb(error) : error;
			}
		},

		getresearchersID({ commit, state }, group_id) {
			api()
			.get(`researchers/${group_id}`)
			.then((r) => {
				console.warn("state =>", r.data);
				commit("SeUserID", r.data);
				// if (this._vm.$isFunction(group_id)) callback(r.data.data);
			});
		},
		
		getresearchersDoc({ commit, state }, doc) {
			api()

			.get(`researcher_research_units?identification_number=${doc}&role_ids=2,1`)
			.then((r) => {
				console.warn("state =>", r.data);
				commit("docDataItems", r.data);
				// if (this._vm.$isFunction(group_id)) callback(r.data.data);
			});
		},

		getRed({ commit, dispatch, state }, args) {
			console.log("getRed", args);
			// if (state.item !== null && state.item.id.toString() === args.id.toString()) {
			// 	console.log("getUnit encontrado!", state.item);
			// 	return args.cb(state.item);
			// }
			api()
				.get(`research_networks/${args.id}`)
				.then((r) => {
					console.warn("getRed data->!", r.data);
					state.item = r.data;
					return args.cb(r.data);
				});
		},

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
			let data;
			
			if (args.rute2 !== null && typeof args.rute2 !== 'undefined') data=args.rute2;
			else {

				if (args.rute === null) data=`research_units/${args.unidadId}/${args.stringEP}`;
				else data=`${args.rute}/${args.unidadId}/${args.stringEP}`;
				if (typeof args.rute == "undefined") data=`research_units/${args.unidadId}/${args.stringEP}`;
				else data=`${args.rute}/${args.unidadId}/${args.stringEP}`;
			}
			console.log("CREATE!");
			console.warn("CREATE! data=>", args.rute);
			console.warn("CREATE! data=>", args.rute2);
			api()
				.post(data, args.objectSend)
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
		SeUserID(state, data) {
			state.userdata = data;
		},
		docDataItems(state, data) {
			state.docUserItems = data;
		},
	},
	getters: {
		items: (state, getters) => {
			return state.items;
		},

		userdata:(state, getters) => {
			return state.userdata;
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
