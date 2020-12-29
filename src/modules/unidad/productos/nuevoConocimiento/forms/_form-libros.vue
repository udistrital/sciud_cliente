<template>
	<div class="col p-3">
		<div class="bg-azul p-1 mb-1">
			<h3 class="font-weight-semibold text-white mt-2">Nuevo Libro</h3>
		</div>
		<hr class="sep" />
		<div class="row">
			<div class="form-group text-left col-md-6">
				<label>Categoria:</label>
				<DxSelectBox :data-source="categoriaLibs" display-expr="name" value-expr="id" class="form-control" />
			</div>
			<div class="form-group text-left col-md-6">
				<label>Proyecto ID:</label>
				<DxSelectBox class="form-control" />
			</div>
			<div class="form-group text-left col-md-12">
				<label>Título del Libro</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox class="form-control" placeholder="Titulo Libro" name="Libro" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Nombre Libro" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="3" message="el Titulo es de minimo de 3 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-8">
				<label>Autor(es)</label>
				<!-- <input type="text" class="form-control" /> -->
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
				<!-- <input type="text" class="form-control" /> -->
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
				<label>Fecha de publicación:</label>
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

			<div class="form-group text-left col-md-12">
				<label>ISBN * / ISBN (Online)</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox class="form-control" placeholder="ISBN" name="ISBN" id="ISBN" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta ISBN" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="el ISBN es de minimo de 5 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-12">
				<label>Nombre Editorial</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox class="form-control" placeholder="Editorial" name="Editorial" id="Editorial" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta Editorial" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="la Editorial es de minimo de 5 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-6">
				<label>Pais de Publicación</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox
					class="form-control"
					placeholder="Pais de publicación"
					name="Lugar"
					id="Lugar"
					:showClearButton="true"
				>
					<DxValidator>
						<DxValidationRule type="required" message="Falta Pais de publicación" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="el Lugar es de minimo de 5 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-6">
				<label>ciudad de Publicación</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox
					class="form-control"
					placeholder="ciudad de publicación"
					name="Lugar"
					id="Lugar"
					:showClearButton="true"
				>
					<DxValidator>
						<DxValidationRule type="required" message="Falta ciudad de publicación" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="el Lugar es de minimo de 5 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>
			<div class="form-group text-left col-md-12">
				<label>URL</label>
				<!-- <input type="text" class="form-control" /> -->
				<DxTextBox class="form-control" placeholder="URL" name="URL" id="URL" :showClearButton="true">
					<DxValidator>
						<DxValidationRule type="required" message="Falta URL" />
						<DxRequiredRule message="Campo requerido" />
						<DxStringLengthRule :min="5" message="la URL es de minimo de 10 caracteres" />
					</DxValidator>
				</DxTextBox>
			</div>

			<div class="form-group text-left col-md-12">
				<label>Observaciones:</label>
				<DxTextArea :height="100" :max-length="400" placeholder="Observaciones" class="form-control" />
			</div>

			<div class="form-group col-md-12">
				<label class="p-2">Adjuntar Libro:</label>
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
import { DxTextBox, DxDateBox, DxTextArea, DxSelectBox, DxRadioGroup } from "devextreme-vue";
import { DxValidator, DxRequiredRule, DxStringLengthRule, DxValidationRule } from "devextreme-vue/validator";

import { mapActions, mapGetters } from "vuex";

export default {
	name: "FormLibros",
	components: {
		DxValidator,
		DxRequiredRule,
		DxStringLengthRule,
		DxValidationRule,
		DxTextBox,
		DxDateBox,
		DxTextArea,
		DxSelectBox,
		DxRadioGroup,
	},
	data() {
		return {
			now: new Date(),
			min: new Date(2000, 0, 1),
			priorities: ["Interno(s)", "Externo(s)"],
		};
	},
	computed: {
		...mapGetters("categoriaLib", { categoriaLibs: "items" }),
	},
	methods: {
		...mapActions("categoriaLib", { getcategLibs: "all" }),
	},
	mounted() {
		this.getcategLibs();
	},
};
</script>
