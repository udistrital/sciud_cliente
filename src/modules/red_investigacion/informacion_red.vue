<template>
  <div class="mh" v-if="group">
    
    <div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-collaboration mr-1 color-main-600"></i>
					<span class="font-weight-semibold">Redes de Investigación</span> 
          <span v-if="group.id===null || typeof group.id ==='undefined'"> &raquo;Nueva Red de Investigación</span>
				</h1>
			</div>

			<div class="header-elements">
        <router-link tag="a" :to="'/red'" class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2" title="Nueva Red de Investigación...">
            <b><i class="icon-collaboration"></i></b> Redes de Investigación
        </router-link>
        <template v-if="group.id!=null">
          <router-link tag="a" :to="'/red/'+group.id +'/grupos'" class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2" title="Grupos de la Red...">
            <b><i class="icon-svg"></i></b> Grupos de la Red
          </router-link>
          <router-link tag="a" :to="'/red/'+group.id +'/documentos'" class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2" title="Documentos de la Red...">
            <b><i class="icon-file-pdf"></i></b> Anexar Documentos
          </router-link>
        </template>
			</div>

		</div>





    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body group-detail" id="group-panel">
            <div class="row mb-3" v-if="group.id">
              <div class="col d-flex justify-content-between align-items-end">
                <div class="title"><i class="icon-collaboration"></i> {{ $titleCase(group.name) }}</div>
                <div class="sub-title">
                  <i class="icon-info"></i> Información de la Red
                </div>
              </div>
            </div>
            <div class="row">
              <DxValidationGroup ref="basicGroup">
                <div class="col-md-12 mt-3">
                  <fieldset>
                    <legend>Información Básica</legend>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Nombre de la red:</label>
                          <DxTextBox
                            :show-clear-button="true"
                            :read-only="!editMode"
                            class="form-control"
                            :value.sync="group.name"
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
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>Acrónimo:</label>
                          <DxTextBox
                            :show-clear-button="true"
                            :read-only="!editMode"
                            class="form-control upper"
                            placeholder="Acrónimo"
                            :value.sync="group.acronym"
                            name="acronym"
                            id="acronym"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTextBox>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="form-group">
                          <label>Tipo de Red</label>
                          <DxSelectBox
                            :show-clear-button="true"
                            :grouped="false"
                            :data-source="tipo_red"
                            :value.sync="group.network_type_id"
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
                      <div class="col-md-2">
                        <div class="form-group">
                          <label>Fecha Constitución: </label>
                          <DxDateBox
                            class="form-control"
                            name="dateofincorporation"
                            :value.sync="group.request_date"
                            id="dateofincorporation"
                            placeholder="DD/MM/YYYY"
                            display-format="dd/MM/yyyy"
                            :min="minDate"
                            :max="actualDate"
                            type="date"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxDateBox>
                        </div>
                      </div>

                      <div class="col-md-1">
                        <div class="form-group">
                          <label>Activo: </label>
                          <DxSwitch
                            :value.sync="group.active"
                            switched-on-text="SI"
                            switched-off-text="NO"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div class="col-md-12 mt-3">
                  <fieldset>
                    <legend>Información Docente Solicitante</legend>
                    <div class="row">
                      <Integrantes :syncObject.sync="group" />
                    </div>
                  </fieldset>
                </div>

                <div class="col-md-12 mt-3">
                  <fieldset>
                    <legend>Areas del Conocimiento</legend>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>CINE Amplio y Específico:</label>
                          <DxSelectBox
                            :show-clear-button="true"
                            :grouped="true"
                            :search-enabled="true"
                            :placeholder="placeholder"
                            :read-only="!editMode"
                            :data-source="cineEspecificos"
                            @value-changed="cineChange"
                            :value.sync="group.cine_specific_area_id"
                            ref="tbCine"
                            class="form-control"
                            display-expr="name"
                            value-expr="id"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxSelectBox>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>CINE Detallado:</label>
                          <DxTagBox
                            value-expr="id"
                            display-expr="name"
                            class="form-control"
                            :read-only="!editMode"
                            :search-enabled="true"
                            :show-selection-controls="true"
                            :value.sync="group.cine_detailed_area_ids"
                            :placeholder="placeholder"
                            :disabled="tbEspecificoDisabled"
                            :data-source="cineDetallados"
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
                          <DxSelectBox
                            :show-clear-button="true"
                            :grouped="false"
                            :data-source="sniesItem"
                            :value.sync="group.snies_id"
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
                          <label>Área OCDE:</label>
                          <DxSelectBox
                            :show-clear-button="true"
                            @value-changed="ocdeChange"
                            :data-source="ocdeEspecificos"
                            :grouped="true"
                            :search-enabled="true"
                            class="form-control"
                            :read-only="!editMode"
                            display-expr="name"
                            :value.sync="group.oecd_knowledge_subarea_id"
                            placeholder="Busque y/o seleccione..."
                            value-expr="id"
                            ref="sbOcdeArea"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxSelectBox>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Discipina OCDE:</label>
                          <DxTagBox
                            @value-changed="ocdeDiscChange"
                            :data-source="ocdeDetallado"
                            :disabled="ocdeDisabled"
                            :search-enabled="true"
                            :show-selection-controls="true"
                            :value.sync="group.oecd_discipline_ids"
                            class="form-control"
                            :read-only="!editMode"
                            display-expr="name"
                            placeholder="Busque y/o seleccione..."
                            value-expr="id"
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

                <div class="col-md-12 mt-5">
                  <fieldset>
                    <legend>
                      Lineas de investigacion Beneficiadas por Adscripción
                    </legend>
                    <div class="row">
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
                            :placeholder="placeholder"
                            :data-source="facultades"
                            @value-changed="facultadChange"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTagBox>
                        </div>
                      </div>
                      <!--<div class="col-md-4">
                        <div class="form-group">
                          <label>Proyecto(s) Curricular(es):</label>
                          <DxTagBox
                            :grouped="true"
                            :search-enabled="true"
                            :placeholder="placeholder"
                            :read-only="!editMode"
                            :disabled="tbDisabled"
                            :show-selection-controls="true"
                            :data-source="proyectosCurriculares"
                            :value.sync="group.curricular_project_ids"
                            class="form-control"
                            display-expr="Nombre"
                            value-expr="Id"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTagBox>
                        </div>
                      </div> -->
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Línea(s) de investigación:</label>
                          <DxTagBox
                            :grouped="true"
                            :search-enabled="true"
                            :placeholder="placeholder"
                            :read-only="!editMode"
                            :disabled="tbDisabled"
                            :show-selection-controls="true"
                            :data-source="lineasInvestigacion"
                            :value.sync="group.research_focus_ids"
                            class="form-control"
                            display-expr="Nombre"
                            value-expr="Id"
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

                <div class="col-md-12 mt-3">
                  <fieldset>
                    <legend>Información Institucional</legend>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Misión:</label>
                          <DxTextArea
                            :read-only="!editMode"
                            :height="100"
                            :max-length="400"
                            :value.sync="group.mission"
                            placeholder="Misión"
                            class="form-control"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTextArea>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Visión:</label>
                          <DxTextArea
                            :read-only="!editMode"
                            :height="100"
                            :max-length="400"
                            :value.sync="group.vision"
                            placeholder="Visión"
                            class="form-control"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTextArea>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Beneficios para la UDFJC:</label>
                          <DxTextArea
                            :read-only="!editMode"
                            :height="100"
                            :max-length="400"
                            :value.sync="group.advantage"
                            placeholder="Descripción"
                            class="form-control"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTextArea>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div class="col-md-12 mt-3">
                  <fieldset>
                    <legend>Responsabilidades Adquiridas por la Red</legend>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Legal:</label>
                          <DxTextArea
                            :read-only="!editMode"
                            :height="100"
                            :max-length="400"
                            :value.sync="group.legal_responsibilities"
                            placeholder="Descripción"
                            class="form-control"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTextArea>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Económica:</label>
                          <DxTextArea
                            :read-only="!editMode"
                            :height="100"
                            :max-length="400"
                            :value.sync="group.financial_responsibilities"
                            placeholder="Descripción (Sustento de Sostenibilidad a futuro Presupuesto) en relación a Membresías, Cuotas, ETC."
                            class="form-control"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTextArea>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Académica:</label>
                          <DxTextArea
                            :read-only="!editMode"
                            :height="100"
                            :max-length="400"
                            :value.sync="group.academic_responsibilities"
                            placeholder="Descripción"
                            class="form-control"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTextArea>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div class="col-md-12 mt-3">
                  <fieldset>
                    <legend>
                      Información Institución(es) adscritas a la red
                    </legend>
                    <div class="row">
                      <Adscritas v-if="group.id!=null"
                        :group="group"
                        :editMode="editMode"
                        title="Listado Instituciones Adscritas"
                        endPointRute="affiliated_entities"
                        objEpdata="affiliated_entity"
                        titleBtn="Agregar al Listado"
                        titlecolum="entity_name"
                      />
                      <div v-else class="alert alert-success col-md-12 mt-3" role="alert">
                        Para poder diligenciar estos campos requiere guardar primero la información.
                      </div>
                    </div>
                  </fieldset>
                </div>
              </DxValidationGroup>
            </div>

            <div class="col-md-12" v-if="tiposDocumento.length > 0">
              <div class="card-body" v-html="requisitoArchivo()"></div>
            </div>

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
            <hr class="sep mb-0" />
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
} from "devextreme-vue";
import DxValidator, {
  DxRequiredRule,
  DxEmailRule,
  DxPatternRule,
} from "devextreme-vue/validator";
import DataSource from "devextreme/data/data_source";
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

    // 202106162214: 202106162214 Nuevo
    console.log("router", root.$router);
    // console.clear();
    console.log("root.$baseUrl()", root.$baseUrl());
    root.loaderElement = "#group-panel";
    root.getOcde();
    root.getCine(root.getFacultades());
    //Determina si se esta creando o editando
    console.log("root.$route estado Edit", root.$route);
    
    //Editando
    let uId = root.$route.params.unidadId;
    if (root.$route.name === "red-info") {
      root.getNetword({
        id: uId,
        cb: function (result) {
          root.group = result;
          root.group.snies_id=result.snies_id
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
      document.title += ` Nueva red`;
      root.group = root.baseGroup;
      root.group.created_by = root.user_id;
      root.group.updated_by = root.user_id;
      
      root.mode = "add";
       console.warn("nuevo al sistema", root.group);
      root.loaderHide();

    }
  },
  mounted() {
    root.tipo_red = root.subtypesByType("redes_investigacion_tipo");
    root.lineas = root.subtypesByType("unidad_linea_investigacion");
    
    root.tiposDocumento = root.subtypesByType("redes_investigacion_documentos");
    root.sniesItem = root.subtypesByType("snies_tipo");


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
    // Header: () => import("./_header"),
    Integrantes: () => import("@/modules/red_investigacion/integrantes_red"),
    Adscritas: () => import("@/modules/red_investigacion/form_info_asoc"),
  },
  data: () => ({
    tiposDocumento: null,
    tipo_red:[],
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

    fileTypesSource: [
      { name: "Documentos", value: "image/*" },
      { name: "Videos", value: "video/*" },
    ],

    baseGroup: {
      id: null,
      active:true,
      researcher_id: null,
      main_research_group_id: null,

      research_group_ids: null,
      network_type_id:  null,
        
      cine_broad_area_id: null,
      cine_specific_area_id: null,
      cine_detailed_area_ids: null,

      oecd_knowledge_subarea_id: null,
      oecd_knowledge_area_id: null,
      oecd_discipline_ids: null,

      academic_responsibilities: null,
      financial_responsibilities: null,
      legal_responsibilities:  null,
        
      curricular_project_ids: null,
      faculty_ids: null,
      research_focus_ids: null,
      snies_id: null,
        
      created_by: null,
      updated_by: null,
      created_at: null,
      updated_at: null,
    },
  }),

  computed: {
    ...mapState("unidad", ["documents"]),
    ...mapState("unidad/oas", ["facultades"]),
    ...mapGetters("core/tipo", ["subtypesByType"]),
    ...mapGetters("unidad/cine", {
      cEspecificos: "specific",
      cDetallados: "detailed",
    }),
    ...mapState("unidad/ocde", {
      oAreas: "areas",
      oEspecificos: "subareas",
      oDetallados: "disciplines",
    }),

    // ...mapState("unidad/snies", { sniesItem: "items" }),
    ...mapGetters("auth/usuario", ["groupRoles"]),

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
    ...mapActions("red", [
       "getUnit",
       "saveUnit",
       "setDocument",
       "getMembers",
       "updateGroupMember",
       "activatePeriod",
       "updatePeriod",
     ]),
    ...mapActions("unidad/producto/universalSentUpAct", {
      getNetword: "getRed",
      objSave: "save",
      objUpdate: "update",
      elementoActive: "active",
    }),

    ...mapActions("unidad/cine", { getCine: "all" }),
    ...mapActions("unidad/oas", { getFacultades: "facultades" }),
    ...mapActions("unidad/ocde", { getOcde: "getAll" }),
    // ...mapActions("unidad/snies", { getSnies: "getSnies" }),

    requisitoArchivo() {
      let tipos = root.tiposDocumento;
      let i = 0,
        print = "";
      if (Array.isArray(tipos) && tipos.length != 0 && root.editMode) {
        print =
          "<h3><i class='icon-info mr-1 color-main-600'></i><b><i>Documentos Requeridos para la Creación de la Red:</i></b></h3>";
        print = print + "<ul>";
        for (i = 0; i < tipos.length; i++) {
          let text =
            tipos[i].st_description == null
              ? ""
              : "<br>" + tipos[i].st_description;
          if (tipos[i].active)
            print =
              print +
              "<li>" +
              "<b>" +
              tipos[i].st_name +
              "</b>" +
              text +
              "</li>";
        }
        print = print + "</ul>";
      }
      return print;
    },

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
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " Datos de la Red";
				root.loaderShow(msg, root.panelData);
				if (root.mode == "add") root.group.created_by = root.user_id;
				if (root.mode == "edit") root.group.updated_by = root.user_id;
        root.group.research_network_id=root.group.id;
        // root.group.snies_ids=[root.group.snies_ids];
				let obj = root.group;
				let dto = {
					newFormat: true,
          rute2:"research_networks",
					unidadId: root.group.id,
					stringEP: "research_networks",
					mod: obj.id,
					objectSend: JSON.parse(`{ "research_network": ` + JSON.stringify(obj) + "}"),
					cb: function(item) {
            root.group.id=item.id;
						console.log("item", item);
						root.loaderHide();
					},
				};
				console.log("root.mode", root.mode);
				if (root.mode == "edit") root.objUpdate(dto);
				else root.objSave(dto);
        let textdata = root.mode == "edit"? "editó": "creó";
        root.$info(`La red de investigación se  ${textdata} correctamente.` );
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
