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
		documents: [],
		baseUser: {
			Id: 0,
			NombreCompleto: "",
			PrimerNombre: "",
			SegundoNombre: "",
			PrimerApellido: "",
			SegundoApellido: "",
			LugarOrigen: 0,
			FechaNacimiento: "2000-08-10T12:00:00Z",
			Activo: true,
			TipoContribuyenteId: {
				Id: 1,
				Nombre: "PERSONA NATURAL",
				Descripcion: "",
				CodigoAbreviacion: "P_NATURAL",
				Activo: true,
			},
		},
		baseDoc: {
			TipoDocumentoId: {
				Id: 3,
				Nombre: "CÉDULA DE CIUDADANÍA",
				Descripcion: "CÉDULA DE CIUDADANÍA",
				CodigoAbreviacion: "CC",
				Activo: true,
				NumeroOrden: 0,
			},
			TerceroId: null,
			Numero: null,
			DigitoVerificacion: 0,
			CiudadExpedicion: 0,
			FechaExpedicion: null,
			Activo: true,
		},
	},
	actions: {
		// 202010290006: https://scotch.io/tutorials/asynchronous-javascript-using-async-await
		async getOasUser({ commit, dispatch, state }, args) {
			let apiObj = api("oas");
			let url = "terceros_crud/v1/datos_identificacion?query=Numero:" + args.doc;
			if (this._vm.$isFunction(args.cb)) {
				apiObj.get(url).then((r) => {
					args.cb(r.data[0]);
				});
			} else {
				return await apiObj.get(url).then((r) => {
					return r.data[0];
				});
			}
		},
		saveOasUser({ commit, dispatch, state }, args) {
			console.log("args", args);
			// https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1/tercero
			api("oas")
				.post("terceros_crud/v1/tercero", args.user)
				.then((r) => {
					// https://autenticacion.portaloas.udistrital.edu.co/apioas/terceros_crud/v1/datos_identificacion
					args.doc.TerceroId.Id = r.data.Id;
					api("oas")
						.post("terceros_crud/v1/datos_identificacion", args.doc)
						.then((r) => {
							if (this._vm.$isFunction(args.cb)) args.cb(r.data);
						});
				});
		},
		getDocuments({ commit, dispatch, state }, cb) {
			api("local")
				.get("cedulas")
				.then((r) => {
					commit("SetDocuments", r.data);
					if (this._vm.$isFunction(cb)) cb(r.data);
				});
		},
	},
	mutations: {
		SetDocuments(state, data) {
			data.forEach((document) => {
				document = document.toString();
			});
			state.documents = data;
		},
	},
	getters: {
		user: (state, getters) => {
			return state.baseUser;
		},
		doc: (state, getters) => {
			return state.baseDoc;
		},
		documents: (state, getters) => {
			return state.documents;
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
