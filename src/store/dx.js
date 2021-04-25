/* eslint-disable no-unused-vars */
// https://js.devexpress.com/Documentation/ApiReference/Data_Layer/CustomStore
import api from "./api";
import CustomStore from "devextreme/data/custom_store";
const isNotEmpty = (value) => value !== undefined && value !== null && value !== "";
let baseEntity = null,
	args = [
		"filter",
		"group",
		// "groupSummary",
		"parentIds",
		"requireGroupCount",
		"requireTotalCount",
		"searchExpr",
		"searchOperation",
		"searchValue",
		"select",
		"skip",
		"sort",
		"take",
		"totalSummary",
		"userData",
	];
export default (
	o = { endPoint: null, key: ["id"], onLoading: null, onApiLoaded: null, onLoaded: null, loadBaseEntity: false, ids: null, stringParam: null }
) => {
	// let url = "http://localhost:4500/data/_tst5.json"
	return new CustomStore({
		key: o.key,
		loadMode: "processed", // "raw",
		load: async (loadOptions) => {
			let params = "?";
			// 202103120940: Agrega un parametro ids si se recibe el listado
			if (typeof o.ids !== "undefined" && o.ids.length > 0) params += `ids=${o.ids.join(",")}&`;
			if (typeof o.stringParam !== "undefined" && o.stringParam !== null) params += o.stringParam + "&";
			args.forEach(function(i) {
				if (i in loadOptions && isNotEmpty(loadOptions[i])) {
					params += `${i}=${JSON.stringify(loadOptions[i])}&`;
				}
			});
			params = params.slice(0, -1);
			return await api()
				.get(`${o.endPoint}${params}`)
				.then(async (r) => {
					if (r.data.data.length > 0 && baseEntity === null && o.loadBaseEntity) {
						console.log(window.vm.$sep);
						console.log("baseEntity!");
						let o = window.vm.$clone(r.data.data[0]);
						Object.keys(o).forEach(function(key, index) {
							let t = window.vm.$getType(o[key]);
							o[key] = t === "array" ? [] : null;
							// console.log(`${key} = ${t}`, o[key]);
						});
						baseEntity = o;
					}
					// console.clear();
					if (window.vm.$isFunction(o.onApiLoaded)) {
						return await o.onApiLoaded(r.data);
					} else {
						return r.data;
					}
				});
		},
		onModified: function() {
			console.log("onModified");
		},
		onPush: (changes) => {
			console.log("changes", changes);
		},
		onModifying: function() {
			console.log("onModifying");
		},
		onLoading: function(loadOptions) {
			console.log("onLoading", loadOptions);
			if (window.vm.$isFunction(o.onLoading)) o.onLoading(loadOptions);
		},
		totalCount: function(loadOptions) {
			console.log("totalCount", loadOptions);
		},
		onLoaded: function(result) {
			console.log("onLoaded", result);
			if (window.vm.$isFunction(o.onLoaded)) o.onLoaded(result, baseEntity);
		},
		byKey: (key) => {
			console.log("byKey", key);
			// Needed to process selected value(s) in the SelectBox, Lookup, Autocomplete, and DropDownBox
			return fetch(`https://mydomain.com/MyDataService?id=${key}`);
		},
	});
};
