// https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns
/* eslint-disable vue/no-unused-components */
let $ = window.jQuery;
import {
	DxButton,
	DxDateBox,
	DxFileUploader,
	DxSelectBox,
	DxSwitch,
	DxTagBox,
	DxTextArea,
	DxTextBox,
	DxValidationGroup,
} from "devextreme-vue";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import DataSource from "devextreme/data/data_source";
import Notify from "devextreme/ui/notify";
import { mapActions, mapGetters } from "vuex";

export default {
	name: "datosBasicos",
	props: {
		group: {
			type: Object,
			default: () => {},
		},
		saveFn: {
			type: Function,
			default: null,
		},
		cancelFn: {
			type: Function,
			default: null,
		},
	},
	components: {
		DxDateBox,
		DxFileUploader,
		DxValidator,
		DxButton,
		DxRequiredRule,
		DxSelectBox,
		DxSwitch,
		DxTagBox,
		DxTextArea,
		DxTextBox,
		DxValidationGroup,
	},
	data: () => ({
		files: [],
		isValid: false,
		postMount: false,
		placeholder: "Busque y seleccione...",
		formRefName: "tree-view",
		now: new Date(),
		cineDetallados: {},
		proyectos: new DataSource(),
		min: new Date(2000, 0, 1),
		tbProyectoDisabled: true,
		tbEspecificoDisabled: true,
		accept: "*.",
		multiple: false,
		uploadMode: "instantly",
		group_member: {
			role_id: 2,
			researcherId: 1,
			typeResearcher: "external",
		},
		grupoInterinstitucional: [
			{
				id: 1,
				value: true,
				name: "SI",
			},
			{
				id: 0,
				value: false,
				name: "NO",
			},
		],
		fileTypesSource: [
			{ name: "Documentos", value: "image/*" },
			{ name: "Videos", value: "video/*" },
		],
	}),
	mounted() {
		console.log(this.$sep);
		console.log("_basicos.vue mounted!");
		let root = this;
		this.postMount = false;
		this.loadingElement = "#data";
		this.loadingMessage = "Guardando Grupo<br/>de Investigación";
		this.getCine(
			this.getLineas(
				this.getFacultades(
					this.getTipos(
						this.getEstados(function(data) {
							// console.clear();
							console.log("Estados", data);
							console.log("root.group", root.group);
							console.log("unidadEstados", this.unidadEstados);
						})
					)
				)
			)
		);
	},
	computed: {
		...mapGetters("unidadTipo", { unidadTipos: "items" }),
		...mapGetters("unidadEstado", { unidadEstados: "items" }),
		...mapGetters("facultadProyecto", { facultades: "items" }),
		...mapGetters("lineaInvestigacion", { lineasInvestigacion: "items" }),
		...mapGetters("cine", {
			cEspecificos: "specific",
			cDetallados: "detailed",
		}),
		cineEspecificos() {
			console.log("this.cEspecificos", this.cEspecificos);
			console.log("this.cDetallados", this.cDetallados);
			return new DataSource({
				group: "cine_broad_area_name",
				store: {
					data: this.cEspecificos,
					key: "id",
					type: "array",
				},
				map: function(groupedItem) {
					// console.log(groupedItem);
					return groupedItem;
				},
			});
		},
	},
	methods: {
		...mapActions("cine", { getCine: "all" }),
		...mapActions("unidadTipo", { getTipos: "all" }),
		...mapActions("unidad", { setDocument: "setDocument" }),
		...mapActions("unidadEstado", { getEstados: "all" }),
		...mapActions("lineaInvestigacion", { getLineas: "all" }),
		...mapActions("facultadProyecto", { getFacultades: "all" }),
		getLink(docString) {
			var doc = JSON.parse(docString);
			console.log("doc", doc);
			// uid: uid,
			// batchId: batchId,
			// name: args.doc.name,
			// title: args.doc.title,
			// fileName: uploadedFile.name,
			// fileSize: uploadedFile.size,
			// let link = `https://documental.portaloas.udistrital.edu.co/nuxeo/nxfile/default/${doc.uid}/@blob/${doc.fileName}`;
			let link = `https://documental.portaloas.udistrital.edu.co/nuxeo/nxfile/default/${doc.uid}/file:content/${doc.fileName}`;
			return link;
		},
		validate() {
			var result = this.$refs.validationGroup.validate();
			this.isValid = result.isValid;
			return result.isValid;
		},
		save(e) {
			console.log(this.$sep);
			var result = this.$refs.basicGroup.instance.validate();
			console.log("result", result);
			if (result.isValid) {
				console.log("VALID!");
				if (this.$isFunction(this.saveFn)) this.saveFn(e.validationGroup);
			}
		},
		cancel(e) {
			// e.preventDefault();
			console.log("e", e);
			this.loadingVisible = true;
			if (this.$isFunction(this.cancelFn)) this.cancelFn(e.validationGroup);
		},
		onButtonClick() {
			Notify("Uncomment the line to enable sending a form to the server.");
			// const form = this.$refs[this.formRefName];
			// form.submit();
		},
		fileReady(e) {
			// console.clear();
			// console.log(e);
			var el = $(e.element);
			el.find(".dx-fileuploader-upload-button,.dx-fileuploader-input-container").hide();
			var btn = el.find(".dx-fileuploader-button.dx-button-has-text:first");
			btn
				.removeClass(
					"dx-fileuploader-button dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-text"
				)
				.addClass("btn btn-main btn-sm btn-labeled btn-labeled-left legitRipple w-100");
			// console.log(btn.html());
			btn.html('<b><i class="icon-link"></i></b>' + btn.find(".dx-button-text").html());
			// btn-labeled btn-labeled-left legitRipple
			// el.find(".dx-fileuploader-button").hide();
		},
		fileSelected(e) {
			let doc = { name: e.element.id, file: e.value[0] };
			this.setDocument(doc);
			// console.clear();
			console.log("doc", doc);
			// console.log(e);
			// var el = $(e.element);
			// var files = e.value;
			// if (files.length > 0) {
			// 	el.find(".btn").hide();
			// 	el.find(".dx-fileuploader-upload-button").hide();
			// 	el.find(".dx-fileuploader-input-wrapper").hide();
			// 	var ei = el.find(".dx-fileuploader-file-name");
			// 	// ei.html("<i class='icon-file-pdf'></i>&nbsp;" + ei.html());
			// 	var w = Math.round(el.parents(".form-grupo:first").width()) - 75;
			// 	// console.log("w", w);
			// 	// el.find(".dx-fileuploader-file-status-message").css({
			// 	//   width: "100%",
			// 	// });
			// 	ei.removeAttr("style").css({ "max-width": w + "px" });
			// } else {
			// 	el.find(".dx-fileuploader-input-wrapper").show();
			// 	el.find(".btn").show();
			// }
		},
		sbFacultadChange(e) {
			// console.clear();
			this.tbProyectoDisabled = true;
			console.log("value", e.value);
			console.log("facultades", this.facultades);
			if (typeof e.value !== "undefined") {
				var items = this.facultades.filter((o) => e.value.includes(o.Id));
				if (items.length > 0) {
					let opts = [];
					items.forEach((padre) => {
						padre.Opciones.forEach((opt) => {
							opts.push({ PadreId: padre.Id, PadreNombre: padre.Nombre, Id: opt.Id, Nombre: opt.Nombre });
						});
						console.log(padre.Nombre + ": " + padre.Opciones.length);
						console.log("Total", opts.length);
					});
					this.tbProyectoDisabled = false;
					let proyectosCurriculares = this.$objectSort(opts, "Nombre");
					console.log("proyectosCurriculares", proyectosCurriculares);
					this.proyectos = new DataSource({
						group: "PadreNombre",
						store: {
							key: "Id",
							type: "array",
							data: proyectosCurriculares,
						},
						map: function(groupedItem) {
							// console.log(groupedItem);
							return groupedItem;
						},
					});
					// console.log("proyectos", this.proyectos);
				}
			}
		},
		sbEspecificoChange(e) {
			var items = this.cDetallados.filter((o) => o.cine_specific_area_id === e.value);
			if (items.length > 0) {
				console.log(this.$sep);
				console.log(this.cEspecificos);
				var item = this.cEspecificos.filter((o) => o.id === e.value)[0];
				this.group.cine_broad_area_id = item.cine_broad_area_id;
				// this.group.cine_detailed_area_ids = [];
				items = this.$objectSort(items, "name");
				this.cineDetallados = items;
				this.tbEspecificoDisabled = false;
				// console.log("cineDetallados", this.cineDetallados);
			} else {
				this.tbEspecificoDisabled = true;
			}
		},
	},
};
