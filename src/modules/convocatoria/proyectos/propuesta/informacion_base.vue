<template>
  <div class="mh">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body group-detail" id="group-panel">
            <DxValidationGroup ref="basicGroup">
              <div class="row">
                <div class="col-md-12">
                  <fieldset>
                    <legend>Información General</legend>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group">
                          <label>Titulo del proyecto: </label>
                          <DxTextBox
                            placeholder="Título del proyecto"
                            class="form-control"
                            :value.sync="proposal.title"
                            :read-only="!permisoGuardar"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxTextBox>
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group">
                          <label>Estado: </label>
                          <DxSelectBox
                            :show-clear-button="true"
                            :grouped="false"
                            :data-source="estadoProyecto"
                            :value.sync="proposal.proposal_status_id"
                            :search-enabled="false"
                            placeholder="Seleccione..."
                            class="form-control"
                            display-expr="st_name"
                            value-expr="id"
                            :read-only="true"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxSelectBox>
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group">
                          <label>Tipo de proyecto:</label>
                          <DxSelectBox
                            :show-clear-button="true"
                            :grouped="false"
                            :data-source="tipo_proyecto"
                            :value.sync="proposal.project_type_id"
                            :search-enabled="false"
                            placeholder="Seleccione..."
                            class="form-control"
                            display-expr="st_name"
                            value-expr="id"
                            :read-only="!permisoGuardar"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator> 
                          </DxSelectBox>
                        </div>
                      </div>

                      <div class="col-3">
                        <div class="form-group" v-if="!edit">
                          <label>Tipo de Participante</label>
                          <DxSelectBox
                            :show-clear-button="true"
                            :grouped="false"
                            :data-source="tiposParticipante"
                            :value.sync="internal_members_proposal.role_id"
                            :search-enabled="false"
                            placeholder="Seleccione..."
                            class="form-control"
                            display-expr="name"
                            value-expr="id"
                            :read-only="!permisoGuardar"
                          >
                            
                          </DxSelectBox>
                        </div>
                      </div>

                      

                      <div class="col-md-9">
                        <div class="form-group" v-if="!edit">
                          <label>Grupo de investigación Principal: </label>
                          <DxSelectBox
                            :show-clear-button="true"
                            :grouped="false"
                            :data-source="groupResearchers.gropusmember"
                            :value.sync="proposal.research_group_id"
                            :search-enabled="false"
                            placeholder="Seleccione..."
                            class="form-control"
                            display-expr="research_group_name"
                            value-expr="research_group_id"
                            :read-only="false"
                            @value-changed="list_lines_researcher"
                          >
                            <DxValidator>
                              <DxRequiredRule />
                            </DxValidator>
                          </DxSelectBox>
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group">
                          <label>Lineas de investigación: </label>
                          <DxTagBox
                            id="faculties"
                            :read-only="!permisoGuardar"
                            value-expr="id"
                            display-expr="st_name"
                            class="form-control"
                            :search-enabled="true"
                            :show-selection-controls="true"
                            :value.sync="proposal.research_focus_ids"
                            placeholder="Seleccione..."
                            :data-source="lines"
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
                    <legend>Palabras Clave:</legend>

                    <div class="col-md-12">
                      <div class="form-group" v-if="!stateAddKeyWorld">
                        <!-- <label>palabras clave: </label> -->
                        <DxTagBox
                          id="keyWords"
                          :read-only="!permisoGuardar"
                          class="form-control"
                          :search-enabled="false"
                          :show-selection-controls="true"
                          :value.sync="proposal.keywords"
                          placeholder="Seleccione..."
                          :data-source="dataSoursePalabras"
                        >
                          <DxValidator>
                            <DxRequiredRule /><!-- @item-click="cmdClick($event, data)" :items="cmdGet(data)" @click= "" -->
                          </DxValidator>
                        </DxTagBox>
                      </div>

                      <div class="form-group" v-else>
                        <label>Ingrese nueva(s) palabra(s) clave: </label>
                        <DxTextBox
                          placeholder="Digite cada palabra clave separada por una coma."
                          class="form-control"
                          :value.sync="textkeywords"
                        >
                        </DxTextBox>
                      </div>
                    </div>

                    <div class="col-md-12 text-right">
                      <div class="form-group">
                        <DxButton
                          class="nb"
                          @click="newKeyWorld()"
                          v-if="permisoGuardar"
                        >
                          <template #default>
                            <span
                              class="
                                btn btn-main btn-labeled btn-labeled-left btn-sm
                                legitRipple
                              "
                            >
                              <b><i class="icon-database-add"></i></b
                              >{{
                                stateAddKeyWorld ? "Crear" : "Agregar"
                              }}
                              Palabra(s)
                            </span>
                          </template>
                        </DxButton>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div class="col-md-12 mt-3">
                  <fieldset>
                    <legend>Lugares de Impacto:</legend>
                    <label> </label>
                    <Geo
                      :lockElement="loaderElement"
                      :syncObject="proposal"
                      :permisoGuardar="permisoGuardar"
                    />
                  </fieldset>
                </div>

                <div class="col-md-12 mt-3">
                  <fieldset>
                    <legend>Estado del Proyecto:</legend>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group">
                          <label>Duración Estimada (días):</label>
                          <DxNumberBox
                            placeholder="Duración Estimada"
                            class="form-control"
                            :value.sync="proposal.duration"
                            :read-only="true"
                          >
                            <DxValidator> </DxValidator>
                          </DxNumberBox>
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group">
                          <label>Monto Solicitado CIDC: </label>
                          <DxNumberBox
                            placeholder="Monto Solicitado CIDC"
                            format="$ #,##0.##"
                            class="form-control"
                            :value.sync="proposal.total_amount_request_cidc"
                            :read-only="true"
                          >
                            <DxValidator> </DxValidator>
                          </DxNumberBox>
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group">
                          <label>Total Contrapartida Externa: </label>
                          <DxNumberBox
                            placeholder="Total Contrapartida"
                            format="$ #,##0.##"
                            class="form-control"
                            :value.sync="proposal.total_counterparty"
                            :read-only="true"
                          >
                            <DxValidator> </DxValidator>
                          </DxNumberBox>
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div class="form-group">
                          <label>Monto en Especie: </label>
                          <DxNumberBox
                            placeholder="Monto en Especie"
                            format="$ #,##0.##"
                            class="form-control"
                            :value.sync="proposal.total_amount_in_kind"
                            :read-only="true"
                          >
                            <DxValidator> </DxValidator>
                          </DxNumberBox>
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Descripción: </label>
                          <DxTextArea
                            :height="100"
                            :max-length="400"
                            :value.sync="proposal.description"
                            placeholder="Descripción "
                            class="form-control"
                            :read-only="!permisoGuardar"
                          >
                            <DxValidator> </DxValidator>
                          </DxTextArea>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </DxValidationGroup>

            <div class="row mt-3">
              <div class="col">
                <a
                  href="#"
                  @click.prevent="go(0, '/convocatoria')"
                  title="Volver a Convocatorias..."
                  class="
                    btn btn-main btn-labeled btn-labeled-left btn-sm
                    legitRipple
                  "
                  ><b><i class="icon-arrow-left"></i></b> Volver</a
                >
              </div>
              <div class="col text-right">
                <!--v-if="editMode" v-if="permisoGuardar"-->
                <a
                  v-if="permisoGuardar"
                  href="#"
                  @click.prevent="save()"
                  title="Guardar propuesta..."
                  class="
                    btn btn-main btn-labeled btn-labeled-right btn-sm
                    legitRipple
                  "
                  >{{ edit ? "Actualizar" : "Crear" }} Propuesta
                  <b><i class="icon-floppy-disk"></i></b
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

            <span class="font-weight-semibold">proposal:</span>
            <pre>{{ JSON.stringify(proposal, null, 3) }}</pre>
          </div>
        </div>
      </div>
    </div>


    <div  v-if="is_dev && debug">
      <div class="card">
        <hr class="sep mb-0" />
        <span class="font-weight-semibold">modoEditar:</span>
        {{ JSON.stringify(edit, null, 3) }}
      </div>
      <div class="card">
        <hr class="sep mb-0" />
        <span class="font-weight-semibold">permisoGuardar:</span>
        {{ JSON.stringify(permisoGuardar, null, 3) }}
      </div>
    </div>

    <div v-if="is_dev && debug">
      <div class="card">
        <div class="card-body">
          <strong>group:</strong> {{ JSON.stringify(group, null, 3) }}
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <strong>dataUserLogin:</strong>
          {{ JSON.stringify(dataUserLogin, null, 3) }}
        </div>
      </div>
      <div class="card">
        <pre><div class="card-body"><strong>groupResearchers:</strong> {{ JSON.stringify(groupResearchers, null, 3) }}</div></pre>
      </div>
      <div class="card">
        <!-- <div class="card-body"><strong>identiicacion:</strong> {{ JSON.stringify(identification, null, 3) }}</div> -->
      </div>
      <div class="card">
        <div class="card-body">
          <strong>internal_members_proposal:</strong>
          {{ JSON.stringify(internal_members_proposal, null, 3) }}
        </div>
      </div>
    </div>


    

  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
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
  created: async function () {
    root = this;
    let arg = {};
    arg.url = 'role';
    root.tiposParticipante = await root.univerdalGet(arg);
    console.warn("data create: => ", root.tiposParticipante)
    // root.tipo_proyecto = root.subtypesByType("proyectos_informacion_tipos");
  },

  // watch: {
  //   crudModelCreate: {
  //     handler: function (val, oldVal) {
  //       console.log("beep1");
  //       if(this.proposal.title != null)  this.$emit("updatedCreate", this.crudModelCreate);
  //       // This doesn't work
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  //   proposal: {
  //     deep: true,
  //     immediate: true,
  //     handler: function (val, oldVal) {
  //       // console.clear();
  //       console.log("newProposal =>", val);
  //       if(this.proposal.title != null) root.$emit("updateProposal", val);
  //     },
  //   },
  // },
  async mounted() {
    // console.clear();
    root = this;
    root.proposal.proposal_status_id = root.get_sub_type_id("borrador");
    root.dataUserLogin = await root.universalgetOas({
      doc: root.user.local.identification_number,
    });
    await root.getSinData({
      // url: "/research_units/117/group_member/10286",
      url:
        "/researcher_research_units/?identification_number=" +
        parseInt(root.user.local.identification_number),
      cb: function (results) {
        let objeto = results;
        root.groupResearchers.gropusmember = objeto;
        root.groupResearchers.gropusmember2 = objeto;
        setTimeout(function () {
          root.cargarDatosPropuesta();
        }, 500);

        // let resoultFind = objeto.find(buscador => buscador.research_group_id === parseInt(root.inforBase.research_group_id));
        // if (resoultFind != undefined) root.groupResearchers.datagroupmenber = resoultFind;
        // root.loaderHide();
        console.warn("datos internos integrante ", objeto);
      },
    });
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
    Geo: () => import("@/components/element/geo_multiciudad"),
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
    edit: {
      type: Boolean,
      default: () => false,
    },
    permisoGuardar: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    tiposParticipante: null,
    proposal: {
      title: null,
      geo_country_id: null,
      geo_state_ids: null,
      description: null,
      duration: 0,
      proposal_status_id: null,
      project_type_id: null,
      total_amount_in_kind: 0,
      total_amount_request_cidc: 0,
      total_counterparty: 0,
      active: true,
      geo_city_ids: null,
      research_groups_id: null,
      research_focus_ids: null,
      keywords: [],
    },
    dataSoursePalabras: [],
    stateAddKeyWorld: false,
    textkeywords: [],
    internal_members_proposal: {
      role_id: null,
      active: true,
      researcher_id: null,
      created_by: null,
    },
    group: {},
    gropu_add: [],
    dataUserLogin: {},
    identification: {},
    getFacultades: null,
    groupResearchers: {
      gropusmember: {},
      datagroupmenber: { role_name: null, id: null },
    }, //guarda datos importantes del usuario logeado de la estructura logeada
  }),
  computed: {
    ...mapGetters("core/tipo", ["subtypesByType"]),
    tipo_proyecto() {
      return root.subtypesByType("proyectos_informacion_tipos");
    },
    estadoProyecto() {
      return root.subtypesByType("estado_criterios_evaluacion");
    },
    lines() {
      return root.subtypesByType("lista_total_lineas");
    },
  },
  methods: {
    ...mapActions("unidad", ["getUnit"]),
    ...mapActions("unidad/producto/universalSentUpAct", {
      univerdalGet: "univerdalGet",
      get: "get",
      getSinData: "getSinData",
      universalgetOas: "universalgetOas",
      objSave: "save",
      objUpdate: "update",
    }),
    nako(newProposal) {
      console.log(root.$sep);
      console.log("INFO CHILD updateProposal() =>", newProposal);
      root.proposal = newProposal;
    },
    newKeyWorld(e) {
      if (!root.stateAddKeyWorld) {
        root.$info("Digite cada palabra clave separada por una coma");
        root.stateAddKeyWorld = true;
        root.textkeywords = null;
      } else {
        let arregloPalabras = [];
        // root.$info("Palabra(s) calve Pre-registradas");
        root.stateAddKeyWorld = false;
        arregloPalabras = root.textkeywords.split(",");
        root.proposal.keywords = root.proposal.keywords.concat(arregloPalabras);
        root.dataSoursePalabras =
          root.dataSoursePalabras.concat(arregloPalabras);
        // console.warn(root.arregloPalabras);
        // console.warn( root.proposal.keywords);
        // console.warn(root.dataSoursePalabras);
      }
    },
    cargarDatosPropuesta() {
      root.loaderShow("Cargando Propuesta");
      let propuestaUsuario = root.propuesta;
      console.warn("propuesta=>", propuestaUsuario);
      let i = 0;
      setTimeout(function () {
        // do{
        i++;
        console.warn("propuesta " + i + " settimeout=>", propuestaUsuario);
        if (propuestaUsuario.id != 0 && propuestaUsuario != null) {
          root.get({
            url: "/proposals/" + propuestaUsuario.id,
            cb: function (results) {
              let objeto = results;
              root.proposal = objeto;
              root.proposal.geo_country_id = objeto.geo_country_ids[0];
              // root.proposal.geo_state_id=objeto.geo_state_ids[0];
              root.proposal.research_focus_ids = objeto.research_focuses.map(
                (lineasinv) => lineasinv.research_focus_id
              );
              root.dataSoursePalabras = objeto.keywords;
              root.loaderHide();
            },
          });
        } else {
          root.loaderHide();
        }
        // }while(propuestaUsuario == null);
      }, 2000);
    },
    list_lines_researcher(e) {
      console.warn("e=>", e);
      if (e.value != null) {
        //busca dentro de la unidad de investigacion seleccionada la informacion requerida para traer las lineas de investigacion research_units
        let idx = e.value;

        let nuevadata = root.groupResearchers.gropusmember2.find(
          (elemet) => elemet.research_group_id === idx
        );
        // root.internal_members_proposal=nuevadata;
        // root.internal_members_proposal.role_id=nuevadata.role_id;
        root.internal_members_proposal.researcher_id = nuevadata.id;
        console.warn(
          "internal_members_proposal=>",
          root.internal_members_proposal
        );
        root.getUnit({
          id: idx,
          cb: function (result) {
            let estadogrupo = result;
            root.proposal.research_focus_ids = estadogrupo.research_focus_ids;

            // root.loadMembers();
          },
        });
      } else {
        root.proposal.research_focus_ids = [];
      }
    },
    saveUser(idpropuesta) {
      root.internal_members_proposal.created_by = root.user_id;
      let obj = root.internal_members_proposal;
      let dto = {
        newFormat: true,
        rute2: "proposals/" + idpropuesta + "/internal_members_proposals",
        stringEP: "proposals",
        mod: idpropuesta,
        objectSend: JSON.parse(
          `{ "internal_members_proposal": ` + JSON.stringify(obj) + "}"
        ),
        cb: function (item) {
          console.log("item", item);
        },
      };
      root.objSave(dto);
    },
    save() {
      console.log(this.$sep);
      var result = root.$refs.basicGroup.instance.validate();
      console.log("result", result);
      if (result.isValid) {
        console.log("VALID!");
        let msg =
          (root.edit == false ? "Creando" : "Actualizando") + " Propuesta";
        if (root.proposal.keywords.length > 0) {
          root.loaderShow(msg, root.panelData);
          if (root.edit == true) root.proposal.updated_by = root.user_id;
          else root.proposal.created_by = root.user_id;
          root.proposal.geo_state_ids = [root.proposal.geo_state_id];
          let obj = root.proposal;
          let estadoEdit = root.edit == false ? "Creanda" : "Actualizanda";
          console.warn("root.edit", root.edit);
          let dto = {
            newFormat: true,
            rute2: "calls/" + root.$route.params.convocatoriaId + "/proposals",
            stringEP: "proposals",
            mod: obj.id,
            objectSend: JSON.parse(
              `{ "proposal": ` + JSON.stringify(obj) + "}"
            ),
            cb: function (item) {
              if (!root.edit) root.saveUser(item.id);
              root.$info(
                "Estimado investigador, Su aplicación fue " +
                  estadoEdit +
                  " con éxito. <br/>."
              );
              console.log("item", item);
              root.loaderHide();
              setTimeout(function () {
                location.reload();
              }, 1000);
              //root.go(0, "/convocatoria/aplicaciones", `Cargando Convocatorias`);
            },
          };
          if (root.edit) root.objUpdate(dto);
          else root.objSave(dto);
          // root.cancel();
        } else {
          let msg = root.edit == false ? "crear" : "actualizar";
          root.$info(
            "Por favor digite la(s) palabra(s) clave(s) en el espacio recomendado separadas por una coma.<br>Al terminar presione el botón crear palabra(s) para poder <em>" +
              msg +
              "</em> la información del proyecto."
          );
        }
      }
    },
  },
};
</script>
