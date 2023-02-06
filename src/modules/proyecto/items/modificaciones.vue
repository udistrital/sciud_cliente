<template>
    <div class="col mt-3 pl-1 pr-1" :id="namePanel">
      <div class="row">
        <div class="col">
          <div class="p-0">
            <div class="page-header header-elements-md-inline mb-2">
              <div class="page-title p-0 m-0">
                <h1>
                  <i class="icon-package mr-1 color-main-600"></i>
                  <span class="font-weight-semibold">Modificaciones por desarrollar</span>
                  <span class="item-title">&nbsp;</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="card mt-3" v-if="debug">
        <div class="card-body">
          baseObj:
          {{ JSON.stringify(baseObj, null, "\t") }}
        </div>
        <div class="card-body">
          baseObjGen:
          {{ JSON.stringify(baseObjGen, null, "\t") }}
        </div>
      </div>
    </div>
  </template>
    
    <script>
  /* eslint-disable no-unused-vars */
  /* eslint-disable vue/no-unused-components */
  let root = null;
  let $ = window.jQuery;
  
  import {
    DxEmailRule,
    DxRequiredRule,
    DxStringLengthRule,
    DxValidator,
    DxPatternRule,
  } from "devextreme-vue/validator";
  import {
    DxDateBox,
    DxSelectBox,
    DxButton,
    DxSwitch,
    DxTextBox,
    DxNumberBox,
    DxTagBox,
    DxTextArea,
    DxValidationGroup,
    DxPopup,
  } from "devextreme-vue";
  import { mapState, mapActions, mapGetters } from "vuex";
  //import { DxStateStoring } from 'node_modules/devextreme-vue/pivot-grid';
  
  // https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
  export default {
    components: {
      // Commands,
      DxPopup,
      DxButton,
      DxPatternRule,
      DxDateBox,
      DxNumberBox,
      DxRequiredRule,
      DxSelectBox,
      DxTextArea,
      DxTextBox,
      DxValidator,
      DxValidationGroup,
      DxSwitch,
      DxTagBox,
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
      editOBJ: {
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
    data: () => ({
      namePanel: "proyecto-modificaciones",
      titlecolum: "id",
  
      baseEnt: null,
      now: new Date(),
      urlPattern: /^(http|https):\/\/[^ "]+$/,
      phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
      totalCount: 0,
  
      baseObjGen: {},
      baseObj: {},
    }),
    created() {
      root = this;
      root.baseEnt = this.$clone(this.baseObj);
    },
    mounted() {
      root.loaderMessage = "Cargando Modificaciones";
    },
    computed: {
      ...mapGetters("core/tipo", ["subtypesByType"]),
    },
    watch: {},
    methods: {
      ...mapActions("unidad/producto/universalSentUpAct", {
        getSinData: "getSinData",
        objSave: "save",
        objUpdate: "update",
        elementoActive: "active",
      }),
      ...mapActions("unidad/indicadores", { getIndicadores: "getAll" }),
  
      onContentReady() {},
    },
  };
  </script>