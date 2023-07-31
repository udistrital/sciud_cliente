<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="card" id="panel-documentos">
          <div class="card-body">
            <div class="row mb-3">
              <div class="col">
                <div class="col d-flex justify-content-between align-items-end">
                  <!-- <div class="title"><i class="icon-books"></i> {{ $titleCase(group.name) }}</div> -->
                  <h2><i class="icon-file-pdf"></i> {{ datax.name }}</h2>
                </div>
              </div>
            </div>
            <div class="card-body" v-html="requisitoArchivo()"></div>
            <Documentos
              :id="id"
              :parent="this"
              :main-obj="datax"
              :show-on-load="true"
              :tipos="tiposDocumento"
              end-point="proposals"
              :botonUploadVisible="{ visible: true }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="is_dev && debug">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <span class="font-weight-semibold">editMode:</span> {{ editMode }}
            <hr class="sep" />
            <span class="font-weight-semibold">tiposDocumento:</span>
            {{ tiposDocumento }}
            <!-- <span class="font-weight-semibold">group:</span> {{ JSON.stringify(group, null, 3) }} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
// https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns
let $ = window.jQuery,
  root = null;
import { mapActions, mapGetters } from "vuex";
let hideErrors = () => {
  $("#panel-basicos .dx-fileuploader-files-container").hide();
  $("#panel-basicos .dx-invalid-message").hide();
  $("#panel-basicos .dx-invalid").removeClass("dx-invalid");
};

export default {
  name: "datosBasicos",
  components: {
    // Header: () => import("./_header"),
    Documentos: () => import("@/components/element/documentospro"),
  },
  data: () => ({
    datax: {
      group_type_name: "proposals",
      id: null,
      name: "Documentos Requeridos",
    },
    tiposDocumento: [],
    group: {},
    id: "panel-documentos-propuesta",
    stateUpDocument: { visible: false },
  }),
  methods: {
    // ...mapActions("unidad", ["getUnit"]),
    ...mapActions("unidad/producto/universalSentUpAct", {
      objSave: "save",
      objUpdate: "update",
      elementoActive: "active",
      getSinData: "getSinData",
      getAll: "getAll",
    }),

    requisitoArchivo() {
      let tipos = root.tiposDocumento;
      let i = 0,
        print = "";
      if (Array.isArray(tipos) && tipos.length != 0) {
        print =
          "<h3><i class='icon-info mr-1 color-main-600'></i><b><i>Lista de documentos para aplicar:</i></b></h3> ";
        print = print + "<ul>";
        for (i = 0; i < tipos.length; i++) {
          let text =
            tipos[i].st_description == null
              ? ""
              : "<br>" + tipos[i].st_description;
          let importante = ""; //tipos[i].cd_required? '<em>(Requerido).</em>': ''
          if (tipos[i].active)
            print =
              print +
              "<li>" +
              "<b>" +
              tipos[i].st_name +
              " " +
              importante +
              " </b>" +
              text +
              "</li>";
        }
        print = print + "</ul>";
      } else {
        print = "No se encuentra lista legible";
      }
      return print;
    },

    listDoc2subtipos(parametro) {
      if (parametro.length >= 1) {
        // alert("leyo")
        parametro.map(function (lista) {
          let require = lista.cd_required ? "(Requerido)" : "";
          lista.id_ant = lista.id;
          lista.st_name = lista.document_name + " " + require + "";
          lista.id = lista.document_id;
          return lista;
        });
        root.tiposDocumento = parametro;
      }
    },

    async documentos(data) {
      // console.clear();
      console.warn("documentos", data);
      root.loaderShow("Cargando lista Documentos");
      console.warn("id list docs", data.id);

      await root.getAll({
        // url: "/research_units/117/group_member/10286",
        url: "/calls/" + parseInt(data.id) + "/call_documents",
        cb: function (results) {
          let listDocuments = results;
          console.warn("propuesta docs list ", listDocuments);
          setTimeout(function () {
            // 	let id = `#${root.id}`;
            // 	console.log("id", id);
            // 	$(id).fadeIn();

            root.listDoc2subtipos(listDocuments);
            root.loaderHide();
          }, 700);
        },
      });
    },
  },
  props: {
    id_proposal: {
      type: Number,
      default: null,
    },
    propuesta: {
      type: Object,
      default: null,
    },
    convocatoria: {
      type: Object,
      default: null,
    },
    permisoGuardar: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    ...mapGetters("core/tipo", ["subtypesByType"]),
  },

  created: function () {
    root = this;
    console.log(root.$sep);
    root.tiposDocumento = [];
    root.datax.id = root.propuesta.id;
    console.log("root.tiposDocumento", root.tiposDocumento);
    root.tiposDocumento = root.subtypesByType("proyecto_seguimiento");
  },

  updated: () => {
    console.log(root.$sep);

    console.log("documentos Updated");
    hideErrors();
  },
  mounted() {
    this.$forceUpdate();
    root.documentos(root.convocatoria);
    // this.editMode=true,
    root.stateUpDocument = { visible: !root.permisoGuardar };
    console.warn("stateUpDocument", root.stateUpDocument);
  },
};
</script>
  