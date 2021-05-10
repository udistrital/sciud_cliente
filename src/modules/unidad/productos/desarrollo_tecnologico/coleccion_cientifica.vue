\* 
data.name=titulo para activar o desactivar 
Colección Científica = Titulo botones 
Colección Científicas = Titulo principal 
Coleccion=titulo abreviado
panelColeccionCientifica=nombredepaneles
scientific_collections = scientific_collection enlace
scientific_collection=endpoindt especifico endpoinds tutas generales update
*\
<template>
	<div class="col mt-3 pl-1 pr-1" id="panelColeccionCientifica">
		<div class="row">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline mb-2">
						<div class="page-title p-0 m-0">
							<h1>
								<i class="icon-grid3 mr-1 color-main-600"></i>
								<span class="font-weight-semibold">Colección Científica</span>
								<span class="item-title">&nbsp;</span>
							</h1>
						</div>
						<div class="header-elements">
							<span class="cmds">
								<button type="button" @click.prevent="add()" v-if="editMode"  title="Nueva Coleccion Cientifica.." class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-database-add"></i></b> Nueva Coleccion Cientifica
								</button>
							</span>
							<span class="cmds-back slide">
								<button type="button" @click.prevent="retorno()" title="Volver al Colección Científicas.." class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-arrow-left"></i></b> Volver A Colección Científica
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
        <Documentos id="panelColeccionCientifica-documentos" end-point="scientific_collections" :main-obj="baseObj" :parent="this" :tipos="tiposDocumento" />
		<Participantes id="panelColeccionCientifica-participantes" end-point="scientific_collections" :product="baseObj" :group="group" ref="participantes" :parent="this" />
		<DxValidationGroup ref="basicGroup">
			<div class="row data slide">
				<div class="col">
					<div class="card">
						<div class="card-header main">
							<i class="icon-pencil3 mr-1"></i>
							<span class="font-weight-semibold">{{ mode == "edit" ? "Editar" : "Crear" }} Colección Científicas</span>
						</div>
						<div class="card-body mb-0 pb-0 pt-2">
							<div class="row">
								<!-- formulatio -->


<div class="col-md-3">
	<div class="form-group">
	<label>Nombre de Colección: </label>
	<DxTextBox placeholder="Nombre de Colección" class="form-control" :value.sync="baseObj.name">
	<DxValidator>
		<DxRequiredRule />
	</DxValidator>
	</DxTextBox>
	</div>
</div>

<div class="col-md-3">
	<div class="form-group">
	<label>Categoría: </label>
	<DxSelectBox
		:grouped="false"
		:search-enabled="false"
		placeholder="Seleccione..."
		:value.sync="baseObj.category_id" 
		class="form-control"
		:data-source="subtipos" 
		display-expr="st_name"
		value-expr="id">
	<DxValidator>
		<DxRequiredRule />
	</DxValidator>
	</DxSelectBox>
	</div>
</div>

<div class="col-md-3">
	<div class="form-group">
		<label>Convocatoria Minciencias:</label>
			<DxSelectBox
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
	<label>Nombre del Curador: </label>
	<DxTextBox placeholder="Nombre del Curador" class="form-control" :value.sync="baseObj.curator_name">
	<DxValidator>
		<DxRequiredRule />
	</DxValidator>
	</DxTextBox>
	</div>
</div>

<div class="col-md-3">
<div class="form-group">
<label>Fecha de Obtención: </label>
	<DxDateBox 
		class="form-control" 
		name="date_of_obtaining" 
		:value.sync="baseObj.date_of_obtaining" 
		id="date_of_obtaining" 
		placeholder="DD/MM/YYYY" 
		display-format="dd/MM/yyyy" 
		:min="minDate" 
		:max="actualDate" 
		type="date"> 
	<DxValidator> 
		<DxRequiredRule />
	</DxValidator> 
	</DxDateBox>
	</div>
</div>

<!-- <div class="col-md-3">
	<div class="form-group">
	<label>Validez y Uso: </label>
	<DxTextBox placeholder="Validez y Uso" class="form-control" :value.sync="baseObj.validity_and_use">
	<DxValidator>
	</DxValidator>
	</DxTextBox>
	</div>
</div> -->

<div class="col-md-3">
<div class="form-group">
<label>Fecha de Validez y Uso:</label>
	<DxDateBox 
		class="form-control" 
		name="validity_and_use" 
		:value.sync="baseObj.validity_and_use" 
		id="validity_and_use" 
		placeholder="DD/MM/YYYY" 
		display-format="dd/MM/yyyy" 
		:min="minDate" 
		:max="actualDate" 
		type="date"> 
	<DxValidator> 
	</DxValidator> 
	</DxDateBox>
</div>
</div>

<div class="col-md-3">
<div class="form-group">
<label>Ultima Fecha Curaduría: </label>
	<DxDateBox 
		class="form-control" 
		name="last_conservatorship_date" 
		:value.sync="baseObj.last_conservatorship_date" 
		id="last_conservatorship_date" 
		placeholder="DD/MM/YYYY" 
		display-format="dd/MM/yyyy" 
		:min="minDate" 
		:max="actualDate" 
		type="date"> 
	<DxValidator> 
	</DxValidator> 
	</DxDateBox>
</div>
</div>

<div class="col-md-3">
	<div class="form-group">
	<label>Nombre Institución Gestora: </label>
	<DxTextBox placeholder="Nombre Institución Gestora" class="form-control" :value.sync="baseObj.managing_institution_name">
	<DxValidator>
		<DxRequiredRule />
	</DxValidator>
	</DxTextBox>
	</div>
</div>


<div class="col-md-12">
	<label>Lugar de Obtención: </label>
<Geo :lockElement="loaderElement" :syncObject="baseObj" />
</div>
<div class="col-md-12">
	<div class="form-group">
	<label>Información Incluida: </label>
	<DxTextArea :height="100" :max-length="400" :value.sync="baseObj.information_included" placeholder="Información Incluida" class="form-control">
	<DxValidator>
	</DxValidator>
	</DxTextArea>
	</div>
</div>

<div class="col-md-12">
	<div class="form-group">
	<label>Observación: </label>
	<DxTextArea :height="100" :max-length="400" :value.sync="baseObj.observation" placeholder="Observación" class="form-control">
	<DxValidator>
	</DxValidator>
	</DxTextArea>
	</div>
</div>




<div class="col-md-12" v-if="tiposDocumento.length>0">
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
						no-data-text="No hay Elementos registrados"
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
							<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} Elementos" />
						</DxSummary>
						<DxPager
							:show-info="true"
							:show-page-size-selector="true"
							:show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="Página {0} de {1} ({2} Elementos)"
						/>
						<DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
						<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

						<DxColumn data-field='id'  caption='ID' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
						<DxColumn data-field='name'  caption='Nombre' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
						<DxColumn data-field='curator_name'  caption='Nombre de Curador' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
						<DxColumn data-field='category_name'  caption='Categoría' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
						<DxColumn data-field='date_of_obtaining'  caption='Fecha de Obtención' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
						<DxColumn data-field='last_conservatorship_date'  caption='Fecha Ultima Curaduría' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
						<DxColumn data-field='managing_institution_name'  caption='Institución Gestora' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
						<DxColumn data-field='geo_city_name'  caption='Ciudad' data-type='string' alignment='center' :visible='false' :allow-grouping='true' /> 
						<DxColumn data-field='geo_state_name'  caption='Estado' data-type='string' alignment='center' :visible='false' :allow-grouping='true' /> 
						<DxColumn data-field='information_included'  caption='Información Incluida' data-type='string' alignment='center' :visible='false' :allow-grouping='false' /> 
						<DxColumn data-field='colciencias_call_name'  caption='Minciencias' data-type='string' alignment='center' :visible='false' :allow-grouping='true' /> 
						<DxColumn data-field='colciencias_call_year'  caption='Minciencias Año' data-type='string' alignment='center' :visible='false' :allow-grouping='true' /> 
						<DxColumn data-field='observation'  caption='Observación' data-type='string' alignment='center' :visible='false' :allow-grouping='false' /> 
						<DxColumn data-field='geo_country_name'  caption='País' data-type='string' alignment='center' :visible='false' :allow-grouping='true' /> 
						<DxColumn data-field='validity_and_use'  caption='Valides y Uso' data-type='string' alignment='center' :visible='false' :allow-grouping='false' /> 




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
								<a title="Editar Elemento..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
									<i class="icon-database-edit"></i>
								</a>
								<a v-if="data.data.active" title="Desactivar Coleccion..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
									<i class="icon-database-remove"></i>
								</a>
								<a v-else title="Activar Coleccion..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
	name: "Coleccion",
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
		tipos: [],
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
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		baseObj: {
            name: null,
			category_id: null,
			colciencias_call_id: null,
			curator_name: null,
			date_of_obtaining: null,
			geo_state_id: null,
			geo_country_id: null,
			geo_city_id: null,
			information_included: null,
			last_conservatorship_date: null,
			managing_institution_name: null,
			research_group_id: null,
			validity_and_use: null,
			observation: null,
			active: true,
		},
	}),
	created() {
		// console.clear();
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
		root.getConvocatorias();
		//root.tipos = root.subtypesByType(5);
		root.subtipos = root.subtypesByType("coleccion_cientiica_categoria");
		root.tiposDocumento = root.subtypesByType("coleccion_cientiica_documento");
	},
	mounted() {
		console.log("root.tipos", root.tipos);
		root.panelData = $("#panelColeccionCientifica .data");
		root.panelGrid = $("#panelColeccionCientifica .grid");
		root.panelCmds = $("#panelColeccionCientifica .cmds");
		root.panelCmdBack = $("#panelColeccionCientifica .cmds-back");
		root.panelDocs = $("#panelColeccionCientifica-documentos");
		root.loaderMessage = "Cargando Elementos";
		root.loaderElement = "#panelColeccionCientifica .grid";
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapState("unidad/colciencias", { convocatorias: "items" }),
		dataSource: function() {
			if (typeof this.group.id === "undefined") return null;
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				endPoint: `research_units/${root.group.id}/scientific_collections`,
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
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active" }),
		
		
		requisitoArchivo(){
			let tipos=root.tiposDocumento;
			let i=0, print="";
			if(Array.isArray(tipos) && tipos.length != 0 && root.editMode){
				print="<h3><i class='icon-info mr-1 color-main-600'></i><b><i>Documentos Adicionales:</i></b></h3>";
				print=print + "<ul>";
				for(i=0; i<tipos.length; i++){
					let text = tipos[i].st_description==null ? "": "<br>"+tipos[i].st_description ;
					if(tipos[i].active) print=print + "<li>" + "<b>"+tipos[i].st_name+ "</b>"+text+"</li>";
				}
				print=print + "</ul>";
			}
			return print;
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
			$("#panelColeccionCientifica .item-title").html(`<span class="font-weight-semibold"> &raquo; Participantes</span> &raquo; ${data.row.data.name}`);
			root.panelParticipantes = $("#panelColeccionCientifica-participantes");
			console.log("root.panelParticipantes", root.panelParticipantes.length);
			$("#panelColeccionCientifica-documentos").hide();
			root.panelGrid.fadeOut(function(params) {
				root.panelCmdBack.fadeIn();
				$("#panelColeccionCientifica-participantes .grid").fadeIn();
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
			$("#panelColeccionCientifica .item-title").html(`<span class="font-weight-semibold"> &raquo; Documentos</span> &raquo;  ${data.row.data.name}`);
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelCmdBack.fadeIn();
				$("#panelColeccionCientifica-documentos").fadeIn(function(params) {});
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
				$("#panelColeccionCientifica-documentos").fadeOut(function(params) {
					root.panelCmds.fadeIn();
					root.panelGrid.fadeIn(function(params) {});
				});
			}
			$("#panelColeccionCientifica .item-title").html("");
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
                root.baseObj.research_group_id=root.group.id;
				let obj = root.baseObj;
				let dto = {
					newFormat:true,
					unidadId: root.group.id,
					stringEP: "scientific_collections",
					mod: obj.id,
					objectSend: { scientific_collection: obj },
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
			let msg = `¿Realmente desea ${a} <span class='text-sb'>"${data.data.name}"</span>?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am}`, root.panelGrid);
					var dto = {
                        //updated_by: 1,
						//url: `research_units/${root.group.id}/scientific_collections/${data.data.id}/active`,
                        newFormat:true,
                        url: `scientific_collections/${data.data.id}`,
						data: {
							scientific_collection: {
								active: state,
                                updated_by: root.user_id
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
