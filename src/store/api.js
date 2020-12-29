let $ = window.jQuery;
import axios from "axios";
import { custom } from "devextreme/ui/dialog";

// 202009081539:
// Sending the bearer token with axios
// https://stackoverflow.com/a/42879201
export default (source = "rest", showErrors = false) => {
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
			// "Access-Control-Allow-Methods": "*",
			// "Access-Control-Allow-Headers": "*",
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
		token = base.token_value !== null ? base.token_value : window.localStorage.getItem(base.token_name);
		console.log("tokenOas", token);
		axiosConfig.headers["Authorization"] = `Bearer ${token}`;
		// axiosConfig.headers["Authorization"] = `${token}`;
	}
	// console.log("source", source);
	// console.log("axiosConfig", axiosConfig);
	const axiosInstance = axios.create(axiosConfig);

	// 202009090053: https://github.com/axios/axios#interceptors
	// 202009090107: Add json extension if local source
	if (source === "local") {
		// Request interceptor
		axiosInstance.interceptors.request.use(
			function(config) {
				config.url += ".json";
				// console.log("Request", config);
				// Do something before request is sent

				return config;
			},
			function(error) {
				// 202009090114: TODO: Add prompt on error?
				console.log("Request", error);
				// Do something with request error
				return Promise.reject(error);
			}
		);
	}

	// Response interceptor
	axiosInstance.interceptors.response.use(
		function(response) {
			console.log("Response", response);
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function(error) {
			if (showErrors && !$(".dx-dialog.dx-overlay:visible")) {
				// 202009090114: TODO: Add prompt on error?
				// console.clear();
				// console.log("Response", error);
				// console.log("error.response", error.response);
				let msg =
					"<span class='error'>" +
					error +
					"<textarea class='code'>" +
					JSON.stringify(error.response.config, null, 1) +
					"</textarea></span>";
				let myDialog = custom({
					showTitle: false,
					dragEnabled: false,
					class: "err",
					messageHtml: msg,
					buttons: [
						{
							text: "OK",
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
				});
				// Any status codes that falls outside the range of 2xx cause this function to trigger
				// Do something with response error
			}
			return Promise.reject(error);
		}
	);

	return axiosInstance;
};
