<template>
	<div class="col p-3">
		<div class="bg-azul p-1 mb-1">
			<h3 class="font-weight-semibold text-white mt-2">Nueva Patente</h3>
		</div>

		<hr class="sep" />
		<div class="row">
			<div class="form-group text-left col-md-6">
				<label>Tipo:</label>
				<DxSelectBox :data-source="tipoPatentes" display-expr="name" value-expr="id" class="form-control" />
			</div>
			<div class="form-group text-left col-md-6">
				<label>Proyecto ID:</label>
				<DxSelectBox class="form-control" />
			</div>

			<div class="form-group text-left col-md-7">
				<label>Numero de la Patente</label>

				<DxTextBox
					class="form-control"
					placeholder="Numero Patente"
					name="numPatente"
					id="numPatente"
					:showClearButton="true"
				>
					<DxValidator>
						<DxValidationRule type="required" message="Falta Numero Patente" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="10" message="el Numero es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>
			<div class="form-group text-left col-md-5">
				<label>Estado:</label>
				<DxSelectBox :data-source="estadoPatentes" display-expr="name" value-expr="id" class="form-control" />
			</div>

			<div class="form-group text-left col-md-12">
				<label>Título de la Patente</label>
				>
				<DxTextBox class="form-control" placeholder="Titulo Patente" name="Patente" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Titulo Patente" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="3" message="el Titulo es de minimo de 3 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-12">
				<label>Certificado de patente</label>

				<DxTextBox
					class="form-control"
					placeholder="Nombre Autor(es)"
					name="Certificado"
					id="Certificado"
					:showClearButton="true"
				>
					<DxValidator>
						<DxValidationRule type="required" message="Falta Certificado" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="10" message="el Certificado es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-12">
				<label>Titular*</label>

				<DxTextBox class="form-control" placeholder="Titular" name="Titular" id="Titular" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Nombre Titular" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="10" message="el Nombre es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-12">
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

			<div class="form-group text-left col-md-6">
				<label>País(es) de obtención*</label>

				<DxTextBox class="form-control" placeholder="Pais de publicación" name="pais" id="pais" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Pais de publicación" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="el Lugar es de minimo de 5 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-6">
				<label>Gaceta industrial de publicación*</label>

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

			<div class="form-group col-md-12">
				<label class="p-2">Adjuntar Soporte:</label>
				<button type="button" class="btn btn-main btn-labeled btn-lg legitRipple">
					<i class="icon-attachment"></i>
				</button>
			</div>
		</div>

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
	name: "FormPatentes",
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
		...mapGetters("tipoPatente", { tipoPatentes: "items" }),
		...mapGetters("estadoPatente", { estadoPatentes: "items" }),
	},
	methods: {
		...mapActions("tipoPatente", { getTipoPatente: "all" }),
		...mapActions("estadoPatente", { getEstadoPatente: "all" }),
	},
	mounted() {
		this.getTipoPatente();
		this.getEstadoPatente();
	},
};
</script>
