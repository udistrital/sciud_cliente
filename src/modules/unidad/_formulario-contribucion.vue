<template>
	<div class="col p-3">
		<div class="row">
			<div class="form-group col-md-3">
				<label>Contribución:</label>
				<DxSelectBox />
			</div>
			<div class="form-group col-md-3">
				<label>Actividad:</label>
				<DxSelectBox />
			</div>
			<div class="form-group col-md-6">
				<label>Descripción</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox
					class="form-control"
					placeholder="Descripción"
					name="Descripción"
					id="Descripción"
					:showClearButton="true"
				>
					<DxValidator>
						<DxValidationRule type="required" message="Falta Descripción" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="la Descripción es de minimo de 5 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>
			<div class="col-md-6">
				<div class="form-group">
					<label>Cantidad de participantes:</label>
					<DxTextBox
						:show-clear-button="true"
						class="form-control"
						:showClearButton="true"
						placeholder="cantidad"
						name="cantidad"
						id="cantidad"
					/>
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group">
					<label>Fecha creación CIDC:</label>
					<DxDateBox
						class="form-control"
						name="fechaEstimada"
						id="fechaEstimada"
						placeholder="dd/mm/yyyy"
						display-format="dd/MM/yyyy"
						:min="min"
						:max="now"
						type="date"
					/>
				</div>
			</div>
		</div>
		<!-- <div class="row">
      <div class="text-center p-2 mb-4 col-md-12">
        <button
          type="button"
          class="btn btn-main btn-labeled btn-sm legitRipple"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="btn btn-main btn-labeled btn-sm legitRipple"
        >
          Agregar
        </button>
      </div>
    </div> -->
		<hr class="sep" />
		<div class="row">
			<div class="col">
				<a href="#" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple" @click="cancel($event)">
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
					:class="'btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple' + (isValid ? '' : ' disabled')"
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
import { DxValidator, DxRequiredRule, DxStringLengthRule, DxValidationRule } from "devextreme-vue/validator";

import { mapActions, mapGetters } from "vuex";

export default {
	name: "FormularioContribucion",
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
		...mapGetters("formContribucion", ["items"]),
	},
	methods: {
		onContentReady() {
			window.jQuery(".commands a").click(function() {
				console.log("Come on lets show the dropdown!!");
			});
			// console.log("onContentReady!");
		},
		...mapActions("formContribucion", ["all"]),
	},

	mounted() {
		this.all();
	},
};
</script>
