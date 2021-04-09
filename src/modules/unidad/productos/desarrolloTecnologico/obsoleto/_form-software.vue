<template>
	<div class="col p-3">
		<div class="text-center p-2 mb-2">
			<h3 class="font-weight-semibold text-success">Software</h3>
		</div>

		<hr class="sep" />
		<div class="row">
			<div class="form-group col-md-6">
				<label>Tipo:</label>
				<DxSelectBox />
			</div>

			<div class="form-group col-md-12">
				<label>Número del Registro aprobado por la Dirección Nacional de Derechos de Autor</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox class="form-control" placeholder="Numero Registro" name="numRegistro" id="numRegistro" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Numero Registro" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="10" message="el Numero es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="col-md-12">
				<div class="form-group">
					<label>Fecha de obtención:</label>
					<DxDateBox
						class="form-control"
						name="fechaEstimada1"
						id="fechaEstimada1"
						placeholder="dd/mm/yyyy"
						display-format="dd/MM/yyyy"
						:min="minDate"
						:max="actualDate"
						type="date"
					/>
				</div>
			</div>

			<div class="col-md-12">
				<div class="form-group">
					<label>Descripción del Análisis*:</label>
					<DxTextArea :height="100" :max-length="400" placeholder="Descripción" class="form-control" />
				</div>
			</div>

			<div class="form-group col-md-12">
				<label>Diseño</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox class="form-control" placeholder="Diseño" name="Diseño" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Diseño" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="3" message="el Diseño es de minimo de 3 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group col-md-12">
				<label>Implementación y Validación</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox class="form-control" placeholder="Implementación" name="Implementación" id="Implementación" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Implementación y Validación" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="10" message=" Implementación y Validación es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="col-md-12">
				<div class="form-group">
					<label>Observaciones:</label>
					<DxTextArea :height="100" :max-length="400" placeholder="Observaciones" class="form-control" />
				</div>
			</div>

			<div class="col-md-12">
				<div class="form-group">
					<label class="p-2">Adjuntar Soporte:</label>
					<button type="button" class="btn btn-main btn-labeled btn-lg legitRipple">
						<i class="icon-attachment"></i>
					</button>
				</div>
			</div>
		</div>
		<!-- <div class="row">
			<div class="text-center p-2 mb-4 col-md-12">
				<button type="button" class="btn btn-main btn-labeled btn-sm legitRipple">
					Guardar
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
				<a href="#" @click="save($event)" :class="'btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple' + (isValid ? '' : ' disabled')">
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
import { DxTextBox, DxDateBox, DxSelectBox, DxTextArea } from "devextreme-vue";
import { DxValidator, DxRequiredRule, DxStringLengthRule, DxValidationRule } from "devextreme-vue/validator";

export default {
	name: "FormSoftware",
	components: {
		DxValidator,
		DxRequiredRule,
		DxStringLengthRule,
		DxValidationRule,
		DxTextBox,
		DxDateBox,
		DxTextArea,
		DxSelectBox,
	},
	data() {
		return {
			now: new Date(),
			min: new Date(2000, 0, 1),
		};
	},
};
</script>
