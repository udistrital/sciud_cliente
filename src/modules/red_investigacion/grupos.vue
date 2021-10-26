<template>
  <div>
    <div class="page-header header-elements-md-inline">
      <div class="page-title d-flex">
        <h1>
          <i class="icon-cog mr-1 color-main-600"></i>
          <span class="font-weight-semibold">Redes de Investigación</span>
          &raquo; Grupos
        </h1>
      </div>
      <div class="header-elements">
        <span id="panel-gupos-redes-cmds">
          <router-link
            tag="a"
            :to="'/red'"
            class="
              btn btn-sm btn-main btn-labeled btn-labeled-left
              legitRipple
              ml-2
            "
            title="Nueva Red de Investigación..."
          >
            <b><i class="icon-collaboration"></i></b> Redes de Investigación
          </router-link>
        </span>

        <span id="panel-gupos-redes-cmds">
          <router-link
            tag="a"
            :to="'/red/' + $route.params.unidadId + '/documentos'"
            class="
              btn btn-sm btn-main btn-labeled btn-labeled-left
              legitRipple
              ml-2
            "
            title="Nueva Red de Investigación..."
          >
            <b><i class="icon-file-pdf"></i></b> Anexar Documentos
          </router-link>
        </span>
        <span id="panel-gupos-redes-cmds">
          <router-link
            tag="a"
            :to="'/red/' + $route.params.unidadId + ''"
            class="
              btn btn-sm btn-main btn-labeled btn-labeled-left
              legitRipple
              ml-2
            "
            title="Nueva Red de Investigación..."
          >
            <b><i class="icon-info"></i></b> Información
          </router-link>
        </span>

        <span id="panel-gupos-redes-cmds">
          <button
            type="button"
            @click.prevent="add()"
            title="Nuevo Grupo.."
            class="btn btn-main btn-labeled btn-labeled-left legitRipple ml-2"
          >
            <b><i class="icon-database-add"></i></b>Nuevo Grupo de Investigación
          </button>
        </span>
      </div>
    </div>

    <div class="card main col mt-3 pl-1 pr-1 slide" :id="id_panel_documentos2">
      <div class="row">
        <div class="col">
          <div class="card main">
            <div class="card-body pb-0 pt-2">

		<div class="row">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline mb-2">
						<div class="page-title p-0 m-0">
							<h1>
								<i class="icon-grid3 mr-1 color-main-600"></i>
								<span class="font-weight-semibold">Carga de Documentos:</span><br>
								<span class="item-title">&nbsp;{{ tituloDoc }}</span>
							</h1>
						</div>
							<span class="cmds-back">
								<button type="button" @click.prevent="retorno()" title="Volver al panel principal.." class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-arrow-left"></i></b> Volver A  Grupos
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>






              
              <Documentos
                :id="id_panel_documentos"
                :end-point="endPointRute2"
                :main-obj="baseObj"
                :parent="this"
                :tipos="tipoDocumento"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card main col mt-3 pl-1 pr-1" :id="namePanel">
      <div class="row slide" id="panel-gupos-redes-data">
        <div class="col">
          <div class="card main">
            <div class="card-header main">Alguna acción</div>
            <div class="card-body pb-0 pt-2">
              <DxValidationGroup ref="basicGroup">
                <div class="col-12">
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

                    <div class="col-md-4">
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

                    <div class="col-md-2">
                      <div class="form-group">
                        <label>Tiene Caducidad </label>
                        <DxSwitch
                          :value.sync="baseObj.has_expiration"
                          switched-on-text="SI"
                          switched-off-text="NO"
                        />
                      </div>
                    </div>

                    <div class="col-md-2">
                      <div class="form-group">
                        <label>Fecha Expiración:</label>
                        <DxDateBox
                          @focus-in="date_focus_in"
                          @focus-out="date_focus_out"
                          type="date"
                          class="form-control"
                          :show-clear-button="false"
                          :value.sync="baseObj.expiration_date"
                          placeholder="DD/MM/YYYY"
                          display-format="dd/MM/yyyy"
                        >
                          <DxValidator>
                            <DxRequiredRule />
                          </DxValidator>
                        </DxDateBox>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-group">
                        <label>Lista de Estructuras Encontradas</label>
                        <DxSelectBox
                          :show-clear-button="true"
                          :value.sync="baseObj.research_group_id"
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
                </div>
              </DxValidationGroup>
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

      <div class="row" id="panel-gupos-redes-grid">
        <div class="col">
          <div class="card" id="data-container">
            <div class="card-body pt-3 mh">
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
                  <DxColumnChooser
                    :enabled="totaCount > 0"
                    mode="dragAndDrop"
                  />
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
                  <DxColumn
                    :allow-filtering="true"
                    data-field="research_group_name"
                    caption="Nombre"
                    data-type="string"
                    alignment="left"
                    :visible="true"
                    cell-template="titleCase"
                  />

                  <DxColumn
                    data-field="expiration_date"
                    caption="Fecha Expiración"
                    data-type="date"
                    alignment="left"
                    :visible="true"
                    :allow-grouping="false"
                    :allow-filtering="false"
                    width="120"
                  />

                  <DxColumn
                    data-field="has_expiration"
                    caption="Exprira"
                    data-type="string"
                    alignment="center"
                    :visible="true"
                    :customize-text="yesNo"
                    width="70"
                  />

                  <!-- <DxColumn
							data-field="headquarters_address"
							caption="Tipo Grupo"
							data-type="string"
							alignment="left"
							:visible="true"
							:allow-grouping="false"
							:allow-filtering="false"
							
						/> -->

                  <!-- <DxColumn data-field="observation" caption="Observaciones" data-type="string" alignment="center" :visible="true" cell-template="tplObs" /> -->
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
                    :width="100"
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
                      v-if="
                        data.value && data.value.toString().trim() !== 'NULL'
                      "
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
                      <router-link
                        tag="a"
                        :to="'/unidad/' + data.data.research_group_id + ''"
                        class="cmd-item color-main-600"
                        title="Información del Grupo..."
                      >
                        <i class="icon-info"></i>
                      </router-link>

                      <a
                        title="Observar documentos..."
                        class="cmd-item color-main-600 mr-2"
                        @click.prevent="documentos(data)"
                        href="#"
                      >
                        <i class="icon-file-pdf"></i>
                      </a>

                      <span v-if="editMode">
                        <a
                          title="Modificar Grupo..."
                          class="cmd-item color-main-600"
                          @click.prevent="edit(data.data)"
                          href="#"
                        >
                          <i class="icon-database-edit"></i>
                        </a>
                        <a
                          v-if="data.data.active"
                          title="Desactivar Grupo..."
                          class="cmd-item color-main-600 mr-2"
                          @click.prevent="active(data, false)"
                          href="#"
                        >
                          <i class="icon-database-remove"></i>
                        </a>
                        <a
                          v-else
                          title="Activar Grupo..."
                          class="cmd-item color-main-600 mr-2"
                          @click.prevent="active(data, true)"
                          href="#"
                        >
                          <i class="icon-database-check"></i>
                        </a>
                      </span>
                    </span>
                  </template>

                  <template #titleCase="{ data }">
                    <div
                      style="max-width: 300px"
                      :title="$titleCase(data.value)"
                    >
                      {{ $titleCase(data.value) }}
                    </div>
                  </template>
                </DxDataGrid>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <strong>baseObj: </strong> {{ JSON.stringify(group, null, 3) }}
            </div>
          </div>
          <!-- <div class="card">
					<div class="card-body"><strong>facultades: </strong> {{ JSON.stringify(facultades, null, 3) }}</div>
				</div> -->
          <div class="card">
            <div class="card-body">
              <strong>listEstructure: </strong>
              {{ JSON.stringify(listEstructure, null, 3) }}
            </div>
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
  DxEmailRule,
  DxStringLengthRule,
  DxPatternRule,
} from "devextreme-vue/validator";
import { mapActions, mapGetters, mapState } from "vuex";
import DataSource from "devextreme/data/data_source";
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
    DxEmailRule,
    DxStringLengthRule,
    DxPatternRule,
    // Usuario: () => import("@/components/element/usuario"),
    // Geo: () => import("@/components/element/geo"),
    Documentos: () => import("@/components/element/documentos"),
  },
  data: () => ({
    id_panel_documentos: "documentos_grupo",
    id_panel_documentos2: "documentos_grupo2",
    facultadesx: [
      { id: 1, nombre: "data 1" },
      { id: 2, nombre: "data 2" },
    ],
    listEstructure: [],
    group: {
      faculty_ids: [],
      groups_ids: [],
      created_by: null,
      updated_by: null,
    },

    lineasInvestigacion: [],

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
            // for(let cont=0; cont<dataEstructure.length; cont++){
            // 	.
            // }
            // root.listEstructure = array.map(function(element) {
            // 	obj.id=element.id;
            // 	obj.name=element.name;
            // 	return obj;
            // });

            // =dataEstructure;

            root.loaderHide();
          } else {
            root.$info(
              "Por favor digite el nombre de la estructura que desea buscar."
            );
          }
        }
      },
    },
    tituloDoc: "",
    namePanel: "grupos-red",
    section: null,
    tbDisabled: false,
    endPointRute: "",
    endPointRute2: "",
    objEpdata: "",
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
    tipoGrupos: [],
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
    baseObj: {
      research_group_id: null,
      has_expiration: false,
      expiration_date: null,
      active: true,
    },
    representante: {
      name: null,
      identification_number: null,
      email: null,
      identification_type_id: null,
      active: true,
      id: null,
      identification_type_name: null,
    },
    lookupData: ["Not Started", "Need Assistance", "In Progress"],
  }),
  created() {
    root = this;
    (root.endPointRute =
      "research_networks/" +
      root.$route.params.unidadId +
      "/research_groups_research_networks"),
      (root.endPointRute2 = "research_groups_research_networks");
    root.objEpdata = "research_groups_research_network";
    root.baseEnt = this.$clone(this.baseObj);
    // root.naturaleza = root.subtypesByType("gupos-redes_naturaleza");
    // root.tipoGrupos = root.subtypesByType("gupos-redes_tipos");
    root.tipoDocumento = root.subtypesByType("redes_investigacion_grupos_documento");
  },
  mounted() {
    root = this;
    root.loaderShow("Cargando Grupos");
    root.id_panel_documentos = this.namePanel + "documentos_grupo";
    root.id_panel_documentos2 = this.namePanel + "documentos_grupo2";
    root.validator = root.$refs.basicGroup.instance;
    root.baseObj.created_by = root.user_id;
    root.baseObj.updated_by = root.user_id;
    root.baseObjBk = root.$clone(root.baseObj);
    let root_id = "#panel-gupos-redes";
    root.panelCmd = $(`${root_id}-cmds`);
    root.panelGrid = $(`${root_id}-grid`);
    root.panelData = $(`${root_id}-data`);
    console.log("User", root.user);
  },
  computed: {
    ...mapState("unidad", ["documents"]),
    ...mapState("unidad/oas", ["facultades"]),
    ...mapState("core/tipo", ["types", "subtypes"]),
    ...mapGetters("core/tipo", ["subtypesByType", "subtypesByParent"]),

    // dataSource: function() {
    // 		return DxStore({
    // 			key: ["id"],
    // 			endPoint: "entities",
    // 			onLoading: function(loadOptions) {
    // 				console.log("loadOptions", loadOptions);
    // 				console.log(root._sep);
    // 				console.log("onLoading");
    // 				// root.loaderElement = root.panelGrid.find(".card-body");
    // 				// root.loaderMessage = "Cargando indicadores";
    // 				// root.loaderShow("Cargando indicadores");
    // 				setTimeout(function() {
    // 					console.log("SCROLL!");
    // 					root.scrollTop();
    // 				}, 300);
    // 			},
    // 			onLoaded: function(results, baseEntity) {
    // 				console.log(root._sep);
    // 				console.log("results", results);
    // 				console.log("baseEntity", baseEntity);
    // 				// root.loaderHide();
    // 			},
    // 		});
    // 	},

    dataSource: function () {
      // if (typeof this.group.id === "undefined") return null;
      // console.log("root.group", this.group);
      return DxStore({
        key: ["id"],
        endPoint: `research_networks/${root.$route.params.unidadId}/research_groups_research_networks`,
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

  methods: {
    ...mapActions("unidad/cine", { getCine: "all" }),
    ...mapActions("unidad/oas", { getFacultades: "facultades" }),
    ...mapActions("unidad/ocde", { getOcde: "getAll" }),
    ...mapActions("unidad/snies", { getSnies: "getSnies" }),

    ...mapActions("unidad/producto/universalSentUpAct", {
      objSave: "save",
      objUpdate: "update",
      elementoActive: "active",
      searchEstructure: "searchEstructure",
    }),
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
    documentos(data) {
      // console.clear();
      console.log("documentos", data.row.data);
      root.section = "documentos_grupo";
      // 202104111513: Error
      root.tituloDoc = data.data.research_group_name;
      if (data.row.data.volume !== null)
        data.row.data.volume = parseInt(data.row.data.volume);
      let rd = data.row.data;
      if (rd.volume !== null) rd["volume"] = parseInt(rd.volume);
      console.log("rd", rd);
      root.baseObj = rd;
      $("#" + root.namePanel + " .item-title").html(
        `<span class="font-weight-semibold"> &raquo; Documentos</span> &raquo;  ${
          data.row.data[root.titlecolum]
        }`
      );

      root.panelCmd.fadeOut();
      root.panelGrid.fadeOut(function (params) {
        root.panelCmd.fadeIn();
        $("#" + root.id_panel_documentos).fadeIn(function (params) {});
        $("#" + root.id_panel_documentos2).fadeIn(function (params) {});
      });
    },

    retorno() {
      console.log(root.section);
      root.panelCmd.fadeOut();
      if (root.section == "participantes") {
        root.panelParticipantes.fadeOut(function (params) {
          root.panelCmd.fadeIn();
          root.panelGrid.fadeIn(function (params) {});
        });
      } else {
        console.log("Regresar!");
        console.log("root.panelDocs", root.panelDocs);
        $("#" + root.id_panel_documentos).fadeOut(function (params) {
          $("#" + root.id_panel_documentos2).fadeOut(function (params) {});
          root.panelCmd.fadeIn();
          root.panelGrid.fadeIn(function (params) {});
        });
      }
      $("#" + root.namePanel + " .item-title").html("");
      root.baseObj = this.$clone(root.baseEnt);
      root.section = null;
    },
    // getSubtypes(e, a) {
    // 	// console.clear();
    // 	console.log("e =>", e);
    // 	console.log("a =>", a);
    // 	if (root !== null && e.selectedItem !== null && typeof root.subtypes !== "undefined") {
    // 		console.log("root.subtypes =>", root.subtypes);
    // 		root.subtypes_current = root.subtypesByType(e.selectedItem.id);
    // 	}
    // },

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
          //   root.proyectosCurriculares = new DataSource({
          //     group: "PadreNombre",
          //     store: {
          //       key: "Id",
          //       type: "array",
          //       data: hijos,
          //     },
          //     map: function (groupedItem) {
          //       console.log(groupedItem);
          //       return groupedItem;
          //     },
          //   });
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
          //   root.lineasInvestigacion = new DataSource({
          //     group: "PadreNombre",
          //     store: {
          //       key: "Id",
          //       type: "array",
          //       data: final,
          //     },
          //     map: function (groupedItem) {
          //       // console.log(groupedItem);
          //       return groupedItem;
          //     },
          //   });
        } else {
          root.tbDisabled = true;
        }
      }
    },
    save() {
      console.clear();
      console.log(root.$sep);
      root.loaderElement = root.panelData.find(".card");
      console.log("validator =>", root.validator);
      var result = root.validator.validate();
      console.log("result =>", result);

      if (result.isValid) {
        root.loaderShow("Guardando Grupos");

        console.log("VALID!");
        root.scrollTop();
        // root.panelCmd.fadeOut();
        // root.loaderElement = ;
        let msg =
          (root.mode == "add" ? "Creando" : "Actualizando") + " Elemento";
        root.loaderShow(msg, root.panelData);
        if (root.mode == "add") root.baseObj.created_by = root.user_id;
        if (root.mode == "edit") root.baseObj.updated_by = root.user_id;
        root.baseObj.legal_representative_id = 1;

        // root.baseObj.product_type_id = root.codEP;
        // root.baseObj.research_group_id = root.group.id;
        let obj = root.baseObj;
        //let json1 = `{ "${mydata}": `+JSON.stringify(obj)+" } ";
        let dto = {
          newFormat: true,
          // unidadId: root.group.id,
          stringEP: root.endPointRute,
          rute2: root.endPointRute,
          mod: obj.id,
          //objectSend: { regulation : obj },
          objectSend: JSON.parse(
            `{ "${root.objEpdata}": ` + JSON.stringify(obj) + "}"
          ),
          cb: function (item) {
            console.log(root.$sep);
            console.log("result =>", result);
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
      root.type_id = null;
      // console.clear();
      console.log("data", data);
      root.endPointRute=root.endPointRute2;
      root.subtypes_current = root.subtypes.filter((o) => o.active);
      root.listEstructure=[{id:data.research_group_id, name: data.research_group_name}];
      root.baseObj = root.$clone(data);
      root.panelData
        .find(".card-header")
        .html(`<i class="icon-database-edit"></i>&nbsp;&nbsp;Editar Grupos`);
      root.panelCmd.fadeOut();
      root.panelGrid.fadeOut(function () {
        root.panelData.fadeIn();
      });
    },


    active(data, state) {
      // console.clear();
      console.log("active", data);
      console.log("state", state);
      let a = state ? "activar" : "desactivar";
      let am = state ? "Activando" : "Desactivando";
      let msg = `¿Realmente desea ${a} <span class='text-sb'>"${data.data.name} ?`;
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
            url: `research_groups_research_network/${data.data.id}`,
            data: JSON.parse(`{ "${root.objEpdata}" :` + active + "}"),
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

    // enable(state, data) {
    // 	// console.clear();
    // 	console.log("data", data);
    // 	console.log("state", state);
    // 	let a = state ? "activar" : "desactivar";
    // 	let msg = `¿Realmente desea ${a} el subtipo "${data.name}"?`;
    // 	this.$confirm(msg, function(si_no) {
    // 		console.log("result", si_no);
    // 		if (si_no) {
    // 			let item = data;
    // 			item.active = state;
    // 			root.loaderMessage = `${state ? "Activando" : "Desactivando"} subtipo`;
    // 			root.loaderShow();
    // 			root.subtypeEnable({
    // 				typeId: data.type_id,
    // 				subtypeId: data.id,
    // 				subtype: {
    // 					active: state,
    // 					updated_by: root.user_id,
    // 				},
    // 				cb: function(result) {
    // 					console.log("Result", result);
    // 					root.grid.refresh();
    // 				},
    // 			});
    // 		}
    // 	});
    // },

    add(what) {
      root.mode = "add";
      root.type_id = null;
      root.endPointRute = "research_networks/" + root.$route.params.unidadId + "/research_groups_research_networks"
      // console.clear();
      console.log("root.panelGrid", root.panelGrid);
      console.log("root.panelData", root.panelData);
      console.log("add(data)", what);
      root.baseObj = root.$clone(root.baseObjBk);
      root.subtypes_current = root.subtypes.filter((o) => o.active);
      root.panelData
        .find(".card-header")
        .html(
          `<i class="icon-database-add"></i>&nbsp;&nbsp;Nuevo Grupo de Investigación`
        );
      root.panelCmd.fadeOut();
      root.panelGrid.fadeOut(function () {
        root.panelData.fadeIn(function () {
          console.log("root.panelCmd", root.panelCmd);
        });
      });
    },

    cancel() {
      root.mode = null;
      console.log("CANCEL!");
      root.panelData.fadeOut(function () {
        // console.clear();
        root.validator.reset();
        root.baseObj = root.$clone(root.baseObjBk);
        root.panelCmd.fadeIn();
        root.panelGrid.fadeIn();
      });
    },

    // enable(state, data) {
    // 	// console.clear();
    // 	console.log("data", data);
    // 	console.log("state", state);
    // 	let a = state ? "activar" : "desactivar";
    // 	let msg = `¿Realmente desea ${a} el subtipo "${data.name}"?`;
    // 	this.$confirm(msg, function(si_no) {
    // 		console.log("result", si_no);
    // 		if (si_no) {
    // 			let item = data;
    // 			item.active = state;
    // 			root.loaderMessage = `${state ? "Activando" : "Desactivando"} subtipo`;
    // 			root.loaderShow();
    // 			root.subtypeEnable({
    // 				typeId: data.type_id,
    // 				subtypeId: data.id,
    // 				subtype: {
    // 					active: state,
    // 					updated_by: root.user_id,
    // 				},
    // 				cb: function(result) {
    // 					console.log("Result", result);
    // 					root.grid.refresh();
    // 				},
    // 			});
    // 		}
    // 	});
    // },

    // gridInit(e) {
    // 	let root = this;
    // 	root.grid = e.component;
    // 	// 202103311458: https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Events/
    // 	root.grid.on({
    // 		contentReady: (e) => {
    // 			console.log("contentReady", e);
    // 			if (root.mode == null) root.loaderHide();
    // 		},
    // 		optionChanged: (e) => {
    // 			if (e.fullName == "paging.pageIndex") {
    // 				console.log("optionChanged", e);
    // 				root.loaderShow("Cargando Grupos");
    // 			}
    // 		},
    // 		editorPreparing: (e) => {
    // 			if (e.dataField === "LastName" && e.parentType === "dataRow") {
    // 				e.editorOptions.disabled = e.row.data && e.row.data.FirstName === "";
    // 			}
    // 		},
    // 	});
    // },

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
