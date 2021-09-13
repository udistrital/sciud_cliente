<template>
<div>
 <button
                  type="button"
                  @click.prevent="add()"
                  v-if="editMode"
                  title="Nuevo Elemento.."
                  class="btn btn-main btn-labeled btn-labeled-left"
                >
                  <b><i class="icon-database-add"></i></b> Nuevo
                </button>
  Relacion vista de impresion
  <div  v-for="datos in dataForm" :key="datos">
  <h3><smll>nombre: {{datos.name}}</smll></h3>
  <p>meta: {{datos.goal_state_name}}</p>
  <p>Linea de investigacion: {{datos.research_focuses[0]}}</p>
  </div>
  <hr />
  nuevo
  {{ JSON.stringify(dataForm, null, "\t") }}
  {{ JSON.stringify(datalist, null, "\t") }}
</div>  

</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root = null;
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    datalist: [],
    dataForm: [],
    listaGeneral: [],
  }),
  created() {
    root = this;
    root.listaRedes();
    this.dataForm=root.dataForm
  },
  props: {},
  computed: {
    ...mapState("unidad/producto/universalSentUpAct", { data: "items" }),
  },
  methods: {
    ...mapActions("unidad/producto/universalSentUpAct", {
      getDataAll: "getAll",
      getForm: "get",
    }),
    vista(id, i, obj) {
      setTimeout(function () {
        root.getForm({
          url: "form_d_act_plans/" + id,
          cb: function (results) {
            obj.dataForm[i] = results;
            console.warn("dataForm: ",obj.dataForm);
            // root.loaderHide();
          },
          
        });
      }, 10);
    },


   listaRedes() {
      setTimeout(function () {
        root.getDataAll({
          url:
            "/action_plans/" + root.$route.params.planId + '/form_d_act_plans',
          cb: function (results) {
            console.clear();
            // root.dataForm =[];
            root.datalist = results;
            for(let i=0; i<=root.datalist.length; i++){
              root.vista(root.datalist[i].id, i, root);
            }
            root.loaderHide();
          },
        });
      }, 100);

    },



    listaRedes2() {
      setTimeout(function () {
        root.getDataAll({
          url:
            "/action_plans/" + root.$route.params.planId + '/form_d_act_plans',
          cb: function (results) {
            console.clear();
            // root.dataForm =[];
            root.datalist = results;
            for(let i=0; i<=root.datalist.length; i++){
              root.vista(root.datalist[i].id, i, root);
            }
            root.loaderHide();
          },
        });
      }, 100);

    },

    add(){
      this.dataForm=root.dataForm;
      console.warn("data:", this.dataForm);
    }
  },
};
</script>

<style>
</style>