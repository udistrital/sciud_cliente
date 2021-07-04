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
let OAS_SESSION = "oas_session";
let OAS_STATE = "oas_state";
let OAS_TOKEN_EXP_AT = "oas_token_exp_at";
let OAS_TOKEN_EXP_IN = "oas_token_exp_in";
let OAS_TOKEN_ID = "oas_token_id";
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
		oasToken: typeof window.config !== "undefined" ? window.sessionStorage.getItem(window.config.api.oas.token_name) || null : null,
		oasTokenExp: window.sessionStorage.getItem(OAS_TOKEN_EXP_IN) || null,
		oasTokenExpAt: window.sessionStorage.getItem(OAS_TOKEN_EXP_AT) || null,
		user: window.sessionStorage.getItem(APP_USER) || null,
	},
	actions: {
		async getUser({ commit, state, dispatch }, args) {
			// console.clear();
			console.log(window.vm.$sep);
			console.log("Verificando usuario", args);
			let userOas = oasDecodeUser(args.qs.id_token);
			console.log("userOas", userOas);
			let doc = userOas.documento;

			// 202105242205: Guarda el token para las consultas posteriores
			window.sessionStorage.setItem(window.config.api.oas.token_name, args.qs.access_token);

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
			console.log(window.vm.$sep);
			let userLocal = r.length > 0 ? r[0] : null;
			console.log("Usuario local", userLocal);

			// 202103120410: NO es usuario del sistema
			if (userLocal === null) return this._vm.$isFunction(args.cb) ? args.cb({ hasAccess: false, user: userOas }) : null;

			// 202103120410: Es usuario del sistema
			let user = {
				local: userLocal,
				oas: userOas,
			};
			console.log("user", user);
			// 202104191437: Si NO es integrante
			if (userLocal.user_role_id !== 5) {
				return this._vm.$isFunction(args.cb) ? args.cb({ hasAccess: true, user: user }) : null;
			} else {
				dispatch(
					"auth/usuario/getStructures",
					{
						doc: doc,
						cb: function(groups) {
							if (groups.length > 0) {
								user["groups"] = groups;
								return this._vm.$isFunction(args.cb) ? args.cb({ hasAccess: true, user: user }) : null;
							} else {
								// 202103120416: No se encontraron grupos para el usuario, niega el acceso
								return this._vm.$isFunction(args.cb) ? args.cb({ hasAccess: false, user: user }) : null;
							}
						},
					},
					{ root: true }
				);
				// 202103120931: Es integrante, consulta los grupos respectivos
				/*
				api()
					.get(`researcher_research_units?identification_number=${doc}`)
					.then((r) => {
						let groups = r.data;
						console.log(window.vm.$sep);
						console.log("Grupos de integrante =>", groups);
						// 202103120414: Si tiene acceso a algún grupo autoriza
						if (groups.length > 0) {
							user["groups"] = groups;
							return this._vm.$isFunction(args.cb) ? args.cb({ hasAccess: true, user: user }) : null;
						} else {
							// 202103120416: No se encontraron grupos para el usuario, niega el acceso
							return this._vm.$isFunction(args.cb) ? args.cb({ hasAccess: false, user: user }) : null;
						}
					});
					*/
			}
		},
		authLogout: ({ commit, state }, callback) => {
			commit("authLogout", callback);
		},
		oasInit: ({ commit, state }, callback) => {
			// Construye el objeto OAS
			let cfg = window.config.auth.oidc;
			let url = "https://support.nemedi.com/udistrital/siciud-v2";
			let cUrl = window.location.href.toLowerCase();
			if (cUrl.indexOf("pruebassiciud.") > -1) {
				url = "https://pruebassiciud.portaloas.udistrital.edu.co";
			} else if (cUrl.indexOf("siciud.") > -1) {
				url = "https://siciud.portaloas.udistrital.edu.co";
			}
			cfg["REDIRECT_URL"] = url + "/login";
			cfg["SIGN_OUT_REDIRECT_URL"] = cfg["SIGN_OUT_REDIRECT_URL"].replace("{baseUrl}", url);
			oidc.setGeneral(cfg);
			console.log("cfg =>", cfg);
			if (isFunction(callback)) callback(false);
		},
		oasLogin: ({ commit, state }) => {
			oidc.getAuthorizationUrl();
		},
		oasLoginData: async ({ commit, dispatch, state }, args) => {
			console.log(window.vm.$sep);
			console.log("oasLoginData", args);
			window.sessionStorage.setItem(OAS_TOKEN_ID, args.qs.id_token);
			window.sessionStorage.setItem(OAS_SESSION, args.qs.session_state);
			window.sessionStorage.setItem(OAS_STATE, args.qs.state);
			window.sessionStorage.setItem(window.config.api.oas.token_name, args.qs.access_token);
			window.sessionStorage.setItem(OAS_TOKEN_EXP_IN, args.qs.expires_in);
			oidc.setExpiresAt(OAS_TOKEN_EXP_AT, OAS_TOKEN_EXP_IN);
			state.oasToken = args.qs.access_token;
			state.oasTokenExp = args.qs.expires_in;
			state.oasTokenExp = args.qs.expires_in;

			// 202103120702: Obtiene el usuario de la OAS
			console.log(window.vm.$sep);
			console.log("store.auth => dispatch => usuario/getOasUser");
			let userDetails = await dispatch("auth/usuario/getOasUser", { doc: args.user.local.identification_number }, { root: true });
			if (typeof userDetails.TerceroId !== "undefined") {
				userDetails.TerceroId.NombreCompleto = window.vm.$titleCase(userDetails.TerceroId.NombreCompleto);
			}
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
			console.log(window.vm.$sep);
			console.log("user", args.user);
			state.user = typeof args.user === "string" ? JSON.parse(args.user) : args.user;
			window.sessionStorage.setItem(APP_USER, JSON.stringify(args.user));
			if (isFunction(args.callback)) args.callback({ is_success: true, user: args.user });
		},
		authLogout: (state, cb) => {
			console.log("authLogout");
			console.log("window.location.host", window.location.host);
			console.log("window.location.hostname", window.location.hostname);
			console.log("window.location.port", window.location.port);
			console.log("process.env.BASE_URL", process.env.BASE_URL);
			console.log("process.env", process.env);
			let red_url = window.location.protocol + "//" + window.location.host + process.env.BASE_URL;
			let cfg = window.config.auth.oidc;
			let url = cfg.SIGN_OUT_URL;
			let token_id = window.sessionStorage.getItem(OAS_TOKEN_ID);
			if (token_id !== null) {
				url += "?id_token_hint=" + token_id;
				url += "&state=" + window.sessionStorage.getItem(OAS_STATE);
				url += "&post_logout_redirect_uri=" + cfg.SIGN_OUT_REDIRECT_URL.replace("{baseUrl}", red_url);
				window.sessionStorage.clear();
				for (const item in state) state[item] = null;
				state.authenticated = false;
				console.log("logout url =>", url);
				if (isFunction(cb)) cb();
				// if (process.env.NODE_ENV.toString().toLowerCase() === "production") window.location.replace(url);
			}
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
		oasTokenExp: (state, getters) => {
			return window.sessionStorage.getItem(OAS_TOKEN_EXP_IN) || null;
		},
		oasTokenExpAt: (state, getters) => {
			return window.sessionStorage.getItem(OAS_TOKEN_EXP_AT) || null;
		},
	},
};

export { APP_USER, OAS_SESSION, OAS_STATE, OAS_TOKEN_EXP_AT, OAS_TOKEN_EXP_IN, OAS_TOKEN_ID };
export default store;
