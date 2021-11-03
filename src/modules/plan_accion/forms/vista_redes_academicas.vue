<template>
<div>

<div class="page-header header-elements-md-inline mb-2" id="non-printable">
            <div class="page-title p-0 m-0">
                <i class="icon-grid3 mr-1 color-main-600"></i>
                Listado de Redes Académicas Asociadas
            </div>
             <button 
                  type="button"
                  @click.prevent="add()"
                  v-if="editMode"
                  title="Nuevo Elemento.."
                  class="btn btn-main btn-labeled btn-labeled-left"
                >
                  <b><i class="icon-database-add"></i></b>Visualizar
            </button>
</div>


   <div  v-for="datos in list" :key="datos">
    

  <span class="font-weight-semibold">Listado de áreas del conocimiento asociadas a Linea de Investigación: <strong>{{ datos.research_focuses[0]['research_focus_name']}}</strong>, para la red academica creada con el nombre: <strong>{{datos.name}}</strong> y se encuentra en estado de: <strong>{{datos.goal_state_name}}</strong> </span>
      <div class="card-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="card">
              
              <div class="card-body">
                <h5 class="card-title">CINE:</h5>
                
                <p class="card-text">
                  <ul>
                    <li v-for="areacine in  datos.cine" :key="areacine.idx">{{areacine.cine_specific_area_name}} 
                      <ul v-for="areacinedetalle in  areacine.cine_detailed_area_ids" :key="areacinedetalle.idx">
                        <li>{{areacinedetalle.name}}</li>
                      </ul>
                    </li>
                  </ul>
                </p>
              </div>
              </div>
            </div>

            <div class="col-sm-4">
              <div class="card">
              <div class="card-body">
                <h5 class="card-title">OCDE: </h5>
                <p class="card-text">
                  <ul>
                    <li v-for="areaocde in  datos.oecd" :key="areaocde.idx">{{areaocde.oecd_knowledge_subarea_name}} 
                      <ul v-for="areaocdedetalle in  areaocde.oecd_discipline_ids" :key="areaocdedetalle.idx">
                        <li>{{areaocdedetalle.name}}</li>
                      </ul>
                    </li>
                  </ul>
                </p>
              </div>
              </div>
            </div>

            <div class="col-sm-4">
              <div class="card">
              <div class="card-body">
                <h5 class="card-title">SNIES</h5>
                <p class="card-text">
                  <ul>
                    <li v-for="areasnies in  datos.snies" :key="areasnies.idx">{{areasnies.snies_name}} 
                    </li>
                  </ul>
                </p>
              </div>
              </div>
            </div>
          </div>
        
      </div>


  </div>









  <hr />
  <!-- {{JSON.stringify(arreglos, null, "\t") }}<hr> -->

  <!-- nuevo
  {{  -->
  <!-- {{ JSON.stringify(datalist, null, "\t") }} -->
</div>  

</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root = null;
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: {
    name: {
      type: String,
      default: "no hay datos",
    },
    arreglos: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    list: [],
  }),

  // computed: {
  //   ...mapState("unidad/producto/universalSentUpAct", { data: "items" }),
  // },

  
  methods: {
    add() {
      // this.arreglos=root.arreglos;
      this.list = this.arreglos;
      console.warn("data:", this.arreglos);
    },
  },
};
</script>

<style>

    
</style>