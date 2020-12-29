<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col-md-6">
            <h3>
              <strong>Nombre del Grupo: </strong>
            </h3>
          </div>
          <div class="col-md-6">
            <h3>
              <strong>Nombre Director :</strong>
            </h3>
          </div>
        </div>
        <div class="card-body text-success">
          <p>
            Identifique que iniciativas en formación en investigación creación
            tiene planeado realizar para el año en curso, espacios
            extracurriculares, en los que participaran los integrantes del
            grupo. Talleres de Creación, Laboratorios especializados en
            desarrollo de iniciativas creativas que potencian las aptitudes del
            creador y le permite encontrar diversos caminos experimentales.
            Pueden ser: Talleres de Creación (workshop, symposium o
            laboratorio). Talleres de Creación (individuales o grupales).
          </p>
        </div>
        <div class="card-body">
          <DxDataGrid
            class="main"
            :data-source="items"
            :remote-operations="false"
            :allow-column-reordering="true"
            :row-alternation-enabled="true"
            :show-borders="false"
            @content-ready="onContentReady"
          >
            <DxPaging :page-size="5" />
            <DxGroupPanel :visible="true" />
            <DxGrouping :auto-expand-all="true" />
            <DxPager
              :show-page-size-selector="true"
              :allowed-page-sizes="pageSizes"
              :show-info="true"
            />
            <DxColumn
              data-field="Contribucion"
              caption="Contribucion"
              data-type="string"
              alignment="center"
            />
            <DxColumn
              data-field="Actividad"
              caption="Actividad"
              data-type="string"
              alignment="center"
            />
            <DxColumn
              data-field="Descripcion"
              caption="Descripcion"
              data-type="string"
            />
            <DxColumn
              data-field="year_call"
              caption="Fecha"
              data-type="string"
            />
            <DxColumn
              data-field="Ejecutado"
              caption="Ejecutado"
              data-type="string"
            />
            <DxColumn
              data-field="Evidencia"
              caption="Evidencia"
              data-type="string"
            />
            <DxColumn
              data-field="Producto"
              caption="Producto"
              data-type="string"
            />
          </DxDataGrid>
        </div>
      </div>
    </div>
    <hr class="sep" />

    <div class="row p-2">
      <button
        type="button"
        class="btn btn-main btn-labeled btn-sm legitRipple"
        @click="opt = !opt"
      >
        <a v-if="!opt">Agregar contribución</a> <a v-else>Cerrar</a>
      </button>
    </div>

    <div v-if="opt">
      <FormularioContribucion />
    </div>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxPaging,
  DxGrouping,
  DxGroupPanel,
} from "devextreme-vue/data-grid";

import FormularioContribucion from "./_formulario-contribucion";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TablaFormacion",
  components: {
    DxDataGrid,
    DxColumn,
    DxPager,
    DxPaging,
    DxGrouping,
    DxGroupPanel,

    FormularioContribucion,
  },
  data() {
    return {
      opt: false,
      pageSizes: [5, 10, 20],
    };
  },
  computed: {
    ...mapGetters("planFormacion", ["items"]),
  },
  methods: {
    onContentReady() {
      window.jQuery(".commands a").click(function () {
        console.log("Come on lets show the dropdown!!");
      });
      // console.log("onContentReady!");
    },
    ...mapActions("planFormacion", ["all"]),
  },

  mounted() {
    this.all();
  },
};
</script>