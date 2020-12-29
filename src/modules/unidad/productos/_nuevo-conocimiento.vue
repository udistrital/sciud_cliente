<template>
  <div>
    <div class="col">
      <div class="card">
        <div id="accordion2">
          <div>
            <div class="card-header border-dark bg-active p-0" id="heading1">
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-left text-capitalize text-dark collapsed"
                  data-toggle="collapse"
                  data-target="#collapse1"
                  aria-expanded="false"
                  aria-controls="collapse1"
                >
                  <strong>Libros resultado de investigación</strong>
                </button>
              </h5>
            </div>

            <div
              id="collapse1"
              class="collapse"
              aria-labelledby="heading1"
              data-parent="#accordion2"
            >
              <div class="card-body">
                <Libro :group="group" />
              </div>
            </div>
          </div>
          <div>
            <div class="card-header border-dark bg-active p-0" id="heading2">
              <h5 class="mb-0">
                <button
                  class="btn w-100 text-left text-capitalize btn-link text-dark collapsed"
                  data-toggle="collapse"
                  data-target="#collapse2"
                  aria-expanded="false"
                  aria-controls="collapse2"
                >
                  <strong>Artículos de investigación</strong>
                </button>
              </h5>
            </div>
            <div
              id="collapse2"
              class="collapse"
              aria-labelledby="heading2"
              data-parent="#accordion2"
            >
              <div class="card-body">
                <Articulo :group="group" />
              </div>
            </div>
          </div>
          <div>
            <div class="card-header border-dark bg-active p-0" id="headingT3">
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-left text-capitalize text-dark collapsed"
                  data-toggle="collapse"
                  data-target="#collapse3"
                  aria-expanded="false"
                  aria-controls="collapse3"
                >
                  <strong>Notas científicas</strong>
                </button>
              </h5>
            </div>
            <div
              id="collapse3"
              class="collapse"
              aria-labelledby="headingT3"
              data-parent="#accordion2"
            >
              <div class="card-body">
                <Nota :group="group" />
              </div>
            </div>
          </div>
          <div>
            <div class="card-header border-dark bg-active p-0" id="heading4">
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-left text-capitalize text-dark collapsed"
                  data-toggle="collapse"
                  data-target="#collapse4"
                  aria-expanded="false"
                  aria-controls="collapse4"
                >
                  <strong>
                    Capítulos en libro resultado de investigación
                  </strong>
                </button>
              </h5>
            </div>
            <div
              id="collapse4"
              class="collapse"
              aria-labelledby="heading4"
              data-parent="#accordion2"
            >
              <div class="card-body">
                <Capitulo :group="group" />
              </div>
            </div>
          </div>
          <div>
            <div class="card-header border-dark bg-active p-0" id="heading5">
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-left text-capitalize text-dark collapsed"
                  data-toggle="collapse"
                  data-target="#collapse5"
                  aria-expanded="false"
                  aria-controls="collapse5"
                >
                  <strong>Patentes</strong>
                </button>
              </h5>
            </div>
            <div
              id="collapse5"
              class="collapse"
              aria-labelledby="heading5"
              data-parent="#accordion2"
            >
              <div class="card-body">
                <Patente :group="group" />
              </div>
            </div>
          </div>
          <div>
            <div class="card-header border-dark bg-active p-0" id="heading6">
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-left text-capitalize text-dark collapsed"
                  data-toggle="collapse"
                  data-target="#collapse6"
                  aria-expanded="false"
                  aria-controls="collapse6"
                >
                  <strong>Variedades vegetales</strong>
                </button>
              </h5>
            </div>
            <div
              id="collapse6"
              class="collapse"
              aria-labelledby="heading6"
              data-parent="#accordion2"
            >
              <div class="card-body">
                <Vegetal :group="group" />
              </div>
            </div>
          </div>
          <div>
            <div class="card-header border-dark bg-active p-0" id="heading7">
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-left text-capitalize text-dark collapsed"
                  data-toggle="collapse"
                  data-target="#collapse7"
                  aria-expanded="false"
                  aria-controls="collapse7"
                >
                  <strong>Nuevas razas animales</strong>
                </button>
              </h5>
            </div>
            <div
              id="collapse7"
              class="collapse"
              aria-labelledby="heading7"
              data-parent="#accordion2"
            >
              <div class="card-body">
                <Animal :group="group" />
              </div>
            </div>
          </div>
          <div>
            <div class="card-header border-dark bg-active p-0" id="heading8">
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-left text-capitalize text-dark collapsed"
                  data-toggle="collapse"
                  data-target="#collapse8"
                  aria-expanded="false"
                  aria-controls="collapse8"
                >
                  <strong>Poblaciones mejoradas de razas pecuarias</strong>
                </button>
              </h5>
            </div>
            <div
              id="collapse8"
              class="collapse"
              aria-labelledby="heading8"
              data-parent="#accordion2"
            >
              <div class="card-body">
                <Poblacion :group="group" />
              </div>
            </div>
          </div>
          <div>
            <div class="card-header border-dark bg-active p-0" id="heading9">
              <h5 class="mb-0">
                <button
                  class="btn w-100 btn-link text-left text-capitalize text-dark collapsed"
                  data-toggle="collapse"
                  data-target="#collapse9"
                  aria-expanded="false"
                  aria-controls="collapse9"
                >
                  <strong
                    >Obras de Investigacion Creacion en Artes, Arquitectura y
                    Diseño</strong
                  >
                </button>
              </h5>
            </div>
            <div
              id="collapse9"
              class="collapse"
              aria-labelledby="heading9"
              data-parent="#accordion2"
            >
              <div class="card-body">
                <Obra :group="group" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Libro from "./nuevoConocimiento/_detalles-libro";
import Articulo from "./nuevoConocimiento/_detalles-articulo";
import Capitulo from "./nuevoConocimiento/_detalles-capitulo";
import Patente from "./nuevoConocimiento/_detalles-patente";
import Vegetal from "./nuevoConocimiento/_detalles-vegetal";
import Animal from "./nuevoConocimiento/_detalles-animal";
import Poblacion from "./nuevoConocimiento/_detalles-poblacion";
import Nota from "./nuevoConocimiento/_detalles-nota";
import Obra from "./nuevoConocimiento/_detalles-obra";

export default {
  name: "NuevoConocimiento",
  components: {
    Libro,
    Articulo,
    Capitulo,
    Patente,
    Vegetal,
    Animal,
    Poblacion,
    Nota,
    Obra,
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
