/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let speed = 500;
let $ = window.jQuery;
import Commands from "@/components/element/commands.vue";
import {
	DxAutocomplete,
	DxButton,
	DxDateBox,
	DxFileUploader,
	DxNumberBox,
	DxSelectBox,
	DxSwitch,
	DxTagBox,
	DxTextArea,
	DxTextBox,
	DxValidationGroup,
} from "devextreme-vue";
import {
	DxColumn,
	DxColumnChooser,
	DxDataGrid,
	DxFilterRow,
	DxGrouping,
	DxGroupItem,
	DxGroupPanel,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { DxRequiredRule, DxStringLengthRule, DxValidationRule, DxValidator } from "devextreme-vue/validator";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
	components: {
		Commands,
		DxAutocomplete,
		DxButton,
		DxColumn,
		DxColumnChooser,
		DxDataGrid,
		DxDateBox,
		DxFileUploader,
		DxFilterRow,
		DxGroupItem,
		DxGroupPanel,
		DxGrouping,
		DxLoadPanel,
		DxNumberBox,
		DxPager,
		DxPaging,
		DxRequiredRule,
		DxSearchPanel,
		DxSelectBox,
		DxSorting,
		DxStringLengthRule,
		DxSummary,
		DxSwitch,
		DxTagBox,
		DxTextArea,
		DxTextBox,
		DxValidationGroup,
		DxValidationRule,
		DxValidator,
	},
	props: {
		saveFn: {
			type: Function,
			default: null,
		},
		cancelFn: {
			type: Function,
			default: null,
		},
		loadedFn: {
			type: Function,
			default: null,
		},
	},
	data: () => ({
		OasUser: null,
		document: null,
		currentDocument: null,
		searchDisabled: true,
		password: "",
		role: {
			name: "",
		},
	}),
	mounted() {
		console.clear();
		this.loaderElement = ".card-body.grid";
		console.log("INTEGRANTES!");
		this.getDocuments();
		this.getRoles();
	},
	methods: {
		...mapActions("roles", { getRoles: "all" }),
		...mapActions("tercero", ["getOasUser", "getDocuments", "saveOasUser"]),
		formatDocument(cellInfo) {
			if (typeof cellInfo.value !== "undefined") {
				return cellInfo.value.split(/(?=(?:...)*$)/).join(".");
			}
		},
		validate() {
			var result = this.$refs.validationGroup.validate();
			this.isValid = result.isValid;
			return result.isValid;
		},
		save(e) {
			// console.clear();
			console.log(this.$sep);
			var result = this.$refs.instGroup.instance.validate();
			console.log("result", result);
			// this.isValid = result.isValid;
			// return result.isValid;
			// e.preventDefault();
			// console.log("e", e);
			// let result = e.validationGroup.validate();
			// console.log("result.isValid INST", result.isValid);
			// console.log(e.validationGroup.validators);
			if (result.isValid) {
				console.log("VALID!");
				if (this.$isFunction(this.saveFn)) this.saveFn(e.validationGroup);
			}
		},
		edit(e) {
			// console.log(this.$sep);
			// e.preventDefault();
			console.log("e", e);
			// if (this.$isFunction(this.cancelFn)) this.cancelFn(e.validationGroup);
		},
		enable(e) {
			// console.log(this.$sep);
			// e.preventDefault();
			console.log("e", e);
			// if (this.$isFunction(this.cancelFn)) this.cancelFn(e.validationGroup);
		},
		cancel(e) {
			console.log(this.$sep);
			// e.preventDefault();
			console.log("e", e);
			console.log("#grid length", $("#grid").length);
			if (this.$isFunction(this.cancelFn)) this.cancelFn(e.validationGroup);
		},
		searchKeyup(e) {
			// console.log(e);
			// const previousValue = e.previousValue;
			// const newValue = e.value;
			this.searchDisabled = e.value === null || e.value.toString().length <= 6;
		},
		addSave(e) {
			// this.document = null;
			// this.OasUser = null;
		},
		addCancel(e) {
			let root = this;
			$("#panel-user").slideUp(window.speed * 1.5, function() {
				setTimeout(function() {
					root.document = null;
					root.OasUser = null;
				}, 300);
			});
		},
		addSearch() {
			let root = this;
			let d = root.document.toString();
			if (!this.searchDisabled && d !== root.currentDocument) {
				root.loadShow("Buscando integrante");
				root.currentDocument = d;
				root.getOasUser({
					doc: d,
					cb: function(usr) {
						root.loadingVisible = false;
						if (typeof usr.Id !== "undefined") {
							root.loadHide();
							root.OasUser = usr;
							console.log("usuario", root.OasUser.TerceroId.NombreCompleto);
							setTimeout(function() {
								$("#panel-user").slideDown(window.speed, function() {});
							}, 100);
						} else {
							root.loadHide();
							$("#panel-user").slideUp(window.speed, function() {
								root.OasUser = null;
							});
						}
					},
				});
			}
		},
	},
	computed: {
		...mapState("unidad", ["members"]),
		...mapGetters("roles", { roles: "items" }),
		...mapGetters("usuario", ["items", "base"]),
		...mapGetters("tercero", ["user", "doc", "documents"]),
		noSearch() {
			return this.document.toString().length <= 6;
		},
	},
	watch: {
		some: function(val) {
			console.log(this.$sep);
			console.log("watch.some", val);
		},
	},
};
