<template>
  <div class="mh" v-if="group">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body group-detail" id="group-panel">
            <!-- <div class="row mb-3" v-if="group.id"> -->
            <div class="row mb-3">
              <div class="col d-flex justify-content-between align-items-end">
                <!-- <div class="title"><i class="icon-collaboration"></i> {{ $titleCase(group.name) }}</div> -->
                <div class="sub-title">
                  <i class="icon-info"></i> Información de la Propuesta &raquo;
                  {{ convocatoria.call_name }}
                </div>
              </div>
            </div>

            <DxValidationGroup ref="basicGroup">
              <div class="col-md-12 mt-3">
                <fieldset>
                  <legend>Información General</legend>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Titulo del Proyecto:</label>
                        <DxTextBox
                          :show-clear-button="true"
                          :read-only="!editMode"
                          class="form-control"
                          :value.sync="group.title"
                          placeholder="Nombre de la red"
                          name="name"
                          id="name"
                        >
                          <DxValidator>
                            <DxRequiredRule />
                          </DxValidator>
                        </DxTextBox>
                      </div>
                    </div>

                    <!-- <div class="col-md-4">
                            <div class="form-group">
                            <label>Palabras Clave:</label>
                            <DxTextBox
                                :show-clear-button="true"
                                :read-only="!editMode"
                                class="form-control"
                                :value.sync="group.name"
                                placeholder="Palabras clave"
                                name="name"
                                id="name"
                            >
                                <DxValidator>
                                <DxRequiredRule />
                                </DxValidator>
                            </DxTextBox>
                            </div>
                        </div> -->

                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Estado Proyecto:</label>
                        <DxSelectBox
                          :show-clear-button="true"
                          :grouped="false"
                          :data-source="estado_proyecto"
                          :value.sync="group.proposal_status_id"
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

                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Tipo de proyecto:</label>
                        <DxSelectBox
                          :show-clear-button="true"
                          :grouped="false"
                          :data-source="tipo_proyecto"
                          :value.sync="group.project_type_id"
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
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Descripción (Palabras Clave:)</label>
                      <DxTextArea
                        :read-only="!editMode"
                        :height="100"
                        :max-length="400"
                        :value.sync="group.description"
                        placeholder="Descripción"
                        class="form-control"
                      >
                        <DxValidator>
                          <DxRequiredRule />
                        </DxValidator>
                      </DxTextArea>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="col-md-12 mt-3">
                <fieldset>
                  <legend>Lugar y ejecucion del Proyecto</legend>
                  <div class="row">
                    <div class="col-md-10">
                      <Geo :syncObject="group" />
                    </div>

                    <div class="col-md-2">
                      <div class="form-group">
                        <label>Duracion Meses:</label>
                        <!-- :disabled="actInfor"    -->
                        <DxNumberBox
                          placeholder="Meses "
                          class="form-control"
                          :value.sync="group.duration"
                          @keyDown="keyDown($event)"
                        >
                          <DxValidator>
                            <DxRequiredRule />
                          </DxValidator>
                        </DxNumberBox>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="col-md-12 mt-3">
                <fieldset>
                  <legend>Estructura de investigación a relacionada</legend>
                  <p class="parrafo-style">
                    <i class="icon-info"></i> Si va presentarce a la
                    convocatoria con otra estrutura de investigacion
                    seleccionela a continuacion.
                  </p>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        Seleccione la facultad y luego digite el nombre de
                        estructura de investigación que desea vincular.
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <label>Facultad(es):</label>
                        <DxTagBox
                          name="faculty_ids"
                          id="faculty_ids"
                          :read-only="!es_admin"
                          value-expr="Id"
                          display-expr="Nombre"
                          class="form-control"
                          :search-enabled="true"
                          :show-selection-controls="true"
                          :value.sync="group.faculty_ids"
                          placeholder="Seleccione Facultades"
                          :data-source="facultades"
                          @value-changed="facultadChange"
                        >
                          <DxValidator>
                            <DxRequiredRule />
                          </DxValidator>
                        </DxTagBox>
                      </div>
                    </div>

                    <div class="col-md-8">
                      <div class="form-group">
                        <label>Nombre de la Estructura:</label>
                        <DxTextBox
                          :value.sync="group.name"
                          placeholder="Nombre"
                          class="form-control"
                          :read-only="false"
                          mode="text"
                        >
                          <DxValidator>
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

                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Lista de Estructuras Encontradas</label>
                        <DxSelectBox
                          :show-clear-button="true"
                          :value.sync="group.research_group_ids"
                          :search-enabled="true"
                          placeholder="Seleccione..."
                          class="form-control"
                          :data-source="listEstructure"
                          display-expr="name"
                          value-expr="id"
                        >
                          <DxValidator>
                            <DxRequiredRule />
                          </DxValidator>
                        </DxSelectBox>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="col-md-12 mt-3">
                <fieldset>
                  <legend>Entidad y dependencia a relacionada</legend>
                  <p class="parrafo-style">
                    <i class="icon-info"></i> Entidades previamente cargadas en
                    el modulo de entidades,Se selecciona entidad que participan
                    en el proyecto y esta trae las dependencias previamente
                    relacionadas.
                  </p>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Busque o Seleccione Entidad:</label>
                        <DxSelectBox
                          :show-clear-button="true"
                          :grouped="false"
                          :data-source="entidades"
                          :value.sync="group.entity_ids"
                          :search-enabled="true"
                          placeholder="Seleccione..."
                          class="form-control"
                          display-expr="name"
                          value-expr="id"
                          @value-changed="searchEntity"
                        >
                          <DxValidator>
                            <DxRequiredRule />
                          </DxValidator>
                        </DxSelectBox>
                      </div>
                    </div>

                    <!-- <div class="col-md-6">
                            <div class="form-group">
                            <label>Dependencia investigacion:</label>
                            <DxSelectBox
                                :show-clear-button="true"
                                :grouped="false"
                                :data-source="dependencia"
                                :value.sync="group.dependency_ids"
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
                        </div> -->

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Seleccione Dependencias: </label>
                        <DxTagBox
                          :data-source="dependencia"
                          :search-enabled="false"
                          :show-selection-controls="true"
                          :value.sync="group.dependency_ids"
                          class="form-control"
                          :read-only="!editMode"
                          display-expr="name"
                          placeholder="seleccione..."
                          value-expr="id"
                        >
                          <DxValidator>
                            <DxRequiredRule />
                          </DxValidator>
                        </DxTagBox>
                      </div>
                    </div>

                    <!-- <div class="col-md-4">
                            <div class="form-group">
                            <label>Tipo de proyecto:</label>
                            <DxSelectBox
                                :show-clear-button="true"
                                :grouped="false"
                                :data-source="tipo_proyecto"
                                :value.sync="group.project_type_id"
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
                        </div> -->

                    <!--<Adscritas v-if="group.id!=null"-->
                    <!-- <Adscritas 
                        :group="group.id=1"
                        :editMode="editMode"
                        title="Listado Instituciones y dependencias "
                        endPointRute="affiliated_entities"
                        objEpdata="affiliated_entity"
                        titleBtn="Agregar al Listado"
                        titlecolum="entity_name"
                      /> -->
                  </div>
                </fieldset>
              </div>
            </DxValidationGroup>

            <!-- <div class="col-md-12" v-if="tiposDocumento.length > 0">
              <div class="card-body" v-html="requisitoArchivo()"></div>
            </div> -->

            <div class="row mt-3">
              <div class="col">
                <a
                  href="#"
                  @click.prevent="go(0, '/red')"
                  title="Volver a Unidades..."
                  class="
                    btn btn-main btn-labeled btn-labeled-left btn-sm
                    legitRipple
                  "
                  ><b><i class="icon-arrow-left"></i></b> Volver</a
                >
              </div>
              <div class="col text-right" v-if="editMode">
                <a
                  href="#"
                  @click.prevent="save()"
                  title="Guardar Unidad..."
                  class="
                    btn btn-main btn-labeled btn-labeled-right btn-sm
                    legitRipple
                  "
                  >Guardar <b><i class="icon-floppy-disk"></i></b
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="is_dev && debug">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <span class="font-weight-semibold">editMode:</span> {{ editMode }}
            <!-- <hr class="sep mb-0" /> -->
            <span class="font-weight-semibold">group:</span>
            {{ JSON.stringify(group, null, 3) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
// https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns
let $ = window.jQuery,
  root = null;
import {
  DxButton,
  DxDateBox,
  DxFileUploader,
  DxSelectBox,
  DxSwitch,
  DxTagBox,
  DxTextArea,
  DxTextBox,
  DxValidationGroup,
  DxNumberBox,
} from "devextreme-vue";
import DxValidator, {
  DxRequiredRule,
  DxEmailRule,
  DxPatternRule,
} from "devextreme-vue/validator";
import DataSource from "devextreme/data/data_source";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import Notify from "devextreme/ui/notify";
import { mapActions, mapGetters, mapState } from "vuex";
let hideErrors = () => {
  $("#panel-basicos .dx-fileuploader-files-container").hide();
  $("#panel-basicos .dx-invalid-message").hide();
  $("#panel-basicos .dx-invalid").removeClass("dx-invalid");
};

export default {
  name: "datosBasicos",

  created: function () {
    root = this;
    // // root.getSnies();
    root.getEntidad();
    root.entidades = root.entidadlist.data;
    console.warn("entidades => data", root.entidades);

    // 202106162214: 202106162214 Nuevo
    console.log("router", root.$router);
    // console.clear();
    console.log("root.$baseUrl()", root.$baseUrl());
    root.loaderElement = "#group-panel";
    // root.getOcde();
    // root.getCine(root.getFacultades());
    //Determina si se esta creando o editando
    console.log("root.$route estado Edit", root.$route);

    //Editando
    let uId = root.$route.params.unidadId;
    if (root.$route.name === "red-info") {
      root.getNetword({
        id: uId,
        cb: function (result) {
          root.group = result;
          root.group.snies_id = result.snies_id;
          //console.log("group", root.group);
          console.warn("entrando al sistema", root.group);
          setTimeout(function () {
            root.ocdeChange({ value: root.group.oecd_knowledge_subarea_id });
            root.cineChange({ value: root.group.cine_specific_area_id });
            root.facultadChange({ value: root.group.faculty_ids });
            // document.title += ` ${root.$titleCase(root.group.name)}`;
            root.mode = "edit";
            root.loaderHide();
          }, 500);
        },
      });
    } else {
      // 202105311312: Creando
      document.title += ` Nueva Propuesta`;
      root.group = root.baseGroup;
      root.group.created_by = root.user_id;
      root.group.updated_by = root.user_id;

      root.mode = "add";
      console.warn("nuevo al sistema", root.group);
      root.loaderHide();
    }
  },
  mounted() {
    // root.tipo_proyecto = root.subtypesByType("proyectos_informacion_tipos");
    // root.estado_proyecto = root.subtypesByType("proyectos_informacion_estados");
    // root.tipo_red = root.subtypesByType("redes_investigacion_tipo");
    // root.lineas = root.subtypesByType("unidad_linea_investigacion");
    // root.tiposDocumento = root.subtypesByType("redes_investigacion_documentos");
    // root.sniesItem = root.subtypesByType("snies_tipo");
  },

  beforeUpdate: () => {},
  updated: () => {
    console.log(root.$sep);
    hideErrors();
  },
  components: {
    DxDateBox,
    DxFileUploader,
    DxValidator,
    DxButton,
    DxRequiredRule,
    DxSelectBox,
    DxSwitch,
    DxTagBox,
    DxTextArea,
    DxPatternRule,
    DxEmailRule,
    DxTextBox,
    DxValidationGroup,
    DxNumberBoxButton,
    DxNumberBox,
    // Header: () => import("./_header"),
    Integrantes: () => import("@/modules/red_investigacion/integrantes_red"),
    Adscritas: () => import("@/modules/red_investigacion/form_info_asoc"),
    Geo: () => import("@/components/element/geo"),
  },
  props: {
    convocatoria: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    entidades: null,
    dependencia: null,
    listEstructure: null,
    searchButton: {
      //icon: "find",
      text: "Buscar Estructura",
      onClick: async () => {
        // console.clear();
        let name = root.group.name;
        if (root.group.faculty_ids.length === 0)
          root.$info(
            "Seleccione la(s) Facultad(es) que corresponde(n) a la estructura que desea buscar."
          );
        else {
          if (typeof name !== "undefined") {
            root.loaderShow("Buscando Estructuras");
            //alert("mensaje "+ name+ " tipo "+ typeof name);
            let facutSerach = root.group.faculty_ids.toString();
            // root.$info("id facultades: "+ facutSerach);
            root.listEstructure = await root.searchEstructure({
              facults: facutSerach,
              nameEstruc: name,
            });
            if (root.listEstructure.length == 0)
              root.$info(
                "No se encontraron estructuras con el nombre: " +
                  name +
                  ",<br> dentro de la(s) facultad(es) seleccionadas."
              );
            root.loaderHide();
          } else {
            root.$info(
              "Por favor digite el nombre de la estructura que desea buscar."
            );
          }
        }
      },
    },

    tipo_proyecto: [
      { id: 1, st_name: "investigacion Básica " },
      { id: 2, st_name: "Investigacion aplicada " },
      { id: 3, st_name: "Desarrollo tecnológico o experimental" },
    ],
    estado_proyecto: [
      { id: 1, st_name: "Borrador" },
      { id: 2, st_name: "Terminado" },
    ],
    tipo_red: [],
    files: [],
    mode: "edit",
    group: null,
    isValid: false,
    placeholder: "Busque y seleccione...",
    formRefName: "tree-view",
    now: new Date(),
    cineDetallados: {},
    ocdeDetallado: {},
    ocdeDisabled: true,
    urlPattern: /^(http|https):\/\/[^ "]+$/,
    phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
    validationRules: {
      required: { type: "required", message: "Position is required." },
      url: {
        type: "custom",
        message: "La Url no es válida",
        validationCallback: function (e) {
          console.log("e.value", e);
          var r = /^(http|https):\/\/[^ "]+$/;
          return r.test(e.value);
        },
      },
    },
    lineas: null,
    lineasInvestigacion: null,
    proyectosCurriculares: null,
    min: new Date(2000, 0, 1),
    tbDisabled: true,
    tbEspecificoDisabled: true,
    accept: "*.",
    multiple: false,
    uploadMode: "instantly",

    group_member: {
      role_id: 2,
      researcherId: 1,
      typeResearcher: "external",
    },

    grupoInterinstitucional: [
      {
        id: 1,
        value: true,
        name: "SI",
      },
      {
        id: 0,
        value: false,
        name: "NO",
      },
    ],

    baseGroup: {
      title: null,
      description: null,
      duration: null,
      geo_city_id: null,
      geo_country_id: null,
      geo_state_id: null,
      proposal_status_id: null,
      project_type_id: null,
      active: true,
      dependency_ids: null,
      entity_ids: null,
      research_group_ids: null,

      created_by: null,
      updated_by: null,
      created_at: null,
      updated_at: null,
    },
    baseObj: {
      id: null,
    },
  }),

  computed: {
    ...mapState("unidad/entidades", { entidadlist: "items" }),
    // ...mapState("unidad", ["documents"]),
    ...mapState("unidad/oas", ["facultades"]),
    // ...mapGetters("core/tipo", ["subtypesByType"]),
    // ...mapGetters("unidad/cine", {
    //   cEspecificos: "specific",
    //   cDetallados: "detailed",
    // }),
    // ...mapState("unidad/ocde", {
    //   oAreas: "areas",
    //   oEspecificos: "subareas",
    //   oDetallados: "disciplines",
    // }),

    // // ...mapState("unidad/snies", { sniesItem: "items" }),
    // ...mapGetters("auth/usuario", ["groupRoles"]),

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

    unidadTipos() {
      return root.subtypesByType("unidad_tipo");
    },
    unidadEstados() {
      return root.subtypesByType("unidad_estado");
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
          // console.log(groupedItem);
          return groupedItem;
        },
      });
    },
  },
  methods: {
    ...mapActions("unidad/entidades", { getEntidad: "getAll" }),
    // ...mapActions("red", [
    //   "getUnit",
    //   "saveUnit",
    //   "setDocument",
    //   "getMembers",
    //   "updateGroupMember",
    //   "activatePeriod",
    //   "updatePeriod",
    // ]),
    ...mapActions("unidad/producto/universalSentUpAct", {
      getNetword: "getRed",
      getDependences: "getAll",
      objSave: "save",
      objUpdate: "update",
      elementoActive: "active",
      searchEstructure: "searchEstructure",
      univerdalID: "univerdalID",
    }),
    // ...mapActions("unidad/cine", { getCine: "all" }),
    ...mapActions("unidad/oas", { getFacultades: "facultades" }),
    // ...mapActions("unidad/ocde", { getOcde: "getAll" }),
    // ...mapActions("unidad/snies", { getSnies: "getSnies" }),

    keyDown(e) {
      const { event } = e;
      const str = event.key || String.fromCharCode(event.which);
      if (/^[.,e,+,-]$/.test(str)) {
        event.preventDefault();
      }
    },

    searchEntity(e) {
      root.dependencia = [];
      if (e.value === null) return null;
      setTimeout(function () {
        root.getDependences({
          url: "/entities/" + e.value + "/dependencies",
          cb: function (results) {
            root.dependencia = results;
            console.warn("indicator2 ", root.dependencia);
            root.loaderHide();
          },
        });
      }, 1000);
    },

    // requisitoArchivo() {
    //   let tipos = root.tiposDocumento;
    //   let i = 0,
    //     print = "";
    //   if (Array.isArray(tipos) && tipos.length != 0 && root.editMode) {
    //     print =
    //       "<h3><i class='icon-info mr-1 color-main-600'></i><b><i>Documentos Requeridos para la Creación de la Red:</i></b></h3>";
    //     print = print + "<ul>";
    //     for (i = 0; i < tipos.length; i++) {
    //       let text =
    //         tipos[i].st_description == null
    //           ? ""
    //           : "<br>" + tipos[i].st_description;
    //       if (tipos[i].active)
    //         print =
    //           print +
    //           "<li>" +
    //           "<b>" +
    //           tipos[i].st_name +
    //           "</b>" +
    //           text +
    //           "</li>";
    //     }
    //     print = print + "</ul>";
    //   }
    //   return print;
    // },

    validateUrl(e) {
      console.log("e.value", e);
      var r = /^(http|https):\/\/[^ "]+$/;
      return r.test(e.value);
    },

    activeChanged(e) {
      const previousValue = e.previousValue;
      const is_active = e.value;
      console.log("previousValue =>", previousValue);
      console.log("newValue =>", is_active);
      root.group_member.gm_state_id = is_active ? 1 : 2;
      console.log("root.group_member", root.group_member);
    },

    ocdeChange(e) {
      console.log(root.$sep);
      console.log("e", e);
      console.warn("ocde Area", root.oAreas);
      var items = root.oDetallados.filter(
        (o) => o.oecd_knowledge_subarea_id === e.value
      );
      if (items.length > 0) {
        items = root.$objectSort(items, "name");
        root.ocdeDetallado = items;
        root.ocdeDisabled = false;
        console.warn("ocdeDetallado", root.ocdeDetallado);
      } else {
        root.ocdeDisabled = true;
      }
    },

    ocdeDiscChange(e) {
      console.log(root.$sep);
      console.log("e", e);
    },

    getDocument(document_type_id) {
      return typeof root.group.documents !== "undefined"
        ? root.group.documents.find(
            (o) => o.document_type_id == document_type_id
          )
        : null;
    },

    getLink(document_type_id) {
      var doc = root.getDocument(document_type_id);
      console.log("document", doc);
      return doc !== null
        ? `https://documental.portaloas.udistrital.edu.co/nuxeo/nxfile/default/${doc.id}/file:content/${doc.path}`
        : null;
    },

    // edit(data) {
    // let msg = "Esta seguro que desea editar la red con el nombre "+this.group_member.name+"?"
    // this.$confirm(msg, function(si_no) {
    // 		console.log("result", si_no);
    // 		if (si_no) {
    //       root.mode = "edit";
    //       console.log("data", data);
    //       root.group = data;
    //       //root.panelCmdBack.fadeOut();
    //       root.panelCmds.fadeOut();
    //       root.panelGrid.fadeOut(function(params) {
    //         root.panelData.fadeIn(function(params) {});
    //       });
    // 		}else{
    //       this.$info(`No se edito La red de investigación  con el nombre ${this.group_member.name}.` );
    //     }
    // 	});
    // },

    save() {
      console.log(this.$sep);
      var result = root.$refs.basicGroup.instance.validate();
      console.log("result", result);
      if (result.isValid) {
        console.log("VALID!");
        let msg =
          (root.mode == "add" ? "Creando" : "Actualizando") +
          " Datos de la Red";
        root.loaderShow(msg, root.panelData);
        if (root.mode == "add") root.group.created_by = root.user_id;
        if (root.mode == "edit") root.group.updated_by = root.user_id;
        // root.group.research_network_id = root.group.id;
        root.group.entity_ids = [root.group.entity_ids];
        root.group.research_group_ids = [root.group.research_group_ids];

        // root.group.snies_ids=[root.group.snies_ids];
        let obj = root.group;
        let dto = {
          newFormat: true,
          rute2: "/calls/1/proposals",
          unidadId: root.group.id,
          stringEP: "/calls/1/proposals",
          mod: obj.id,
          objectSend: JSON.parse(`{ "proposal": ` + JSON.stringify(obj) + "}"),
          cb: function (item) {
            root.group.id = item.id;
            console.log("item", item);
            root.loaderHide();
          },
        };
        console.log("root.mode", root.mode);
        if (root.mode == "edit") root.objUpdate(dto);
        else root.objSave(dto);
        let textdata = root.mode == "edit" ? "editó" : "creó";
        root.$info(`La red de investigación se  ${textdata} correctamente.`);
      }
    },

    facultadChange(e) {
      // console.clear();
      console.log("value", e.value);
      console.log("facultades", root.facultades);
      if (typeof e.value !== "undefined") {
        var items = root.facultades.filter((o) => e.value.includes(o.Id));
        console.log("items", items);
        if (items.length > 0) {
          root.tbDisabled = false;
          let opts = [];
          items.forEach((padre) => {
            padre.Opciones.forEach((opt) => {
              opts.push({
                PadreId: padre.Id,
                PadreNombre: padre.Nombre,
                Id: opt.Id,
                Nombre: opt.Nombre,
              });
            });
            console.log(padre.Nombre + ": " + padre.Opciones.length);
            console.log("Total", opts.length);
          });
          let hijos = root.$objectSort(opts, "Nombre");
          console.log("hijos", hijos);
          root.proyectosCurriculares = new DataSource({
            group: "PadreNombre",
            store: {
              key: "Id",
              type: "array",
              data: hijos,
            },
            map: function (groupedItem) {
              console.log(groupedItem);
              return groupedItem;
            },
          });
          // 202105071020: Filtra Lineas de Investigación por Facultad
          // console.clear();
          let final = [];
          console.log("items", items);
          console.log("root.lineas", root.lineas);
          console.log("clasificador.facultad", window.clasificador.facultad);
          items.forEach((facultad_oas) => {
            let facultad_local = window.clasificador.facultad.find(
              (o) => o.id_oas === facultad_oas.Id
            );
            if (typeof facultad_local !== "undefined") {
              // 202105071039: Se encontró el Id local
              root.lineas.forEach((linea) => {
                if (linea.parent_id === facultad_local.id) {
                  final.push({
                    PadreId: linea.parent_id,
                    PadreNombre: linea.parent_name,
                    Id: linea.id,
                    Nombre: linea.st_name,
                  });
                }
              });
            }
          });
          final = root.$objectSort(final, "Nombre");
          console.log("final", final);
          root.lineasInvestigacion = new DataSource({
            group: "PadreNombre",
            store: {
              key: "Id",
              type: "array",
              data: final,
            },
            map: function (groupedItem) {
              // console.log(groupedItem);
              return groupedItem;
            },
          });
        } else {
          root.tbDisabled = true;
        }
      }
    },
    cineChange(e) {
      var items = root.cDetallados.filter(
        (o) => o.cine_specific_area_id === e.value
      );
      if (items.length > 0) {
        console.log(root.$sep);
        console.log(root.cEspecificos);
        var item = root.cEspecificos.filter((o) => o.id === e.value)[0];
        root.group.cine_broad_area_id = item.cine_broad_area_id;
        // root.group.cine_detailed_area_ids = [];
        items = root.$objectSort(items, "name");
        root.cineDetallados = items;
        root.tbEspecificoDisabled = false;
        // console.log("cineDetallados", root.cineDetallados);
      } else {
        root.tbEspecificoDisabled = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.parrafo-style {
  line-height: 1.8rem;
  font-weight: 400;
  color: #44a739;
  i {
    font-weight: 500;

    font-size: 1.4rem;
    margin-right: 0.15rem;
  }
}
</style>
