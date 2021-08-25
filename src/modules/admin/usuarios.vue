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
					<!-- <a href="#" @click.prevent="addOas" title="Crear usuario OAS..." class="btn btn-main btn-labeled btn-labeled-left legitRipple">
						<b><i class="icon-database-add"></i></b> CREAR USUARIO OAS
					</a> -->
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
											GUARDAR<b><i class="icon-database-add"></i></b>
										</span>
									</template>
								</DxButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Usuario :userRoles="roles" :baseObj="baseObj" :saveFn="save" :cancelFn="cancel" :faculties="facultades" id="panel-usuarios-data" ref="Usuario" />
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
								<DxFilterRow :visible="true" />
								<DxGrouping :auto-expand-all="false" />
								<DxGroupPanel :visible="false" :allow-column-dragging="true" />
								<DxLoadPanel :enabled="false" />
								<DxPaging :page-size="dgPageSize" /><!-- dgPageSize -->
								<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
								<DxSorting mode="multiple" /><!-- single, multiple, none -->
								<DxStateStoring :enabled="true" type="sessionStorage" />
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
								</DxSummary>
								<DxPager
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="dgPageSizes"
									info-text="Página {0} de {1} ({2} usuarios)"
								/>
								<DxColumn
									:width="90"
									:sort-index="0"
									sort-order="asc"
									:allow-filtering="false"
									:allow-search="false"
									:allow-sorting="true"
									alignment="center"
									caption="ID"
									data-field="id"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="false"
									:allow-sorting="false"
									:customize-text="nullText"
									:width="90"
									alignment="center"
									caption="OAS ID"
									data-field="oas_details.TerceroId.Id"
									data-type="string"
								/>
								<DxColumn
									:width="120"
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
									:customize-text="nullTextTitle"
									alignment="center"
									caption="Nombre"
									data-field="oas_details.TerceroId.NombreCompleto"
									data-type="string"
								/>
								<DxColumn
									width="120"
									data-type="number"
									:allow-filtering="true"
									:allow-sorting="true"
									:customize-text="nullText"
									alignment="center"
									caption="Estructuras"
									data-field="total_structures"
									cell-template="tpl-structures"
								/>
								<template #tpl-structures="{ data }">
									<span v-if="data.data.total_structures > 1">
										<a
											href="#"
											class="color-main-600"
											@click.prevent="loadStructures(data.data)"
											@mouseover="tooltip($event, data.data, true)"
											@mouseleave="tooltip($event, data.data, false)"
										>
											T:{{ data.data.total_structures }} / A:{{ data.data.total_active_structures }} / I:{{ data.data.total_inactive_structures }}
										</a>
									</span>
									<span v-else>0</span>
								</template>
								<DxColumn
									width="90"
									:allow-filtering="true"
									:allow-sorting="true"
									:customize-text="nullText"
									alignment="center"
									caption="Activo en"
									data-field="total_active_structures"
									data-type="number"
								/>
								<DxColumn
									width="90"
									:allow-filtering="true"
									:allow-sorting="true"
									:customize-text="nullText"
									alignment="center"
									caption="Inactivo en"
									data-field="total_inactive_structures"
									data-type="number"
								/>
								<DxColumn
									width="100"
									:allow-filtering="true"
									:allow-sorting="true"
									:customize-text="nullText"
									alignment="center"
									caption="Facultades"
									data-field="total_faculties"
									data-type="number"
								/>
								<DxColumn
									:width="140"
									:sort-index="0"
									:allow-filtering="true"
									:allow-sorting="true"
									:customize-text="nullText"
									alignment="center"
									caption="Rol"
									data-field="user_role_id"
									data-type="number"
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
		<DxTooltip ref="ttip" position="top">
			<template>
				<span>
					<span class="font-weight-semibold color-main-600">Estructuras:</span> {{ structureObj.total_structures }}<br />
					<span class="font-weight-semibold color-main-600">Activo en:</span> {{ structureObj.total_active_structures }}<br />
					<span class="font-weight-semibold color-main-600">Inactivo en:</span> {{ structureObj.total_inactive_structures }}<br />
					<small class="font-weight-semibold"><i>(Clic para observar)</i></small>
				</span>
			</template>
		</DxTooltip>
		<DxPopup
			:drag-enabled="false"
			:close-on-outside-click="false"
			:show-title="true"
			:width="1200"
			:height="840"
			:title="structureObj.title"
			:visible="popupVisible"
			@hidden="popupVisible = false"
		>
			<DxDataGrid
				class="main"
				width="100%"
				:allow-column-reordering="true"
				:data-source="structures"
				:remote-operations="false"
				:hover-state-enabled="true"
				:row-alternation-enabled="true"
				:show-borders="false"
			>
				<DxColumnChooser :enabled="false" mode="dragAndDrop" />
				<DxFilterRow :visible="true" />
				<DxGrouping :auto-expand-all="true" />
				<DxGroupPanel :visible="true" :allow-column-dragging="true" />
				<DxLoadPanel :enabled="false" />
				<DxPaging :page-size="dgPageSize" />
				<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
				<DxSorting mode="single" />
				<DxSummary>
					<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} estructuras" />
				</DxSummary>
				<DxPager
					:show-info="true"
					:show-page-size-selector="false"
					:show-navigation-buttons="true"
					:allowed-page-sizes="dgPageSizes"
					info-text="Página {0} de {1} ({2} estructuras)"
				/>
				<DxColumn
					:width="90"
					:sort-index="0"
					sort-order="asc"
					:allow-filtering="false"
					:allow-search="false"
					:allow-sorting="true"
					alignment="center"
					caption="ID"
					data-field="research_group_id"
					data-type="number"
				/>
				<DxColumn
					:allow-filtering="true"
					:allow-sorting="true"
					:customize-text="nullTextTitle"
					alignment="left"
					caption="Nombre"
					data-field="research_group_name"
					data-type="string"
				/>
				<DxColumn
					:width="170"
					:allow-filtering="true"
					:allow-sorting="true"
					:customize-text="nullText"
					alignment="center"
					caption="Tipo"
					data-field="group_type_id"
					data-type="number"
					:group-index="1"
				>
					<DxLookup :data-source="tiposUnidad" value-expr="id" display-expr="st_name" />
				</DxColumn>
				<DxColumn
					:width="100"
					:allow-filtering="true"
					:allow-sorting="true"
					:customize-text="nullText"
					alignment="center"
					caption="Estado en la estructura"
					data-field="gm_state_id"
					data-type="string"
					:group-index="0"
				>
					<DxLookup :data-source="estadosUnidad" value-expr="id" display-expr="st_name" />
				</DxColumn>
				<DxColumn
					:width="120"
					:sort-index="0"
					:allow-filtering="user_roles.length > 1"
					:allow-sorting="user_roles.length > 1"
					:customize-text="nullText"
					alignment="center"
					caption="Rol"
					data-field="role_id"
					data-type="number"
				>
					<DxLookup :data-source="user_roles" value-expr="role_id" display-expr="role_name" />
				</DxColumn>
				<DxColumn :allow-filtering="false" data-field="research_group_id" caption="" :width="120" alignment="center" cell-template="tplCommands" />
				<template #tplCommands="{ data }">
					<span class="cmds">
						<a
							title="Observar información..."
							href="#"
							@click.prevent="go(data.value, `/unidad/${data.value}`, 'Cargando Información')"
							class="cmd-item color-main-600 mr-2"
						>
							<i class="icon-info"></i>
						</a>
						<a
							title="Observar documentos..."
							href="#"
							@click.prevent="go(data.value, `/unidad/${data.value}/documentos`, 'Cargando Documentos')"
							class="cmd-item color-main-600 mr-2"
						>
							<i class="icon-file-pdf"></i>
						</a>
						<a
							title="Observar integrantes..."
							href="#"
							@click.prevent="go(data.value, `/unidad/${data.value}/integrantes`, 'Cargando Integrantes')"
							class="cmd-item color-main-600 mr-2"
						>
							<i class="icon-users"></i>
						</a>
						<a
							title="Observar producción..."
							href="#"
							@click.prevent="go(data.value, `/unidad/${data.value}/produccion`, 'Cargando Producción')"
							class="cmd-item color-main-600"
						>
							<i class="icon-trophy"></i>
						</a>
					</span>
				</template>
			</DxDataGrid>
		</DxPopup>
		<div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<span class="font-weight-semibold">baseObj:</span> {{ JSON.stringify(baseObj, null, 3) }}
						<hr />
						<span class="font-weight-semibold">tercero:</span> {{ JSON.stringify(tercero, null, 3) }}
						<hr />
						<span class="font-weight-semibold">cedula:</span> {{ JSON.stringify(cedula, null, 3) }}
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
	DxLookup,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxStateStoring,
	DxSummary,
} from "devextreme-vue/data-grid";
import { DxButton, DxSelectBox, DxTextBox, DxNumberBox, DxPopup, DxTooltip, DxValidationGroup } from "devextreme-vue";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import { mapActions, mapGetters } from "vuex";
// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "inicio",
	components: {
		DxButton,
		DxColumn,
		DxColumnChooser,
		DxDataGrid,
		DxFilterRow,
		DxGrouping,
		DxGroupItem,
		DxGroupPanel,
		DxLoadPanel,
		DxLookup,
		DxNumberBox,
		DxPager,
		DxPaging,
		DxPopup,
		DxRequiredRule,
		DxSearchPanel,
		DxSelectBox,
		DxSorting,
		DxStateStoring,
		DxSummary,
		DxTextBox,
		DxTooltip,
		DxValidationGroup,
		DxValidator,
		Usuario: () => import("@/components/element/usuario"),
	},
	data: () => ({
		mode: null,
		items: [],
		user_roles: [],
		popupVisible: false,
		grid: null,
		structures: [],
		structureObj: {
			title: null,
			total_structures: 0,
			total_active_structures: 0,
			total_inactive_structures: 0,
		},
		ttip: null,
		grupo: null,
		results: "",
		testId: "1032479929",
		panelCmd: null,
		panelGrid: null,
		panelData: null,
		panelOas: null,
		actionTitle: null,
		gridLoading: false,
		baseObjBk: null,
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
		root.getFacultades();
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
		root.ttip = root.$refs.ttip.instance;
		console.log("root.ttip", root.ttip);
		// 202104121825: TO para esperar la cargar de módulos
		setTimeout(function() {
			// DxNumberBox del documento de identidad, niveles de ref
			root.nbId = root.$refs.Usuario.$refs.nbId.instance.instance();
			console.log("root.nbId options =>", root.nbId.option());
			root.baseObjBk = root.$clone(root.baseObj);
			console.log("Facultades =>", root.facultades);
		}, 2000);
	},
	computed: {
		...mapGetters("unidad/oas", ["facultades"]),
		...mapGetters("usuario", ["getUserOasDetails"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
		tiposUnidad() {
			return root.subtypesByType("unidad_tipo");
		},
		estadosUnidad() {
			let eu = root.subtypesByType("unidad_estado");
			console.log("Estado unidad =>", eu);
			return eu;
		},
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
		...mapActions("unidad/oas", { getFacultades: "facultades" }),
		...mapActions("auth/usuario", ["getUser", "saveUser", "saveUserOas", "updateUser", "activeUser", "getOasUsers", "getOasUser", "getStructures"]),
		loadStructures(data) {
			root.loaderShow("Cargando estructuras", "#data-container .card-body");
			root.getStructures({
				doc: data.identification_number,
				cb: function(groups) {
					// console.clear();

					// 202107051930: Construye la matriz para el selector de roles
					let ur = [];
					groups.forEach((item) => {
						if (ur.filter((o) => o.role_id == item.role_id).length <= 0) {
							ur.push({
								role_id: item.role_id,
								role_name: item.role_name,
							});
						}
					});
					root.user_roles = ur;

					let t = groups.length + " estructuras asociadas";
					let od = data.oas_details.TerceroId;
					if (typeof od !== "undefined") {
						t += ` al usuario "${od.NombreCompleto}"`;
					} else {
						t += ` al documento "${data.identification_number}"`;
					}
					root.structureObj.title = t;
					root.popupVisible = true;
					root.structures = groups;
					console.log("root.structures =>", root.structures);
					console.log("data =>", data);
					root.loaderHide();
				},
			});
		},
		tooltip(e, data, show) {
			// console.clear();
			let el = e.target || e.srcElement;
			// console.log("el =>", el);
			// console.log("ttip =>", root.ttip);
			// console.log("show =>", show);
			// console.log("data =>", data);
			if (show) {
				root.structureObj = data;
				root.ttip.option("target", el);
				root.ttip.show();
			} else {
				root.ttip.hide();
			}
		},
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
			console.clear();
			if (validationGroup === "skip" || validationGroup.validate().isValid) {
				console.log("Save => Usuario Enviado =>", root.baseObj);
				// if (!validationGroup === "skip") root.loaderShow("Guardando usuario", "#panel-usuarios-data");
				root.loaderShow("Guardando usuario", "#panel-usuarios-data .card:first-child");
				let fn = root.saveUser;
				if (root.mode == "edit") {
					fn = root.updateUser;
					root.baseObj.updated_by = root.user_id;
					// 202107040342: get_role_id en main.js
					if (root.baseObj.user_role_id !== root.get_role_id("gestor_facultad")) root.baseObj.faculties_ids = [];
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
			console.clear();
			root.mode = "edit";
			console.log("data", data);
			data["identification_number"] = parseInt(data["identification_number"]);
			if (typeof data.oas_details.TerceroId === "undefined") {
				data["oas_details"] = { TerceroId: { Id: 0, NombreCompleto: null } };
			} else {
				data.oas_id = data.oas_details.TerceroId.Id;
				data.oas_user_id = data.oas_details.TerceroId.Id;
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
					root.baseObj = root.$clone(root.baseObjBk);
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
					usr.updated_by = root.user_id;
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
				contentReady: (e) => {
					console.log("contentReady", e);
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
