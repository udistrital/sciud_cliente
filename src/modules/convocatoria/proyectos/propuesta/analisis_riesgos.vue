<template>
  <div class="col mt-3 pl-1 pr-1" :id="namePanel">
    <div class="row">
      <div class="col">
        <div class="p-0">
          <div class="page-header header-elements-md-inline mb-2">
            <div class="page-title p-0 m-0">
              <h1>
                <i class="icon-factory mr-1 color-main-600"></i>
                <span class="font-weight-semibold">{{ title }}</span>
                <span class="item-title">&nbsp;</span>
              </h1>
            </div>
            <div class="header-elements">
              <span class="cmds">
                <button
                  v-if="permisoGuardar"
                  type="button"
                  @click.prevent="add()"
                  title="Agregar Elemento .."
                  class="btn btn-main btn-labeled btn-labeled-left"
                >
                  <b><i class="icon-database-add"></i></b> {{ titleBtn }}
                </button>
              </span>
              <span class="cmds-back slide">
                <button
                  type="button"
                  @click.prevent="retorno()"
                  title="Volver al panel principal.."
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

    <DxValidationGroup ref="basicGroup">
      <div class="row data slide">
        <div class="col">
          <div class="card">
            <div class="card-header main">
              <i class="icon-pencil3 mr-1"></i>
              <span class="font-weight-semibold"
                >{{ mode == "edit" ? "Editar" : "Crear" }} {{ titleBtn }}
              </span>
            </div>
            <div class="card-body mb-0 pb-0 pt-2">
              <div class="row">
                <!-- formulatio -->
                <div class="col-6">
                  <div class="form-group">
                    <label>Nombre: </label>
                    <DxTextBox
                      placeholder="Nombre"
                      class="form-control"
                      :value.sync="baseObj.name"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>

                <div class="col-6">
                  <div class="form-group">
                    <label>Consecuencia: </label>
                    <DxTextBox
                      placeholder="Consecuencia"
                      class="form-control"
                      :value.sync="baseObj.consequence"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>

                <div class="col-6">
                  <div class="form-group">
                    <label>Mitigación: </label>
                    <DxTextBox
                      placeholder="Mitigación"
                      class="form-control"
                      :value.sync="baseObj.mitigation"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>

                <div class="col-6">
                  <div class="form-group">
                    <label>Actividad (es):</label>
                    <!-- <DxSelectBox
                                        :show-clear-button="true"
                                        :grouped="false"
                                        :data-source="listaGrupos"
                                        :value.sync="baseObj.activity_schedule_ids"
                                        :search-enabled="false"
                                        placeholder="Seleccione..."
                                        class="form-control"
                                        display-expr="name"
                                        value-expr="id"
                                    >
                                        <DxValidator>
                                        <DxRequiredRule />
                                        </DxValidator>
                                    </DxSelectBox> -->

                    <DxTagBox
                      id="activites"
                      :read-only="false"
                      class="form-control"
                      :search-enabled="false"
                      :show-selection-controls="true"
                      :value.sync="baseObj.activity_schedule_ids"
                      placeholder="Seleccione..."
                      :data-source="listaGrupos"
                      display-expr="name"
                      value-expr="id"
                    >
                      <DxValidator>
                        <DxRequiredRule /><!-- @item-click="cmdClick($event, data)" :items="cmdGet(data)" @click= "" -->
                      </DxValidator>
                    </DxTagBox>
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
                  <DxButton @click="save" class="nb">
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
        <h2></h2>
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
            :word-wrap-enabled="true"
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
            <DxGrouping :auto-expand-all="true" />
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
            <!-- <DxColumn
              data-field="id"
              caption="ID"
              data-type="string"
              alignment="center"
              :visible="true"
              :allow-grouping="false"
              width="110"
            /> -->
            <DxColumn
              data-field="name"
              caption="Nombre"
              :customize-text="nullText"
              data-type="string"
              alignment="left"
              :visible="true"
              :allow-grouping="false"
            />
            <DxColumn
              data-field="consequence"
              caption="Consecuencia"
              :customize-text="nullText"
              data-type="string"
              alignment="left"
              :visible="true"
              :allow-grouping="false"
            />
            <DxColumn
              data-field="mitigation"
              caption="Mitigación"
              :customize-text="nullText"
              data-type="string"
              alignment="left"
              :visible="true"
              :allow-grouping="false"
            />
            <!-- <DxColumn data-field="parent_id" caption="Tipo" data-type="string" alignment="center" :visible="true" :allow-grouping="false" width="120" /> -->

            <!-- <DxColumn data-field="url" caption="Tipo" data-type="string" alignment="center" :visible="true" :width="100" cell-template="tplWeb" />  -->
            <DxColumn
              data-field="active"
              caption="Activo"
              data-type="date"
              alignment="center"
              :visible="true"
              :customize-text="yesNo"
              width="70"
            />
            <DxColumn
              :width="90"
              alignment="center"
              cell-template="tpl"
              caption=""
              v-if="permisoGuardar"
            />

            <!-- <template #tplWeb="{ data }">
							<span v-if="data.data.parent_id != null" > Específico</span>
							<span v-else class="cmd-item color-main-600 mr-2" > General </span>
						</template> -->

            <template #tpl="{ data }">
              <span class="cmds">
                <span>
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
                    title="Desactivar Libro..."
                    class="cmd-item color-main-600 mr-2"
                    @click.prevent="active(data, false)"
                    href="#"
                  >
                    <i class="icon-database-remove"></i>
                  </a>
                  <a
                    v-else
                    title="Activar Libro..."
                    class="cmd-item color-main-600 mr-2"
                    @click.prevent="active(data, true)"
                    href="#"
                  >
                    <i class="icon-database-check"></i>
                  </a>
                </span>
              </span>
            </template>
          </DxDataGrid>
        </div>
      </div>
    </div>

    <div class="card mt-3" v-if="debug">
      <div class="card-body">
        baseObj:
        {{ JSON.stringify(baseObj, null, "\t") }}
      </div>
      <div class="card-body">
        baseObjGen:
        {{ JSON.stringify(baseObjGen, null, "\t") }}
      </div>
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
  DxSwitch,
  DxTextBox,
  DxNumberBox,
  DxTagBox,
  DxTextArea,
  DxValidationGroup,
  DxPopup,
} from "devextreme-vue";
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
    DxTagBox,
  },
  props: {
    convocatoria: {
      type: Object,
      default: () => {},
    },
    propuesta: {
      type: Object,
      default: () => {},
    },
    editOBJ: {
      type: Boolean,
      default: () => false,
    },
    endPointRute: {
      type: String,
      default: () => null,
    },
    permisoGuardar: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    namePanel: "proyecto-riesgos",
    titlecolum: "id",
    titleBtn: "Nuevo Elemento",
    title: "Listado de Ánalisis de Riesgo",

    listaGrupos: [],
    tiposParticipante: null,
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
    urlPattern: /^(http|https):\/\/[^ "]+$/,
    phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
    baseObjGen: {},
    baseObj: {
      name: null,
      consequence: null,
      mitigation: null,
      activity_schedule_ids: [],
      active: true,
    },
  }),
  async created() {
    root = this;
    root.baseEnt = this.$clone(this.baseObj);
    // root.tiposParticipante = root.subtypesByType("unidad_rol_participante");
    await root.getSinData({
      // url: "/research_units/117/group_member/10286",
      url: "/proposals/" + root.propuesta.id + "/activity_schedules",
      cb: function (results) {
        let objeto = results;
        root.listaGrupos = objeto.data;
        // root.groupResearchers.gropusmember = objeto;
        // root.groupResearchers.gropusmember2 = objeto;
        // root.cargarDatosPropuesta();
        // let resoultFind = objeto.find(buscador => buscador.research_group_id === parseInt(root.inforBase.research_group_id));
        // if (resoultFind != undefined) root.groupResearchers.datagroupmenber = resoultFind;
        // root.loaderHide();
        // console.warn("datos internos integrante ", objeto);
      },
    });
  },
  mounted() {
    root.panelData = $("#" + this.namePanel + " .data");
    root.panelGrid = $("#" + this.namePanel + " .grid");
    root.panelCmds = $("#" + this.namePanel + " .cmds");
    root.panelCmdBack = $("#" + this.namePanel + " .cmds-back");
    root.loaderMessage = "Cargando Estrucuras";
    root.loaderElement = "#" + this.namePanel + " .grid";
  },
  computed: {
    ...mapGetters("core/tipo", ["subtypesByType"]),
    dataSource: function () {
      if (typeof this.propuesta.id === "undefined") return null;
      console.log("root.propuesta", root.propuesta);
      return DxStore({
        key: ["id"],
        endPoint: "proposals/" + root.propuesta.id + "/risks",
        onLoading: function (loadOptions) {
          root.loaderShow("Cargando elementos", "#panel-produccion .card-body");
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
    ...mapActions("unidad/producto/universalSentUpAct", {
      getSinData: "getSinData",
      objSave: "save",
      objUpdate: "update",
      elementoActive: "active",
    }),
    GetStructures() {},
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
        let msg =
          (root.mode == "add" ? "Creando" : "Actualizando") + " Elemento";
        root.loaderShow(msg, root.panelData);
        if (root.mode == "add") root.baseObj.created_by = root.user_id;
        if (root.mode == "edit") root.baseObj.updated_by = root.user_id;
        this.activity_schedule_ids = [this.activity_schedule_ids];
        let obj = root.baseObj;
        let dto = {
          newFormat: true,
          rute2: "proposals/" + root.propuesta.id + "/risks",
          stringEP: "risks",
          mod: obj.id,
          objectSend: JSON.parse(`{ "risk": ` + JSON.stringify(obj) + "}"),
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
      root.mode = "edit";
      console.log("data", data);
      root.baseObj = data;
      //root.panelCmdBack.fadeOut();
      root.panelCmds.fadeOut();
      root.panelGrid.fadeOut(function (params) {
        root.panelData.fadeIn(function (params) {});
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
        root.panelData.fadeIn(function (params) {});
      });
    },

    cancel() {
      console.log("CANCEL!");
      root.panelData.fadeOut(function (params) {
        root.panelCmds.fadeIn();
        root.panelGrid.fadeIn(function (params) {});
      });
    },

    active(data, state) {
      // console.clear();
      console.log("active", data);
      console.log("state", state);
      let a = state ? "activar" : "desactivar";
      let am = state ? "Activando" : "Desactivando";
      let msg = `¿Realmente desea ${a} el grupo con id: <span class='text-sb'>"${
        data.data[root.titlecolum]
      }"</span>?`;
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
            url: `risks/${data.data.id}`,
            data: JSON.parse(`{ "risk" :` + active + "}"),
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

    onContentReady() {},
  },
};
</script>