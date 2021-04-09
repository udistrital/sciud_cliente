<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-cog mr-1 color-main-600"></i>
					<span class="font-weight-semibold">Administración</span> &raquo; Usuarios
				</h1>
			</div>
			<div class="header-elements">
				<span id="panel-usuarios-cmds">
					<button type="button" @click.prevent="addOas()" title="Crear usuario OAS..." class="btn btn-main btn-labeled btn-labeled-left legitRipple">
						<b><i class="icon-database-add"></i></b> CREAR USUARIO OAS
					</button>
					<button type="button" @click.prevent="add()" title="Asociar usuario..." class="btn btn-main btn-labeled btn-labeled-left legitRipple ml-3">
						<b><i class="icon-database-add"></i></b> ASOCIAR USUARIO
					</button>
				</span>
			</div>
		</div>
		<Usuario :userRoles="roles" :baseObj="baseObj" :saveFn="save" :cancelFn="cancel" id="panel-usuarios-data" />
		<div class="row" id="panel-usuarios-grid">
			<div class="col">
				<div class="card" id="data-container">
					<div class="card-body pt-0 grid mh">
						<div id="grid slide" class="pt-3">
							<DxDataGrid
								class="main"
								width="100%"
								@initialized="gridInit"
								:allow-column-reordering="true"
								:data-source="dataSource"
								:remote-operations="true"
								:hover-state-enabled="true"
								:row-alternation-enabled="true"
								:show-borders="false"
							>
								<DxColumnChooser :enabled="false" mode="dragAndDrop" />
								<DxSorting mode="multiple" /><!-- single, multiple, none -->
								<DxPaging :page-size="dgPageSize" /><!-- dgPageSize -->
								<DxFilterRow :visible="true" />
								<DxLoadPanel :enabled="false" />
								<DxGroupPanel :visible="false" :allow-column-dragging="true" />
								<DxGrouping :auto-expand-all="false" />
								<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
								<!-- https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Columns/Column_Types/Lookup_Columns -->
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
								</DxSummary>
								<DxPager
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="dgPageSizes"
									info-text="Página {0} de {1} ({2} usuarios por asociar)"
								/>
								<DxColumn
									:allow-filtering="false"
									:allow-search="false"
									:allow-sorting="true"
									:width="120"
									alignment="center"
									caption="SICIUD ID"
									data-field="id"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="false"
									:allow-sorting="true"
									:customize-text="nullText"
									:width="120"
									alignment="center"
									caption="OAS ID"
									data-field="oas_details.TerceroId.Id"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="true"
									:allow-sorting="true"
									:customize-text="$formatDocument"
									alignment="center"
									caption="Documento"
									data-field="identification_number"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="false"
									:allow-sorting="false"
									:customize-text="nullText"
									alignment="center"
									caption="Nombre"
									data-field="oas_details.TerceroId.NombreCompleto"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="true"
									:allow-sorting="true"
									:customize-text="nullText"
									alignment="center"
									caption="Rol"
									data-field="user_role_id"
									data-type="int"
								>
									<DxLookup :data-source="roles" value-expr="id" display-expr="name" />
								</DxColumn>
								<DxColumn :width="100" data-field="active" caption="Activo" alignment="center" :visible="true">
									<DxLookup :data-source="si_no" value-expr="value" display-expr="name" />
								</DxColumn>
								<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" />
								<template #tpl="{ data }">
									<span class="cmds">
										<a title="Editar usuario..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
											<i class="icon-database-edit"></i>
										</a>
										<a v-if="data.data.active" title="Desactivar usuario..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
											<i class="icon-database-remove"></i>
										</a>
										<a v-else title="Activar usuario..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
		<div class="row" v-if="isDev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<strong>baseObj:</strong> {{ JSON.stringify(baseObj, null, 3) }} <br />
						<strong><a href="#" @click.prevent="getUserOasDetails('79602309')">getUserOasDetails</a></strong>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
let root = null;
let $ = window.jQuery;
// 202103081123: Grilla DX
import DxStore from "@/store/dx";
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
	DxLookup,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { DxDateBox, DxFileUploader, DxButton, DxSelectBox, DxSwitch, DxTagBox, DxTextArea, DxTextBox, DxNumberBox, DxValidationGroup } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import { mapActions, mapGetters } from "vuex";
// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "inicio",
	components: {
		DxColumn,
		DxButton,
		DxLookup,
		DxNumberBoxButton,
		DxColumnChooser,
		DxDataGrid,
		DxDateBox,
		DxFileUploader,
		DxFilterRow,
		DxGrouping,
		DxGroupItem,
		DxGroupPanel,
		DxLoadPanel,
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
		DxNumberBox,
		DxValidationGroup,
		DxValidator,
		Usuario: () => import("@/components/element/usuario"),
	},
	data: () => ({
		mode: null,
		items: [],
		grid: null,
		grupo: null,
		results: "",
		testId: "1032479929",
		isValid: false,
		panelCmd: null,
		panelGrid: null,
		panelData: null,
		baseObj: {
			name: null,
			identification_number: null,
			oas_user_id: null,
			user_role_id: 0,
			active: true,
			created_by: 0,
			updated_by: 0,
			oas_details: {
				TerceroId: { Id: 0, NombreCompleto: null },
			},
		},
		lookupData: ["Not Started", "Need Assistance", "In Progress"],
		// searchButton: {
		// 	text: "Buscar",
		// 	onClick: async () => {
		// 		// console.clear();
		// 		let id = root.baseObj.identification_number;
		// 		console.log("Documento", id);
		// 		if (id !== null && id.toString().length > 0) {
		// 			root.loadShow("Buscando usuario", "#data .card-body");
		// 			// 202103121500: Verifica que no exista ya localmente
		// 			let r = await root.getUser(id);
		// 			console.log("r", r);
		// 			if (r.length > 0) {
		// 				root.loadHide();
		// 				root.$info(`El usuario con el documento "${id}" ya se encuentra registrado.`, function() {});
		// 			} else {
		// 				root.getOasUser({
		// 					doc: id,
		// 					cb: function(usr) {
		// 						// console.clear();
		// 						console.log("User", usr);
		// 						root.loadHide();
		// 						if (typeof usr.Id !== "undefined") {
		// 							root.baseObj.oas_user_id = usr.Id.toString();
		// 							root.baseObj.name = usr.TerceroId.NombreCompleto;
		// 						} else {
		// 							root.$info(`No se encontró ningún usuario con el documento "${id}"`, function() {});
		// 						}
		// 					},
		// 				});
		// 			}
		// 		}
		// 	},
		// },
	}),
	mounted() {
		root = this;
		console.log("Roles", root.roles);
		console.log("User", root.user);
		root.loaderElement = ".card-body.grid";
		root.loaderMessage = "Cargando usuarios";
		root.baseObj.created_by = root.user_id;
		root.baseObj.updated_by = root.user_id;
		let root_id = "#panel-usuarios";
		root.panelCmd = $(`${root_id}-cmds`);
		root.panelGrid = $(`${root_id}-grid`);
		root.panelData = $(`${root_id}-data`);
		console.log("User", root.user);
	},
	computed: {
		...mapGetters("usuario", ["getUserOasDetails"]),
		dataSource: function() {
			// // console.clear();
			return DxStore({
				key: ["id"],
				endPoint: "users",
				onLoading: function(loadOptions) {
					root.mode = "loading";
					console.log("loadOptions", loadOptions);
					$("#btn-add").fadeOut();
					console.log(root._sep);
					console.log("onLoading");
					root.loadShow();
					setTimeout(function() {
						console.log("SCROLL!");
						root.scrollTop();
					}, 300);
				},
				onLoaded: function(results, baseEntity) {
					// console.clear();
					console.log(root._sep);
					console.log("results", results);
					console.log("baseEntity", baseEntity);
					// 202103090243: Crea un array con Ids
					root.getOasUsers({
						users: results.data,
						field: "identification_number",
						cb: function(result) {
							console.log(root._sep);
							root.mode = null;
							console.log("RESULTADOS", result);
							root.grid.getVisibleRows().forEach((row) => {
								var filtered = result.filter((o) => o.id === row.data.id);
								if (filtered.length > 0) {
									// console.log("filtered[0]", filtered[0]);
									Object.assign(row.data, filtered[0]);
									root.grid.repaintRows([row.rowIndex]);
								}
							});
							$("#btn-add").fadeIn();
						},
					});
				},
			});
		},
	},
	methods: {
		...mapActions("auth/usuario", ["getUser", "saveUser", "updateUser", "getOasUsers", "getOasUser"]),
		search() {
			// console.clear();
			console.log("DOC", this.baseObj.identification_number);
		},
		add() {
			console.log("root.panelData", root.panelData);
			// root.panelData.find(".card-header").html(`<i class="icon-database-add"></i>&nbsp;&nbsp;Creando ${tit}`);
			root.panelCmd.fadeOut(window.speed);
			root.panelGrid.fadeOut(window.speed, function() {
				root.panelData.fadeIn(window.speed, function() {});
			});
		},
		edit(data) {
			// console.clear();
			console.log("data", data);
			data["identification_number"] = parseInt(data["identification_number"]);
			if (typeof data.oas_details.TerceroId === "undefined") {
				data["oas_details"] = { TerceroId: { Id: 0, NombreCompleto: null } };
			}
			this.baseObj = window.vm.$clone(data);
			// root.panelData.find(".card-header").html(`<i class="icon-database-edit"></i>&nbsp;&nbsp;${tit}`);
			root.panelCmd.fadeOut(window.speed);
			root.panelGrid.fadeOut(window.speed, function() {
				root.panelData.fadeIn(window.speed, function() {});
			});
		},
		cancel() {
			console.log("CANCEL!");
			$("#data-panel-usuario").fadeOut(window.speed, function() {
				$("#btn-add,#panel-usuarios").fadeIn(window.speed, function() {});
			});
		},
		roleText(cellInfo) {
			let res = "--";
			// console.log("root.roles", root.roles);
			if (typeof cellInfo.value !== undefined && cellInfo.value !== null) {
				var r = root.roles.filter((o) => o.id.toString() === cellInfo.valueText);
				// console.log("cellInfo.valueText", cellInfo.valueText);
				if (r.length > 0) res = r[0].name;
			}
			return res;
		},
		dateText(cellInfo) {
			if (typeof cellInfo.value !== undefined && cellInfo.value !== null) {
				return cellInfo.valueText;
			} else {
				return "--";
			}
		},
		async save() {
			// console.clear();
			this.baseObj.created_by = root.user_id;
			console.log("Obj", this.baseObj);
			root.loadShow("Buscando usuario", "#data .card-body");
			let r = await root.saveUser(this.baseObj);
			console.log("Saved", r);
			root.loadHide();
			root.grid.refresh();
			root.$info(`El usuario con el documento "${this.baseObj.identification_number}" se asoció exitosamente!`, function() {
				root.cancel();
			});
		},
		enable(id) {
			console.log("id", id);
		},
		active(data, state) {
			// console.clear();
			console.log("data", data);
			console.log("state", state);
			let a = state ? "activar" : "desactivar";
			let ti = data.data.oas_details.TerceroId;
			let mn = typeof ti !== "undefined" ? `<br>"${ti.NombreCompleto}"` : `con<br>el documento "${root.$formatDocument(data.data.identification_number)}"`;
			let msg = `¿Realmente desea ${a} al usuario ${mn}?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					let usr = data.data;
					usr.active = state;
					root.loaderMessage = `${state ? "Activando" : "Desactivando"} usuario`;
					root.loadShow();
					root.updateUser({
						user: usr,
						cb: function(result) {
							console.log("Result", result);
							root.grid.refresh();
							root.loadHide();
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
				optionChanged: (e) => {
					if (e.fullName == "paging.pageIndex") {
						console.log("optionChanged", e);
						root.loadShow();
					}
				},
				contentReady: () => {
					// console.log("contentReady", e);
					// console.log("root.mode", root.mode);
					if (root.mode == null) root.loadHide();
				},
				editorPreparing: (e) => {
					console.log("onEditorPreparing", e);
					if (e.parentType === "searchPanel") {
						e.editorOptions.onValueChanged = undefined;
						e.editorOptions.onEnterKey = function(arg) {
							e.component.searchByText(arg.component.option("value"));
						};
					}
				},
			});
		},
	},
};
</script>
