<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-cog mr-1 color-main-600"></i>
					<span class="font-weight-semibold">Administración</span> &raquo; Tipos y Subtipos
				</h1>
			</div>
			<div class="header-elements">
				<span id="panel-tipos-cmds">
					<button type="button" @click.prevent="add('type')" title="Crear tipo.." class="btn btn-main btn-labeled btn-labeled-left legitRipple">
						<b><i class="icon-database-add"></i></b> CREAR TIPO
					</button>
					<button type="button" @click.prevent="add('subtype')" title="Crear subtipo.." class="ml-3 btn btn-main btn-labeled btn-labeled-left legitRipple">
						<b><i class="icon-database-add"></i></b> CREAR SUBTIPO
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
								<div class="col subtype">
									<div class="form-group">
										<label>Tipo:</label>
										<DxSelectBox
											:show-clear-button="true"
											:data-source="types"
											:grouped="false"
											:value.sync="baseObj.type_id"
											:search-enabled="true"
											placeholder="Busque y seleccione un tipo..."
											class="form-control"
											display-expr="t_name"
											value-expr="id"
										>
											<DxValidator>
												<DxCustomRule message="Obligatorio" :validation-callback="validarTipo" :reevaluate="true" />
											</DxValidator>
										</DxSelectBox>
									</div>
								</div>
								<div class="col subtype">
									<div class="form-group">
										<label>Subtipo Padre:</label>
										<DxSelectBox
											:show-clear-button="true"
											:data-source="subtypes"
											:grouped="false"
											:value.sync="baseObj.parent_id"
											:search-enabled="true"
											placeholder="Busque y seleccione un subtipo..."
											class="form-control"
											display-expr="st_name"
											value-expr="id"
										/>
									</div>
								</div>
								<div class="col">
									<div class="form-group">
										<label>Nombre:</label>
										<DxTextBox :show-clear-button="true" :value.sync="baseObj.name" class="form-control" placeholder="Nombre del subtipo" name="name" id="name">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>
								<div class="col-md-1">
									<div class="form-group">
										<label>Activo: </label>
										<DxSwitch :value.sync="baseObj.active" switched-on-text="SI" switched-off-text="NO" />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<div class="form-group">
										<label>Descripción:</label>
										<DxTextArea :height="70" :max-length="400" :value.sync="baseObj.description" placeholder="Descripción" class="form-control" />
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
								:show-borders="false"
							>
								<!-- https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RowEditingAndEditingEvents/Vue/Light -->
								<!-- https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Columns/Column_Types/Lookup_Columns -->
								<DxColumnChooser :enabled="false" mode="dragAndDrop" />
								<DxColumnFixing :enabled="true" />
								<DxEditing :allow-updating="false" :allow-adding="false" :allow-deleting="false" mode="row" /><!-- row, batch, cell, form, popup -->
								<DxFilterRow :visible="true" />
								<DxGrouping :auto-expand-all="false" />
								<DxGroupPanel :visible="false" :allow-column-dragging="true" />
								<DxLoadPanel :enabled="false" />
								<DxPaging :page-size="dgPageSize" />
								<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
								<DxSorting mode="multiple" /><!-- single, multiple, none -->
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
								</DxSummary>
								<DxPager
									:visible="true"
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="dgPageSizes"
									info-text="{2} subtipos (Página {0} de {1})"
								/>
								<DxColumn
									name="Tipo ID"
									:allow-filtering="false"
									:allow-search="false"
									:allow-sorting="true"
									:width="120"
									:visible="true"
									:allow-editing="false"
									alignment="center"
									caption="Tipo ID"
									data-field="type_id"
									data-type="string"
								/>
								<DxColumn
									name="Tipo"
									:allow-filtering="true"
									:allow-search="true"
									:allow-sorting="false"
									:visible="true"
									:allow-editing="true"
									sort-order="none"
									alignment="left"
									caption="Tipo"
									data-field="type_id"
									data-type="int"
								>
									<DxLookup :data-source="types" value-expr="id" display-expr="t_name" />
								</DxColumn>
								<DxColumn
									:visible="true"
									:allow-filtering="false"
									:allow-editing="false"
									:allow-search="false"
									:allow-sorting="true"
									:width="120"
									:customize-text="nullText"
									alignment="center"
									caption="Subtipo Padre Id"
									data-field="parent_id"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="true"
									:allow-sorting="false"
									:customize-text="nullText"
									alignment="left"
									caption="Subtipo Padre"
									data-field="parent_name"
									data-type="string"
								/>
								<DxColumn
									:visible="true"
									:allow-editing="false"
									:allow-filtering="false"
									:allow-search="false"
									:allow-sorting="true"
									:width="120"
									:customize-text="nullText"
									alignment="center"
									caption="Id"
									data-field="id"
									sort-order="asc"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="true"
									:allow-sorting="true"
									:customize-text="nullText"
									alignment="left"
									caption="Subtipo"
									data-field="name"
									data-type="string"
								/>
								<DxColumn :width="100" data-field="active" caption="Activo" alignment="center" :visible="true">
									<DxLookup :data-source="si_no" value-expr="value" display-expr="name" />
								</DxColumn>
								<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true" fixed-position="right" />
								<template #tpl="{ data }">
									<DxDropDownButton
										:drop-down-options="{ width: '400' }"
										:items="cmdGet(data)"
										@item-click="cmdClick($event, data)"
										@option-changed="ddOptionChanged"
										display-expr="text"
										icon="save"
										item-template="list-item"
										template="item"
										key-expr="id"
									>
										<template #item><i class="hand icon-cog"></i></template>
										<template #list-item="{ data }">
											<span class="cmd-item" title="Editar tipo o subtipos..."><i :class="data.icon"></i>{{ data.text }}</span>
										</template>
									</DxDropDownButton>
								</template>
							</DxDataGrid>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row" v-if="isDev && debug">
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
	DxLookup,
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
import {
	DxDateBox,
	DxFileUploader,
	DxDropDownButton,
	DxButton,
	DxSelectBox,
	DxSwitch,
	DxTagBox,
	DxTextArea,
	DxTextBox,
	DxNumberBox,
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
		DxLookup,
		DxDropDownButton,
		DxColumn,
		DxCustomRule,
		DxColumnChooser,
		DxColumnFixing,
		DxDataGrid,
		DxDateBox,
		DxEditing,
		DxFileUploader,
		DxFilterRow,
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
		DxTagBox,
		DxTextArea,
		DxTextBox,
		DxValidationGroup,
		DxValidator,
		Usuario: () => import("@/components/element/usuario"),
	},
	data: () => ({
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
		baseObj: {
			id: null,
			type_id: null,
			parent_id: null,
			name: null,
			description: null,
			created_by: null,
			updated_by: null,
			active: null,
		},
		lookupData: ["Not Started", "Need Assistance", "In Progress"],
	}),
	mounted() {
		root = this;
		root.validator = root.$refs.basicGroup.instance;
		root.baseObj.created_by = root.user_id;
		root.baseObj.updated_by = root.user_id;
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
				endPoint: "types_all",
				onLoading: function(loadOptions) {
					console.log("loadOptions", loadOptions);
					console.log(root._sep);
					console.log("onLoading");
					root.loaderElement = root.panelGrid.find(".card-body");
					root.loaderMessage = "Cargando tipos y subtipos";
					root.loaderShow();
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
		...mapActions("core/tipo", ["subtypeEnable", "subtypeUpdate", "typeUpdate", "getTypes", "getSubtypes"]),
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
		ddOptionChanged(e) {
			if (e.name == "opened") {
				// dx-datagrid-table dx-datagrid-table-fixed
				if (e.previousValue) {
					$(".dx-datagrid-table tr.hovered").removeClass("hovered");
				} else {
					// console.log("ddOptionChanged", e);
					var row = $(e.element).parents("tr");
					row.addClass("hovered");
					console.log("row", row);
				}
			}
		},
		add(what) {
			root.mode = "add";
			// console.clear();
			console.log("root.panelGrid", root.panelGrid);
			console.log("root.panelData", root.panelData);
			console.log("add(data)", what);
			root.baseObj.active = true;
			root.baseObj.type_id = null;
			root.baseObj.parent_id = null;
			let tit = what == "type" ? "Tipo" : "Subtipo";
			if (what === "type") {
				root.validateType = false;
				$(".col.subtype").hide();
			} else {
				root.validateType = true;
				$(".col.subtype").show();
			}
			root.panelData.find(".card-header").html(`<i class="icon-database-add"></i>&nbsp;&nbsp;Creando ${tit}`);
			root.panelCmd.fadeOut();
			root.panelGrid.fadeOut(function() {
				root.panelData.fadeIn(function() {
					console.log("root.panelCmd", root.panelCmd);
					// root.panelCmd.fadeOut();
				});
			});
		},
		edit(what, data) {
			root.mode = "edit";
			console.clear();
			console.log("data", data);
			console.log("what", what);
			let tit = `Editando Subtipo "${data.name}"`;
			if (what == "type") {
				$(".col.subtype").hide();
				root.validateType = false;
				let item = root.types.find((o) => o.id == data.type_id);
				console.log("item", item);
				root.baseObj.id = item.id;
				root.baseObj.name = item.t_name;
				root.baseObj.description = item.t_description;
				root.baseObj.type_id = null;
				root.baseObj.parent_id = null;
				root.baseObj.active = item.active;
				tit = `Editando Tipo "${item.t_name}"`;
			} else {
				$(".col.subtype").show();
				root.validateType = true;
				let item = root.subtypes.find((o) => o.id == data[what == "parent_type" ? "parent_id" : "id"]);
				console.log("item", item);
				root.baseObj.id = item.id;
				root.baseObj.name = item.st_name;
				root.baseObj.description = item.st_description;
				root.baseObj.type_id = item.type_id;
				root.baseObj.parent_id = item.parent_id == null ? null : item.parent_id;
				root.baseObj.active = item.active;
				tit = what == "parent_type" ? `Editando Subtipo Padre "${data.parent_name}"` : `Editando Subtipo "${data.name}"`;
			}
			root.panelData.find(".card-header").html(`<i class="icon-database-edit"></i>&nbsp;&nbsp;${tit}`);
			root.panelCmd.fadeOut();
			root.panelGrid.fadeOut(function() {
				root.panelData.fadeIn();
			});
		},
		cancel() {
			root.mode = null;
			console.log("CANCEL!");
			root.panelData.fadeOut(function() {
				console.clear();
				root.validator.reset();
				root.baseObj.id = null;
				root.baseObj.name = null;
				root.baseObj.description = null;
				root.panelCmd.fadeIn();
				root.panelGrid.fadeIn();
			});
		},
		save() {
			// console.clear();
			root.loaderElement = root.panelData.find(".card");
			console.log("baseObj", root.baseObj);
			console.log("validator", root.validator);
			var result = root.validator.validate();
			var t_id = root.baseObj.type_id;
			// if (t_id == 0) root.baseObj.type_id = null;
			console.log("result", result);
			if (result.isValid) {
				if (root.baseObj.type_id == null) {
					root.loaderMessage = "Guardando tipo";
					root.loaderShow();
					root.typeUpdate({
						mode: root.mode,
						typeId: root.baseObj.id,
						type: {
							t_name: root.$clean(root.baseObj.name),
							t_description: root.$clean(root.baseObj.description),
							updated_by: root.user_id,
							active: root.baseObj.active,
						},
						cb: function(result) {
							root.loaderMessage = "Cargando tipos";
							root.getTypes({
								reload: true,
								cb: function(params) {
									console.log("Result", result);
									root.grid.refresh();
									root.cancel();
								},
							});
						},
					});
				} else {
					root.loaderMessage = "Guardando subtipo";
					root.loaderShow();
					root.subtypeUpdate({
						mode: root.mode,
						subtypeId: root.baseObj.id,
						subtype: {
							type_id: root.baseObj.type_id,
							parent_id: root.baseObj.parent_id == 0 ? null : root.baseObj.parent_id,
							st_name: root.$clean(root.baseObj.name),
							st_description: root.$clean(root.baseObj.description),
							updated_by: root.user_id,
							active: root.baseObj.active,
						},
						cb: function(result) {
							root.getSubtypes({
								reload: true,
								cb: function(params) {
									console.log("Result", result);
									root.grid.refresh();
									root.cancel();
								},
							});
						},
					});
				}
			} else {
				root.baseObj.type_id = t_id;
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
						root.loaderShow();
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
		cmdClick(e, data) {
			// console.clear();
			let action = e.itemData.command;
			console.log("action", action);
			console.log("data", data);
			if (action === "edit" || action === "parent_type" || action === "type") root.edit(action, data.data);
			else if (action === "enable" || action === "disable") root.enable(action === "enable", data.data);
		},
		cmdGet(data) {
			let details = data.data;
			let cmds = [];
			if (details.type_id !== null) {
				cmds.push({
					command: "type",
					text: `Editar tipo "${details.type_name}"...`,
					icon: "icon-database-edit",
				});
			}
			if (details.parent_id !== null) {
				cmds.push({
					command: "parent_type",
					text: `Editar subtipo Padre "${details.parent_name}"...`,
					icon: "icon-database-edit",
				});
			}
			if (details.id !== null) {
				cmds.push({
					command: "edit",
					text: `Editar subtipo "${details.name}"...`,
					icon: "icon-database-edit",
				});
			}
			let enable = {
				command: "enable",
				text: `Activar subtipo "${details.name}"...`,
				icon: "icon-database-check",
			};
			let disable = {
				command: "disable",
				text: `Desactivar subtipo "${details.name}"...`,
				icon: "icon-database-remove",
			};
			cmds.push(details.active ? disable : enable);

			return cmds;
		},
	},
};
</script>
