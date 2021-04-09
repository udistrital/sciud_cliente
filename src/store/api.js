/* eslint-disable no-unused-vars */
let $ = window.jQuery;
import axios from "axios";
import { custom } from "devextreme/ui/dialog";

// 202009081539:
// Sending the bearer token with axios
// https://stackoverflow.com/a/42879201
export default (source = "rest", args = {}) => {
	// 202103101051: DxDialog: https://js.devexpress.com/Documentation/ApiReference/Common/Utils/ui/dialog
	// 202103101046: Buttons https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxButton/Configuration
	let show = function(msg, code) {
		if ($(".dx-dialog").length <= 0) {
			let myDialog = custom({
				showTitle: false,
				dragEnabled: false,
				messageHtml: `<span class='error'><h2>${msg}</h2><textarea class='code' disabled>${code}</textarea></span>`,
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
				window.vm.loadHide();
			});
		}
	};

	// TODO: 202009241630: Generar el token local cuando es usuario OAS
	let base = window.config.api.rest;
	// 202011260213: https://stackoverflow.com/a/6941653
	// let origin = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
	let token = window.localStorage.getItem(base.token_name);
	let axiosConfig = {
		baseURL: base.url,
		withCredentials: false,
		headers: {
			Accept: "application/json",
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		},
	};
	// if (source === "rest") {
	// 	axiosConfig.headers["Authorization"] = `Bearer ${token}`;
	// }
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
	if (source === "oas") {
		base = window.config.api.oas;
		axiosConfig.baseURL = base.url;
		// 202010211336: Usa 'token_value' si esta definido en 'config.json', de lo contrario consulta locaStorage
		token = window.config.impersonate ? base.token_value : window.localStorage.getItem(base.token_name);
		// 202103120344: Si se recibe un token en args lo usa
		if (typeof args.token !== "undefined") token = args.token;
		// console.log("tokenOas", token);
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
			show(error, JSON.stringify(error.request.config, null, "\t"));
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
		function(error) {
			// console.log(error);
			console.error("RESPONSE ERROR", error);
			// if (window.config.debug)
			show(error, JSON.stringify(error.response.config, null, "\t"));
			return Promise.reject(error);
		}
	);

	return axiosInstance;
};
