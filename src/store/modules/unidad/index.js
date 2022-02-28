/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
import vue from "vue";
import vuex from "vuex";
import api from "@/store/api";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		item: null,
		items: [],
		states: [],
		types: [],
		documents: [],
		userPeriods: [],
		currentItems: [],
		researchGroups: [],
		researchNetworks: [],
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
		getResearchNetworks({ commit, state }, args) {
			if (state.researchNetworks.length <= 0) {
				api()
					.get(`research_networks?filter=["active","=",1]&skip=0&take=100000&sort=[{"selector":"name","desc":false}]`)
					.then((r) => {
						commit("SetState", { name: "researchNetworks", data: r.data.data });
					});
			}
		},
		getGroups({ commit, state }, args) {
			if (state.researchGroups.length <= 0) {
				api()
					.get(`research_units?filter=[["group_state_id","=",1],"and",["group_type_id","=",3]]&skip=0&take=100000&sort=[{"selector":"name","desc":false}]`)
					.then((r) => {
						commit("SetState", { name: "researchGroups", data: r.data.data });
					});
			}
		},
		// 202104111004: Guarda una unidad en el estado
		setUnit({ commit, state }, unidad) {
			// console.clear();
			state.item = unidad;
			console.log("setUnit", state.item);
		},
		// 202104110615: Obtiene la información de una unidad
		getUnit({ commit, dispatch, state }, args) {
			console.log("getUnit", args);
			if (state.item !== null && state.item.id.toString() === args.id.toString()) {
				console.log("getUnit encontrado!", state.item);
				return args.cb(state.item);
			}
			api()
				.get(`research_units/${args.id}`)
				.then((r) => {
					state.item = r.data;
					return args.cb(r.data);
				});
		},
		// // 202103291114: Carga los estados de las unidades
		// async getStates({ commit, dispatch, state }, unidadId) {
		// 	state.loading = true;
		// 	if (state.types.length <= 0)
		// 		api()
		// 			.get(`types/1/subtypes`)
		// 			.then((r) => {
		// 				commit("setStates", r.data);
		// 			});
		// },
		// // 202103291107: Carga los tipos de unidades
		// async getTypes({ commit, dispatch, state }, unidadId) {
		// 	state.loading = true;
		// 	if (state.types.length <= 0)
		// 		api()
		// 			.get(`types/2/subtypes`)
		// 			.then((r) => {
		// 				commit("setTypes", r.data);
		// 			});
		// },
		getResearchers({ commit, dispatch, state }, args) {
			// let o = state.researchGroups.find((o) => o.id === args.id);
			// if (typeof o !== "undefined") {
			// 	console.log(window.vm.$sep);
			// 	console.log("RESEARCH GROUP FROM STATE!", o);
			// 	args.cb(o);
			// } else
			api()
				.get(`research_units/${args.id}/group_member`)
				.then((r) => {
					let o = { id: args.id, researchers: r.data };
					// state.researchGroups.push(o);
					// console.log(window.vm.$sep);
					// console.log("RESEARCH GROUP FROM API!", o);
					args.cb(o);
				});
		},
		async getMembers({ commit, dispatch, state }, group_id) {
			state.loading = true;
			return await api()
				.get(`research_units/${group_id}/group_member`)
				.then((r) => {
					return r.data;
				});
		},
		// 202105280535: Obtiene un investigador
		async getResearcher({ commit, state, dispatch }, id) {
			return await api()
				.get(`researchers?identification_number=${id}`)
				.then((r) => {
					return r.data;
				});
		},
		// 202103171451: Guarda un investigador
		async saveResearcher({ commit, state, dispatch }, item) {
			return await api()
				.post(`researchers`, { researcher: item })
				.then((r) => {
					return r.data;
				});
		},
		// 202104111338: Actualiza un investigador
		async updateResearcher({ commit, state, dispatch }, item) {
			return await api()
				.put(`researchers/${item.id}`, { researcher: item })
				.then((r) => {
					return r.data;
				});
		},
		// 202103171451: Guarda un investigador
		async addGroupMember({ commit, state, dispatch }, args) {
			return await api()
				.post(`research_units/${args.group_id}/group_member/`, { group_member: args.item })
				.then((r) => {
					return r.data;
				});
		},
		// 202103171451: Guarda un investigador
		async updateGroupMember({ commit, state, dispatch }, args) {
			return await api()
				.put(`research_units/${args.group_id}/group_member/${args.item.id}`, { group_member: args.item })
				.then((r) => {
					return r.data;
				});
		},
		//#region Periodos
		// 202103171451: Guarda un investigador
		async addPeriod({ commit, state, dispatch }, args) {
			return await api()
				.post(`group_member/${args.group_member_id}/gm_periods`, { gm_period: args.gm_period })
				.then((r) => {
					return r.data;
				});
		},
		// 202107011423: Actualiza un periodo
		async updatePeriod({ commit, state, dispatch }, gm_perdiod) {
			return await api()
				.put(`gm_periods/${gm_perdiod.id}`, { gm_period: gm_perdiod })
				.then((r) => {
					return r.data;
				});
		},
		// 202107011423: Actualiza un periodo
		async activatePeriod({ commit, state, dispatch }, gm_perdiod) {
			return await api()
				.patch(`gm_periods/${gm_perdiod.id}`, { gm_period: gm_perdiod })
				.then((r) => {
					return r.data;
				});
		},
		// 202107011641: Obtiene los periodos de un integrante
		getPeriods({ getters, state }, args) {
			api()
				.get(`group_member/${args.group_member_id}/gm_periods?requireTotalCount=true&sort=[{"selector":"id","desc":true}]`)
				.then((r) => {
					args.cb(r.data);
				});
		},
		// 202107010439: Obtiene los periodos de un integrante (con estado)
		getPeriodsState({ getters, state }, args) {
			// Verifica que el usuario no exista ya en el state
			let item = getters.getPeriods(args.group_member_id);
			console.clear();
			console.log("item =>", item);
			if (typeof item === "undefined") {
				api()
					.get(`group_member/${args.group_member_id}/gm_periods?requireTotalCount=true`)
					.then((r) => {
						state.userPeriods.push({
							group_member_id: args.group_member_id,
							periods: r.data,
						});
						args.cb(r.data);
					});
			} else {
				args.cb(item.periods);
			}
		},
		//#endregion
		// 202010282329: Async https://stackoverflow.com/a/63997702
		async getMembersOas({ commit, dispatch, state }, args) {
			console.log(window.vm.$sep);
			console.log("getMembersOas");
			for (let index = 0; index <= args.data.length; index++) {
				if (index < args.data.length) {
					const user = args.data[index];
					// 202011252358: VueX - Dispatch action in a different module from an action
					// https://stackoverflow.com/a/54387973
					console.log("FIELD", user["researcher.identification_number"]);
					let details = await dispatch("auth/usuario/getOasUser", { doc: user.researcher.identification_number }, { root: true });
					console.log("details", details);
					user["oas_details"] = details;
					console.log("complete user", user);
				} else {
					console.log("FINAL DATA", args.data);
					commit("SetMembers", args);
				}
			}
		},
		async saveUnit({ commit, dispatch, state }, args) {
			state.loading = true;

			// 202011260003: Sube documentos
			for (let index = 0; index < state.documents.length; index++) {
				let doc = state.documents[index];
				console.log(`doc ${index}`, doc);

				// Establece el título
				let t = "Acta CIDC";
				if (doc.name === "establishment_document") t = "Documento Constitución";
				else if (doc.name === "faculty_act_document") t = "Acta Facultad";
				let title = `${args.unidad.id} - ${args.unidad.group_type_name} - ${this._vm.$titleCase(args.unidad.name)} (${t})`;
				doc["title"] = title;

				// Sube el documento
				let uploadedDoc = await dispatch("nuxeo/upload", { doc: doc }, { root: true });
				args.unidad[doc.name] = JSON.stringify(uploadedDoc);
				console.log("uploadedDoc", uploadedDoc);
			}

			// 202011260110: Guarda la unidad
			// 202105311400: Creando unidad
			if (args.unidad.id === null) {
				// 202010271455: Crear unidad => Se corrige error al enviar unidad enviando 'research_group'
				api()
					.post("research_units", {
						research_group: args.unidad,
					})
					.then((r) => {
						commit("Done", { data: r.data, callback: args.callback });
					});
			} else {
				// Actualizar unidad
				// 202010271455: Se corrige error al enviar unidad enviando 'research_group'
				api()
					.put("research_units/" + args.unidad.id, {
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
			var d = state.documents.find((d) => d.type_id === doc.type_id);
			if (typeof d !== "undefined") {
				console.log("UPDATE DOC!");
				d.file = doc.file;
			} else {
				console.log("ADD DOC!");
				state.documents.push(doc);
			}
			console.log("state.documents AFTER", state.documents);
		},
		// 202104110625: Almacena en el estado las unidades actuales de la grilla
		setCurrentGroups({ commit, dispatch, state }, items) {
			state.currentItems = items;
		},
	},
	mutations: {
		setTypes(state, types) {
			state.types = types;
			state.loading = false;
		},
		setStates(state, states) {
			state.states = states;
			state.loading = false;
		},
		setResearchGroup(state, args) {
			console.log(window.vm.$sep);
			let g = { id: args.id, items: args.items };
			state.researchGroups.push(g);
			console.log("setResearchGroup", state.researchGroups);
			return args.cb(g);
		},
		SetMembers(state, args) {
			console.log("SetMembers", args);
			state.members = args.data;
			state.loading = false;
			if (this._vm.$isFunction(args.callback)) args.callback(args.data);
		},
		SetState(state, args) {
			args.data.forEach((item) => {
				item.name = window.vm.$capitalize(item.name);
			});
			console.log("args.data =>", args.data);
			state[args.name] = args.data;
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
		getPeriods: (state) => (group_member_id) => {
			return state.userPeriods.find((o) => o.group_member_id.toString() === group_member_id.toString());
		},
		researchers: (state, getters) => (unidadId) => {
			let result = null;
			state.researchGroups.forEach((group) => {
				if (group.unidadId === unidadId) {
					result = group.items;
					return;
				}
			});
			return result;
		},
		members: (state, getters) => {
			return state.members;
		},
		types: (state, getters) => {
			return state.types;
		},
		states: (state, getters) => {
			return state.states;
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
