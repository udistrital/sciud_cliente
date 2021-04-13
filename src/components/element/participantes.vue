<template>
	<div class="col p-0 m-0 slide" :id="id">
		<div class="row data slide internos">
			<div class="col">
				<div class="card">
					<div class="card-header main">{{ editandoInterno ? "Editar" : "Agregar" }} Participante Interno</div>
					<div class="card-body mb-0 pb-0 pt-3">
						<DxValidationGroup ref="valGroupInt">
							<div class="row">
								<div class="col-md-3">
									<div class="form-group">
										<label>Documento de Integrante:</label>
										<DxSelectBox
											:grouped="false"
											:data-source="groupResearchers"
											:value.sync="baseObj.researcher_id"
											@value-changed="userSearch"
											:search-enabled="true"
											placeholder="Seleccione..."
											:read-only="editandoInterno"
											class="form-control"
											display-expr="researcher.identification_number"
											value-expr="researcher.id"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxSelectBox>
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label>Tipo de Participante:</label>
										<DxSelectBox
											:grouped="false"
											:data-source="rolesParticipante"
											:value.sync="baseObj.participant_type_id"
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
								<div class="col-md-5">
									<div class="form-group">
										<label>Nombre:</label>
										<DxTextBox :value.sync="baseObj.name" placeholder="Nombre" class="form-control" :read-only="true">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>
								<div class="col-md-1">
									<div class="form-group">
										<label>OAS ID:</label>
										<DxTextBox :value.sync="baseObj.oas_researcher_id" placeholder="OAS ID" class="form-control" :read-only="true">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>
							</div>
						</DxValidationGroup>
					</div>
					<div class="card-footer">
						<div class="row">
							<div class="col">
								<DxButton @click="userCancel()" class="nb">
									<template #default>
										<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
											<b><i class="icon-database-remove"></i></b> CANCELAR
										</span>
									</template>
								</DxButton>
							</div>
							<div class="col text-right">
								<DxButton @click="userSave('int')" class="nb">
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
		<div class="row data slide externos">
			<div class="col">
				<div class="card">
					<div class="card-header main">{{ editandoExterno ? "Editar" : "Agregar" }} Participante Externo</div>
					<div class="card-body mb-0 pb-0 pt-3">
						<DxValidationGroup ref="valGroupExt">
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<label>Tipo de Participante:</label>
										<DxSelectBox
											:grouped="false"
											:data-source="rolesParticipante"
											:value.sync="baseObj.participant_type_id"
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
								<div class="col-md-4">
									<div class="form-group">
										<label>Nombre(s):</label>
										<!-- :element-attr="{ style: 'text-transform:uppercase' }" -->
										<DxTextBox
											:value.sync="baseObj.first_name"
											placeholder="Nombre(s)"
											class="form-control"
											@value-changed="capitalize"
											:read-only="false"
											mode="text"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<label>Apellido(s):</label>
										<DxTextBox
											:value.sync="baseObj.last_name"
											placeholder="Apellido(s)"
											class="form-control"
											@value-changed="capitalize"
											:read-only="false"
											mode="text"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>
							</div>
						</DxValidationGroup>
					</div>
					<div class="card-footer">
						<div class="row">
							<div class="col">
								<DxButton @click="userCancel()" class="nb">
									<template #default>
										<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
											<b><i class="icon-database-remove"></i></b> CANCELAR
										</span>
									</template>
								</DxButton>
							</div>
							<div class="col text-right">
								<DxButton @click="userSave('ext')" class="nb">
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
		<div class="grid">
			<div class="row">
				<div class="col">
					<div class="page-header header-elements-md-inline">
						<div class="page-title"><i class="icon-users mr-1 color-main-600"></i> Participantes Internos</div>
						<div class="header-elements">
							<button
								type="button"
								@click.prevent="userAdd('int')"
								title="Agregar Participante interno..."
								class="btn btn-main btn-labeled btn-labeled-left"
								id="btn-add-int"
							>
								<b><i class="icon-user-plus"></i></b> Nuevo Participante Interno
							</button>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<DxDataGrid
								class="main"
								width="100%"
								:dataSource="dataSourceInt"
								@initialized="gridInitInt"
								:allow-column-reordering="false"
								no-data-text="No hay participantes registrados"
								:remote-operations="true"
								:hover-state-enabled="true"
								:row-alternation-enabled="true"
								:show-borders="false"
							>
								<DxExport :enabled="false" />
								<DxColumnChooser :enabled="false" mode="dragAndDrop" />
								<DxSorting mode="single" /><!-- single, multiple, none" -->
								<DxPaging :page-size="10" />
								<DxFilterRow :visible="false" />
								<DxLoadPanel :enabled="false" />
								<DxGroupPanel :visible="false" :allow-column-dragging="true" />
								<DxGrouping :auto-expand-all="false" />
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
								</DxSummary>
								<DxPager
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="dgPageSizes"
									info-text="Página {0} de {1} ({2} participantes en el grupo)"
								/>
								<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
								<DxColumn
									:allow-grouping="false"
									:allow-filtering="false"
									:allow-search="false"
									:allow-sorting="true"
									:width="120"
									alignment="center"
									caption="ID"
									data-field="id"
									data-type="string"
								/>
								<DxColumn
									:allow-grouping="false"
									:allow-filtering="false"
									:allow-sorting="true"
									:customize-text="nullText"
									:width="120"
									alignment="center"
									caption="Investigador ID"
									data-field="researcher_id"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="true"
									:allow-sorting="true"
									:allow-grouping="false"
									:customize-text="$formatDocument"
									alignment="center"
									caption="Identificación"
									data-field="identification_number"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="true"
									:allow-sorting="true"
									:allow-grouping="false"
									:customize-text="nullText"
									alignment="center"
									caption="Nombre(s)"
									data-field="first_name"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="true"
									:allow-sorting="true"
									:allow-grouping="false"
									alignment="center"
									:customize-text="nullText"
									caption="Apellido(s)"
									data-field="last_name"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="true"
									:allow-sorting="true"
									:allow-grouping="false"
									alignment="center"
									caption="Tipo de Participante"
									data-field="participant_type_name"
									data-type="string"
								/>
								<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editMode" />
								<template #tpl="{ data }">
									<span class="cmds">
										<a title="Editar usuario..." class="cmd-item color-main-600" @click.prevent="userEdit(data.data, 'int')" href="#">
											<i class="icon-database-edit"></i>
										</a>
									</span>
								</template>
							</DxDataGrid>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<div class="page-header header-elements-md-inline">
						<div class="page-title"><i class="icon-users mr-1 color-main-600"></i> Participantes Externos</div>
						<div class="header-elements">
							<button
								type="button"
								@click.prevent="userAdd('ext')"
								title="Agregar Participante externo..."
								class="btn btn-main btn-labeled btn-labeled-left"
								id="btn-add-ext"
							>
								<b><i class="icon-user-plus"></i></b> Nuevo Participante Externo
							</button>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<DxDataGrid
								class="main"
								width="100%"
								:dataSource="dataSourceExt"
								@initialized="gridInitExt"
								:allow-column-reordering="false"
								:remote-operations="true"
								no-data-text="No hay participantes registrados"
								:hover-state-enabled="true"
								:row-alternation-enabled="true"
								:show-borders="false"
							>
								<DxExport :enabled="false" />
								<DxColumnChooser :enabled="false" mode="dragAndDrop" />
								<DxSorting mode="single" /><!-- single, multiple, none" -->
								<DxPaging :page-size="10" />
								<DxFilterRow :visible="false" />
								<DxLoadPanel :enabled="false" />
								<DxGroupPanel :visible="false" :allow-column-dragging="true" />
								<DxGrouping :auto-expand-all="false" />
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
								</DxSummary>
								<DxPager
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="dgPageSizes"
									info-text="Página {0} de {1} ({2} participantes externos)"
								/>
								<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
								<DxColumn
									:allow-grouping="false"
									:allow-filtering="false"
									:allow-search="false"
									:allow-sorting="true"
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
									caption="Nombre(s)"
									data-field="first_name"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="true"
									:allow-sorting="true"
									:allow-grouping="false"
									alignment="center"
									caption="Apellido(s)"
									data-field="last_name"
									data-type="string"
								/>
								<DxColumn
									:allow-filtering="false"
									:allow-sorting="true"
									:customize-text="nullText"
									alignment="center"
									caption="Tipo de Participante"
									data-field="participant_type_name"
									data-type="string"
								/>
								<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editMode" />
								<template #tpl="{ data }">
									<span class="cmds">
										<a title="Editar usuario..." class="cmd-item color-main-600" @click.prevent="userEdit(data.data, 'ext')" href="#">
											<i class="icon-database-edit"></i>
										</a>
									</span>
								</template>
							</DxDataGrid>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root, cmds;
let gridSize = 15;
let $ = window.jQuery;
import { mapGetters, mapActions } from "vuex";
import {
	DxColumn,
	DxColumnChooser,
	DxExport,
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
import { DxButton, DxSelectBox, DxSwitch, DxTextBox, DxNumberBox, DxValidationGroup } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import DxStore from "@/store/dx";
export default {
	name: "datosBasicos",
	components: {
		DxTextBox,
		DxButton,
		DxColumn,
		DxColumnChooser,
		DxDataGrid,
		DxExport,
		DxFilterRow,
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
		idint: null,
		panelExt: null,
		panelInt: null,
		panelGrid: null,
		isValid: false,
		btnCancel: null,
		btnAdd: null,
		gridInt: null,
		gridExt: null,
		loading: false,
		editParticipante: false,
		editandoInterno: false,
		editandoExterno: false,
		rolesParticipante: [],
		groupResearchers: [],
		internalParticipants: [],
		baseEnt: null,
		baseObj: {
			oas_researcher_id: null,
			researcher_id: null,
			participant_type_id: null,
			first_name: null,
			last_name: null,
			name: null,
			updated_by: null,
		},
	}),
	beforeUpdate() {
		console.log(this.$sep);
		console.log("beforeUpdate participantes.vue");
	},
	updated() {
		console.log(this.$sep);
		console.log("updated participantes.vue");
	},
	beforeDestroy() {
		console.log(this.$sep);
		console.log("beforeDestroy participantes.vue");
	},
	destroyed() {
		console.log(this.$sep);
		console.log("destroyed participantes.vue");
	},
	created() {
		root = this;
		root.getResearchers({
			id: this.group.id,
			cb: function(results) {
				console.log(root.$sep);
				root.groupResearchers = results.researchers;
				console.log("root.groupResearchers", root.groupResearchers);
			},
		});
	},
	mounted() {
		console.log(root.$sep);
		root.rolesParticipante = root.subtypesByType(32);
		root.valGroupExt = root.$refs.valGroupExt.instance;
		root.valGroupInt = root.$refs.valGroupInt.instance;
		root.loaderElement = "#panel-unidades .card-body"; //producto-participantes-ext
		root.baseEnt = this.$clone(this.baseObj);
		root.panelInt = $("#" + root.id + " .data.internos");
		root.panelExt = $("#" + root.id + " .data.externos");
		root.panelGrid = $("#" + root.id + " .grid");
		console.log("root.id", root.id);
		console.log("root.panelGrid", root.panelGrid);
		console.log("participantes MOUNTED!");
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),

		dataSourceExt: function() {
			if (this.product.id === null) return null;
			console.log("root.baseObj", this.baseObj);
			return DxStore({
				key: ["id"],
				endPoint: `${this.endPoint}/${this.product.id}/ext_participants`,
				onLoading: function() {
					root.loading = true;
					// root.loaderMessage = "Cargando Participantes";
					// root.loaderShow();
				},
				onLoaded: function(results) {
					console.log("results participantes externos", results);
					root.loadEnd();
				},
			});
		},

		dataSourceInt: function() {
			if (this.product.id === null) return null;
			console.log("root.baseObj", this.baseObj);
			return DxStore({
				key: ["id"],
				endPoint: `${this.endPoint}/${this.product.id}/int_participants`,
				onLoading: function() {
					root.loading = true;
					// root.loaderMessage = "Cargando Participantes";
					// root.loaderShow();
				},
				onApiLoaded: async (internals) => {
					// 202104110311: Modifica la información recibida del Endpoint antes de enviarla a la grilla
					// console.clear();
					console.log(root._sep);
					console.log("root.groupResearchers", root.groupResearchers);
					console.log("onApiLoaded", internals);
					let researchers_to_oas = [];
					internals.data.forEach((item) => {
						root.groupResearchers.forEach((rs) => {
							console.log(rs.researcher.id + "==" + item.researcher_id);
						});
						let researcher = root.groupResearchers.find((o) => o.researcher.id == item.researcher_id);
						if (typeof researcher !== "undefined") researchers_to_oas.push(researcher);
					});
					console.log("researchers_to_oas", researchers_to_oas);
					if (researchers_to_oas.length <= 0) return internals;
					return await root.getOasUsers({
						users: researchers_to_oas,
						field: "researcher.identification_number",
						cb: function(internalsWithOas) {
							console.log(root._sep);
							console.log("internalsWithOas =>", internalsWithOas);
							internals.data.forEach((item) => {
								var final = internalsWithOas.filter((o) => o.researcher.id === item.researcher_id);
								if (final.length > 0) {
									let ti = final[0].oas_details.TerceroId;
									item["identification_number"] = final[0].oas_details.Numero;
									item["oas_researcher_id"] = ti.Id;
									item["first_name"] = ti.PrimerNombre + " " + ti.SegundoNombre;
									item["last_name"] = ti.PrimerApellido + " " + ti.SegundoApellido;
									console.log("item", item);
								}
							});
							// console.clear();
							console.log("internals", internals);
							return internals;
						},
					});
				},
				onLoaded: function(results) {
					console.log(root._sep);
					console.log("results participantes internos", results);
					root.loadEnd();
				},
			});
		},
	},
	props: {
		editMode: {
			type: Boolean,
			default: true,
		},
		id: {
			type: String,
			default: () => "panel-participantes",
		},
		endPoint: {
			type: String,
			default: () => null,
		},
		product: {
			type: Object,
			default: () => null,
		},
		saveFn: {
			type: Function,
			default: null,
		},
		cancelFn: {
			type: Function,
			default: null,
		},
		parent: {
			type: Object,
			default: () => null,
		},
		group: {
			type: Object,
			default: () => {},
		},
	},
	methods: {
		...mapActions("auth/usuario", ["getUser", "getOasUsers", "getOasUser"]),
		...mapActions("unidad/integrantes", ["participantCreate", "participantUpdate"]),
		...mapActions("unidad", ["getResearcher", "getResearchers", "saveResearcher", "addResearcherToGroup", "researchers"]),

		userEdit(data, accion) {
			root.editParticipante = true;
			root.editandoInterno = accion == "int";
			root.editandoExterno = accion == "ext";
			console.log("data", data);
			this.baseObj = data;
			this.idint = data.id;
			console.log("id data ", data.id);
			root.parent.panelCmdBack.fadeOut();
			if (accion == "int") {
				root.panelGrid.fadeOut(function(params) {
					root.panelInt.fadeIn(function(params) {});
				});
			} else {
				root.panelGrid.fadeOut(function(params) {
					root.panelExt.fadeIn(function(params) {});
				});
			}
		},

		userAdd(accion) {
			root.editParticipante = false;
			root.editandoInterno = false;
			root.editandoExterno = false;
			root.baseObj = root.baseEnt;
			root.parent.panelCmdBack.fadeOut();
			if (accion == "int") {
				console.log("root.group", root.group);
				console.log("groupResearchers", root.groupResearchers);
				root.panelGrid.fadeOut(function(params) {
					root.panelInt.fadeIn(function(params) {});
				});
			} else {
				root.panelGrid.fadeOut(function(params) {
					root.panelExt.fadeIn(function(params) {});
				});
			}
		},

		userCancel() {
			if (root.panelInt.is(":visible")) {
				root.panelInt.fadeOut(function(params) {
					root.parent.panelCmdBack.fadeIn();
					root.panelGrid.fadeIn(function(params) {
						root.valGroupInt.reset();
					});
				});
			} else {
				root.panelExt.fadeOut(function(params) {
					root.parent.panelCmdBack.fadeIn();
					root.panelGrid.fadeIn(function(params) {
						root.valGroupExt.reset();
					});
				});
			}
			root.baseObj = root.baseEnt;
			root.editParticipante = false;
		},

		userSave(data) {
			console.log("Entrando a metodo de guardado de datos");
			// let data="int";
			let objectSent = {};
			let point = data + "_participants";
			var result = false;

			if (data == "int") {
				console.log("Estado int_participants");
				result = root.valGroupInt.validate();
				objectSent = {
					int_participant: {
						researcher_id: this.baseObj.researcher_id,
						participant_type_id: this.baseObj.participant_type_id,
						oas_researcher_id: this.baseObj.oas_researcher_id,
					},
				};
			} else {
				result = root.valGroupExt.validate();
				objectSent = {
					ext_participant: {
						first_name: this.baseObj.first_name,
						last_name: this.baseObj.last_name,
						participant_type_id: this.baseObj.participant_type_id,
					},
				};
			}

			console.log("id del campo a editar", this.idint);
			root.loaderElement = `#${root.id} .data.${data === "int" ? "internos" : "externos"}`;
			if (root.editParticipante) {
				objectSent[`${data}_participant`].updated_by = root.user_id;
				root.loaderMessage = `Actualizando Participante`;
			} else {
				objectSent[`${data}_participant`].created_by = root.user_id;
				root.loaderMessage = `Creando Participante`;
			}

			if (result.isValid) {
				root.loaderShow();
				var dto = {
					url: `${this.endPoint}/${this.product.id}/${point}`,
					obj: objectSent,
					idint: this.idint,
					cb: function(result) {
						console.log("Result", result);
						if (data === "int") root.gridInt.refresh();
						else root.gridExt.refresh();
						// root.loaderHide();
						root.userCancel();
					},
				};
				console.log("dto", dto);
				// root.grid.refresh();
				if (root.editParticipante) root.participantUpdate(dto);
				else root.participantCreate(dto);
			}
		},

		userSearch: async (e) => {
			// console.clear();
			var item = e.component.option("selectedItem");
			console.log("item", item);
			if (typeof item !== "undefined" && item !== null && typeof item.researcher !== "undefined") {
				let id = item.researcher.identification_number;
				console.log("Documento", id);
				if (id !== null && id.toString().length > 0) {
					root.getOasUser({
						doc: id,
						cb: function(usr) {
							// console.clear();
							console.log("User", usr);
							root.loaderHide();
							if (typeof usr.Id !== "undefined") {
								root.baseObj["oas_user_id"] = usr.Id.toString();
								root.baseObj.name = usr.TerceroId.NombreCompleto;
								root.baseObj.oas_researcher_id = usr.TerceroId.Id.toString();
							} else {
								root.$info(`No se encontró ningún usuario con el documento "${id}" registrado en la OAS.`, function() {});
							}
						},
					});
				}
			}
		},

		gridInitInt(e) {
			root = this;
			console.log("e", e);
			this.gridInt = e.component;
			this.gridInt.on({
				contentReady: (e) => {
					console.log("gridInt contentReady => e => " + e);
					/*
					console.log("gridInt => contentReady => root.loading => ", root.loading);
					if (!root.loading) {
						root.loading = true;
						console.log("gridExt contentReady => ", e);
						let items = [];
						let grid = e.component;
						let rows = grid.getVisibleRows().filter((o) => o.rowType === "data");
						console.log("rows", rows);
						rows.forEach((row) => {
							console.log("row.data", row.data);
							console.log("root.groupResearchers", root.groupResearchers);
							let researcher = root.groupResearchers.find((o) => o.researcher.id == row.data.researcher_id);
							console.log("researcher", researcher);
							if (typeof researcher !== "undefined") items.push(researcher);
						});
						console.log("items", items);
						if (items.length > 0) {
							this.getOasUsers({
								users: items,
								field: "researcher.identification_number",
								cb: function(results) {
									console.log(root._sep);
									console.log("RESULTADOS", results);
									if (results.length > 0) {
										rows.forEach((row) => {
											var filtered = results.filter((o) => o.researcher.id === row.data.researcher_id);
											if (filtered.length > 0) {
												let ti = filtered[0].oas_details.TerceroId;
												row.data["identification_number"] = filtered[0].oas_details.Numero;
												row.data["oas_researcher_id"] = ti.Id;
												row.data["first_name"] = ti.PrimerNombre + " " + ti.SegundoNombre;
												row.data["last_name"] = ti.PrimerApellido + " " + ti.SegundoApellido;
												console.log("row", row);
												// grid.repaintRows([row.rowIndex]);
											}
										});
									}
									root.loadEnd();
								},
							});
						} else {
							root.loadEnd();
						}
					}
					*/
				},
			});
		},

		gridInitExt(e) {
			console.log("e", e);
			this.gridExt = e.component;
			// this.gridExt.on({
			// 	contentReady: (e) => {
			// 		root.loadEnd();
			// 	},
			// });
		},

		loadEnd() {
			this.loading = false;
			this.loaderHide();
			console.log("loadEnd => root.loading => ", root.loading);
		},
	},
};
</script>
