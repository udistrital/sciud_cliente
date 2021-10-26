<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-cog mr-1 color-main-600"></i>
					<span class="font-weight-semibold">Administración</span> &raquo; Indicadores
				</h1>
			</div>
			<div class="header-elements">
				<span id="panel-tipos-cmds">
					<button type="button" @click.prevent="add()" title="Crear indicador.." class="btn btn-main btn-labeled btn-labeled-left legitRipple">
						<b><i class="icon-database-add"></i></b> CREAR INDICADOR
					</button>
				</span>
			</div>
		</div>
		<div class="row slide" id="panel-tipos-data">
			<div class="col">
				<div class="card main">
					<div class="card-header main">Alguna acción</div>
					<div class="card-body pb-0 pt-2">
						<DxValidationGroup ref="basicGroup">
							<div class="row">
								<div class="col-12">
									<div class="form-group">
										<label>Tipo:</label>
										<DxSelectBox
											:show-clear-button="true"
											:data-source="types"
											:grouped="false"
											:value.sync="baseObj.type_id"
											:search-enabled="true"
											:show-data-before-search="true"
											:min-search-length="3"
											@selection-changed="getSubtypes"
											placeholder="Filtrar subtipos por tipo..."
											class="form-control"
											display-expr="t_name"
											value-expr="id"
										/>
									</div>
								</div>
								<div class="col-11 subtype">
									<div class="form-group">
										<label>Subtipo:</label>
										<DxSelectBox
											:show-clear-button="true"
											:data-source="subtypes_current"
											:grouped="false"
											:search-enabled="true"
											:show-data-before-search="true"
											:min-search-length="3"
											:value.sync="baseObj.subtype_id"
											placeholder="Busque y seleccione un subtipo..."
											class="form-control"
											display-expr="st_name"
											value-expr="id"
										/>
									</div>
								</div>
								<div class="col">
									<div class="form-group">
										<label>Activo: </label>
										<DxSwitch :value.sync="baseObj.active" switched-on-text="SI" switched-off-text="NO" />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<div class="form-group">
										<label>Indicador:</label>
										<DxTextArea :height="70" :max-length="400" :value.sync="baseObj.ind_description" placeholder="Descripción" class="form-control" />
									</div>
								</div>
							</div>
						</DxValidationGroup>
					</div>
					<div class="card-footer">
						<div class="row">
							<div class="col">
								<DxButton @click="cancel" class="nb">
									<template #default>
										<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
											<b><i class="icon-database-remove"></i></b> CANCELAR
										</span>
									</template>
								</DxButton>
							</div>
							<div class="col text-right">
								<DxButton @click="save" class="nb">
									<template #default>
										<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
											GUARDAR <b><i class="icon-database-add"></i></b>
										</span>
									</template>
								</DxButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row" id="panel-tipos-grid">
			<div class="col">
				<div class="card" id="data-container">
					<div class="card-body pt-3 mh">
						<div id="grid slide" class="pb-2">
							<DxDataGrid
								class="main"
								width="100%"
								@initialized="gridInit"
								:column-auto-width="true"
								:allow-column-reordering="true"
								:data-source="dataSource"
								:remote-operations="true"
								:hover-state-enabled="true"
								:row-alternation-enabled="true"
								:word-wrap-enabled="false"
								:show-borders="false"
							>
								<!-- https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RowEditingAndEditingEvents/Vue/Light -->
								<!-- https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Columns/Column_Types/Lookup_Columns -->
								<DxColumnChooser :enabled="false" mode="dragAndDrop" />
								<DxColumnFixing :enabled="true" />
								<DxEditing :allow-updating="false" :allow-adding="false" :allow-deleting="false" mode="row" /><!-- row, batch, cell, form, popup -->
								<DxFilterRow :visible="true" />
								<DxGrouping :auto-expand-all="true" />
								<DxGroupPanel :visible="true" :allow-column-dragging="true" />
								<DxLoadPanel :enabled="false" />
								<DxPaging :page-size="dgPageSize" />
								<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
								<DxSorting mode="multiple" /><!-- single, multiple, none -->
								<DxStateStoring :enabled="true" type="sessionStorage" storage-key="siciud-indicadores" />
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
								</DxSummary>
								<DxPager
									:visible="true"
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="dgPageSizes"
									info-text="{2} indicadores (Página {0} de {1})"
								/>
								<DxColumn
									:visible="true"
									:allow-filtering="false"
									:allow-editing="false"
									:allow-search="false"
									:allow-grouping="false"
									:allow-sorting="true"
									:width="70"
									:customize-text="nullText"
									alignment="center"
									caption="Tipo Id"
									data-field="type_id"
									data-type="number"
								/>
								<DxColumn
									name="Tipo"
									:allow-filtering="true"
									:allow-search="true"
									:allow-sorting="true"
									:visible="true"
									:allow-editing="true"
									sort-order="asc"
									alignment="left"
									caption="Tipo"
									data-field="type_name"
									data-type="text"
									:sort-index="0"
									:group-index="0"
								/>
								<!-- :group-index="0"
								>									
									<DxLookup :data-source="types" value-expr="id" display-expr="t_name" />
								</DxColumn> -->
								<DxColumn
									:visible="true"
									:allow-filtering="false"
									:allow-editing="false"
									:allow-search="false"
									:allow-grouping="false"
									:allow-sorting="true"
									:width="80"
									:customize-text="nullText"
									alignment="center"
									caption="Subtipo Id"
									data-field="subtype_id"
									data-type="number"
								/>
								<DxColumn
									:allow-filtering="true"
									:allow-sorting="false"
									:customize-text="nullText"
									alignment="left"
									caption="Subtipo"
									data-field="subtype_name"
									data-type="string"
								/>
								<DxColumn
									:visible="true"
									:allow-editing="false"
									:allow-filtering="false"
									:allow-search="false"
									:allow-grouping="false"
									:allow-sorting="true"
									:width="70"
									:customize-text="nullText"
									alignment="center"
									caption="Id"
									data-field="id"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="true"
									:allow-sorting="true"
									:customize-text="nullText"
									:word-wrap-enabled="true"
									alignment="left"
									caption="Indicador"
									data-field="ind_description"
									data-type="string"
									sort-order="asc"
								/>
								<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true" fixed-position="right" />
								<template #tpl="{ data }">
									<span class="cmds">
										<a title="Editar..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
											<i class="icon-database-edit"></i>
										</a>
										<a v-if="data.data.active" title="Desactivar..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
											<i class="icon-database-remove"></i>
										</a>
										<a v-else title="Activar..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
											<i class="icon-database-check"></i>
										</a>
									</span>
								</template>
							</DxDataGrid>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body"><strong>baseObj:</strong> {{ JSON.stringify(baseObj, null, 3) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root = null,
	$ = window.jQuery;
// 202103081123: Grilla DX
import DxStore from "@/store/dx";
import {
	DxColumn,
	DxColumnChooser,
	DxColumnFixing,
	DxDataGrid,
	DxEditing,
	DxFilterRow,
	DxGrouping,
	DxGroupItem,
	DxGroupPanel,
	DxLoadPanel,
	DxLookup,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxStateStoring,
	DxSummary,
} from "devextreme-vue/data-grid";
import {
	DxButton,
	DxDateBox,
	DxDropDownButton,
	DxFileUploader,
	DxNumberBox,
	DxSelectBox,
	DxSwitch,
	DxTagBox,
	DxTextArea,
	DxTextBox,
	DxValidationGroup,
} from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule, DxCustomRule } from "devextreme-vue/validator";
import { mapActions, mapGetters, mapState } from "vuex";
// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "inicio",
	components: {
		DxButton,
		DxColumn,
		DxColumnChooser,
		DxColumnFixing,
		DxCustomRule,
		DxDataGrid,
		DxDateBox,
		DxDropDownButton,
		DxEditing,
		DxFileUploader,
		DxFilterRow,
		DxGrouping,
		DxGroupItem,
		DxGroupPanel,
		DxLoadPanel,
		DxLookup,
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
		DxTagBox,
		DxTextArea,
		DxTextBox,
		DxValidationGroup,
		DxValidator,
		DxStateStoring,
		Usuario: () => import("@/components/element/usuario"),
	},
	data: () => ({
		type_id: null,
		validator: null,
		grid: null,
		mode: null,
		grupo: null,
		results: "",
		panelCmd: null,
		panelGrid: null,
		panelData: null,
		validateType: false,
		testId: "1032479929",
		isValid: false,
		subtypes_current: [],
		baseObjBk: null,
		baseObj: {
			ind_description: null,
			type_id: null,
			subtype_id: null,
			active: true,
			created_by: null,
			updated_by: null,
		},
		lookupData: ["Not Started", "Need Assistance", "In Progress"],
	}),
	mounted() {
		root = this;
		root.loaderShow("Cargando indicadores");
		root.validator = root.$refs.basicGroup.instance;
		root.baseObj.created_by = root.user_id;
		root.baseObj.updated_by = root.user_id;
		root.baseObjBk = root.$clone(root.baseObj);
		let root_id = "#panel-tipos";
		root.panelCmd = $(`${root_id}-cmds`);
		root.panelGrid = $(`${root_id}-grid`);
		root.panelData = $(`${root_id}-data`);
		console.log("User", root.user);
	},
	computed: {
		...mapState("core/tipo", ["types", "subtypes"]),
		...mapGetters("core/tipo", ["subtypesByType", "subtypesByParent"]),
		dataSource: function() {
			return DxStore({
				key: ["id"],
				endPoint: "indicators",
				onLoading: function(loadOptions) {
					console.log("loadOptions", loadOptions);
					console.log(root._sep);
					console.log("onLoading");
					// root.loaderElement = root.panelGrid.find(".card-body");
					// root.loaderMessage = "Cargando indicadores";
					// root.loaderShow("Cargando indicadores");
					setTimeout(function() {
						console.log("SCROLL!");
						root.scrollTop();
					}, 300);
				},
				onLoaded: function(results, baseEntity) {
					console.log(root._sep);
					console.log("results", results);
					console.log("baseEntity", baseEntity);
					// root.loaderHide();
				},
			});
		},
	},
	methods: {
		...mapActions("core/indicador", ["set"]),
		validarTipo(e) {
			// 202104272101: Disable_Validation_Dynamically
			// https://js.devexpress.com/Documentation/Guide/UI_Components/Common/UI_Widgets/Data_Validation/#Disable_Validation_Dynamically
			console.log("validarTipo", root.validateType);
			console.log("e", e);
			if (root.validateType) {
				console.log("e", e);
				return e.value !== null;
			} else return true;
		},
		getSubtypes(e, a) {
			// console.clear();
			console.log("e =>", e);
			console.log("a =>", a);
			if (root !== null && e.selectedItem !== null && typeof root.subtypes !== "undefined") {
				console.log("root.subtypes =>", root.subtypes);
				root.subtypes_current = root.subtypesByType(e.selectedItem.id);
			}
		},
		add(what) {
			root.mode = "add";
			root.type_id = null;
			// console.clear();
			console.log("root.panelGrid", root.panelGrid);
			console.log("root.panelData", root.panelData);
			console.log("add(data)", what);
			root.baseObj = root.$clone(root.baseObjBk);
			root.subtypes_current = root.subtypes.filter((o) => o.active);
			root.panelData.find(".card-header").html(`<i class="icon-database-add"></i>&nbsp;&nbsp;Nuevo indicador`);
			root.panelCmd.fadeOut();
			root.panelGrid.fadeOut(function() {
				root.panelData.fadeIn(function() {
					console.log("root.panelCmd", root.panelCmd);
				});
			});
		},
		edit(data) {
			root.mode = "edit";
			root.type_id = null;
			// console.clear();
			console.log("data", data);
			root.subtypes_current = root.subtypes.filter((o) => o.active);
			root.baseObj = root.$clone(data);
			root.panelData.find(".card-header").html(`<i class="icon-database-edit"></i>&nbsp;&nbsp;Editar indicador`);
			root.panelCmd.fadeOut();
			root.panelGrid.fadeOut(function() {
				root.panelData.fadeIn();
			});
		},
		cancel() {
			root.mode = null;
			console.log("CANCEL!");
			root.panelData.fadeOut(function() {
				// console.clear();
				root.validator.reset();
				root.baseObj = root.$clone(root.baseObjBk);
				root.panelCmd.fadeIn();
				root.panelGrid.fadeIn();
			});
		},
		save() {
			console.clear();
			console.log(root.$sep);
			root.loaderElement = root.panelData.find(".card");
			console.log("validator =>", root.validator);
			var result = root.validator.validate();
			console.log("result =>", result);
			if (result.isValid) {
				root.loaderShow("Guardando indicador");
				root.baseObj[root.mode == "add" ? "created_by" : "updated_by"] = root.user_id;
				console.log("baseObj =>", root.baseObj);
				root.set({
					mode: root.mode,
					obj: root.baseObj,
					cb: function(result) {
						console.log(root.$sep);
						console.log("result =>", result);
						root.grid.refresh();
						root.cancel();
					},
				});
			}
		},
		enable(state, data) {
			// console.clear();
			console.log("data", data);
			console.log("state", state);
			let a = state ? "activar" : "desactivar";
			let msg = `¿Realmente desea ${a} el subtipo "${data.name}"?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					let item = data;
					item.active = state;
					root.loaderMessage = `${state ? "Activando" : "Desactivando"} subtipo`;
					root.loaderShow();
					root.subtypeEnable({
						typeId: data.type_id,
						subtypeId: data.id,
						subtype: {
							active: state,
							updated_by: root.user_id,
						},
						cb: function(result) {
							console.log("Result", result);
							root.grid.refresh();
						},
					});
				}
			});
		},
		gridInit(e) {
			let root = this;
			root.grid = e.component;
			// 202103311458: https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Events/
			root.grid.on({
				contentReady: (e) => {
					console.log("contentReady", e);
					if (root.mode == null) root.loaderHide();
				},
				optionChanged: (e) => {
					if (e.fullName == "paging.pageIndex") {
						console.log("optionChanged", e);
						root.loaderShow("Cargando indicadores");
					}
				},
				editorPreparing: (e) => {
					if (e.dataField === "LastName" && e.parentType === "dataRow") {
						e.editorOptions.disabled = e.row.data && e.row.data.FirstName === "";
					}
				},
			});
		},
		onContentReady(e) {
			console.log(root._sep);
			console.log("onContentReady!", e);
		},
	},
};
</script>
