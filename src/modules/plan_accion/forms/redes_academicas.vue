\* data.row.data.name = titulo de participantes data.data.name = titulo para activar o desactivar Variedad Vegetal = Titulo botones Variedad Vegetal = Titulo
principal variedad = titulo abreviado panelvegvariet = nombredepaneles vegetable_variety = endpoindt especifico vegetable_varieties = rutas generales *\
<template>
	<div class="col mt-3 pl-1 pr-1" id="panelvegvariet">
		<div class="row">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline mb-2">
						<div class="page-title p-0 m-0">
							<h1>
								<i class="icon-grid3 mr-1 color-main-600"></i>
								<span class="font-weight-semibold">Listado de Redes Académicas</span>
								<span class="item-title">&nbsp;</span>
							</h1>
						</div>
						<div class="header-elements">
							<span class="cmds">
								<button
									type="button"
									@click.prevent="add()"
									v-if="editMode"
									title="Nuevo Variedad Vegetal.."
									class="btn btn-main btn-labeled btn-labeled-left "
								>
									<b><i class="icon-database-add"></i></b> Nueva Red Académica
								</button>
							</span>
							<span class="cmds-back slide">
								<button type="button" @click.prevent="retorno()" title="Volver al Variedad Vegetal.." class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-arrow-left"></i></b> Volver Al Listado
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Documentos id="panelvegvariet-documentos" end-point="vegetable_varieties" :main-obj="baseObj" :parent="this" :tipos="tiposDocumento" />
		<DxValidationGroup ref="basicGroup">
			<div class="row data slide">
				<div class="col">
					<div class="card">
						<div class="card-header main">
							<i class="icon-pencil3 mr-1"></i>
							<span class="font-weight-semibold">{{ mode == "edit" ? "Editar" : "Crear" }} Red Academica</span>
						</div>
						<div class="card-body mb-0 pb-0 pt-2">
							<div class="row">
								<!-- formulatio -->

<!--
                <div class="col-md-5">
                  <div class="form-group">
                    <label>Nombre : </label>
                    <DxTextBox
                      placeholder="Nombre "
                      class="form-control"
                      :value.sync="baseObj.name" 
                      :disabled="actInfor"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>

                <div class="col-md-5">
                  <div class="form-group">
                    <label>Líneas de Investigación asociadas:</label>
                    <DxSelectBox
                      :show-clear-button="true"
                      :search-enabled="false"
                      placeholder="Seleccione..."
                      :data-source="alldata"
                      :grouped="true"
                      display-expr="name"
                      :value.sync="baseObj.research_focus_ids"
                      value-expr="id"
                      class="form-control"
                      :wrapItemText="true"
                      :disabled="actInfor"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxSelectBox>
                  </div>
                </div>

                <div class="col-md-2">
                  <div class="form-group">
                    <label>Estado Estimado : </label>
                    <DxSelectBox
                      :show-clear-button="true"
                      :grouped="false"
                      :search-enabled="false"
                      placeholder="Seleccione..."
                      :value.sync="baseObj.goal_state_id"
                      class="form-control"
                      :data-source="tipoproceso"
                      display-expr="st_name"
                      value-expr="id"
                      :wrapItemText="true"
                      :disabled="actInfor"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxSelectBox>
                  </div>
                </div>
-->
                <div class="col-md-12">
                  <fieldset>
                    <legend>Áreas de Conocimiento</legend>

                    <div class="row">
                      <!-- <div class="col-md-4">
                        <div class="form-group">
                          <label>Área OCDE:</label>
                          <DxTagBox
                            :show-clear-button="true"
                            @value-changed="ocdeChange"
                            :data-source="ocdeEspecificos"
                            :grouped="true"
                            :search-enabled="true"
                            class="form-control"
                            :read-only="!editMode"
                            display-expr="name"
                            :value.sync="baseObj.oecd_knowledge_subarea_ids"
                            placeholder="Busque y/o seleccione..."
                            value-expr="id"
                            ref="sbOcdeArea"
                            :show-selection-controls="true"
                            :disabled="actInfor"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTagBox>
                        </div>
                      </div> -->

                      <!-- <div class="col-md-4">
                        <div class="form-group">
                          <label>Discipina OCDE:</label>
                          <DxTagBox
                          :show-clear-button="true"
                            @value-changed="ocdeDiscChange"
                            :data-source="ocdeDetallado2"
                            :disabled="ocdeDisabled && actInfor"
                            :grouped="true"
                            :search-enabled="true"
                            :show-selection-controls="true"
                            :value.sync="baseObj.oecd_discipline_ids"
                            class="form-control"
                            :read-only="!editMode"
                            display-expr="name"
                            placeholder="Busque y/o seleccione..."
                            value-expr="id"
                            :wrapItemText="true"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTagBox>
                        </div>
                      </div> -->

                      <div class="col-md-4">
                        <div class="form-group">
                          <label>SNIES</label>
                          <DxTagBox
                            value-expr="id"
                            display-expr="st_name"
                            class="form-control"
                            :read-only="!editMode"
                            :search-enabled="true"
                            :show-selection-controls="true"
                            :value.sync="baseObj.snies_ids"
                            placeholder="Busque y/o seleccione..."
                            :data-source="sniesItem"
                            :wrapItemText="true"
                            :disabled="actInfor"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTagBox>
                        </div>
                      </div>

                      <!-- <div class="col-md-6">
                        <div class="form-group">
                          <label>CINE Amplio y Específico:</label>
                          <DxTagBox
                            :show-clear-button="true"
                            :grouped="true"
                            :search-enabled="true"
                            placeholder="Busque y/o seleccione..."
                            :read-only="!editMode"
                            :data-source="cineEspecificos"
                            @value-changed="cineChange"
                            :show-selection-controls="true"
                            :value.sync="baseObj.cine_specific_area_ids"
                            ref="tbCine"
                            class="form-control"
                            display-expr="name"
                            value-expr="id"
                            :wrapItemText="true"
                            :disabled="actInfor"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTagBox>
                        </div>
                      </div> -->

                      <!-- <div class="col-md-6">
                        <div class="form-group">
                          <label>CINE Detallado:</label>
                          <DxTagBox
                            :show-clear-button="true"
                            :grouped="true"
                            value-expr="id"
                            display-expr="name"
                            class="form-control"
                            :read-only="!editMode"
                            :search-enabled="true"
                            :show-selection-controls="true"
                            :value.sync="baseObj.cine_detailed_area_ids"
                            placeholder="Busque y/o seleccione..."
                            :disabled="tbEspecificoDisabled"
                            :data-source="cineDetallados2"
                            :wrapItemText="true"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTagBox>
                        </div>
                      </div> -->

                    </div>
                  </fieldset>
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
						:allow-column-reordering="true"
						no-data-text="No hay elementos registrados"
						:data-source="dataSource"
						:remote-operations="true"
						:hover-state-enabled="true"
						:row-alternation-enabled="true"
						:show-borders="false"
					>
						<DxColumnChooser :enabled="totalCount > 0" mode="dragAndDrop" />
						<DxSorting mode="single" /><!-- single, multiple, none" -->
						<DxPaging :page-size="10" />
						<DxFilterRow :visible="false" />
						<DxLoadPanel :enabled="false" />
						<DxGroupPanel :visible="totalCount > 0" :allow-column-dragging="true" />
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
			


						<DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="70" />
						<DxColumn :width="110" alignment="center" cell-template="tpl" caption="" />

						<template #tplObs="{ data }">
							<a
								v-if="data.data.observation != '' && data.data.observation != null"
								:title="data.data.observation"
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
								<a v-if="data.data.active" title="Desactivar variedad..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
									<i class="icon-database-remove"></i>
								</a>
								<a v-else title="Activar variedad..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
						<span class="font-weight-semibold">{{ baseObj[title] }}</span>
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

import api from "@/store/api";    
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
import {
  DxEmailRule,
  DxRequiredRule,
  DxStringLengthRule,
  DxValidator,
  DxPatternRule,
} from "devextreme-vue/validator";
import {
  DxDateBox,
  DxSelectBox,
  DxButton,
  DxTagBox,
  DxTextBox,
  DxNumberBox,
  DxTextArea,
  DxValidationGroup,
  DxPopup,
  DxTooltip,
} from "devextreme-vue";
import { mapState, mapActions, mapGetters } from "vuex";
import DataSource from "devextreme/data/data_source";
import { DxScrollView } from 'devextreme-vue/scroll-view';

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/ research_focus_ids
export default {
  name: "plan_accion_redes_academicas",
  components: {
    // Commands,
    DxScrollView,
    DxTagBox,
    DxTooltip,
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
    Documentos: () => import("@/components/element/documentos"),
  },
  props: {
    titlecolum: {
      type: String,
      default: () => "dw_title",
    },
    editing:{
      type:Boolean,
      default: false
    },
    totalLineasInv: {
      type: Array,
      default: () => [],
    },
    actInfor:{
      type: Boolean,
      default: false
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
    //variables del formulario
    sniesItem:[],
    //fin de variables del formulario
		popupObs: false,
		observarData: null,
		editData: null, //sirve para dejar formulario en limpio o llenar datos
		grid: null,
		mode: null,
		section: null,
		totalCount: 0,
		tiposDocumento: [],
		subtipos: [],
		statepeticion: [],
		isValid: false,
		panelData: null,
		panelGrid: null,
		panelParticipantes: null,
		panelDocs: null,
		panelCmds: null,
		baseEntity: null,
		baseEnt: null,
		baseObj: {
			name: null,
			category_id: null,
			colciencias_call_id: null,
			date: null,
			cycle_type_id: null,
			petition_status_id: null,
			geo_city_id: null,
			geo_state_id: null,
			geo_country_id: null,
			observation: null,
		},
	}),
 created() {
    root = this;
    root.baseEnt = this.$clone(this.baseObj);
    root.tipoproceso = root.subtypesByType("planaccion_form6_estado_tipos");
    root.tiposDocumento = root.subtypesByType("planaccion_form6_estado_documentos");
    root.sniesItem = root.subtypesByType("snies_tipo");
    root.getUnit({
      id: root.$route.params.unidadId,
      cb: function (result) {
        root.group = result;
        console.log("group", root.group);
        setTimeout(function () {
          root.ocdeChange({ value: root.baseObj.oecd_knowledge_subarea_id });
          root.cineChange({ value: root.baseObj.cine_specific_area_id });
          root.loaderHide();
        }, 500);
      },
    });

    root.getOcde();
    root.getCine(root.getFacultades());
  },
 
	mounted() {
		root.panelData = $("#panelvegvariet .data");
		root.panelGrid = $("#panelvegvariet .grid");
		root.panelCmds = $("#panelvegvariet .cmds");
		root.panelCmdBack = $("#panelvegvariet .cmds-back");
		root.panelDocs = $("#panelvegvariet-documentos");
		root.loaderMessage = "Cargando Redes Académicas";
		root.loaderElement = "#panelvegvariet .grid";
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		
    dataSource: function() {
			if (typeof this.group.id === "undefined") return null;
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				endPoint: `research_units/${root.group.id}/vegetable_varieties`,
				onLoading: function(loadOptions) {
					root.loaderShow("Cargando elementos", "#panel-produccion .card-body");
				},
				onLoaded: function(results, baseEntity) {
					// console.clear();
					console.log("results", results);
					root.totalCount = results.totalCount;
					root.loaderHide();
				},
			});
		},
	},
	watch: {},
	methods: {
		...mapActions("unidad", ["getUnit", "saveUnit", "setDocument"]),
    ...mapActions("unidad/oas", { getFacultades: "facultades" }),
    ...mapActions("unidad/indicadores", { LineasInvConocimiento: "getAreasKnow" }),
    ...mapActions("unidad/ocde", { getOcde: "getAll" }),
    ...mapActions("unidad/cine", { getCine: "all" }),
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active" }),

		verObservar(data) {
			root.observarData = data.observation;
			root.baseObj[root.title] = data[root.title];
			root.popupObs = !root.popupObs ? true : false;
		},

    retorno() {
      console.log(root.section);
      root.panelCmdBack.fadeOut();
      if (root.section == "participantes") {
        root.panelParticipantes.fadeOut(function (params) {
          root.panelCmds.fadeIn();
          root.panelGrid.fadeIn(function (params) {});
        });
      } else {
        console.log("Regresar!");
        console.log("root.panelDocs", root.panelDocs);
        $("#paneltrabajosD-documentos").fadeOut(function (params) {
          root.panelCmds.fadeIn();
          root.panelGrid.fadeIn(function (params) {});
        });
      }
      $("#paneltrabajosD .item-title").html("");
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
					stringEP: "vegetable_varieties",
					mod: obj.id,
					objectSend: { vegetable_variety: obj },
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
						url: `research_units/${root.group.id}/vegetable_varieties/${data.data.id}/active`,
						data: {
							vegetable_variety: {
								active: state,
								updated_by: 1,
							},
						},
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
