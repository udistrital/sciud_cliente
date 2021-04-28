<template>
	<div class="row">
		<div class="col-md-4 col-xs-12">
			<div class="form-group">
				<label>País:</label>
				<DxSelectBox
					:show-clear-button="true"
					:value.sync="syncObject.geo_country_id"
					:search-enabled="true"
					placeholder="Seleccione..."
					class="form-control"
					:data-source="countries"
					display-expr="name"
					value-expr="id"
					@value-changed="gStates"
				>
					<DxValidator>
						<DxRequiredRule />
					</DxValidator>
				</DxSelectBox>
			</div>
		</div>
		<div class="col-md-4 col-xs-12">
			<div class="form-group">
				<label>Estado:</label>
				<DxSelectBox
					:show-clear-button="true"
					:value.sync="syncObject.geo_state_id"
					:disabled="states <= 0"
					:search-enabled="true"
					placeholder="Seleccione..."
					class="form-control"
					:data-source="states"
					display-expr="name"
					value-expr="id"
					@value-changed="gCities"
				>
					<DxValidator>
						<DxRequiredRule />
					</DxValidator>
				</DxSelectBox>
			</div>
		</div>
		<div class="col-md-4 col-xs-12">
			<div class="form-group">
				<label>Ciudad:</label>
				<DxSelectBox
					:show-clear-button="true"
					:disabled="cities <= 0"
					:search-enabled="true"
					placeholder="Seleccione..."
					class="form-control"
					:data-source="cities"
					:value.sync="syncObject.geo_city_id"
					display-expr="name"
					value-expr="id"
				>
					<DxValidator>
						<DxRequiredRule />
					</DxValidator>
				</DxSelectBox>
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
	},
	props: {
		lockElement: {
			type: String,
			default: ".card-body:first",
		},
		syncObject: {
			type: Object,
			default: () => {
				return {
					geo_city_id: 0,
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
			root.loaderShow("Cargando Ciudades", root.lockElement);
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
		},
	},
	computed: {
		...mapState("countries", ["members"]),
	},
	mounted() {
		root = this;
		this.getCountries(function(results) {
			root.countries = results;
			console.log("PAISES!", root.countries);
		});
	},
};
</script>
