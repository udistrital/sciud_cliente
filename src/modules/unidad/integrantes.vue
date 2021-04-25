<template>
	<div v-if="group">
		<Header :group="group" />
		<div class="row">
			<div class="col">
				<div class="card slide" id="panel-integrantes">
					<div class="card-body group-detail">
						<div class="row mb-3">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-end">
									<div class="title"><i class="icon-books"></i> {{ $titleCase(group.name) }}</div>
									<div class="sub-title"><i class="icon-users"></i> Integrantes</div>
								</div>
							</div>
						</div>
						<div class="row slide" id="panel-integrantes-data" v-if="editMode">
							<div class="col">
								<div class="card">
									<div class="card-header main">Agregar</div>
									<div class="card-body mb-0 pb-0 pt-3">
										<DxValidationGroup ref="vGroup">
											<div class="row">
												<div class="col-md-3">
													<div class="form-group">
														<label>Documento de identidad:</label>
														<DxNumberBox
															ref="nbIdNum"
															:show-clear-button="true"
															class="form-control"
															:value.sync="baseObj.identification_number"
															placeholder="Documento de identidad"
														>
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
															<DxNumberBoxButton :options="searchButton" name="search" location="after" />
														</DxNumberBox>
													</div>
												</div>
												<div class="col-md-2">
													<div class="form-group">
														<label>Rol:</label>
														<DxSelectBox
															:grouped="false"
															:data-source="groupRoles"
															:value.sync="baseObj.role_id"
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
												<div class="col-md-4">
													<div class="form-group">
														<label>Nombre:</label>
														<DxTextBox :value.sync="baseObj.name" placeholder="Nombre" class="form-control" :read-only="true" mode="text">
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
														</DxTextBox>
													</div>
												</div>
												<div class="col-md-3">
													<div class="row">
														<div class="col-md-6">
															<div class="form-group">
																<label>OAS ID:</label>
																<DxTextBox :value.sync="baseObj.oas_researcher_id" placeholder="OAS ID" class="form-control" :read-only="true">
																	<DxValidator>
																		<DxRequiredRule />
																	</DxValidator>
																</DxTextBox>
															</div>
														</div>
														<div class="col-md-6">
															<div class="form-group">
																<label>Activo:</label>
																<DxSwitch :value.sync="baseObj.active" :read-only="!editMode" switched-on-text="SI" switched-off-text="NO" />
															</div>
														</div>
													</div>
												</div>

												<div class="col-md-3">
													<div class="form-group">
														<label>ORCID ID:</label>
														<DxTextBox :value.sync="baseObj.orcid_id" placeholder="ORCID ID" class="form-control" :read-only="true" mode="text" />
													</div>
												</div>
												<div class="col-md-3">
													<div class="form-group">
														<label>Firma Científica:</label>
														<DxTextBox :value.sync="baseObj.scientific_signature" placeholder="Firma Científica" class="form-control" mode="text" />
													</div>
												</div>
												<div class="col-md-2">
													<div class="form-group">
														<label>Número de Celular:</label>
														<DxTextBox
															:value.sync="baseObj.mobile_number"
															placeholder="Número de Celular"
															class="form-control"
															mask="(000) 000-0000"
															mode="text"
														/>
													</div>
												</div>
												<div class="col-md-4">
													<div class="form-group">
														<label>Dirección:</label>
														<DxTextBox :value.sync="baseObj.address" placeholder="Dirección" class="form-control" :read-only="true" mode="text" />
													</div>
												</div>
											</div>
										</DxValidationGroup>
									</div>
									<div class="card-footer">
										<div class="row">
											<div class="col">
												<DxButton @click="userCancel" class="nb">
													<template #default>
														<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
															<b><i class="icon-database-remove"></i></b> CANCELAR
														</span>
													</template>
												</DxButton>
											</div>
											<div class="col text-right">
												<DxButton @click="userSave" class="nb">
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
						<div class="row" id="panel-integrantes-grid">
							<div class="col">
								<div class="row">
									<div class="col">
										<a
											href="#"
											v-if="editMode"
											@click.prevent="userAdd"
											class="btn btn-sm btn-main btn-labeled btn-labeled-right btn-sm legitRipple ml-3 slide"
											id="btn-add"
										>
											ASOCIAR INTEGRANTE <b><i class="icon-user-plus"></i></b>
										</a>
										<DxDataGrid
											class="main"
											width="100%"
											:dataSource="dsMembers"
											@initialized="gridInit"
											:allow-column-reordering="false"
											:remote-operations="false"
											:hover-state-enabled="true"
											:row-alternation-enabled="true"
											:show-borders="false"
										>
											<DxExport :enabled="false" />
											<DxColumnChooser :enabled="false" mode="dragAndDrop" />
											<DxSorting mode="multiple" /><!-- single, multiple, none" -->
											<DxPaging :page-size="dgPageSize" />
											<DxFilterRow :visible="false" />
											<DxLoadPanel :enabled="false" />
											<DxGroupPanel :visible="true" :allow-column-dragging="true" />
											<DxGrouping :auto-expand-all="false" />
											<DxSummary>
												<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
											</DxSummary>
											<DxPager
												:visible="true"
												:show-info="true"
												:show-page-size-selector="true"
												:show-navigation-buttons="true"
												:allowed-page-sizes="dgPageSizes"
												info-text="{2} integrantes (página {0} de {1})"
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
												caption="OAS ID"
												data-field="oas_details.TerceroId.Id"
												data-type="string"
											/>
											<!-- :customize-text="$formatDocument" -->
											<DxColumn
												:allow-filtering="true"
												:allow-sorting="true"
												:allow-grouping="false"
												alignment="center"
												caption="Documento"
												data-field="researcher.identification_number"
												:customize-text="$formatDocument"
												data-type="string"
											/>
											<DxColumn
												:allow-filtering="true"
												:allow-sorting="true"
												:allow-grouping="false"
												:customize-text="nullText"
												alignment="center"
												caption="Nombre"
												data-field="oas_details.TerceroId.NombreCompleto"
												data-type="string"
											/>
											<DxColumn
												:group-index="0"
												:allow-filtering="false"
												:allow-sorting="true"
												:customize-text="nullText"
												alignment="center"
												caption="Rol"
												data-field="role_name"
												data-type="string"
											/>
											<DxColumn
												:width="100"
												caption="Activo"
												data-type="int"
												alignment="center"
												:visible="true"
												data-field="gm_state_id"
												:customize-text="gmState"
											/>
											<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editMode" />
											<template #tpl="{ data }">
												<span class="cmds" v-if="cmdVisible(data.data)">
													<a title="Editar usuario..." class="cmd-item color-main-600" @click.prevent="userEdit(data.data)" href="#">
														<i class="icon-database-edit"></i>
													</a>
													<a
														v-if="data.data.gm_state_id === 1"
														title="Desactivar usuario..."
														class="cmd-item color-main-600 mr-2"
														@click.prevent="userActive(data.data, false)"
														href="#"
													>
														<i class="icon-database-remove"></i>
													</a>
													<a v-else title="Activar usuario..." class="cmd-item color-main-600 mr-2" @click.prevent="userActive(data.data, true)" href="#">
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
				</div>
			</div>
		</div>
		<div class="row" v-if="isDev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body code">
						{{ JSON.stringify(baseObj, null, 3) }}
					</div>
					<div class="card-footer">
						<a @click.prevent="scrollTop()" class="font-weight-semibold" href="#">SCROLL!!!</a>
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
import Notify from "devextreme/ui/notify";
import { mapActions, mapGetters, mapState } from "vuex";
let hideErrors = () => {
	$("#panel-basicos .dx-fileuploader-files-container").hide();
	$("#panel-basicos .dx-invalid-message").hide();
	$("#panel-basicos .dx-invalid").removeClass("dx-invalid");
};

export default {
	name: "datosBasicos",
	created: function() {
		root = this;
		root.panelMain = "#panel-integrantes";
		root.panelData = root.panelMain + "-data";
		root.panelGrid = root.panelMain + "-grid";
		root.loaderElement = root.panelMain;
		root.loaderMessage = "Cargando Información<br>de Integrantes";
		root.getUnit({
			id: root.$route.params.unidadId,
			cb: function(result) {
				root.group = result;
				document.title += ` ${root.$titleCase(root.group.name)}`;
				root.loadMembers();
			},
		});
	},
	mounted() {
		console.log(this.$sep);
		setTimeout(function() {
			root.nbId = root.$refs.nbIdNum.instance;
			root.nbIdBtn = root.nbId.getButton("search");
			console.log("root.nbIdBtn", root.nbIdBtn);
		}, 1000);
	},
	beforeUpdate: () => {},
	updated: () => {
		console.log(root.$sep);
		hideErrors();
	},
	components: {
		DxButton,
		DxColumn,
		DxColumnChooser,
		DxDataGrid,
		DxExport,
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
		DxTextBox,
		DxValidationGroup,
		DxValidator,
		Header: () => import("@/components/element/header"),
	},
	data: () => ({
		accept: "*.",
		cineDetallados: {},
		files: [],
		nbId: null,
		nbIdBtn: null,
		formRefName: "tree-view",
		group: null,
		isValid: false,
		loading: true,
		min: new Date(2000, 0, 1),
		mode: null,
		multiple: false,
		now: new Date(),
		ocdeDetallado: {},
		ocdeDisabled: true,
		panelData: null,
		panelGrid: null,
		panelMain: null,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		placeholder: "Busque y seleccione...",
		proyectos: {},
		tbEspecificoDisabled: true,
		tbProyectoDisabled: true,
		uploadMode: "instantly",
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		dsMembers: new DataSource({
			store: new CustomStore({
				key: "id",
				loadMode: "processed", // "raw",
				load: (loadOptions) => {
					console.log("loadOptions", loadOptions);
					return root.groupResearchers;
				},
				onLoaded: function(result) {
					// root.loading = false;
					console.log("onLoaded");
				},
			}),
		}),
		searchButton: {
			text: "Buscar",
			onClick: async () => {
				// console.clear();
				let id = root.baseObj.identification_number;
				console.log("Documento", id);
				if (id !== null && id.toString().length > 0) {
					root.loaderShow("Buscando usuario");

					// 202103171618: Verifica que no exista en el grupo actual ->  80192128 1000136995
					let exists = false;
					root.groupResearchers.forEach((item) => {
						// console.log(`${item.researcher.identification_number} === ${id}`);
						if (item.researcher.identification_number.toString() === id.toString()) {
							console.log("ITEM!!!", item);
							exists = true;
							return;
						}
					});
					if (exists) {
						root.$info(`El usuario con el documento "${id}" ya se<br>encuentra registrado como investigador en el grupo.`);
						root.loaderHide();
						return false;
					}

					// 202103171645: Verifica que el usuario exista en la OAS
					let u = await root.getOasUser(id);
					if (!("TerceroId" in u)) {
						let m = `El documento "${id}" no se encuentra registrado<br>en el `;
						m += `<a href="https://contratistas.portaloas.udistrital.edu.co" title="Visite el Sistema de Autenticación Única..." class="link" target="_blank"`;
						m += `>Sistema de Autenticación Única</a> de la Universidad Distrital`;
						root.$info(m);
						root.loaderHide();
						return false;
					}

					// 202103171630: Obtiene el investigador
					let r = await root.getResearcher(id);
					console.log("r", r);
					if (r.length > 0) {
						root.loaderHide();
						root.$info(`El usuario con el documento "${id}" ya se encuentra registrado.`, function() {});
					} else {
						root.getOasUser({
							doc: id,
							cb: function(usr) {
								// console.clear();
								console.log("User", usr);
								root.loaderHide();
								if (typeof usr.Id !== "undefined") {
									root.baseObj.oas_user_id = usr.Id.toString();
									root.baseObj.name = usr.TerceroId.NombreCompleto;
								} else {
									root.$info(`No se encontró ningún usuario con el documento "${id}"`, function() {});
								}
							},
						});
					}
				}
			},
		},
		baseObj: {
			id: null,
			active: true,
			address: null,
			gm_state_id: null,
			created_by: null,
			identification_number: null,
			mobile_number: null,
			name: null,
			oas_researcher_id: null,
			orcid_id: null,
			role_id: null,
			scientific_signature: null,
		},
		validationRules: {
			required: { type: "required", message: "Position is required." },
			url: {
				type: "custom",
				message: "La Url no es válida",
				validationCallback: function(e) {
					console.log("e.value", e);
					var r = /^(http|https):\/\/[^ "]+$/;
					return r.test(e.value);
				},
			},
		},
		group_member: {
			role_id: 2,
			researcherId: 1,
			typeResearcher: "external",
		},
		grupoInterinstitucional: [
			{
				id: 1,
				value: true,
				name: "SI",
			},
			{
				id: 0,
				value: false,
				name: "NO",
			},
		],
		fileTypesSource: [
			{ name: "Documentos", value: "image/*" },
			{ name: "Videos", value: "video/*" },
		],
	}),
	computed: {
		...mapGetters("auth/usuario", ["groupRoles"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
	},
	methods: {
		...mapActions("unidad", ["getUnit", "getResearchers", "saveResearcher", "updateResearcher"]),
		...mapActions("auth/usuario", ["getUser", "getOasUsers", "getOasUser"]),
		cmdVisible(data) {
			// console.log("cmdVisible", e);
			return typeof data.oas_details !== "undefined" && typeof data.oas_details.Id !== "undefined";
		},
		gridInit(e) {
			console.log("e", e);
			root.grid = e.component;
			setTimeout(function() {
				let tb = $(root.panelGrid + " .dx-toolbar-after");
				let btn = $(root.panelGrid + " #btn-add");
				console.log("tb", tb);
				console.log("btn", btn);
				tb.append(btn);
				btn.fadeIn();
			}, 1000);
			root.grid.on({
				contentReady: (e) => {
					console.log("e", e);
					console.log("contentReady loading?", root.loading);
					if (!root.loading) {
						root.loading = true;
						root.loaderShow();
						// root.loaderShow("Cargando integrantes", $("#panel-integrantes .card-body")[0]);
						let items = [];
						root.grid
							.getVisibleRows()
							.filter((o) => o.rowType === "data")
							.forEach((row) => {
								if (!("oas_details" in row.data)) items.push(row.data);
							});
						if (items.length > 0) {
							root.getOasUsers({
								users: items,
								field: "researcher.identification_number",
								cb: function(result) {
									console.log(root._sep);
									console.log("RESULTADOS", result);
									root.grid.getVisibleRows().forEach((row) => {
										console.log("row", row);
										if (row.rowType === "data") {
											var filtered = result.filter((o) => o.id === row.data.id);
											if (filtered.length > 0) {
												Object.assign(row.data, filtered[0]);
												root.grid.repaintRows([row.rowIndex]);
											}
										}
									});
									root.loading = false;
									root.loaderHide();
									root.loadEnd();
								},
							});
						} else {
							root.loading = false;
							root.loaderHide();
							root.loadEnd();
						}
					}
				},
			});
		},
		loadMembers() {
			// root.loaderShow("Cargando Integrantes", root.panelMain);
			if (root.grid !== null && typeof root.grid !== "undefined") {
				root.grid.clearFilter();
				root.grid.collapseAll(0);
				root.grid.pageIndex(0);
			}
			root.getResearchers({
				id: root.group.id,
				cb: function(result) {
					// console.clear();
					root.loading = false;
					console.log(root.$sep);
					console.log("getResearchers", result);
					root.groupResearchers = result.researchers;
					console.log("root.groupResearchers", root.groupResearchers);
					root.dsMembers.reload();
					root.loading = false;
					root.loaderHide();
				},
			});
		},
		userEdit(data) {
			// console.clear();
			root.mode == "edit";
			console.log("data", data);
			root.nbIdBtn = root.nbId.getButton("search");
			console.log("root.nbIdBtn", root.nbIdBtn);
			root.nbId.option("readOnly", true);
			root.baseObj.id = data.id;
			root.baseObj.active = data.gm_state_id === 1;
			root.baseObj.oas_researcher_id = data.oas_details.TerceroId.Id.toString();
			root.baseObj.name = data.oas_details.TerceroId.NombreCompleto;
			root.baseObj.identification_number = parseInt(data.oas_details.Numero);
			root.baseObj.role_id = parseInt(data.role_id);
			console.log("root.baseObj", root.baseObj);
			$(root.panelData + " .card-header.main").html("Editando integrante");
			$(root.panelGrid).fadeOut(function() {
				$(root.panelData).fadeIn();
			});
		},
		userAdd() {
			root.mode == "add";
			root.nbId.option("readOnly", false);
			$(root.panelData + " .card-header.main").html("Nuevo integrante");
			$(root.panelGrid).fadeOut(function() {
				$(root.panelData).fadeIn();
			});
		},
		async userSave() {
			console.log("Obj", this.baseObj);
			var result = this.$refs.vGroup.instance.validate();
			console.log("result", result);
			if (result.isValid) {
				root.loaderShow("Guardando usuario", "#panel-integrantes-data .card");
				root.baseObj[root.mode === "add" ? "created_by" : "updated_by"] = root.user_id;
				let r = await (root.mode == "add" ? root.saveResearcher(root.baseObj) : root.updateResearcher(root.baseObj));
				console.log("Saved", r);
				root.loaderHide();
				root.grid.refresh();
				root.$info(`El usuario con el documento "${this.baseObj.identification_number}" se asoció exitosamente!`, function() {
					root.userCancel();
				});
			}
		},
		userCancel() {
			$(root.panelData).fadeOut(function() {
				$(root.panelGrid).fadeIn(function() {
					root.$refs.vGroup.instance.reset();
					$(root.panelData).clear();
					// console.clear();
				});
			});
		},
		userActive(data, state) {
			// console.clear();
			console.log("data", data);
			console.log("state", state);
			let a = state ? "activar" : "desactivar";
			let ti = data.oas_details.TerceroId;
			let mn = typeof ti !== "undefined" ? `<br>"${ti.NombreCompleto}"` : `con<br>el documento "${root.$formatDocument(data.identification_number)}"`;
			let msg = `¿Realmente desea ${a} al usuario ${mn}?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					let usr = data;
					usr.active = state;
					root.loaderMessage = `${state ? "Activando" : "Desactivando"} usuario`;
					root.loaderShow();
					root.updateUser({
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
		loadEnd() {
			$(root.panelMain).fadeIn();
			console.log("loadEnd loading?", root.loading);
		},
		validateUrl(e) {
			console.log("e.value", e);
			var r = /^(http|https):\/\/[^ "]+$/;
			return r.test(e.value);
		},
		save() {
			console.log(this.$sep);
			var result = root.$refs.basicGroup.instance.validate();
			console.log("result", result);
			if (result.isValid) {
				console.log("VALID!");
				if (this.$isFunction(this.saveFn)) this.saveFn(root.validationGroup.validationGroup);
			}
		},
		onButtonClick() {
			Notify("Uncomment the line to enable sending a form to the server.");
			// const form = this.$refs[this.formRefName];
			// form.submit();
		},
	},
};
</script>
