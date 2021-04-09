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
		roles: [],
		groupRoles: [],
		userOasDetails: [],
		loadingRoles: false,
	},
	actions: {
		// 202010282329: Async https://stackoverflow.com/a/63997702
		async getOasUsers({ commit, dispatch, state }, args) {
			try {
				console.log(window.vm.$sep);
				console.log("getOasUsers");
				for (let index = 0; index < args.users.length; index++) {
					console.log(window.vm.$sep);
					const user = args.users[index];
					console.log("user", user);

					// 202104020227: Verifica que el usuario no tenga ya los detalles de la OAS
					// if (typeof user.oas_details === "undefined") {
					const field_value = this._vm.$getFieldValue(user, args.field);
					console.log(`Consultando usuario con ${args.field}: ${field_value}...`);
					let details = await dispatch("getOasUser", { doc: field_value });
					user["oas_details"] = details;
					// }
				}
				// console.log("getOasUsers", args.users);
				if (this._vm.$isFunction(args.cb)) {
					return args.cb(args.users);
				} else {
					return args.users;
				}
			} catch (error) {
				return this._vm.$isFunction(args.cb) ? args.cb(error) : error;
			}
		},
		// 202010290006: https://scotch.io/tutorials/asynchronous-javascript-using-async-await
		async getOasUser({ commit, getters }, args) {
			try {
				console.log("getOasUser => ", args);
				// Verifica que el usuario no exista ya en el state
				let user_oas_details = getters.getUserOasDetails(args.doc);
				if (typeof user_oas_details !== "undefined") {
					console.log("Usuario encontrado en state: ", user_oas_details);
					// 202104020302: Devuelve la respuesta de acuerdo a los parámetros recibidos
					if (this._vm.$isFunction(args.cb)) {
						return args.cb(user_oas_details);
					} else {
						return user_oas_details;
					}
				} else {
					// 202104020314: El usuario no existe en el state, lo consulta el la API
					console.log("Consultando API OAS => ", args.doc);
					return await api("oas")
						.get("terceros_crud/v1/datos_identificacion?query=Numero:" + args.doc)
						.then((r) => {
							user_oas_details = r.data[0];
							// 202104020819: Se almacena el documento pues será el
							// usado para buscar si no hay respuesta de la OAS
							user_oas_details["doc"] = args.doc;
							commit("SetOasDetails", user_oas_details);
							if (this._vm.$isFunction(args.cb)) {
								return args.cb(user_oas_details);
							} else {
								return user_oas_details;
							}
						});
				}
			} catch (error) {
				return this._vm.$isFunction(args.cb) ? args.cb(error) : error;
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
		async saveUser({ commit, state, dispatch }, user) {
			console.log("SEND", user);
			return await api()
				.post(`users`, { user: user })
				.then((r) => {
					return r.data;
				});
		},

		// Agregado por camorenos@udistrital.edu.co 08-04-2021-02:30
		async ingegSend({ commit, state, dispatch }, dto) {
			console.log("SEND", dto.obj);
			let data=dto.obj;
			return await api()
				.post(dto.url, data )
				.then((r) => {
					return r.data;
				});
		},
		
		async ingegUpdate({ commit, state, dispatch }, dto) {
			console.log("SEND", dto.obj);
			let data=dto.obj;
			let url=dto.url+"/"+dto.idint;
			console.log("url update participants", dto.url+"/"+dto.obj.id)
			return await api()
				.put(url, data )
				.then((r) => {
					return r.data;
				});
		},

		async updateUser({ commit, state, dispatch }, args) {
			console.log("SEND", args);
			return await api()
				.put(`users/${args.user.id}`, { user: args.user })
				.then((r) => {
					return args.cb(r.data);
				});
		},
		async getUser({ commit, state, dispatch }, id) {
			console.log("SEND", id);
			return await api()
				.get(`users?identification_number=${id}`)
				.then((r) => {
					return r.data;
				});
		},
		getAllRoles({ commit, state }, args) {
			// var cedula = args[0];
			// 202103081901: Si los roles siguen vacios y no se está cargando ya
			if (state.roles.length <= 0 && !state.loadingRoles) {
				// console.log("state.roles.length", state.roles.length);
				state.loadingRoles = true;
				api()
					.get("user_roles")
					.then((r) => {
						commit("SetRoles", r.data);
					});
			}
		},
		getGroupRoles({ commit, state }, args) {
			// 202103151241: getGroupRoles
			if (state.groupRoles.length <= 0) {
				api()
					.get("role")
					.then((r) => {
						commit("SetGroupRoles", r.data);
					});
			}
		},
	},
	mutations: {
		async SetOasDetails(state, user_oas_details) {
			// 202104020301: Asume que el usuario ya ha sido verificado y no existe en el state... lo agrega
			// if (typeof user_oas_details.Numero !== "undefined") {
			state.userOasDetails.push(user_oas_details);
			console.log("mutation => SetOasDetails => ", user_oas_details);
			console.log("state.userOasDetails => ", state.userOasDetails);
			// }
		},
		SetData(state, data) {
			// for (let x = 0; x < data.length; x++) {
			// 	let o = data[x];
			// 	if (o.avance !== null) o.avance = o.avance.toString().replace(".", ",") + "%";
			// }
			state.items = data;
		},
		SetRoles(state, data) {
			state.roles = data;
			state.loadingRoles = false;
			// console.log(window.vm._sep);
			console.log("state.roles", state.roles);
		},
		SetGroupRoles(state, data) {
			state.groupRoles = data;
			// console.log(window.vm._sep);
			console.log("state.groupRoles", state.groupRoles);
		},
	},
	getters: {
		getUserOasDetails: (state, getters) => (doc) => {
			var u = state.userOasDetails.find((o) => o.doc.toString() === doc.toString());
			console.log("getters.getUserOasDetails(" + doc + ") => ", u);
			return u;
		},
		loadingRoles: (state, getters) => {
			return state.loadingRoles;
		},
		base: (state, getters) => {
			return state.base;
		},
		roles: (state, getters) => {
			return state.roles;
		},
		groupRoles: (state, getters) => {
			return state.groupRoles;
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
