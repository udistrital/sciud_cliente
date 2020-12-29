<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="card-body">
          <DxDataGrid
            class="main"
            :data-source="items.data"
            :remote-operations="false"
            :allow-column-reordering="true"
            :row-alternation-enabled="true"
            :show-borders="false"
            :hover-state-enabled="true"
            @content-ready="onContentReady"
            @row-inserted="RowInserted"
            @row-updated="RowUpdated"
          >
            <DxEditing
              :allow-updating="true"
              :allow-adding="true"
              :use-icons="true"
              mode="form"
            />
            <DxGrouping :auto-expand-all="true" />
            <DxGroupPanel :visible="true" />
            <DxPaging :page-size="5" />
            <DxPager
              :show-page-size-selector="true"
              :allowed-page-sizes="pageSizes"
              :show-info="true"
              :show-navigation-buttons="true"
              info-text="Página {0} de {1} ({2} articulos)"
            />
            <DxColumn
              data-field="category_id"
              caption="Categoria"
              alignment="center"
              ><DxRequiredRule />
              <DxLookup
                :data-source="items2"
                value-expr="id"
                display-expr="name"
              />
            </DxColumn>

            <DxColumn
              data-field="proyec_id"
              caption="Proyecto ID"
              data-type="string"
              alignment="center"
            />

            <DxColumn
              data-field="title"
              caption="Título del Artículo"
              data-type="string"
              :width="180"
              alignment="center"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="journal_name"
              caption="Nombre de la Revista"
              data-type="string"
              :width="180"
              alignment="center"
              :hiding-priority="12"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="publication_date"
              caption="Fecha de Publicación"
              data-type="date"
              format="dd/MM/yyyy"
              alignment="center"
              :hiding-priority="11"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="approval_date"
              caption="Fecha de Aprobación"
              data-type="date"
              format="dd/MM/yyyy"
              alignment="center"
              :hiding-priority="10"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="volume"
              caption="Volumen"
              data-type="string"
              alignment="center"
              :hiding-priority="9"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="number_of_pages"
              caption="Número de Paginas"
              data-type="string"
              alignment="center"
              :hiding-priority="8"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="initial_page"
              caption="Pagina Inicial"
              data-type="string"
              alignment="center"
              :hiding-priority="7"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="final_page"
              caption="Pagina Final"
              data-type="string"
              alignment="center"
              :hiding-priority="6"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="issn"
              caption="ISSN * / ISSN (Online)"
              data-type="string"
              alignment="center"
              :hiding-priority="5"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="doi"
              caption="DOI"
              data-type="string"
              :width="180"
              alignment="center"
              :hiding-priority="4"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="url"
              caption="URL"
              data-type="string"
              alignment="center"
              :hiding-priority="3"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="paper_type_id"
              caption="Tipo de Articulo"
              alignment="center"
              :hiding-priority="2"
              ><DxRequiredRule />
              <DxLookup
                :data-source="tipoArts"
                value-expr="id"
                display-expr="name"
              />
            </DxColumn>

            <DxColumn
              data-field="observation"
              caption="Observaciones"
              data-type="string"
              alignment="center"
              :hiding-priority="1"
            />

            <DxColumn :buttons="editButtons" type="buttons" />

            <DxFormItem
              :col-span="2"
              :editor-options="{ height: 180 }"
              editor-type="dxTextArea"
            />
          </DxDataGrid>
        </div>
      </div>
    </div>
    <DxPopup
      :visible="popupVisible"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      title="Autor(es) y Co-autor(es)"
    >
      <DxScrollView width="100%" height="100%">
        <div class="row">
          <div class="col">
            <h3>Titulo del Articulo</h3>
            <div class="card-body">
              <div>Participantes Internos</div>
              <DxDataGrid
                id="gridContainer"
                class="main"
                :data-source="ArtParticipanteInt"
                :remote-operations="false"
                :allow-column-reordering="true"
                :row-alternation-enabled="true"
                :show-borders="false"
                :hover-state-enabled="true"
                @content-ready="onContentReady"
                @row-inserted="RowInsParInt"
                @row-updated="RowUpParInt"
              >
                <DxEditing
                  :allow-updating="true"
                  :allow-adding="true"
                  :use-icons="true"
                  mode="form"
                />
                <DxGrouping :auto-expand-all="true" />
                <DxGroupPanel :visible="true" />
                <DxPaging :page-size="5" />
                <DxPager
                  :show-page-size-selector="true"
                  :allowed-page-sizes="pageSizes"
                  :show-info="true"
                  :show-navigation-buttons="true"
                  info-text="Página {0} de {1} ({2} grupos)"
                />
                <DxColumn
                  data-field="researcher_id"
                  caption="Nombre"
                  alignment="center"
                  ><DxRequiredRule />
                  <DxLookup
                    :data-source="members"
                    value-expr="researcher.id"
                    display-expr="oas_details.TerceroId.NombreCompleto"
                  />
                </DxColumn>

                <DxColumn
                  data-field="participant_type_id"
                  caption="Tipo de participación"
                  alignment="center"
                  ><DxRequiredRule />
                  <DxLookup
                    :data-source="TipoParticipacion"
                    value-expr="id"
                    display-expr="name"
                  />
                </DxColumn>

                <DxColumn :buttons="editButtons2" type="buttons" />

                <DxFormItem
                  :col-span="2"
                  :editor-options="{ height: 180 }"
                  editor-type="dxTextArea"
                />
              </DxDataGrid>
            </div>
            <hr />
            <div class="card-body">
              <div>Participantes Externos</div>
              <DxDataGrid
                id="gridContainer"
                class="main"
                :data-source="ArtParticipanteExt"
                :remote-operations="false"
                :allow-column-reordering="true"
                :row-alternation-enabled="true"
                :show-borders="false"
                :hover-state-enabled="true"
                @content-ready="onContentReady"
                @row-inserted="RowInsParExt"
                @row-updated="RowUpParExt"
              >
                <DxEditing
                  :allow-updating="true"
                  :allow-adding="true"
                  :use-icons="true"
                  mode="form"
                />
                <DxGrouping :auto-expand-all="true" />
                <DxGroupPanel :visible="true" />
                <DxPaging :page-size="5" />
                <DxPager
                  :show-page-size-selector="true"
                  :allowed-page-sizes="pageSizes"
                  :show-info="true"
                  :show-navigation-buttons="true"
                  info-text="Página {0} de {1} ({2} grupos)"
                />
                <DxColumn
                  data-field="first_name"
                  caption="Nombre(s)"
                  data-type="string"
                  alignment="center"
                  ><DxRequiredRule
                /></DxColumn>

                <DxColumn
                  data-field="last_name"
                  caption="Apellidos"
                  data-type="string"
                  alignment="center"
                  ><DxRequiredRule
                /></DxColumn>

                <DxColumn
                  data-field="participant_type_id"
                  caption="Tipo de participación"
                  alignment="center"
                  ><DxRequiredRule />
                  <DxLookup
                    :data-source="TipoParticipacion"
                    value-expr="id"
                    display-expr="name"
                  />
                </DxColumn>

                <DxColumn :buttons="editButtons2" type="buttons" />

                <DxFormItem
                  :col-span="2"
                  :editor-options="{ height: 180 }"
                  editor-type="dxTextArea"
                />
              </DxDataGrid>
            </div>
          </div>
        </div>
      </DxScrollView>
    </DxPopup>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxPaging,
  DxGrouping,
  DxGroupPanel,
  DxEditing,
  DxFormItem,
  DxLookup,
  DxRequiredRule,
} from "devextreme-vue/data-grid";
import { DxPopup } from "devextreme-vue/popup";
import { DxScrollView } from "devextreme-vue/scroll-view";

export default {
  name: "Articulo",
  components: {
    DxDataGrid,
    DxColumn,
    DxPager,
    DxPaging,
    DxGrouping,
    DxGroupPanel,
    DxEditing,
    DxFormItem,
    DxLookup,
    DxPopup,
    DxScrollView,
    DxRequiredRule,
  },
  props: {
    group: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      opt: false,
      pageSizes: [5, 10, 20],
      popupVisible: false,
      editButtons: [
        "edit",

        {
          hint: "Soporte",
          icon: "pdffile",
        },
        {
          hint: "Autor(es)",
          icon: "group",
          onClick: this.miClick,
        },
      ],
      editButtons2: ["edit"],
    };
  },
  computed: {
    ...mapGetters("articulo", ["items"]),
    ...mapGetters("categoriaArt", ["items2"]),
    ...mapGetters("tipoArt", { tipoArts: "items" }),
    ...mapGetters("TipoParticipacion", { TipoParticipacion: "items" }),
    ...mapGetters("ArtParticipanteExt", { ArtParticipanteExt: "items" }),
    ...mapGetters("ArtParticipanteInt", { ArtParticipanteInt: "items" }),
    ...mapState("unidad", ["members"]),
    otra: function () {
      return this.config.url.web + "/otra";
    },

    diffInDay() {
      return `${Math.floor(
        Math.abs(
          (new Date().getTime() - this.value.getTime()) / (24 * 60 * 60 * 1000)
        )
      )} days`;
    },
  },
  methods: {
    ...mapActions("articulo", ["all", "saveChange", "updateChange"]),
    ...mapActions("categoriaArt", ["all2"]),
    ...mapActions("tipoArt", { getTipos: "all" }),
    ...mapActions("TipoParticipacion", { getTipoParticipacion: "all" }),
    ...mapActions("ArtParticipanteExt", {
      getArtParticipanteExt: "all",
      saveExtern: "saveChange",
      updateExtern: "updateChange",
    }),
    ...mapActions("ArtParticipanteInt", {
      getArtParticipanteInt: "all",
      saveIntern: "saveChange",
      updateIntern: "updateChange",
    }),

    cmds(rowData) {
      return "<small>" + rowData.id + "</small>";
    },
    onContentReady() {
      window.jQuery(".commands a").click(function () {
        console.log("Come on lets show the dropdown!!");
      });
      // console.log("onContentReady!");
    },
    // nuevo articulo
    RowInserted(e) {
      let root = this;

      var obj = e.data;
      var igGroup = root.group.id;

      obj.unidadId = igGroup;
      root.saveChange(obj);
    },
    // actualizar articulo
    RowUpdated(e) {
      console.log("actualizar", e);
      let root = this;

      var obj = e.data;
      var igGroup = root.group.id;
      obj.unidadId = igGroup;
      root.updateChange(obj);
    },
    // pop-up autores/coautores
    miClick(e) {
      let root = this;
      console.log("click a autor", e.row.data);
      var obj = e.row.data;
      var igGroup = root.group.id;
      obj.unidadId = igGroup;
      root.getArtParticipanteExt(obj);
      root.getArtParticipanteInt(obj);
      root.getTipoParticipacion();
      let valor = this.popupVisible;
      if (valor === false) {
        this.popupVisible = true;
      } else {
        this.popupVisible = false;
      }
    },
    // nuevo participante externo
    RowInsParExt(e) {
      let root = this;

      console.log("agregar", e.data);

      var obj2 = e.data;
      var igGroup = root.group.id;

      obj2.unidadId = igGroup;
      root.saveExtern(obj2);
    },
    // editar participante externo
    RowUpParExt(e) {
      console.log("actualizar", e.data);
      let root = this;

      var obj2 = e.data;
      var igGroup = root.group.id;
      obj2.unidadId = igGroup;
      root.updateExtern(obj2);
    },
    // nuevo participante interno
    RowInsParInt(e) {
      let root = this;

      console.log("agregar", e.data);

      var obj2 = e.data;
      var igGroup = root.group.id;

      obj2.unidadId = igGroup;
      root.saveIntern(obj2);
    },
    // editar participante interno
    RowUpParInt(e) {
      console.log("actualizar", e.data);
      let root = this;

      var obj2 = e.data;
      var igGroup = root.group.id;
      obj2.unidadId = igGroup;
      root.updateIntern(obj2);
    },
  },
  mounted() {
    //this.all();
    this.all2();
    this.getTipos();
    // console.log(this.config);
  },
};
</script>