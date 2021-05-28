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
					<a href="#" @click.prevent="addOas" title="Crear usuario OAS..." class="btn btn-main btn-labeled btn-labeled-left legitRipple">
						<b><i class="icon-database-add"></i></b> CREAR USUARIO OAS
					</a>
					<a href="#" @click.prevent="add" title="Asociar usuario..." class="btn btn-main btn-labeled btn-labeled-left legitRipple ml-3">
						<b><i class="icon-database-add"></i></b> ASOCIAR USUARIO
					</a>
				</span>
			</div>
		</div>
		<div class="row slide" id="panel-usuarios-oas">
			<div class="col">
				<div class="card main">
					<div class="card-header main">Crear Usuario OAS</div>
					<div class="card-body pb-0 pt-2">
						<DxValidationGroup ref="vgUserOas">
							<div class="row">
								<div class="col-md-10">
									<div class="row">
										<div class="col">
											<div class="form-group">
												<label>Primer Nombre:</label>
												<DxTextBox
													:show-clear-button="true"
													:value.sync="tercero.PrimerNombre"
													class="form-control"
													placeholder="Primer Nombre"
													@value-changed="capitalize"
												>
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxTextBox>
											</div>
										</div>
										<div class="col">
											<div class="form-group">
												<label>Segundo Nombre:</label>
												<DxTextBox
													:show-clear-button="true"
													:value.sync="tercero.SegundoNombre"
													class="form-control"
													placeholder="Segundo Nombre"
													@value-changed="capitalize"
												>
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxTextBox>
											</div>
										</div>
										<div class="col">
											<div class="form-group">
												<label>Primer Apellido:</label>
												<DxTextBox
													:show-clear-button="true"
													:value.sync="tercero.PrimerApellido"
													class="form-control"
													placeholder="Primer Apellido"
													@value-changed="capitalize"
												>
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxTextBox>
											</div>
										</div>
										<div class="col">
											<div class="form-group">
												<label>Segundo Apellido:</label>
												<DxTextBox
													:show-clear-button="true"
													:value.sync="tercero.SegundoApellido"
													class="form-control"
													placeholder="Primer Apellido"
													@value-changed="capitalize"
												>
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxTextBox>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-2">
									<div class="form-group">
										<label>Documento de Identidad:</label>
										<DxNumberBox :show-clear-button="true" :value.sync="cedula.Numero" class="form-control" placeholder="Documento de Identidad">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxNumberBox>
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label>Rol:</label>
										<DxSelectBox
											:show-clear-button="true"
											:grouped="false"
											:data-source="roles"
											:value.sync="baseObj.user_role_id"
											:search-enabled="false"
											placeholder="Seleccione..."
											class="form-control"
											display-expr="name"
											value-expr="id"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxSelectBox>
									</div>
								</div>
								<div class="col-md-9">
									<div class="form-group">
										<label>Nombre Completo:</label>
										<DxTextBox :value.sync="nombre_completo" placeholder="Nombre Completo" class="form-control" :read-only="true" name="name" mode="text" />
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
								<DxButton @click="saveOas" class="nb">
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
		<Usuario :userRoles="roles" :baseObj="baseObj" :saveFn="save" :cancelFn="cancel" id="panel-usuarios-data" ref="Usuario" />
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
									:sort-index="0"
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
						<span class="font-weight-semibold">baseObj:</span> {{ JSON.stringify(baseObj, null, 3) }} <br />
						<span class="font-weight-semibold">tercero:</span> {{ JSON.stringify(tercero, null, 3) }} <br />
						<span class="font-weight-semibold">cedula:</span> {{ JSON.stringify(cedula, null, 3) }} <br />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
let root = null,
	$ = window.jQuery;
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
import { DxButton, DxSelectBox, DxTextBox, DxNumberBox, DxValidationGroup } from "devextreme-vue";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import { mapActions, mapGetters } from "vuex";
// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "inicio",
	components: {
		DxColumn,
		DxButton,
		DxLookup,
		DxColumnChooser,
		DxDataGrid,
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
		panelCmd: null,
		panelGrid: null,
		panelData: null,
		panelOas: null,
		actionTitle: null,
		gridLoading: false,
		baseObj: {
			name: null,
			identification_number: null,
			oas_user_id: null,
			user_role_id: null,
			active: true,
			created_by: 0,
			updated_by: 0,
			oas_details: {
				TerceroId: { Id: 0, NombreCompleto: null },
			},
		},
		tercero: {
			NombreCompleto: null,
			PrimerNombre: null,
			SegundoNombre: null,
			PrimerApellido: null,
			SegundoApellido: null,
			LugarOrigen: 0,
			FechaNacimiento: "1992-05-29T12:00:00Z",
			Activo: true,
			TipoContribuyenteId: {
				Id: 1,
				Nombre: "PERSONA NATURAL",
				Descripcion: "",
				CodigoAbreviacion: "P_NATURAL",
				Activo: true,
			},
		},
		cedula: {
			Numero: null,
			DigitoVerificacion: 0,
			CiudadExpedicion: 0,
			FechaExpedicion: null,
			Activo: true,
			TerceroId: {},
			TipoDocumentoId: {
				Id: 3,
				Nombre: "CÉDULA DE CIUDADANÍA",
				Descripcion: "CÉDULA DE CIUDADANÍA",
				CodigoAbreviacion: "CC",
				Activo: true,
				NumeroOrden: 0,
			},
		},
	}),
	created() {
		root = this;
	},
	mounted() {
		root.loaderElement = ".card-body.grid";
		root.loaderMessage = "Cargando usuarios";
		root.baseObj.created_by = root.user_id;
		root.baseObj.updated_by = root.user_id;
		let root_id = "#panel-usuarios";
		root.panelCmd = `${root_id}-cmds`;
		root.panelGrid = `${root_id}-grid`;
		root.panelData = `${root_id}-data`;
		root.actionTitle = `${root_id}-data #action-title`;
		root.panelOas = `${root_id}-oas`;
		// 202104121825: TO para esperar la cargar de módulos
		setTimeout(function() {
			// DxNumberBox del documento de identidad, niveles de ref
			root.nbId = root.$refs.Usuario.$refs.nbId.instance.instance();
			console.log("root.nbId options =>", root.nbId.option());
		}, 2000);
	},
	computed: {
		...mapGetters("usuario", ["getUserOasDetails"]),
		nombre_completo: () => {
			let n = [];
			let t = root.tercero;
			if (t.PrimerNombre !== null) n.push(t.PrimerNombre);
			if (t.SegundoNombre !== null) n.push(t.SegundoNombre);
			if (t.PrimerApellido !== null) n.push(t.PrimerApellido);
			if (t.SegundoApellido !== null) n.push(t.SegundoApellido);
			root.tercero.NombreCompleto = n.join(" ");
			return root.tercero.NombreCompleto;
		},
		dataSource: function() {
			// console.clear();
			return DxStore({
				key: ["id"],
				endPoint: "users",
				onLoading: function(loadOptions) {
					console.log("loadOptions", loadOptions);
					$("#btn-add").fadeOut();
					console.log(root._sep);
					console.log("onLoading");
					root.gridLoading = true;
					root.loaderShow();
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
							console.log("RESULTADOS", result);
							root.grid.getVisibleRows().forEach((row) => {
								var filtered = result.filter((o) => o.id === row.data.id);
								if (filtered.length > 0) {
									Object.assign(row.data, filtered[0]);
									root.grid.repaintRows([row.rowIndex]);
								}
							});
							console.log("FINALIZÓ CARGA DE DETALLES!");
							if (root.gridLoading) {
								root.gridLoading = false;
								root.loaderHide();
							}
						},
					});
				},
			});
		},
	},
	methods: {
		...mapActions("auth/usuario", ["getUser", "saveUser", "saveUserOas", "updateUser", "activeUser", "getOasUsers", "getOasUser"]),
		search() {
			console.log("DOC", this.baseObj.identification_number);
		},
		userExists: async (id) => {
			let r = await root.getUser(id);
			if (r.length > 0) {
				root.loaderHide();
				root.$info(`El usuario con el documento "${id}" ya se encuentra registrado.`);
				return true;
			} else return false;
		},
		save(validationGroup) {
			if (validationGroup === "skip" || validationGroup.validate().isValid) {
				console.log("Save => Usuario Enviado =>", root.baseObj);
				if (!validationGroup === "skip") root.loaderShow("Guardando usuario", root.panelData);
				let fn = root.saveUser;
				if (root.mode == "edit") {
					fn = root.updateUser;
					root.baseObj.updated_by = root.user_id;
				} else root.baseObj.updated_by = root.user_id;
				fn({
					user: root.baseObj,
					cb: function(result) {
						console.log("USUARIO GUARDADO! =>", result);
						root.cancel();
						root.grid.refresh();
					},
				});
			}
		},
		saveOas: async () => {
			// console.clear();
			let valid = root.$refs.vgUserOas.instance.validate().isValid;
			console.log("isValid", valid);
			if (valid) {
				root.loaderMessage = "Creando Usuario OAS";
				root.loaderElement = "#panel-usuarios-oas .card";
				root.loaderShow();
				let exist = await root.userExists(root.cedula.Numero);
				console.log("EXISTE?", exist);
				if (!exist)
					root.saveUserOas({
						tercero: root.tercero,
						cedula: root.cedula,
						cb: function(result) {
							console.log("USUARIO OAS GUARDADO! Recibido =>", result);
							root.baseObj.name = result.TerceroId.NombreCompleto;
							root.baseObj.identification_number = result.Numero;
							root.baseObj.oas_user_id = result.TerceroId.Id;
							root.baseObj.active = true;
							root.save("skip");
						},
					});
			}
		},
		addOas() {
			root.mode = "add-oas";
			$(root.panelCmd).fadeOut();
			$(root.panelGrid).fadeOut(function() {
				$(root.panelOas).fadeIn();
			});
		},
		add() {
			root.mode = "add";
			// 202104121835: Cambia el numberbox en el sub nivel
			root.nbId.option("readOnly", false);
			$(root.actionTitle).text("Asociar usuario");
			$(root.panelCmd).fadeOut();
			$(root.panelGrid).fadeOut(function() {
				$(root.panelData).fadeIn();
			});
		},
		edit(data) {
			root.mode = "edit";
			console.log("data", data);
			data["identification_number"] = parseInt(data["identification_number"]);
			if (typeof data.oas_details.TerceroId === "undefined") {
				data["oas_details"] = { TerceroId: { Id: 0, NombreCompleto: null } };
			} else {
				data.oas_id = data.oas_details.TerceroId.Id;
				data.name = data.oas_details.TerceroId.NombreCompleto;
			}
			// 202104121835: Cambia el numberbox en el sub nivel
			root.nbId.option("readOnly", true);
			this.baseObj = window.vm.$clone(data);
			$(root.actionTitle).text("Editar Usuario");
			$(root.panelCmd).fadeOut();
			$(root.panelGrid).fadeOut(function() {
				$(root.panelData).fadeIn();
			});
		},
		cancel() {
			console.log("root.mode =>", root.mode);
			$(root.mode == "add-oas" ? root.panelOas : root.panelData).fadeOut(function() {
				$(root.panelCmd).fadeIn();
				$(root.panelGrid).fadeIn(function() {
					root.$refs.vgUserOas.instance.reset();
					root.mode = null;
				});
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
					root.loaderShow();
					root.activeUser({
						user: usr,
						cb: function(result) {
							console.log("Result", result);
							root.grid.refresh();
							root.loaderHide();
						},
					});
				}
			});
		},
		gridInit(e) {
			root.grid = e.component;
			// 202103311458: https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Events/
			root.grid.on({
				optionChanged: (e) => {
					if (e.fullName == "paging.pageIndex") {
						console.log("optionChanged", e);
						root.loaderShow();
					}
				},
				contentReady: () => {
					// console.log("contentReady", e);
					console.log("root.gridLoading", root.gridLoading);
					if (!root.gridLoading) root.loaderHide();
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
