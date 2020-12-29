<template>
  <div>
    <div class="col">
      <div class="card">
        <div>
          <DxAccordion
            :data-source="items"
            :collapsible="true"
            :multiple="false"
            :animation-duration="300"
            :selectedIndex="0"
          >
            <template #title="{ data }">
              <Titulo :item-data="data" />
            </template>
            <template #item="{ data }">
              <Descripcion :item-data="data" />
            </template>
          </DxAccordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DxAccordion from "devextreme-vue/accordion";
import Titulo from "./desarrolloTecnologico/_titulo";
import Descripcion from "./desarrolloTecnologico/_detalles";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "DesarrolloTec",
  components: {
    DxAccordion,
    Titulo,
    Descripcion,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("desarrolloTec", ["items"]),

    otra: function () {
      return this.config.url.web + "/otra";
    },
  },
  methods: {
    ...mapActions("desarrolloTec", ["all"]),
  },
  mounted() {
    this.all();
    // console.log(this.config);
  },
};
</script>
