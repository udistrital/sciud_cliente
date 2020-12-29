<template>
  <div>
    <DxTabPanel
      :loop="true"
      ref="tabPanel"
      :swipe-enabled="false"
      :animation-enabled="true"
      @selection-changed="tabChange($event)"
    >
      <!--
		@item-click="itemClick($event, 'click')"
    @option-changed="itemClick($event, 'option-changed')"
    @title-click="itemClick($event, 'title-click')"
		-->
      <DxItem title="1. Datos básicos" id="basicos" data-idx="1">
        <template #default>
          <DatosBasicos :group="group" :saveFn="saveFn" :cancelFn="cancelFn" />
        </template>
      </DxItem>
      <DxItem title="2. Integrantes" :disabled="creating" id="integrantes">
        <template #default>
          <Integrantes :group="group" :saveFn="saveFn" :cancelFn="cancelFn" />
        </template>
      </DxItem>
      <DxItem title="3. Institucional" :disabled="creating" id="institucional">
        <template #default>
          <Institucional :group="group" :saveFn="saveFn" :cancelFn="cancelFn" />
        </template>
      </DxItem>
      <DxItem title="4. Producción" :disabled="creating">
        <template #default>
          <Produccion :group="group" />
        </template>
      </DxItem>
      <!--
      <DxItem title="5. Plan de Acción" :disabled="creating">
        <template #default>
          <PlanAccion :group="group" />
        </template>
      </DxItem>
      <DxItem title="6. Inventario" :disabled="creating">
        <template #default>
          <Inventario :group="group" />
        </template>
      </DxItem>
      <DxItem title-template="title">
        <template #title> Mi título </template>
      </DxItem>
      -->
    </DxTabPanel>
    <!-- <div class="pg">
			<DxProgressBar id="progress" class="progress" :value="progress" width="100" :group="group" />
		</div> -->
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-v-model-argument */
/* eslint-disable vue/no-unused-components */
// https://js.devexpress.com/Documentation/Guide/Vue_Components/Component_Configuration_Syntax/#DevExtreme_Validation_Features
let $ = window.jQuery;
import { mapState, mapActions, mapGetters } from "vuex";
import DatosBasicos from "./_basicos.vue";
import Institucional from "./_institucional.vue";
import Integrantes from "./_integrantes.vue";
import Inventario from "./_inventario.vue";
import PlanAccion from "./_plan-accion.vue";
import Produccion from "./_produccion.vue";
import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";
import { DxProgressBar } from "devextreme-vue";
export default {
  name: "unidad",
  components: {
    DatosBasicos,
    DxItem,
    DxProgressBar,
    DxTabPanel,
    Institucional,
    Integrantes,
    // Inventario,
    // PlanAccion,
    Produccion,
  },
  props: {
    group: {
      type: Object,
      default: () => {},
    },
    documents: {
      type: Array,
      default: () => [],
    },
    saveFn: {
      type: Function,
      default: null,
    },
    cancelFn: {
      type: Function,
      default: null,
    },
    parent: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    creating: false,
    isValid: false,
    progress: 37,
    selectedIndex: 0,
    tabPanel: null,
  }),
  watch: {
    group: function (g) {
      console.log(this.$sep);
      console.log("watch.group", g);
      // TODO: 202010290412: Lógica que incluya validación de datos básicos
      this.creating = typeof g.id !== "undefined" && g.id.toString() === "0";
    },
  },
  beforeUpdate() {
    console.log(this.$sep);
    console.log("beforeUpdate _base.vue");
    // console.log("this.selectedIndex", this.selectedIndex);
    // this.tabPanel.option("selectedIndex", 0);
  },
  updated() {
    console.log(this.$sep);
    console.log("updated _base.vue");
    // console.log("this.selectedIndex", this.selectedIndex);
    // this.tabPanel.option("selectedIndex", 0);
  },
  beforeDestroy() {
    // console.log("beforeDestroy");
  },
  destroyed() {
    // console.log("destroyed");
  },
  computed: {
    ...mapState("unidad", ["members"]),
    oth() {
      return "";
    },
  },
  methods: {
    ...mapActions("unidad", { getMembers: "getMembers" }),
    ...mapActions("libros", { getLibros: "all", saveChange: "saveChange" }),
    ...mapActions("capitulo", { getCapitulo: "all" }),
    ...mapActions("poblaciones", { getPoblaciones: "all" }),
    ...mapActions("tipoPoblacion", { getTipoPob: "all" }),
    ...mapActions("animal", { getAnimal: "all" }),
    ...mapActions("Pais", { getPaises: "all2" }),
    ...mapActions("Estado", { getEstados: "all" }),
    ...mapActions("Ciudad", { getCiudades: "all" }),
    ...mapActions("categoriaLib", { getCatLib: "all2" }),
    ...mapActions("tipoAnimal", { getAnimalsTip: "all" }),
    ...mapActions("tipoCiclo", { getCiclos: "all" }),
    ...mapActions("estadoSolicitud", { getSolicitud: "all" }),
    ...mapActions("articulo", { getArticulo: "all" }),
    ...mapActions("categoriaArt", { getCatArt: "all2" }),
    ...mapActions("tipoArt", { getTipoArt: "all" }),
    ...mapActions("patente", { getPatente: "all" }),
    ...mapActions("estadoPatente", { getEstPat: "all" }),
    ...mapActions("tipoPatente", { getTipPat: "all" }),
    ...mapActions("obra", { getObra: "all" }),
    ...mapActions("listaAreaEsp", { getListaAreaE: "all" }),
    ...mapActions("listaTrabajos", { getListaTrab: "all" }),
    ...mapActions("nota", { getNota: "all" }),
    ...mapActions("vegetal", { getVegetals: "all" }),
    ...mapActions("tipoVegetal", { getTipoVeg: "all" }),
    ...mapActions("categoriaObras", { getCatOb: "all" }),
    changeTab: function (idx) {
      console.log(this.$sep);
      console.log("changeTab", idx);
      this.tabPanel.option("selectedIndex", idx);
    },
    tabChange(e) {
      let root = this;
      let idx = this.tabPanel.option("selectedIndex");
      console.log(root.$sep);
      // console.log(this.$sep);
      // console.log("e", );
      // console.log("e.itemData", e.itemData);
      console.log(idx);
      switch (idx) {
        case 0:
          console.log("basicos");
          break;
        case 1:
          root.scrollTop();
          if (root.group !== null && root.group.member_ids.length > 0) {
            console.log("integrantes");
            root.loadShow("Cargando integrantes");
            root.getMembers({
              unidadId: root.group.id,
              callback: function (users) {
                console.log(root.$sep);
                console.log("CALLBACK LOAD USERS!!");
                console.log(users);
                root.loadHide();
              },
            });
          }
          break;
        case 2:
          // Institucional.props.group = this.group;
          // console.log(Institucional);
          console.log("institucional");
          break;
        case 3:
          console.log("produccion");
          root.getMembers({
            unidadId: root.group.id,
            callback: function (users) {
              console.log(root.$sep);
              console.log("CALLBACK LOAD USERS!!");
              console.log(users);
              root.loadHide();
            },
          });

          root.getPaises();
          // root.getEstados();
          root.getCiudades();
          root.getCatLib();
          root.getLibros({
            unidadId: root.group.id,
          });
          root.getCapitulo({
            unidadId: root.group.id,
          });
          root.getTipoPob();
          root.getPoblaciones({
            unidadId: root.group.id,
          });
          root.getAnimal({
            unidadId: root.group.id,
          });
          root.getAnimalsTip();
          root.getCiclos();
          root.getSolicitud();
          root.getArticulo({
            unidadId: root.group.id,
          });
          root.getCatArt();
          root.getTipoArt();

          root.getPatente({
            unidadId: root.group.id,
          });
          root.getEstPat();
          root.getTipPat();

          root.getCatOb();
          root.getObra({
            unidadId: root.group.id,
          });
          root.getListaAreaE();
          root.getListaTrab();

          root.getNota({
            unidadId: root.group.id,
          });
          root.getTipoVeg();
          root.getVegetals({
            unidadId: root.group.id,
          });

          // root.saveChange({
          //   unidadId: root.group.id,

          // });

          break;
        case 4:
          console.log("plan");
          break;
        case 5:
          console.log("inventario");
          break;
        default:
          console.log("otro");
          break;
      }
      // console.log("selectedIndex", this.selectedIndex);
      // console.log(this.$sep + name);
      // let tab = e.addedItems[0];
      // let prevTab = e.removedItems[0];
      // // template: "items[5].template"
      // console.log("tab.template", tab.template);
      // console.log("prevTab", prevTab);
      // console.log("e", e);
    },
  },
  mounted() {
    console.log(this.$sep);
    console.log("Tabs mounted!");
    this.loaderElement = ".card-body.grid";
    this.tabPanel = this.$refs.tabPanel.instance;
    console.log("tabPanel", this.tabPanel);
    /*
		// console.clear();
		console.log("PARENT!", this.parent);
		console.log("group", JSON.stringify(this.group));
		var pg = $(".pg");
		var ht = pg.html();
		$(".dx-tabs-wrapper").append(ht);
		pg.remove();
		this.progress = 37;
    console.log("grupo.vue mounted => ", this.group);
    */
  },
};
</script>
