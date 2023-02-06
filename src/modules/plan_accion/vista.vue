<template>
  <div>
    <div class="page-header header-elements-md-inline" id="panel-unidades-head">
      <div class="page-title d-flex">
        <h1>
          <i class="icon-eye2 mr-1 color-main-600"></i>
          <span class="font-weight-semibold" id="title">Vista Impresión</span>
          <span id="msg"> &raquo; Plan de Acción</span>
        </h1>
        <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
      </div>

      <div class="header-elements" v-if="true">
        <router-link tag="a" :to="'/unidad/' + $route.params.unidadId + '/plan_accion'"
          class="btn btn-main btn-labeled btn-labeled-left legitRipple" title="regresar al Listado">
          <b><i class="icon-database-remove"></i></b> Regresar al Listado
        </router-link>


        <a href="#" @click="download" title="Volver a Unidades..." class="
            btn btn-sm btn-main btn-labeled btn-labeled-left
            legitRipple
            ml-2
          ">
          <b><i class="icon-printer"></i></b>Imprimir
        </a>
      </div>
    </div>

    <div class="row" id="panel-plan-accion">
      <div class="col">
        <div class="card">
          <div class="card-body group-detail mh">
            <div class="row">
              <div class="col-md-12 mt-3">
                <table class="tg" width="100%">
                  <thead>
                    <tr>
                      <td class="tg-nrix" rowspan="3" width="85">
                        <img :src="imgUrl + '/escudo.png'" alt="Image" width="85" height="79" />
                      </td>
                      <td class="tg-g5xs">
                        <span style="font-weight: bold">PLAN DE ACCIÓN ANUAL DE GRUPO Y/O SEMILLERO DE
                        </span><br /><span style="font-weight: bold">INVESTIGACIÓN-CREACIÓN E INNOVACIÓN</span>
                      </td>
                      <td class="tg-g5xs">Código: GI-PR-003-FR-004</td>
                      <td class="tg-nrix" rowspan="3" width="145">
                        <img :src="imgUrl + '/sigud.png'" alt="Image" width="145" height="70" />
                      </td>
                    </tr>
                    <tr>
                      <td class="tg-g5xs">Macoproceso: Gestión Académica</td>
                      <td class="tg-g5xs">Versión :03</td>
                    </tr>
                    <tr>
                      <td class="tg-g5xs">Proceso: Gestión de Investigación</td>
                      <td class="tg-g5xs">Fecha Aprobación:</td>
                    </tr>
                  </thead>
                </table>

                <p>&nbsp;</p>
                <table class="tg" width="100%">
                  <thead>
                    <tr>
                      <th class="tg-0pky2" colspan="2">
                        <span style="font-weight: bold">Información Básica:
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="tg-1wig">
                        Grupo o Semillero de Investigación:
                      </td>
                      <td class="tg-0lax">{{ group.name }}</td>
                    </tr>
                    <tr>
                      <td class="tg-1wig">
                        Enlace GrupLac es SCIENTI (Aplica solo para grupos):
                      </td>
                      <td class="tg-0lax">
                        <a :href="group.gruplac" target="_blank">{{
                            group.gruplac
                        }}</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="tg-1wig">Correo de contacto:</td>
                      <td class="tg-0lax">
                        <a :href="'mailto:' + group.email" target="_blank">{{
                            group.email
                        }}</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="tg-1wig">Fecha de registro del grupo:</td>
                      <td class="tg-0lax">
                        {{ group.cidc_registration_date }}
                      </td>
                    </tr>
                    <tr>
                      <td class="tg-1wig">Código Colciencias:</td>
                      <td class="tg-0lax">{{ group.colciencias_code }}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <center>
                  <h3>>Z</h3>
                </center>
                <br />
                <table class="tg" width="100%" v-if="form_a1 != null">
                  <thead>
                    <tr>
                      <th class="tg-0pky2" colspan="4">
                        <b>Proceso de Formación para la
                          Investigación/Investigación Formativa</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="tg-c3ow"><b>Tipo</b></td>
                      <td class="tg-0pky"><b>Indicador de Existencia</b></td>
                      <td class="tg-0pky"><b>Meta</b></td>
                      <td class="tg-0pky"><b>Avance</b></td>
                    </tr>
                    <!-- zona de cardga automatca para el desarrollo de componentes  1-->
                    <template v-for="(form1, id) in form_a1" v-bind="id">
                      <tr :key="id">
                        <td class="tg-0pky">
                          {{ form1.indicator_product_type_name }}
                        </td>
                        <td class="tg-0pky">
                          {{ form1.indicator_description }}
                        </td>
                        <td class="tg-0pky">{{ form1.goal }}</td>
                        <td class="tg-0pky">{{ ((form1.advanced_total / form1.goal) * 100).toFixed(2) }}%</td>
                      </tr>
                    </template>
                  </tbody>
                </table>

                <table class="tg" width="100%" v-if="form_b != null">
                  <thead>
                    <tr>
                      <th class="tg-0pky2" colspan="4">
                        <b>Proyectos de investigación en el periodo anual</b><br /><small><b>Nota</b>: El tipo indica si
                          esta sin recursos
                          financieros, con recursos financieros internos,
                          cofinanciado</small>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="tg-c3ow"><b>Tipo</b></td>
                      <td class="tg-0pky"><b>Descripción</b></td>
                      <td class="tg-0pky"><b>Meta</b></td>
                      <td class="tg-0pky"><b>Avance</b></td>
                    </tr>
                    <!-- zona de cardga automatca para el desarrollo de componentes  1-->
                    <template v-for="(form2, id) in form_b" v-bind="id">
                      <tr :key="id">
                        <td class="tg-0pky">{{ form2.financing_type_name }}</td>
                        <td class="tg-0pky">{{ form2.description }}</td>
                        <td class="tg-0pky">{{ form2.goal_state_name }}</td>
                        <td class="tg-0pky">
                          {{
                              form2.goal_achieved ? "Terminado" : "Sin Terminar"
                          }}
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>

                <table class="tg" width="100%" v-if="form_a2 != null">
                  <thead>
                    <tr>
                      <th class="tg-0pky2" colspan="4">
                        <b>Productos resultado de procesos de
                          investigación-creación e Innovación a generar para el
                          período anual</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="tg-c3ow"><b>Tipo</b></td>
                      <td class="tg-0pky"><b>Descripción</b></td>
                      <td class="tg-0pky"><b>Meta</b></td>
                      <td class="tg-0pky"><b>Avance</b></td>
                    </tr>
                    <!-- zona de cardga automatca para el desarrollo de componentes  1-->
                    <template v-for="(form3, id) in form_a2" v-bind="id">
                      <tr :key="id">
                        <td class="tg-0pky">
                          {{ form3.indicator_product_type_name }}
                        </td>
                        <td class="tg-0pky">
                          {{ form3.indicator_description }}
                        </td>
                        <td class="tg-0pky">{{ form3.goal }}</td>
                        <td class="tg-0pky">{{ ((form3.advanced_total / form3.goal) * 100).toFixed(2) }}%</td>
                      </tr>
                    </template>
                  </tbody>
                </table>

                <table class="tg" width="100%" v-if="form_c != null">
                  <thead>
                    <tr>
                      <th class="tg-0pky2" colspan="4">
                        <b>Productos con potencialidad de Transferencia a
                          presentar a la OTRI-Bogotá en el período anual</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="tg-c3ow"><b>Tipo</b></td>
                      <td class="tg-0pky"><b>Descripción</b></td>
                      <td class="tg-0pky"><b>Meta</b></td>
                      <td class="tg-0pky"><b>Avance</b></td>
                    </tr>
                    <!-- zona de cardga automatca para el desarrollo de componentes  1-->
                    <template v-for="(form4, id) in form_c" v-bind="id">
                      <tr :key="id">
                        <td class="tg-0pky">{{ form4.product_type_name }}</td>
                        <td class="tg-0pky">{{ form4.description }}</td>
                        <td class="tg-0pky">{{ form4.goal }}</td>
                        <td class="tg-0pky">{{ ((form4.advanced_total / form4.goal) * 100).toFixed(2) }}%</td>
                      </tr>
                    </template>
                  </tbody>
                </table>

                <table class="tg" width="100%" v-if="form_e != null">
                  <thead>
                    <tr>
                      <th class="tg-0pky2" colspan="4">
                        <b>Recursos con que cuenta el grupo para el desarrollo
                          de las actividades de investigación</b>
                        <br /><small><b>Nota</b>: La sección 3 solamente debe ser
                          diligenciado por los Grupos de Investigación-Creación
                          e Innovación</small>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="tg-c3ow"><b>Tipo</b></td>
                      <td class="tg-0pky"><b>Descripción</b></td>
                      <td class="tg-0pky"><b>Inventariable</b></td>
                      <td class="tg-0pky"><b>Placa de Inventario</b></td>
                    </tr>
                    <!-- zona de cardga automatca para el desarrollo de componentes  1-->
                    <template v-for="(form5, id) in form_e" v-bind="id">
                      <tr :key="id">
                        <td class="tg-0pky">{{ form5.type_description }}</td>
                        <td class="tg-0pky">{{ form5.description }}</td>
                        <td class="tg-0pky">
                          {{
                              form5.inventoried
                                ? "Producto en inventario"
                                : "No es inventariable"
                          }}
                        </td>
                        <td class="tg-0pky">{{ form5.inventory_plate }}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>

                <table class="tg" width="100%" v-if="form_d != null">
                  <thead>
                    <tr>
                      <th class="tg-0pky2" colspan="5">
                        <b>Redes Academicas de promoción cientifica y/o
                          artistica</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="tg-c3ow"><b>Nombre</b></td>
                      <td class="tg-0pky">
                        <b>Áreas de conocimiento<br />(CINE, OCDE, SNIES)</b>
                      </td>
                      <!-- <td class="tg-0pky">
                        <b>Lineas de Investigación asociadas La línea de
                          investigación institucionales son las avaladas por los
                          consejos de facultad.)</b
                        >
                      </td> -->
                      <td class="tg-0pky"><b>Estado Estimado</b></td>
                      <td class="tg-0pky"><b>Culminado</b></td>
                    </tr>
                    <!-- zona de cardga automatca para el desarrollo de componentes  1-->
                    <template v-for="(form6, id) in form_d" v-bind="id">
                      <tr :key="id">
                        <td class="tg-0pky">{{ form6.name }}</td>
                        <td class="tg-0pky">
                          <div class="row">
                            <div class="col-sm-4">
                              <div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">Cine Detallado: </h5>
                                  <p class="card-text">
                                  <ul>
                                    <template v-for="(cine, id) in form6.cine_detailed_areas" v-bind="id">
                                      <li :key="id">
                                        {{ cine.cine_detailed_area_name }}
                                      </li>
                                    </template>
                                  </ul>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="col-sm-4">
                              <div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">Cine Específico: </h5>
                                  <p class="card-text">
                                  <ul>
                                    <template v-for="(cine_detallado, id) in form6.cine_specific_areas" v-bind="id">
                                      <li :key="id">
                                        {{ cine_detallado.cine_specific_area_name }}
                                      </li>
                                    </template>
                                  </ul>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="col-sm-4">
                              <div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">Disciplinas OCDE: </h5>
                                  <p class="card-text">
                                  <ul>
                                    <template v-for="(ocde_diciplias, id) in form6.oecd_disciplines" v-bind="id">
                                      <li :key="id">
                                        {{ ocde_diciplias.oecd_discipline_name }}
                                      </li>
                                    </template>
                                  </ul>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="col-sm-4">
                              <div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">OCDE Detallado: </h5>
                                  <p class="card-text">
                                  <ul>
                                    <template v-for="(ocde_subareas, id) in form6.oecd_knowledge_subareas" v-bind="id">
                                      <li :key="id">
                                        {{ ocde_subareas.oecd_knowledge_subarea_name }}
                                      </li>
                                    </template>
                                  </ul>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div class="col-sm-4">
                              <div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">SNIES: </h5>
                                  <p class="card-text">
                                  <ul>
                                    <template v-for="(sniesprint, id) in form6.snies" v-bind="id">
                                      <li :key="id">
                                        {{ sniesprint.snies_name }}
                                      </li>
                                    </template>
                                  </ul>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>


                        </td>
                        <!-- <td class="tg-0pky">{{ form6.description }}</td> -->
                        <td class="tg-0pky">{{ form6.goal_state_name }}</td>
                        <td class="tg-0pky">{{ form6.goal_achieved ? "Si" : "No" }}
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card" v-if="is_dev && debug">
      <div class="card-body">
        <strong>datalist:</strong>
        <pre>{{ JSON.stringify(datalist, null, 3) }}</pre>
      </div>
      <div class="card-body">
        <strong>datalist form_a:</strong>
        <pre>{{ JSON.stringify(form_a1, null, 3) }}</pre>
      </div>
      <div class="card-body">
        <strong>datalist form_a:</strong>
        <pre>{{ JSON.stringify(form_a2, null, 3) }}</pre>
      </div>
      <div class="card-body">
        <strong>datalist form_b:</strong>
        <pre>{{ JSON.stringify(form_b, null, 3) }}</pre>
      </div>
      <div class="card-body">
        <strong>datalist form_c:</strong>
        <pre>{{ JSON.stringify(form_c, null, 3) }}</pre>
      </div>
      <div class="card-body">
        <strong>datalist form_d:</strong>
        <pre>{{ JSON.stringify(form_d, null, 3) }}</pre>
      </div>
      <div class="card-body">
        <strong>datalist form_e:</strong>
        <pre>{{ JSON.stringify(form_e, null, 3) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root;
import { mapActions, mapGetters, mapState } from "vuex";
import DxStore from "@/store/dx";
// import VueHtml2pdf from "vue-html2pdf";
// import jsPDF from "jspdf";

export default {
  created: function () {
    root = this;

    root.datasys.data = root.dataForm;
    console.warn("console datasys", root.datasys);
    root.planId = root.$route.params.planId;

    root.getUnit({
      id: root.$route.params.unidadId,
      cb: function (result) {
        root.group = result;
        document.title += ` ${root.$titleCase(root.group.name)}`;
      },
    });
    root.listaRedes();
  },

  data: () => ({
    planId: null,
    popupObs: false,
    observarData: "",
    editData: null, //sirve para dejar formulario en limpio o llenar datos
    tipoproceso: [],
    grid: null,
    mode: null,
    unidad: null,
    section: null,
    tipos: 781,
    totaCount: 0,
    isValid: false,
    panelData: null,
    panelGrid: null,
    panelParticipantes: null,
    panelDocs: null,
    panelCmds: null,
    baseEntity: null,
    docLink: null,
    firstLoad: true,
    group: null,
    // datasys:{data:[]},
    datalist: {},
    dataForm: [],
    listaGeneral: [],
    datasys: [],

    form_a1: {},
    form_a2: {},
    form_b: {},
    form_c: {},
    form_d: {},
    form_e: {},

  }),
  
  components: {},

  computed: {
    datax() {
      const d = new Date();
      return "Paln_accion_" + d.getTime();
    },

    cams() {
      return this.dataForm;
    },
  },

  methods: {
    ...mapActions("unidad", ["getUnit", "getResearchers"]),
    // loadMembers() {
    // 	console.log("members", root.group.member_ids);
    // },
    ...mapActions("unidad/producto/universalSentUpAct", {
      getDataAll: "getAll",
      getForm: "get",
    }),

    listaRedes() {
      root.getForm({
        url: "/action_plans_print/" + root.planId,
        //  "/action_plans/" + 19 + '/form_d_act_plans',
        cb: function (results) {
          root.datalist = results[0];
          root.form_a1 = root.datalist.form_a_training_processes;
          root.form_a2 = root.datalist.form_a_resulting_products;
          root.form_b = root.datalist.form_b_research_projects;
          root.form_c = root.datalist.form_c_potential_products;
          root.form_d = root.datalist.form_d_academic_networks;
          root.form_e = root.datalist.form_e_resources;
          root.loaderHide();
        },
      });
      console.warn("listado de redes", root.datalist);
      console.warn("rura sistema=>", root.planId);
    },

    estadoEntrega(cellInfo) {
      return cellInfo.value ? "Terminado" : "Editando...";
    },

    download2() {
      this.$refs.html2Pdf.generatePdf();

      //this.$refs.html2Pdf.save();
    },

    download() {
      let printContents = document.getElementById("panel-plan-accion").innerHTML;
      let originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();

      document.body.innerHTML = originalContents;
      location.reload();
    },

  },
};
</script>

<style scoped>
#head-ud {
  display: none;
}

@media print {
  #head-ud {
    display: block;
  }

  #non-printable {
    display: none;
  }

  #printable {
    display: block;
  }
}

.tg {
  border-collapse: collapse;
  border-spacing: 0;
}

.tg td {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
}

.tg th {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
}

.tg .tg-g5xs {
  font-size: 11px;
  text-align: center;
  vertical-align: top;
}

.tg .tg-nrix {
  text-align: center;
  vertical-align: middle;
}

.imagengrid {
  text-align: center;
  vertical-align: middle;
}

.imgGrid {
  vertical-align: middle;
}

.tg .tg-0pky2 {
  background-color: #c0c0c0;
  border-color: inherit;
  text-align: left;
  vertical-align: top
}
</style>