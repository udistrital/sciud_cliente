<template>
  <div class="col mt-3 pl-1 pr-1" :id="namePanel">
    <div class="row">
      <div class="col">
        <div class="p-0">
          <div class="page-header header-elements-md-inline mb-2">
            <div class="page-title p-0 m-0">
              <h1>
                <i class="icon-calendar mr-2 color-main-600"></i>
                <span class="font-weight-semibold"
                  >Cronograma de actividades</span
                >
                <span class="item-title"></span>
              </h1>
            </div>
            <div class="header-elements">
              <span class="cmds">
                <button
                  v-if="permisoGuardar"
                  type="button"
                  @click.prevent="add()"
                  title="Crear nueva actividad..."
                  class="btn btn-main btn-labeled btn-labeled-left"
                >
                  <b><i class="icon-database-add"></i></b> Nueva actividad
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

    <div class="row data slide">
      <div class="col">
        <div class="card">
          <div class="card-header main">
            <i class="icon-pencil3 mr-2"></i>
            <span class="font-weight-semibold"
              >{{ mode == "edit" ? "Editar" : "Nueva" }} actividad</span
            >
          </div>
          <div class="card-body mb-0 pb-0 pt-3">
            <DxValidationGroup ref="vGroup">
              <div class="row">
                <div class="col-7">
                  <div class="form-group mb-3">
                    <label>Nombre:</label>
                    <DxTextBox
                      :show-clear-button="true"
                      :max-length="300"
                      :read-only="!editing"
                      class="form-control"
                      :value.sync="base_obj.name"
                      placeholder="Nombre de la actividad"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>
                <div class="col-2">
                  <div class="form-group">
                    <label>Fecha de inicio:</label>
                    <DxDateBox
                      id="start_date"
                      @focus-in="date_focus_in"
                      @focus-out="date_focus_out"
                      class="form-control"
                      :read-only="!editing"
                      @value-changed="setDate"
                      :value.sync="base_obj.start_date"
                      placeholder="dd/mm/yyyy"
                      display-format="dd/MM/yyyy"
                      :max="maxDate"
                      type="date"
                    >
                      <!-- :min="actualDate" -->
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxDateBox>
                  </div>
                </div>
                <div class="col-2">
                  <div class="form-group">
                    <label>Fecha de cierre:</label>
                    <DxDateBox
                      id="end_date"
                      @focus-in="date_focus_in"
                      @focus-out="date_focus_out"
                      class="form-control"
                      @value-changed="setDate"
                      :value.sync="base_obj.end_date"
                      placeholder="dd/mm/yyyy"
                      display-format="dd/MM/yyyy"
                      :read-only="!editing"
                      :min="startDate"
                      type="date"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxDateBox>
                  </div>
                </div>
                <div class="col-1">
                  <div class="form-group">
                    <label>Duración:</label>
                    <DxTextBox
                      :show-clear-button="false"
                      :read-only="true"
                      class="form-control"
                      :value.sync="base_obj.duration"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group mb-3">
                    <label>Descripción de la actividad:</label>
                    <DxTextArea
                      :height="60"
                      :max-length="1000"
                      :show-clear-button="true"
                      :read-only="!editing"
                      class="form-control"
                      :value.sync="base_obj.description"
                      placeholder="Descripción de la actividad"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextArea>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group mb-3">
                    <label>Entregable de la actividad:</label>
                    <DxTextArea
                      :height="60"
                      :max-length="1000"
                      :show-clear-button="true"
                      :read-only="!editing"
                      class="form-control"
                      :value.sync="base_obj.deliverable"
                      placeholder="Entregable de la actividad"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextArea>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group mb-2">
                    <label>Objetivo(s) específico(s):</label>
                    <DxTagBox
                      :read-only="!editing"
                      class="form-control"
                      :search-enabled="true"
                      :show-selection-controls="true"
                      :value.sync="base_obj.objective_ids"
                      beginUpdate
                      placeholder="Seleccione los objetivos específicos asociados a la actividad"
                      value-expr="id"
                      display-expr="description"
                      :data-source="objectives"
                      @value-changed="objectivesChange"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTagBox>
                  </div>
                </div>
              </div>
            </DxValidationGroup>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col">
                <a
                  href="#"
                  id="btn-cancel"
                  @click.prevent="cancel"
                  class="
                    btn btn-main btn-labeled btn-labeled-left btn-sm
                    legitRipple
                  "
                >
                  <b><i class="icon-database-remove"></i></b> CANCELAR
                </a>
              </div>
              <div class="col text-right">
                <a
                  href="#"
                  id="btn-save"
                  @click.prevent="save"
                  :class="'btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple'"
                >
                  <b><i class="icon-database-add"></i></b> GUARDAR
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
            <DxColumnChooser :enabled="false" mode="dragAndDrop" />
            <!-- <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" /> -->
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
            <DxColumn
              data-field="id"
              caption="ID"
              data-type="string"
              alignment="center"
              :visible="true"
              :allow-grouping="false"
              width="110"
            />
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
              :allow-filtering="false"
              :visible="true"
              data-field="start_date"
              caption="Fecha inicio"
              alignment="center"
              data-type="date"
              format="dd/MM/yyyy"
              :width="130"
            />
            <DxColumn
              :allow-filtering="false"
              :visible="true"
              data-field="end_date"
              caption="Fecha fin"
              alignment="center"
              data-type="date"
              format="dd/MM/yyyy"
              :width="130"
            />
            <DxColumn
              :allow-filtering="false"
              :visible="true"
              data-field="duration"
              caption="Duración"
              alignment="center"
              data-type="int"
              :width="80"
              cell-template="tpl_dias"
            />
            <template #tpl_dias="{ data }">
              {{ data.data.duration }} días
            </template>
            <DxColumn
              data-field="active"
              caption="Activo"
              data-type="string"
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
            <template #tpl="{ data }">
              <span class="cmds">
                <a
                  title="Editar..."
                  class="cmd-item color-main-600"
                  @click.prevent="edit(data.data)"
                  href="#"
                >
                  <i class="icon-database-edit"></i>
                </a>
                <a
                  v-if="data.data.active"
                  title="Desactivar..."
                  class="cmd-item color-main-600 mr-2"
                  @click.prevent="active(data, false)"
                  href="#"
                >
                  <i class="icon-database-remove"></i>
                </a>
                <a
                  v-else
                  title="Activar..."
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
      <div class="card-body color-text">
        <b>mode:</b> {{ mode }}<br />
        <b>editing:</b> {{ editing }}<br />
        <b>startDate:</b> {{ startDate }}<br />
        <b>maxDate:</b> {{ maxDate }}<br />
        <b>base_obj:</b> {{ base_obj }}<br />
        <b>base_obj_copy:</b> {{ base_obj_copy }}
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
            <span class="font-weight-semibold">{{ base_obj[titlecolum] }}</span>
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
  DxGrouping,
  DxGroupItem,
  DxGroupPanel,
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
  DxTagBox,
  DxDateBox,
  DxSelectBox,
  DxButton,
  DxSwitch,
  DxTextBox,
  DxNumberBox,
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
    DxTagBox,
    DxSearchPanel,
    DxSelectBox,
    DxSorting,
    DxSummary,
    DxTextArea,
    DxTextBox,
    DxValidator,
    DxValidationGroup,
    DxSwitch,
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
    editing: {
      type: Boolean,
      default: () => true,
    },
    permisoGuardar: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    startDate: null,
    maxDate: null,
    objectives: [],
    namePanel: "proyecto-objetivos",
    titlecolum: "Cronograma de Actividades",
    titleBtn: "Nueva actividad",
    title: "Cronograma de Actividades",
    base_obj_copy: {},
    base_obj: {
      id: 0,
      proposal_id: 0,
      name: null,
      description: null,
      start_date: new Date(),
      end_date: new Date(),
      duration: 0,
      deliverable: null,
      objective_ids: [],
      active: true,
      created_by: null,
      updated_by: null,
    },
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
    proposal: null,
    docLink: null,
    firstLoad: true,
    now: new Date(),
    participationid: null,
    urlPattern: /^(http|https):\/\/[^ "]+$/,
    phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
  }),
  created() {
    root = this;
    root.base_obj_copy = root.$clone(root.base_obj);
  },
  async mounted() {
    console.clear();
    root.base_obj.proposal_id = root.propuesta.id;
    root.base_obj_copy = root.$clone(root.base_obj);
    root.panelData = $("#" + root.namePanel + " .data");
    root.panelGrid = $("#" + root.namePanel + " .grid");
    root.panelCmds = $("#" + root.namePanel + " .cmds");
    root.panelCmdBack = $("#" + root.namePanel + " .cmds-back");
    root.loaderMessage = "Cargando Objetivos";
    root.loaderElement = "#" + root.namePanel + " .grid";
    if (root.startDate == null) root.startDate = root.actualDate;
    await root.getSinData({
      url: `/proposals/${root.propuesta.id}`,
      cb: async function (results) {
        console.log(root.$sep);
        root.proposal = results;
        console.log("root.proposal =>", root.proposal);
      },
    });
  },
  computed: {
    actualDate() {
      return new Date();
    },
    dataSource: function () {
      if (typeof this.propuesta.id === "undefined") return null;
      console.log("root.propuesta", root.propuesta);
      return DxStore({
        key: ["id"],
        endPoint: `proposals/${root.propuesta.id}/activity_schedules`,
        onLoading: function (loadOptions) {
          root.loaderShow("Cargando elementos", "#panel-produccion .card-body");
        },
        onLoaded: function (results, baseEntity) {
          // console.clear();
          console.log("results =>", results);
          root.totaCount = results.totalCount;
          root.getObjetives();
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

    setDuration() {},
    objectivesChange(e) {
      console.log("e =>", e);
    },
    beginUpdate(e) {
      console.log("e =>", e);
    },
    setDate(e) {
      // console.clear();
      console.log(root.$sep);
      let id = $(e.element).attr("id");
      console.log("id =>", id);
      console.log("e =>", e);
      var d = new Date(e.value);
      if (id == "start_date") {
        d.setDate(d.getDate() + 1);
        root.startDate = d;
      }
      if (id == "end_date") {
        root.maxDate = d;
      }
      if (root.base_obj.end_date != null) {
        console.log("typeof =>", typeof root.base_obj.start_date);
        // root.base_obj.duration = Math.round((root.base_obj.end_date - root.base_obj.start_date) / (1000 * 60 * 60 * 24));
        // root.base_obj.duration = Math.round((root.base_obj.end_date - root.base_obj.start_date) / (1000 * 60 * 60 * 24)) + " días";
        root.base_obj.duration =
          root.get_day_diff(root.base_obj.start_date, root.base_obj.end_date) +
          " días";
      }
    },

    async getObjetives() {
      await root.getSinData({
        url:
          "/proposals/" +
          root.propuesta.id +
          '/objectives?skip=0&sort=[{"selector":"id","desc":true}]', //,filter=["parent_id","=","null"]',
        cb: function (results) {
          if (results.data.length > 0) {
            console.log(root.$sep);
            // 202207291827: Filtra solo los objetivos específicos
            root.objectives = results.data.filter((o) => o.parent_id != null);
            console.log("objectives =>", root.objectives);
          }
          root.loaderHide();
        },
      });
    },

    retorno() {
      console.log(root.section);
      root.panelCmdBack.fadeOut();
      $("#" + root.namePanel + " .item-title").html("");
      root.base_obj = this.$clone(root.baseEnt);
      root.section = null;
    },

    save() {
      console.log(this.$sep);
      let result = root.$refs.vGroup.instance.validate();
      console.log("result", result);
      if (result.isValid) {
        console.log("VALID!");
        root.scrollTop();
        root.panelCmds.fadeOut();
        let msg =
          (root.mode == "add" ? "Creando" : "Actualizando") + " actividad";
        root.loaderShow(msg, root.panelData);
        if (root.mode == "add") root.base_obj.created_by = root.user_id;
        if (root.mode == "edit") root.base_obj.updated_by = root.user_id;
        root.base_obj.duration = parseInt(
          root.base_obj.duration.replace(" días", "")
        );
        let obj = root.base_obj;
        let dto = {
          newFormat: true,
          rute2: "proposals/" + root.propuesta.id + "/activity_schedules",
          stringEP: "activity_schedules",
          mod: obj.id,
          objectSend: JSON.parse(
            `{ "activity_schedule": ` + JSON.stringify(obj) + "}"
          ),
          cb: function (item) {
            console.log("item", item);
            root.grid.refresh();
            root.cancel();
          },
        };
        console.log("root.mode", root.mode);
        if (root.mode == "edit") root.objUpdate(dto);
        else root.objSave(dto);
        root.updateProposal();
      }
    },

    async updateProposal() {
      console.log(this.$sep);
      console.log("updateProposal()");
      await root.getSinData({
        url: `proposals/${root.propuesta.id}/activity_schedules`,
        cb: async function (results) {
          if (results.data.length > 0) {
            console.clear();
            console.log("results.data =>", results.data);
            root.cancel();
            let min = [];
            let max = [];
            results.data.forEach((item) => {
              min.push(root.get_date(item.start_date));
              max.push(root.get_date(item.end_date));
            });
            console.log("min =>", min);
            console.log("max =>", max);
            let minD = root.get_min_date(min);
            let maxD = root.get_max_date(max);
            console.log("minDate =>", minD);
            console.log("maxDate =>", maxD);
            let dayDuration = root.get_day_diff(minD, maxD);
            console.log("dayDuration =>", dayDuration);
            root.proposal.duration = dayDuration;
            root.objUpdate({
              newFormat: true,
              mod: root.proposal.id,
              stringEP: "proposals",
              rute2:
                "calls/" + root.$route.params.convocatoriaId + "/proposals",
              objectSend: JSON.parse(
                `{ "proposal": ` + JSON.stringify(root.proposal) + "}"
              ),
              cb: function (item) {
                console.log(root.$sep);
                console.log("updated proposal =>", item);
                console.log("root.$emit =>", root.$emit);
                root.$emit("update-proposal", item);
                root.cancel();
              },
            });
          }
        },
      });
    },

    edit(data) {
      console.clear();
      root.mode = "edit";
      console.log("data =>", data);
      root.base_obj = root.$clone(data);
      root.base_obj.start_date = root.toDate(root.base_obj.start_date);
      root.base_obj.end_date = root.toDate(root.base_obj.end_date);
      console.log("duration =>", data.duration);
      //root.panelCmdBack.fadeOut();
      root.panelCmds.fadeOut();
      root.panelGrid.fadeOut(function (params) {
        root.panelData.fadeIn(function (params) {});
      });
    },

    add() {
      console.log("ADD");
      root.mode = "add";
      root.base_obj = root.$clone(root.base_obj_copy);
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
        root.mode = null;
        root.panelCmds.fadeIn();
        root.panelGrid.fadeIn(function (params) {});
        root.base_obj = root.$clone(root.base_obj_copy);
        root.$refs.vGroup.instance.reset();
        root.loaderHide();
      });
    },

    active(data, state) {
      // console.clear();
      console.log("active", data);
      console.log("state", state);
      let a = state ? "activar" : "desactivar";
      let am = state ? "Activando" : "Desactivando";
      let msg = `¿Realmente desea ${a} el objetivo con id <span class='text-sb'>"${data.data.id}"</span>?`;
      this.$confirm(msg, function (si_no) {
        console.log("result", si_no);
        if (si_no) {
          root.loaderShow(`${am}`);
          let active = JSON.stringify({
            active: state,
            updated_by: root.user_id,
          });
          var dto = {
            newFormat: true,
            url: `activity_schedules/${data.data.id}`,
            data: JSON.parse(`{ "activity_schedule" :` + active + "}"),
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
