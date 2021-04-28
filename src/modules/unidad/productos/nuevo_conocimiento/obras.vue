\* data.row.data.title = titulo de participantes data.data.title = titulo para activar o desactivar resultados creación o investigación-creación = Titulo
botones resultados creación o investigación-creación = Titulo principal Obra = titulo abreviado panelObra = nombredepaneles research_creation_work = endpoindt
especifico research_creation_works = rutas generales *\
<template>
	<div class="col mt-3 pl-1 pr-1" id="panelObra">
		<div class="row">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline mb-2">
						<div class="page-title p-0 m-0">
							<h1>
								<i class="icon-grid3 mr-1 color-main-600"></i>
								<span class="font-weight-semibold">Resultados Creación o Investigación-Creación</span>
								<span class="item-title">&nbsp;</span>
							</h1>
						</div>
						<div class="header-elements">
							<span class="cmds">
								<button
									type="button"
									@click.prevent="add()"
									title="Nuevo resultados creación o investigación-creación.."
									class="btn btn-main btn-labeled btn-labeled-left "
								>
									<b><i class="icon-database-add"></i></b> Nueva Obra o Producto
								</button>
							</span>
							<span class="cmds-back slide">
								<button
									type="button"
									@click.prevent="retorno()"
									title="Volver al resultados creación o investigación-creación.."
									class="btn btn-main btn-labeled btn-labeled-left "
								>
									<b><i class="icon-arrow-left"></i></b> Volver A Obras
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Documentos id="panelObra-documentos" end-point="research_creation_works" :main-obj="baseObj" :parent="this" :tipos="tiposDocumento" />
		<Premios id="panelObra-premios" end-point="research_creation_works" :main-obj="baseObj" :parent="this" :tipos="tiposDocumento" />
		<Participantes id="panelObra-participantes" end-point="research_creation_works" :product="baseObj" :group="group" ref="participantes" :parent="this" />
		<DxValidationGroup ref="basicGroup">
			<div class="row data slide">
				<div class="col">
					<div class="card">
						<div class="card-header main">
							<i class="icon-pencil3 mr-1"></i>
							<span class="font-weight-semibold">{{ mode == "edit" ? "Editar" : "Crear" }} resultados creación o investigación-creación</span>
						</div>
						<div class="card-body mb-0 pb-0 pt-2">
							<div class="row">
								<!-- formulatio -->

								<div class="col-md-4">
									<div class="form-group">
										<label>Titulo Obra: </label>
										<DxTextBox placeholder="Titulo Obra" class="form-control" :value.sync="baseObj.title">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>Titulo Registrado: </label>
										<DxTextBox placeholder="Titulo Registrado" class="form-control" :value.sync="baseObj.registered_project_title">
											<DxValidator> </DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-2">
									<div class="form-group">
										<label>Fecha Creación: </label>
										<DxDateBox
											class="form-control"
											name="creation_and_selection_date"
											:value.sync="baseObj.creation_and_selection_date"
											id="creation_and_selection_date"
											placeholder="DD/MM/YYYY"
											display-format="dd/MM/yyyy"
											:min="min"
											:max="now"
											type="date"
										>
											<DxValidator> </DxValidator>
										</DxDateBox>
									</div>
								</div>

								<div class="col-md-2">
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
										<label>URL: </label>
										<DxTextBox placeholder="Web o Url" class="form-control" :value.sync="baseObj.url">
											<DxValidator>
												<DxPatternRule message="Recuerde que todas las paginas web deben comenzar por: HTTP:// o HTTPS://." :pattern="urlPattern" />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>

								<!-- <div class="col-md-3">
	<div class="form-group">
	<label>Naturaleza de la Obra: </label>
	<DxTextBox placeholder="Naturaleza de la Obra" class="form-control" :value.sync="baseObj.nature_id">
	<DxValidator>
	</DxValidator>
	</DxTextBox>
	</div>
</div> -->

								<div class="col-md-3">
									<div class="form-group">
										<label>Naturaleza de la Obra: </label>
										<DxSelectBox
											:show-clear-button="true"
											:grouped="false"
											:search-enabled="false"
											placeholder="Seleccione..."
											:value.sync="baseObj.nature_id"
											class="form-control"
											:data-source="naturalezaObra"
											display-expr="st_name"
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
										<label>Área del Conocimiento: </label>
										<DxSelectBox
											:show-clear-button="true"
											:grouped="false"
											:search-enabled="false"
											placeholder="Seleccione..."
											:value.sync="baseObj.knwl_spec_area_id"
											class="form-control"
											:data-source="list_knwl"
											display-expr="st_name"
											value-expr="id"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxSelectBox>
									</div>
								</div>

								<div class="col-md-12">
									<div class="form-group">
										<label>Tipos de Trabajos: </label>
										<DxTagBox
											:data-source="tipos"
											:search-enabled="true"
											:show-selection-controls="true"
											:value.sync="baseObj.work_type_ids"
											class="form-control"
											:read-only="!editMode"
											display-expr="st_name"
											placeholder="seleccione Tipo..."
											value-expr="id"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTagBox>
									</div>
								</div>

								<div class="col-md-12">
									<label>Lugar: </label>
									<Geo :lockElement="loaderElement" :syncObject="baseObj" />
								</div>

								<div class="col-md-12">
									<div class="form-group">
										<label>Observación: </label>
										<DxTextArea :height="100" :max-length="400" :value.sync="baseObj.observation" placeholder="Observacion" class="form-control">
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

						<DxColumn data-field="id" caption="id" data-type="string" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn data-field="title" caption="Titulo de Obra" data-type="string" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn
							data-field="registered_project_title"
							caption="Titulo de Registro"
							data-type="string"
							alignment="center"
							:visible="true"
							:allow-grouping="false"
						/>
						<DxColumn data-field="nature_name" caption="Naturaleza" data-type="string" alignment="center" :visible="true" :allow-grouping="true" />
						<DxColumn data-field="colciencias_call_name" caption="Minciencias" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="category_name" caption="Categoria" data-type="string" alignment="center" :visible="true" :allow-grouping="true" />
						<DxColumn
							data-field="knwl_spec_area_name"
							caption="Area del Conocimiento"
							data-type="string"
							alignment="center"
							:visible="true"
							:allow-grouping="false"
						/>
						<DxColumn
							data-field="colciencias_call_year"
							caption="Año Minciencias"
							data-type="string"
							alignment="center"
							:visible="false"
							:allow-grouping="false"
						/>
						<DxColumn data-field="geo_state_name" caption="Estado" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="observation" caption="Observacion" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn data-field="geo_country_name" caption="Pais" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<!-- data-type="string" alignment="center" :visible="false" :allow-grouping="false" /> -->
						<DxColumn data-field="geo_city_name" caption="Ciudad" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />

						<DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="70" />
						<DxColumn :width="150" alignment="center" cell-template="tpl" caption="" />
						<template #tpl="{ data }">
							<span class="cmds">
								<a v-if="data.data.url != ''" :title="data.data.url" class="cmd-item color-main-600 mr-2" :href="data.data.url" Target="_blank">
									<i class="icon-link"></i>
								</a>
								<a v-else title="No dispone de Url" class="cmd-item color-main-600 mr-2" href="#">-</a>

								<a title="Premios..." class="cmd-item color-main-600 mr-2" @click.prevent="premios(data)" href="#">
									<i class="icon-medal-first"></i>
								</a>

								<a title="Observar documentos..." class="cmd-item color-main-600 mr-2" @click.prevent="documentos(data)" href="#">
									<i class="icon-file-pdf"></i>
								</a>

								<a title="Observar participantes..." class="cmd-item color-main-600 mr-2" @click.prevent="participantes(data)" href="#">
									<i class="icon-users"></i>
								</a>

								<a title="Editar elemento..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
									<i class="icon-database-edit"></i>
								</a>

								<a v-if="data.data.active" title="Desactivar Obra..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
									<i class="icon-database-remove"></i>
								</a>
								<a v-else title="Activar Obra..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
	name: "Obra",
	components: {
		// Commands,
		DxTagBox,
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
		Documentos: () => import("@/components/element/documentos"),
		Geo: () => import("@/components/element/geo"),
		Participantes: () => import("@/components/element/participantes"),
		Premios: () => import("@/components/element/premios"),
	},
	props: {
		editMode: {
			type: Boolean,
			default: true,
		},
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
		tipos: [],
		totalCount: 0,
		tiposDocumento: [],
		subtipos: [],
		list_knwl: [],
		naturalezaObra: [],
		isValid: false,
		panelData: null,
		panelGrid: null,
		panelParticipantes: null,
		panelPremios: null,
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
			category_id: null,
			colciencias_call_id: null,
			title: null,
			creation_and_selection_date: null,
			nature_id: null,
			registered_project_title: null,
			url: null,
			knwl_spec_area_id: null,
			observation: null,
			geo_city_id: null,
			work_type_ids: [],
			created_by: null,
		},
	}),
	created() {
		// console.clear();
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
		root.getConvocatorias();
		root.naturalezaObra = root.subtypesByType("obra_naturaleza");
		root.list_knwl = root.subtypesByType("obra_area_conocimiento");
		root.tipos = root.subtypesByType("obra_cientifica_tipo");
		root.subtipos = root.subtypesByType("obra_cientifica_categoria");
		root.tiposDocumento = root.subtypesByType("obra_cientifica_documento");
	},
	mounted() {
		//root.getConvocatorias();
		//root.tipos = root.subtypesByType(5);
		//root.subtipos = root.subtypesByType(32);
		console.log("root.tipos", root.tipos);
		root.panelData = $("#panelObra .data");
		root.panelGrid = $("#panelObra .grid");
		root.panelCmds = $("#panelObra .cmds");
		root.panelCmdBack = $("#panelObra .cmds-back");
		root.panelDocs = $("#panelObra-documentos");
		root.loaderMessage = "Cargando elementos";
		root.loaderElement = "#panelObra .grid";
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapState("unidad/colciencias", { convocatorias: "items" }),
		dataSource: function() {
			if (typeof this.group.id === "undefined") return null;
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				endPoint: `research_units/${root.group.id}/research_creation_works`,
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
			// if (data.row.data.volume !== null) data.row.data.volume = parseInt(data.row.data.volume);
			// let rd = data.row.data;
			// if (rd.volume !== null) rd["volume"] = parseInt(rd.volume);
			// console.log("rd", rd);
			// root.baseObj = rd;
			root.panelCmds.fadeOut();
			$("#panelObra .item-title").html(`<span class="font-weight-semibold"> &raquo; Participantes</span> &raquo; ${data.row.data.title}`);
			root.panelParticipantes = $("#panelObra-participantes");
			console.log("root.panelParticipantes", root.panelParticipantes.length);
			$("#panelObra-documentos").hide();
			root.panelGrid.fadeOut(function(params) {
				root.panelCmdBack.fadeIn();
				$("#panelObra-participantes .grid").fadeIn();
				root.panelParticipantes.fadeIn(function(params) {});
			});
		},

		documentos(data) {
			// console.clear();
			console.log("documentos", data.row.data);
			root.section = "documentos";
			// 202104111513: Error
			// if (data.row.data.volume !== null) data.row.data.volume = parseInt(data.row.data.volume);
			let rd = data.row.data;
			// if (rd.volume !== null) rd["volume"] = parseInt(rd.volume);
			console.log("rd", rd);
			root.baseObj = rd;
			$("#panelObra .item-title").html(`<span class="font-weight-semibold"> &raquo; Documentos</span> &raquo; ${data.row.data.title}`);
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelCmdBack.fadeIn();
				$("#panelObra-documentos").fadeIn(function(params) {});
			});
		},

		premios(data) {
			// console.clear();
			console.log("premios", data.row.data);
			root.section = "premios";
			// 202104111513: Error
			// if (data.row.data.volume !== null) data.row.data.volume = parseInt(data.row.data.volume);
			let rd = data.row.data;
			// if (rd.volume !== null) rd["volume"] = parseInt(rd.volume);
			console.log("rd", rd);
			root.baseObj = rd;
			$("#panelObra .item-title").html(`<span class="font-weight-semibold"> &raquo; Premios</span> &raquo; ${data.row.data.title}`);
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelCmdBack.fadeIn();
				$("#panelObra-premios").fadeIn(function(params) {});
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
			} else if (root.section == "premios") {
				$("#panelObra-premios").fadeOut(function(params) {
					root.panelCmds.fadeIn();
					root.panelGrid.fadeIn(function(params) {});
				});
			} else {
				console.log("Regresar!");
				console.log("root.panelDocs", root.panelDocs);
				$("#panelObra-documentos").fadeOut(function(params) {
					root.panelCmds.fadeIn();
					root.panelGrid.fadeIn(function(params) {});
				});
			}
			$("#panelObra .item-title").html("");
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
				let obj = root.baseObj;
				let dto = {
					unidadId: root.group.id,
					stringEP: "research_creation_works",
					mod: obj.id,
					objectSend: { research_creation_work: obj },
					cb: function(item) {
						console.log("item", item);
						root.grid.refresh();
						root.loadHide();
						root.cancel();
					},
				};
				console.log("root.mode", root.mode);
				if (root.mode == "edit") root.objUpdate(dto);
				else root.objSave(dto);
				root.cancel();
				console.log(dto);
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
			let msg = `¿Realmente desea ${a} <span class='text-sb'>"${data.data.title}"</span>?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am}`, root.panelGrid);
					var dto = {
						url: `research_units/${root.group.id}/research_creation_works/${data.data.id}/active`,
						data: {
							research_creation_work: {
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
