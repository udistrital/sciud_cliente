/* eslint-disable no-unused-vars */

// 202009090136:
// https://github.com/sqreen/vue-authentication-example
// https://blog.sqreen.com/authentication-best-practices-vue

// 202009211350: How to implement auto refresh in client side
// https://stackoverflow.com/a/55748794
// How to set timer idle in Vue
// https://jakzaizzat.com/idle-timer-vue

import * as oidc from "../assets/js/oidc";
import api from "./api";
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

//#region Constantes store
let LOGOUT = "AuthLogout";
let AUTH_SUCCESS = "AuthSuccess";
let LOCAL_LOGIN = "AuthLogin";
//#endregion

//#region Funciones

let isFunction = (functionToCheck) => {
	return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";
};

let oasGetUser = (id_token) => {
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
		userDetails: window.localStorage.getItem(APP_USER_DETAILS) || null,
	},
	actions: {
		[LOGOUT]: ({ commit, state }, callback) => {
			commit(LOGOUT);
			if (isFunction(callback)) callback();
		},
		[LOCAL_LOGIN]: ({ commit, state }, args) => {
			commit(LOCAL_LOGIN);
			var user = args[0];
			var callback = args[1];
			console.log(user);
			setTimeout(function() {
				api()
					.post("login", { user: user })
					.then((r) => {
						console.log(r.data);
						console.log("data", r.data.is_success);
						if (r.data.is_success) {
							let u = r.data.data.user;
							let ud = r.data.data.external_researcher;
							// TODO: 202009240819: Ajustar al tener token local
							window.localStorage.setItem(LOCAL_TOKEN, u.jti);
							window.localStorage.setItem(LOCAL_TOKEN_EXP, 3600);
							state.localToken = u.jti;
							state.localTokenExp = 3600;
							let o = {
								user: u,
								userDetails: ud,
								callback: callback,
							};
							commit(AUTH_SUCCESS, o);
						} else {
							commit(LOGOUT);
							commit("authError");
						}
					})
					.catch((r) => {
						commit(LOGOUT);
						commit("authError");
						if (isFunction(callback)) callback(r);
					});
			}, 1500);
		},
		SetImpersonation: ({ commit, state }, callback) => {
			let user = null,
				userDetails = null;
			api("local")
				.get("tercero_usuario")
				.then((r) => {
					user = r.data;
					api("local")
						.get("tercero")
						.then((r) => {
							userDetails = r.data[0];
							var o = {
								user: user,
								userDetails: userDetails,
								callback: callback,
							};
							commit(AUTH_SUCCESS, o);
						});
				});
		},
		OasInit: ({ commit, state }, callback) => {
			// Construye el objeto OAS
			let url = window.vm.env.url;
			let cfg = window.config.auth.oidc;
			cfg["REDIRECT_URL"] = cfg["REDIRECT_URL"].replace("{baseUrl}", url);
			cfg["SIGN_OUT_REDIRECT_URL"] = cfg["SIGN_OUT_REDIRECT_URL"].replace("{baseUrl}", url);
			oidc.setGeneral(cfg);
			commit(LOGOUT);
			if (isFunction(callback)) callback(false);
		},
		OasLogin: ({ commit, state }) => {
			oidc.getAuthorizationUrl();
		},
		OasLoginData: ({ commit, state }, { qs, callback }) => {
			console.log("qs", qs);
			window.localStorage.setItem(OAS_TOKEN, qs.access_token);
			window.localStorage.setItem(OAS_TOKEN_EXP_IN, qs.expires_in);
			oidc.setExpiresAt(OAS_TOKEN_EXP_AT, OAS_TOKEN_EXP_IN);
			state.oasToken = qs.access_token;
			state.oasTokenExp = qs.expires_in;
			let user = oasGetUser(qs.id_token);
			let apiObj = api("oas", true);
			// 202009200643: Documento 'quemado' para obtener info -> user.documento = "80761795";
			// let apiUrl = `terceros_crud/v1/datos_identificacion?query=Numero%3A80761795`;
			let apiUrl = `terceros_crud/v1/datos_identificacion?query=Numero%3A${user.documento}`;
			// Si está en desarrollo llama el JSON local
			// if (process.env.NODE_ENV.toString().toLowerCase() === "development") {
			// 	apiObj = api("local");
			// 	apiUrl = "tercero";
			// }
			apiObj.get(apiUrl).then((r) => {
				let userDetails = r.data[0];
				let o = {
					user: user,
					userDetails: userDetails,
					callback: callback,
				};
				commit(AUTH_SUCCESS, o);
			});
		},
	},
	mutations: {
		[LOCAL_LOGIN]: (state) => {
			state.status = "loading";
		},
		authError: (state) => {
			state.status = "error";
		},
		[AUTH_SUCCESS]: (state, args) => {
			state.status = "success";
			state.authenticated = true;
			let u = args.user;
			let ud = args.userDetails;
			let user = {};
			let userDetails = { ...u, ...ud };
			if (Object.prototype.hasOwnProperty.call(u, "sub")) {
				// Es usuario OAS o Personificado
				user["type"] = window.config.impersonate ? "impersonated" : "oas";
				user["email"] = u.email;
				user["document_number"] = u.documento;
				let hasDetails = Object.prototype.hasOwnProperty.call(ud, "TerceroId");
				user["first_name"] = hasDetails ? ud.TerceroId.PrimerNombre + " " + ud.TerceroId.SegundoNombre : null;
				user["last_name"] = hasDetails ? ud.TerceroId.PrimerApellido + " " + ud.TerceroId.SegundoApellido : null;
				user["complete_name"] = hasDetails ? ud.TerceroId.NombreCompleto : u.sub;
			} else {
				// Es usuario local
				user["type"] = "local";
				user["email"] = u.email;
				user["document_number"] = ud.identification_number;
				user["first_name"] = ud.name;
				user["last_name"] = ud.last_name;
				user["complete_name"] = ud.name + " " + ud.last_name;
			}
			console.log("user", user);
			state.user = user;
			state.userDetails = userDetails;
			window.localStorage.setItem(APP_USER, JSON.stringify(user));
			window.localStorage.setItem(APP_USER_DETAILS, JSON.stringify(userDetails));
			if (isFunction(args.callback)) args.callback({ is_success: true, user: user });
		},
		[LOGOUT]: (state) => {
			window.localStorage.clear();
			for (const item in state) state[item] = null;
			state.authenticated = false;
		},
	},
	getters: {
		authStatus: (state) => state.status,
		user: (state, getters) => {
			if (!getters.authenticated) return null;
			return typeof state.user === "string" ? JSON.parse(state.user) : state.user;
		},
		userDetails: (state, getters) => {
			if (!getters.authenticated) return null;
			return typeof state.userDetails === "string" ? JSON.parse(state.userDetails) : state.userDetails;
		},
		authenticated: (state, getters) => {
			// 202010220210: Validación de expiración token OAS
			if (window.config.impersonate) return true;
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
