<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-cog mr-1 color-main-600"></i>
					<span class="font-weight-semibold">Administración</span> &raquo; Rol de Usuarios 
				</h1>
			</div>
			<div class="header-elements">
				<span id="panel-roleUsers-cmds">
					<button type="button" @click.prevent="add()" title="Crear Entidad.." class="btn btn-main btn-labeled btn-labeled-left legitRipple">
						<b><i class="icon-database-add"></i></b> Nuevo Rol de usuario
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


                                <div class="col-12">
									<div class="row">

												<div class="col-md-4">
													<div class="form-group">
														<label>Nombre:</label>
														<DxTextBox :value.sync="baseObj.name" placeholder="Nombre" class="form-control" :read-only="false" mode="text">
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
														</DxTextBox>
													</div>
												</div>
												
												<div class="col-md-3">
													<div class="form-group">
														<label>Permiso del Rol:</label>
														<DxSelectBox
															:show-clear-button="true"
															:grouped="false"
															:data-source="groupRoles2"
															:value.sync="baseObj.parent_id"
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

												<div class="col-md-3">
													<div class="form-group">
														<label>Tipo de Permiso:</label>
														<DxSelectBox
															:show-clear-button="true"
															:grouped="false"
															:data-source="tiposPermiso"
															:value.sync="baseObj.role_type_id"
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

												<div class="col-md-2">
													<div class="form-group">
													<label>Activo:</label>
														<DxSwitch
															ref="chkActiveRef"
															:value.sync="baseObj.active"
															:read-only="!editMode"
															switched-on-text="SI"
															switched-off-text="NO"
															@valueChanged="active"
														/>
													</div>
												</div>


									</div>
								</div>


<!--
<div class="col-12">
<div class="row">
	
<div class="col-md-3">
	<div class="form-group">
		<label>Documento de identidad:</label>
		<DxNumberBox
		class="form-control"
		:show-clear-button="true"
		:value.sync="representante.identification_number"
		placeholder="Documento de identidad"
		:read-only="modeEdit"
		>
		<DxValidator>
			<DxRequiredRule />
		</DxValidator>
		<DxNumberBoxButton :options="searchButton" name="search" location="after" />
		</DxNumberBox>
	</div>
</div>

<div class="col-md-3">
	<div class="form-group">
	<label>Tipo Documento: </label>
	<DxSelectBox
		::show-clear-button="true"
		:grouped="false"
		:search-enabled="false"
		placeholder="Seleccione..."
		:value.sync="representante.identification_type_id" 
		class="form-control"
		:data-source="tipoDocumento" 
		display-expr="st_name"
		:read-only="modeEdit"
		value-expr="id">
	</DxSelectBox>
	</div>
</div>



<div class="col-md-3">
	<div class="form-group">
	<label>Nombre Representante: </label>
	<DxTextBox placeholder="Nombre Institución" class="form-control" :value.sync="representante.name" :read-only="modeEdit">
	<DxValidator>
		<DxRequiredRule />
	</DxValidator>
	</DxTextBox>
	</div>
</div> 


<div class="col-md-3">
	<div class="form-group">
	<label>Email: </label>
	<DxTextBox placeholder="Nombre Institución" class="form-control" :value.sync="representante.email" :read-only="modeEdit">
	<DxValidator>
		<DxRequiredRule />
	</DxValidator>
	</DxTextBox>
	</div>
</div>

</div>
</div> 
-->



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
							caption="Nombre"
							data-type="string"
							alignment="left"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
						/>
						
						<!-- <DxColumn
							data-field="role_type_name"
							caption="Tipo de Permiso"
							data-type="string"
							alignment="left"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
						/> -->

						<DxColumn 
						:allow-filtering="true" 
						data-field="role_type_id" 
						caption="Tipo de Permiso" 
						data-type="number"
						alignment="left" 
						:visible="true" 
						>
							<DxLookup :data-source="tiposPermiso" value-expr="id" display-expr="st_name" />
						</DxColumn>


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
							<!-- programando {{data.data.id}} mas {{data.data.role_type_id}} -->
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
							
						/>

						

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
									<a title="Modificar Rol..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a>
									<a v-if="data.data.active" title="Desactivar Rol..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
										<i class="icon-database-remove"></i>
									</a>
									<a v-else title="Activar Rol..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
				<!-- <div class="card">
					<div class="card-body"><strong>representante:</strong> {{ JSON.stringify(representante, null, 3) }}</div>
				</div> -->
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
		tiposPermiso:null,//[{id:1, name: "Roles de Grupo"},{id:2, name: "Roles de semillero"},{id:3, name: "Grupo y Semillero"}],
		modeEdit:false,
		groupRoles2:null,
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
		baseObj: {
			name: null,
			role_type_id: null,
			active: true,
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
		baseObjhist:{
			legal_representative_id: null,
			is_current: true,
			active: true,
		},
		lookupData: ["Not Started", "Need Assistance", "In Progress"],
	}),
	created() {
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
		root.tiposPermiso = root.subtypesByType("seleccion_vista_rolparticipantes");
		// root.baseEnt2 = this.$clone(this.representante);
		// root.naturaleza = root.subtypesByType("roleUsers_naturaleza");
		// root.tipoEntidad = root.subtypesByType("roleUsers_tipos");
		// root.tipoDocumento = root.subtypesByType("roleUsers_documento");
		
	},
	mounted() {
		root = this;
		root.loaderShow("Cargando Roles");
		root.validator = root.$refs.basicGroup.instance;
		root.baseObj.created_by = root.user_id;
		root.baseObj.updated_by = root.user_id;
		// this.getAllRoles();
		// root.imprimir();

		// dato recuperado de clasificador.json seccion estructura_rol 
		// ingresado en el metodo comoutado listRolEstructureGroup.
		this.groupRoles2=this.listRolEstructureGroup;

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
				endPoint: `role`,
				onLoading: function(loadOptions) {
					root.loaderShow("Cargando Roles", "#panel-produccion .card-body");
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
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active", getSerarchDoc: "univerdalGet"}),
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
		
		// editComp: async (entidad) =>{
		// 	//let doc=root.baseObj.legal_representative_identification;
		// 	let datauser= await root.getSerarchDoc({url: 'entities/'+entidad+'/hist_legal_representatives?filter=["is_current","=",true]'});
		// 	let documet=datauser[0].legal_representative_identification;
		// 	root.datosDoc = await root.getSerarchDoc({url: 'legal_representatives?identification_number=' + documet});
		// 	root.representante.identification_number=documet;
		// 	root.representante=root.datosDoc[0];
		// 	root.baseObj.legal_representative_id=root.representante.id;
		// 	// root.representante=root.datosDoc[0];
		// 	root.modeRep = "edit";
		// },
		// imprimir(){
		// 	console.warn("resultado dato usuario ",this.get_group_role_name(2));
		// },
		
		saveRepresentante() {
			// if (result.isValid) {
				// let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " elemento";
				if (root.modeRep == "add") root.representante.created_by = root.user_id;
				if (root.modeRep == "edit") root.representante.updated_by = root.user_id;
				let obj = root.representante;
				let dto = {
					newFormat: true,
					// unidadId: root.$route.params.idEnt,
					stringEP: "legal_representatives",
					rute2: "legal_representatives",
					mod: obj.id,
					objectSend: { legal_representative: obj },
					cb: function(item) {
						console.log("item", item);
						root.baseObjhist.legal_representative_id=item.id;
						root.baseObj.legal_representative_id=item.id;
					},
				};
				if (root.modeRep == "edit") root.objUpdate(dto);
				else root.objSave(dto);
		},


		// saveHistory(id) {
		// 	// console.log("VALID!");
		// 	// root.scrollTop();
		// 	// root.panelCmds.fadeOut();
		// 	// let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " elemento";
		// 	// root.loaderShow(msg, root.panelData);
		// 	// if (root.mode == "add") 
		// 	root.baseObjhist.created_by = root.user_id;
		// 	// if (root.mode == "edit") root.baseObjhist.updated_by = root.user_id;
			
		// 	// root.baseObjhist.is_current=true;
		// 	let obj = root.baseObjhist;
		// 	let dto = {
		// 		newFormat: true,
		// 		// unidadId: root.$route.params.idEnt,
		// 		stringEP: root.ruta,
		// 		rute2: `entities/${id}/hist_legal_representatives/`,
		// 		mod: obj.id,
		// 		objectSend: { hist_legal_representative: obj },
		// 		cb: function(item) {
		// 			console.log("item", item);
		// 			// root.grid.refresh();
		// 			// root.loaderHide();
		// 			// root.cancel();
		// 		},
		// 	};
		// 	// console.log("root.mode", root.mode);
		// 	// if (root.mode == "edit") root.objUpdate(dto);
		// 	root.objSave(dto);
		// 	// root.cancel();
		// },
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

		// save() {
		// 	console.clear();
		// 	console.log(root.$sep);
		// 	root.loaderElement = root.panelData.find(".card");
		// 	console.log("validator =>", root.validator);
		// 	var result = root.validator.validate();
		// 	console.log("result =>", result);

		// 	if (result.isValid) {
		// 		root.loaderShow("Guardando Entidad");


		// 		console.log("VALID!");
		// 		root.scrollTop();
		// 		// root.panelCmds.fadeOut();
		// 		// root.loaderElement = ;
		// 		let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " Elemento";
		// 		root.loaderShow(msg, root.panelData);
		// 		if (root.mode == "add") {
		// 			root.baseObj.created_by = root.user_id;
		// 			// root.saveRepresentante();
		// 		}
		// 		if (root.mode == "edit") root.baseObj.updated_by = root.user_id;
		// 		// root.baseObj.legal_representative_id=root.representante.identification_type_id;

		// 		// root.baseObj.product_type_id = root.codEP;
		// 		// root.baseObj.research_group_id = root.group.id;
		// 		let obj = root.baseObj;
		// 		//let json1 = `{ "${mydata}": `+JSON.stringify(obj)+" } ";
		// 		let dto = {
		// 			newFormat: true,
		// 			// unidadId: root.group.id,
		// 			stringEP: root.endPointRute,
		// 			rute2: root.endPointRute,
		// 			mod: obj.id,
		// 			//objectSend: { regulation : obj },
		// 			objectSend: JSON.parse(`{ "${root.objEpdata}": ` + JSON.stringify(obj) + "}"),
		// 			cb: function(item) {
		// 				console.log(root.$sep);
		// 				console.log("result =>", result);
		// 				// root.saveHistory(item.id);
		// 				root.grid.refresh();
		// 				root.loaderHide();
		// 				root.cancel();
		// 			},
		// 		};
		// 		console.log("root.mode", root.mode);
		// 		if (root.mode == "edit") root.objUpdate(dto);
		// 		else root.objSave(dto);
		// 		root.cancel();
		// 	}
		// },

		edit(data) {
			root.mode = "edit";
			root.modeEdit=true,
			root.type_id = null;
			// root.editComp(data.id);
			// console.clear();
			console.log("data", data);
			root.subtypes_current = root.subtypes.filter((o) => o.active);
			root.baseObj = root.$clone(data);
			root.panelData.find(".card-header").html(`<i class="icon-database-edit"></i>&nbsp;&nbsp;Editar Rol`);
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
			let msg = `¿Realmente desea ${a} el rol: <span class='text-sb'>"${data.data.name}" ?`;
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
			root.panelData.find(".card-header").html(`<i class="icon-database-add"></i>&nbsp;&nbsp;Nuevo Rol`);
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