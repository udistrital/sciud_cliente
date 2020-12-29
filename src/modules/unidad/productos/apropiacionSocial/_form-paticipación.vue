<template>
	<div class="col p-3">
		<div class="text-center p-2 mb-2">
			<h3 class="font-weight-semibold text-success">Nuevo Paticipación-CTeI</h3>
		</div>

		<hr class="sep" />
		<div class="row">
			<div class="form-group col-md-6">
				<label>Tipo:</label>
				<DxSelectBox />
			</div>

			<div class="form-group col-md-12">
				<label>Número de Registro del diseño industria</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox
					class="form-control"
					placeholder="Numero Registro"
					name="numRegistro"
					id="numRegistro"
					:showClearButton="true"
				>
					<DxValidator>
						<DxValidationRule type="required" message="Falta Numero Registro" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="10" message="el Numero es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group col-md-12">
				<label>Título de Registro</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox class="form-control" placeholder="Titulo Registro" name="Registro" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Titulo Registro" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="3" message="el Titulo es de minimo de 3 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group col-md-12">
				<label>Nombre del Titular*</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox class="form-control" placeholder="Titular" name="Titular" id="Titular" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Nombre Titular" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="10" message="el Nombre es de minimo de 10 caracteres" />
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
						:min="min"
						:max="now"
						type="date"
					/>
				</div>
			</div>

			<div class="form-group col-md-12">
				<label>País de obtención*</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox class="form-control" placeholder="Pais de publicación" name="pais" id="pais" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Pais de publicación" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="el Lugar es de minimo de 5 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group col-md-12">
				<label>Gaceta industrial de publicación*</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox
					class="form-control"
					placeholder="Gaceta de publicación"
					name="Gaceta"
					id="Gaceta"
					:showClearButton="true"
				>
					<DxValidator>
						<DxValidationRule type="required" message="Falta Gaceta de publicación" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="la Gaceta es de minimo de 5 caracteres" />
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
import { DxTextBox, DxDateBox, DxSelectBox, DxTextArea } from "devextreme-vue";
import { DxValidator, DxRequiredRule, DxStringLengthRule, DxValidationRule } from "devextreme-vue/validator";

export default {
	name: "FormParticipacion",
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
