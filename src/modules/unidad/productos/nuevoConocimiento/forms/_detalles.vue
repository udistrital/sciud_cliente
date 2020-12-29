<template>
  <div class="col">
    <div
      class="row card-body bg-light"
      v-for="item in itemData.details"
      :key="item.id"
    >
      <div class="col-md-12 p-1 w-100 text-right">
        <DxDropDownButton
          :drop-down-options="{ width: 120 }"
          :items="cmdGet(data)"
          @item-click="cmdClick($event, itemData.details)"
          display-expr="text"
          icon="save"
          item-template="list-item"
          template="item"
          key-expr="id"
        >
          <template #item><i class="hand icon-menu7"></i></template>
          <template #list-item="{ data }">
            <span class="cmd-item"
              ><i :class="data.icon"></i>{{ data.text }}</span
            >
          </template>
        </DxDropDownButton>
      </div>
      <div
        class="col-md-6 p-2"
        v-if="
          itemData.name !==
          'Obras de Investigacion Creacion en Artes, Arquitectura y Diseño'
        "
      >
        <b class="text-dark">Categoria: </b>{{ item.category }}
      </div>
      <hr />
      <div class="col-md-6 p-2">
        <b class="text-dark">Proyecto ID: </b>{{ item.proyect_id }}
      </div>
      <hr />
      <div class="col-md-6 p-2">
        <b class="text-dark">Titulo: </b>{{ item.tittle }}
      </div>
      <hr />
      <div class="col-md-6 p-2">
        <b class="text-dark">Autor(es): </b>{{ item.authors }}
      </div>
      <hr />
      <div
        class="col-md-6 p-2"
        v-if="
          itemData.name !== 'Patentes' &&
          itemData.name !== 'Variedad vegetal' &&
          itemData.name !== 'Variedad animal'
        "
      >
        <b class="text-dark">Coautor(es): </b>{{ item.co_authors }}
      </div>
      <hr />
      <div class="col-md-6 p-2">
        <b class="text-dark">Fecha: </b>{{ item.date_publication }}
      </div>
      <hr />
    </div>
    <div class="text-center">
      <div class="row">
        <div class="row p-2">
          <button
            type="button"
            class="btn btn-main text-center btn-labeled btn-sm legitRipple"
            @click="opt = !opt"
          >
            <a v-if="!opt">Agregar</a> <a v-else>Cerrar</a>
          </button>
        </div>
      </div>

      <div class="row card bg-light p-2 mb-2" v-if="opt">
        <hr class="sep" />

        <div v-if="itemData.name == 'Libros resultado de investigación'">
          <FormLibros />
        </div>
        <div v-if="itemData.name == 'Artículos de investigación A1, A2, B y C'">
          <FormArticulos />
        </div>
        <div
          v-if="
            itemData.name == 'Capítulos en libro resultado de investigación'
          "
        >
          <FormCapitulos />
        </div>
        <div v-if="itemData.name == 'Patentes'">
          <FormPatentes />
        </div>
        <div v-if="itemData.name == 'Variedad vegetal'">
          <FormVegetal />
        </div>
        <div v-if="itemData.name == 'Variedad animal'">
          <FormAnimal />
        </div>
        <div
          v-if="
            itemData.name ==
            'Obras de Investigacion Creacion en Artes, Arquitectura y Diseño'
          "
        >
          <FormObras />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormArticulos from "./_form-articulos";
import FormLibros from "./_form-libros.vue";
import FormCapitulos from "./_form-capitulos";
import FormPatentes from "./_form-patentes";
import FormVegetal from "./_form-vegetal";
import FormAnimal from "./_form-animal";
import FormObras from "./_form-obras";

import DxDropDownButton from "devextreme-vue/drop-down-button";
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },

    editCb: {
      type: Function,
      default: null,
    },

    removeCb: {
      type: Function,
      default: null,
    },

    itemText: {
      type: String,
      default: "el ítem",
    },
  },
  components: {
    FormLibros,
    FormArticulos,
    FormCapitulos,
    FormPatentes,
    FormVegetal,
    FormAnimal,
    FormObras,
    DxDropDownButton,
  },
  data() {
    return {
      opt: false,
      some: "thing",
    };
  },
  methods: {
    cmdEdit() {
      console.log("edit " + this.data.id);
    },
    cmdDelete() {
      console.log("remove " + this.data.id);
    },
    cmdClick(e, data) {
      let action = e.itemData.command;
      console.log("action", e.itemData.d);
      console.log("data", data);
      if (action === "edit") this.editCb(this.data);
      if (action === "remove") {
        this.$delete(data, 0);
      }
    },
    cmdGet() {
      let cmds = [];

      cmds.push({
        command: "edit",
        text: "Editar",
        icon: "icon-database-edit2",
      });

      cmds.push({
        command: "remove",
        text: "Eliminar",
        icon: "icon-database-remove",
      });

      return cmds;
    },
  },
};
</script>
