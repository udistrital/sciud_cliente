<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-paperplane mr-1 color-main-600"></i>
					<span class="font-weight-semibold">Convocatorias</span> &raquo; Movilidad
				</h1>
			</div>
			<div class="header-elements">
				<span id="panel-roleUsers-cmds">
					<button type="button" @click.prevent="add()" title="Crear Entidad.." class="btn btn-main btn-labeled btn-labeled-left legitRipple">
						<b><i class="icon-database-add"></i></b> Postular
					</button>
				</span>
			</div>
		</div>





		<div class="row slide" id="panel-roleUsers-data">
			
			<div class="col">
				<div class="card main">
					<div class="card-header main">Alguna acción</div>
					<div class="card-body pb-0 pt-2">
						<DxValidationGroup ref="basicGroup">
							<criteriosEvaluacion :group="{id:1}" :baseObj="baseObj" :key="baseObj.id"></criteriosEvaluacion>
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

		<div class="row" id="panel-roleUsers-grid">
			<div class="col">
				<div class="card" id="data-container">
					<div class="card-body pt-3 mh">

		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-list mr-1 color-main-600"></i>
					<span class="font-weight-semibold">Listado participantes </span>
				</h1>
				<!-- <h1>
					<i class="icon-list mr-1 color-main-600"></i>
					<span class="font-weight-semibold">Listado Participantes </span> &raquo; Convocatoria NN
				</h1> -->
			</div>
		</div>
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
						<!-- <DxColumn
							data-field="call_id"
							caption="ID conv"
							data-type="number"
							alignment="center"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
							width="80"
						/> -->
						<DxColumn
							data-field="call_name"
							caption="Convocatoria"
							data-type="string"
							alignment="left"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
							
						/>

						<DxColumn
							data-field="event_name"
							caption="Nombre Evento"
							data-type="string"
							alignment="left"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
						/>

						<DxColumn
							data-field="paper_name"
							caption="Nombre Ponencia"
							data-type="string"
							alignment="left"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
						/>

						<DxColumn
							data-field="event_edition_number"
							caption="No Ediciones"
							data-type="string"
							alignment="center"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
							width="80"
						/>

						<DxColumn
							data-field="geo_country_name"
							caption="País"
							data-type="string"
							alignment="left"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
						/>

						<!-- <DxColumn
							data-field="geo_state_name"
							caption="Estado"
							data-type="string"
							alignment="left"
							:visible="false"
							:allow-grouping="false"
							:allow-filtering="false"
						/> -->

						<DxColumn
							data-field="geo_city_name"
							caption="Ciudad"
							data-type="string"
							alignment="left"
							:visible="false"
							:allow-grouping="false"
							:allow-filtering="false"
						/>

						<DxColumn
							data-field="event_date"
							caption="Fecha Evento"
							data-type="string"
							alignment="center"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
						/>

						<DxColumn data-field="is_organizer" caption="Organizador UD" data-type="date" alignment="center" :visible="false" :customize-text="yesNo" width="70" />

						<DxColumn data-field="event_page" caption="URL" data-type="string" alignment="center" :visible="true" :width="100" cell-template="tplWeb" />
						<template #tplWeb="{ data }">
							<a v-if="data.data.event_page != '' && data.data.event_page != null"
								:title="data.data.event_page" class="cmd-item color-main-600 mr-2"
								:href="data.data.event_page" Target="_blank">
								<i class="icon-link"></i> Visitar
							</a>
							<a v-else title="No dispone de Url" class="cmd-item color-main-600 mr-2" href="#">-</a>
						</template>

						<DxColumn
							data-field="research_group_name"
							caption="Grupo que Presenta"
							data-type="string"
							alignment="left"
							:visible="false"
							:allow-grouping="false"
							:allow-filtering="false"
						/>

					<!-- 						
						<DxColumn
							data-field="role_type_name"
							caption="Aplicacion del Permiso"
							data-type="string"
							alignment="left"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
						/>


						<DxColumn
							data-type="string"
							:allow-filtering="false"
							:allow-sorting="true"
							:customize-text="nullText"
							alignment="left"
							caption="Permiso Otorgado"
							data-field="data_user_rol"
							cell-template="tpl-data_user_rol"
						/>

						<template #tpl-data_user_rol="{ data }">
							<! -- programando {{data.data.id}} mas {{data.data.role_type_id}} -- >
							{{get_group_role_name(data.data.parent_id)!== null? get_group_role_name(data.data.parent_id).charAt(0).toUpperCase()+get_group_role_name(data.data.parent_id).slice(1) : "--Sin Aplicar--"}}
						</template>

						<DxColumn
							data-field="created_at"
							caption="Fecha Creacion"
							data-type="date"
							alignment="center"
							:visible="true"
							:allow-grouping="true"
							
						/>

						
						<DxColumn
							data-field="updated_at"
							caption="Fecha Actulización"
							data-type="date"
							alignment="center"
							:visible="true"
							:allow-grouping="true"
							
						/> -->

						

						<!-- <DxColumn data-field="observation" caption="Observaciones" data-type="string" alignment="center" :visible="true" cell-template="tplObs" /> -->
						<DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="70" />
						
						<DxColumn :width="80" alignment="center" cell-template="tpl" caption="" name="cmds" :fixed="true" fixed-position="right" />

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
								<!-- <a
									title="Dependencias..."
									href="#"
									@click.prevent="go(data.value, `/admin/roleUsers/${data.data.id}/dependencias`, 'Cargando Datos')"
									class="cmd-item color-main-600"
								>
									<i class="icon-tree5"></i>
								</a>
								<a
									title="Representacion y Contactos..."
									href="#"
									@click.prevent="go(data.value, `/admin/roleUsers/${data.data.id}`, 'Cargando Datos')"
									class="cmd-item color-main-600"
								>
									<i class="icon-vcard"></i>
								</a> -->

								<span v-if="editMode">
									<a title="Modificar participante..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a>
									<a v-if="data.data.active" title="Desactivar participante..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
										<i class="icon-database-remove"></i>
									</a>
									<a v-else title="Activar participante..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
				<div class="card">
					<div class="card-body"><strong>dataUserLogin:</strong> {{ JSON.stringify(dataUserLogin, null, 3) }}</div>
				</div> 
				<div class="card">
					<div class="card-body"><strong>groupResearchers:</strong> {{ JSON.stringify(groupResearchers, null, 3) }}</div>
				</div> 
				<div class="card">
					<div class="card-body"><strong>porcentajes convocatoria:</strong> {{ JSON.stringify(promedioconv, null, 3) }}</div>
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
import  {DxValidator, DxRequiredRule, DxCustomRule } from "devextreme-vue/validator";
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
		// DxEmailRule, DxStringLengthRule, DxPatternRule,
		// Usuario: () => import("@/components/element/usuario"),
        // Geo: () => import("@/components/element/geo"),
		criteriosEvaluacion: () => import("@/modules/convocatoria/movilidad/form_aceptacion_aspirantes.vue"),
	},
	data: () => ({
		tiposPermiso:null,//[{id:1, name: "Roles de Grupo"},{id:2, name: "Roles de semillero"},{id:3, name: "Grupo y Semillero"}],
		modeEdit:false,
		dataUserLogin:null,
		endPointRute:"role",
		objEpdata: "role",
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
		datauser:{name:"", cc:""},
		promedioconv:{},
		groupResearchers:[],
		baseObj:{
			id: null,
			call_id: null,
			call_name: null,
			geo_city_id: null,
			geo_city_name: null,
			geo_country_id: null,
			geo_country_name: null,
			geo_state_id: null,
			event_name: null,
			event_edition_number: null,
			event_date: null,
			paper_name: null,
			is_organizer: null,
			event_page: null,
			research_group_id: null,
			research_group_name: null,
			researcher_id: null,
			oas_researcher_id: null,
			geo_state_name: null,
			active: null,

		},

		
		lookupData: ["Not Started", "Need Assistance", "In Progress"],
	}),
	created() {
		root = this;
		root.baseEnt = this.$clone(this.baseObj);

		// root.getResearchers({
		// 	id: this.group.id,
		// 	cb: function(results) {
		// 		console.log(root.$sep);
		// 		root.groupResearchers = results.researchers;
		// 		console.log("root.groupResearchers", root.groupResearchers);
		// 	},
		// });

	},
    async mounted() {
		root = this;
		root.loaderShow("Cargando participantes");
		root.validator = root.$refs.basicGroup.instance;
		root.baseObj.created_by = root.user_id;
		root.baseObj.updated_by = root.user_id;
		// this.getAllRoles();
		// root.imprimir();

		// dato recuperado de clasificador.json seccion estructura_rol 
		
		// ingresado en el metodo comoutado listRolEstructureGroup.
		let usersys=root.user
		// root.dataUserLogin.name=usersys.TerceroId.nombreCompleto;
		// root.dataUserLogin.cc=usersys.local.identification_number

		let id= parseInt(root.user.local.identification_number);

//esto funciona para saber los datos de usuario con idoas       researcher_research_units?identification_number=9872650
		let oas_user = await root.getOasUser({ doc: id });
		console.warn("usuario", oas_user);
		let t = oas_user;
		root.datauser=t.TerceroId;
//fin para saber datos usuario desde la oas con idoas


		// console.warn("usuario nombre completo ",  t.NombreCompleto);
		

		let root_id = "#panel-roleUsers";
		root.panelCmd = $(`${root_id}-cmds`);
		root.panelGrid = $(`${root_id}-grid`);
		root.panelData = $(`${root_id}-data`);
		console.log("User", root.user);
	},
	computed: {
		...mapGetters("auth/usuario", ["groupRoles"]),
		...mapState("core/tipo", ["types", "subtypes"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
	dataSource: function() {
			// if (typeof this.group.id === "undefined") return null;
			// console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				endPoint: `/calls/${root.$route.params.itemId}/mobility_calls`,
				onLoading: function(loadOptions) {
					root.loaderShow("Cargando participantes", "#panel-produccion .card-body");
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
		...mapActions("auth/usuario", ["getUser", "saveUserAsync", "getOasUsers", "getOasUser"]),
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active", getSerarchDoc: "univerdalGet", getAll:"getAll"}),
		
...mapActions("unidad", ["getResearcher"]),
		
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
		

		



		
		save() {
			console.log(this.$sep);
			var result = root.$refs.basicGroup.instance.validate();
			console.log("result", result);
			if (result.isValid) {
				console.log("VALID!");
				root.scrollTop();
				// root.panelCmds.fadeOut();
				// root.loaderElement = ;
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " Elemento";
				root.loaderShow(msg, root.panelData);
				if (root.mode == "add") root.baseObj.created_by = root.user_id;
				if (root.mode == "edit") root.baseObj.updated_by = root.user_id;
                // root.baseObj.research_network_id=root.group.id;
				// root.baseObj.product_type_id = root.codEP;
				// root.baseObj.research_group_id = root.group.id;
				let obj = root.baseObj;
				//let json1 = `{ "${mydata}": `+JSON.stringify(obj)+" } ";
				let dto = {
					newFormat: true,
                    rute2:"role",
					// unidadId: root.baseObj.id,
					stringEP: root.endPointRute,
					mod: obj.id,
					//objectSend: { regulation : obj },
					objectSend: JSON.parse(`{ "${root.objEpdata}": ` + JSON.stringify(obj) + "}"),
					cb: function(item) {
						console.log("item", item);
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

			root.getAll({
				// url: "/research_units/117/group_member/10286",
				//url: "/calls/" + parseInt(data.id) + "/call_documents",
				url: "calls/"+data.call_id+"/call_eval_criteria",
				cb: function (results) {
					//let listDocuments = results;
					root.promedioconv=results;
					// console.warn("movilidad docs list ", listDocuments);
					// root.listDoc2subtipos(listDocuments);
					// root.loaderHide();
				},
			});


			root.mode = "edit";
			root.modeEdit=true,
			root.type_id = null;
			// root.editComp(data.id);
			// console.clear();
			console.log("data", data);
			root.subtypes_current = root.subtypes.filter((o) => o.active);
			root.baseObj = root.$clone(data);
			root.panelData.find(".card-header").html(`<i class="icon-database-edit"></i>&nbsp;&nbsp;Evaluar Convocatoria de Movilidad`);
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
			let msg = `¿Realmente desea ${a} el participante: <span class='text-sb'>"${data.data.name}" ?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am}`, root.panelGrid);
					let active = JSON.stringify({ active: state, updated_by: root.user_id });

					var dto = {
						newFormat: true,
						url: `role/${data.data.id}`,
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
			root.modeEdit=false,
			// console.clear();
			console.log("root.panelGrid", root.panelGrid);
			console.log("root.panelData", root.panelData);
			console.log("add(data)", what);
			root.baseObj = root.$clone(root.baseObjBk);
			root.subtypes_current = root.subtypes.filter((o) => o.active);
			root.panelData.find(".card-header").html(`<i class="icon-database-add"></i>&nbsp;&nbsp;Nueva Comvocatoria para Movilidad`);
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
				root.baseObj = root.$clone(root.baseEnt);
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