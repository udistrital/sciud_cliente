<template>
  <div class="col p-3">
    <div class="bg-azul p-1 mb-1">
      <h3 class="font-weight-semibold text-white mt-2">
        Nueva Variedad Vegetal
      </h3>
    </div>

    <hr class="sep" />
    <div class="row">
      <div class="form-group text-left col-md-6">
        <label>Tipo:</label>
        <DxSelectBox
          :data-source="tipoVegetals"
          display-expr="name"
          value-expr="id"
          class="form-control"
        />
      </div>
      <div class="form-group text-left col-md-6">
        <label>Proyecto ID:</label>
        <DxSelectBox class="form-control" />
      </div>

      <div class="form-group text-left col-md-12">
        <label>Numero de la Variedad</label>

        <DxTextBox
          class="form-control"
          placeholder="Variedad"
          name="Variedad"
          id="Variedad"
          :showClearButton="true"
        >
          <DxValidator>
            <DxValidationRule type="required" message="Falta Variedad" />
            <DxRequiredRule message="Campo requerido" />
            <DxStringLengthRule
              :min="10"
              message="la Variedad es de minimo de 10 caracteres"
            />
          </DxValidator>
        </DxTextBox>
      </div>

      <div class="form-group text-left col-md-12">
        <label> Autor*</label>

        <DxTextBox
          class="form-control"
          placeholder="Autor"
          name="Autor"
          id="Autor"
          :showClearButton="true"
        >
          <DxValidator>
            <DxValidationRule type="required" message="Falta Nombre Autor" />
            <DxRequiredRule message="Campo requerido" />
            <DxStringLengthRule
              :min="10"
              message="el Nombre es de minimo de 10 caracteres"
            />
          </DxValidator>
        </DxTextBox>
      </div>

      <div class="form-group text-left col-md-12">
        <label>Fecha:</label>
        <DxDateBox
          class="form-control"
          name="fechaEstimada1"
          id="fechaEstimada1"
          placeholder="dd/mm/yyyy"
          display-format="dd/MM/yyyy"
          :min="min"
          :max="now"
          type="date"
        />
      </div>

      <div class="form-group text-left col-md-6">
        <label>Tipo de ciclo</label>
        <DxRadioGroup :items="ciclo" :value="ciclo[0]" layout="horizontal" />
      </div>

      <div class="form-group text-left col-md-6">
        <label>Estado de la solicitud</label>
        <DxRadioGroup
          :items="solicitud"
          :value="solicitud[0]"
          layout="horizontal"
        />
      </div>

      <div class="form-group col-md-12">
        <label class="p-2">Adjuntar Soporte:</label>
        <button
          type="button"
          class="btn btn-main btn-labeled btn-lg legitRipple"
        >
          <i class="icon-attachment"></i>
        </button>
      </div>
    </div>

    <hr class="sep" />
    <div class="row">
      <div class="col">
        <a
          href="#"
          class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple"
          @click="cancel($event)"
        >
          <b>
            <i class="icon-database-remove"></i>
          </b>
          CANCELAR
        </a>
      </div>
      <div class="col text-right">
        <a
          href="#"
          @click="save($event)"
          :class="
            'btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple' +
            (isValid ? '' : ' disabled')
          "
        >
          GUARDAR
          <b>
            <i class="icon-database-add"></i>
          </b>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DxTextBox,
  DxDateBox,
  DxSelectBox,
  DxRadioGroup,
} from "devextreme-vue";
import {
  DxValidator,
  DxRequiredRule,
  DxStringLengthRule,
  DxValidationRule,
} from "devextreme-vue/validator";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "FormVegetal",
  components: {
    DxValidator,
    DxRequiredRule,
    DxStringLengthRule,
    DxValidationRule,
    DxTextBox,
    DxDateBox,
    DxRadioGroup,
    DxSelectBox,
  },
  data() {
    return {
      now: new Date(),
      min: new Date(2000, 0, 1),
      ciclo: ["Corto", "Largo"],
      solicitud: ["Proceso", "Obtenida"],
    };
  },
  computed: {
    ...mapGetters("tipoVegetal", { tipoVegetals: "items" }),
  },
  methods: {
    ...mapActions("tipoVegetal", { getTipoVegetal: "all" }),
  },
  mounted() {
    this.getTipoVegetal();
  },
};
</script>
