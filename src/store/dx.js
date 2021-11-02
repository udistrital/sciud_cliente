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
	o = {
		endPoint: null,
		key: ["id"],
		onLoading: null,
		onApiLoaded: null,
		onLoaded: null,
		loadBaseEntity: false,
		ids: null,
		state: null,
		faculties: null,
		members: null,
		cine: null,
		curricular: null,
		oecd: null,
		research: null,
		stringParam: null,
	}
) => {
	// let url = "http://localhost:4500/data/_tst5.json"
	return new CustomStore({
		key: o.key,
		loadMode: "processed", // "raw",
		load: async (loadOptions) => {
			let params = "?";
			// 202103120940: Agrega un parametro ids si se recibe el listado
			if (typeof o.ids !== "undefined" && o.ids !== null && o.ids.length > 0) params += `ids=${o.ids.join(",")}&`;
			// 202107040619: Se agrega el parámetro faculties
			if (typeof o.faculties !== "undefined" && o.faculties !== null && o.faculties.length > 0) params += `faculties=${o.faculties.join(",")}&`;

			// 202110110003: Se agrega el parámetro members
			if (typeof o.members !== "undefined" && o.members !== null && o.members.length > 0) params += `member_documents=${o.members.join(",")}&`;

			// 202110110003: Se agrega el parámetro cine
			if (typeof o.cine !== "undefined" && o.cine !== null && o.cine.length > 0) params += `cine_detailed_area_ids=${o.cine.join(",")}&`;

			// 202110110006: Se agrega el parámetro curricular
			if (typeof o.curricular !== "undefined" && o.curricular !== null && o.curricular.length > 0)
				params += `curricular_project_ids=${o.curricular.join(",")}&`;

			// 202110110007: Se agrega el parámetro oecd
			if (typeof o.oecd !== "undefined" && o.oecd !== null && o.oecd.length > 0) params += `oecd_discipline_ids=${o.oecd.join(",")}&`;

			// 202110110003: Se agrega el parámetro research
			if (typeof o.research !== "undefined" && o.research !== null && o.research.length > 0) params += `research_focus_ids=${o.research.join(",")}&`;

			// 202107040729: Agrega un parametro state si se recibe
			if (typeof o.state !== "undefined" && o.state !== null) params += `state=${o.state}&`;

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
