<template>
  <div v-if="group">
    <div class="page-header header-elements-md-inline">
      <div class="page-title d-flex">
        <h1>
          <i class="icon-books mr-1 color-main-600"></i>
          <span class="font-weight-semibold" id="title">Estructuras de Investigación</span>
          <span> &raquo;Convocatorias de Movilidad Apliación</span>
        </h1>
        <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
      </div>

      <div class="header-elements" v-if="true">

        <a :href="rutaprincipal" title="Volver a Unidades..." class="
            btn btn-sm btn-main btn-labeled btn-labeled-left
            legitRipple
            ml-2
          ">
          <b><i class="icon-arrow-left2"></i></b> Estructuras
        </a>

      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="card" id="panel-plan-accion">
          <div class="card-body group-detail mh">
            <div class="row mb-3">
              <div class="col">
                <div class="col d-flex justify-content-between align-items-end">
                  <div class="title">
                    <i class="icon-clipboard"></i><small>
                      <i>Aplicación Convocatoria Movilidad</i> &raquo;
                      {{ $titleCase(group.name) }}</small>
                  </div>
                  <!-- <div class="sub-title"><i class="icon-history"></i>Gestion de Informacion</div> -->
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mt-3">
                <fieldset>
                  <legend>Información Básica del Grupo</legend>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-12">
                          <strong>Grupo de Investigación o Semillero: </strong>{{ group.name }}
                        </div>
                        <div class="col-md-12">
                          <strong>Fecha de Registro Grupo: </strong>
                          {{ group.cidc_registration_date }}
                        </div>
                        <div class="col-md-12">
                          <strong>Codigo Colciencias: </strong>{{ group.colciencias_code }}
                        </div>
                        <div class="col-md-12">
                          <strong>Enlace GrupLac (SIENTI): </strong>
                          <a :href="group.gruplac" target="_blank">{{
                              group.gruplac
                          }}</a>
                        </div>
                        <div class="col-md-12">
                          <strong>Fecha de Registro Grupo: </strong>
                          {{ group.cidc_registration_date }}
                        </div>
                        <div class="col-md-12">
                          <strong>Correo de Contácto: </strong>
                          <a :href="'mailto:' + group.email" target="_blank">{{
                              group.email
                          }}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="col-md-6 mt-3">
                <fieldset>
                  <legend>Información Básica del Investigador</legend>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-12">
                          <strong>Identificación: </strong>
                          {{ dataUserLogin.local.identification_number }}
                        </div>
                        <div class="col-md-12">
                          <strong>Tipo Vinculacion: </strong>
                          {{ dataUserLogin.oas.role[0] }}
                        </div>
                        <div class="col-md-12">
                          <strong>Correo electronico: </strong>
                          <a :href="'mailto:' + group.email" target="_blank">{{ dataUserLogin.oas.email }}</a>
                        </div>
                        <div class="col-md-12">
                          <strong>Rol del Sistema: </strong>
                          {{ dataUserLogin.local.user_role_name }}
                        </div>
                        <div class="col-md-12">
                          <strong>Nombre: </strong>{{ dataUserLogin.oas_details.TerceroId.NombreCompleto }}
                        </div>
                        <div class="col-md-12">
                          <strong>Rol del Grupo o Semillero: </strong>{{ groupResearchers.datagroupmenber.role_name }}
                        </div>


                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

            </div>

            <p></p>
            <div class="col-md-12 mt-3">
               <div class="alert alert-warning" role="alert" v-if="groupResearchers.datagroupmenber.id == null"> <i class="icon-info mr-1 "></i> 
              El usuario no está registrado en este grupo o semillero de investigación, no puede aplicar a estas convocatorias.</div>
              <tacs :group="group" :researcherData="groupResearchers" :puedeAplicar="groupResearchers.datagroupmenber.id !== null" />
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
            <pre>{{ JSON.stringify(group, null, 3) }}</pre>

            <strong class="font-weight-semibold">dataUserLogin:</strong>
            <pre>{{ JSON.stringify(dataUserLogin, null, 3) }}</pre>


            <strong class="font-weight-semibold">groupResearchers:</strong>
            <pre>{{ JSON.stringify(groupResearchers, null, 4) }}</pre>



          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root;

let $ = window.jQuery;
import DxStore from "@/store/dx";
import { mapActions, mapGetters, mapState } from "vuex";
// import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";

export default {
 created: function () {
    root = this;
    let today = new Date();
    let year = today.getFullYear(),
      newyear = year + 1;
    let usersys = this.user;
    root.dataUserLogin = usersys;



    root.rutaprincipal = String(location.href).slice(0, -this.$route.path.length) + "/unidad";

    root.isAdmin = this.user_role_id === this.get_role_id("administrador");
    console.warn("la ruta", this.$route);
    root.getUnit({
      id: root.$route.params.unidadId,
      cb: function (result) {
        root.group = result;
        document.title += ` ${root.$titleCase(root.group.name)}`;
        root.loadMembers();
      },
    });

  },

  async mounted(){
    
    await root.getSinData({
      // url: "/research_units/117/group_member/10286",
      url: "/researcher_research_units/?identification_number="+parseInt(root.dataUserLogin.local.identification_number),
      cb: function (results) {
        let objeto = results;
        root.groupResearchers.gropusmember=objeto;
        let resoultFind  = objeto.find( buscador => buscador.research_group_id === parseInt(root.$route.params.unidadId) );
        if(resoultFind != undefined) root.groupResearchers.datagroupmenber=resoultFind;
        root.loaderHide();
        console.warn("datos internos integrante ", objeto)
      },
    });
  },

  data: () => ({
    dataUserLogin: null,
    rutaprincipal: null,
    group: null,
    isAdmin: false,
    totaCount: 0,
    groupResearchers: {gropusmember:{}, datagroupmenber:{role_name:null, id:null}},
    // dataSource: data,
  }),

  components: {
    tacs: () => import("@/modules/unidad/movilidad/tags_movilidad"),
  },

  computed: {
    ...mapGetters("core/tipo", ["subtypesByType"]),
    // ...mapState("unidad/colciencias", { convocatorias: "items" }),

    tipos() {
      return root.subtypesByType("convocatoria_tipo", "id");
    },
    beneficiarios() {
      return root.subtypesByType("convocatoria_beneficiario", "id");
    },
    estados() {
      return root.subtypesByType("convocatoria_estado", "id");
    },

    dataSource: function () {
      if (typeof this.group.id === "undefined") return null;
      console.log("root.group", this.group);
      return DxStore({
        key: ["id"],
        endPoint: "calls",
        onLoading: function (loadOptions) {
          root.loaderShow("Cargando elementos", "#panel-produccion .card-body");
        },
        onLoaded: function (results, baseEntity) {
          console.log("results", results);
          root.totaCount = results.totalCount;
          root.loaderHide();
        },
      });
    },
  },

  methods: {
    ...mapActions("unidad", ["getUnit"]),
    ...mapActions("unidad/producto/universalSentUpAct", {
      objSave: "save",
      objUpdate: "update",
      elementoActive: "active",
      getSerarchDoc: "univerdalGet",
      getSinData: "getSinData",
    }),

    loadMembers() {
      console.log("members", root.group.member_ids);
    },


    gridInit(e) {
      let root = this;
      root.grid = e.component;
      // 202103311458: https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Events/
      root.grid.on({
        contentReady: (e) => {
          console.log("contentReady", e);
          if (root.mode == null) root.loaderHide();
        },
        optionChanged: (e) => {
          if (e.fullName == "paging.pageIndex") {
            console.log("optionChanged", e);
            root.loaderShow();
          }
        },
        editorPreparing: (e) => {
          if (e.dataField === "LastName" && e.parentType === "dataRow") {
            e.editorOptions.disabled =
              e.row.data && e.row.data.FirstName === "";
          }
        },
      });
    },
    onContentReady(e) {
      console.log(root._sep);
      console.log("onContentReady!", e);
    },
    cmdClick(e, data) {
      // // console.clear();
      let action = e.itemData.command;
      console.log("action", action);
      console.log("data", data);
      if (action === "edit" || action === "parent_type" || action === "type")
        root.edit(action, data.data);
      else if (action === "enable" || action === "disable")
        root.enable(action === "enable", data.data);
    },
  },
};
</script>
