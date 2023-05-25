<template>
  <div>
    <div class="page-header header-elements-md-inline">
      <div class="page-title d-flex">
        <h1>
          <i class="icon-paperplane mr-1 color-main-600"></i>
          <span class="font-weight-semibold">Seguimiento de Proyectos</span>
          &raquo; Aspirantes Aprobados
        </h1>
      </div>
      <div class="header-elements">
        <!-- <router-link
            tag="a"
            :to="'/convocatoria'"
            class="btn btn-main btn-labeled btn-labeled-left legitRipple"
            title="Regresar al listado de convocatorias"
          >
            <b><i class="icon-arrow-left2"></i></b>Aprobados
          </router-link> -->
      </div>
    </div>

    <div class="row slide" id="panel-roleUsers-data">
      <div class="col">
        <div class="card main">
          <div class="card-header main"></div>

          <div class="card-body pb-0 pt-2">
            <div class="row mr-3">
              <div class="col text-left">
                <h1>
                  <i class="icon-paperplane mr-1 color-main-600"></i>
                  <span class="font-weight-semibold">Evento: </span> &raquo;
                  {{ baseObj.event_name }}
                </h1>
              </div>
              <div class="col text-right">
                <DxButton @click="cancel" class="nb">
                  <template #default>
                    <span
                      class="
                        btn btn-main btn-labeled btn-labeled-left
                        legitRipple
                      "
                    >
                      <b><i class="icon-arrow-left2"></i></b> Regresar a eventos
                    </span>
                  </template>
                </DxButton>
              </div>
            </div>
          </div>

          <div class="card-body pb-0 pt-2">
            <DxValidationGroup ref="basicGroup">
              <criteriosEvaluacion
                :group="{ id: 1 }"
                :baseObj="baseObj"
                :key="baseObj.id"
                :reference="this"
              ></criteriosEvaluacion>
            </DxValidationGroup>
          </div>
        </div>
      </div>
    </div>

    <div class="row" id="panel-roleUsers-grid">
      <div class="col">
        <div class="card" id="data-container">
          <div class="card-body pt-3 mh">
            <div class="page-header header-elements-md-inline">
              <div class="page-title d-flex">
                <h1>
                  <i class="icon-list mr-1 color-main-600"></i>
                  <span class="font-weight-semibold"
                    >Listado participantes
                  </span>
                </h1>
              </div>
            </div>
            <div id="grid slide" class="pb-2">
              <DxDataGrid
                class="main"
                width="100%"
                @initialized="gridInit"
                @content-ready="onContentReady"
                :allow-column-reordering="true"
                no-data-text="No hay artículos registrados"
                :data-source="dataSource"
                :remote-operations="true"
                :hover-state-enabled="true"
                :row-alternation-enabled="true"
                :show-borders="false"
              >
                <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
                <DxSorting mode="multiple" /><!-- single, multiple, none" -->
                <DxPaging :page-size="50" />
                <DxFilterRow :visible="true" />
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
                    display-format="{0} artículos"
                  />
                </DxSummary>
                <DxPager
                  :show-info="true"
                  :show-page-size-selector="true"
                  :show-navigation-buttons="true"
                  :allowed-page-sizes="dgPageSizes"
                  info-text="Página {0} de {1} ({2} artículos)"
                />
                <DxSearchPanel
                  :visible="false"
                  :highlight-case-sensitive="true"
                />
                <!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->
                <DxColumn
                  data-field="id"
                  caption="ID"
                  sort-order="asc"
                  data-type="number"
                  alignment="center"
                  :visible="true"
                  :allow-grouping="false"
                  :allow-filtering="false"
                  :sort-index="0"
                  width="80"
                />

                <!-- <DxColumn data-field='state_name' caption='Aplicación' data-type='string' alignment='center'
                              :visible='true'  :group-index="0"  /> -->

                <!--<DxColumn
                    :allow-filtering="true"
                    data-field="proposal_status_id"
                    caption="Estado Aplicación"
                    data-type="number"
                    alignment="left"
                    width="100"
                    :visible="true"
                  >
                    <DxLookup
                      :data-source="listEstadosEval"
                      value-expr="id"
                      display-expr="st_name"
                    />
                  </DxColumn>-->
                  <DxColumn
                    :allow-filtering="false"
                    caption="Acta"
                    data-type="string"
                    alignment="center"
                    :width="100"
                    :visible="true"
                    cell-template="tplcode"
                  />
                    <template #tplcode="{ data }">
                      {{ data.data.created_at.substr(0,4) }}-{{data.data.call_id}}-{{data.data.id}}
                    </template>
                <DxColumn
                  data-field="call_code"
                  caption="Cod. Convocatoria"
                  data-type="number"
                  alignment="center"
                  :visible="true"
                  :allow-grouping="false"
                  :allow-filtering="false"
                />
                -->
                <DxColumn
                  data-field="title"
                  caption="Titulo"
                  data-type="string"
                  alignment="left"
                  :visible="true"
                  :allow-grouping="false"
                  :allow-filtering="false"
                />

                <DxColumn
                  data-field="project_type_name"
                  caption="Tipo de proyecto"
                  data-type="string"
                  alignment="left"
                  :visible="true"
                  :allow-grouping="false"
                  :allow-filtering="false"
                />

                <DxColumn
                  data-field="description"
                  caption="Descripción"
                  data-type="string"
                  alignment="left"
                  :visible="true"
                  :allow-grouping="false"
                  :allow-filtering="false"
                  width="50%"
                />

                <DxColumn
                  data-field="active"
                  :allow-filtering="false"
                  caption="Activo"
                  data-type="string"
                  alignment="center"
                  :visible="true"
                  :customize-text="yesNo"
                  width="70"
                />

                <DxColumn
                  :width="80"
                  alignment="center"
                  cell-template="tpl"
                  caption=""
                  name="cmds"
                  :fixed="true"
                  fixed-position="right"
                />

                <template #tplUrl="{ data }">
                  <a
                    v-if="data.data.web_page != ''"
                    :title="data.data.url"
                    class="cmd-item color-main-600 mr-2"
                    :href="data.data.web_page"
                    Target="_blank"
                  >
                    <i class="icon-link"></i> Visitar
                  </a>
                  <a
                    v-else
                    title="No dispone de Url"
                    class="cmd-item color-main-600 mr-2"
                    href="#"
                    >-</a
                  >
                </template>

                <template #tplEmail="{ data }">
                  <span
                    v-if="data.value && data.value.toString().trim() !== 'NULL'"
                  >
                    <a
                      class="color-main-600"
                      :href="'mailto:' + data.value"
                      :title="'Escribir a \'' + data.value.trim() + '\'...'"
                      ><i class="icon-envelop3"></i>
                    </a>
                    <a
                      href=""
                      class="ml-2 color-main-600"
                      v-if="
                        data.value && data.value.toString().trim() !== 'NULL'
                      "
                      @click.prevent="
                        $toClipboard(data.value.toString().trim())
                      "
                      :title="
                        'Copiar \'' +
                        data.value.toString().trim() +
                        '\'\r\nal portapapeles'
                      "
                      ><i class="icon-copy2"></i>
                    </a>
                  </span>
                  <span v-else> -- </span>
                </template>

                <template #tpl="{ data }">
                  <span class="cmds">
                    <span v-if="editMode">
                      <a
                        title="Evaluar..."
                        class="cmd-item color-main-600"
                        @click.prevent="edit(data.data)"
                        href="#"
                      >
                        <i class="icon-pencil"></i>
                      </a>
                      <!-- <a v-if="data.data.active" title="Desactivar participante..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
                                          <i class="icon-database-remove"></i>
                                      </a>
                                      <a v-else title="Activar participante..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
                                          <i class="icon-database-check"></i>
                                      </a> -->
                    </span>
                  </span>
                </template>
              </DxDataGrid>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="is_dev && debug">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <strong>baseObj:</strong> {{ JSON.stringify(baseObj, null, 3) }}
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <strong>dataUserLogin:</strong>
            {{ JSON.stringify(dataUserLogin, null, 3) }}
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <strong>groupResearchers:</strong>
            {{ JSON.stringify(groupResearchers, null, 3) }}
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <strong>porcentajes convocatoria:</strong>
            {{ JSON.stringify(promedioconv, null, 3) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root = null,
  $ = window.jQuery;
// 202103081123: Grilla DX
import DxStore from "@/store/dx";
import {
  DxColumn,
  DxColumnChooser,
  DxColumnFixing,
  DxDataGrid,
  DxEditing,
  DxFilterRow,
  DxGrouping,
  DxGroupItem,
  DxGroupPanel,
  DxLoadPanel,
  DxLookup,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxSorting,
  DxStateStoring,
  DxSummary,
} from "devextreme-vue/data-grid";
import {
  DxButton,
  DxDateBox,
  DxDropDownButton,
  DxFileUploader,
  DxNumberBox,
  DxSelectBox,
  DxSwitch,
  DxTagBox,
  DxTextArea,
  DxTextBox,
  DxValidationGroup,
} from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import {
  DxValidator,
  DxRequiredRule,
  DxCustomRule,
} from "devextreme-vue/validator";
import { mapActions, mapGetters, mapState } from "vuex";
// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
  name: "inicio",

  components: {
    DxButton,
    DxColumn,
    DxColumnChooser,
    DxColumnFixing,
    DxCustomRule,
    DxDataGrid,
    DxDateBox,
    DxDropDownButton,
    DxEditing,
    DxFileUploader,
    DxFilterRow,
    DxGrouping,
    DxGroupItem,
    DxGroupPanel,
    DxLoadPanel,
    DxLookup,
    DxNumberBox,
    DxNumberBoxButton,
    DxPager,
    DxPaging,
    DxRequiredRule,
    DxSearchPanel,
    DxSelectBox,
    DxSorting,
    DxSummary,
    DxSwitch,
    DxTagBox,
    DxTextArea,
    DxTextBox,
    DxValidationGroup,
    DxValidator,
    DxStateStoring,
    // DxEmailRule, DxStringLengthRule, DxPatternRule,
    // Usuario: () => import("@/components/element/usuario"),
    // Geo: () => import("@/components/element/geo"),
    criteriosEvaluacion: () =>
      import("@/modules/convocatoria/movilidad/form_aceptacion_aspirantes.vue"),
  },

  data: () => ({
    estado_proyecto: null,
    listEstadosEval: null,
    tiposPermiso: null, //[{id:1, name: "Roles de Grupo"},{id:2, name: "Roles de semillero"},{id:3, name: "Grupo y Semillero"}],
    modeEdit: false,
    dataUserLogin: null,
    endPointRute: "role",
    objEpdata: "role",
    totaCount: 0,
    type_id: null,
    validator: null,
    grid: null,
    mode: null,
    grupo: null,
    results: "",
    panelCmd: null,
    panelGrid: null,
    panelData: null,
    validateType: false,
    testId: "1032479929",
    isValid: false,
    subtypes_current: [],
    baseObjBk: null,
    naturaleza: [],
    tipoEntidad: [],
    tipoDocumento: [],
    digito: [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
    ],
    urlPattern: /^(http|https):\/\/[^ "]+$/,
    phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
    datauser: { name: "", cc: "" },
    promedioconv: {},
    groupResearchers: [],
    baseObj: {},

    lookupData: ["Not Started", "Need Assistance", "In Progress"],
  }),

  created() {
    root = this;
    root.baseEnt = this.$clone(this.baseObj);
    //   root.listEstadosEval = root.subtypesByType("estado_criterios_evaluacion");
    root.estado_proyecto = root.get_sub_type_id("Aprobado");
  },

  async mounted() {
    root = this;
    root.filterByEstate();
    root.loaderShow("Cargando participantes");
    root.validator = root.$refs.basicGroup.instance;
    root.baseObj.created_by = root.user_id;
    root.baseObj.updated_by = root.user_id;
    // this.getAllRoles();

    let usersys = root.user;

    let id = parseInt(root.user.local.identification_number);

    //esto funciona para saber los datos de usuario con idoas       researcher_research_units?identification_number=9872650
    let oas_user = await root.getOasUser({ doc: id });
    console.warn("usuario", oas_user);
    let t = oas_user;
    root.datauser = t.TerceroId;
    //fin para saber datos usuario desde la oas con idoas

    // console.warn("usuario nombre completo ",  t.NombreCompleto);

    let root_id = "#panel-roleUsers";
    root.panelCmd = $(`${root_id}-cmds`);
    root.panelGrid = $(`${root_id}-grid`);
    root.panelData = $(`${root_id}-data`);
    console.log("User", root.user);
  },

  computed: {
    ...mapGetters("auth/usuario", ["groupRoles"]),
    ...mapState("core/tipo", ["types", "subtypes"]),
    ...mapGetters("core/tipo", ["subtypesByType"]),
    dataSource: function () {
      // if (typeof this.group.id === "undefined") return null;
      // console.log("root.group", this.group);
      return DxStore({
        key: ["id"],
        stringParam:
          'filter=["proposal_status_id","=",' + root.estado_proyecto + "]",
        endPoint: `/proposals`,

        onLoading: function (loadOptions) {
          root.loaderShow(
            "Cargando participantes",
            "#panel-produccion .card-body"
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
  },

  methods: {
    ...mapActions("auth/usuario", [
      "getUser",
      "saveUserAsync",
      "getOasUsers",
      "getOasUser",
    ]),
    ...mapActions("unidad/producto/universalSentUpAct", {
      objSave: "save",
      objUpdate: "update",
      elementoActive: "active",
      getSerarchDoc: "univerdalGet",
      getAll: "getAll",
    }),

    ...mapActions("unidad", ["getResearcher"]),

    validarTipo(e) {
      // 202104272101: Disable_Validation_Dynamically
      // https://js.devexpress.com/Documentation/Guide/UI_Components/Common/UI_Widgets/Data_Validation/#Disable_Validation_Dynamically
      console.log("validarTipo", root.validateType);
      console.log("e", e);
      if (root.validateType) {
        console.log("e", e);
        return e.value !== null;
      } else return true;
    },

    filterByEstate() {
      // let estado = root.listEstadosEval.find(element => element.st_name == 'En Evaluación');
      // root.grid.filter([[ "state_id", "=", estado.id ]]);
    },

    edit(data) {
      // root.$info("Cargando propuesta")
      root.go(
        data.id,
        `/proyecto/${data.id}`,
        "Cargando Propuesta <br/> Propuesta"
      );
    },

    cancel() {
      root.mode = null;
      console.log("CANCEL!");
      root.panelData.fadeOut(function () {
        // console.clear();
        root.validator.reset();
        root.baseObj = root.$clone(root.baseEnt);
        root.panelCmd.fadeIn();
        root.panelGrid.fadeIn();
      });
      root.grid.refresh();
    },

    gridInit(e) {
      this.grid = e.component;
    },

    onContentReady(e) {
      console.log(root._sep);
      console.log("onContentReady!", e);
    },
  },
};
</script>