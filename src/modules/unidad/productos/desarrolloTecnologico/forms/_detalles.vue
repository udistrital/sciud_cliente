<template>
  <div class="col">
    <div>
      <DxTabPanel
        :data-source="itemData.details"
        :selected-index.sync="selectedIndex"
        :loop="false"
        :animation-enabled="true"
        :swipe-enabled="true"
        :hoverStateEnabled="true"
      >
        <template #title="{ data: item }">
          <span class="p-1">{{ item.name }}</span>
        </template>
        <template #item="{ data: item }">
          <div class="card p-3">
            <div
              class="row card-body bg-light"
              v-for="re in item.more"
              :key="re.id"
            >
              <div class="col-md-6 p-1">
                <b class="text-dark">Categoria: </b>{{ re.category }}
              </div>

              <div class="col-md-6 p-1">
                <b class="text-dark">Proyecto ID: </b>{{ re.registry_number }}
              </div>

              <div class="col-md-6 p-1">
                <b class="text-dark">Titulo: </b>{{ re.tittle }}
              </div>

              <div class="col-md-6 p-1">
                <b class="text-dark">Autor: </b>{{ re.authors }}
              </div>

              <div class="col-md-6 p-1">
                <b class="text-dark">Fecha: </b>{{ re.date_publication }}
              </div>
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

                <div v-if="item.name == 'Secreto empresarial'">
                  <FormEmpresariales />
                </div>
                <div v-if="item.name == 'Software'">
                  <FormSoftware />
                </div>
              </div>
            </div>
          </div>
        </template>
      </DxTabPanel>
    </div>
  </div>
</template>

<script>
import FormEmpresariales from "./_form-empresariales";
import FormSoftware from "./_form-software";
import DxTabPanel from "devextreme-vue/tab-panel";

export default {
  props: {
    itemData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    FormEmpresariales,
    FormSoftware,
    DxTabPanel,
  },
  data() {
    return {
      opt: false,
      selectedIndex: 0,
    };
  },
};
</script>
