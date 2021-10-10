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
		items_areas: [],
	},
	actions: {
		getAll({ commit, state }, args) {
			console.warn("store subtipos",args.id_subtipos);
			if(args.id_subtipos!=0 || args.id_subtipos!=null){
				api()
					.get('indicators?filter=[["subtype_id","=", "'+args.id_subtipos+'", "and", "active","=","true"]]')
					.then((r) => {
						args.cb(r.data.data);
						commit("SetData", r.data.data);
					});
			}else{
				args.cb([]);
			}
		},
		getAreasKnow({ commit, state }, args) {
			console.warn("store subtipos",args.parent_id);
			if(args.parent_id!=0 || args.parent_id!=null){
				api()
					.get('types_all?filter=[["parent_id","=", "'+args.parent_id+'"]]&take=200')
					.then((r) => {
						args.cb(r.data.data);
						commit("SetDataAreas", r.data.data);
					});
			}else{
				args.cb([]);
			}
		},
	},
	mutations: {
		SetData(state, data) {
			state.items = data;
			console.warn("store indicadores",data);
		},
		SetDataAreas(state, data) {
			state.items_areas = data;
			console.warn("store indicadores",data);
		},
	},
	getters: {
		items: (state, getters) => {
			return state.items;
		},
		items_areas: (state, getters) => {
			return state.items_areas;
		},
	},
};

export default store;
