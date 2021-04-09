<!--
202009060101:
https://js.devexpress.com/Demos/WidgetsGallery/Demo/DropDownButton/Overview/Vue/Light/
https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDropDownButton/
-->
<template>
  <DxDropDownButton
    :drop-down-options="{ width: 120 }"
    :items="cmdGet(data)"
    @item-click="cmdClick($event, data)"
    display-expr="text"
    icon="save"
    item-template="list-item"
    template="item"
    key-expr="id"
  >
    <template #item><i class="hand icon-cog"></i></template>
    <template #list-item="{ data }">
      <span class="cmd-item"><i :class="data.icon"></i>{{ data.text }}</span>
    </template>
  </DxDropDownButton>
</template>
<script>
let speed = 1000;
let $ = window.jQuery;
import DxDropDownButton from "devextreme-vue/drop-down-button";
export default {
  components: {
    DxDropDownButton,
  },
  mounted() {
    // console.log("data", this.data);
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    detailCb: {
      type: Function,
      default: null,
    },
    editCb: {
      type: Function,
      default: null,
    },
    addCb: {
      type: Function,
      default: null,
    },
    removeCb: {
      type: Function,
      default: null,
    },
    enableCb: {
      type: Function,
      default: null,
    },
    itemText: {
      type: String,
      default: "el ítem",
    },
  },
  data: () => ({
    some: "thing",
  }),
  methods: {
    cmdDetail() {
      console.log("detail " + this.data.id);
      $("#btn-add").fadeOut();
      $("#msg").html("Editar Unidad");
      $("#grid").fadeOut(speed, function () {
        $("#data").fadeIn(speed, function () {});
      });
    },
    cmdEdit() {
      console.log("edit " + this.data.id);
    },
    cmdDelete() {
      console.log("remove " + this.data.id);
    },
    cmdClick(e, data) {
      let root = this;
      let action = e.itemData.command;
      console.log("action", action);
      console.log("data", data);
      if (action === "edit") this.editCb(this.data);
      if (action === "detail") this.detailCb(this.data);
      if (action === "remove") this.removeCb(this.data);
      if (action === "enable" || action === "disable") {
        let a = action === "enable" ? "activar" : "desactivar";
        let msg = `¿Realmente desea ${a} ${this.itemText} <span class='text-sb'>"${this.data.name}"</span>?`;
        this.$confirm(msg, function (result) {
          console.log("this.enableCb", root.enableCb);
          console.log(result ? "Confirmed" : "Canceled");
          root.enableCb(result, root.data);
        });
      }
    },
    cmdGet(data) {
      let cmds = [];
      if (this.detailCb !== null) {
        cmds.push({
          command: "detail",
          text: "Detalles",
          icon: "icon-database-export",
        });
      }
      if (this.editCb !== null) {
        cmds.push({
          command: "edit",
          text: "Editar",
          icon: "icon-database-edit2",
        });
      }
      if (this.enableCb !== null) {
        let enable = {
          command: "enable",
          text: "Activar",
          icon: "icon-database-check",
        };
        let disable = {
          command: "disable",
          text: "Desactivar",
          icon: "icon-database-remove",
        };
        cmds.push(data.state_id === 1 ? disable : enable);
      }
      if (this.removeCb !== null) {
        cmds.push({
          command: "remove",
          text: "Eliminar",
          icon: "icon-database-remove",
        });
      }

      return cmds;
    },
  },
};
</script>
