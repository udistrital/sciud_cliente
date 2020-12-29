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
              info-text="Página {0} de {1} ({2} grupos)"
            />
            <DxColumn data-field="category_id" caption="Tipo" alignment="center"
              ><DxRequiredRule />
              <DxLookup
                :data-source="tipoAnimals"
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
              data-field="name"
              caption="Nombre de la variedad"
              data-type="string"
              :width="180"
              alignment="center"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="date"
              caption="Fecha"
              data-type="date"
              format="dd/MM/yyyy"
              alignment="center"
              :hiding-priority="3"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="cycle_type_id"
              caption="Tipo de ciclo"
              alignment="center"
              :hiding-priority="2"
              ><DxRequiredRule />
              <DxLookup
                :data-source="tipoCiclos"
                value-expr="id"
                display-expr="name"
              />
            </DxColumn>

            <DxColumn
              data-field="petition_status_id"
              caption="Estado de la solicitud"
              alignment="center"
              :hiding-priority="1"
              ><DxRequiredRule />
              <DxLookup
                :data-source="estadoSolicituds"
                value-expr="id"
                display-expr="name"
              />
            </DxColumn>

            <DxColumn :buttons="editButtons" type="buttons" />

            <DxFormItem
              :col-span="2"
              :editor-options="{ height: 210 }"
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
            <h3>Titulo de la variedad</h3>
            <div class="card-body">
              <div>Participantes Internos</div>
              <DxDataGrid
                id="gridContainer"
                class="main"
                :data-source="AniParticipanteInt"
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
                :data-source="AniParticipanteExt"
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
  name: "Animal",
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
          hint: "Certificado ICA",
          icon: "columnchooser",
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
    ...mapGetters("animal", ["items"]),
    ...mapGetters("tipoAnimal", { tipoAnimals: "items" }),
    ...mapGetters("tipoCiclo", { tipoCiclos: "items" }),
    ...mapGetters("estadoSolicitud", { estadoSolicituds: "items" }),
    ...mapGetters("TipoParticipacion", { TipoParticipacion: "items" }),
    ...mapGetters("AniParticipanteExt", { AniParticipanteExt: "items" }),
    ...mapGetters("AniParticipanteInt", { AniParticipanteInt: "items" }),
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
    ...mapActions("animal", ["all", "saveChange", "updateChange"]),
    ...mapActions("tipoAnimal", { getAnimals: "all" }),
    ...mapActions("tipoCiclo", { getCiclos: "all" }),
    ...mapActions("estadoSolicitud", { getSolicitud: "all" }),
    ...mapActions("TipoParticipacion", { getTipoParticipacion: "all" }),
    ...mapActions("AniParticipanteExt", {
      getAniParticipanteExt: "all",
      saveExtern: "saveChange",
      updateExtern: "updateChange",
    }),
    ...mapActions("AniParticipanteInt", {
      getAniParticipanteInt: "all",
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
      root.getAniParticipanteExt(obj);
      root.getAniParticipanteInt(obj);
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
    this.getAnimals();
    this.getCiclos();
    this.getSolicitud();
    // console.log(this.config);
  },
};
</script>