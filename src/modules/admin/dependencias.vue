<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-cog mr-1 color-main-600"></i>
					<span class="font-weight-semibold">Administración</span> &raquo; Dependencias 
				</h1>
			</div>
			<div class="header-elements">
				<span id="panel-dependencias-cmds">
					<router-link tag="a" :to="'/admin/entidades'" class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2" title="Grupos de la Red...">
						<b><i class="icon-arrow-left3"></i></b> Volver a Entidades
					</router-link>
					<button type="button" @click.prevent="add()" title="Crear Dependencia.." class="btn btn-main btn-labeled btn-labeled-left legitRipple ml-2">
						<b><i class="icon-database-add"></i></b> Nueva Dependencia
					</button>
				</span>
			</div>
		</div>




		<div class="row slide" id="panel-dependencias-data">
			<div class="col">
				<div class="card main">
					<div class="card-header main">Alguna acción</div>
					<div class="card-body pb-0 pt-2">
						<DxValidationGroup ref="basicGroup">

                                <div class="col-12">
									<div class="row">
										<div class='col-md-12'>
											<div class='form-group'>
											<label>Nombre Dependencia: </label>
											<DxTextBox placeholder='Nombre Dependencia' class='form-control' :value.sync='baseObj.name'>
											<DxValidator>
												</DxValidator>
											</DxTextBox>
											</div>
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

		<div class="row" id="panel-dependencias-grid">
			<div class="col">
				<div class="card" id="data-container">
					<div class="card-body pt-3 mh">
						<div id="grid slide" class="pb-2">

							<DxDataGrid
						class="main"
						width="100%"
						@initialized="gridInit"
						@content-ready="onContentReady"
						:allow-column-reordering="true"
						no-data-text="No hay artículos registrados"
						:data-source="dataSource"
						:remote-operations="true"
						:hover-state-enabled="true"
						:row-alternation-enabled="true"
						:show-borders="false"
					>
						<DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
						<DxSorting mode="single" /><!-- single, multiple, none" -->
						<DxPaging :page-size="10" />
						<DxFilterRow :visible="false" />
						<DxLoadPanel :enabled="false" />
						<DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
						<DxGrouping :auto-expand-all="false" />
						<DxSummary>
							<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} artículos" />
						</DxSummary>
						<DxPager
							:show-info="true"
							:show-page-size-selector="true"
							:show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="Página {0} de {1} ({2} artículos)"
						/>
						<DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
						<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->
						<DxColumn
							data-field="id"
							caption="ID"
							sort-order="asc"
							data-type="number"
							alignment="center"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
							:sort-index="0"
							width="80"
						/>

						<DxColumn
							data-field="name"
							caption="Nombre Dependencia"
							data-type="string"
							alignment="left"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
							
						/>


						<DxColumn
							data-field="created_at"
							caption="Fecha de Creación"
							data-type="date"
							alignment="left"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
							
						/>

						<DxColumn
							data-field="updated_at"
							caption="Última Modificación"
							data-type="date"
							alignment="left"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
						/>						

						<!-- <DxColumn data-field="observation" caption="Observaciones" data-type="string" alignment="center" :visible="true" cell-template="tplObs" /> -->
						<DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="70" />
						
						<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true" fixed-position="right" />

						<template #tplUrl="{ data }">
							<a v-if="data.data.web_page != ''" :title="data.data.url" class="cmd-item color-main-600 mr-2" :href="data.data.web_page" Target="_blank">
								<i class="icon-link"></i> Visitar
							</a>
							<a v-else title="No dispone de Url" class="cmd-item color-main-600 mr-2" href="#">-</a>
						</template>

						<template #tplEmail="{ data }">
							<span v-if="data.value && data.value.toString().trim() !== 'NULL'">
								<a class="color-main-600" :href="'mailto:' + data.value" :title="'Escribir a \'' + data.value.trim() + '\'...'"
									><i class="icon-envelop3"></i>
								</a>
								<a
									href=""
									class="ml-2 color-main-600"
									v-if="data.value && data.value.toString().trim() !== 'NULL'"
									@click.prevent="$toClipboard(data.value.toString().trim())"
									:title="'Copiar \'' + data.value.toString().trim() + '\'\r\nal portapapeles'"
									><i class="icon-copy2"></i>
								</a>
							</span>
							<span v-else> -- </span>
						</template>

						<template #tpl="{ data }">
							<span class="cmds">
								<span v-if="editMode">
									<a title="Modificar Dependencia..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a>
									<a v-if="data.data.active" title="Desactivar Dependencia..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
										<i class="icon-database-remove"></i>
									</a>
									<a v-else title="Activar Dependencia..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
										<i class="icon-database-check"></i>
									</a>
								</span>
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
import  {DxValidator, DxRequiredRule, DxCustomRule, DxEmailRule, DxStringLengthRule, DxPatternRule } from "devextreme-vue/validator";
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
		DxEmailRule, DxStringLengthRule, DxPatternRule,
		Usuario: () => import("@/components/element/usuario"),
        Geo: () => import("@/components/element/geo"),
	},
	data: () => ({
		searchButton: {
			text: "Buscar",
			onClick: async () => {
				// console.clear();
				let id = root.representante.identification_number;
				console.log("Documento", id);
				if (id !== null && id.toString().length > 0) {
					root.loaderShow("Buscando usuario");

					// 202103171618: Verifica que no exista en el grupo actual ->  80192128 1000136995
					let current_user = null;
					root.grouprepresentantes.forEach((item) => {
						// console.log(`${item.representante.identification_number} === ${id}`);
						if (item.representante.identification_number.toString() === id.toString()) {
							current_user = item;
							return;
						}
					});
					if (current_user !== null) {
						console.log(root.$sep);
						console.log("current_user =>", current_user);
						let rol = current_user.role_name;
						let det = current_user.oas_details;
						let nombre = typeof det !== "undefined" ? `"${det.TerceroId.NombreCompleto}"` : `con el documento "${id}"`;
						root.$info(`El usuario ${nombre} ya se<br>encuentra registrado como "${rol}" en el grupo.`);
						root.loaderHide();
						return false;
					}

					// 202103171645: Verifica que el usuario exista en la OAS
					let oas_user = await root.getOasUser({ doc: id });
					if (!("TerceroId" in oas_user)) {
						let m = `El documento "${id}" no se encuentra registrado<br>en el `;
						m += `<a href="https://contratistas.portaloas.udistrital.edu.co" title="Visite el Sistema de Autenticación Única..." class="link" target="_blank"`;
						m += `>Sistema de Autenticación Única</a> de la Universidad Distrital`;
						root.$info(m);
						root.loaderHide();
						return false;
					}
					console.log(root.$sep);
					console.log("await root.getOasUser =>", oas_user);
					let t = oas_user.TerceroId;
					root.group_member.name = t.NombreCompleto;
					root.representante.oas_representante_id = t.Id.toString();

					// 202103171630: Obtiene el investigador
					console.log(root.$sep);
					let representante = await root.getrepresentante(id);
					console.log("await root.getrepresentante =>", representante);
					if (representante.length > 0) {
						representante[0].id = representante[0].id.toString();
						representante[0].identification_number = parseInt(representante[0].identification_number);
						root.representante = representante[0];
						root.representante.oas_representante_id = t.Id.toString();
						root.group_member.representante_id = root.representante.id;
					} else {
						console.log("");
					}
					root.loaderHide();
				}
			},
		},



		endPointRute:"dependencies",
		objEpdata: "dependency",
		totaCount: 0,
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
		isValid: false,
		subtypes_current: [],
		baseObjBk: null,
		naturaleza:[],
		tipoDependencia:[],
		tipoDocumento:[],
		digito:[{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}],
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		baseObj: {
			name: null,
			active: null,
			created_by: null
		},
	}),
	created() {
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
	},
	mounted() {
		root = this;
		root.loaderShow("Cargando dependencias");
		root.validator = root.$refs.basicGroup.instance;
		root.baseObj.created_by = root.user_id;
		root.baseObj.updated_by = root.user_id;
		root.baseObjBk = root.$clone(root.baseObj);
		let root_id = "#panel-dependencias";
		root.panelCmd = $(`${root_id}-cmds`);
		root.panelGrid = $(`${root_id}-grid`);
		root.panelData = $(`${root_id}-data`);
		console.log("User", root.user);
	},
	computed: {
		...mapState("core/tipo", ["types", "subtypes"]),
		...mapGetters("core/tipo", ["subtypesByType", "subtypesByParent"]),
	
	dataSource: function() {
			// if (typeof this.group.id === "undefined") return null;
			// console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				endPoint: `entities/${root.$route.params.idEnt}/dependencies`,
				onLoading: function(loadOptions) {
					root.loaderShow("Cargando Dependencias", "#panel-produccion .card-body");
				},
				onLoaded: function(results, baseEntity) {
					// console.clear();
					console.log("results", results);
					root.totaCount = results.totalCount;
					root.loaderHide();
				},
			});
		},
	},




	methods: {
		
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active" }),
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
		
		// getSubtypes(e, a) {
		// 	// console.clear();
		// 	console.log("e =>", e);
		// 	console.log("a =>", a);
		// 	if (root !== null && e.selectedItem !== null && typeof root.subtypes !== "undefined") {
		// 		console.log("root.subtypes =>", root.subtypes);
		// 		root.subtypes_current = root.subtypesByType(e.selectedItem.id);
		// 	}
		// },


		save() {
			console.clear();
			console.log(root.$sep);
			root.loaderElement = root.panelData.find(".card");
			console.log("validator =>", root.validator);
			var result = root.validator.validate();
			console.log("result =>", result);

			if (result.isValid) {
				root.loaderShow("Guardando Dependencia");


				console.log("VALID!");
				root.scrollTop();
				// root.panelCmds.fadeOut();
				// root.loaderElement = ;
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " Elemento";
				root.loaderShow(msg, root.panelData);
				if (root.mode == "add") root.baseObj.created_by = root.user_id;
				if (root.mode == "edit") root.baseObj.updated_by = root.user_id;
				root.baseObj.legal_representative_id=1;

				// root.baseObj.product_type_id = root.codEP;
				// root.baseObj.research_group_id = root.group.id;
				let obj = root.baseObj;
				//let json1 = `{ "${mydata}": `+JSON.stringify(obj)+" } ";
				let dto = {
					newFormat: true,
					// unidadId: root.group.id,
					stringEP: root.endPointRute,
					rute2: root.endPointRute,
					mod: obj.id,
					//objectSend: { regulation : obj },
					objectSend: JSON.parse(`{ "${root.objEpdata}": ` + JSON.stringify(obj) + "}"),
					cb: function(item) {
						console.log(root.$sep);
						console.log("result =>", result);
						root.grid.refresh();
						root.loaderHide();
						root.cancel();
					},
				};
				console.log("root.mode", root.mode);
				if (root.mode == "edit") root.objUpdate(dto);
				else root.objSave(dto);
				root.cancel();
			}
		},


		edit(data) {
			root.mode = "edit";
			root.type_id = null;
			console.log("data", data);
			root.endPointRute=`dependencies`;
			// console.clear();
			
			root.subtypes_current = root.subtypes.filter((o) => o.active);
			root.baseObj = root.$clone(data);
			root.panelData.find(".card-header").html(`<i class="icon-database-edit"></i>&nbsp;&nbsp;Editar Dependencia`);
			root.panelCmd.fadeOut();
			root.panelGrid.fadeOut(function() {
				root.panelData.fadeIn();
			});
		},

		active(data, state) {
			// console.clear();
			console.log("active", data);
			console.log("state", state);
			let a = state ? "activar" : "desactivar";
			let am = state ? "Activando" : "Desactivando";
			let msg = `¿Realmente desea ${a} <span class='text-sb'>"${data.data.name} ?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am}`, root.panelGrid);
					let active = JSON.stringify({ active: state, updated_by: root.user_id });

					var dto = {
						newFormat: true,
						url: `dependencies/${data.data.id}`,
						data: JSON.parse(`{ "${root.objEpdata}" :` + active + "}"),
						cb: function(result) {
							console.log("Result", result);
							root.grid.refresh();
							root.loaderHide();
						},
					};
					console.log("dto", dto);
					root.elementoActive(dto);
					root.loaderHide();
				}
			});
		},

		add(what) {
			root.mode = "add";
			root.type_id = null;
			// console.clear();
			root.endPointRute=`entities/${root.$route.params.idEnt}/dependencies`;
			console.log("root.panelGrid", root.panelGrid);
			console.log("root.panelData", root.panelData);
			console.log("add(data)", what);
			root.baseObj = root.$clone(root.baseObjBk);
			root.subtypes_current = root.subtypes.filter((o) => o.active);
			root.panelData.find(".card-header").html(`<i class="icon-database-add"></i>&nbsp;&nbsp;Nueva Dependencia`);
			root.panelCmd.fadeOut();
			root.panelGrid.fadeOut(function() {
				root.panelData.fadeIn(function() {
					console.log("root.panelCmd", root.panelCmd);
				});
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
				
		gridInit(e) {
			this.grid = e.component;
		},

		onContentReady(e) {
			console.log(root._sep);
			console.log("onContentReady!", e);
		},
	},
};
</script>
