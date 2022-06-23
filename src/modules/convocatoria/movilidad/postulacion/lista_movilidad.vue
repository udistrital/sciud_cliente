<template>
	<div class="col mt-3 pl-1 pr-1" :id="namePanel">
		<div class="row">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline mb-2">
						<div class="page-title p-0 m-0">
							<h1>
								<i class="icon-grid3 mr-1 color-main-600"></i>
								<span class="font-weight-semibold">{{ title }}</span>
								<span class="item-title">&nbsp;</span>
							</h1>
							<span class="item-title">En esta sección usted podrá visualizar las convocatorias de movilidad que tiene registradas hasta el momento.</span>
							<p><b>Nota:</b> Cargue los documentos obligatorios y luego haga clic en el botón de publicar de la columna acciones.</p> 
						</div>
						<div class="header-elements">
							<span class="cmds-back slide">
								<button type="button" @click.prevent="retorno()" title="Volver al panel principal.."
									class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-arrow-left"></i></b> Volver A {{ title }}
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Documentos :id="id_panel_documentos" :end-point="endPointRute" :main-obj="baseObj" :parent="this" :tipos="tiposDocumento" :botonUploadVisible="{visible:true}" />

		<DxValidationGroup ref="basicGroup">
			<div class="row data slide">
				<div class="col">
					<div class="card">
						<div class="card-header main">
							<i class="icon-pencil3 p-3"></i>
							<span class="font-weight-semibold">{{ mode == "edit" ? "Editar" : "Crear" }} {{ titleBtn }}
							</span>
						</div>
						<div class="card-body mb-0 pb-0 pt-2">
							<h2><span class="item-title mr-1">Por favor verifique bien la información diligenciada, esta
									aplicación no se podrá editar más adelante.</span></h2>
							<div class="row">
								<!-- formulatio -->

								<div class="col-md-4">
									<div class="form-group">
										<label>Estructuras de Investigación:</label>
										<DxSelectBox
											:show-clear-button="true"
											:read-only="false"
											:data-source="listGrupoInvestigador"
											:value.sync="baseObj.research_group_id"
											class="form-control"
											display-expr="research_group_name"
											value-expr="research_group_id"
											placeholder="Seleccione..."
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxSelectBox>
									</div>
								</div>

								<div class="col-md-3">
									<div class="form-group">
										<label>Nombre del evento al que se asiste: </label>
										<DxTextBox placeholder="Nombre del evento al que se asiste" class="form-control"
											:value.sync="baseObj.event_name">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>



								<div class="col-md-3">
									<div class="form-group">
										<label>Nombre de la ponencia: </label>
										<DxTextBox placeholder="Nombre de la ponencia" class="form-control"
											:value.sync="baseObj.paper_name">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-2">
									<div class="form-group">
										<label>N° de ediciones del Evento: </label>
										<DxNumberBox placeholder="N° de ediciones del Evento" class="form-control"
											:value.sync="baseObj.event_edition_number">
											<DxValidator>
											</DxValidator>
										</DxNumberBox>
									</div>
								</div>

								<div class="col-md-12">
									<label>Lugar: </label>
									<Geo :lockElement="loaderElement" :syncObject="baseObj" />
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label>¿La UD participa como organizador o miembro de mesas de evaluación?:
										</label>
										<DxSwitch :value.sync="baseObj.is_organizer" switched-on-text="SI"
											switched-off-text="NO" />
									</div>
								</div>

								<div class="col-md-3">
									<div class="form-group">
										<label>Fecha del evento: </label>
										<DxDateBox class="form-control" name="event_date"
											:value.sync="baseObj.event_date" id="event_date" placeholder="DD/MM/YYYY"
											display-format="dd/MM/yyyy" :min="minDate" :max="actualDate" type="date">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxDateBox>
									</div>
								</div>

								<div class="col-md-6">
									<div class="form-group">
										<label>Pagina del evento: </label>
										<DxTextBox placeholder="Pagina del evento" class="form-control"
											:value.sync="baseObj.event_page">
											<DxValidator>
												<DxRequiredRule />
												<DxPatternRule
													message="Por favor Ingrese la Pagina WEB con los datos completos Ej: http://miweb.com/articulo"
													:pattern="urlPattern" />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>


								<div class="col-md-12" v-if="tiposDocumento.length > 0">
									<div class="card-body" v-html="requisitoArchivo()"></div>
								</div>
								<!-- fin formulario -->
							</div>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col">
									<DxButton @click="cancel" class="nb">
										<template #default>
											<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
												<b><i class="icon-database-remove"></i></b> Regresar
											</span>
										</template>
									</DxButton>
								</div>
								<div class="col text-right">
									<DxButton @click="save" class="nb" v-if="false">
										<!-- v-if="editMode">-->
										<template #default>
											<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
												{{ mode == "edit" ? "Actualizar Aplicacion" : "Nueva Aplicación" }} <b><i
														class="icon-database-add"></i></b>
											</span>
										</template>
									</DxButton>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DxValidationGroup>


		<div class="row grid">
			<div class="col">
				<h2></h2>
				<div class="p-0">
					<DxDataGrid class="main" width="100%" @initialized="gridInit" @content-ready="onContentReady"
						:allow-column-reordering="true" no-data-text="No hay elementos registrados"
						:data-source="dataSource" :remote-operations="true" :hover-state-enabled="true"
						:row-alternation-enabled="true" :show-borders="false">
						<DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
						<DxSorting mode="single" /><!-- single, multiple, none" -->
						<DxPaging :page-size="dgPageSize" />
						<DxFilterRow :visible="false" />
						<DxLoadPanel :enabled="false" />
						<DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
						
						<DxGrouping :auto-expand-all="true" />
						
						<DxSummary>
							<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
						</DxSummary>
						
						<DxPager :show-info="true" :show-page-size-selector="true" :show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="{2} Lista Aplicaciones Movilidad (Página {0} de {1})" />
						
						<DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
						
						
						<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->
						<!-- :sort-index="1" sort-order="desc" -->
						<DxColumn data-field="id"   caption="ID"  width="90" data-type="string"
							alignment="center" :visible="true" :allow-grouping="false"  /> 
						<!-- <DxColumn data-field='researcher_id' caption='Id Investigador' data-type='string'
							alignment='center' :visible='true' :allow-grouping='false' /> -->
						<!-- <DxColumn data-field="researcher_id" caption="Nombre" data-type="string" alignment="center" :visible="true" cell-template="tplObs" /> -->

						<DxColumn data-field='call_name' caption='Convocatoria' data-type='string' alignment='left'
							:visible='true' :allow-grouping='false' />
						<DxColumn data-field='event_name' caption='Evento' data-type='string' alignment='left'
							:visible='true' :allow-grouping='false' />
						<DxColumn data-field='event_edition_number' caption='Edicion' data-type='string'
							alignment='center' width="90" :visible='true' :allow-grouping='false' />
						<DxColumn data-field='geo_city_name' caption='Ciudad' data-type='string' alignment='left'
							:visible='false' :allow-grouping='false' />
						<DxColumn data-field='geo_country_name' caption='Pais' data-type='string' alignment='left'
							:visible='true' :allow-grouping='false' />
						
						<DxColumn data-field='event_date' caption='Fecha' data-type='date' alignment='center'
							:visible='true' :allow-grouping='false' />
						<DxColumn data-field='is_organizer' width="70" caption='U. Distrital' data-type='string'
							alignment='center' :visible="true" :customize-text="yesNo" :allow-grouping='false' />
						<DxColumn data-field="event_page" caption="URL" data-type="string" alignment="center"
							:visible="true" :width="100" cell-template="tplWeb" />
						<DxColumn data-field='geo_state_name' caption='Estado' data-type='string' alignment='center'
							:visible='false' :allow-grouping='false' />
						<DxColumn data-field='state_name' caption='Aplicación' data-type='string' alignment='center'
							:visible='true'  :group-index="0"  />
						<!-- <DxColumn data-field="active" caption="Estado" data-type="date" alignment="center"
							:visible="true" :customize-text="yesNo" width="70" /> -->
						<DxColumn :width="90" alignment="center" cell-template="tpl" caption="Acciones" />

						<template #tplWeb="{ data }">
							<a v-if="data.data.event_page != '' && data.data.event_page != null"
								:title="data.data.event_page" class="cmd-item color-main-600 mr-2"
								:href="data.data.event_page" Target="_blank">
								<i class="icon-link"></i> Visitar
							</a>
							<a v-else title="No dispone de Url" class="cmd-item color-main-600 mr-2" href="#">-</a>
						</template>

						<template #tplObs="{ data }">
							{{ verObservar(data.data) }}
						</template>

						<template #tpl="{ data }">
							<span class="cmds">
								<a title="Observar documentos..." class="cmd-item color-main-600 mr-2"
									@click.prevent="documentos(data)" href="#">
									<i class="icon-file-pdf"></i>
								</a>

								<a title="Detalles Aplicación... " class="cmd-item color-main-600"
									@click.prevent="edit(data.data)" href="#">
									<i class="icon-insert-template"></i>
								</a>

								<a v-if="data.data.state_id===1065" title="Terminar y Enviar..." class="cmd-item color-main-600 mr-2"
									@click.prevent="enviar(data)" href="#">
									<i class="icon-bubble-last"></i>
								</a>

								<a v-if="data.data.state_id===1062" title="Corregir y Enviar..." class="cmd-item color-main-600 mr-2"
									@click.prevent="enviar(data)" href="#">
									<i class="icon-bubble-last color"></i>
								</a>
								

								<span v-if="editMode"></span>
								<!-- <a title="Editar elemento..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a> -->
								<!-- <a v-if="data.data.active" title="Desactivar Aplicacion..."
									class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
									<i class="icon-database-remove"></i>
								</a>
								<a v-else title="Activar Aplicacion..." class="cmd-item color-main-600 mr-2"
									@click.prevent="active(data, true)" href="#">
									<i class="icon-database-check"></i>
								</a> -->

							</span>
						</template>
					</DxDataGrid>
				</div>
			</div>
		</div>

		<div class="card mt-3" v-if="debug">
			<div class="card-body">
				{{ JSON.stringify(baseObj, null, "\t") }}
			</div>
			<div class="card-body">
				{{ JSON.stringify(tiposDocumento, null, "\t") }}
			</div>
			<div class="card-body">
				{{ JSON.stringify(userinfo, null, "\t") }}
			</div>
		</div>

		<DxPopup :visible="popupObs" :drag-enabled="false" :close-on-outside-click="false" :show-title="true"
			width="60%" height="300" title="Observación:">
			<div class="row" style="overflow-y: scroll; height:148px">
				<div class="col">
					<h3>
						<i class="icon-info mr-1 color-main-600"></i>
						<span class="font-weight-semibold">{{ baseObj[titlecolum] }}</span>
					</h3>
					<div v-html="observarData"></div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<hr />
					<DxButton @click="popupObs = false" class="nb">
						<template #default>
							<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
								<b><i class="icon-database-remove"></i></b> Salir
							</span>
						</template>
					</DxButton>
				</div>
			</div>
		</DxPopup>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root = null;
let $ = window.jQuery;
import DxStore from "@/store/dx";
import {
	DxColumn,
	DxColumnChooser,
	DxDataGrid,
	DxFilterRow,
	DxGroupItem,
	DxGroupPanel,
	DxGrouping,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator, DxPatternRule } from "devextreme-vue/validator";
import { DxDateBox, DxSelectBox, DxButton, DxTagBox, DxTextBox, DxNumberBox, DxTextArea, DxValidationGroup, DxPopup, DxSwitch } from "devextreme-vue";
import { mapState, mapActions, mapGetters } from "vuex";
//import { DxStateStoring } from 'node_modules/devextreme-vue/pivot-grid';

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	components: {
		// Commands,
		DxPopup,
		DxButton,
		DxColumn,
		DxPatternRule,
		DxColumnChooser,
		DxDataGrid,
		DxDateBox,
		DxNumberBox,
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
		DxTextArea,
		DxTextBox,
		DxValidator,
		DxValidationGroup,
		DxSwitch,
		Geo: () => import("@/components/element/geo"),
		// Observaciones: () => import("@/components/element/html_editor"),
		Documentos: () => import("@/components/element/documentos"),
		// Participantes: () => import("@/components/element/participantes"),
	},
	props: {
		group: {
			type: Object,
			default: () => null,
		},

		userinfo: {
			type: Object,
			default: () => null,
		},

		endPointRute: {
			type: String,
			default: () => null,
		},
		objEpdata: {
			type: String,
			default: () => null,
		},
		title: {
			type: String,
			default: () => null,
		},
		titleBtn: {
			type: String,
			default: () => null,
		},
		titlecolum: {
			type: String,
			default: () => null,
		},

	},
	data: () => ({
		cargadocs:false,
		visibleguardar:{visible:false},
		listGrupoInvestigador:{},
		listDocumnetUp:[],
		listDocsRequire:[],
		namePanel: "redconocimiento",
		codEP: null, //611 612 613
		popupObs: false,
		observarData: "",
		editData: null, //sirve para dejar formulario en limpio o llenar datos
		items: [],
		totaCount: 0,
		grid: null,
		mode: null,
		unidad: null,
		section: null,
		//tipos: 587, //584-179
		tipox: [],
		totalCount: 0,
		tiposDocumento: [],
		subtipos: [],
		isValid: false,
		panelData: null,
		panelGrid: null,
		panelParticipantes: null,
		panelDocs: null,
		panelCmds: null,
		baseEntity: null,
		docLink: null,
		firstLoad: true,
		now: new Date(),
		baseEnt: null,
		participationid: null,
		id_panel_documentos: "documentos",
		id_panel_participantes: "participantes",
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		id_researcher_group:0,
		baseObj: {
			name: null,
			category_id: null,
			colciencias_call_id: null,
			funding_institution: null,
			geo_city_id: null,
			geo_country_id: null,
			geo_state_id: null,
			organization_name: null,
			research_group_id: null,
			start_date: null,
			finish_date: null,
			observation: null,
			participation_id: null,
			active: true,
		},
	}),
	async created() {
		// console.clear();
		root = this;
		setTimeout(function(){
			root.listGrupoInvestigador=root.userinfo.gropusmember;
			if(root.userinfo.gropusmember.length>=1) root.id_researcher_group = root.listGrupoInvestigador[0].id;
			root.baseEnt = this.$clone(this.baseObj);	
			root.visibleguardar.visible=false;
			root.grid.refresh();
		}, 1000);
			
		
		
		
	},
	mounted() {
		console.log("root.tipos", this.tipos);
		root.id_panel_documentos = this.namePanel + "documentos";
		root.id_panel_participantes = this.namePanel + "participantes";
		root.panelData = $("#" + this.namePanel + " .data");
		root.panelGrid = $("#" + this.namePanel + " .grid");
		root.panelCmds = $("#" + this.namePanel + " .cmds");
		root.panelCmdBack = $("#" + this.namePanel + " .cmds-back");
		root.panelDocs = $("#" + this.namePanel + "-documentos");
		root.loaderMessage = "Cargando Elementos";
		root.loaderElement = "#" + this.namePanel + " .grid";
	},
	computed: {
		dataSource: function () {
			
			let data = root.codEP;
			(data = data != null ? "product_type_id=" + data : null), console.warn("codEP: ", root.codEP);
			console.warn("valor de data: ", root.codEP);
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				//stringParam: data,
				// endPoint: `research_units/${root.group.id}/${root.endPointRute}`,
                endPoint: `researchers/${root.id_researcher_group}/mobility_calls`,
				onLoading: function (loadOptions) {
					root.loaderShow("Cargando elementos", root.loaderElement);
				},
				onLoaded: function (results, baseEntity) {
					// console.clear();
					console.log("results", results);
					root.totaCount = results.totalCount;
					root.loaderHide();
				},
			});
		},


	},
	watch: {},
	methods: {

		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active", getSinData: "getSinData", getAll: "getAll" }),
		
		verObservar(data) {
			let objeto = {};
			let numero = 0;
			root.getSinData({
				// url: "/research_units/117/group_member/10286",
				url: "users/" + data.researcher_id,
				cb: function (results) {
					objeto = results;
					console.warn("objeto [" + data.id + "]", objeto.identification_number);
					return results.identification_number;
				},
			});
			// return numero;
			//return 1;
		},

		requisitoArchivo() {
			let tipos = root.tiposDocumento;
			let i = 0,
				print = "";
			if (Array.isArray(tipos) && tipos.length != 0) {
				print = "<h3><i class='icon-info mr-1 color-main-600'></i><b><i>Lista de documentos para aplicar:</i></b></h3> ";
				print = print + "<ul>";
				for (i = 0; i < tipos.length; i++) {
					let text = tipos[i].st_description == null ? "" : "<br>" + tipos[i].st_description;
					let importante = tipos[i].cd_required? '<em>(Requerido).</em>': ''
					if (tipos[i].active) print = print + "<li>" + "<b>" + tipos[i].st_name + " "+ importante +" </b>" + text + "</li>";
				}
				print = print + "</ul>";
			}else{
				print = "No se encuentra lista legible";
			}
			return print;
		},

		listDoc2subtipos(parametro) {
			if (parametro.length >= 1) {
				parametro.map(function (lista) {
					let require = lista.cd_required? "(Requerido)": "";
					lista.id_ant = lista.id
					lista.st_name = lista.document_name + " "+ require +"";
					lista.id = lista.document_id;
					return lista;
				});
				root.tiposDocumento = parametro;
			}

		},

		participantes(data) {
			root.section = "participantes";
			console.log("participantes", data.row.data);
			root.baseObj = data.row.data;
			// 202104111513: Error
			if (data.row.data.volume !== null) data.row.data.volume = parseInt(data.row.data.volume);
			let rd = data.row.data;
			if (rd.volume !== null) rd["volume"] = parseInt(rd.volume);
			console.log("rd", rd);
			root.baseObj = rd;
			root.panelCmds.fadeOut();
			$("#" + root.namePanel + " .item-title").html(
				`<span class="font-weight-semibold"> &raquo; Participantes</span> &raquo; ${data.row.data[root.titlecolum]}`
			);
			root.panelParticipantes = $("#" + root.id_panel_participantes);
			console.log("root.panelParticipantes", root.id_panel_participantes.length);
			$("#" + root.namePanel + "-documentos").hide();
			root.panelGrid.fadeOut(function (params) {
				root.panelCmdBack.fadeIn();
				$("#" + root.namePanel + "-participantes .grid").fadeIn();
				root.panelParticipantes.fadeIn(function (params) { });
			});
		},

		documentos(data) {
			// console.clear();
			console.log("documentos", data.row.data);
			root.loaderShow("Cargando lista Documentos", root.loaderElement);
			// 202104111513: Error
			
			

			root.tiposDocumento = [];
			root.loaderShow("Listado Documentos", root.panelData)
			console.warn("id list docs", data.row.data.id)
			
			root.getAll({
				// url: "/research_units/117/group_member/10286",
				url: "/calls/" + parseInt(data.data.call_id) + "/call_documents",
				cb: function (results) {
					let listDocuments = results;
					console.warn("movilidad docs list ", listDocuments);
					root.listDoc2subtipos(listDocuments);

					
					root.loaderHide();
				},
			});

				root.visibleguardar.visible=true;
				//1062=corregir  1065=sin enviar  cargadocs=true o false para cargar ducumentos
				if(data.data.state_id==1065 || data.data.state_id.state_id==1061){
					this.visibleguardar.visible=true;
				}

				root.section = "documentos";
				if (data.row.data.volume !== null) data.row.data.volume = parseInt(data.row.data.volume);
				let rd = data.row.data;
				if (rd.volume !== null) rd["volume"] = parseInt(rd.volume);
				console.log("rd", rd);
				root.baseObj = rd;

				$("#" + root.namePanel + " .item-title").html(`<span class="font-weight-semibold"> &raquo; Documentos</span> &raquo;  ${data.row.data.call_name}`);
				root.panelCmds.fadeOut();
				root.panelGrid.fadeOut(function (params) {
					root.panelCmdBack.fadeIn();
					$("#" + root.id_panel_documentos).fadeIn(function (params) { });
				});

		},

		retorno() {
			console.log(root.section);
			root.panelCmdBack.fadeOut();
			if (root.section == "participantes") {
				root.panelParticipantes.fadeOut(function (params) {
					root.panelCmds.fadeIn();
					root.panelGrid.fadeIn(function (params) { });
				});
			} else {
				console.log("Regresar!");
				console.log("root.panelDocs", root.panelDocs);
				$("#" + root.id_panel_documentos).fadeOut(function (params) {
					root.panelCmds.fadeIn();
					root.panelGrid.fadeIn(function (params) { });
				});
			}
			$("#" + root.namePanel + " .item-title").html("");
			root.baseObj = this.$clone(root.baseEnt);
			root.section = null;
		},

		save() {

			console.log(this.$sep);
			var result = root.$refs.basicGroup.instance.validate();
			console.log("result", result);
			if (result.isValid) {
				console.log("VALID!");
				root.scrollTop();
				root.panelCmds.fadeOut();
				// root.loaderElement = ;
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " Elemento";
				root.loaderShow(msg, root.panelData);
				if (root.mode == "add") root.baseObj.created_by = root.user_id;
				if (root.mode == "edit") root.baseObj.updated_by = root.user_id;

				root.baseObj.product_type_id = root.codEP;
				root.baseObj.research_group_id = root.group.id;
				let obj = root.baseObj;
				//let json1 = `{ "${mydata}": `+JSON.stringify(obj)+" } ";
				let dto = {
					newFormat: true,
					unidadId: root.group.id,
					stringEP: root.endPointRute,
					mod: obj.id,
					//objectSend: { regulation : obj },
					objectSend: JSON.parse(`{ "${root.objEpdata}": ` + JSON.stringify(obj) + "}"),
					cb: function (item) {
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

			
			root.tiposDocumento=[];
			
			root.getAll({
				// url: "/research_units/117/group_member/10286",
				url: "/calls/" + parseInt(data.call_id) + "/call_documents",
				cb: function (results) {
					let listDocuments = results;
					console.warn("movilidad docs list ", listDocuments);
					root.listDoc2subtipos(listDocuments);
					root.loaderHide();
				},
			});

			root.mode = "edit";
			console.log("data", data);
			root.baseObj = data;
			//root.panelCmdBack.fadeOut();
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function (params) {
				root.panelData.fadeIn(function (params) { });
			});
		},

		add() {
			console.log("ADD");
			root.mode = "add";
			root.baseObj = this.$clone(this.baseEnt);
			//root.panelCmdBack.fadeOut();
			root.panelCmds.fadeOut();
			console.warn("clase padre: ", this.padre);
			console.warn("name panel: ", root.namePanel);
			root.panelGrid.fadeOut(function (params) {
				root.panelData.fadeIn(function (params) { });
			});
		},

		cancel() {
			console.log("CANCEL!");
			root.panelData.fadeOut(function (params) {
				root.panelCmds.fadeIn();
				root.panelGrid.fadeIn(function (params) { });
			});
		},


		docRequire(id_convocatoria, id_movilidad){
			root.tiposDocumento=[];
			// root.loaderShow("Cargando requeridos", "#panel-produccion .card-body");
			root.getAll({
				url: "/calls/" +id_convocatoria+ "/call_documents",
				cb: function (results) {
					root.tiposDocumento= results;
					// root.listDoc2subtipos(dataDocs);
					// root.loaderShow("Cargando documentos", "#panel-produccion .card-body");
					root.getAll({
						url: "mobility_calls/" + id_movilidad + "/documents",
						cb: function (results1) {
							root.listDocumnetUp=results1;
							// root.loaderHide();
						},
					});
					// root.loaderHide();
				},
			});
			
		},

		sendEnd(data){
			console.warn("documentos subidos: ", root.listDocumnetUp);
			console.warn("documentos requeridos: ", root.tiposDocumento);
			let msg = `¿Realmente desea aplicar a: <span class='text-sb'>"${data.data[root.titlecolum]}?" <br>Requerde que una vez enviada para evaluación, no puede hacer modificaciones.</span>`;
			
			this.$confirm(msg, function (si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`Postulación por evaluar!`, root.panelGrid);
					let dataPatch = JSON.stringify({ active: true, updated_by: root.user_id, state_id:1061, total:0 });

					var dto = {
						newFormat: true,
						url: `${root.endPointRute}/${data.data.id}`,
						data: JSON.parse(`{ "${root.objEpdata}" :` + dataPatch + "}"),
						cb: function (result) {
							console.log("Result", result);
							root.grid.refresh();
							root.loaderHide();
						},
					};
					console.warn("dto", dto);
					root.elementoActive(dto);
					root.loaderHide();
				}
			});
			
		},
		
		enviar(data, state) {
			// console.clear();
			// console.log("active", data);
			// console.log("state", state);
			
			root.docRequire(data.data.call_id, data.data.id);
			root.loaderShow("Cargando requeridos", root.loaderElement);
			
			let enviar = setTimeout(function(){
				
				console.clear();
				// root.sendEnd();
				
				let docRequire = root.tiposDocumento.filter(requerido => requerido.cd_required==true);
				console.warn("docrequire = ",docRequire);
				
				let rectificador=false, noSubidos=[];

				docRequire.forEach(evaluar=>{
					root.listDocumnetUp.forEach(subidos => {
						console.warn(evaluar.document_id+" == "+subidos.document_type_id);
						if(evaluar.document_id==subidos.document_type_id){
							rectificador=true;
							console.warn("Son iguales!!!!");
						}
					});

					if(rectificador==false){
						noSubidos.push(evaluar.document_name)
					}else{
						rectificador=false;
					}
				});
				console.warn("cantidad archivos no subidos: ", noSubidos.length)
				if(noSubidos.length===0){
					root.sendEnd(data);
				}else{
					root.$info("No se puede enviar la aplicación a esta convocatoria. <br> Faltan los siguientes documentos: "+noSubidos.join(', '));
				}
					
				root.loaderHide();
			}
			,1000);
			enviar();
		},

		gridInit(e) {
			this.grid = e.component;
		},

		onContentReady() { },
	},
};
</script>
<style scoped>
.color{
	color:rgb(10, 119, 28);
}
</style>