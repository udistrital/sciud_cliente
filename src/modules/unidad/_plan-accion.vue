<template>
  <div class="col p-3">
    <div class="row">
      <div class="col">
        <span class="font-weight-semibold">Instrucciones:</span> Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia eu
        ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus lobortis
        magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec nec est
        nibh, rhoncus lobortis magna. Lorem ipsum dolor sit amet.
      </div>
    </div>

    <hr class="sep" />
    <div id="accordion">
      <div class="card">
        <div class="card-header p-2" id="headingOne">
          <h5 class="mb-0">
            <button
              class="btn w-100 btn-link p-0"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <span class="font-weight-semibold text-success"
                >Formación en investigación creación</span
              >
            </button>
          </h5>
        </div>

        <div
          id="collapseOne"
          class="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div class="card-body">
            <TablaFormacion />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header p-2" id="headingTwo">
          <h5 class="mb-0">
            <button
              class="btn w-100 btn-link p-0 collapsed"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <span class="font-weight-semibold text-success"
                >Proyectos de investigación</span
              >
            </button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div class="card-body">
            <TablaProyectos />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header p-2" id="headingThree">
          <h5 class="mb-0">
            <button
              class="btn w-100 btn-link p-0 collapsed"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <span class="font-weight-semibold text-success"
                >Estrategia de apropiación social del conocimiento</span
              >
            </button>
          </h5>
        </div>
        <div
          id="collapseThree"
          class="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordion"
        >
          <div class="card-body">
            <Estrategias />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";

import TablaFormacion from "./_tabla-formacion";
import TablaProyectos from "./_tabla-proyectos";
import Estrategias from "./_estrategias";

export default {
  name: "PlanDeAccion",
  components: {
    TablaFormacion,
    TablaProyectos,
    Estrategias,
  },
};
</script>

<style scoped>
</style>