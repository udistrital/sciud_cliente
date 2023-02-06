<template>
	<div class="row">
		<div class="col-md-4 col-xs-12">
			<div :class="formName">
				<label>País:</label>
				<DxSelectBox
					:show-clear-button="true"
					:value.sync="syncObject.geo_country_id"
					:search-enabled="true"
					placeholder="Seleccione..."
					:class="formNameControl"
					:data-source="countries"
					display-expr="name"
					value-expr="id"
					@value-changed="gStates"
					:read-only="!permisoGuardar"
				>
					<DxValidator>
						<DxRequiredRule />
					</DxValidator>
				</DxSelectBox>
			</div>
		</div>
		<div class="col-md-4 col-xs-12">
			<div :class="formName">
				<label>Estados:</label>
				<!-- <DxSelectBox
					:show-clear-button="true"
					:value.sync="syncObject.geo_state_id"
					:disabled="states <= 0"
					:search-enabled="true"
					placeholder="Seleccione..."
					:class="formNameControl"
					:data-source="states"
					display-expr="name"
					value-expr="id"
					@value-changed="gCities"
				>
					<DxValidator>
						<DxRequiredRule />
					</DxValidator>
				</DxSelectBox> -->
				<DxTagBox :show-clear-button="true" :disabled="states <= 0" :search-enabled="true"
					placeholder="Seleccione..." :data-source="states" :value.sync="syncObject.geo_state_ids"
					display-expr="name" value-expr="id" :read-only="!permisoGuardar" :class="formNameControl"
					:show-selection-controls="true" @value-changed="gCities" >


					<DxValidator>
						<DxRequiredRule />
					</DxValidator>
				</DxTagBox>
			</div>
		</div>
		<div class="col-md-4 col-xs-12">
			<div :class="formName">
				<label>Municipios:</label>
				<DxTagBox :show-clear-button="true" :disabled="cities <= 0" :search-enabled="true"
					placeholder="Seleccione..." :data-source="cities" :value.sync="syncObject.geo_city_ids"
					display-expr="name" value-expr="id" :read-only="!permisoGuardar" :class="formNameControl"
					:show-selection-controls="true" >


					<DxValidator>
						<DxRequiredRule />
					</DxValidator>
				</DxTagBox>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
let root,
	$ = window.jQuery;
import { mapState, mapActions, mapGetters } from "vuex";
import { DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator } from "devextreme-vue/validator";
import { DxDateBox, DxFileUploader, DxSelectBox, DxSwitch, DxButton, DxTagBox, DxTextBox, DxTextArea, DxValidationGroup } from "devextreme-vue";
export default {
	components: {
		DxSelectBox,
		DxRequiredRule,
		DxValidator,
		DxTagBox
	},
	props: {
		formName: {
			type: String,
			default: "form-group",
		},
		formNameControl: {
			type: String,
			default: "form-control",
		},
		lockElement: {
			type: String,
			default: ".card-body:first",
		},
		permisoGuardar:{
			type: Boolean,
			default: () => true,
		},
		syncObject: {
			type: Object,
			default: () => {
				return {
					geo_city_ids: null,
					geo_state_ids: null,
					// geo_state_id: null,
					geo_country_id: null,
				};
			},
		},
	},
	data: () => ({
		countries: [],
		states: [],
		cities: [],
	}),
	methods: {
		...mapActions("core/geo", ["getCountries", "getStates", "getCities"]),
		gStates(e) {
			console.warn(" gStates e.value", e.value)
			root.states = [];
			root.cities = [];
			root.loaderShow("Cargando Estados", root.lockElement);
			if (e.value === null) return null;
			setTimeout(function() {
				root.getStates({
					country_id: e.value,
					cb: function(results) {
						root.states = results;
						root.loaderHide();
					},
				});
			}, 1000);
		},

		gCities(e) {
			root.cities = [];
			console.warn(" cities e.value", e.value)
			let idsx=e.value, valorFinal=idsx.length-1;
			root.loaderShow("Cargando Ciudades", root.lockElement);
			if (idsx === null)	return null;
			if(idsx.length>0){
				setTimeout(function() {
					idsx.forEach(function(elemento,index){
						console.warn("a["+index+"]= "+elemento);
						root.getCities({
							state_id: elemento,
							cb: function(results) {
								root.cities = root.cities.concat(results);
								if(valorFinal==index) root.loaderHide();
							},
						});
					});
				}, 1500);
			}else{
				root.loaderHide();
			}
			
			//
		},


		/*gCities(e) {
			root.cities = [];
			console.warn(" cities e.value", e.value)
			
			// root.loaderShow("Cargando Ciudades", root.lockElement);
			if (e.value === null) return null;
			setTimeout(function() {
				root.getCities({
					state_id: e.value,
					cb: function(results) {
						root.cities = results;
						root.loaderHide();
					},
				});
			}, 1000);
		},*/
	},
	computed: {
		...mapState("countries", ["members"]),
	},
	mounted() {
		root = this;
		console.warn("PAISES!", root.syncObject);
		this.getCountries(function(results) {
			root.countries = results;
			console.log("PAISES!", root.countries);
		});
	},
};
</script>
