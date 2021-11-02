<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-collaboration mr-1 color-main-600"></i>
					<span class="font-weight-semibold">Redes de Investigación</span> 
				</h1>
			</div>
			<div class="header-elements">
				<!-- <span id="panel-entidades-cmds">
					<button type="button" @click.prevent="add()" title="Crear Entidad.." class="btn btn-main btn-labeled btn-labeled-left legitRipple">
						<b><i class="icon-database-add"></i></b> Nueva Red
					</button>
				</span> -->
				<router-link tag="a" :to="'/unidad'" class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2" title="Ver Estructuras...">
					<b><i class="icon-arrow-left"></i></b> Estructuras
				</router-link>
                <router-link tag="a" to="/red/crear" class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2" title="Nueva Red de Investigación...">
					<b><i class="icon-database-add"></i></b> Nueva Red
				</router-link>
			</div>
            
		</div>



		<div class="row" id="panel-entidades-grid">
			<div class="col">
				<div class="card" id="data-container">
					<div class="card-body pt-3 mh">
						<div id="grid slide" class="pb-2">

					<!-- <DxDataGrid 79508767
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
						<DxSorting mode="single" />
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
						<DxSearchPanel :visible="false" :highlight-case-sensitive="true" /> -->


                        <DxDataGrid
								class="main"
								width="100%"
								@initialized="gridInit"
								@content-ready="onContentReady"
								:allow-column-reordering="true"
								:data-source="dataSource"
								:remote-operations="true"
								:hover-state-enabled="true"
								:row-alternation-enabled="true"
								:show-borders="false"
							>
								<!-- type="custom" :custom-load="loadState" :custom-save="saveState" -->
								<DxColumnChooser :enabled="es_admin" mode="dragAndDrop" />
								
								<!-- <DxFilterPanel :visible="false" /> -->
								<DxFilterRow :visible="true" />
								<DxGrouping :auto-expand-all="true" />
								<DxGroupPanel :visible="es_admin" :allow-column-dragging="true" />
								<DxLoadPanel :enabled="false" />
								<DxPaging :page-size="dgPageSize" />
								<DxSorting :mode="es_admin ? 'multiple' : 'single'" /><!-- single, multiple, none" -->
								<DxStateStoring :enabled="true" type="sessionStorage" />
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} redes" />
								</DxSummary>
								<DxPager
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="dgPageSizes"
									info-text="{2} Redes de investigación (Página {0} de {1})"
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

                        <DxColumn data-field='name'  caption='Nombre de la Red' data-type='string' alignment='left' :visible='true' :allow-grouping='false' :allow-filtering="true" /> 
                        <DxColumn data-field='acronym'  caption='Acrónimo' data-type='string' alignment='left' :visible='true' :allow-grouping='false' /> 
                        <DxColumn data-field='academic_responsibilities'  caption='Responsabilidades Académicas' data-type='string' alignment='left' :visible='false' :allow-grouping='false' /> 
                        <DxColumn data-field='advantage'  caption='Beneficios para la UDFJC:' data-type='string' alignment='left' :visible='false' :allow-grouping='false' /> 
                        <DxColumn data-field='financial_responsibilities'  caption='Responsabilidad Económica' data-type='string' alignment='left' :visible='false' :allow-grouping='false' /> 
                        <DxColumn data-field='legal_responsibilities'  caption='Responsabilidad legal' data-type='string' alignment='left' :visible='false' :allow-grouping='false' /> 
                        <DxColumn data-field='main_research_group_name'  caption='Grupo o Semillero Principal' data-type='string' alignment='left' :visible='true' :allow-grouping='false' /> 
                        <DxColumn data-field='mission'  caption='Misión' data-type='string' alignment='left' :visible='false' :allow-grouping='false' /> 
                        <DxColumn data-field='network_type_name'  caption='Tipo de red' data-type='string' alignment='left' :visible='true' :allow-grouping='true' /> 
                        <DxColumn data-field='request_date'  caption='Fecha Creación' data-type='date' alignment='center' :visible='true' :allow-grouping='false' /> 
                        <DxColumn data-field='vision'  caption='Visión' data-type='string' alignment='left' :visible='false' :allow-grouping='false' /> 
<!-- 
                                <DxColumn
									:width="90"
									:allow-filtering="true"
									data-field="active"
									caption="Estado"
									data-type="string"
									alignment="center"
									:visible="es_admin"
									:group-index="es_admin ? 0 : null"
								>
									<DxLookup :data-source="estadosUnidad" value-expr="id" display-expr="st_name" />
								</DxColumn>
						-->

						<!-- <DxColumn data-field="observation" caption="Observaciones" data-type="string" alignment="center" :visible="true" cell-template="tplObs" /> -->
						<DxColumn data-field="active" caption="Activo" data-type="string" alignment="center" :visible="true" :customize-text="yesNo" width="70" />
						
						<DxColumn :width="110" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true" fixed-position="right" />

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
									<!-- <a title="Modificar Entidad..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a> -->
                                    <a
										title="Observar información..."
										href="#"
										@click.prevent="go(data.value, `red/${data.data.id}`, 'información de Red')"
										class="cmd-item color-main-600"
									>
										<i class="icon-info"></i>
									</a>

									<a
										title="Observar Documentos..."
										href="#"
										@click.prevent="go(data.value, `red/${data.data.id}/documentos`, 'información de Red')"
										class="cmd-item color-main-600"
									>
										<i class="icon-file-pdf"></i>
									</a>
									
									<a
										title="Observar Grupos..."
										href="#"
										@click.prevent="go(data.value, `red/${data.data.id}/grupos`, 'información de Red')"
										class="cmd-item color-main-600"
									>
										<i class="icon-svg"></i>
									</a>

									<a v-if="data.data.active" title="Desactivar Entidad..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
										<i class="icon-database-remove"></i>
									</a>
									<a v-else title="Activar Entidad..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
					<div class="card-body"><strong>baseObj:</strong> 
					<!-- {{ JSON.stringify(baseObj, null, 13) }} -->
					
					<div v-html="JSON.stringify(baseObj,'', 13)"></div>
					</div>

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



		endPointRute:"research_networks",
		objEpdata: "research_network",
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
		testId: "1032479929",
		isValid: false,
		subtypes_current: [],
		baseObjBk: null,
		naturaleza:[],
		tipoEntidad:[],
		tipoDocumento:[],
		digito:[{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}],
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		baseObj: {
			name:null,
			legal_nature_id:null,
			nit:null,
			check_digit:null,
			institution_type_id:null,
			geo_city_id:null,
			geo_country_id:null,
			geo_state_id:null,

			headquarters_address:null,
			branch_address:null,
			web_page:null,
			email:null,
			phone:null,
			registration:null,
			constitution_date:null,
			active: true,
			created_by: null,
			updated_by: null,
		},
		representante:{
			name: null,
			identification_number: null,
			email: null,
			identification_type_id: null,
			active: true,
			id: null,
			identification_type_name: null,
		},
		lookupData: ["Not Started", "Need Assistance", "In Progress"],
	}),
	created() {
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
		root.naturaleza = root.subtypesByType("entidades_naturaleza");
		root.tipoEntidad = root.subtypesByType("entidades_tipos");
		root.tipoDocumento = root.subtypesByType("entidades_documento");
	},
	mounted() {
		root = this;
		root.loaderShow("Cargando Redes");
		// root.validator = root.$refs.basicGroup.instance;
		root.baseObj.created_by = root.user_id;
		root.baseObj.updated_by = root.user_id;
		root.baseObjBk = root.$clone(root.baseObj);
		let root_id = "#panel-entidades";
		root.panelCmd = $(`${root_id}-cmds`);
		root.panelGrid = $(`${root_id}-grid`);
		root.panelData = $(`${root_id}-data`);
		console.log("User", root.user);
	},
	computed: {
		...mapState("core/tipo", ["types", "subtypes"]),
		...mapGetters("core/tipo", ["subtypesByType", "subtypesByParent"]),
        estadosUnidad() {
			return root.subtypesByType("unidad_estado");
		},
	
	// dataSource: function() {
	// 		return DxStore({
	// 			key: ["id"],
	// 			endPoint: "entities",
	// 			onLoading: function(loadOptions) {
	// 				console.log("loadOptions", loadOptions);
	// 				console.log(root._sep);
	// 				console.log("onLoading");
	// 				// root.loaderElement = root.panelGrid.find(".card-body");
	// 				// root.loaderMessage = "Cargando indicadores";
	// 				// root.loaderShow("Cargando indicadores");
	// 				setTimeout(function() {
	// 					console.log("SCROLL!");
	// 					root.scrollTop();
	// 				}, 300);
	// 			},
	// 			onLoaded: function(results, baseEntity) {
	// 				console.log(root._sep);
	// 				console.log("results", results);
	// 				console.log("baseEntity", baseEntity);
	// 				// root.loaderHide();
	// 			},
	// 		});
	// 	},
	
	dataSource: function() {
			// if (typeof this.group.id === "undefined") return null;
			// console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				endPoint: `research_networks`,
				onLoading: function(loadOptions) {
					root.loaderShow("Cargando Redes", "#panel-produccion .card-body");
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
				root.loaderShow("Guardando Entidad");


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


		savez() {
			console.clear();
			console.log(root.$sep);
			root.loaderElement = root.panelData.find(".card");
			console.log("validator =>", root.validator);
			var result = root.validator.validate();
			console.log("result =>", result);
			
			
			if (result.isValid) {
				root.loaderShow("Guardando Entidad");
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






		// edit(data) {
		// 	root.mode = "edit";
		// 	console.log("data", data);
		// 	root.baseObj = data;
		// 	//root.panelCmdBack.fadeOut();
		// 	root.panelCmds.fadeOut();
		// 	root.panelGrid.fadeOut(function(params) {
		// 		root.panelData.fadeIn(function(params) {});
		// 	});
		// },

		edit(data) {
			// root.mode = "edit";
			// root.type_id = null;
			// // console.clear();
			// console.log("data", data);
			// root.subtypes_current = root.subtypes.filter((o) => o.active);
			// root.baseObj = root.$clone(data);
			// root.panelData.find(".card-header").html(`<i class="icon-database-edit"></i>&nbsp;&nbsp;Editar Entidad`);
			// root.panelCmd.fadeOut();
			// root.panelGrid.fadeOut(function() {
			// 	root.panelData.fadeIn();
			// });

		},

		// add() {
		// 	console.log("ADD");
		// 	root.mode = "add";
		// 	root.baseObj = this.$clone(this.baseEnt);
		// 	//root.panelCmdBack.fadeOut();
		// 	root.panelCmds.fadeOut();
		// 	console.warn("clase padre: ", this.padre);
		// 	console.warn("name panel: ", root.namePanel);
		// 	root.panelGrid.fadeOut(function(params) {
		// 		root.panelData.fadeIn(function(params) {});
		// 	});
		// },

		// cancel() {
		// 	console.log("CANCEL!");
		// 	root.panelData.fadeOut(function(params) {
		// 		root.panelCmds.fadeIn();
		// 		root.panelGrid.fadeIn(function(params) {});
		// 	});
		// },

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
						url: `research_networks/${data.data.id}`,
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



		// enable(state, data) {
		// 	// console.clear();
		// 	console.log("data", data);
		// 	console.log("state", state);
		// 	let a = state ? "activar" : "desactivar";
		// 	let msg = `¿Realmente desea ${a} el subtipo "${data.name}"?`;
		// 	this.$confirm(msg, function(si_no) {
		// 		console.log("result", si_no);
		// 		if (si_no) {
		// 			let item = data;
		// 			item.active = state;
		// 			root.loaderMessage = `${state ? "Activando" : "Desactivando"} subtipo`;
		// 			root.loaderShow();
		// 			root.subtypeEnable({
		// 				typeId: data.type_id,
		// 				subtypeId: data.id,
		// 				subtype: {
		// 					active: state,
		// 					updated_by: root.user_id,
		// 				},
		// 				cb: function(result) {
		// 					console.log("Result", result);
		// 					root.grid.refresh();
		// 				},
		// 			});
		// 		}
		// 	});
		// },


		add(what) {
			root.mode = "add";
			root.type_id = null;
			// console.clear();
			console.log("root.panelGrid", root.panelGrid);
			console.log("root.panelData", root.panelData);
			console.log("add(data)", what);
			root.baseObj = root.$clone(root.baseObjBk);
			root.subtypes_current = root.subtypes.filter((o) => o.active);
			root.panelData.find(".card-header").html(`<i class="icon-database-add"></i>&nbsp;&nbsp;Nueva Entidad`);
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
				




		// enable(state, data) {
		// 	// console.clear();
		// 	console.log("data", data);
		// 	console.log("state", state);
		// 	let a = state ? "activar" : "desactivar";
		// 	let msg = `¿Realmente desea ${a} el subtipo "${data.name}"?`;
		// 	this.$confirm(msg, function(si_no) {
		// 		console.log("result", si_no);
		// 		if (si_no) {
		// 			let item = data;
		// 			item.active = state;
		// 			root.loaderMessage = `${state ? "Activando" : "Desactivando"} subtipo`;
		// 			root.loaderShow();
		// 			root.subtypeEnable({
		// 				typeId: data.type_id,
		// 				subtypeId: data.id,
		// 				subtype: {
		// 					active: state,
		// 					updated_by: root.user_id,
		// 				},
		// 				cb: function(result) {
		// 					console.log("Result", result);
		// 					root.grid.refresh();
		// 				},
		// 			});
		// 		}
		// 	});
		// },

		
		// gridInit(e) {
		// 	let root = this;
		// 	root.grid = e.component;
		// 	// 202103311458: https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Events/
		// 	root.grid.on({
		// 		contentReady: (e) => {
		// 			console.log("contentReady", e);
		// 			if (root.mode == null) root.loaderHide();
		// 		},
		// 		optionChanged: (e) => {
		// 			if (e.fullName == "paging.pageIndex") {
		// 				console.log("optionChanged", e);
		// 				root.loaderShow("Cargando Entidades");
		// 			}
		// 		},
		// 		editorPreparing: (e) => {
		// 			if (e.dataField === "LastName" && e.parentType === "dataRow") {
		// 				e.editorOptions.disabled = e.row.data && e.row.data.FirstName === "";
		// 			}
		// 		},
		// 	});
		// },

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
