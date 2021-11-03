<template>
	<div v-if="item">
		<Header :item="item" />
		<div class="row">
			<div class="col">
				<div class="card" id="panel-documentos">
					<div class="card-body group-detail mh">
						<div class="row pb-3 mb-3 bb">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-end">
									<div>
										<span class="title d-block"><i class="icon-pencil6"></i> Convocatoria {{ item.call_code }}</span>
										<span class="title2 d-block mt-2">{{ item.call_name }}</span>
									</div>
									<div class="sub-title text-nowrap"><i class="icon-file-pdf"></i> Documentos</div>
								</div>
							</div>
						</div>
						<fieldset id="fs-doc-em" class="pb-3 mb-3">
							<legend><i class="icon-file-pdf"></i> Documentos a emitir</legend>
							<Documentos
								:id="id"
								:parent="this"
								:main-obj="item"
								:show-on-load="true"
								:tipos="tipoDocsEmitir"
								end-point="calls"
								new-button-text="Nuevo documento a emitir"
								lock-element="#panel-documentos .card-body"
							/>
						</fieldset>
						<fieldset id="fs-doc-sol">
							<legend><i class="icon-file-pdf"></i> Documentos a solicitar</legend>
							<div class="row data slide" v-if="editModeConv">
								<div class="col">
									<div class="card">
										<div class="card-header main">Nuevo documento a solicitar</div>
										<div class="card-body mb-0 pb-0 pt-3">
											<DxValidationGroup ref="vGroup">
												<div class="row">
													<div class="col">
														<div class="form-group mb-2">
															<label>Documento:</label>
															<DxSelectBox
																:show-clear-button="true"
																:grouped="false"
																:data-source="tipoDocsSolicitar"
																:value.sync="base_obj.document_id"
																:search-enabled="true"
																placeholder="Busque y/o seleccione el documento a solicitar..."
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
													<div class="col-1">
														<div class="form-group">
															<label>Activo:</label>
															<DxSwitch :value.sync="base_obj.active" switched-on-text="SI" switched-off-text="NO" />
														</div>
													</div>
												</div>
											</DxValidationGroup>
										</div>
										<div class="card-footer">
											<div class="row">
												<div class="col">
													<a href="#" id="btn-cancel" @click.prevent="cancel" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
														<b><i class="icon-database-remove"></i></b> CANCELAR
													</a>
												</div>
												<div class="col text-right">
													<a href="#" id="btn-save" @click.prevent="save" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
														<b><i class="icon-database-add"></i></b> GUARDAR
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row grid">
								<div class="col" id="grid-docs-request">
									<a href="#" id="btn-add" v-if="editMode" @click.prevent="add" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple slide">
										<b><i class="icon-database-add"></i></b> NUEVO DOCUMENTO A SOLICITAR
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
										<DxGrouping :auto-expand-all="true" />
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
											:width="80"
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
											alignment="left"
											caption="Documento"
											data-field="document_name"
											data-type="string"
										/>
										<DxColumn :width="100" data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" />
										<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editMode" />
										<template #tpl="{ data }">
											<span class="cmds">
												<a title="Editar documento..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
													<i class="icon-database-edit"></i>
												</a>
											</span>
										</template>
									</DxDataGrid>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
// https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns
let $ = window.jQuery,
	root = null;
import { mapActions, mapGetters } from "vuex";
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
	DxRowDragging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { DxButton, DxTextArea, DxPopup, DxDateBox, DxSelectBox, DxSwitch, DxTextBox, DxNumberBox, DxValidationGroup, DxFileUploader } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import DxStore from "@/store/dx";
let hideErrors = () => {
	$("#panel-basicos .dx-fileuploader-files-container").hide();
	$("#panel-basicos .dx-invalid-message").hide();
	$("#panel-basicos .dx-invalid").removeClass("dx-invalid");
};
export default {
	name: "datosBasicos",
	components: {
		DxPopup,
		DxRowDragging,
		DxDateBox,
		DxTextArea,
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
		Header: () => import("./_header"),
		Documentos: () => import("@/components/element/documentos"),
	},
	data: () => ({
		item: null,
		id: "panel-convocatoria-documentos",
		base_obj: {
			document_id: 0,
			cd_required: true,
			active: true,
			created_by: 0,
			updated_by: 0,
		},
	}),
	methods: {
		...mapActions("convocatoria", ["getItem", "saveDocument", "updateDocument"]),
		add() {
			root.editing = false;
			root.base_obj.created_by = root.user_id;
			root.base_obj.updated_by = root.user_id;
			$("#fs-doc-sol .row.grid").fadeOut(function(params) {
				$("#fs-doc-sol .row.data").fadeIn(function(params) {
					console.log("SOME!");
				});
			});
		},
		edit(item) {
			console.clear();
			root.editing = true;
			console.log("item =>", item);
			root.base_obj = root.$clone(item);
			root.base_obj.cec_percentage = parseFloat(item.cec_percentage);
			if (item.active) {
				// if (root.base_obj.cec_percentage > root.percent_max) root.base_obj.cec_percentage = root.percent_max;
				// else
				root.percent_max += root.base_obj.cec_percentage;
			}
			console.log("item =>", root.base_obj);
			console.log("percent_max =>", root.percent_max);
			$("#fs-doc-sol .row.grid").fadeOut(function(params) {
				$("#fs-doc-sol .row.data").fadeIn(function(params) {
					console.log("percent_max =>", root.percent_max);
				});
			});
		},
		cancel(cb) {
			$("#fs-doc-sol .row.data").fadeOut(function(params) {
				root.loaderHide();
				$("#fs-doc-sol .row.grid").fadeIn(function(params) {
					root.base_obj = root.$clone(root.base_obj_bk);
					root.$refs.vGroup.instance.reset();
					root.editing = false;
					if (root.$isFunction(cb)) cb();
				});
			});
		},
		save: async (validate = true) => {
			let valid = validate ? root.$refs.vGroup.instance.validate().isValid : true;
			if (valid) {
				root.loaderShow("Guardando documento", $("#fs-doc-sol .row.data .card"));
				root.base_obj.call_id = root.item.id;
				root.base_obj.created_by = root.user_id;
				root.base_obj.updated_by = root.user_id;
				console.log("base_obj =>", root.base_obj);
				let fn = eval(root.editing ? "root.updateDocument" : "root.saveDocument");
				console.log("fn =>", fn);
				let result = await fn(root.base_obj);
				console.log("result =>", result);
				setTimeout(function() {
					root.loading = true;
					root.grid.refresh();
					root.cancel(function() {
						root.loading = false;
					});
				}, 1000);
			}
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
					}, 400);
				},
			});
		},
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		dataSource: function() {
			return DxStore({
				key: ["id"],
				endPoint: `/calls/${root.item.id}/call_documents`,
				loadBaseEntity: false,
				onLoading: function() {
					root.loaderShow("Cargando documentos");
				},
				onLoaded: function(results) {
					// console.clear();
					console.log(root.$sep);
					root.items = results.data;
					console.log("Grid loaded =>", root.items);
					let btn = $("#btn-add");
					$("#grid-docs-request .dx-toolbar-after:first").append(btn);
					btn
						.click(function(e) {
							e.preventDefault();
							root.add();
						})
						.fadeIn();
					if (!root.loading) root.loaderHide();
				},
			});
		},
	},
	created: async function() {
		root = this;
		console.log(root.$sep);
		root.tipoDocsEmitir = root.subtypesByType("convocatoria_doc_emitir");
		console.log("root.tipoDocsEmitir =>", root.tipoDocsEmitir);
		root.tipoDocsSolicitar = root.subtypesByType("convocatoria_doc_solicitar");
		console.log("root.tipoDocsSolicitar =>", root.tipoDocsSolicitar);
		let uId = root.$route.params.itemId;
		root.item = await root.getItem(uId);
		console.log("item =>", root.item);
		document.title += ` Convocatoria ${root.item.call_code}`;
	},
	updated: () => {
		console.log(root.$sep);
		console.log("documentos Updated");
		hideErrors();
	},
	mounted() {
		// setTimeout(function() {
		// 	let id = `#${root.id}`;
		// 	console.log("id", id);
		// 	$(id).fadeIn();
		// }, 700);
	},
};
</script>
