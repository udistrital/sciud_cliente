\* data.data.journal_name=titulo para activar o desactivar Evento Científico= Titulo botones Evento Científico=Titulo principal Registro=titulo abreviado
panelartisticoCultural=nombredepaneles event=endpoindt especifico events rutas generales *\
<template>
	<div class="col mt-3 pl-1 pr-1" id="panelartisticoCultural">
		<div class="row">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline mb-2">
						<div class="page-title p-0 m-0">
							<h1>
								<i class="icon-grid3 mr-1 color-main-600"></i>
								<span class="font-weight-semibold">Evento Científico</span>
								<span class="item-title">&nbsp;</span>
							</h1>
						</div>
						<div class="header-elements">
							<span class="cmds">
								<button type="button" @click.prevent="add()" v-if="editMode"  title="Nuevo Evento Científico.." class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-database-add"></i></b> Nuevo Evento Científico
								</button>
							</span>
							<span class="cmds-back slide">
								<button type="button" @click.prevent="retorno()" title="Volver al Evento Científico.." class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-arrow-left"></i></b> Volver A Evento Científico
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Documentos id="panelartisticoCultural-documentos" end-point="events" :main-obj="baseObj" :parent="this" :tipos="tiposDocumento" />
		<Participantes id="panelartisticoCultural-participantes" end-point="events" :product="baseObj" :group="group" ref="participantes" :parent="this" />
		<DxValidationGroup ref="basicGroup">
			<div class="row data slide">
				<div class="col">
					<div class="card">
						<div class="card-header main">
							<i class="icon-pencil3 mr-1"></i>
							<span class="font-weight-semibold">{{ mode == "edit" ? "Editar" : "Crear" }} Evento Científico</span>
						</div>
						<div class="card-body mb-0 pb-0 pt-2">
							<div class="row">
								<!-- formulatio -->

								<div class="col-md-4">
									<div class="form-group">
										<label>Nombre evento: </label>
										<DxTextBox placeholder="Nombre evento" class="form-control" :value.sync="baseObj.eve_name">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>Fecha de inicio: </label>
										<DxDateBox
											class="form-control"
											name="eve_start_date"
											:value.sync="baseObj.eve_start_date"
											id="eve_start_date"
											placeholder="DD/MM/YYYY"
											display-format="dd/MM/yyyy"
											:min="min"
											:max="now"
											type="date"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxDateBox>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>Fecha de finalización: </label>
										<DxDateBox
											class="form-control"
											name="eve_finish_date"
											:value.sync="baseObj.eve_finish_date"
											id="eve_finish_date"
											placeholder="DD/MM/YYYY"
											display-format="dd/MM/yyyy"
											:min="min"
											:max="now"
											type="date"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxDateBox>
									</div>
								</div>
								<div class="col-md-4">
									<div class="form-group">
										<label>Organizadores</label>
										<DxTextBox placeholder="Instituciones o entidades gestionadoras o patrocinadoras" class="form-control" :value.sync="baseObj.eve_organizers">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>Entidades Gestoras o Patrocinadoras: </label>
										<DxTextBox placeholder="Entidades Evento" class="form-control" :value.sync="baseObj.eve_entities">
											<DxValidator> </DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-3">
									<div class="form-group">
										<label>Convocatoria Minciencias:</label>
										<DxSelectBox
											:show-clear-button="true"
											:grouped="false"
											:search-enabled="false"
											placeholder="Seleccione..."
											:value.sync="baseObj.colciencias_call_id"
											class="form-control"
											:data-source="convocatorias"
											display-expr="name"
											value-expr="id"
											item-template="item"
										>
											<template #item="{ data }">
												<div>{{ data.name }} de {{ data.year }}</div>
											</template>
										</DxSelectBox>
									</div>
								</div>

								<div class="col-md-3">
									<div class="form-group">
										<label>Categoría: </label>
										<DxSelectBox
											:show-clear-button="true"
											:grouped="false"
											:search-enabled="false"
											placeholder="Seleccione..."
											:value.sync="baseObj.category_id"
											class="form-control"
											:data-source="subtipos"
											display-expr="st_name"
											value-expr="id"
										>
										</DxSelectBox>
									</div>
								</div>

								<div class="col-md-3">
									<div class="form-group">
										<label>Tipo Participación: </label>
										<DxSelectBox
											:show-clear-button="true"
											:grouped="false"
											:search-enabled="false"
											placeholder="Seleccione..."
											:value.sync="baseObj.participation_id"
											class="form-control"
											:data-source="tipoparti"
											display-expr="st_name"
											value-expr="id"
										>
										</DxSelectBox>
									</div>
								</div>

								<div class="col-md-6">
									<div class="form-group">
										<label>Lugar Obtención: </label>
										<Geo :lockElement="loaderElement" :syncObject="baseObj" />
									</div>
								</div>

								<div class="col-md-12">
									<div class="form-group">
										<label>Observaciones: </label>
										<DxTextArea :height="100" :max-length="400" :value.sync="baseObj.eve_observation" placeholder="Observaciones" class="form-control">
											<DxValidator> </DxValidator>
										</DxTextArea>
									</div>
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
									<DxButton @click="save" class="nb" v-if="editMode">
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
		</DxValidationGroup>
		<div class="row grid">
			<div class="col">
				<div class="p-0">
					<DxDataGrid
						class="main"
						width="100%"
						@initialized="gridInit"
						@content-ready="onContentReady"
						:allow-column-reordering="true"
						no-data-text="No hay elementos registrados"
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
							<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
						</DxSummary>
						<DxPager
							:show-info="true"
							:show-page-size-selector="true"
							:show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="Página {0} de {1} ({2} elementos)"
						/>
						<DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
						<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

						<DxColumn data-field="id" caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn data-field="eve_name" caption="Nombre evento" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn data-field="eve_start_date" caption="fecha de inicio" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn
							data-field="eve_finish_date"
							caption="Fecha de finalización"
							data-type="text"
							alignment="center"
							:visible="false"
							:allow-grouping="false"
						/>
						<DxColumn
							data-field="colciencias_call_name"
							caption="Categoría Minciencias"
							data-type="text"
							alignment="center"
							:visible="false"
							:allow-grouping="false"
						/>

						<DxColumn data-field="geo_city_name" caption="Ciudad" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="geo_country_name" caption="Pais" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn data-field="geo_state_name" caption="Estado" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />

						<DxColumn data-field="category_name" caption="Categoría" data-type="text" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn
							data-field="eve_organizers"
							caption="Instituciones o entidades gestionadoras o patrocinadoras"
							data-type="text"
							alignment="center"
							:visible="true"
							:allow-grouping="false"
						/>
						<DxColumn data-field="eve_entities" caption="Entidades Evento" data-type="text" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn
							data-field="eve_type_name"
							caption="Evento científicos con componentes de apropiación"
							data-type="text"
							alignment="center"
							:visible="false"
							:allow-grouping="false"
						/>
						<DxColumn data-field="eve_observation:" caption="Observaciones" data-type="text" alignment="center" :visible="false" :allow-grouping="false" />

						<DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="70" />
						<DxColumn :width="110" alignment="center" cell-template="tpl" caption="" />
						<template #tpl="{ data }">
							<span class="cmds">
								<a title="Observar documentos..." class="cmd-item color-main-600 mr-2" @click.prevent="documentos(data)" href="#">
									<i class="icon-file-pdf"></i>
								</a>
								<a title="Observar participantes..." class="cmd-item color-main-600 mr-2" @click.prevent="participantes(data)" href="#">
									<i class="icon-users"></i>
								</a>
								<a title="Editar elemento..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
									<i class="icon-database-edit"></i>
								</a>
								<a v-if="data.data.active" title="Desactivar Registro..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
									<i class="icon-database-remove"></i>
								</a>
								<a v-else title="Activar Registro..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
									<i class="icon-database-check"></i>
								</a>
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
		</div>
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
import { DxDateBox, DxSelectBox, DxButton, DxTagBox, DxTextBox, DxNumberBox, DxTextArea, DxValidationGroup } from "devextreme-vue";
import { mapState, mapActions, mapGetters } from "vuex";

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "Registro",
	components: {
		// Commands,
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
		Geo: () => import("@/components/element/geo"),
		Documentos: () => import("@/components/element/documentos"),
		Participantes: () => import("@/components/element/participantes"),
	},
	props: {
		
		group: {
			type: Object,
			default: () => null,
		},
	},
	data: () => ({
		editData: null, //sirve para dejar formulario en limpio o llenar datos
		items: [],
		totaCount: 0,
		grid: null,
		mode: null,
		unidad: null,
		section: null,
		tipos: 162,
		totalCount: 0,
		tiposDocumento: [],
		subtipos: [],
		isValid: false,
		tipoparti: [],
		panelData: null,
		panelGrid: null,
		panelParticipantes: null,
		panelDocs: null,
		panelCmds: null,
		baseEntity: null,
		docLink: null,
		firstLoad: true,
		now: new Date(),
		min: new Date(1950, 1, 1),
		baseEnt: null,
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		baseObj: {
			geo_city_id: null,
			geo_state_id: null,
			geo_country_id: null,
			id: null,
			category_id: null,
			colciencias_call_id: null,
			eve_name: null,
			eve_start_date: null,
			eve_finish_date: null,
			eve_organizers: null,
			eve_entities: null,
			eve_type_id: null,
			eve_observation: null,
			participation_id: null,
			created_by: null,
		},
	}),
	created() {
		// console.clear();
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
		root.getConvocatorias();
		root.tipoparti = root.subtypesByType("evento_participacion");
		root.subtipos = root.subtypesByType("evento_cientifico_categoria");
		root.tiposDocumento = root.subtypesByType("evento_cientifico_documento");
	},
	mounted() {
		// root.getConvocatorias();
		// root.tipos = root.subtypesByType(5);
		// root.subtipos = root.subtypesByType(51);
		console.log("root.tipos", root.tipos);
		root.panelData = $("#panelartisticoCultural .data");
		root.panelGrid = $("#panelartisticoCultural .grid");
		root.panelCmds = $("#panelartisticoCultural .cmds");
		root.panelCmdBack = $("#panelartisticoCultural .cmds-back");
		root.panelDocs = $("#panelartisticoCultural-documentos");
		root.loaderMessage = "Cargando elementos";
		root.loaderElement = "#panelartisticoCultural .grid";
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapState("unidad/colciencias", { convocatorias: "items" }),
		dataSource: function() {
			if (typeof this.group.id === "undefined") return null;
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				stringParam: "eve_type_id=" + root.tipos,
				endPoint: `research_units/${root.group.id}/events`,
				onLoading: function(loadOptions) {
					root.loaderShow("Cargando elementos", "#panel-produccion .card-body");
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
	watch: {},
	methods: {
		...mapActions("unidad/colciencias", { getConvocatorias: "getAll" }),
		//...mapActions("unidad/producto/conocimiento/articulo", { objSave: "save", objUpdate: "update", elementoActive: "active" }),
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active" }),

		participantes(data) {
			// console.clear();
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
			$("#panelartisticoCultural .item-title").html(`<span class="font-weight-semibold"> &raquo; Participantes</span> &raquo; ${data.row.data.eve_name}`);
			root.panelParticipantes = $("#panelartisticoCultural-participantes");
			console.log("root.panelParticipantes", root.panelParticipantes.length);
			$("#panelartisticoCultural-documentos").hide();
			root.panelGrid.fadeOut(function(params) {
				root.panelCmdBack.fadeIn();
				$("#panelartisticoCultural-participantes .grid").fadeIn();
				root.panelParticipantes.fadeIn(function(params) {});
			});
		},

		documentos(data) {
			// console.clear();
			console.log("documentos", data.row.data);
			root.section = "documentos";
			// 202104111513: Error
			if (data.row.data.volume !== null) data.row.data.volume = parseInt(data.row.data.volume);
			let rd = data.row.data;
			if (rd.volume !== null) rd["volume"] = parseInt(rd.volume);
			console.log("rd", rd);
			root.baseObj = rd;
			$("#panelartisticoCultural .item-title").html(`<span class="font-weight-semibold"> &raquo; Documentos</span> &raquo; ${data.row.data.eve_name}`);
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelCmdBack.fadeIn();
				$("#panelartisticoCultural-documentos").fadeIn(function(params) {});
			});
		},

		retorno() {
			console.log(root.section);
			root.panelCmdBack.fadeOut();
			if (root.section == "participantes") {
				root.panelParticipantes.fadeOut(function(params) {
					root.panelCmds.fadeIn();
					root.panelGrid.fadeIn(function(params) {});
				});
			} else {
				console.log("Regresar!");
				console.log("root.panelDocs", root.panelDocs);
				$("#panelartisticoCultural-documentos").fadeOut(function(params) {
					root.panelCmds.fadeIn();
					root.panelGrid.fadeIn(function(params) {});
				});
			}
			$("#panelartisticoCultural .item-title").html("");
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
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " elemento";
				root.loaderShow(msg, root.panelData);
				if (root.mode == "add") root.baseObj.created_by = root.user_id;
				if (root.mode == "edit") root.baseObj.updated_by = root.user_id;
				root.baseObj.eve_type_id = root.tipos;
				let obj = root.baseObj;
				let dto = {
					unidadId: root.group.id,
					stringEP: "events",
					mod: obj.id,
					objectSend: { event: obj },
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
			root.mode = "edit";
			console.log("data", data);
			root.baseObj = data;

			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelData.fadeIn(function(params) {});
			});
		},

		add() {
			console.log("ADD");
			root.mode = "add";
			root.baseObj = this.$clone(this.baseEnt);
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelData.fadeIn(function(params) {});
			});
		},

		cancel() {
			console.log("CANCEL!");
			root.panelData.fadeOut(function(params) {
				root.panelCmds.fadeIn();
				root.panelGrid.fadeIn(function(params) {});
			});
		},

		active(data, state) {
			// console.clear();
			console.log("active", data);
			console.log("state", state);
			let a = state ? "activar" : "desactivar";
			let am = state ? "Activando" : "Desactivando";
			let msg = `¿Realmente desea ${a} <span class='text-sb'>"${data.data.journal_name}"</span>?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am}`, root.panelGrid);
					var dto = {
						url: `research_units/${root.group.id}/events/${data.data.id}/active`,
						data: {
							event: {
								active: state,
								updated_by: 1,
							},
						},
						cb: function(result) {
							console.log("Result", result);
							root.grid.refresh();
							root.loaderHide();
							// root.cancel(validationGroup);
							// $("#data").fadeOut(function () {
							// $("#grid").fadeIn(function () {});
							// });
						},
					};
					console.log("dto", dto);
					root.elementoActive(dto);
					root.loaderHide();
				}
			});
		},

		gridInit(e) {
			this.grid = e.component;
		},

		onContentReady() {
			// $(".commands a").click(function() {
			// 	console.log("Come on lets show the dropdown!!");
			// });
			// var h = "<span class='mr-1 color-text d-none d-md-inline' id='column-chooser-text'>s</span> ";
			// if ($("#column-chooser-text").length <= 0) $(".dx-datagrid-column-chooser-button").before(h);
			// var b = "<span class='mr-1 color-text d-none d-md-inline' id='column-chooser-text'>s</span> ";
			// if ($("#column-chooser-text").length <= 0) $(".dx-datagrid-column-chooser-button").before(b);
		},
	},
};
</script>
