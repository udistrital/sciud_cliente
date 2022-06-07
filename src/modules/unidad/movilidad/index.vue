<template>
  <div v-if="group">
    
    <div class="page-header header-elements-md-inline">
      <div class="page-title d-flex">
        <h1>
          <i class="icon-books mr-1 color-main-600"></i>
          <span class="font-weight-semibold" id="title">Estructuras de Investigación</span>
          <span> &raquo; Selección de Convocatorias</span>
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

    <!-- cuadro principal de informacion -->
    <div class="row">
      <div class="col">
        <div class="card" id="tipos-convocatorias">
          <div class="card-body group-detail mh">
            
            <!-- seccion de subtitulo -->
            <div class="row mb-3">
              <div class="col">
                <div class="col d-flex justify-content-between align-items-end">
                  <div class="title">
                    <i class="icon-clipboard"></i><small>
                      <i>Tipos de Convocatoria </i> &raquo;
                      {{ $titleCase(group.name) }}</small>
                  </div>
                </div>
              </div>
            </div>
            <!-- fin seccion subtitulo -->  

            <!-- seccion de contenido -->
            <div class="row mb-3">
              <div class="col">

              

                <DxAccordion :collapsible="false" :multiple="false">
									<template #title="{ data }"><div class="col pt-2 pb-2"><i :class="'icon-' + data.icon"></i>{{ data.title }}</div></template>

									<DxItem title="Información General para Postulación" icon="info" id="inftomacion" data-idx="1">
										<template #default>
                      <div>
                        
                        <div class="col-md-12 mt-3">
                          <div class="alert alert-warning" role="alert" v-if="groupResearchers.datagroupmenber.id == null"> <i class="icon-info mr-1 "></i> 
                          El usuario no está registrado en este grupo o semillero de investigación, no puede aplicar a estas convocatorias.</div>
                        </div>

                        <div class="row">

                          <div class="col-md-6 mt-3">
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
                          </div>

                          <div class="col-md-6 mt-3">
                              <legend>Información Básica del Investigador</legend>
                              <div class="row">
                                <div class="col-md-12">
                                  <div class="row">
                                    <div class="col-md-12">
                                      <strong>Identificación: </strong>
                                      {{ dataUserLogin.local.identification_number }}
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
                          </div>
                        
                        </div>

                      </div>
											
										</template>
									</DxItem>

                  <DxItem title="Movilidad" icon="info" id="inftomacion" data-idx="1">
										<template #default>
                      <!-- <NuevoConocimiento :group="group" :editMode="editMode" /> -->
                      <tacs :group="group" :researcherData="groupResearchers" :puedeAplicar="groupResearchers.datagroupmenber.id !== null" />
                    </template>
                  </DxItem>
									
								</DxAccordion>


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
    group: null, //trae los datos de la estructura seleccionada
    isAdmin: false,
    rutaprincipal: null,
    groupResearchers: {gropusmember:{}, datagroupmenber:{role_name:null, id:null}}, //guarda datos importantes del usuario logeado de la estructura logeada
  }),

  components: {
		DxItem,
		DxAccordion,
    tacs: () => import("@/modules/unidad/movilidad/tags_movilidad"),
  },


  created: function () {
    root=this;
    root.dataUserLogin = this.user;
    root.rutaprincipal = String(location.href).slice(0, -this.$route.path.length) + "/unidad";
    console.warn("dataUserLogin: ", root.dataUserLogin);
    // buscar datos de unidad
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

<style>

</style>