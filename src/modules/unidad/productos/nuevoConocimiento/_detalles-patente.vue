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
                :data-source="tipoPatentes"
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
              caption="Título de la patente"
              data-type="string"
              :width="180"
              alignment="center"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="patent_number"
              caption="Número de la patente"
              data-type="string"
              :width="180"
              alignment="center"
              :hiding-priority="6"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="patent_state_id"
              caption="Estado"
              alignment="center"
              :hiding-priority="5"
              ><DxRequiredRule />
              <DxLookup
                :data-source="estadoPatentes"
                value-expr="id"
                display-expr="name"
              />
            </DxColumn>

            <DxColumn
              data-field="date_of_obtaining"
              caption="Fecha de obtención"
              data-type="date"
              format="dd/MM/yyyy"
              alignment="center"
              :hiding-priority="3"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn
              data-field="geo_country_ids"
              caption="Pais(es) de obtención"
              alignment="center"
              :allow-sorting="false"
              :cell-template="cellTemplate"
              :calculate-filter-expression="calculateFilterExpression"
              edit-cell-template="tagBoxEditor"
              :hiding-priority="2"
              ><DxRequiredRule />
              <DxLookup
                :data-source="paises"
                value-expr="id"
                display-expr="name"
              />
            </DxColumn>

            <DxColumn
              data-field="industrial_publication_gazette"
              caption="Gaceta industrial de publicación"
              data-type="string"
              alignment="center"
              :hiding-priority="1"
              ><DxRequiredRule
            /></DxColumn>

            <DxColumn :buttons="editButtons" type="buttons" />

            <DxFormItem
              :col-span="2"
              :editor-options="{ height: 180 }"
              editor-type="dxTextArea"
            />
            <template #tagBoxEditor="{ data: cellInfo }">
              <EmployeeTag
                :value="cellInfo.value"
                :on-value-changed="(value) => onValueChanged(value, cellInfo)"
                :data-source="paises"
                :data-grid-component="cellInfo.component"
              />
            </template>
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
            <h3>Titulo Patente</h3>
            <div class="card-body">
              <div>Participantes Internos</div>
              <DxDataGrid
                id="gridContainer"
                class="main"
                :data-source="PatParticipanteInt"
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
                :data-source="PatParticipanteExt"
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

import EmployeeTag from "./_employee-tag";

export default {
  name: "Patente",
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
    EmployeeTag,
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
      calculateFilterExpression: function (
        filterValue,
        selectedFilterOperation,
        target
      ) {
        if (target === "search" && typeof filterValue === "string") {
          return [this.dataField, "contains", filterValue];
        }
        return function (data) {
          return (data.AssignedEmployee || []).indexOf(filterValue) !== -1;
        };
      },
    };
  },
  computed: {
    ...mapGetters("patente", ["items"]),
    ...mapGetters("estadoPatente", { estadoPatentes: "items" }),
    ...mapGetters("tipoPatente", { tipoPatentes: "items" }),
    ...mapGetters("Pais", { paises: "items2" }),
    ...mapGetters("TipoParticipacion", { TipoParticipacion: "items" }),
    ...mapGetters("PatParticipanteExt", { PatParticipanteExt: "items" }),
    ...mapGetters("PatParticipanteInt", { PatParticipanteInt: "items" }),
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
    ...mapActions("patente", ["all", "saveChange", "updateChange"]),
    ...mapActions("estadoPatente", { getEstados: "all" }),
    ...mapActions("tipoPatente", { getPatentes: "all" }),
    ...mapActions("Pais", { getPaises: "all2" }),
    ...mapActions("TipoParticipacion", { getTipoParticipacion: "all" }),
    ...mapActions("PatParticipanteExt", {
      getPatParticipanteExt: "all",
      saveExtern: "saveChange",
      updateExtern: "updateChange",
    }),
    ...mapActions("PatParticipanteInt", {
      getPatParticipanteInt: "all",
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
    cellTemplate(container, options) {
      var noBreakSpace = "\u00A0",
        text = (options.value || [])
          .map((element) => {
            return options.column.lookup.calculateCellValue(element);
          })
          .join(", ");
      container.textContent = text || noBreakSpace;
      container.title = text;
    },
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    },
    // nueva patente
    RowInserted(e) {
      let root = this;

      var obj = e.data;
      var igGroup = root.group.id;

      obj.unidadId = igGroup;
      root.saveChange(obj);
    },
    // actualizar patente
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
      root.getPatParticipanteExt(obj);
      root.getPatParticipanteInt(obj);
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
    // this.all();
    this.getPatentes();
    this.getEstados();
    this.getPaises();
    // console.log(this.config);
  },
};
</script>
