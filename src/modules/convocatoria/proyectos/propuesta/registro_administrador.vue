<template>
    <div v-if="convocatoria != null">
      <div class="page-header header-elements-md-inline">
        <div class="page-title d-flex">
          <h1>
            <i class="icon-books mr-1 color-main-600"></i>
            <span class="font-weight-semibold" id="title"
              >Convocatoria Proyecto</span
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
              go(convocatoria.id, '/convocatoria/'+convocatoria.id+'/proyecto', `Cargando Estructuras`)
            "
            title="Volver a Convocatorias..."
            class="
              btn btn-sm btn-main btn-labeled btn-labeled-left
              legitRipple
              ml-2
            "
            ><b><i class="icon-arrow-left2"></i></b> Lista de Proyectos</a
          >
  
          <!-- <a
                      href="#"
                      @click.prevent="renderDoc()"
                      title="Exportar propuesta..."
                      class="
              btn btn-sm btn-main btn-labeled btn-labeled-left
              legitRipple
              ml-2
            "
                      ><b><i class="icon-arrow-left2"></i></b> Exportar</a
                  > -->
  
          <!-- <a
            @click.prevent="renderDoc()"
            href="#"
            title="Exportar Propuesta a Word..."
            class="
              ml-2
              btn btn-sm btn-main btn-labeled btn-labeled-right
              legitRipple
            "
            >Exportar propuesta<b><i class="icon-file-word"></i></b
          ></a>
   -->
          <a
            @click.prevent="enviarPropuesta()"
            href="#"
            v-if="visibleguardar"
            title="Enviar propuesta..."
            class="
              ml-2
              mr-2
              btn btn-sm btn-main btn-orange btn-labeled btn-labeled-right
              legitRipple
            "
          >
            Enviar propuesta<b><i class="icon-paperplane"></i></b>
          </a>
        </div>
      </div>
  
  
      <div class="card" id="panel-convocatoria-proyecto">
        <div class="card-body group-detail mh">
  
          <div class="row mb-3">
            <div class="col">
              <div class="col d-flex justify-content-between align-items-end">
                <div class="title">
                  <i class="icon-books"></i>Propuesta: {{ titulo_propuesta }}
                </div>
                <div class="sub-title">
                  <i class="icon-info"></i
                  >{{ !modoEditar ? " Creación" : "Información" }}
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
                          :edit="modoEditar"
                          ref="compInformacion"
                          :propuesta="propuesta"
                          :convocatoria="convocatoria"
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
                          ref="compCronograma"
                          :convocatoria="convocatoria"
                          :editMode="modoEditar"
                          :propuesta="propuesta"
                          :permisoGuardar="visibleguardar"
                          @update-proposal="updateProposal"
                        />
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
                          :edit="modoEditar"
                          :propuesta="propuesta"
                          :convocatoria="convocatoria"
                          :permisoGuardar="visibleguardar"
                          @update-proposal="updateProposal"
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
      <!--</div>
      </div>--> 
      <div class="row" v-if="is_dev && debug">
        <div class="col">
          <div class="card">
            <div class="card">
              <div class="card-body">
                <strong>propuesta:</strong>
                {{ JSON.stringify(propuesta, null, 3) }}
                <hr />
                <strong>proposal:</strong> {{ JSON.stringify(proposal, null, 3) }}
              </div>
            </div>
            <div class="card">
             
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
                <strong>convicatoria:</strong>
                {{ JSON.stringify(convocatoria, null, 3) }}
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
  import createReport from "docx-templates";
  import { mapActions, mapGetters, mapState } from "vuex";
  import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";
  export default {
    created: function () {
      root = this;
      root.estado.borrador = root.get_sub_type_id("borrador");
      root.estado.subsanar = root.get_sub_type_id("por_subsanar");
      root.estado.enviar = root.get_sub_type_id("enviar");
      console.warn("root.estado => ", root.estado);
      root.get({
        url: "calls/" + root.$route.params.convocatoriaId,
        cb: function (results) {
          root.convocatoria = results;
          root.getDataPropostal();
          root.loaderHide();
        },
      });
      // root.loaderShow("Cargando Información", ".card-body");
    },
    async mounted() {
      root.dataUserLogin = await root.universalgetOas({
        doc: root.$route.params.documento,
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
      
      modoEditar: false,
      titulo_propuesta: null,
      dataUserLogin: {},
      propuesta: null,
      proposal: null,
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
    },
  
  
    methods: {
      ...mapActions("unidad/producto/universalSentUpAct", {
        getSerarchDoc: "univerdalGet",
        getSinData: "getSinData",
        universalgetOas: "universalgetOas",
        get: "get",
        elementoActive: "active",
      }),
  
      updateProposal(newProposal) {
        console.log(root.$sep);
        console.log("INDEX updateProposal()");
        root.proposal = newProposal;
        console.log("root.proposal =>", root.proposal);
        console.log("root.$refs.compInformacion =>", root.$refs.compInformacion);
        root.$refs.compInformacion.nako(newProposal);
      },
  
      confirmarEnvio() {
        root.loaderShow(`Enviando Propuesta`, root.panelGrid);
        let active = JSON.stringify({
          proposal_status_id: root.estado.enviar,
          updated_by: root.user_id,
        });
        var dto = {
          newFormat: true,
          url: `proposals/${root.propuesta.id}`,
          data: JSON.parse(`{ "proposal" :` + active + "}"),
          cb: function (result) {
            console.log("Result", result);
            // root.grid.refresh();
            root.loaderHide();
            root.go(root.propuesta.id, "/convocatoria", `Cargando Estructuras`);
            this.$info("Propuesta Enviada");
          },
        };
        console.log("dto", dto);
        root.elementoActive(dto);
        // root.loaderHide();
      },
  
      // 202110061902: https://github.com/guigrpa/docx-templates/tree/d978ff7a294a9c9516f19fe5c030ab84a1a8cbbc#browser-usage
      renderDoc: async () => {
        console.clear();
        root.loaderShow("Generando Documento", "#panel-documentos .card-body");
        const template = await fetch(
          `${root.baseUrl}data/convocatoria.docx`
        ).then((res) => res.arrayBuffer());
        let item = root.$clone(root.item);
        console.log("item =>", item);
        // item.call_name = item.call_name.toUpperCase();
        // root.document_items.forEach((item) => {
        // 	item["ch_description_html"] = `<meta charset="UTF-8">
        // 		<body>
        // 		<style>
        // 			html, body, td, p { font-family:Calibri,sans-serif; font-size:12.5px; text-align:justify; }
        // 			table tr:first-child td { font-weight: 600 !important; }
        // 			table { width:100%; }
        // 		</style>
        // 		${item.ch_description}
        // 	</body>`;
        // });
        console.log("root.document_items =>", root.document_items);
        const document = await createReport({
          template,
          cmdDelimiter: ["{", "}"],
          data: {
            item: item,
            proposal: root.proposal,
            convocatoria: root.convocatoria,
            chapters: root.document_items,
          },
        });
        let blob = new Blob([document], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        let url = window.URL.createObjectURL(blob);
        root.downloadURL(
          url,
          root.$getTS(new Date(), true) + "-convocatoria.docx"
        );
      },
      
      downloadURL: (data, fileName) => {
        const a = document.createElement("a");
        a.href = data;
        a.download = fileName;
        document.body.appendChild(a);
        a.style = "display: none";
        a.click();
        a.remove();
        setTimeout(function () {
          root.loaderHide();
        }, 800);
      },
      
      enviarPropuesta() {
        this.$confirm(
          "¿Realmente desea enviar la propuesta a evaluación?",
          function (si_no) {
            console.log("result", si_no);
            if (si_no) {
              root.getSinData({
                url: "/proposals/" + root.propuesta.id + "/validate_proposal",
                cb: function (results) {
                  let data = results;
                  let faltantes = data.message;
                  let mensajes_acumulados = "";
                  let acum = 0;
                  for (let i = 0; i < faltantes.length; i++) {
                    acum = i + 1;
                    mensajes_acumulados = acum + "). " + faltantes[i] + "<br>";
                    console.warn(acum);
                  }
                  if (faltantes.length === 0) {
                    root.confirmarEnvio();
                  } else
                    root.$info(
                      "<p align='left'>Existen los siguientes elementos faltantes:<p><br>" +
                        mensajes_acumulados
                    );
                },
              });
            }
          }
        );
      },
  
      async getDataPropostal() {
        await root.getSinData({
          url:
            "proposals/by-internal-member?researcher_identification=" +
            parseInt(root.$route.params.documento) +
            '&filter=["call_id","=","' +
            root.$route.params.convocatoriaId +
            '"]',
            
          cb: function (results) {
            let data = results;
            console.warn("data propuesta  =>",data);

            if (data.data.length > 0) {
              root.propuesta = data.data[data.data.length - 1];
              console.warn("propuesta", root.propuesta);
              root.titulo_propuesta = root.propuesta.title;
              
              //solo usar para activar tabs o mostrar datos de formularios (no cuenta permisos de edicion)
              root.modoEditar = true;
              
              console.warn("root.modoEditar => ", root.modoEditar);
  
              console.warn(
                "root.propuesta.proposal_status_id => ",
                root.propuesta.proposal_status_id
              );
              console.warn("root.estado.subsanar => ", root.estado.subsanar);
              console.warn("root.estado.borrador => ", root.estado.borrador);
  
              if (
                root.propuesta.proposal_status_id == root.estado.borrador ||
                root.propuesta.proposal_status_id == root.estado.subsanar
              ) {
                root.visibleguardar = true;
              }
            } else {
              root.propuesta = { id: 0 };
              root.visibleguardar = true;
            }
          },
        });
      },
  
  
    },
  };
  </script>
  