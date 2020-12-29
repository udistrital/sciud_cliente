<template>
	<div class="col p-3">
		<div class="bg-azul p-1 mb-1">
			<h3 class="font-weight-semibold text-white mt-2">
				Nueva Obras de Investigacion Creacion en Artes, Arquitectura y Diseño
			</h3>
		</div>

		<hr class="sep" />
		<div class="row">
			<div class="form-group text-left col-md-6">
				<label>Proyecto ID:</label>
				<DxSelectBox class="form-control" />
			</div>

			<div class="form-group text-left col-md-12">
				<label>Titulo</label>

				<DxTextBox class="form-control" placeholder="Titulo*" name="Titulo" id="Titulo" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Titulo" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="el Titulo es de minimo de 5 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-8">
				<label>Autor(es)</label>

				<DxTextBox class="form-control" placeholder="Autor(es)" name="Autor(es)" id="Autor(es)" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Autor(es)" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="10" message="el Nombre es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>
			<div class="form-group text-left col-md-4">
				<label>Vinculación</label>
				<DxRadioGroup :items="priorities" :value="priorities[0]" layout="horizontal" />
			</div>

			<div class="form-group text-left col-md-8">
				<label>Coautor(es)</label>

				<DxTextBox
					class="form-control"
					placeholder="Coautor(es)"
					name="Coautor(es)"
					id="Coautor(es)"
					:showClearButton="true"
				>
					<DxValidator>
						<DxValidationRule type="required" message="Falta Coautor(es)" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="10" message="el Nombre es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-4">
				<label>Vinculación</label>
				<DxRadioGroup :items="priorities" :value="priorities[0]" layout="horizontal" />
			</div>

			<div class="form-group text-left col-md-12">
				<label>Fecha de creacion y seleccion:</label>
				<DxDateBox
					class="form-control"
					name="fechaEstimada1"
					id="fechaEstimada1"
					placeholder="dd/MM/yyyy"
					display-format="dd/MM/yyyy"
					:min="min"
					:max="now"
					type="date"
				/>
			</div>

			<div class="form-group text-left col-md-12">
				<label>Naturaleza de la Obra</label>

				<DxTextBox
					class="form-control"
					placeholder="Naturaleza"
					name="Naturaleza"
					id="Naturaleza"
					:showClearButton="true"
				>
					<DxValidator>
						<DxValidationRule type="required" message="Falta Naturaleza" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="la Naturaleza es de minimo de 5 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-12">
				<label>Area de Conocimeinto y especializacion:</label>
				<DxSelectBox :data-source="AreaConocimientos" display-expr="name" value-expr="id" class="form-control" />
			</div>
			<div class="form-group text-left col-md-12">
				<label>Titulo del Proyecto Registrado ( Del cual se deriva la creacion )</label>

				<DxTextBox
					class="form-control"
					placeholder="Titulo del Proyecto Registrado"
					name="Proyecto"
					id="Proyecto"
					:showClearButton="true"
				>
					<DxValidator>
						<DxValidationRule type="required" message="Falta Proyecto Registrado" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="El Proyecto Registrado es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-12">
				<label>URL</label>

				<DxTextBox class="form-control" placeholder="URL" name="URL" id="URL" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta URL" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="la URL es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-8">
				<label>Premios</label>

				<DxTextBox class="form-control" placeholder="Premios" name="Premios" id="Premios" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Premios" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="Premios es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>
			<div class="form-group text-left col-md-4">
				<label>Tipo:</label>
				<DxRadioGroup :items="premios" :value="premios[0]" layout="horizontal" />
			</div>

			<div class="form-group col-md-6">
				<label class="p-2">Adjuntar soporte:</label>
				<button type="button" class="btn btn-main btn-labeled btn-lg legitRipple">
					<i class="icon-attachment"></i>
				</button>
			</div>

			<div class="form-group text-left col-md-6">
				<label class="p-2">Clases:</label>
				<DxTagBox class="form-control" :items="clases" :show-selection-controls="true" />
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
import { DxTextBox, DxDateBox, DxSelectBox, DxRadioGroup, DxTagBox } from "devextreme-vue";
import { DxValidator, DxRequiredRule, DxStringLengthRule, DxValidationRule } from "devextreme-vue/validator";

import { mapActions, mapGetters } from "vuex";

export default {
	name: "FormObras",
	components: {
		DxValidator,
		DxRequiredRule,
		DxStringLengthRule,
		DxValidationRule,
		DxTextBox,
		DxDateBox,
		DxTagBox,
		DxSelectBox,
		DxRadioGroup,
	},
	data() {
		return {
			now: new Date(),
			min: new Date(2000, 0, 1),
			priorities: ["Interno(s)", "Externo(s)"],
			premios: ["Nacionales", "Internacionales"],
			clases: [
				"Plano",
				"Textos",
				"Bocetos",
				"Modelaciones 2D,3D,4D",
				"Maquetas",
				"Fotografias",
				"Realizacion",
				"Obras acabadas",
				"Grabaciones",
				"Filmaciones",
				"Videos",
				"Animaciones",
				"Evidencias de Montaje",
			],
		};
	},
	computed: {
		...mapGetters("areaConocimiento", { AreaConocimientos: "items" }),
	},
	methods: {
		...mapActions("areaConocimiento", { getAreaConocimiento: "all" }),
	},
	mounted() {
		this.getAreaConocimiento();
	},
};
</script>
