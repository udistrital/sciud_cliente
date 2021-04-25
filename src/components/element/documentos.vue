<template>
	<div class="col p-0 m-0 docs slide" :id="id">
		<DxValidationGroup ref="basicGroup">
			<div class="row data slide" v-if="editMode">
				<div class="col">
					<div class="card">
						<div class="card-header main">Agregar Documento</div>
						<div class="card-body mb-0 pb-0 pt-3">
							<DxValidationGroup ref="vGroup">
								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label>Tipo:</label>
											<DxSelectBox
												:grouped="false"
												:data-source="documentTypes"
												:value.sync="baseObj.document_type_id"
												:search-enabled="false"
												placeholder="Seleccione..."
												class="form-control"
												display-expr="st_name"
												value-expr="id"
											>
												<DxValidator>
													<DxRequiredRule />
												</DxValidator>
											</DxSelectBox>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label>Nombre:</label>
											<DxTextBox :value.sync="baseObj.doc_name" placeholder="Nombre(s)" class="form-control" :read-only="false" mode="text">
												<DxValidator>
													<DxRequiredRule />
												</DxValidator>
											</DxTextBox>
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group file-container">
											<label>Documento:</label>
											<!-- <a href="#" id="a-doc-link" @click.prevent="documentShow()" class="btn btn-main btn-sm btn-labeled btn-labeled-left legitRipple w-100">
												<b><i class="icon-link"></i></b> OBSERVAR DOCUMENTO
											</a> -->
											<a :href="docLink" id="a-doc-link" target="_blank" class="btn btn-main btn-sm btn-labeled btn-labeled-left legitRipple w-100">
												<b><i class="icon-link"></i></b> OBSERVAR DOCUMENTO
											</a>
											<DxFileUploader id="document" ref="uploader" />
											<label class="error slide" id="file-error">Requerido</label>
										</div>
									</div>
								</div>
							</DxValidationGroup>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col">
									<a href="#" id="btn-cancel" @click.prevent="documentCancel" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
										<b><i class="icon-database-remove"></i></b> CANCELAR
									</a>
								</div>
								<div class="col text-right">
									<a href="#" id="btn-save" @click.prevent="documentSave" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
										<b><i class="icon-database-add"></i></b> GUARDAR
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DxValidationGroup>
		<div class="row grid">
			<div class="col">
				<div class="row">
					<div class="col">
						<a href="#" id="btn-doc-add" @click.prevent="documentAdd" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple slide">
							<b><i class="icon-database-add"></i></b> NUEVO DOCUMENTO
						</a>
						<DxDataGrid
							class="main"
							width="100%"
							:dataSource="dataSource"
							@initialized="gridInit"
							no-data-text="No hay documentos registrados"
							:allow-column-reordering="false"
							:remote-operations="true"
							:hover-state-enabled="true"
							:row-alternation-enabled="true"
							:show-borders="false"
						>
							<DxExport :enabled="false" />
							<DxColumnChooser :enabled="false" mode="dragAndDrop" />
							<DxSorting mode="single" /><!-- single, multiple, none" -->
							<DxPaging :page-size="10" />
							<!-- <DxFilterRow :visible="false" /> -->
							<DxLoadPanel :enabled="false" />
							<DxGroupPanel :visible="true" :allow-column-dragging="true" />
							<DxGrouping :auto-expand-all="false" />
							<DxSummary>
								<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
							</DxSummary>
							<DxPager
								:visible="true"
								:show-info="true"
								:show-page-size-selector="false"
								:show-navigation-buttons="true"
								:allowed-page-sizes="dgPageSizes"
								info-text="{2} documentos (página {0} de {1})"
							/>
							<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
							<DxColumn
								:allow-grouping="false"
								:allow-filtering="false"
								:allow-search="false"
								:allow-sorting="true"
								sort-order="asc"
								:width="120"
								alignment="center"
								caption="ID"
								data-field="id"
								data-type="string"
							/>
							<DxColumn
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="false"
								:customize-text="nullText"
								alignment="center"
								caption="Nombre"
								data-field="doc_name"
								data-type="string"
							/>
							<DxColumn
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="false"
								:customize-text="nullText"
								alignment="center"
								caption="Tipo"
								data-field="document_type_name"
								data-type="string"
							/>
							<DxColumn
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="false"
								:customize-text="nullText"
								alignment="center"
								caption="Documento"
								data-field="doc_path"
								data-type="string"
								:encode-html="false"
								:calculate-cell-value="documentLink"
							/>
							<DxColumn
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="false"
								:customize-text="$formatSize"
								alignment="center"
								caption="Tamaño"
								data-field="doc_size"
								data-type="int"
							/>
							<DxColumn :width="100" data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" />
							<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editMode" />
							<template #tpl="{ data }">
								<span class="cmds">
									<a title="Editar documento..." class="cmd-item color-main-600" @click.prevent="documentEdit(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a>
								</span>
							</template>
						</DxDataGrid>
					</div>
				</div>
			</div>
		</div>
		<DxPopup :visible="popupVisible" :drag-enabled="false" :close-on-outside-click="false" :show-title="true" width="90%" height="90%" title="Documento">
			<iframe :src="docLink" title="Documento"></iframe>
		</DxPopup>
	</div>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root;
let $ = window.jQuery;
import { mapGetters, mapActions } from "vuex";
import {
	DxColumn,
	DxColumnChooser,
	DxExport,
	DxDataGrid,
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
import { DxButton, DxPopup, DxSelectBox, DxSwitch, DxTextBox, DxNumberBox, DxValidationGroup, DxFileUploader } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import DxStore from "@/store/dx";
export default {
	name: "datosBasicos",
	components: {
		DxPopup,
		DxTextBox,
		DxButton,
		DxFileUploader,
		DxColumn,
		DxColumnChooser,
		DxDataGrid,
		DxExport,
		DxValidationGroup,
		DxGrouping,
		DxGroupItem,
		DxGroupPanel,
		DxLoadPanel,
		DxNumberBox,
		DxNumberBoxButton,
		DxPager,
		DxPaging,
		DxRequiredRule,
		DxSearchPanel,
		DxSelectBox,
		DxSorting,
		DxSummary,
		DxSwitch,
		DxValidator,
	},
	data: () => ({
		actionTitle: null,
		baseEnt: null,
		btnCancel: null,
		btnDocAdd: null,
		btnDocLink: null,
		btnDocSelect: null,
		current: null,
		docLink: null,
		documentTypes: [],
		documentTypesCurrent: [],
		editing: false,
		file: null,
		fileError: null,
		grid: null,
		groupResearchers: [],
		isValid: false,
		loading: false,
		panelCmds: null,
		panelDataDoc: null,
		panelGridDoc: null,
		panelMain: null,
		popupVisible: false,
		uploader: null,
		baseObj: {
			created_by: null,
			doc_name: null,
			doc_path: null,
			doc_size: null,
			document_type_id: null,
			nuxeo_id: null,
			updated_by: null,
		},
	}),
	created() {
		root = this;
		console.log("root.tipos", root.tipos);
	},
	mounted() {
		console.log(root.$sep);
		console.log("Documents MOUNTED!");
		root.baseEnt = this.$clone(root.baseObj);
		root.panelMain = "#" + root.id;
		root.loaderElement = root.panelMain;
		root.loaderMessage = "Cargando Documentos";
		root.panelDataDoc = root.panelMain + " .data";
		root.panelGridDoc = root.panelMain + " .grid";
		root.btnDocAdd = root.panelMain + " #btn-doc-add";
		if (root.showOnLoad) $(root.panelMain).fadeIn();
		setTimeout(function() {
			root.fileError = $(root.panelDataDoc + " #file-error");
			root.btnDocLink = $(root.panelDataDoc + " #a-doc-link");
			root.actionTitle = $(root.panelDataDoc + " .card-header");
			// 202104230923: https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileUploader/
			root.uploader = root.$refs.uploader.instance;
			if ($("#panel-produccion").length > 0) {
				root.loaderElement = $("#panel-produccion .card-body");
			}
			root.uploader.option({
				labelText: "",
				width: "100%",
				uploadMode: "useForm",
				// accept: "document/*.pdf",
				maxFileSize: 4000000,
				selectButtonText: "SELECCIONAR DOCUMENTO",
				allowedFileExtensions: [".pdf"],
				// elementAttr: {
				// 	id: "kuki",
				// 	class: "w-100",
				// },
				onInitialized: (e) => {
					console.log("onInitialized", e);
				},
				onValueChanged: (e) => {
					console.log("onValueChanged", e);
					root.fileError.hide();
					root.file = e.value.length > 0 ? e.value[0] : null;
					console.log("root.file", root.file);
					let saveBtn = $(root.panelDataDoc + " #btn-save");
					let errors = $(e.element).find(".dx-fileuploader-file-status-message span");
					if (errors.length > 0) {
						console.log(`HAS ${errors.length} ERRORS!!`);
						saveBtn.disable();
					} else {
						saveBtn.enable();
					}
				},
				onContentReady: (e) => {
					console.log("FileUploader onContentReady", e);
					var el = $(e.element);
					el.find(".dx-fileuploader-upload-button,.dx-fileuploader-input-container").hide();
					root.btnDocSelect = el.find(".dx-fileuploader-button.dx-button-has-text:first");
					let b = root.btnDocSelect;
					root.btnDocSelect.removeAttr("class").addClass("btn btn-main btn-sm btn-labeled btn-labeled-left legitRipple w-100");
					if (root.btnDocSelect.find("i").length <= 0)
						root.btnDocSelect.html('<b><i class="icon-file-pdf"></i></b><span>' + root.btnDocSelect.find(".dx-button-text").text() + "</span>");
				},
			});
		}, 500);
	},
	computed: {
		...mapGetters("unidad", ["researchers"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
		ep: () => {
			return `${root.endPoint}/${root.mainObj.id}/documents`;
		},
		dataSource: function() {
			// console.clear();
			console.log("root.ep", root.ep);
			console.log("root.mainObj", root.mainObj);
			if (typeof root.mainObj.id === "undefined" || root.mainObj.id === null) return null;
			return DxStore({
				key: ["id"],
				endPoint: root.ep,
				loadBaseEntity: false,
				onLoading: function() {
					root.loaderShow();
				},
				onLoaded: function(results) {
					// console.clear();
					console.log(root.$sep);
					console.log("GRID LOADED!!");
					root.documentTypesCurrent = [];
					results.data.forEach((o) => {
						root.documentTypesCurrent.push(o.document_type_id);
					});
					console.log("root.documentTypesCurrent", root.documentTypesCurrent);
					root.documentTypeFilter(function() {
						root.loaderHide();
					});
				},
			});
		},
	},
	props: {
		showOnLoad: {
			type: Boolean,
			default: false,
		},
		mainObj: {
			type: Object,
			default: () => null,
		},
		tipos: {
			type: Array,
			default: () => [],
		},
		endPoint: {
			type: String,
			default: () => null,
		},
		lockElement: {
			type: String,
			default: () => null,
		},
		id: {
			type: String,
			default: () => null,
		},
	},
	methods: {
		...mapActions("core/nuxeo", ["upload", "get"]),
		...mapActions("unidad/documentos", ["save", "update", "documents"]),
		documentLink: (data) => {
			let d = JSON.parse(data.doc_path);
			let dl = `https://documental.portaloas.udistrital.edu.co/nuxeo/nxfile/default/${d.uid}/file:content/${d.fileName}`;
			return `<a href="${dl}" target="_blank" class="color-main-600 font-weight-semibold"><i class="icon-link"></i> OBSERVAR</a>`;
		},
		documentShow: async () => {
			let d = root.current;
			console.log("root.current", d);
			root.docLink = `https://documental.portaloas.udistrital.edu.co/nuxeo/nxfile/default/${d.uid}/file:content/${d.fileName}`;
			root.popupVisible = true;
		},
		documentEdit: async (data) => {
			root.editing = true;
			root.baseObj = data;
			console.log("data", data);
			root.current = data;
			root.fileError.hide();
			console.log("root.current", root.current);
			root.documentTypes = root.tipos;
			// let blob = await root.get(doc);
			// let d = JSON.parse(root.current.doc_path);
			root.docLink = `https://documental.portaloas.udistrital.edu.co/nuxeo/nxfile/default/${root.current.nuxeo_id}`;
			root.btnDocLink.show();
			console.log("root.btnDocSelect", root.btnDocSelect);
			root.actionTitle.html("Editar Documento");
			root.btnDocSelect.find("span:first").text("CAMBIAR DOCUMENTO");
			root.documentTypeFilter(function() {
				$(root.panelGridDoc).fadeOut(function(params) {
					$(root.panelDataDoc).fadeIn();
				});
			});
		},
		documentAdd() {
			// console.clear();
			console.log("documentAdd");
			root.editing = false;
			root.fileError.hide();
			root.btnDocLink.hide();
			root.baseObj = root.baseEnt;
			root.actionTitle.html("Nuevo Documento");
			root.btnDocSelect.find("span:first").text("SELECCIONAR DOCUMENTO");
			root.documentTypeFilter(function() {
				$(root.panelGridDoc).fadeOut(function(params) {
					$(root.panelDataDoc).fadeIn();
				});
			});
		},
		documentCancel(gridRefresh = false) {
			$(root.panelDataDoc).fadeOut(function(params) {
				root.file = null;
				root.current = null;
				root.editing = false;
				root.fileError.hide();
				root.baseObj = root.baseEnt;
				if (gridRefresh === true) root.grid.refresh();
				else root.loaderHide();
				$(root.panelGridDoc).fadeIn(function(params) {
					root.$refs.uploader.instance.reset();
					root.$refs.vGroup.instance.reset();
				});
			});
		},
		documentSave: async () => {
			let fUploaded = null;
			let point = `${root.ep}`;
			root.fileError.hide();
			let result = root.$refs.vGroup.instance.validate();
			if (result.isValid) {
				// 202104242237: Valida la presencia de un archivo si es un doc nuevo
				if (root.current === null && root.file == null) {
					console.log("root.uploader", root.uploader);
					root.fileError.show();
					return false;
				}
				root.loaderShow("Guardando Documento", root.panelDataDoc);
				if (root.editing) {
					point += `/${root.baseObj.id}`;
					root.baseObj.updated_by = root.user_id;
				} else {
					root.baseObj.created_by = root.user_id;
				}
				if (root.file !== null) {
					console.log("root.tipos", root.tipos);
					console.log("root.file", root.file);
					root.file["title"] = root.tipos.find((o) => o.id === root.baseObj.document_type_id).st_name;
					fUploaded = await root.upload(root.file);
				}
				if (fUploaded !== null) {
					root.baseObj.nuxeo_id = fUploaded.uid;
					root.baseObj.doc_size = fUploaded.fileSize;
					root.baseObj.doc_path = JSON.stringify(fUploaded);
				}
				var dto = {
					url: point,
					obj: root.baseObj,
					cb: function(result) {
						console.log("Result", result);
						root.documentCancel(true);
					},
				};
				console.log("dto", dto);
				if (root.editing) root.update(dto);
				else root.save(dto);
			}
		},
		documentTypeFilter: (cb) => {
			// 202104241607: Lógica para filtrado de tipos de documento
			// https://stackoverflow.com/a/15287938
			console.log("root.tipos", root.tipos);
			console.log("root.documentTypes", root.documentTypes);
			console.log("root.documentTypesCurrent", root.documentTypesCurrent);
			if (root.documentTypesCurrent.length === root.tipos.length) $(root.btnDocAdd).fadeOut();
			if (root.documentTypesCurrent.length <= 0) {
				root.documentTypes = root.tipos;
				console.log("root.tipos", root.tipos);
				console.log("root.documentTypes", root.documentTypes);
			} else {
				root.documentTypes = [];
				let ignore = root.documentTypesCurrent.join(",");
				root.tipos.forEach((item) => {
					if (!ignore.includes(item.id.toString())) {
						root.documentTypes.push(item);
					} else if (root.current !== null && root.current.document_type_id === item.id) {
						root.documentTypes.push(item);
					}
				});
			}
			cb();
		},
		gridInit(e) {
			console.log(root.$sep);
			console.log("GRID INIT!!");
			console.log("e", e);
			root.grid = e.component;
			root.grid.on({
				contentReady: (e) => {
					setTimeout(function() {
						console.log(root.$sep);
						console.log("GRID INIT TIMEOUT!!");
						let el = $(root.panelGridDoc + " .dx-toolbar-after");
						let btn = $(root.btnDocAdd);
						console.log(el);
						console.log(root.btnDocAdd, btn);
						// console.clear();
						// console.log("root.id", root.id);
						// if (el.find("#btn-doc-add").length <= 0) {
						// 	let btn = $(`#${root.id} #btn-doc-add`);
						// 	console.log("btn", btn);
						el.append(btn);
						console.log("root.tipos", root.tipos);
						console.log("root.documentTypes", root.documentTypes);
						console.log("root.documentTypesCurrent", root.documentTypesCurrent);
						if (root.documentTypesCurrent.length < root.tipos.length) btn.fadeIn();
						else btn.fadeOut();
						// }
					}, 400);
				},
			});
		},
	},
};
</script>
