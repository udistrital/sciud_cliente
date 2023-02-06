/* eslint-disable no-unused-vars */
let $ = window.jQuery;
import axios from "axios";
import store from "@/store";
import { custom } from "devextreme/ui/dialog";

// 202009081539:
// Sending the bearer token with axios
// https://stackoverflow.com/a/42879201
export default (source = "rest", args = {}) => {
	// 202103101051: DxDialog: https://js.devexpress.com/Documentation/ApiReference/Common/Utils/ui/dialog
	// 202103101046: Buttons https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxButton/Configuration
	let show = function(msg, code = null) {
		if ($(".dx-dialog").length <= 0) {
			let err = code !== null ? `<textarea class='code' disabled>${code}</textarea>` : "";
			let myDialog = custom({
				showTitle: false,
				dragEnabled: false,
				messageHtml: `<span class='error'><h2>${msg}</h2>${err}</span>`,
				buttons: [
					{
						template: `<span class="cmd">ENTENDIDO <i class="icon-thumbs-up2"></i></span>`,
						onClick: (e) => {
							return {
								buttonText: e.component.option("text"),
							};
						},
					},
				],
			});
			myDialog.show().then((dialogResult) => {
				console.log(dialogResult.buttonText);
				window.vm.loaderHide();
			});
		}
	};

	// TODO: 202009241630: Generar el token local cuando es usuario OAS
	let base = window.config.api.rest;

	// 202105201059: Url dependiendo el entorno
	let url = base.url_dev;
	let cUrl = window.location.href.toLowerCase();
	let is_dev = cUrl.indexOf("pruebassiciud.") > -1 || cUrl.indexOf("siciud.") > -1;
	if (is_dev) url = base.url_prod;

	// 202011260213: https://stackoverflow.com/a/6941653
	let axiosConfig = {
		baseURL: url,
		withCredentials: false,
		headers: {
			Accept: "application/json",
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		},
	};
	if (source === "local") {
		axiosConfig.baseURL = `${process.env.BASE_URL}data/`;
		axiosConfig.transformRequest = [
			// function(data, headers) {
			function(data) {
				// console.log("transformRequest", data, headers);
				return data;
			},
		];
	}

	// 202105201104: Se envía
	// 202105201115: Ajustado para entornos UD
	console.log("is_dev =>", is_dev);
	is_dev = true;
	if (source === "oas" || source === "oas_mid" || is_dev) {
		base = window.config.api.oas;
		if (source === "oas") axiosConfig.baseURL = base.url;
		else if (source === "oas_mid") axiosConfig.baseURL = window.config.auth.oidc.AUTENTICACION_MID;
		// 202010211336: Usa 'token_value' si esta definido en 'config.json', de lo contrario consulta locaStorage
		// 202104121525: Se elimina 'impersonate'
		let token = window.sessionStorage.getItem(base.token_name);
		// 202103120344: Si se recibe un token en args lo usa
		if (typeof args.token !== "undefined") token = args.token;
		console.log("tokenOas", token);
		axiosConfig.headers["Authorization"] = `Bearer ${token}`;
		// axiosConfig.headers["Authorization"] = `${token}`;
	}
	// console.log("source", source);
	// console.log("axiosConfig", axiosConfig);
	const axiosInstance = axios.create(axiosConfig);

	// 202009090053: https://github.com/axios/axios#interceptors
	// 202009090107: Add json extension if local source
	// Request interceptor
	axiosInstance.interceptors.request.use(
		function(config) {
			if (source === "local") config.url += ".json";
			return config;
		},
		function(error) {
			// 202009090114: TODO: Add prompt on error?
			console.error("REQUEST ERROR", error);
			// if (window.config.debug)
			// console.log("typeof args.hide_errors", typeof args.hide_errors);
			// if (typeof args.hide_errors === "undefined") {
			show(error, JSON.stringify(error.request.config, null, "\t"));
			// }
			return Promise.reject(error);
		}
	);

	// Response interceptor
	axiosInstance.interceptors.response.use(
		function(response) {
			// console.log("Response", response);
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function(error, otro, otro1) {
			// console.log(error);
			console.info("RESPONSE ERROR", error);
			console.log("error.response", error.response);
			let msg = null;
			if (typeof error.response !== "undefined") {
				// msg = `<span class="error-detail">${error.response.data.exception.replace("<", "").replace(">", "")}</span>`;
				delete error.response.data.traces;
				msg = JSON.stringify(error.response, null, "\t");
			}
			console.log("error.response.status =>", error.response.status);
			if (error.response.status === 401) {
				console.log("store =>", store);
				store.commit("auth/login/authLogout", function() {
					window.vm.$router.push("/inicio");
				});
			} else {
				// console.log("typeof args.hide_errors", typeof args.hide_errors);
				// if (typeof args.hide_errors === "undefined") {
				show(`${error}`, msg);
				// }
			}
			return Promise.reject(error);
		}
	);

	return axiosInstance;
};
