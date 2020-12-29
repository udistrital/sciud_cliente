<template>
  <div class="col p-3">
    <div class="row">
      <div class="col">
        <p>
          <span class="font-weight-semibold">Instrucciones:</span> Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia
          eu ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus
          lobortis magna. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Donec urna eros, lacinia eu ullamcorper a, egestas porta nulla.
          Donec nec est nibh, rhoncus lobortis magna. Lorem ipsum dolor sit
          amet.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6">
        <GaficoPai />
      </div>
      <div class="form-group col-md-6">
        <Gaficogouge />
      </div>
    </div>
    <hr />
    <div class="col">
      <div class="card">
        <div id="accordion">
          <div>
            <div
              class="card-header text-center border-dark bg-azul p-0"
              id="headingOne"
            >
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-white collapsed"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Generación de Nuevo Conocimiento
                </button>
              </h5>
            </div>

            <div
              id="collapseOne"
              class="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div class="card-body">
                <NuevoConocimiento :group="group" />
              </div>
            </div>
          </div>
          <div>
            <div
              class="card-header text-center border-dark bg-amarillo p-0"
              id="headingTwo"
            >
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-white collapsed"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Desarrollo tecnologico e Innovacion
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
                <DesarrolloTec :group="group" />
              </div>
            </div>
          </div>
          <div>
            <div
              class="card-header text-center border-dark bg-verde p-0"
              id="headingThree"
            >
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-white collapsed"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Apropiación Social del Conocimiento
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
                <ApropiacionSocial :group="group" />
              </div>
            </div>
          </div>
          <div>
            <div
              class="card-header text-center border-dark bg-lila p-0"
              id="headingFour"
            >
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-white collapsed"
                  data-toggle="collapse"
                  data-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Productos de actividades relacionadas con la Formación de
                  Recurso Humano para la CTeI
                </button>
              </h5>
            </div>
            <div
              id="collapseFour"
              class="collapse"
              aria-labelledby="headingFour"
              data-parent="#accordion"
            >
              <div class="card-body">
                <ActividadesFormacion :group="group" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NuevoConocimiento from "./productos/_nuevo-conocimiento";
import DesarrolloTec from "./productos/_desarrollo-tecnologico";
import ApropiacionSocial from "./productos/_apropiacion-social";
import ActividadesFormacion from "./productos/_actividades-formacion";
import GaficoPai from "./productos/graficos/_grafico-pai";
import Gaficogouge from "./productos/graficos/_grafico-gauge";

// import DxAccordion from "devextreme-vue/accordion";

export default {
  name: "Produccion",
  components: {
    NuevoConocimiento,
    DesarrolloTec,
    ApropiacionSocial,
    GaficoPai,
    Gaficogouge,
    ActividadesFormacion,
  },
  props: {
    group: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
};
</script>
<style>
.bg-azul {
  background-color: #679ed2;
}
.bg-amarillo {
  background-color: #ffb140;
}
.bg-verde {
  background-color: #4aa329;
}
.bg-lila {
  background-color: #f83e5b;
}
</style>