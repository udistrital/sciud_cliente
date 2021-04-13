<template>
	<div class="col p-3" id="tab-integrantes">
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
								<div class="col-md-5">
									<div class="form-group">
										<label>Nombre:</label>
										<DxTextBox :value.sync="baseObj.name" placeholder="Nombre" class="form-control" :read-only="true" mode="text">
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
								<div class="col-md-1">
									<div class="form-group">
										<label>Activo:</label>
										<DxSwitch :value.sync="baseObj.active" switched-on-text="SI" switched-off-text="NO" />
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
										<DxTextBox :value.sync="baseObj.mobile_number" placeholder="Número de Celular" class="form-control" mask="(000) 000-0000" mode="text" />
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
		<div class="row" id="panel-integrantes">
			<div class="col">
				<div class="row">
					<div class="col">
						<DxDataGrid
							class="main"
							width="100%"
							:dataSource="dsMembers"
							@initialized="gridInit"
							@content-ready="onContentReady"
							@option-changed="onOptionChanged"
							:allow-column-reordering="false"
							:remote-operations="false"
							:hover-state-enabled="true"
							:row-alternation-enabled="true"
							:show-borders="false"
						>
							<DxExport :enabled="false" />
							<DxColumnChooser :enabled="true" mode="dragAndDrop" />
							<DxSorting mode="multiple" /><!-- single, multiple, none" -->
							<DxPaging :page-size="gridSize" />
							<DxFilterRow :visible="false" />
							<DxLoadPanel :enabled="false" />
							<DxGroupPanel :visible="true" :allow-column-dragging="true" />
							<DxGrouping :auto-expand-all="false" />
							<DxSummary>
								<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
							</DxSummary>
							<DxPager
								:show-info="true"
								:show-page-size-selector="true"
								:show-navigation-buttons="true"
								:allowed-page-sizes="dgPageSizes"
								info-text="Página {0} de {1} ({2} integrantes en el grupo)"
							/>
							<DxSearchPanel :visible="true" :highlight-case-sensitive="false" />
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
								data-field="researcher.active"
								caption="Activo"
								data-type="date"
								alignment="center"
								:visible="true"
								:customize-text="yesNo"
							/>

							<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editMode" />
							<template #tpl="{ data }">
								<span class="cmds">
									<a title="Editar usuario..." class="cmd-item color-main-600" @click.prevent="userEdit(data.data)" href="#">
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
				<div class="row cmds slide">
					<div class="col">
						<DxButton @click="cancelFn" class="nb cancel">
							<template #default>
								<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
									<b><i class="icon-database-remove"></i></b> CANCELAR
								</span>
							</template>
						</DxButton>
						<DxButton @click="userAdd" class="nb add" v-if="editMode">
							<template #default>
								<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
									ASOCIAR INTEGRANTE <b><i class="icon-database-add"></i></b>
								</span>
							</template>
						</DxButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
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
		isValid: false,
		btnCancel: null,
		btnAdd: null,
		grid: null,
		loading: false,
		groupResearchers: [],
		baseObj: {
			active: true,
			address: null,
			created_by: null,
			identification_number: null,
			mobile_number: null,
			name: null,
			oas_researcher_id: null,
			orcid_id: null,
			role_id: null,
			scientific_signature: null,
		},
		dsMembers: new DataSource({
			store: new CustomStore({
				key: "id",
				loadMode: "processed", // "raw",
				load: (loadOptions) => {
					console.log("loadOptions", loadOptions);
					return root.groupResearchers;
				},
				onLoaded: function(result) {
					console.log("onLoaded", result);
					$("#panel-integrantes .card-body").show();
				},
			}),
		}),
		searchButton: {
			text: "Buscar",
			onClick: async () => {
				console.clear();
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
	}),
	mounted() {
		root = this;
		console.log(root.$sep);
		root.loaderElement = "#panel-unidades .card-body";
		root.loadMembers();
		console.log("INTEGRANTES MOUNTED!");
	},
	computed: {
		...mapGetters("unidad", ["researchers"]),
		...mapGetters("auth/usuario", ["groupRoles"]),
		gridSize: () => {
			return gridSize;
		},
	},
	props: {
		editMode: {
			type: Boolean,
			default: true,
		},
		group: {
			type: Object,
			default: () => {},
		},
		saveFn: {
			type: Function,
			default: null,
		},
		cancelFn: {
			type: Function,
			default: null,
		},
	},
	methods: {
		...mapActions("auth/usuario", ["getUser", "getOasUsers", "getOasUser"]),
		...mapActions("unidad", ["getResearcher", "saveResearcher", "addResearcherToGroup"]),
		userEdit(data) {
			console.clear();
			console.log("data", data);
			root.baseObj.oas_researcher_id = data.oas_details.TerceroId.Id.toString();
			root.baseObj.name = data.oas_details.TerceroId.NombreCompleto;
			root.baseObj.identification_number = parseInt(data.oas_details.Numero);
			root.baseObj.role_id = parseInt(data.role_id);
			$(".card-header.main").html("Editando integrante");
			$("#panel-integrantes").fadeOut(function() {
				$("#panel-integrantes-data").fadeIn();
			});
		},
		userAdd() {
			$(".card-header.main").html("Nuevo integrante");
			$("#panel-integrantes").fadeOut(function() {
				$("#panel-integrantes-data").fadeIn();
			});
		},
		userCancel() {
			$("#panel-integrantes-data").fadeOut(function() {
				$("#panel-integrantes").fadeIn();
			});
		},
		async userSave() {
			this.baseObj.created_by = root.user_id;
			console.log("Obj", this.baseObj);
			var result = this.$refs.vGroup.instance.validate();
			console.log("result", result);
			if (result.isValid) {
				root.loaderShow("Buscando usuario", "#data .card-body");
				let r = await root.saveUser(this.baseObj);
				console.log("Saved", r);
				root.loaderHide();
				root.grid.refresh();
				root.$info(`El usuario con el documento "${this.baseObj.identification_number}" se asoció exitosamente!`, function() {
					root.cancel();
				});
			}
		},
		loadEnd() {
			this.loaderHide();
			this.loading = false;
			cmds = $("#tab-integrantes .row.cmds");

			// 202103162325: Botón asociar
			let c = this.btnAdd;
			if (c === null) {
				c = cmds.find(".add").first();
				c.hide();
				cmds.hide();
				var toolbar = $("#panel-integrantes .dx-toolbar-after").first();
				if (toolbar.length > 0) {
					if (!c.is(":visible")) {
						console.log(toolbar);
						toolbar.append(c);
						c.click(this.userAdd).fadeIn();
					}
				}
			}

			// 202103162325: Botón asociar
			let b = this.btnCancel;
			if (b === null) {
				b = cmds
					.find(".cancel")
					.first()
					.clone();
				b.hide();
				cmds.hide();
			}
			var pager = $("#panel-integrantes .dx-page-sizes");
			if (pager.length > 0) {
				if (!b.is(":visible")) {
					// console.clear();
					console.log(pager);
					pager.before(b);
					b.click(this.cancelFn).fadeIn();
				}
			} else {
				cmds.fadeIn();
			}
		},
		save() {
			return null;
		},
		cancel() {
			return null;
		},
		gridInit(e) {
			console.log("e", e);
			this.grid = e.component;
			this.loadEnd();
		},
		onContentReady(e) {
			console.log("e", e);
			if (!root.loading) {
				root.loading = true;
				root.loaderShow("Cargando integrantes", $("#panel-unidades .card-body")[0]);
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
							root.loadEnd();
						},
					});
				} else {
					root.loadEnd();
				}
			}
		},
		onOptionChanged() {
			// console.log("e", e);
		},
		loadMembers() {
			// console.clear();
			cmds.hide();
			let g = this.grid;
			g.pageSize(gridSize);
			// g.clearGrouping();
			g.clearFilter();
			g.collapseAll(0);
			g.pageIndex(0);
			root.groupResearchers = root.researchers(root.group.id);
			console.log("root.groupResearchers", root.groupResearchers);
			root.dsMembers.reload();
		},
	},
};
</script>
