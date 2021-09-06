<template>
  <div class="col mt-3 pl-1 pr-1" id="paneltrabajosP">
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
                <button
                  type="button"
                  @click.prevent="add()"
                  v-if="editMode"
                  title="Nuevo Elemento.."
                  class="btn btn-main btn-labeled btn-labeled-left"
                >
                  <b><i class="icon-database-add"></i></b> Nuevo {{ title }}
                </button>
              </span>
              <span class="cmds-back slide">
                <button
                  type="button"
                  @click.prevent="retorno()"
                  title="Volver al trabajo.."
                  class="btn btn-main btn-labeled btn-labeled-left"
                >
                  <b><i class="icon-arrow-left"></i></b> Volver A {{ title }}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <Documentos id="paneltrabajosP-documentos" end-point="form_d_act_plans" :main-obj="baseObj" :parent="this" :tipos="tiposDocumento" /> -->
    <!-- <Participantes id="paneltrabajosP-participantes" end-point="form_d_act_plans" :product="baseObj" :group="group" ref="participantes" :parent="this" /> -->
    <DxValidationGroup ref="basicGroup">
      <div class="row data slide">
        <div class="col">
          <div class="card">
            <div class="card-header main">
              <i class="icon-pencil3 mr-1"></i>
              <span class="font-weight-semibold"
                >{{ mode == "edit" ? "Editar" : "Crear" }} {{ title }}</span
              >
            </div>
            <div class="card-body mb-0 pb-0 pt-2">
              <div class="row">
                <!-- formulatio -->

                <div class="col-md-5">
                  <div class="form-group">
                    <label>Nombre : </label>
                    <DxTextBox
                      placeholder="Nombre "
                      class="form-control"
                      :value.sync="baseObj.name"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>

                <div class="col-md-5">
                  <div class="form-group">
                    <label>Lineas de Investigación asociadas:</label>
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
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxSelectBox>
                  </div>
                </div>

                <div class="col-md-12">
                  <fieldset>
                    <legend>Áreas de Conocimiento</legend>

                    <div class="row">
                      <div class="col-md-4">
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
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTagBox>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Discipinas OCDE:</label>
                          <DxTagBox
                          :show-clear-button="true"
                            @value-changed="ocdeDiscChange"
                            :data-source="ocdeDetallado2"
                            :disabled="ocdeDisabled"
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
                      </div>

                      <div class="col-md-4">
                        <div class="form-group">
                          <label>SNIES</label>
                          <DxTagBox
                            value-expr="id"
                            display-expr="name"
                            class="form-control"
                            :read-only="!editMode"
                            :search-enabled="true"
                            :show-selection-controls="true"
                            :value.sync="baseObj.snies_ids"
                            placeholder="Busque y/o seleccione..."
                            :disabled="false"
                            :data-source="sniesItem"
                            :wrapItemText="true"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTagBox>
                        </div>
                      </div>

                      <div class="col-md-6">
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
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTagBox>
                        </div>
                      </div>

                      <div class="col-md-6">
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
                      </div>
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
                      <span
                        class="
                          btn btn-main btn-labeled btn-labeled-left btn-sm
                          legitRipple
                        "
                      >
                        <b><i class="icon-database-remove"></i></b> CANCELAR
                      </span>
                    </template>
                  </DxButton>
                </div>
                <div class="col text-right">
                  <DxButton @click="save" class="nb" v-if="editMode">
                    <template #default>
                      <span
                        class="
                          btn btn-main btn-labeled btn-labeled-right btn-sm
                          legitRipple
                        "
                      >
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
            <DxGroupPanel
              :visible="totaCount > 0"
              :allow-column-dragging="true"
            />
            <DxGrouping :auto-expand-all="false" />
            <DxSummary>
              <DxGroupItem
                summary-type="count"
                column="group_type_name"
                display-format="{0} elementos"
              />
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

            <DxColumn
              :width="110"
              data-field="id"
              caption="ID"
              data-type="text"
              alignment="center"
              :visible="true"
              :allow-grouping="false"
              v-if="!validateImp"
            />
            <DxColumn
              data-field="name"
              caption="Nombre "
              data-type="String"
              alignment="left"
              :visible="true"
              :allow-grouping="false"
            />
            <!-- <DxColumn
              data-field="goal"
              caption="Áreas de conocimiento (CINE, OCDE, SNIES)"
              data-type="String"
              alignment="left"
              :visible="true"
              :allow-grouping="false"
            /> -->

            <DxColumn
									data-type="number"
									:allow-filtering="false"
									:allow-sorting="true"
									:customize-text="nullText"
									alignment="center"
									caption="Áreas de conocimiento (CINE, OCDE, SNIES)"
									data-field="total_know_areas"
									cell-template="tpl-total_know_areas"
								/>
								<template #tpl-total_know_areas="{ data }">
									
										<a
											href="#"
											class="color-main-600"
											@click.prevent="loadInformation(data.data)"
											@mouseover="tooltip($event, data.data, true)"
											@mouseleave="tooltip($event, data.data, false)"
										>
											CINE:{{ data.data.total_cine_detailed_areas }} / OCDE:{{ data.data.total_oecd_disciplines }} / SNIES:{{ data.data.total_snies }}
										</a>
									
									
								</template>



            <!-- <DxColumn
              data-field="research_focuses"
              caption="Linea de Investigación asociada"
              data-type="String"
              alignment="center"
              :visible="true"
              :allow-grouping="false"
              cell-template="tpl-line-invest"
            />

            <template #tpl-line-invest="{ data }">
								<span>leyendo {{data.data.id}}</span>
						</template> -->

            <DxColumn
              data-field="goal_state_name"
              caption="Estado estimado"
              data-type="String"
              alignment="center"
              :visible="true"
              :allow-grouping="false"
            />

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
            <DxColumn
              data-field="active"
              caption="Activo"
              data-type="date"
              alignment="center"
              :visible="true"
              :customize-text="yesNo"
              width="70"
              v-if="!validateImp" 
            />
            <DxColumn
              :width="110"
              alignment="center"
              cell-template="tpl"
              caption=""
              v-if="!validateImp"
            />

            <template #tplObs="{ data }">
              <a
                v-if="
                  data.data.dw_observation != '' &&
                  data.data.dw_observation != null
                "
                :title="data.data.dw_observation"
                class="cmd-item color-main-600 mr-2"
                @click.prevent="verObservar(data.data)"
                href="#"
                Target="_blank"
              >
                <i class="icon-info mr-1"></i> Ver
              </a>
              <a
                v-else
                title="No dispone"
                class="cmd-item color-main-600 mr-2"
                href="#"
                >-</a
              >
            </template>

            <template #tpl="{ data }">
              <span class="cmds">
                <!-- <a title="Observar documentos..." class="cmd-item color-main-600 mr-2" @click.prevent="documentos(data)" href="#">
									<i class="icon-file-pdf"></i>
								</a>
								<a title="Observar participantes..." class="cmd-item color-main-600 mr-2" @click.prevent="participantes(data)" href="#">
									<i class="icon-users"></i>
								</a> -->
                <a
                  title="Editar elemento..."
                  class="cmd-item color-main-600"
                  @click.prevent="edit(data.data)"
                  href="#"
                >
                  <i class="icon-database-edit"></i>
                </a>
                <a
                  v-if="data.data.active"
                  title="Desactivar Trabajos..."
                  class="cmd-item color-main-600 mr-2"
                  @click.prevent="active(data, false)"
                  href="#"
                >
                  <i class="icon-database-remove"></i>
                </a>
                <a
                  v-else
                  title="Activar Trabajos..."
                  class="cmd-item color-main-600 mr-2"
                  @click.prevent="active(data, true)"
                  href="#"

                >
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
      <!-- <div class="card-body">
        {{ JSON.stringify(alldata, null, "\t") }}
      </div>

      <div class="card-body">
        {{ JSON.stringify(listb, null, "\t") }}
      </div> -->
    </div>
    
    
    <DxPopup
      :visible="popupObs"
      :drag-enabled="false"
      :close-on-outside-click="false"
      :show-title="true"
      width="60%"
      height="300"
      title="Observación:"
    >
      <div class="row" style="overflow-y: scroll; height: 148px">
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
              <span
                class="
                  btn btn-main btn-labeled btn-labeled-left btn-sm
                  legitRipple
                "
              >
                <b><i class="icon-database-remove"></i></b> Salir
              </span>
            </template>
          </DxButton>
        </div>
      </div>
    </DxPopup>


    <DxPopup
			:drag-enabled="false"
			:close-on-outside-click="false"
			:show-title="true"
			width="80%"
			height="80%"
			:title="areasObj.title"
			:visible="popupVisible"
			@hidden="popupVisible = false"
		>
    <DxScrollView
        id="scrollview"
        ref="scrollViewWidget"
      >
      <span class="font-weight-semibold">Listado de áreas del conocimiento asociadas a Linea de Investigación: <strong>{{ areasObj2.line }}</strong>, para la red academica creada con el nombre: <strong>{{areasObj2.name}}</strong></span>
      <div class="card-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="card">
              
              <div class="card-body">
                <h5 class="card-title">CINE:</h5>
                
                <p class="card-text">
                  <ul>
                    <li v-for="areacine in  areasObj2.cine" :key="areacine.idx">{{areacine.cine_specific_area_name}} 
                      <ul v-for="areacinedetalle in  areacine.cine_detailed_area_ids" :key="areacinedetalle.idx">
                        <li>{{areacinedetalle.name}}</li>
                      </ul>
                    </li>
                  </ul>
                </p>
              </div>
              </div>
            </div>

            <div class="col-sm-4">
              <div class="card">
              <div class="card-body">
                <h5 class="card-title">OCDE: </h5>
                <p class="card-text">
                  <ul>
                    <li v-for="areaocde in  areasObj2.oecd" :key="areaocde.idx">{{areaocde.oecd_knowledge_subarea_name}} 
                      <ul v-for="areaocdedetalle in  areaocde.oecd_discipline_ids" :key="areaocdedetalle.idx">
                        <li>{{areaocdedetalle.name}}</li>
                      </ul>
                    </li>
                  </ul>
                </p>
              </div>
              </div>
            </div>

            <div class="col-sm-4">
              <div class="card">
              <div class="card-body">
                <h5 class="card-title">SNIES</h5>
                <p class="card-text">
                  <ul>
                    <li v-for="areasnies in  areasObj2.snies" :key="areasnies.idx">{{areasnies.snies_name}} 
                    </li>
                  </ul>
                </p>
              </div>
              </div>
            </div>
          </div>
        
      </div>

    
    </DxScrollView>
		</DxPopup>


    <DxTooltip ref="ttip" position="top">
			<template>
				<span>
					<span class="font-weight-semibold color-main-600">CINE Detallado:</span> {{ areasObj.total_cine_detailed_areas }}<br />
					<span class="font-weight-semibold color-main-600">CINE Específico:</span> {{ areasObj.total_cine_specific_areas }}<br />
					<span class="font-weight-semibold color-main-600">OCDE Disciplinas:</span> {{ areasObj.total_oecd_disciplines }}<br />
          <span class="font-weight-semibold color-main-600">OCDE Sub-Areas:</span> {{ areasObj.total_oecd_knowledge_subareas }}<br />
          <span class="font-weight-semibold color-main-600">SNIES:</span> {{ areasObj.total_snies }}<br />
					<small class="font-weight-semibold"><i>(Clic para observar)</i></small>
				</span>
			</template>
		</DxTooltip>


    <div class="row" v-if="is_dev && debug">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <span class="font-weight-semibold">editMode:</span> {{ group }}
          </div>
        </div>
      </div>
    </div>
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
    areasObj: {
			title: "Áreas de Conocimiento",
		},
    areasObj2:{},
    popupVisible:false,
    ttip: null,
    dataForm:{},
    cineDetallados: [],
    ocdeDetallado: [],
    ocdeDisabled: true,
    tbEspecificoDisabled:true,
    // tipoprocesox:[{id:1,st_name:"Presentado"},{id:2,st_name:"Vinculado"}],
    popupObs: false,
    totalLineasInv: [],
    totalLineasInvlist: [],
    observarData: "",
    editData: null, //sirve para dejar formulario en limpio o llenar datos
    tipoproceso: [],
    totaCount: 0,
    grid: null,
    mode: null,
    unidad: null,
    section: null,
    tipos: 828,
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
      name:null,
      description:null,
      goal_state_id:0,
      goal_achieved:true,
      order:0,
      plan_type_id:0,
      active:true,
      cine_detailed_area_ids:[],
      cine_specific_area_ids:[],
      oecd_discipline_ids:[],
      oecd_knowledge_subarea_ids:[],
      research_focus_ids:[],
      snies_ids:[],
    },
  }),
 
 created() {
    root = this;
    root.baseEnt = this.$clone(this.baseObj);
    root.loadLineasInv();
    root.getSnies();
    root.tipoproceso = root.subtypesByType("planaccion_form6_estado_tipos");

    root.getUnit({
      id: root.$route.params.unidadId,
      cb: function (result) {
        root.group = result;
        console.log("group", root.group);
        setTimeout(function () {
          root.ocdeChange({ value: root.baseObj.oecd_knowledge_subarea_id });
          root.cineChange({ value: root.baseObj.cine_specific_area_id });
          // // root.facultadChange({ value: root.baseObj.faculty_ids });
          // root.mode = "edit";
          root.loaderHide();
        }, 500);
      },
    });

    root.getOcde();
    root.getCine(root.getFacultades());
  },
 
 mounted() {
    // console.log("root.tipos", root.tipos);
    root.ttip = root.$refs.ttip.instance;
    root.panelData = $("#paneltrabajosP .data");
    root.panelGrid = $("#paneltrabajosP .grid");
    root.panelCmds = $("#paneltrabajosP .cmds");
    root.panelCmdBack = $("#paneltrabajosP .cmds-back");
    root.panelDocs = $("#paneltrabajosP-documentos");
    root.loaderMessage = "Cargando elementos";
    root.loaderElement = "#paneltrabajosP .grid";
  },
 
 computed: {
    ...mapGetters("core/tipo", ["subtypesByType"]),
    ...mapState("unidad/snies", { sniesItem : "items" }),
    // ...mapState("unidad/producto/universalSentUpAct", { formGetData : "getData" }),

    ...mapGetters("unidad/cine", {
      cEspecificos: "specific",
      cDetallados: "detailed",
    }),
    ...mapState("unidad/ocde", {
      oEspecificos: "subareas",
      oDetallados: "disciplines",
    }),


    dataSource: function () {
      let datat="";
      if (typeof this.action_panel_id === "undefined") return null;
      if(root.validateImp) datat='filter=[["plan_type_id","=","'+ root.tipos+'", "and", "active","=","true"]]';
			else datat='filter=[["plan_type_id","=","'+ root.tipos+'"]]';
      console.log("root.group", this.group);
      return DxStore({
        key: ["id"],
        // ids: ["dw_type_id=1"],
        // stringParam: "plan_type_id=" + root.tipos+'& filter=[["active","=","true"]]',
        //stringParam: 'filter=[["plan_type_id","=","' + root.tipos + '"]]',
        stringParam: datat,
        endPoint: `action_plans/${root.action_panel_id}/form_d_act_plans/`,
        onLoading: function (loadOptions) {
          root.loaderShow(
            "Cargando elementos",
            "#panel-plan_accion .card-body"
          );
        },
        onLoaded: function (results, baseEntity) {
          // console.clear();
          console.log("results", results);
          root.totaCount = results.totalCount;
          root.loaderHide();
        },
      });
    },

    alldata() {
      console.warn("lineas",root.totalLineasInv);
      return new DataSource({
        store: root.selectorLineas(root.totalLineasInv),
        key: "id",
        group: "parent_name",
      });
    },

    ocdeDetallado2() {
      console.warn("ocde",root.ocdeDetallado);
      return new DataSource({
          store: root.ocdeDetallado,
          key: "id",
          group: "oecd_knowledge_subarea_name",
      });
      // return root.ocdeDetallado; cine_specific_area_name
    },

    cineDetallados2() {
      console.warn("ocde",root.cineDetallados);
      return new DataSource({
          store: root.cineDetallados,
          key: "id",
          group: "cine_specific_area_name",
      });
      // return root.ocdeDetallado; cine_specific_area_name
    },


    ocdeEspecificos() {
      var sorted = root.$objectSort(root.oEspecificos, "name");
      return new DataSource({
        group: "oecd_knowledge_area_name",
        store: {
          data: sorted,
          key: "id",
          type: "array",
        },
        map: function (groupedItem) {
          console.log("grouped");
          console.log(groupedItem);
          return groupedItem;
        },
      });
    },

    cineEspecificos() {
      console.log("root.cEspecificos", root.cEspecificos);
      console.log("root.cDetallados", root.cDetallados);
      return new DataSource({
        group: "cine_broad_area_name",
        store: {
          data: root.cEspecificos,
          key: "id",
          type: "array",
        },
        map: function (groupedItem) {
          console.log("ver carlos", groupedItem);
          return groupedItem;
        },
      });
    },
  },
 
 methods: {
    // ...mapActions("unidad/colciencias", { getConvocatorias: "getAll" }),
    ...mapActions("unidad", ["getUnit", "saveUnit", "setDocument"]),
    ...mapActions("unidad/oas", { getFacultades: "facultades" }),
    ...mapActions("unidad/indicadores", { LineasInvConocimiento: "getAreasKnow" }),
    ...mapActions("unidad/ocde", { getOcde: "getAll" }),
    ...mapActions("unidad/cine", { getCine: "all" }),
    ...mapActions("unidad/snies", { getSnies: "getSnies" }),

    //...mapActions("unidad/producto/conocimiento/articulo", { objSave: "save", objUpdate: "update", elementoActive: "active" }),
    ...mapActions("unidad/producto/universalSentUpAct", {
      objSave: "save",
      objUpdate: "update",
      elementoActive: "active",
      getForm: "get",
    }),


    loadInformation(data) {
			root.loaderShow(`Listando Areas...`, "#panel-plan_accion .card-body");
      setTimeout(function() {
				root.getForm({
					url: "form_d_act_plans/"+data.id,
					cb: function(results) {
						//root.dataForm = results;
            root.areasObj2=results;
            root.areasObj2.line=root.areasObj2.research_focuses[0].research_focus_name
						root.loaderHide();
            root.popupVisible = true;
					},
				});
			}, 1000);
		},

    tooltip(e, data, show) {
			// console.clear();
			let el = e.target || e.srcElement;
			// console.log("el =>", el);
			// console.log("ttip =>", root.ttip);
			// console.log("show =>", show);
			// console.log("data =>", data);
			if (show) {
				root.areasObj = data;
				root.ttip.option("target", el);
				root.ttip.show();
			} else {
				root.ttip.hide();
			}
		},
    
    operacion(datos, grupo){
        // root.LineasInvConocimiento({
        let limpio=[];
        console.clear;
        console.warn("listado de datos",datos);
        for (let i = 0; i < grupo.length; i++) {
            limpio = limpio.concat(
            datos.filter(
              (datos) =>
                (datos.id) === parseInt(grupo[i])
            )
          );
          console.warn("isd: "+i+" data= "+grupo[i]);
          console.warn("isd", limpio);
        }
        return limpio;
    },
    ocdeChange(e) {
      console.log(root.$sep);
      console.log("e", e);
      let subdata=[];
      // console.warn(e.elemet.outerText);
      console.warn(e.element.outerText);
      let dataText=e.element.outerText;
      let namesOCDE = dataText.split('\n');
      console.warn("array datos ",namesOCDE);

      for(let i=0; i<e.value.length; i++){

        var items = root.oDetallados.filter((o) => o.oecd_knowledge_subarea_id === e.value[i]);
        console.warn("array items ",items);
        if (items.length > 0) {
          items = root.$objectSort(items, "name");
          for(let m=0; m<items.length; m++) items[m].oecd_knowledge_subarea_name=namesOCDE[i];
          subdata = subdata.concat(items);
          console.log("ocdeDetallado", subdata);
        }
      }

      if (subdata.length > 0) {
        root.ocdeDetallado = subdata;
        root.ocdeDisabled = false;
        console.log("ocdeDetallado", root.ocdeDetallado);
      } else {
        root.ocdeDisabled = true;
      }

    },
     ocdeDiscChange(e) {
       console.log(root.$sep);
       console.log("e", e);
     },
    
    cineChange(e) {
      let subdata=[];
      let dataText=e.element.outerText;
      let namesCINE = dataText.split('\n');
      console.warn("array datos CINE",namesCINE);

      for(let i=0; i<e.value.length; i++){
        var items = root.cDetallados.filter((o) => o.cine_specific_area_id === e.value[i]);
        if (items.length > 0) {
          console.log(root.$sep);
          console.log(root.cEspecificos);
          var item = root.cEspecificos.filter((o) => o.id === e.value[i])[0];
          root.baseObj.cine_broad_area_id = item.cine_broad_area_id;
          // root.baseObj.cine_detailed_area_ids = [];
          items = root.$objectSort(items, "name");
          for(let m=0; m<items.length; m++) items[m].cine_specific_area_name=namesCINE[i];
          subdata = subdata.concat(items);
          // console.log("cineDetallados", root.cineDetallados);
        }
      }

      if (subdata.length > 0) {
        root.cineDetallados = subdata;
        root.tbEspecificoDisabled = false;
        console.log("cineDetallados", root.cineDetallados);
      } else {
        root.tbEspecificoDisabled = true;
      }
    },


    cineChangeNull(e) {
      let subdata=[];

      
      var items = root.cDetallados.filter((o) => o.cine_specific_area_id === e.value);
      if (items.length > 0) {
        console.log(root.$sep);
        console.log(root.cEspecificos);
        var item = root.cEspecificos.filter((o) => o.id === e.value)[0];
        root.baseObj.cine_broad_area_id = item.cine_broad_area_id;
        // root.baseObj.cine_detailed_area_ids = [];
        items = root.$objectSort(items, "name");
        root.cineDetallados = items;
        root.tbEspecificoDisabled = false;
        // console.log("cineDetallados", root.cineDetallados);
      } else {
        root.tbEspecificoDisabled = true;
      }
    },

    loadLineasInv() {
        
        root.LineasInvConocimiento({
          parent_id: 159,
          cb: function (results) {
            root.totalLineasInv=[];
            root.totalLineasInv = root.totalLineasInv.concat(results);
          },
        });

        root.LineasInvConocimiento({
          parent_id: 511,
          cb: function (results) {
            root.totalLineasInv = root.totalLineasInv.concat(results);
          },
        });

        root.LineasInvConocimiento({
          parent_id: 512,
          cb: function (results) {
            root.totalLineasInv = root.totalLineasInv.concat(results);
          },
        });

        root.LineasInvConocimiento({
          parent_id: 513,
          cb: function (results) {
            root.totalLineasInv = root.totalLineasInv.concat(results);
          },
        });

        root.LineasInvConocimiento({
          parent_id: 514,
          cb: function (results) {
            root.totalLineasInv = root.totalLineasInv.concat(results);
          },
        });
      
    },

    loadIndicators(e) {
      // root.indicador = [];
      if (e.value === null) return null;
      setTimeout(function () {
        root.getIndicadores({
          id_subtipos: e.value,
          cb: function (results) {
            root.indicador = results;
            root.loaderHide();
          },
        });
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
        root.panelParticipantes.fadeOut(function (params) {
          root.panelCmds.fadeIn();
          root.panelGrid.fadeIn(function (params) {});
        });
      } else {
        console.log("Regresar!");
        console.log("root.panelDocs", root.panelDocs);
        $("#paneltrabajosP-documentos").fadeOut(function (params) {
          root.panelCmds.fadeIn();
          root.panelGrid.fadeIn(function (params) {});
        });
      }
      $("#paneltrabajosP .item-title").html("");
      root.baseObj = this.$clone(root.baseEnt);
      root.section = null;
    },

    save() {
      
      console.log(this.$sep);
      var result = root.$refs.basicGroup.instance.validate();
      // root.baseObj.dw_observation = root.baseObj.observation;
      console.log("result", result);
      if (result.isValid) {
        console.log("VALID!");
        root.scrollTop();
        root.panelCmds.fadeOut();
        // root.loaderElement = ;
        let msg =
          (root.mode == "add" ? "Creando" : "Actualizando") + " elemento";
        root.loaderShow(msg, root.panelData);
        if (root.mode == "add") root.baseObj.created_by = root.user_id;
        if (root.mode == "edit") root.baseObj.updated_by = root.user_id;
        root.baseObj.plan_type_id = root.tipos;
        root.baseObj.action_plan_id = root.action_panel_id;
        root.baseObj.research_focus_ids=[root.baseObj.research_focus_ids];
        let obj = root.baseObj;
        let dto = {
          rute: "action_plans",
          unidadId: root.action_panel_id,
          stringEP: "form_d_act_plans",
          mod: obj.id,
          objectSend: { form_d_act_plan: obj },
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

    selectorLineas(results){
      let limpio = [];
      let datax = results;
      for (let i = 0; i <= root.group.research_focus_ids.length; i++) {
        limpio = limpio.concat(datax.filter((datax) => parseInt(datax.id) ===  parseInt(root.group.research_focus_ids[i]) ) );
      }
      return limpio;
    },



    convert2array(objeto,vectorPadre,name_id_padre, name_id_hijo){
      let arreglo=[], dataPadre=[], dataHijo=[];
      let hijo;
      let vector=objeto[vectorPadre]
      console.warn("vector padre", vector);
      
      //console.warn("", vectorPadre);

      for(let i=0; i<vector.length; i++){
        console.warn("Vector padre "+i+":  ",vector[i][name_id_padre]);
        dataPadre.push(vector[i][name_id_padre]);
        hijo = vector[i][name_id_hijo];
        console.warn("Vector hijo "+i+":  ",hijo);
        for(let p=0; p<hijo.length; p++){
            dataHijo.push(hijo[p].id);
        }
      }
      arreglo=[dataPadre,dataHijo];
      return arreglo;
    },

    arrayObjeto2vectorSnies(vectorPadre){
      let vector=[];
      for(let i=0; i<vectorPadre.length; i++){
        vector.push(vectorPadre[i].snies_id);
        // console.warn("vector ", vector);
      }
      return vector;
    },
   

    edit(data) {
			root.mode = "edit";
      root.baseObj = root.$clone(root.baseEnt);
			// console.log("data", data);
      // console.warn("data id: ",data.id);
      //root.baseObj = data;
      root.loaderShow(`Abriendo Formulario`, "#panel-plan_accion .card-body");
      setTimeout(function() {
				root.getForm({
					url: "form_d_act_plans/"+data.id,
					cb: function(results) {
						root.dataForm = results;
            // console.clear();
            // console.warn("dataForm",  root.dataForm);
            // 
            root.baseObj.id= root.dataForm.id;
            root.baseObj.name= root.dataForm.name;
            root.baseObj.goal_state_id=root.dataForm.goal_state_id;
            root.baseObj.goal_achieved= root.dataForm.goal_achieved;
            root.baseObj.order= root.dataForm.order;
            root.baseObj.plan_type_id= root.dataForm.plan_type_id;
            root.baseObj.active= root.dataForm.active;
            root.baseObj.research_focus_ids= root.dataForm.research_focuses[0].research_focus_id;
            let cine=root.convert2array(root.dataForm, 'cine', 'cine_specific_area_id', 'cine_detailed_area_ids');
            root.baseObj.cine_specific_area_ids=cine[0];
            root.baseObj.cine_detailed_area_ids=cine[1];
            let oecd=root.convert2array(root.dataForm, 'oecd', 'oecd_knowledge_subarea_id', 'oecd_discipline_ids');
            root.baseObj.oecd_knowledge_subarea_ids=oecd[0];
            root.baseObj.oecd_discipline_ids=oecd[1];
            root.baseObj.snies_ids=root.arrayObjeto2vectorSnies(root.dataForm.snies);

						root.loaderHide();
					},
				});
			}, 1000);
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelData.fadeIn(function(params) {});
			});
		},














    add_valit(){
      console.log("ADD");
      root.mode = "add";
      root.baseObj = this.$clone(this.baseEnt);
      root.panelCmds.fadeOut();
      root.panelGrid.fadeOut(function (params) {
        root.panelData.fadeIn(function (params) {});
      });
    },

    add() {
      //  root.totalLineasInv=[];
      // root.loadLineasInv();
      // root.totalLineasInv=root.selectorLineas(root.totalLineasInv);
      if(root.group.research_focus_ids.length!=0){
        root.add_valit();
      }else{
        let msg = `La estructura de investigacion llamada: <i><strong>${root.group.name}</strong></i>, no cuenta con lineas de investigación.<br /> ¿Desea continuar?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.add_valit();
				}
			});
      }
    },

    cancel() {
      console.log("CANCEL!");
      root.panelData.fadeOut(function (params) {
        root.panelCmds.fadeIn();
        root.panelGrid.fadeIn(function (params) {});
      });
    },

    active(data, state) {
      // // console.clear();
      console.log("active", data);
      console.log("state", state);
      let a = state ? "activar" : "desactivar";
      let am = state ? "Activando" : "Desactivando";
      let msg = `¿Realmente desea ${a} <span class='text-sb'>"${
        data.data[root.titlecolum]
      } del usuario ${root.user_role_id}</span>?`;
      this.$confirm(msg, function (si_no) {
        console.log("result", si_no);
        if (si_no) {
          root.loaderShow(`${am}`, root.panelGrid);
          let active = JSON.stringify({
            active: state,
            updated_by: root.user_id,
          });

          var dto = {
            newFormat: true,
            url: `action_plans/${root.action_panel_id}/form_d_act_plans/${data.data.id}`,
            data: { form_d_act_plan: { active: state, updated_by: 1 } },
            cb: function (result) {
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
