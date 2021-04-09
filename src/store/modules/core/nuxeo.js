/* eslint-disable no-unused-vars */
import vue from "vue";
import vuex from "vuex";
import api from "@/store/api";
vue.use(vuex);

// 202011252239: Variables
let nuxeo_api = `nuxeo_api/v1`;
let nuxeo_upload = `${nuxeo_api}/upload`;
let workspace = `${nuxeo_api}/path/desarrollo/workspaces/siciud`;

// Store
const store = {
	namespaced: true,
	state: {
		batchId: null,
	},
	actions: {
		// 202011260031: Axios: chaining multiple API requests
		// https://stackoverflow.com/a/44185591
		async upload({ commit, dispatch, state }, args) {
			console.log(this._vm.$sep);
			let apiObj = api("oas");

			// Obtiene batchId
			let batchId = await apiObj.post(nuxeo_upload, {}).then((r) => {
				return r.data.batchId;
			});
			console.log("batchId", batchId);

			// Sube documento
			var formData = new FormData();
			formData.append(args.doc.name, args.doc.file);
			let uploadSuccess = await apiObj
				.post(`${nuxeo_upload}/${batchId}/0`, formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((r) => {
					return r.status === 201;
				});
			console.log("uploadSuccess", uploadSuccess);

			if (uploadSuccess) {
				// Verifica el batch
				let uploadedFile = await api("oas")
					.get(`${nuxeo_upload}/${batchId}`)
					.then((r) => {
						return r.data[0];
					});
				console.log("uploadedFile", uploadedFile);

				// Asocia a workspace
				let uid = await api("oas")
					.post(workspace, {
						"entity-type": "document",
						name: args.doc.name,
						type: "File",
						properties: {
							"dc:title": args.doc.title,
							"file:content": {
								"upload-batch": batchId,
								"upload-fileId": "0",
							},
						},
					})
					.then((r) => {
						return r.data.uid;
					});
				console.log("uid", uid);

				let doc = {
					uid: uid,
					batchId: batchId,
					name: args.doc.name,
					title: args.doc.title,
					fileName: uploadedFile.name,
					fileSize: uploadedFile.size,
				};
				console.log("doc", doc);
				return doc;
			} else return false;
		},
	},
	// mutations: {
	// 	SetBatch(state, args) {
	// 		console.log("args", args);
	// 		state.batchId = args.data.batchId;
	// 		console.log("batchId", state.batchId);
	// 		if (this._vm.$isFunction(args.cb)) args.cb(args.data);
	// 	},
	// },
	// getters: {
	// 	batchId: (state, getters) => {
	// 		return state.batchId;
	// 	},
	// },
};

export default store;
