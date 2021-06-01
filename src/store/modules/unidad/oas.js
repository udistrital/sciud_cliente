/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
import vue from "vue";
import vuex from "vuex";
import api from "@/store/api";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		facultades: [],
	},
	actions: {
		facultades({ commit, state, rootState }, cb) {
			if (state.facultades.length <= 0) {
				console.log("rootState", rootState);
				// TODO: 202009240908: Ajustar al tener tokens integrados
				// 202010220138: Si es local usa el json local
				// 202010211342: En 'api' se valida la presencia de un token local
				// api(imp ? "local" : "oas")
				// 	.get(imp ? "facultadProyecto" : "/oikos_crud_api/v2/dependencia_padre/FacultadesConProyectos")
				api("oas")
					.get("/oikos_crud_api/v1/dependencia_padre/FacultadesConProyectos")
					.then((r) => {
						// console.log("response", r);
						r.data.forEach((element) => {
							element.Nombre = this._vm.$titleCase(element.Nombre);
							element.Opciones.forEach((element) => {
								element.Nombre = this._vm.$titleCase(element.Nombre);
							});
						});
						this._vm.$objectSort(r.data, "Nombre");
						commit("facultadesSet", r.data);
						if (this._vm.$isFunction(cb)) cb;
					});
			} else {
				if (this._vm.$isFunction(cb)) cb;
			}
		},
	},
	mutations: {
		facultadesSet(state, data) {
			state.facultades = data;
		},
	},
	getters: {
		facultades: (state, getters) => {
			return state.facultades;
		},
	},
};

export default store;
