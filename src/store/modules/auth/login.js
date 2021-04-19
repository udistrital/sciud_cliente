/* eslint-disable no-unused-vars */

// 202009090136:
// https://github.com/sqreen/vue-authentication-example
// https://blog.sqreen.com/authentication-best-practices-vue

// 202009211350: How to implement auto refresh in client side
// https://stackoverflow.com/a/55748794
// How to set timer idle in Vue
// https://jakzaizzat.com/idle-timer-vue

import api from "@/store/api";
import * as oidc from "@/assets/js/oidc";
// import * as oidc from "oidc-auth";

//#region Constantes
let APP_USER = "app_user";
let APP_USER_DETAILS = "app_user_details";
let LOCAL_TOKEN = "token_local";
let LOCAL_TOKEN_EXP = "token_local_exp";
let OAS_TOKEN = "token_oas";
let OAS_TOKEN_ID = "token_oas_id";
let OAS_TOKEN_EXP_IN = "token_oas_exp_in";
let OAS_TOKEN_EXP_AT = "token_oas_exp_at";
//#endregion

//#region Funciones

let isFunction = (functionToCheck) => {
	return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";
};

let oasDecodeUser = (id_token) => {
	if (typeof id_token !== undefined && id_token !== null) {
		var arr = id_token.split(".");
		return JSON.parse(atob(arr[1]));
	}
	return null;
};

//#endregion

// Store
const store = {
	namespaced: true,
	state: {
		status: "none",
		authenticated: false,
		localToken: window.localStorage.getItem(LOCAL_TOKEN) || null,
		localTokenExp: window.localStorage.getItem(LOCAL_TOKEN_EXP) || null,
		oasToken: window.localStorage.getItem(OAS_TOKEN) || null,
		oasTokenExp: window.localStorage.getItem(OAS_TOKEN_EXP_IN) || null,
		user: window.localStorage.getItem(APP_USER) || null,
	},
	actions: {
		async getUser({ commit, state, dispatch }, args) {
			// console.clear();
			console.log(window.vm.$sep);
			console.log("Verificando usuario", args);
			let userOas = oasDecodeUser(args.qs.id_token);
			console.log("userOas", userOas);
			let doc = userOas.documento;
			// 202104142017: Si no hay documento ES RESPUESTA GOOGLE, debe obtenerlo
			if (typeof doc === "undefined") {
				let externalWithRol = await dispatch("auth/usuario/getOasStudent", { email: userOas.email, token: args.qs.access_token }, { root: true });
				console.log(window.vm.$sep);
				console.log("externalWithRol", externalWithRol);
				doc = externalWithRol.documento;
			}
			// Verifica el usuario localmente
			let r = await dispatch("auth/usuario/getUser", doc, { root: true });
			// console.clear();
			console.log("r", r);
			let userLocal = r.length > 0 ? r[0] : null;

			// 202103120410: NO es usuario del sistema
			if (userLocal === null) return this._vm.$isFunction(args.cb) ? args.cb({ hasAccess: false, user: userOas }) : null;

			// 202103120410: Es usuario del sistema
			let user = {
				local: userLocal,
				oas: userOas,
			};
			// 202104191437: Si NO es integrante
			if (userLocal.user_role_id !== 5) {
				return this._vm.$isFunction(args.cb) ? args.cb({ hasAccess: true, user: user }) : null;
			} else {
				// 202103120931: Es integrante, consulta los grupos respectivos
				api()
					.get(`researcher_research_units?identification_number=${userOas.documento}`)
					.then((r) => {
						let groups = r.data;
						// 202103120414: Si tiene acceso a algún grupo autoriza
						if (groups.length > 0) {
							user["groups"] = groups;
							return this._vm.$isFunction(args.cb) ? args.cb({ hasAccess: true, user: user }) : null;
						} else {
							// 202103120416: No se encontraron grupos para el usuario, niega el acceso
							return this._vm.$isFunction(args.cb) ? args.cb({ hasAccess: false, user: user }) : null;
						}
					});
			}
		},
		authLogout: ({ commit, state }, callback) => {
			commit("authLogout");
			if (isFunction(callback)) callback();
		},
		oasInit: ({ commit, state }, callback) => {
			// Construye el objeto OAS
			let url = window.vm.env.url;
			let cfg = window.config.auth.oidc;
			cfg["REDIRECT_URL"] = cfg["REDIRECT_URL"].replace("{baseUrl}", url);
			cfg["SIGN_OUT_REDIRECT_URL"] = cfg["SIGN_OUT_REDIRECT_URL"].replace("{baseUrl}", url);
			oidc.setGeneral(cfg);
			commit("authLogout");
			if (isFunction(callback)) callback(false);
		},
		oasLogin: ({ commit, state }) => {
			oidc.getAuthorizationUrl();
		},
		oasLoginData: async ({ commit, dispatch, state }, args) => {
			console.log(window.vm.$sep);
			console.log("oasLoginData", args);
			window.localStorage.setItem(OAS_TOKEN, args.qs.access_token);
			window.localStorage.setItem(OAS_TOKEN_EXP_IN, args.qs.expires_in);
			oidc.setExpiresAt(OAS_TOKEN_EXP_AT, OAS_TOKEN_EXP_IN);
			state.oasToken = args.qs.access_token;
			state.oasTokenExp = args.qs.expires_in;

			// 202103120702: Obtiene el usuario de la OAS
			console.log(window.vm.$sep);
			console.log("store.auth => dispatch => usuario/getOasUser");
			let userDetails = await dispatch("auth/usuario/getOasUser", { doc: args.user.local.identification_number }, { root: true });
			console.log("store.auth => dispatch => usuario/getOasUser => Recibido => ", userDetails);
			args.user["oas_details"] = userDetails;
			commit("authSuccess", args);
		},
	},
	mutations: {
		authError: (state) => {
			state.status = "error";
		},
		authSuccess: (state, args) => {
			state.status = "success";
			state.authenticated = true;
			// console.log(window.vm.$sep);
			console.log("user", args.user);
			state.user = typeof args.user === "string" ? JSON.parse(args.user) : args.user;
			window.localStorage.setItem(APP_USER, JSON.stringify(args.user));
			if (isFunction(args.callback)) args.callback({ is_success: true, user: args.user });
		},
		authLogout: (state) => {
			window.localStorage.clear();
			for (const item in state) state[item] = null;
			state.authenticated = false;
		},
	},
	getters: {
		authStatus: (state) => state.status,
		user: (state, getters) => {
			if (!getters.authenticated) return null;
			console.log("typeof state.user", typeof state.user);
			console.log("state.user", state.user);
			return typeof state.user === "string" ? JSON.parse(state.user) : state.user;
		},
		userDetails: (state, getters) => {
			if (!getters.authenticated) return null;
			return typeof state.userDetails === "string" ? JSON.parse(state.userDetails) : state.userDetails;
		},
		authenticated: (state, getters) => {
			console.log("state.authenticated!");
			// 202010220210: Validación de expiración token OAS
			if (state.oasToken !== null && !oidc.expired(OAS_TOKEN_EXP_AT)) return true;
			return false;
		},
		localToken: (state, getters) => {
			return state.localToken;
		},
		oasToken: (state, getters) => {
			return state.oasToken;
		},
	},
};

export default store;
