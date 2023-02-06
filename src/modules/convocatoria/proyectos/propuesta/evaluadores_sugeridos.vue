<template>
  <div class="col mt-3 pl-1 pr-1" :id="namePanel">
    <div class="row">
      <div class="col">
        <div class="p-0">
          <div class="page-header header-elements-md-inline mb-2">
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
                  v-if="permisoGuardar"
                  title="Agregar Nuevo Grupo .."
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
                >{{ mode == "edit" ? "Editar o " : "Crear o " }} {{ titleBtn }}
              </span>
            </div>
            <div class="card-body mb-0 pb-0 pt-2">
              <div class="row">
                <!-- formulatio -->

                <div class="col-md-4">
                  <div class="form-group">
                    <label>Email: </label>
                    <DxTextBox
                      placeholder="Email"
                      class="form-control"
                      :value.sync="baseObj.email"
                      :read-only="noCambiarCorreo"
                    >
                      <DxValidator>
                        <DxRequiredRule
                          message="Es importante digitar correo de la entidad"
                        />
                        <DxEmailRule message="El correo es invalido" />
                        <DxRequiredRule />
                      </DxValidator>
                      <DxNumberBoxButton
                        :options="searchButton"
                        name="search"
                        location="after"
                      />
                    </DxTextBox>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <label>Nombre:</label>
                    <DxTextBox
                      :value.sync="baseObj.name"
                      placeholder="Nombre"
                      class="form-control"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <label>Numero Contacto:</label>
                    <DxNumberBox
                      ref="nbIdNum"
                      class="form-control"
                      :show-clear-button="true"
                      :value.sync="baseObj.mobile"
                      placeholder="Numero Contacto"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxNumberBox>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label>Vinculo CvLac: </label>
                    <DxTextBox
                      placeholder="Pagina CvLac"
                      class="form-control"
                      :value.sync="baseObj.cvlac_url"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                        <DxPatternRule
                          message="Por favor Ingrese el vinculo del CvLAC Ej: http://miweb.com/articulo"
                          :pattern="urlPattern"
                        />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label>Titulo Académico:</label>
                    <DxTextBox
                      :value.sync="baseObj.academic_title"
                      placeholder="Titulo Académico"
                      class="form-control"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextBox>
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
            <!-- <DxColumn data-field="id" caption="ID" data-type="string" alignment="center" :visible="true" :allow-grouping="false" width="110"/> -->
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
              data-field="academic_title"
              caption="Profesion"
              :customize-text="nullText"
              data-type="string"
              alignment="left"
              :visible="true"
              :allow-grouping="false"
            />

            <DxColumn
              data-field="mobile"
              caption="Contacto"
              :customize-text="nullText"
              data-type="string"
              alignment="left"
              :visible="true"
              :allow-grouping="false"
            />
            <DxColumn
              data-field="email"
              cell-template="tplEmail"
              width="90"
              caption="Correo"
              :customize-text="nullText"
              data-type="string"
              alignment="left"
              :visible="true"
              :allow-grouping="false"
            />
            <DxColumn
              data-field="cvlac_url"
              caption="CvLac"
              data-type="string"
              alignment="center"
              :visible="true"
              cell-template="tplWeb"
            />
            <!-- <DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="70" /> -->
            <DxColumn
              :width="90"
              alignment="center"
              cell-template="tpl"
              caption=""
              v-if="permisoGuardar"
            />

            <template #tplWeb="{ data }">
              <a
                v-if="data.data.cvlac_url != ''"
                :title="data.data.url"
                class="cmd-item color-main-600 mr-2"
                :href="data.data.cvlac_url"
                Target="_blank"
              >
                <i class="icon-link"></i> Direccionar
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
                >
                  <i class="icon-envelop3"></i>
                </a>
                <a
                  href=""
                  class="ml-2 color-main-600"
                  v-if="data.value && data.value.toString().trim() !== 'NULL'"
                  @click.prevent="$toClipboard(data.value.toString().trim())"
                  :title="
                    'Copiar \'' +
                    data.value.toString().trim() +
                    '\'\r\nal portapapeles'
                  "
                >
                  <i class="icon-copy2"></i>
                </a>
              </span>
              <span v-else> -- </span>
            </template>

            <template #tpl="{ data }">
              <span class="cmds">
                <span>
                  <!-- <a
                    title="Editar elemento..."
                    class="cmd-item color-main-600"
                    @click.prevent="edit(data.data)"
                    href="#"
                  >
                    <i class="icon-database-edit"></i>
                  </a> -->
                  <a
                    title="Desactivar Evaluador..."
                    class="cmd-item color-main-600 mr-2"
                    @click.prevent="active(data)"
                    href="#"
                  >
                    <i class="icon-database-remove"></i>
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
      <div class="card-body">
        <pre>
investigador:
				{{ JSON.stringify(investigador, null, "\t") }} </pre
        >
      </div>
      <div class="card-body">
        <pre>
arrayEvaluadores:
				{{ JSON.stringify(arrayEvaluadores, null, "\t") }} </pre
        >
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
  DxTextArea,
  DxValidationGroup,
  DxPopup,
} from "devextreme-vue";
import { mapState, mapActions, mapGetters } from "vuex";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import { setTimeout } from "timers";

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
    DxNumberBoxButton,
    DxEmailRule,
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
    namePanel: "proyecto-grupos",
    titlecolum: "id",
    titleBtn: "Anexar Evaluador",
    title: "Evaluadores Sugeridos",
    noCambiarCorreo: false,

    arrayEvaluadores: [],
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
      cvlac_url: null,
      email: null,
      mobile: null,
      academic_title: null,
      active: true,
    },
    investigador: {
      identification_number: null,
    },
    groupResearchers: {},
    searchButton: {
      icon: "find",
      onClick: async () => {
        // root.$info("on click");
        root.getInfoDataUser();
      },
    },
  }),
  async created() {
    root = this;
    root.baseEnt = this.$clone(this.baseObj);
    let arg = {};
    await root.listaEvaluadores();
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
        endPoint: "proposals/" + root.propuesta.id + "/evaluators",
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
      univerdalGet: "univerdalGet",
      universalgetOas: "universalgetOas",
      getSinData: "getSinData",
      objSave: "save",
      objUpdate: "update",
      elementoActive: "active",
    }),
    async listaEvaluadores() {
      root.loaderShow("Cargando Evaluadores");
      await root.getSinData({
        // url: "/research_units/117/group_member/10286",
        url: "/proposals/" + root.propuesta.id + "/evaluators",
        cb: function (results) {
          let objeto = results;
          if (objeto.data.length > 0) {
            for (let item of objeto.data) {
              root.arrayEvaluadores.push(item.id);
            }
          }
          root.loaderHide();
        },
      });
    },

    async getInfoDataUser() {
      root.loaderShow(`Buscando Evaluador`, "#panel-produccion .card-body");

      setTimeout(function () {
        root.getgroupuser(root.baseObj.email);
      }, 1000);
    },

    getgroupuser(email) {
      // alert(email)
      setTimeout(function () {
        root.getSinData({
          url: "/evaluators?email=" + email,
          cb: function (results) {
            let objeto = results;
            if (objeto.data.length > 0) {
              root.mode = "edit";
              root.baseObj = objeto.data[objeto.data.length - 1];
            } else {
              root.$info(
                "El evaluador no se encuentra registrado en una estructura de investigación."
              );
              let nvar = root.baseObj.email;
              root.baseObj = root.baseEnt;
              root.baseObj.email = nvar;
            }
            root.loaderHide();
            console.warn("datos internos integrante ", objeto);
          },
        });
      }, 1500);
    },

    retorno() {
      console.log(root.section);
      root.panelCmdBack.fadeOut();
      $("#" + root.namePanel + " .item-title").html("");
      root.baseObj = this.$clone(root.baseEnt);
      root.section = null;
    },

    actgualizarEvaluadores() {
      root.loaderShow(`Actualizando Evaluadores`, root.panelGrid);
      let datoPatch = JSON.stringify({
        evaluator_ids: root.arrayEvaluadores,
        updated_by: root.user_id,
      });

      var dto = {
        newFormat: true,
        url: `proposals/${root.propuesta.id}`,
        data: JSON.parse(`{ "proposal" :` + datoPatch + "}"),
        cb: function (result) {
          console.log("Result", result);
          root.grid.refresh();
          root.loaderHide();
        },
      };
      console.log("dto", dto);
      root.elementoActive(dto);
      root.loaderHide();
    },

    save() {
      console.log(this.$sep);
      var result = root.$refs.basicGroup.instance.validate();
      console.warn("arrayEvaluadores: ", root.arrayEvaluadores);

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

        let obj = root.baseObj;
        let dto = {
          newFormat: true,
          rute2: "evaluators",
          stringEP: "evaluators",
          mod: obj.id,
          objectSend: JSON.parse(`{ "evaluator": ` + JSON.stringify(obj) + "}"),
          cb: function (item) {
            let state = root.arrayEvaluadores.find(
              (id_evaluador) => id_evaluador === item.id
            ); //root.baseObj.id
            console.warn("state evaluador: ", state);
            if (typeof state == "undefined") {
              root.arrayEvaluadores.push(item.id);
              root.actgualizarEvaluadores();
            }
            console.log("item", item);
            root.grid.refresh();
            root.loaderHide();
            root.cancel();
          },
        };
        console.log("root.mode", root.mode);
        if (root.mode == "edit") root.objUpdate(dto);
        else root.objSave(dto);
        (root.noCambiarCorreo = false), root.cancel();
      }
    },

    edit(data) {
      (root.noCambiarCorreo = true), (root.mode = "edit");
      console.log("data", data);
      root.baseObj = data;

      root.panelCmds.fadeOut();
      root.panelGrid.fadeOut(function (params) {
        root.panelData.fadeIn(function (params) {});
      });
    },

    add() {
      console.log("ADD");
      root.mode = "add";
      root.baseObj = this.$clone(this.baseEnt);
      root.investigador = { identification_number: null, name: null };
      root.groupResearchers = {};
      //root.panelCmdBack.fadeOut();
      root.panelCmds.fadeOut();
      console.warn("clase padre: ", this.padre);
      console.warn("name panel: ", root.namePanel);
      root.panelGrid.fadeOut(function (params) {
        root.panelData.fadeIn(function (params) {});
      });
    },

    cancel() {
      (root.noCambiarCorreo = false), (root.baseObj = root.baseEnt);
      console.log("CANCEL!");
      root.panelData.fadeOut(function (params) {
        root.panelCmds.fadeIn();
        root.panelGrid.fadeIn(function (params) {});
      });
    },

    active(data) {
      let msg = `¿Realmente desea desvincular al evaluador: <span class='text-sb'>"${data.data.name}"</span>?`;
      this.$confirm(msg, function (si_no) {
        console.log("result", si_no);
        if (si_no) {
          root.loaderShow(`Desvinculando Evaluador`, root.panelGrid);
          root.arrayEvaluadores = root.arrayEvaluadores.filter(
            (item) => item !== data.data.id
          );
          root.actgualizarEvaluadores();
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