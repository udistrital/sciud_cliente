<template>
  <div class="col mt-3 pl-1 pr-1" :id="namePanel">
    <div class="row">
      <div class="col">
        <div class="p-0">
          <div class="page-header header-elements-md-inline mb-2">
            <div class="page-title p-0 m-0">
              <h1>
                <i class="icon-feed mr-2 color-main-600"></i>
                <span class="font-weight-semibold">Impactos</span>
                <span class="item-title"></span>
              </h1>
            </div>
            <div class="header-elements">
              <span class="cmds">
                <button
                  v-if="permisoGuardar"
                  type="button"
                  @click.prevent="add()"
                  title="Crear nuevo impacto..."
                  class="btn btn-main btn-labeled btn-labeled-left"
                >
                  <b><i class="icon-database-add"></i></b> Nuevo impacto
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
              >{{ mode == "edit" ? "Editar" : "Nuevo" }} impacto</span
            >
          </div>
          <div class="card-body mb-0 pb-0 pt-3">
            <DxValidationGroup ref="vGroup">
              <div class="row">
                <div class="col-3">
                  <div class="form-group mb-3">
                    <label>Tipo de impacto:</label>
                    <DxSelectBox
                      :show-clear-button="true"
                      :grouped="false"
                      :data-source="tipos_impacto"
                      :value.sync="base_obj.impact_type_id"
                      :search-enabled="false"
                      @value-changed="impactoSelected"
                      placeholder="Seleccione..."
                      class="form-control"
                      display-expr="st_name"
                      value-expr="id"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxSelectBox>
                  </div>
                </div>
                <div class="col-7">
                  <div class="form-group mb-3">
                    <label>Indicador:</label>
                    <DxSelectBox
                      :show-clear-button="true"
                      :grouped="false"
                      :data-source="indicadores"
                      :value.sync="base_obj.indicator_id"
                      :search-enabled="false"
                      placeholder="Seleccione..."
                      class="form-control"
                      value-expr="id"
                      display-expr="ind_description"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxSelectBox>
                  </div>
                </div>
                <div class="col-2">
                  <div class="form-group mb-3">
                    <label>Plazo de consecución:</label>
                    <DxSelectBox
                      :show-clear-button="true"
                      :grouped="false"
                      :data-source="plazos"
                      :value.sync="base_obj.term_id"
                      :search-enabled="false"
                      placeholder="Seleccione..."
                      class="form-control"
                      display-expr="st_name"
                      value-expr="id"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxSelectBox>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group mb-3">
                    <label>Descripción del impacto:</label>
                    <DxTextArea
                      :height="80"
                      :max-length="1000"
                      :show-clear-button="true"
                      :read-only="!editing"
                      class="form-control"
                      :value.sync="base_obj.description"
                      placeholder="Descripción del impacto"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextArea>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group mb-3">
                    <label>Meta:</label>
                    <DxTextArea
                      :height="80"
                      :max-length="1000"
                      :show-clear-button="true"
                      :read-only="!editing"
                      class="form-control"
                      :value.sync="base_obj.goal"
                      placeholder="Meta"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextArea>
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
            <DxSorting mode="single" /><!-- single, multiple, none" -->
            <DxPaging :page-size="10" />
            <DxFilterRow :visible="false" />
            <DxLoadPanel :enabled="false" />
            <DxGroupPanel :visible="false" :allow-column-dragging="true" />
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
            <!-- <DxColumn data-field="id" caption="ID" data-type="null" alignment="center" :visible="true" :allow-grouping="false" width="110" />
						<DxColumn data-field="name" caption="Nombre" :customize-text="nullText" data-type="null" alignment="left" :visible="true" :allow-grouping="false" /> -->
            <DxColumn
              :allow-filtering="false"
              :visible="true"
              data-field="impact_type_name"
              caption="Tipo de impacto"
              alignment="left"
              width="150"
            />
            <DxColumn
              :allow-filtering="false"
              :visible="true"
              data-field="indicator_description"
              caption="Indicador"
              alignment="left"
            />
            <DxColumn
              :allow-filtering="false"
              :visible="true"
              data-field="term_name"
              caption="Plazo"
              alignment="left"
              width="150"
            />
            <DxColumn
              data-field="active"
              caption="Activo"
              data-type="null"
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
    indicadores: [],
    plazos: null,
    tipos_impacto: null,
    namePanel: "proyecto-impactos",
    titlecolum: "Cronograma de impactoes",
    titleBtn: "Nuevo impacto",
    title: "Cronograma de impactoes",
    base_obj_copy: {},
    base_obj: {
      impact_type_id: null,
      indicator_id: null,
      description: null,
      goal: null,
      term_id: null,
      active: true,
      id: 0,
      impact_type_name: null,
      indicator_description: null,
      term_name: null,
      proposal_id: 0,
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
    docLink: null,
    firstLoad: true,
    now: new Date(),
    participationid: null,
    urlPattern: /^(http|https):\/\/[^ "]+$/,
    phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
  }),
  created() {
    root = this;
    root.plazos = root.subtypesByType("proyecto_indicador_meta_plazo", "id");
    root.tipos_impacto = root.subtypesByType("proyecto_tipo_impacto");
    root.base_obj_copy = root.$clone(root.base_obj);
  },
  mounted() {
    // console.clear();
    root.base_obj.proposal_id = root.propuesta.id;
    root.base_obj_copy = root.$clone(root.base_obj);
    root.panelData = $("#" + root.namePanel + " .data");
    root.panelGrid = $("#" + root.namePanel + " .grid");
    root.panelCmds = $("#" + root.namePanel + " .cmds");
    root.panelCmdBack = $("#" + root.namePanel + " .cmds-back");
    root.loaderMessage = "Cargando Objetivos";
    root.loaderElement = "#" + root.namePanel + " .grid";
    if (root.startDate == null) root.startDate = root.actualDate;
  },
  computed: {
    ...mapGetters("core/tipo", ["subtypesByType"]),
    actualDate() {
      return new Date();
    },
    dataSource: function () {
      if (typeof this.propuesta.id === "undefined") return null;
      console.log("root.propuesta", root.propuesta);
      return DxStore({
        key: ["id"],
        endPoint: `proposals/${root.propuesta.id}/impacts`,
        onLoading: function (loadOptions) {
          // root.loaderShow("Cargando elementos", "#panel-produccion .card-body");
        },
        onLoaded: function (results, baseEntity) {
          // console.clear();
          console.log("results =>", results);
          root.totaCount = results.totalCount;
          // root.getObjetives();
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
    async impactoSelected(e) {
      // console.clear();
      console.log("e =>", e);
      if (e.value !== null) {
        root.loaderShow("Cargando indicadores", root.panelData);
        await root.getSinData({
          url: `/indicators?filter=[["subtype_id","=",${e.value}],"and",["active","=",true]]&sort=[{"selector":"ind_description","desc":true}]`,
          cb: function (results) {
            if (results.data.length > 0) {
              console.log(root.$sep);
              // 202207291827: Filtra solo los objetivos específicos
              root.indicadores = window.vm.$objectSort(
                results.data,
                "ind_description"
              );
              // root.indicadores = results.data.filter((o) => o.parent_id != null);
              console.log("indicadores =>", root.indicadores);
            }
            root.loaderHide();
          },
        });
      }
    },
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
        root.base_obj.duration =
          Math.round(
            (root.base_obj.end_date - root.base_obj.start_date) /
              (1000 * 60 * 60 * 24)
          ) + " días";
      }
    },

    async getObjetives() {
      await root.getSinData({
        url:
          "/proposals/" +
          root.propuesta.id +
          '/indicadores?skip=0&sort=[{"selector":"id","desc":true}]', //,filter=["parent_id","=","null"]',
        cb: function (results) {
          if (results.data.length > 0) {
            console.log(root.$sep);
            // 202207291827: Filtra solo los objetivos específicos
            root.indicadores = results.data.filter((o) => o.parent_id != null);
            console.log("indicadores =>", root.indicadores);
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
          (root.mode == "add" ? "Creando" : "Actualizando") + " Impacto";
        root.loaderShow(msg, root.panelData);
        if (root.mode == "add") root.base_obj.created_by = root.user_id;
        if (root.mode == "edit") root.base_obj.updated_by = root.user_id;
        let obj = root.base_obj;
        let dto = {
          newFormat: true,
          rute2: "proposals/" + root.propuesta.id + "/impacts",
          stringEP: "impacts",
          mod: obj.id,
          objectSend: JSON.parse(`{ "impact": ` + JSON.stringify(obj) + "}"),
          cb: function (item) {
            console.log("item", item);
            root.grid.refresh();
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
      // console.clear();
      root.mode = "edit";
      console.log("data =>", data);
      root.base_obj = root.$clone(data);
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
      // console.clear();
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
      let msg = `¿Realmente desea ${a} el ítem seleccionado?`;
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
            url: `impacts/${data.data.id}`,
            data: JSON.parse(`{ "impact" :` + active + "}"),
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
