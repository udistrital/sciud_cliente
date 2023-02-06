<template>
  <div class="">
    <!-- <div class="row divider"> -->
    <!-- <div class="col subtab pb-1"> -->
    <!-- <div class="card"> -->

    <div class="card-body">
      <DxAccordion :collapsible="false" :multiple="false">
        <template #title="{ data }">
          <div class="col pt-2 pb-2">
            <i :class="'icon-' + data.icon"></i>{{ data.title }}
          </div>
        </template>
        <DxItem
          title="Grupos de Investigación Anexos"
          icon="brain"
          id="estructuras"
          data-idx="1"
        >
          <template #default>
            <Estructuras
              :convocatoria="convocatoria"
              :editOBJ="modoEditar"
              :propuesta="propuesta"
              endPointRute=""
              objEpdata=""
              :permisoGuardar="permisoGuardar"
            ></Estructuras>
          </template>
        </DxItem>
        <DxItem
          title="Investigadores Asociados"
          icon="users"
          id="integrantes"
          data-idx="2"
        >
          <template #default>
            <Investigadores
              :convocatoria="convocatoria"
              :editOBJ="modoEditar"
              :propuesta="propuesta"
              endPointRute=""
              objEpdata=""
              :permisoGuardar="permisoGuardar"
            >
            </Investigadores>
          </template>
        </DxItem>
      </DxAccordion>
    </div>
    
    <div  v-if="is_dev && debug">
      <div class="card">
        <hr class="sep mb-0" />
        <span class="font-weight-semibold">modoEditar:</span>
        {{ JSON.stringify(modoEditar, null, 3) }}
      </div>
      <div class="card">
        <hr class="sep mb-0" />
        <span class="font-weight-semibold">permisoGuardar:</span>
        {{ JSON.stringify(permisoGuardar, null, 3) }}
      </div>
    </div>

  </div>
</template>

<script>
let root;
import DxAccordion, { DxItem } from "devextreme-vue/accordion";
export default {
  name: "datosBasicos",
  components: {
    DxItem,
    DxAccordion,
    Estructuras: () =>
      import(
        "@/modules/convocatoria/proyectos/propuesta/integrantes_grupos/grupos_anexos.vue"
      ),
    Investigadores: () =>
      import(
        "@/modules/convocatoria/proyectos/propuesta/integrantes_grupos/investigadores.vue"
      ),
  },
  mounted() {
    root = this;
    console.log("root", root);
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
    modoEditar: {
      type: Boolean,
      default: () => false,
    },
    endPointRute: {
      type: String,
      default: () => null,
    },
    permisoGuardar: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    some() {
      console.log("SOME!");
    },
  },
};
</script>
