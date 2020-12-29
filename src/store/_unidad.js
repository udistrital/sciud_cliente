/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
import vue from "vue";
import vuex from "vuex";
import api from "./api";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		items: [],
		documents: [],
		members: [],
		loading: true,
		baseEntity: null,
	},
	actions: {
		all({ commit, state }, args) {
			if (state.items.length <= 0) {
				api()
					.get("research_unit")
					.then((r) => {
						commit("SetData", r.data);
					});
			}
		},
		getMembers({ commit, dispatch, state }, args) {
			state.loading = true;
			api()
				.get(`research_group/${args.unidadId}/group_member`)
				.then((r) => {
					args["data"] = r.data;
					dispatch("getMembersOas", args);
				});
		},
		// 202010282329: Async https://stackoverflow.com/a/63997702
		async getMembersOas({ commit, dispatch, state }, args) {
			console.log(window.vm.$sep);
			console.log("getMembersOas");
			for (let index = 0; index <= args.data.length; index++) {
				if (index < args.data.length) {
					const user = args.data[index];
					// 202011252358: VueX - Dispatch action in a different module from an action
					// https://stackoverflow.com/a/54387973
					let details = await dispatch(
						"tercero/getOasUser",
						{ doc: user.researcher.identification_number },
						{ root: true }
					);
					console.log("details", details);
					user["oas_details"] = details;
					console.log("complete user", user);
				} else {
					console.log("FINAL DATA", args.data);
					commit("SetMembers", args);
				}
			}
		},
		clearMembers({ commit, dispatch, state }, args) {
			state.loading = false;
			state.members = [];
		},
		async save({ commit, dispatch, state }, args) {
			state.loading = true;

			// 202011260003: Sube documentos
			for (let index = 0; index < state.documents.length; index++) {
				let doc = state.documents[index];
				console.log(`doc ${index}`, doc);

				// Establece el título
				let t = "Acta CIDC";
				if (doc.name === "establishment_document") t = "Documento Constitución";
				else if (doc.name === "faculty_act_document") t = "Acta Facultad";
				let title = `${args.unidad.id} - ${args.unidad.group_type_name} - ${this._vm.$titleCase(
					args.unidad.name
				)} (${t})`;
				doc["title"] = title;

				// Sube el documento
				let uploadedDoc = await dispatch("nuxeo/upload", { doc: doc }, { root: true });
				args.unidad[doc.name] = JSON.stringify(uploadedDoc);
				console.log("uploadedDoc", uploadedDoc);
			}

			// 202011260110: Guarda la unidad
			if (args.unidad.id.toString() === "0") {
				// Crear unidad
				// 202010271455: Se corrige error al enviar unidad enviando 'research_group'
				api()
					.post("research_group", {
						research_group: args.unidad,
					})
					.then((r) => {
						commit("Done", { data: r.data, callback: args.callback });
					});
			} else {
				// Actualizar unidad
				// 202010271455: Se corrige error al enviar unidad enviando 'research_group'
				api()
					.put("research_group/" + args.unidad.id, {
						research_group: args.unidad,
					})
					.then((r) => {
						commit("Done", { data: r.data, callback: args.callback });
					});
			}
		},
		setDocument({ commit, state }, doc) {
			// console.clear();
			// 202010211606: Establece un documento en la colección
			let exists = false;
			console.log(window.vm.$sep);
			console.log("setDocument", doc);
			console.log("state.documents BEFORE", state.documents);
			state.documents.forEach((document) => {
				if (document.name === doc.name) {
					document.file = doc.file;
					console.log("UPDATE DOC!");
					exists = true;
				}
			});
			if (!exists) {
				console.log("ADD DOC!");
				state.documents.push(doc);
			}
			console.log("state.documents AFTER", state.documents);
		},
	},
	mutations: {
		SetMembers(state, args) {
			console.log("SetMembers", args);
			state.members = args.data;
			state.loading = false;
			if (this._vm.$isFunction(args.callback)) args.callback(args.data);
		},
		SetData(state, data) {
			// console.log("window.vm", window.vm);
			if (state.baseEntity === null && data.length > 0) {
				console.log(window.vm.$sep);
				console.log("baseEntity!");
				let o = data[0];
				Object.keys(o).forEach(function(key, index) {
					let t = window.vm.$getType(o[key]);
					console.log(`${key} = ${t} = ${o[key]}`);
					// key: the name of the object key
					// index: the ordinal position of the key within the object
				});
			}
			data.forEach((item) => {
				item["research_focus_ids"] = item.research_focus_id;
				item["cidc_registration_date_string"] = item.cidc_registration_date;
				item.cidc_registration_date = window.vm.$getDate(item.cidc_registration_date);
				item["faculty_registration_date_string"] = item.faculty_registration_date;
				item.faculty_registration_date = window.vm.$getDate(item.faculty_registration_date);
				if (item.cidc_act_document !== null) item.cidc_act_document = JSON.parse(item.cidc_act_document);
				if (item.establishment_document !== null) item.establishment_document = JSON.parse(item.establishment_document);
				if (item.faculty_act_document !== null) item.faculty_act_document = JSON.parse(item.faculty_act_document);
			});
			console.log("data", data);
			state.items = data;
			state.loading = false;
		},
		Done(state, args) {
			state.documents = [];
			state.loading = false;
			if (this._vm.$isFunction(args.callback)) args.callback(args.data);
		},
	},
	getters: {
		members: (state, getters) => {
			return state.members;
		},
		baseEntity: (state, getters) => {
			console.log("state.items", state.items);
			if (state.baseEntity !== null) {
				state.baseEntity.cidc_registration_date = new Date();
				state.baseEntity.faculty_registration_date = new Date();
			}
			return state.baseEntity;
		},
		items: (state, getters) => {
			return state.items;
		},
		documents: (state, getters) => {
			return state.documents;
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
