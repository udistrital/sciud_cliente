/* eslint-disable no-unused-vars */
import CustomStore from "devextreme/data/custom_store";
import api from "./api";
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
export default (o = { endPoint: null, key: ["id"], onLoading: null, onLoaded: null, loadBaseEntity: false }) => {
	// let url = "http://localhost:4500/data/_tst5.json"
	return new CustomStore({
		key: o.key,
		loadMode: "processed", // "raw",
		load: (loadOptions) => {
			let params = "?";
			args.forEach(function(i) {
				if (i in loadOptions && isNotEmpty(loadOptions[i])) {
					params += `${i}=${JSON.stringify(loadOptions[i])}&`;
				}
			});
			params = params.slice(0, -1);
			return api()
				.get(`${o.endPoint}${params}`)
				.then((r) => {
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
					return r.data;
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
