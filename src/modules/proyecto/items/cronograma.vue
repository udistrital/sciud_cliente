<template>
	<div class="col mt-3 pl-1 pr-1" :id="namePanel">
		<div class="row">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline mb-2">
						<div class="page-title p-0 m-0">
							<h1>
								<i class="icon-package mr-1 color-main-600"></i>
								<span class="font-weight-semibold">Cronograma por desarrollar</span>
								<span class="item-title">&nbsp;</span>
							</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card mt-3">
			<div class="card-body">
				<div class="row file slide" v-if="editModeConv" id="data-file">
					<div class="col">
						<div class="card">
							<div class="card-header main">Documento soporte</div>
							<div class="card-body mb-0 pb-0 pt-3">
								<DxValidationGroup ref="vGroupDoc">
									<div class="row">
										<div class="col">
											<div class="form-group mb-2">
												<label>Nombre:</label>
												<DxTextBox :value.sync="baseObj.doc_name" placeholder="Nombre(s)" class="form-control" :read-only="false" mode="text">
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxTextBox>
											</div>
										</div>
										<div class="col-3">
											<div class="form-group file-container">
												<label>Documento:</label>
												<DxFileUploader id="document" ref="uploader" />
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
				<div class="row data slide" v-if="editModeConv" id="data-actividad">
					<div class="col">
						<div class="card">
							<div class="card-header main">Editar actividad</div>
							<div class="card-body mb-0 pb-0 pt-3">
								<DxValidationGroup ref="vGroup">
									<div class="row">
										<div class="col">
											<div class="form-group mb-3">
												<label>Descripción de la actividad:</label>
												<DxTextArea
													:height="60"
													:max-length="1000"
													:show-clear-button="true"
													:read-only="!editModeConv"
													class="form-control"
													:value.sync="base_obj.sa_description"
													placeholder="Descripción de la actividad"
												>
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxTextArea>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-6">
											<div class="form-group mb-3">
												<label>Responsable:</label>
												<DxTextBox
													:show-clear-button="true"
													:read-only="!editModeConv"
													class="form-control"
													:value.sync="base_obj.sa_responsible"
													placeholder="Responsable"
												>
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxTextBox>
											</div>
										</div>
										<div class="col-2">
											<div class="form-group">
												<label>Fecha de inicio:</label>
												<DxDateBox
													@focus-in="date_focus_in"
													@focus-out="date_focus_out"
													class="form-control"
													:read-only="!editModeConv"
													@value-changed="setDate"
													:value.sync="base_obj.sa_start_date"
													id="cidcRegistrationDate"
													placeholder="dd/mm/yyyy"
													display-format="dd/MM/yyyy"
													type="date"
												>
													<!-- :min="actualDate" -->
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxDateBox>
											</div>
										</div>
										<div class="col-2">
											<div class="form-group">
												<label>Fecha de cierre:</label>
												<DxDateBox
													@focus-in="date_focus_in"
													@focus-out="date_focus_out"
													class="form-control"
													:value.sync="base_obj.sa_end_date"
													placeholder="dd/mm/yyyy"
													display-format="dd/MM/yyyy"
													:read-only="!editModeConv"
													:min="endDate"
													type="date"
												>
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxDateBox>
											</div>
										</div>
										<div class="col">
											<div class="form-group">
												<label>Orden:</label>
												<DxNumberBox
													align="center"
													:show-clear-button="true"
													:value.sync="base_obj.sa_order"
													:read-only="!editModeConv"
													placeholder="Orden"
													class="form-control"
												>
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxNumberBox>
											</div>
										</div>
										<div class="col">
											<div class="form-group">
												<label>Activa:</label>
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
										<a
											href="#"
											id="btn-save"
											@click.prevent="save"
											:class="'btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple' + (percent_total < 100 ? '' : 'disabled')"
										>
											<b><i class="icon-database-add"></i></b> GUARDAR
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row grid">
					<div class="col">
						<DxDataGrid
							class="main"
							width="100%"
							:dataSource="dataSource"
							@initialized="gridInit"
							no-data-text="No hay actividades registradas"
							:allow-column-reordering="false"
							:remote-operations="true"
							:hover-state-enabled="true"
							:word-wrap-enabled="true"
							:row-alternation-enabled="true"
							:show-borders="false"
						>
							<DxExport :enabled="false" />
							<DxColumnChooser :enabled="false" mode="dragAndDrop" />
							<DxSorting mode="single" /><!-- single, multiple, none" -->
							<DxPaging :page-size="10" />
							<!-- <DxFilterRow :visible="false" /> -->
							<DxLoadPanel :enabled="false" />
							<DxGroupPanel :visible="false" :allow-column-dragging="true" />
							<DxGrouping :auto-expand-all="true" />
							<DxSummary>
								<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
							</DxSummary>
							<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/rowDragging -->
							<DxRowDragging :allow-reordering="false" :show-drag-icons="true" drag-direction="vertical" :on-reorder="onReorder" />
							<DxPager
								:visible="true"
								:show-info="true"
								:show-page-size-selector="false"
								:show-navigation-buttons="true"
								:allowed-page-sizes="dgPageSizes"
								info-text="{2} actividades registradas (página {0} de {1})"
							/>
							<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
							<DxColumn
								:visible="false"
								:allow-grouping="false"
								:allow-filtering="false"
								:allow-search="false"
								:allow-sorting="true"
								:width="50"
								alignment="center"
								caption="ID"
								data-field="id"
								data-type="number"
							/>
							<DxColumn
								:allow-grouping="false"
								:allow-filtering="false"
								:allow-search="false"
								:allow-sorting="true"
								sort-order="asc"
								:width="90"
								alignment="center"
								caption="Orden"
								data-field="sa_order"
								data-type="number"
							/>
							<DxColumn
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="true"
								:customize-text="nullText"
								alignment="left"
								caption="Actividad"
								data-field="sa_description"
								data-type="string"
							/>
							<DxColumn
								:width="160"
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="true"
								:customize-text="nullText"
								alignment="left"
								caption="Responsable"
								data-field="sa_responsible"
								data-type="string"
							/>
							<DxColumn
								:allow-filtering="true"
								:visible="true"
								data-field="sa_start_date"
								caption="Fecha inicio"
								alignment="center"
								data-type="date"
								format="dd/MM/yyyy"
								:width="100"
							/>
							<DxColumn
								:allow-filtering="true"
								:visible="true"
								data-field="sa_end_date"
								caption="Fecha cierre"
								alignment="center"
								data-type="date"
								format="dd/MM/yyyy"
								:width="100"
							/>
							<DxColumn :visible="true" caption="Estado" alignment="center" :width="100" cell-template="tpl-estado" />
							<template #tpl-estado="{ data }">
								<span class="cmds">
									{{ getEstado(data.data) }}
								</span>
							</template>
							<DxColumn :width="100" data-field="active" caption="Activa" data-type="date" alignment="center" :visible="false" :customize-text="yesNo" />
							<DxColumn :width="100" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editModeConv" />
							<template #tpl="{ data }">
								<span class="cmds">
									<a title="Cargar evidencia..." class="cmd-item color-main-600" @click.prevent="document(data.data)" href="#">
										<i class="icon-file-pdf"></i>
									</a>
									<a title="Editar actividad..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a>
									<!-- <a title="Avance en objetivos..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
										<i class="icon-menu3"></i>
									</a> -->
								</span>
							</template>
						</DxDataGrid>
					</div>
				</div>
				BIRD baseObj:
				{{ JSON.stringify(baseObj, null, "\t") }}
			</div>
			<div class="card-body">
				baseObjGen:
				{{ JSON.stringify(baseObjGen, null, "\t") }}
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root = null;
let $ = window.jQuery;

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
import { DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator, DxPatternRule } from "devextreme-vue/validator";
import { mapState, mapActions, mapGetters } from "vuex";
import DxStore from "@/store/dx";

//import { DxStateStoring } from 'node_modules/devextreme-vue/pivot-grid';

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	components: {
		DxPopup,
		DxDateBox,
		DxTextArea,
		DxTextBox,
		DxButton,
		DxFileUploader,
		DxRowDragging,
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
	props: {
		convocatoria: {
			type: Object,
			default: () => {},
		},
		propuesta: {
			type: Object,
			default: () => {},
		},
		editOBJ: {
			type: Boolean,
			default: () => false,
		},
		endPointRute: {
			type: String,
			default: () => null,
		},
		permisoGuardar: {
			type: Boolean,
			default: () => false,
		},
	},
	data: () => ({
		base_obj: {
			sa_order: 0,
			sa_description: null,
			sa_date: "sa_date",
			sa_start_date: new Date(),
			sa_end_date: null,
			sa_responsible: null,
			active: true,
			created_by: 0,
			updated_by: 0,
		},
		namePanel: "proyecto-cronograma",
		titlecolum: "id",
		baseEnt: null,
		now: new Date(),
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		totalCount: 0,
		baseObjGen: {},
		baseObj: {},
	}),
	created() {
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
	},
	mounted() {
		root.loaderMessage = "Cargando Estrucuras";
		setTimeout(function() {
			root.fileError = $(root.panelDataDoc + " #file-error");
			root.btnDocLink = $(root.panelDataDoc + " #a-doc-link");
			root.actionTitle = $(root.panelDataDoc + " .card-header");
			if ($("#panel-produccion").length > 0) root.loaderElement = $("#panel-produccion .card-body");
			// 202104230923: https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileUploader/
			root.uploader = typeof root.$refs.uploader !== "undefined" ? root.$refs.uploader.instance : null;
			if (root.uploader !== null)
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
		...mapGetters("core/tipo", ["subtypesByType"]),
		dataSource: function() {
			if (typeof this.propuesta.id === "undefined") return null;
			console.log("root.propuesta", root.propuesta);
			return DxStore({
				key: ["id"], 
				endPoint: `/proposals/${root.propuesta.id}/schedule_activities`,
				loadBaseEntity: false,
				onLoading: function() {
					root.loaderShow("Cargando Actividades");
				},
				onLoaded: function(results) {
					// console.clear();
					console.log(root.$sep);
					root.items = results.data;
					console.log("Grid loaded =>", root.items);
					// root.base_obj.sa_order = root.items.length + 1;
					// let btn = $("#btn-add");
					// $(".dx-toolbar-after:first").append(btn);
					// btn.click(function(e) {
					// 	e.preventDefault();
					// 	root.add();
					// });
					if (!root.loading) root.loaderHide();
				},
			});
		},
	},
	watch: {},
	methods: {
		...mapActions("unidad/producto/universalSentUpAct", {
			getSinData: "getSinData",
			objSave: "save",
			objUpdate: "update",
			elementoActive: "active",
		}),
		...mapActions("convocatoria", ["getItem", "saveActivity", "updateActivity"]),
		...mapActions("unidad/indicadores", { getIndicadores: "getAll" }),
		dateDiffInDays: (a, b) => {
			const _MS_PER_DAY = 1000 * 60 * 60 * 24;
			// Discard the time and time-zone information.
			const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
			const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
			return Math.floor((utc2 - utc1) / _MS_PER_DAY);
		},
		document(item) {
			console.clear();
			root.editing = true;
			console.log("item =>", item);
			$(".row.grid").fadeOut(function(params) {
				$(".row.file").fadeIn(function(params) {});
			});
		},
		documentCancel(cb) {
			$(".row.file").fadeOut(function(params) {
				root.loaderHide();
				$(".row.grid").fadeIn(function(params) {
					// root.$refs.vGroupFile.instance.reset();
					// root.editing = false;
					if (root.$isFunction(cb)) cb();
				});
			});
		},
		getEstado: (item) => {
			console.clear();
			console.log("item =>", item);
			let sd = new Date();
			var f = item.sa_end_date.split("-");
			var ed = new Date(f[0], f[1] - 1, f[2]);
			var diff = root.dateDiffInDays(sd, ed);
			if (diff < 0) {
				return "Vencida";
			} else if (diff > 0 && diff < 15) {
				return "Por vencer";
			} else {
				return "A tiempo";
			}
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
			$(".row.grid").fadeOut(function(params) {
				$(".row.data").fadeIn(function(params) {
					console.log("percent_max =>", root.percent_max);
				});
			});
		},
		cancel(cb) {
			$(".row.data").fadeOut(function(params) {
				root.loaderHide();
				$(".row.grid").fadeIn(function(params) {
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
				root.loaderShow("Guardando Actividad", $("#data-actividad .card"));
				root.base_obj.call_id = root.propuesta.id;
				root.base_obj.created_by = root.user_id;
				root.base_obj.updated_by = root.user_id;
				console.log("base_obj =>", root.base_obj);
				let fn = eval(root.editing ? "root.updateActivity" : "root.saveActivity");
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
		onReorder: async (e) => {
			// 202108180501: https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/LocalReordering/Vue
			root.loaderShow("Guardando orden", $("#panel-cronograma .card-body:first"));
			console.clear();
			console.log(root.$sep);
			console.log("e =>", e);
			const visibleRows = root.grid.getVisibleRows();
			console.log("visibleRows =>", visibleRows);
			const toIndex = root.items.indexOf(visibleRows[e.toIndex].data);
			const fromIndex = root.items.indexOf(e.itemData);
			const new_items = [...root.items];
			new_items.splice(fromIndex, 1);
			new_items.splice(toIndex, 0, e.itemData);
			root.items = new_items;
			console.log("root.items =>", root.items);
			setTimeout(async function() {
				for (let x = 0; x < root.items.length; x++) {
					const item = root.items[x];
					item.sa_order = x + 1;
					item.call_id = root.item.id;
					item.updated_by = root.user_id;
					let result = await root.updateActivity(item);
					console.log("result =>", result);
				}
				root.grid.refresh();
			}, 1000);
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
						$(".dx-datagrid-drag-icon").attr("title", "Reordenar actividad...");
					}, 400);
				},
			});
		},
		onContentReady() {},
	},
};
</script>
