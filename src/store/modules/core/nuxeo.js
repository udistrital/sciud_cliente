/* eslint-disable no-unused-vars */
import vue from "vue";
import vuex from "vuex";
import axios from "axios";
import api from "@/store/api";
// 202104231325: https://nuxeo.github.io/nuxeo-js-client/latest/
import nux from "nuxeo";
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
		async upload({ commit, dispatch, state }, doc) {
			console.log(this._vm.$sep);
			console.log("upload =>", doc);
			let apiObj = api("oas");

			// Obtiene batchId
			let batchId = await apiObj.post(nuxeo_upload, {}).then((r) => {
				return r.data.batchId;
			});
			console.log("batchId", batchId);

			// Sube documento
			var formData = new FormData();
			formData.append(doc.name, doc);
			let uploadSuccess = await apiObj
				.post(`${nuxeo_upload}/${batchId}/0`, formData, {
					headers: {
						"X-File-Type": "application/pdf",
						"Content-Type": "multipart/form-data",
					},
				})
				.then((r) => {
					console.log("r", r);
					return r.status === 201;
				});
			console.log("uploadSuccess", uploadSuccess);
			let d = doc;
			if (uploadSuccess) {
				// Verifica el batch
				let uploadedFile = await apiObj.get(`${nuxeo_upload}/${batchId}`).then((r) => {
					return r.data[0];
				});
				console.log("uploadedFile", uploadedFile);

				// Asocia a workspace
				let uid = await apiObj
					.post(workspace, {
						"entity-type": "document",
						name: d.name,
						type: "File",
						properties: {
							"dc:title": d.title,
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
				let resDoc = {
					uid: uid,
					batchId: batchId,
					name: d.name,
					title: d.title,
					fileName: uploadedFile.name,
					fileSize: uploadedFile.size,
					workspace: workspace,
				};
				console.log("resDoc", resDoc);
				return resDoc;
			} else return false;
		},
		async get({ commit, dispatch, state }, doc) {
			console.log(this._vm.$sep);
			console.log("get =>", doc);
			let u = `https://documental.portaloas.udistrital.edu.co/nuxeo/nxfile/default/${doc.uid}/file:content/${doc.fileName}`;
			axios
				.get(u, {
					responseType: "blob" /* or responseType: 'arraybuffer'  */,
				})
				.then((r) => r.blob())
				.then((blobFile) => new File([blobFile], doc.fileName, { type: blobFile.type }));
			// return await api("oas")
			// 	.get(`${nuxeo_api}/id/${doc.uid}`)
			// 	.then(async (r) => {
			// 		let dDoc = r.data;
			// 		return await api("oas")
			// 			.get(`${dDoc.path}`)
			// 			.then((r) => {
			// 				let r1Doc = r.data;
			// 				// documental.portaloas.udistrital.edu.co/nuxeo/api/v1/path/desarrollo/workspaces/siciud/dummy.pdf.1619207263814
			// 				return r1Doc;
			// 			});
			// https://documental.portaloas.udistrital.edu.co/nuxeo/ui/bower_components/nuxeo-ui-elements/viewers/pdfjs/web/viewer.html?file=https://documental.portaloas.udistrital.edu.co/nuxeo/nxfile/default/57c602b3-f30b-414d-ab31-e14dca06a516/file:content/dummy.pdf
			// documental.portaloas.udistrital.edu.co/nuxeo/api/v1/path/desarrollo/workspaces/siciud/dummy.pdf.1619207263814

			// return doc;
			// });
			// let res = await api("oas")
			// 	.post(workspace, {
			// 		"entity-type": "document",
			// 		name: "myNewDoc",
			// 		type: "File",
			// 		properties: {
			// 			"dc:title": "My new doc",
			// 			"file:content": {
			// 				"upload-batch": "<myBatchId>",
			// 				"upload-fileId": "0",
			// 			},
			// 		},
			// 	})
			// 	.then((r) => {
			// 		console.log("r", r);
			// 		return r.status === 201;
			// 	});
			// 			POST /api/v1/path/default-domain/workspaces/myworkspace

			// let c = window.config.api.oas;
			// let t = window.sessionStorage.getItem(c.token_name);
			// console.log("t", t);
			// // https://documental.portaloas.udistrital.edu.co/nuxeo/api/v1/path/desarrollo/workspaces/siciud/dummy.pdf.1619198515933
			// // 202104231345: https://nuxeo.github.io/nuxeo-js-client/latest/
			// let nuxeo = new nux({
			// 	baseURL: "https://documental.portaloas.udistrital.edu.co/nuxeo",
			// 	apiPath: `${nuxeo_api}`,
			// 	auth: {
			// 		method: "bearerToken",
			// 		token: t,
			// 	},
			// });
			// nuxeo.schemas("*");
			// nuxeo.header("Access-Control-Allow-Origin", "*");
			// nuxeo.header("X-NXDocumentProperties", "*");
			// nx.header("Authorization", `Bearer ${t}`);
			// nuxeo
			// 	.request(`id/${doc.uid}`)
			// 	.get()
			// 	.then(async function(response) {
			// 		var aux = response.get("file:content");
			// 		console.log("response", response);
			// 		let doc = response;
			// 		let b = await doc.fetchBlob();
			// 		let blob = b.blob();
			// 		console.log("blob", blob);
			// 		return response;
			// 	})
			// 	.catch(function(error) {
			// 		console.log("error", error);
			// 	});
			// return defered.promise;
			// return await api("oas")
			// 	.get(`${nuxeo_api}/id/${doc.uid}`, {
			// 		// headers: {
			// 		// 	"X-NXDocumentProperties": "*",
			// 		// },
			// 	})
			// 	// .get(`${nuxeo_api}/id/${doc.uid}/@blob/blobholder%3A0`)
			// 	// .get(`${nuxeo_api}/id/${doc.uid}/@blob/file:content`)
			// 	.then((r) => {
			// 		let doc = new nuxeo.doc()
			// 		return r;
			// 	});
		},
	},
};

export default store;
