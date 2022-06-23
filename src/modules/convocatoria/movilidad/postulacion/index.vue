<template>
    <div v-if="group">

        <div class="page-header header-elements-md-inline">
            <div class="page-title d-flex">
                <h1>
                    <i class="icon-books mr-1 color-main-600"></i>
                    <span class="font-weight-semibold" id="title">Convocatorias</span>
                    <span> &raquo; Lista de postulaciones</span>
                </h1>
                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
            </div>

            <div class="header-elements" v-if="true">
                <router-link tag="a" :to="'/convocatoria'" class="btn btn-main btn-labeled btn-labeled-left legitRipple"
                    title="Regresar al listado de convocatorias">
                    <b><i class="icon-arrow-left2"></i></b>Volver a Convocatorias
                </router-link>
            </div>

        </div>

        <!-- cuadro principal de informacion -->
        <div class="row">
            <div class="col">
                <div class="card" id="tipos-convocatorias">
                    <div class="card-body group-detail mh">

                        <div class="row mb-3">
                            <div class="col">

                                <Aplicaciones :group="group" :userinfo="groupResearchers" :editMode="editMode"
                                    title="Listado de Aplicaciones" endPointRute="mobility_calls"
                                    objEpdata="mobility_call" titleBtn="Vista Aplicacion" titlecolum="event_name" />


                            </div>
                        </div>
                        <!-- fin seccion de contenido -->

                    </div>
                </div>
            </div>
        </div>
        <!-- fin cuadro principal de informacion -->


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
            <!-- // fin del div modo debug -->
        </div>

        <!-- // fin del div grupo -->
    </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root;
import DxAccordion, { DxItem } from "devextreme-vue/accordion";
import { mapActions, mapGetters, mapState } from "vuex";

export default {

  data: () => ({
    dataUserLogin: null, //trae los datos del usuario logueado
    rolStructureUser: null,
    group: {}, //trae los datos de la estructura seleccionada
    isAdmin: false,
    rutaprincipal: null,
    groupResearchers: { gropusmember: {}, datagroupmenber: { role_name: null, id: null } }, //guarda datos importantes del usuario logeado de la estructura logeada
  }),

  components: {
    DxItem,
    DxAccordion,
    // tacs: () => import("@/modules/convocatoria/movilidad/postulacion/tags_movilidad"),
    Aplicaciones: () => import("@/modules/convocatoria/movilidad/postulacion/lista_movilidad.vue"),
  },


  created: function () {
    root = this;
    root.dataUserLogin = this.user;
    root.rutaprincipal = String(location.href).slice(0, -this.$route.path.length) + "/unidad";
    console.warn("dataUserLogin: ", root.dataUserLogin);

  },

  async mounted() {

    await root.getSinData({
       // url: "/research_units/117/group_member/10286",
       url: "/researcher_research_units/?identification_number=" + parseInt(root.dataUserLogin.local.identification_number),
       cb: function (results) {
         let objeto = results;
         root.groupResearchers.gropusmember = objeto;
        //  let resoultFind = objeto.find(buscador => buscador.research_group_id === parseInt(root.$route.params.unidadId));
        //  if (resoultFind != undefined) root.groupResearchers.datagroupmenber = resoultFind;
         root.loaderHide();
         console.warn("datos internos integrante ", objeto)
       },
    });
  },

  computed: {
    ...mapGetters("core/tipo", ["subtypesByType"]),
  },

  methods: {
    ...mapActions("unidad", ["getUnit"]),
    ...mapActions("unidad/producto/universalSentUpAct", {
      getSerarchDoc: "univerdalGet",
      getSinData: "getSinData",
    }),

    loadMembers() {
      console.log("members", root.group.member_id);
    },

  },

}
</script>

<style scoped>
.texto {
  color: darkslategrey;
}
</style>>