<template>
  <div v-if="convocatoria != null">
    <div class="page-header header-elements-md-inline">
      <div class="page-title d-flex">
        <h1>
          <i class="icon-books mr-1 color-main-600"></i>
          <span class="font-weight-semibold" id="title"
            >Evaluación de Proyecto</span
          >
          <span> &raquo; {{ convocatoria.call_name }}</span>
        </h1>
        <a href="#" class="header-elements-toggle text-default d-md-none"
          ><i class="icon-more"></i
        ></a>
      </div>

      <div class="header-elements">
        <a
          href="#"
          @click.prevent="
            go(
              convocatoria.id,
              '/convocatoria/' + convocatoria.id + '/proyecto',
              `Cargando Estructuras`
            )
          "
          title="Volver a Convocatorias..."
          class="
            btn btn-sm btn-main btn-labeled btn-labeled-left
            legitRipple
            ml-2
          "
          ><b><i class="icon-arrow-left2"></i></b>Lista de Propuestas</a
        >
      </div>
    </div>

    <!-- <div class="row">
      <div class="col"> -->
    <div class="card" id="panel-convocatoria-proyecto">
      <div class="card-body group-detail mh">
        <!---->
        <div class="row mb-3">
          <div class="col">
            <div class="col d-flex justify-content-between align-items-end">
              <!-- <div class="title"><i class="icon-books"></i> {{ $titleCase(group.name) }}</div> -->
              <div class="title">
                <i class="icon-books"></i>Propuesta: {{ titulo_propuesta }}
              </div>
              <div class="sub-title">
                <i class="icon-info"></i
                >{{ !modoEditar ? " Creación" : "Evaluación" }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="row"
          v-if="
            convocatoria.call_type_name.toUpperCase() ==
            'Proyecto de Investigación'.toUpperCase()
          "
        >
          <!-- <div class="row" > -->
          <div class="col">
            <DxTabPanel
              :show-nav-buttons="true"
              :animation-enabled="true"
              :multiple="true"
              ref="tabPanel"
            >
              <DxItem title="Información Básica">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Informacion
                        :convocatoria="convocatoria"
                        :edit="modoEditar"
                        :propuesta="propuesta"
                        :permisoGuardar="visibleguardar"
                      ></Informacion>
                    </div>
                  </div>
                </template>
              </DxItem>

              <DxItem
                title="Grupos e Integrantes Anexos"
                :disabled="!modoEditar"
              >
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Gruposintegrantes
                        :convocatoria="convocatoria"
                        :editOBJ="modoEditar"
                        :propuesta="propuesta"
                        endPointRute=""
                        objEpdata=""
                        :permisoGuardar="visibleguardar"
                      >
                      </Gruposintegrantes>
                    </div>
                  </div>
                </template>
              </DxItem>

              <DxItem title="Evaluadores Sugeridos" :disabled="!modoEditar">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Evaluadores
                        :convocatoria="convocatoria"
                        :editOBJ="modoEditar"
                        :propuesta="propuesta"
                        endPointRute=""
                        objEpdata=""
                        :permisoGuardar="visibleguardar"
                      ></Evaluadores>
                    </div>
                  </div>
                </template>
              </DxItem>

              <DxItem title="Formulación de Propuesta" :disabled="!modoEditar">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Capitulos
                        :convocatoria="convocatoria"
                        :edit="modoEditar"
                        :propuesta="propuesta"
                        :permisoGuardar="visibleguardar"
                      ></Capitulos>
                    </div>
                  </div>
                </template>
              </DxItem>

              <DxItem title="Objetivos" :disabled="!modoEditar">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Objetivos
                        :convocatoria="convocatoria"
                        :editOBJ="modoEditar"
                        :propuesta="propuesta"
                        endPointRute=""
                        objEpdata=""
                        :permisoGuardar="visibleguardar"
                      ></Objetivos>
                    </div>
                  </div>
                </template>
              </DxItem>

              <DxItem title="Cronograma de Actividades" :disabled="!modoEditar">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Cronograma
                        :convocatoria="convocatoria"
                        :editMode="modoEditar"
                        :propuesta="propuesta"
                        :permisoGuardar="visibleguardar"
                      ></Cronograma>
                    </div>
                  </div>
                </template>
              </DxItem>

              <DxItem title="Análisis de Riesgos" :disabled="!modoEditar">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Analisis
                        :convocatoria="convocatoria"
                        :editOBJ="modoEditar"
                        :propuesta="propuesta"
                        endPointRute=""
                        objEpdata=""
                        :permisoGuardar="visibleguardar"
                      ></Analisis>
                    </div>
                  </div>
                </template>
              </DxItem>

              <DxItem title="Productos Esperados" :disabled="!modoEditar">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Productos
                        :convocatoria="convocatoria"
                        :edit="modoEditar"
                        :propuesta="propuesta"
                        :permisoGuardar="visibleguardar"
                      ></Productos>
                    </div>
                  </div>
                </template>
              </DxItem>

              <DxItem title="Impactos" :disabled="!modoEditar">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Impactos
                        :convocatoria="convocatoria"
                        :editOBJ="modoEditar"
                        :propuesta="propuesta"
                        endPointRute=""
                        objEpdata=""
                        :permisoGuardar="visibleguardar"
                      ></Impactos>
                    </div>
                  </div>
                </template>
              </DxItem>

              <DxItem title="Presupuesto" :disabled="!modoEditar">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Presupuesto
                        :convocatoria="convocatoria"
                        :edit="modoEditar"
                        :propuesta="propuesta"
                        :permisoGuardar="visibleguardar"
                      ></Presupuesto>
                    </div>
                  </div>
                </template>
              </DxItem>

              <DxItem title="Documentos" :disabled="!modoEditar">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Documentos
                        :id_proposal="propuesta.id"
                        :propuesta="propuesta"
                        :convocatoria="convocatoria"
                        :permisoGuardar="visibleguardar"
                      ></Documentos>
                    </div>
                  </div>
                </template>
              </DxItem>

              <DxItem title="Evaluacion de Propuesta" :disabled="!modoEditar">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Eval
                        :convocatoria="convocatoria"
                        :editOBJ="modoEditar"
                        :propuesta="propuesta"
                        endPointRute=""
                        objEpdata=""
                        :permisoGuardar="es_admin"
                      ></Eval>
                    </div>
                  </div>
                </template>
              </DxItem>
            </DxTabPanel>
          </div>
        </div>
        <div v-else>
          <div class="alert alert-secondary" role="alert">
            <i class="icon-info"></i><em><b>Error:</b></em
            ><br />Esta convocatoria es de: {{ convocatoria.call_type_name }},
            por tanto no puede aplicar desde este vinculo.
            <hr />
            <a
              href="#"
              @click.prevent="
                go(convocatoria.id, '/convocatoria', `Cargando Convocatorias`)
              "
              title="Volver a Convocatorias..."
              class="
                btn btn-sm btn-main btn-labeled btn-labeled-left
                legitRipple
                ml-2
              "
              ><b><i class="icon-arrow-left2"></i></b> Regresar a
              Convocatorias</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- </div>
    </div> -->

    <div class="row" v-if="is_dev && debug">
      <div class="col">
        <div class="card">
          <div class="card">
            <div class="card-body">
              <strong>propuesta:</strong>
              {{ JSON.stringify(propuesta, null, 3) }}
            </div>
          </div>
          <div class="card">
            <!-- <span class="font-weight-semibold">editMode:</span> {{ editMode }} -->
            <hr class="sep mb-0" />
            <span class="font-weight-semibold">modoEditar:</span>
            {{ JSON.stringify(modoEditar, null, 3) }}
          </div>
          <div class="card">
            <div class="card-body">
              <strong>dataUserLogin:</strong>
              {{ JSON.stringify(dataUserLogin, null, 3) }}
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <strong>propuesta:</strong>
              {{ JSON.stringify(propuesta, null, 3) }}
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
let root;
import { mapActions, mapGetters, mapState } from "vuex";
import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";
export default {
  created: function () {
    root = this;

    root.estado.borrador = root.get_sub_type_id("borrador");
    root.estado.subsanar = root.get_sub_type_id("por_subsanar");
    root.estado.enviar = root.get_sub_type_id("enviar");
    console.warn("root.estado => ", root.estado);
    root.getDataPropostal();

    // root.loaderShow("Cargando Información", ".card-body");
  },
  async mounted() {
    root.dataUserLogin = await root.universalgetOas({
      doc: root.user.local.identification_number,
    });
  },
  data: () => ({
    estado: {
      subsanar: 0,
      borrador: 0,
      enviar: 0,
    },
    visibleguardar: false,
    convocatoria: null,
    existe_propuesta: false,
    modoEditar: false,
    titulo_propuesta: null,
    dataUserLogin: {},
    propuesta: null,
  }),
  components: {
    DxItem,
    DxTabPanel,
    Informacion: () =>
      import("@/modules/convocatoria/proyectos/propuesta/informacion_base"),
    Gruposintegrantes: () =>
      import(
        "@/modules/convocatoria/proyectos/propuesta/integrantes_grupos/index.vue"
      ),
    Evaluadores: () =>
      import(
        "@/modules/convocatoria/proyectos/propuesta/evaluadores_sugeridos"
      ),
    Capitulos: () =>
      import(
        "@/modules/convocatoria/proyectos/propuesta/capitulos_formulacion"
      ),
    Objetivos: () =>
      import(
        "@/modules/convocatoria/proyectos/propuesta/objetivos_metodologia"
      ),
    Cronograma: () =>
      import(
        "@/modules/convocatoria/proyectos/propuesta/cronograma_actividades"
      ),
    Analisis: () =>
      import("@/modules/convocatoria/proyectos/propuesta/analisis_riesgos"),
    Productos: () =>
      import("@/modules/convocatoria/proyectos/propuesta/productos_esperados"),
    Presupuesto: () =>
      import("@/modules/convocatoria/proyectos/propuesta/presupuesto"),
    Impactos: () =>
      import("@/modules/convocatoria/proyectos/propuesta/impactos"),
    Documentos: () =>
      import("@/modules/convocatoria/proyectos/propuesta/documentos.vue"),
    Eval: () =>
      import("@/modules/convocatoria/proyectos/evaluacion/eval_criterios.vue"),
  },
  methods: {
    ...mapActions("unidad/producto/universalSentUpAct", {
      getSerarchDoc: "univerdalGet",
      getSinData: "getSinData",
      universalgetOas: "universalgetOas",
      get: "get",
      elementoActive: "active",
    }),

    async getDataPropostal() {
      await root.getSinData({
        url: "proposals/" + root.$route.params.propuestaId,
        cb: function (results) {
          let data = results;
          //if (data.data.length > 0) {
          root.propuesta = data;
          console.warn("propuesta", root.propuesta);
          root.titulo_propuesta = root.propuesta.title;
          root.modoEditar = true;
          console.warn("root.modoEditar => ", root.modoEditar);

          console.warn(
            "root.propuesta.proposal_status_id => ",
            root.propuesta.proposal_status_id
          );
          console.warn("root.estado.subsanar => ", root.estado.subsanar);
          console.warn("root.estado.borrador => ", root.estado.borrador);
          root.get_convocatoria(root.propuesta.call_id);
        },
      });
    },

    get_convocatoria(id) {
      root.get({
        url: "calls/" + id,
        cb: function (results) {
          root.convocatoria = results;
          root.loaderHide();
        },
      });
    },
  },
};
</script>