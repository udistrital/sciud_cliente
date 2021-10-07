<template>
	<div class="col mt-3 pl-1 pr-1" id="plan_accion_form3">
		<div class="row">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline mb-2"  v-if="!validateImp">
						<div class="page-title p-0 m-0">
							<h1>
								<i class="icon-grid3 mr-1 color-main-600"></i>
								<span class="font-weight-semibold">{{ title }}</span>
								<span class="item-title">&nbsp;</span>
							</h1>
						</div>
						<div class="header-elements">
							<span class="cmds">
								<button type="button" @click.prevent="add()" v-if="editMode" title="Nuevo Elemento.." class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-database-add"></i></b> Nuevo {{ title }}
								</button>
							</span>
							<span class="cmds-back slide">
								<button type="button" @click.prevent="retorno()" title="Volver al trabajo.." class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-arrow-left"></i></b> Volver A {{ title }}
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <Documentos id="plan_accion_form3-documentos" end-point="form_c_act_plans" :main-obj="baseObj" :parent="this" :tipos="tiposDocumento" /> -->
		<!-- <Participantes id="plan_accion_form3-participantes" end-point="form_c_act_plans" :product="baseObj" :group="group" ref="participantes" :parent="this" /> -->
		<DxValidationGroup ref="basicGroup">
			<div class="row data slide">
				<div class="col">
					<div class="card">
						<div class="card-header main">
							<i class="icon-pencil3 mr-1"></i>
							<span class="font-weight-semibold">{{ mode == "edit" ? "Editar" : "Crear" }} {{ title }}</span>
						</div>
						<div class="card-body mb-0 pb-0 pt-2">
							<div class="row">
								<!-- formulatio -->

<!-- <div class="col-md-6">
	<div class="form-group">
		<label>Productos </label>
		<DxSelectBox
			:show-clear-button="true"
			:grouped="false"
			:search-enabled="false"
			placeholder="Seleccione..."
			:value.sync="baseObj.tipo_product_type_id" 
			class="form-control"
			:data-source="totalAreas" 
			display-expr="name"
			value-expr="id"
			:wrapItemText="true"
			>
			<DxValidator> 
			<DxRequiredRule />
		</DxValidator>
		</DxSelectBox>
	</div>
</div> -->

<div class="col-md-6">
	<div class="form-group">
		<label>Tipos Productos Colciencias:</label>
		<DxSelectBox 
			:show-clear-button="true"
			:search-enabled="false"
			placeholder="Seleccione..."
			:data-source="alldata" 
			:grouped="true" 
			display-expr="name" 
			:value.sync="baseObj.product_type_id" 
			value-expr="id" 
			class="form-control"
			:wrapItemText="true">
			<DxValidator> 
				<DxRequiredRule />
			</DxValidator>
		</DxSelectBox>
	</div>
</div>


<div class="col-md-6">
	<div class="form-group">
	<label>Meta : </label>
	<DxNumberBox placeholder="Meta " class="form-control" :value.sync="baseObj.goal" >
	<DxValidator> 
		<DxRequiredRule />
	</DxValidator> 
	</DxNumberBox>
	</div>
</div>


<div class='col-md-12'>
	<div class='form-group'>
	<label>Descripción: </label>
	<DxTextArea :height='100' :max-length='2500' :value.sync='baseObj.description' placeholder='Descripción' class='form-control'>
	<DxValidator><DxRequiredRule /></DxValidator>
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
					<!-- @content-ready="onContentReady" -->
					<DxDataGrid
						class="main"
						width="100%"
						@initialized="gridInit"
						
						:allow-column-reordering="true"
						no-data-text="No hay elementos registrados"
						:data-source="dataSource"
						:remote-operations="true"
						:hover-state-enabled="true"
						:row-alternation-enabled="true"
						:word-wrap-enabled="true"
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

						<DxColumn :width="60" data-field="id"  caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn data-field='product_type_name'  caption='Tipo ' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
						<DxColumn :width="600" data-field='description'  caption='Indicador de Existencia' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
						<DxColumn :width="50" data-field='goal'  caption='Meta' data-type='String' alignment='center' :visible='true' :allow-grouping='false' /> 

						<!-- <DxColumn data-field='dw_type_id'  caption='Tipo de Trabajo' data-type='text' alignment='center' :visible='true' :allow-grouping='false' />  -->
						<!-- <DxColumn data-field="dw_recognition" caption="Reconocimientos" data-type="text" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn
							data-field="colciencias_call_name"
							caption="Categoría Minciencias"
							data-type="text"
							alignment="center"
							:visible="false"
							:allow-grouping="true"
						/> -->
						<!-- <DxColumn data-field='category_id'  caption='Categoría' data-type='text' alignment='center' :visible='false' :allow-grouping='false' />  -->
						<!-- <DxColumn data-field="dw_observation" caption="Anotaciones" data-type="text" alignment="center" :visible="false" :allow-grouping="false" /> -->

						<!-- <DxColumn data-field="dw_observation" caption="Observaciones" data-type="string" alignment="center" :visible="true" cell-template="tplObs" /> -->
						<DxColumn data-field="active" v-if="!validateImp" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="70" />
						<DxColumn :width="110" v-if="!validateImp" alignment="center" cell-template="tpl" caption="" />

						<template #tplObs="{ data }">
							<a
								v-if="data.data.dw_observation != '' && data.data.dw_observation != null"
								:title="data.data.dw_observation"
								class="cmd-item color-main-600 mr-2"
								@click.prevent="verObservar(data.data)"
								href="#"
								Target="_blank"
							>
								<i class="icon-info mr-1"></i> Ver
							</a>
							<a v-else title="No dispone" class="cmd-item color-main-600 mr-2" href="#">-</a>
						</template>

						<template #tpl="{ data }">
							<span class="cmds">
								<!-- <a title="Observar documentos..." class="cmd-item color-main-600 mr-2" @click.prevent="documentos(data)" href="#">
									<i class="icon-file-pdf"></i>
								</a>
								<a title="Observar participantes..." class="cmd-item color-main-600 mr-2" @click.prevent="participantes(data)" href="#">
									<i class="icon-users"></i>
								</a> -->
								<a title="Editar elemento..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
									<i class="icon-database-edit"></i>
								</a>
								<a v-if="data.data.active" title="Desactivar Trabajos..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
									<i class="icon-database-remove"></i>
								</a>
								<a v-else title="Activar Trabajos..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
		<DxPopup :visible="popupObs" :drag-enabled="false" :close-on-outside-click="false" :show-title="true" width="60%" height="300" title="Observación:">
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
import { DxDateBox, DxSelectBox, DxButton, DxTagBox, DxTextBox, DxNumberBox, DxTextArea, DxValidationGroup, DxPopup } from "devextreme-vue";
import DataSource from 'devextreme/data/data_source';
import { mapState, mapActions, mapGetters } from "vuex";

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "plan_accion_formacion",
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
	},
	props: {
		titlecolum: {
			type: String,
			default: () => "dw_title",
		},
		action_panel_id: {
			type: Number,
			default: 0,
		},
		title: {
			type: String,
			default: null,
		},
		id_trabajo: {
			type: String,
			default: null,
		},
		validateImp:{
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		popupObs: false,
		observarData: "",
		editData: null, //sirve para dejar formulario en limpio o llenar datos
		tipoproceso:[],	
		totalAreas:[],
		totalAreaslist:[],
		estadoTipo:[],
		totaCount: 0,
		grid: null,
		mode: null,
		unidad: null,
		section: null,
		tipos: 826,
		totalCount: 0,
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
		min: new Date(1950, 1, 1),
		baseEnt: null,
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		baseObj: {
			advanced_total: null,
			description: null,
			goal: null,
			order: null,
			plan_type_id: 7,
			product_type_id: null,
			active: true,
		},
	}),
	created() {
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
		// console.warn("indicador", root.indicador);
		// root.tipo_areas = root.subtypesByType("planaccion_form2_tipos");
		root.loadAreas();
		root.estadoTipo= root.subtypesByType("planaccion_form2_tipos");
	},
	mounted() {
		// console.log("root.tipos", root.tipos);
		root.panelData = $("#plan_accion_form3 .data");
		root.panelGrid = $("#plan_accion_form3 .grid");
		root.panelCmds = $("#plan_accion_form3 .cmds");
		root.panelCmdBack = $("#plan_accion_form3 .cmds-back");
		root.panelDocs = $("#plan_accion_form3-documentos");
		root.loaderMessage = "Cargando elementos";
		root.loaderElement = "#plan_accion_form3 .grid";
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapState("unidad/indicadores", { lista_areas : "items_areas" }),
		dataSource: function() {
			if (typeof this.action_panel_id === "undefined") return null;
			console.log("root.group", this.group);
			let datat="";
			if(root.validateImp) datat='filter=[["plan_type_id","=","'+ root.tipos+'", "and", "active","=","true"]]';
			else datat='filter=[["plan_type_id","=","'+ root.tipos+'"]]';
			return DxStore({
				key: ["id"],
				// ids: ["dw_type_id=1"],
				stringParam: datat,
				endPoint: `action_plans/${root.action_panel_id}/form_c_act_plans/`,
				onLoading: function(loadOptions) {
					root.loaderShow("Cargando elementos", "#panel-plan_accion .card-body");
				},
				onLoaded: function(results, baseEntity) {
					// console.clear();
					console.log("results", results);
					root.totaCount = results.totalCount;
					root.loaderHide();
				},
			});
		},
		alldata(){
			return new DataSource({
				store: root.totalAreas,
				key: 'id',
				group: 'parent_name'
			});
		},
	},
	watch: {},
	methods: {
		// ...mapActions("unidad/colciencias", { getConvocatorias: "getAll" }),
		...mapActions("unidad/indicadores", {areasConocimiento: "getAreasKnow" }),
		// ...mapActions("unidad/producto/conocimiento/articulo", { objSave: "save", objUpdate: "update", elementoActive: "active" }),
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active" }),

		loadAreas(){

			//if (e.value === null) return null;
			setTimeout(function() {
				let data=0;
				for(data=6; data<=9; data++){
					root.areasConocimiento({
						parent_id: data,
						cb: function(results) {
							root.totalAreas = root.totalAreas.concat(results);
						},
					});
				}


			}, 1000);
		},

		verObservar(data) {
			root.observarData = data.dw_observation;
			root.baseObj[root.titlecolum] = data[root.titlecolum];
			root.popupObs = !root.popupObs ? true : false;
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
				$("#plan_accion_form3-documentos").fadeOut(function(params) {
					root.panelCmds.fadeIn();
					root.panelGrid.fadeIn(function(params) {});
				});
			}
			$("#plan_accion_form3 .item-title").html("");
			root.baseObj = this.$clone(root.baseEnt);
			root.section = null;
		},

		save() {
			console.log(this.$sep);
			console.warn("lista areas",root.totalAreaslist);
			var result = root.$refs.basicGroup.instance.validate();
			root.baseObj.dw_observation = root.baseObj.observation;
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
				root.baseObj.plan_type_id = root.tipos;
				root.baseObj.action_plan_id=root.action_panel_id;
				let obj = root.baseObj;
				let dto = {
					rute: "action_plans",
					unidadId: root.action_panel_id,
					stringEP: "form_c_act_plans",
					mod: obj.id,
					objectSend: { form_c_act_plan: obj },
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
			root.baseObj.observation = root.baseObj.dw_observation;
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelData.fadeIn(function(params) {});
			});
		},

		add() {
			console.log("ADD");
			root.mode = "add";
			// root.indicador=[];
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
			// // console.clear();
			console.log("active", data);
			console.log("state", state);
			let a = state ? "activar" : "desactivar";
			let am = state ? "Activando" : "Desactivando";
			let msg = `¿Realmente desea ${a} <span class='text-sb'>"${data.data[root.titlecolum]} del usuario ${root.user_role_id}</span>?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am}`, root.panelGrid);
					let active = JSON.stringify({ active: state, updated_by: root.user_id });

					var dto = {
						newFormat: true,
						url: `action_plans/${root.action_panel_id}/form_c_act_plans/${data.data.id}`,
						data: {form_c_act_plan: { active: state, updated_by: 1}},
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

		gridInit(e) {
			this.grid = e.component;
		},

	},
};
</script>
