\* data.title=titulo para activar o desactiva {{ titleBtn }} = Titulo botones {{ title }} = Titulo principal {{ titleBtn }} =titulo abreviado
namePanel=nombredepaneles root.endPointRute = regulation enlace regulation=endpoindt especifico endpoinds tutas generales update *\
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
						</div>
						<div class="header-elements">
							<!-- <span class="cmds">
								<button
									type="button"
									@click.prevent="add()"
									v-if="editMode"
									title="Agregar Nuevo Elemento .."
									class="btn btn-main btn-labeled btn-labeled-left "
								>
									<b><i class="icon-database-add"></i></b> {{ titleBtn }}
								</button>
							</span> -->
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

								<div class="col-md-5">
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



								<div class="col-md-5">
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
												<b><i class="icon-database-remove"></i></b> CANCELAR
											</span>
										</template>
									</DxButton>
								</div>
								<div class="col text-right">
									<DxButton @click="save" class="nb">
										<!-- v-if="editMode">-->
										<template #default>
											<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
												{{ mode == "edit" ? "Actualizar" : "Aplicar y Terminar" }} <b><i
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
						:allow-column-reordering="true" :data-source="dataSource" :remote-operations="true"
						:hover-state-enabled="true" :row-alternation-enabled="true" :word-wrap-enabled="true"
						:show-borders="false">
						<!-- type="custom" :custom-load="loadState" :custom-save="saveState" -->
						<DxColumnChooser :enabled="true" mode="dragAndDrop" />

						<!-- <DxFilterPanel :visible="false" /> -->
						<DxFilterRow :visible="true" />

						<DxGrouping :auto-expand-all="true" />
						<DxGroupPanel :visible="true" :allow-column-dragging="true" />
						<DxLoadPanel :enabled="false" />
						<DxPaging :page-size="dgPageSize" />
						<DxSorting :mode="true ? 'multiple' : 'single'" /><!-- single, multiple, none" -->
						<DxStateStoring :enabled="false" type="sessionStorage" />
						<DxSummary>
							<DxGroupItem summary-type="count" column="group_type_name"
								display-format="{0} convocatorias" />
						</DxSummary>
						<DxPager :show-info="true" :show-page-size-selector="true" :show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="{2} convocatorias de investigación (Página {0} de {1})" />
						<DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
						<DxColumn :allow-filtering="false" :sort-index="1" sort-order="desc" data-field="id"
							caption="ID" data-type="number" alignment="center" :allow-sorting="true" :width="70" />

						<DxColumn :allow-filtering="true" data-field="call_state_id" caption="Estado" data-type="number"
							alignment="left" :visible="true" :width="110">
							<DxLookup :data-source="estados" value-expr="id" display-expr="st_name" />
						</DxColumn>
						<!-- <DxColumn
                            :allow-filtering="false"
                            :visible="true"
                            data-field="call_code"
                            caption="Código"
                            data-type="string"
                            alignment="left"
                            :width="120"
                            cell-template="tplNull"
                          /> -->
						<DxColumn :allow-filtering="true" data-field="call_beneficiary_id" caption="Beneficiarios"
							data-type="number" alignment="center" :visible="true" :width="100">
							<DxLookup :data-source="beneficiarios" value-expr="id" display-expr="st_name" />
						</DxColumn>
						<!-- <DxColumn :allow-filtering="true" data-field="call_type_id" caption="Tipo" data-type="number"
							alignment="left" :visible="true" :width="180">
							<DxLookup :data-source="tipos" value-expr="id" display-expr="st_name" />
						</DxColumn> -->
						<DxColumn :allow-filtering="true" data-field="call_name" caption="Nombre" data-type="string"
							alignment="left" :visible="true" />

						<DxColumn :allow-filtering="true" :visible="true" data-field="call_start_date"
							caption="Fecha apertura" alignment="center" data-type="date" format="dd/MM/yyyy"
							:width="130" />
						<DxColumn :allow-filtering="true" :visible="true" data-field="call_end_date"
							caption="Fecha cierre" alignment="center" data-type="date" format="dd/MM/yyyy"
							:width="130" />
						<DxColumn :allow-filtering="true" :visible="true" data-field="call_duration" caption="Duración"
							alignment="center" data-type="number" format="#0 meses" :width="130" />
						<DxColumn :allow-filtering="true" data-field="call_global_budget" caption="Monto"
							data-type="number" alignment="center" :allow-grouping="false" format="$ #,##0."
							:allow-search="true" :allow-sorting="true" :visible="true" :width="100" />

						<!-- <DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="70" /> -->
						<DxColumn :width="90" alignment="center" cell-template="tpl" caption="Acciones" :fixed="true"
							fixed-position="right" />


						<template #tplWeb="{ data }">
							<a v-if="data.data.web_page != '' && data.data.web_page != null" :title="data.data.web_page"
								class="cmd-item color-main-600 mr-2" :href="data.data.url" Target="_blank">
								<i class="icon-link"></i> Visitar
							</a>
							<a v-else title="No dispone de Url" class="cmd-item color-main-600 mr-2" href="#">-</a>
						</template>

						<template #tplObs="{ data }">
							<a v-if="data.data.observation != '' && data.data.observation != null"
								:title="data.data.observation" class="cmd-item color-main-600 mr-2"
								@click.prevent="verObservar(data.data)" href="#" Target="_blank">
								<i class="icon-info mr-1"></i> Ver
							</a>
							<a v-else title="No dispone" class="cmd-item color-main-600 mr-2" href="#">-</a>
						</template>

						<template #tpl="{ data }">
							<span class="cmds">

								<a title="Aplicar a movilidad... " class="cmd-item color-main-600"
									@click.prevent="edit(data.data)" href="#">
									<i class="icon-insert-template"></i>
								</a>

								<!-- <a
                                  title="Vista propuesta... "
                                  class="cmd-item color-main-600"
                                  @click.prevent="
                                    go(
                                      data.data.id,
                                      `/unidad/${$route.params.unidadId}/movilidad/${data.data.id}/plantilla`,
                                      'Cargando Presentación <br> Convocatoria'
                                    )
                                  "
                                  href="#"
                                >
                                  <i class="icon-eye"></i>
                                </a> -->

								<a :title="data.data.name" class="cmd-item color-main-600 mr-2"
									@click.prevent="verObservar(data.data)" href="#" Target="_blank">
									<i class="icon-eye"></i>
								</a>


							</span>
						</template>
					</DxDataGrid>
				</div>
			</div>
		</div>

		<div class="card-body" v-if="debug">
			<!-- <pre> -->
				<strong class="font-weight-semibold">baseObj:</strong>
				{{ JSON.stringify(baseObj, null, 4) }}
			<!-- </pre> -->
		</div>



		<DxPopup :visible="popupObs" ref="popupConv" :drag-enabled="false" :close-on-outside-click="false"
			:show-close-button="false" :show-title="true" width="75%" height="70%" title="Datos de la Convocatoria:">
			<DxScrollView id="scrollview" ref="scrollViewWidget" :scroll-by-content="true" :scroll-by-thumb="true"
				show-scrollbar="onScroll" :bounce-enabled="true">
				<div class="col-12">
					<Verplanilla :id_convocatoria="id_data_cov" :key="id_data_cov" v-if="id_data_cov != 0" />
				</div>
			</DxScrollView>
			<DxToolbarItem widget="dxButton" toolbar="bottom" location="after" :options="closeButtonOptions" />
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
	DxStateStoring,
	DxLookup,
} from "devextreme-vue/data-grid";
import { DxRequiredRule, DxValidator, DxPatternRule } from "devextreme-vue/validator";
import { DxDateBox, DxSelectBox, DxButton, DxTextBox, DxNumberBox, DxValidationGroup, DxSwitch } from "devextreme-vue";
import { DxPopup, DxToolbarItem } from 'devextreme-vue/popup';
import { mapState, mapActions, mapGetters } from "vuex";
import { DxScrollView } from 'devextreme-vue/scroll-view';

//import { DxStateStoring } from 'node_modules/devextreme-vue/pivot-grid';

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	components: {
		// Commands,
		// DxItem,
		// DxAccordion,
		DxSwitch,
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

		DxTextBox,
		DxValidator,
		DxValidationGroup,
		DxStateStoring,
		DxLookup,
		DxScrollView,
		DxToolbarItem,
		Geo: () => import("@/components/element/geo"),
		Verplanilla: () => import("@/modules/unidad/movilidad/plantilla.vue"),

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
		namePanel: "redconocimiento",
		codEP: null, //611 612 613
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

		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		id_data_cov: 0,
		popupObs: false,
		formulario: true,
		baseObj: {
			geo_city_id: null,
			geo_country_id: null,
			geo_state_id: null,
			event_name: null,
			event_edition_number: null,
			event_date: null,
			paper_name: null,
			is_organizer: null,
			event_page: null,
			research_group_id: null,
			researcher_id: null,
			active: true,
		},

		closeButtonOptions: {
			text: 'Salir',
			onClick: () => {
				root.popupObs = false;
			},
		},
	}),
	created() {
		// console.clear();
		root = this;

		root.baseEnt = this.$clone(this.baseObj);
		// http://pruebasapi2.intranetoas.udistrital.edu.co:8515/api/v1/calls/2/call_documents


		// //root.getConvocatorias();
		// // root.tipox = root.subtypesByType("regulacion_reglamento_tipo");
		// root.subtipos = root.subtypesByType("taller_creacion_categoria");

		//root.tiposDocumento = root.subtypesByType("tipos_documentos_movilidad");
		//root.participationid = root.subtypesByType("evento_participacion");
	},
	mounted() {
		console.log("root.tipos", this.tipos);
		root.panelData = $("#" + this.namePanel + " .data");
		root.panelGrid = $("#" + this.namePanel + " .grid");
		root.panelCmds = $("#" + this.namePanel + " .cmds");
		root.panelCmdBack = $("#" + this.namePanel + " .cmds-back");
		root.loaderMessage = "Cargando Elementos";
		root.loaderElement = "#" + this.namePanel + " .grid";
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapState("unidad/colciencias", { convocatorias: "items" }),

		closeOnOutsideClick(e) {
			console.warn("data: ", e)
			root.popupObs = !root.popupObs ? true : false;
			return true;
		},

		tipos() {
			return root.subtypesByType("convocatoria_tipo", "id");
		},
		beneficiarios() {
			return root.subtypesByType("convocatoria_beneficiario", "id");
		},
		estados() {
			return root.subtypesByType("convocatoria_estado", "id");
		},

		dataSource: function () {
			//if (typeof this.group.id === "undefined") return null;
			console.log("root.group", this.group);

			return DxStore({
				// key: ["id"],
				// // ids: ["dw_type_id=1"],
				stringParam: 'filter=[["call_state_id","=",654],"and",["call_type_id","=",1059]]',
				// endPoint: `calls?filter=[%22call_state_id%22,%22=%22,654]`,
				key: ["id"],
				endPoint: 'calls',

				onLoading: function (loadOptions) {
					root.loaderShow("Cargando elementos", "#panel-produccion .card-body");
				},
				onLoaded: function (results, baseEntity) {
					// // console.clear();
					console.log("results", results);
					root.totaCount = results.totalCount;
					root.loaderHide();
				},
			});
		},
	},
	watch: {},
	methods: {
		// ...mapActions("unidad/colciencias", { getConvocatorias: "getAll" }),
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active", getAll: "getAll", get: "get" }),

		requisitoArchivo() {
			let tipos = root.tiposDocumento;
			let i = 0,
				print = "";
			if (Array.isArray(tipos) && tipos.length != 0 && root.editMode) {
				print = "<h3><i class='icon-info mr-1 color-main-600'></i><b><i>Documentos Requeridos <b>(Debe cargarlos en la pestaña 'Documentos')</b>:</i></b></h3> ";
				print = print + "<ul>";
				for (i = 0; i < tipos.length; i++) {
					let text = tipos[i].st_description == null ? "" : "<br>" + tipos[i].st_description;
					if (tipos[i].active) print = print + "<li>" + "<b>" + tipos[i].st_name + "</b>" + text + "</li>";
				}
				print = print + "</ul>";
			}
			return print;
		},

		sistemaDate(e_date, operador) {
			let resultado = null
			let fecha = new Date(e_date);
			let hoy = new Date();
			if (operador == "mayor") { resultado = fecha.valueOf() > hoy.valueOf(); }
			else if (operador == "menor") { resultado = fecha.valueOf() < hoy.valueOf(); }
			else {
				resultado = null
				console.error("error en en la funcion sistemaDate(fecha, operador) debe colorcar de operador mayor o menor");
			}
			return resultado;
		},

		verObservar(data) {
			this.popupObs = true
			console.warn("popupConv", this.popupObs)
			this.id_data_cov = data.id;

		},


		listDoc2subtipos(parametro) {
			if (parametro.length >= 1) {
				parametro.map(function (lista) {
					lista.id_ant = lista.id
					lista.st_name = lista.document_name;
					lista.id = lista.document_id;
					return lista;
				});
				root.tiposDocumento = parametro;
			}

		},

		retorno() {
			console.log(root.section);
			root.panelCmdBack.fadeOut();

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
				let dto = {
					newFormat: true,
					rute2: "calls/" + obj.IDcall + "/mobility_calls",

					stringEP: "mobility_calls",

					mod: obj.id,
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

		async edit(data) {
			// root.mode = "edit";

			root.getAll({
				// url: "/research_units/117/group_member/10286",
				url: "/calls/" + parseInt(data.id) + "/call_documents",
				cb: function (results) {
					let listDocuments = results;
					console.warn("movilidad docs list ", listDocuments);
					root.listDoc2subtipos(listDocuments);
					root.loaderHide();
				},
			});

			root.mode = "add";
			let fecha_final = root.sistemaDate(data.call_end_date, "mayor");
			let fecha_inicial = root.sistemaDate(data.call_start_date, "menor");

			let resultado = fecha_final === fecha_inicial
			root.baseObj.research_group_id = root.group.id;
			root.baseObj.researcher_id = root.userinfo.datagroupmenber.id;
			root.baseObj.IDcall = data.id;

			if (resultado) {
				console.clear();
				console.warn('research_units/' + root.group.id + '/mobility_calls?filter=[["call_id","=",' + data.id + '],"and",["researcher_id","=",' + root.userinfo.datagroupmenber.id + ']]')
				await root.get({
					url: 'research_units/' + root.group.id + '/mobility_calls?filter=[["call_id","=",' + data.id + '],"and",["researcher_id","=",' + root.userinfo.datagroupmenber.id + ']]',
					cb: function (results) {
						let res = results;
						console.warn("data edit: ", res.data)
						if (res.data[0] !== undefined) {
							root.$info("Advertencia usted tiene [" + res.data.length + "] aplicaiones anteriores a esta convocatoria.")
							//root.baseObj=res.data[0];
							//root.mode = "add"
						}
					},
				});

				root.panelCmds.fadeOut();
				root.panelGrid.fadeOut(function (params) {
					root.panelData.fadeIn(function (params) { });
				});
			} else {
				root.$error("Por favor verifique las fechas de inicio y cierre, para aplicar a esta convocatoria.");
			}

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
			root.baseObj = root.baseEnt;
			console.log("CANCEL!");
			root.panelData.fadeOut(function (params) {
				root.panelCmds.fadeIn();
				root.panelGrid.fadeIn(function (params) { });
			});
		},

		gridInit(e) {
			this.grid = e.component;
		},

		onContentReady() { },
	},
};
</script>
