/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
import vue from "vue";
import vuex from "vuex";
import api from "./api";

vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		items: [],
		base: {
			NombreCompleto: null,
			PrimerNombre: null,
			SegundoNombre: null,
			PrimerApellido: null,
			SegundoApellido: null,
			LugarOrigen: 0,
			FechaNacimiento: null,
			Activo: true,
			TipoContribuyenteId: {
				Id: 1,
				Nombre: "PERSONA NATURAL",
				Descripcion: "",
				CodigoAbreviacion: "P_NATURAL",
				Activo: true,
			},
		},
		resp: {
			Id: 0,
			NombreCompleto: null,
			PrimerNombre: null,
			SegundoNombre: null,
			PrimerApellido: null,
			SegundoApellido: null,
			LugarOrigen: 0,
			FechaNacimiento: null,
			Activo: true,
			TipoContribuyenteId: {
				Id: 1,
				Nombre: "PERSONA NATURAL",
				Descripcion: "",
				CodigoAbreviacion: "P_NATURAL",
				Activo: true,
				FechaCreacion: "",
				FechaModificacion: "",
			},
			FechaCreacion: "2020-10-21T01:09:06.196187473-05:00",
			FechaModificacion: "2020-10-21T01:09:06.196284656-05:00",
			UsuarioWSO2: "",
		},
	},
	actions: {
		allLocal({ commit, state }, args) {
			// var cedula = args[0];
			// console.log(cedula);
			if (state.items.length <= 0) {
				api("local")
					.get("integrantes")
					.then((r) => {
						commit("SetData", r.data.integrantes);
					});
			}
		},
		all({ commit, state }, args) {
			// var cedula = args[0];
			// console.log(cedula);
			if (state.items.length <= 0) {
				api("local")
					.get("integrantes")
					.then((r) => {
						commit("SetData", r.data.integrantes);
					});
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
		base: (state, getters) => {
			return state.base;
		},
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
