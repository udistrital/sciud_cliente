<template>
  <div class="col">
    <div
      class="row card-body bg-light"
      v-for="item in itemData.details"
      :key="item.id"
    >
      <div class="row-md-6 p-1">
        <b class="text-dark">Categoria: </b>{{ item.category }}
      </div>
      <hr />
      <div class="row-md-6 p-1">
        <b class="text-dark">Proyecto ID: </b>{{ item.registry_number }}
      </div>
      <hr />
      <div class="row-md-6 p-1">
        <b class="text-dark">Titulo: </b>{{ item.tittle }}
      </div>
      <hr />
      <div class="row-md-6 p-1">
        <b class="text-dark">Autor: </b>{{ item.authors }}
      </div>
      <hr />
      <div class="row-md-6 p-1">
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
        <!-- 
        <div v-if="itemData.name == 'Tesis de Doctorado'">
          <FormParticipacion />
        </div> -->
        <!-- <div v-if="itemData.name == 'Software'">
          <FormSoftware />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import FormParticipacion from "./_form-paticipación";

export default {
  props: {
    itemData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    // FormParticipacion,
  },
  data() {
    return {
      opt: false,
    };
  },
};
</script>
