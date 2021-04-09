<template>
	<div class="col p-3">
		<div class="row">
			<div class="col pb-2">
				<p>
					<span class="font-weight-semibold">Instrucciones:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia eu
					ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus lobortis magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna
					eros, lacinia eu ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus lobortis magna. Lorem ipsum dolor sit amet.
				</p>
			</div>
		</div>
		<hr class="sep" />
		<DxValidationGroup ref="instGroup">
			<div class="row">
				<div class="col-md-2">
					<div class="form-group">
						<label>Código Colciencias:</label>
						<DxTextBox
							class="form-control"
							:read-only="!editMode"
							:show-clear-button="true"
							:value.sync="group.colciencias_code"
							placeholder="Código Colciencias"
						>
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxTextBox>
					</div>
				</div>
				<div class="col-md-2">
					<div class="form-group">
						<label>Código SNIES:</label>
						<DxTextBox class="form-control" :read-only="!editMode" :show-clear-button="true" :value.sync="group.snies_id" placeholder="Código SNIES">
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxTextBox>
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label>
							Url GrupLAC:
							<a class="color-main-600 ml-1 font-weight-semibold" v-if="group.gruplac" :href="group.gruplac" target="_blank"
								>VISITAR <i class="icon-link"></i
							></a>
						</label>
						<DxTextBox class="form-control" :read-only="!editMode" :show-clear-button="true" :value.sync="group.gruplac" placeholder="Url GrupLAC">
							<DxValidator>
								<DxRequiredRule />
								<DxPatternRule message="La Url no es válida" :pattern="urlPattern" />
							</DxValidator>
						</DxTextBox>
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label
							>Url Página Web:
							<a class="color-main-600 ml-1 font-weight-semibold" v-if="group.webpage" :href="group.webpage" target="_blank"
								>VISITAR <i class="icon-link"></i
							></a>
						</label>
						<DxTextBox class="form-control" :read-only="!editMode" :show-clear-button="true" :value.sync="group.webpage" placeholder="Url Página Web">
							<DxValidator>
								<DxRequiredRule />
								<DxPatternRule message="La Url no es válida" :pattern="urlPattern" />
							</DxValidator>
						</DxTextBox>
					</div>
				</div>
				<div class="col-md-3">
					<div class="form-group">
						<label>Correo electrónico:</label>
						<DxTextBox class="form-control" :read-only="!editMode" :show-clear-button="true" :value.sync="group.email" placeholder="Correo electrónico">
							<DxValidator>
								<DxRequiredRule />
								<DxEmailRule />
							</DxValidator>
						</DxTextBox>
					</div>
				</div>
				<div class="col-md-9">
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>Area OCDE:</label>
								<DxSelectBox
									:data-source="ocdeEspecificos"
									:grouped="true"
									:search-enabled="true"
									@value-changed="areaChange"
									class="form-control"
									:read-only="!editMode"
									display-expr="name"
									:value.sync="group.oecd_knowledge_subarea_id"
									placeholder="Busque y/o seleccione..."
									value-expr="id"
								>
									<DxValidator>
										<DxRequiredRule />
									</DxValidator>
								</DxSelectBox>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>Discipinas OCDE:</label>
								<DxTagBox
									:data-source="ocdeDetallado"
									:disabled="ocdeDisabled"
									:search-enabled="true"
									:show-selection-controls="true"
									:value.sync="group.oecd_discipline_ids"
									class="form-control"
									:read-only="!editMode"
									display-expr="name"
									placeholder="Busque y/o seleccione..."
									value-expr="id"
								>
									<DxValidator>
										<DxRequiredRule />
									</DxValidator>
								</DxTagBox>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DxValidationGroup>
		<div class="row">
			<div class="col">
				<DxButton @click="cancel($event)" class="nb">
					<template #default>
						<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
							<b><i class="icon-database-remove"></i></b> CANCELAR
						</span>
					</template>
				</DxButton>
			</div>
			<div class="col text-right" v-if="editMode">
				<DxButton @click="save($event)" class="nb">
					<template #default>
						<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
							GUARDAR <b><i class="icon-database-add"></i></b>
						</span>
					</template>
				</DxButton>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let $ = window.jQuery;
import { DxDateBox, DxFileUploader, DxSelectBox, DxSwitch, DxButton, DxTagBox, DxTextArea, DxValidationGroup } from "devextreme-vue";
import { mapActions, mapGetters, mapState } from "vuex";
import DataSource from "devextreme/data/data_source";
import { DxTextBox, DxButton as DxTextBoxButton } from "devextreme-vue/text-box";
import { DxDataGrid, DxColumn, DxPager, DxPaging, DxGrouping, DxGroupPanel } from "devextreme-vue/data-grid";
import {
	DxValidator,
	DxRequiredRule,
	DxCustomRule,
	DxCompareRule,
	DxEmailRule,
	DxPatternRule,
	DxStringLengthRule,
	DxRangeRule,
	DxValidationRule,
	DxAsyncRule,
} from "devextreme-vue/validator";
export default {
	name: "Institucional",
	props: {
		editMode: {
			type: Boolean,
			default: true,
		},
		group: {
			type: Object,
			default: () => {},
		},
		saveFn: {
			type: Function,
			default: null,
		},
		cancelFn: {
			type: Function,
			default: null,
		},
		loadedFn: {
			type: Function,
			default: null,
		},
	},
	watch: {
		oEspecificos: function(g) {
			console.log("oEspecificos CAMBIADO!", g);
		},
		group: function(g) {
			console.log("watch.group CAMBIADO!", g);
			// this.creating = typeof g.id !== "undefined" && g.id.toString() === "0";
		},
	},
	components: {
		DxAsyncRule,
		DxButton,
		DxColumn,
		DxCompareRule,
		DxCustomRule,
		DxDataGrid,
		DxDateBox,
		DxEmailRule,
		DxFileUploader,
		DxGroupPanel,
		DxGrouping,
		DxPager,
		DxPaging,
		DxPatternRule,
		DxRangeRule,
		DxRequiredRule,
		DxSelectBox,
		DxStringLengthRule,
		DxSwitch,
		DxTagBox,
		DxTextArea,
		DxTextBox,
		DxTextBoxButton,
		DxValidationGroup,
		DxValidationRule,
		DxValidator,
	},
	data() {
		return {
			pageSizes: [5, 10, 20],
			ocdeDetallado: {},
			ocdeDisabled: true,
			urlPattern: /^(http|https):\/\/[^ "]+$/,
			phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
			validationRules: {
				required: { type: "required", message: "Position is required." },
				url: {
					type: "custom",
					message: "La Url no es válida",
					validationCallback: function(e) {
						console.log("e.value", e);
						var r = /^(http|https):\/\/[^ "]+$/;
						return r.test(e.value);
					},
				},
			},
		};
	},
	computed: {
		...mapState("unidad/ocde", { oEspecificos: "subareas", oDetallados: "disciplines" }),
		ocdeEspecificos() {
			var sorted = this.$objectSort(this.oEspecificos, "name");
			return new DataSource({
				group: "oecd_knowledge_area_name",
				store: {
					data: sorted,
					key: "id",
					type: "array",
				},
				map: function(groupedItem) {
					console.log("grouped");
					console.log(groupedItem);
					return groupedItem;
				},
			});
		},
	},
	methods: {
		...mapActions("unidad/ocde", { getOcde: "getAll" }),
		validateUrl(e) {
			console.log("e.value", e);
			var r = /^(http|https):\/\/[^ "]+$/;
			return r.test(e.value);
		},
		onContentReady() {
			window.jQuery(".commands a").click(function() {
				console.log("Come on lets show the dropdown!!");
			});
			// console.log("onContentReady!");
		},
		validate() {
			var result = this.$refs.validationGroup.validate();
			this.isValid = result.isValid;
			return result.isValid;
		},
		save(e) {
			// console.clear();
			console.log(this.$sep);
			var result = this.$refs.instGroup.instance.validate();
			console.log("result", result);
			// this.isValid = result.isValid;
			// return result.isValid;
			// e.preventDefault();
			// console.log("e", e);
			// let result = e.validationGroup.validate();
			// console.log("result.isValid INST", result.isValid);
			// console.log(e.validationGroup.validators);
			if (result.isValid) {
				console.log("VALID!");
				if (this.$isFunction(this.saveFn)) this.saveFn(e.validationGroup);
			}
		},
		cancel(e) {
			console.log(this.$sep);
			// e.preventDefault();
			console.log("e", e);
			this.loadingVisible = true;
			if (this.$isFunction(this.cancelFn)) this.cancelFn(e.validationGroup);
		},
		areaChange(e) {
			console.log(this.$sep);
			console.log("e", e);
			var items = this.oDetallados.filter((o) => o.oecd_knowledge_subarea_id === e.value);
			if (items.length > 0) {
				items = this.$objectSort(items, "name");
				this.ocdeDetallado = items;
				this.ocdeDisabled = false;
				console.log("ocdeDetallado", this.ocdeDetallado);
			} else {
				this.ocdeDisabled = true;
			}
		},
	},
	mounted() {
		// this.all();
		this.getOcde();
		console.log(this.$sep);
		console.log("Institucional mounted!");
		console.log(this.group);
	},
};
</script>
