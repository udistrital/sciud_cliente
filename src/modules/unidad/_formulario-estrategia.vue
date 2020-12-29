<template>
  <div class="col p-3">
    <div class="row">
      <div class="form-group col-md-4">
        <label>Evento científica :</label>
        <DxSelectBox />
      </div>
      <div class="form-group col-md-4">
        <label>Descripción</label>
        <!-- <input type="text" class="form-control" /> -->
        <DxTextBox
          class="form-control"
          placeholder="Descripción1"
          name="Descripción1"
          id="Descripción"
          :showClearButton="true"
        >
          <DxValidator>
            <DxValidationRule type="required" message="Falta Descripción" />
            <DxRequiredRule message="Campo requerido" />
            <DxStringLengthRule
              :min="5"
              message="la Descripción es de minimo de 5 caracteres"
            />
          </DxValidator>
        </DxTextBox>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label>Fecha Estimada:</label>
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
      </div>
      <div class="form-group col-md-4">
        <label>Evento artística:</label>
        <DxSelectBox />
      </div>
      <div class="form-group col-md-4">
        <label>Descripción</label>
        <!-- <input type="text" class="form-control" /> -->
        <DxTextBox
          class="form-control"
          placeholder="Descripción"
          name="Descripción2"
          id="Descripción2"
          :showClearButton="true"
        >
          <DxValidator>
            <DxValidationRule type="required" message="Falta Descripción" />
            <DxRequiredRule message="Campo requerido" />
            <DxStringLengthRule
              :min="5"
              message="la Descripción es de minimo de 5 caracteres"
            />
          </DxValidator>
        </DxTextBox>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label>Fecha Estimada:</label>
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
      </div>
      <div class="form-group col-md-4">
        <label>Redes:</label>
        <DxSelectBox />
      </div>
      <div class="form-group col-md-4">
        <label>Descripción</label>
        <!-- <input type="text" class="form-control" /> -->
        <DxTextBox
          class="form-control"
          placeholder="Descripción"
          name="Descripción3"
          id="Descripción3"
          :showClearButton="true"
        >
          <DxValidator>
            <DxValidationRule type="required" message="Falta Descripción" />
            <DxRequiredRule message="Campo requerido" />
            <DxStringLengthRule
              :min="5"
              message="la Descripción es de minimo de 5 caracteres"
            />
          </DxValidator>
        </DxTextBox>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label>Fecha Estimada:</label>
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
import { DxTextBox, DxDateBox, DxSelectBox } from "devextreme-vue";
import {
  DxValidator,
  DxRequiredRule,
  DxStringLengthRule,
  DxValidationRule,
} from "devextreme-vue/validator";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "FormularioEstrategia",
  components: {
    DxValidator,
    DxRequiredRule,
    DxStringLengthRule,
    DxValidationRule,
    DxTextBox,
    DxDateBox,
    DxSelectBox,
  },
  data() {
    return {
      now: new Date(),
      min: new Date(2000, 0, 1),
    };
  },
  computed: {
    ...mapGetters("formEstrategia", ["items"]),
  },
  methods: {
    onContentReady() {
      window.jQuery(".commands a").click(function () {
        console.log("Come on lets show the dropdown!!");
      });
      // console.log("onContentReady!");
    },
    ...mapActions("formEstrategia", ["all"]),
  },

  mounted() {
    this.all();
  },
};
</script>
