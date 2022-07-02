<!-- calls/2/call_eval_criteria -->
<template>
<div>
	
	<div class="card-body">
		
		<div class="row" v-for="(criterio, index) of criterios" :key="index">
			
			<div class="col-md-6 p-2">
				<div class="form-group">
					<h3 class="texto">{{criterio.id+". "+criterio.eval_criterion_name}}</h3>
				</div>
			</div>
			<div class="col-md-2 p-2">
				<div class="form-group">
					<h3 class="texto">Max: {{criterio.cec_percentage}}</h3>
				</div>
			</div>
			<div class="col-md-4">
				<div class="form-group">
					<DxNumberBox 
						placeholder="Puntuacion" 
						class="form-control" 
						:value.sync="syncObject.valueCriterios[index]"
						@value-changed="operar"
						:max="parseFloat(criterio.cec_percentage)"
						:min="0"
					>
						<DxValidator>
							<DxRequiredRule />
						</DxValidator>
					</DxNumberBox>
				</div>
			</div>
		</div>
	</div>

	<div class="row" >
		<div class="col-4">
			<div class="form-group mb-2">
				<label>Estado evaluacion:</label>
				<DxSelectBox
				:show-clear-button="true"
				:grouped="false"
				:data-source="listEstadosEval"
				:value.sync="syncObject.estadoEval"
				:search-enabled="false"
				placeholder="Seleccione..."
				class="form-control"
				display-expr="st_name"
				value-expr="id"
				>
					<DxValidator>
						<DxRequiredRule />
					</DxValidator>
				</DxSelectBox>
			</div>
		</div>

		<div class="col-md-4">
			<div class="form-group">
				<label>Porcentaje de evaluación:</label>
				<DxNumberBox 
					:read-only="true"
					placeholder="Porcentaje" 
					class="form-control" 
					:value.sync="syncObject.sunTotal"
					:max="100"
					:min="0"
				>
					<DxValidator>
						<DxRequiredRule />
					</DxValidator>
				</DxNumberBox>
			</div>
		</div>

		<div class="col-md-4 text-left">
			<DxButton @click="save" class="nb">
				<template #default>
					<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
						GUARDAR <b><i class="icon-database-add"></i></b>
					</span>
				</template>
			</DxButton>
		</div>
	</div>
	<!-- <div class="card-body" v-if="is_dev && debug">
        <div class="card">
            <div class="card-body">
                <span class="font-weight-semibold">criterios:</span> {{ criterios }}
                <hr class="sep mb-0" /> 
            </div>
        </div>@value-changed="documentTypeSelected"
    </div> -->
</div>
</template>

<script>
/* eslint-disable no-unused-vars */
let root,
	$ = window.jQuery;
import { mapState, mapActions, mapGetters } from "vuex";
import { DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator } from "devextreme-vue/validator";
import { DxDateBox, DxFileUploader, DxSelectBox, DxSwitch, DxButton, DxTagBox, DxTextBox, DxNumberBox, DxValidationGroup } from "devextreme-vue";
export default {
	components: {
		DxNumberBox,
		DxRequiredRule,
		DxValidator,
		DxSelectBox,
		DxButton
	},
	props: {
		inforBase:{
            type: Object,
			default: () =>{}
        },
        syncObject: {
			type: Object,
			default: () => {
				return {
					document_type_id:null,
					valueCriterios:[],
					estadoEval:0,
					sunTotal:0,
					// geo_city_id: null,
					// geo_state_id: null,
					// geo_country_id: null,
				};
			},
		},
	},
	data: () => ({
		listEstadosEval:[],
		criterios:null,
	}),
	methods: {
        ...mapActions("unidad/producto/universalSentUpAct", {  getAll:"getAll"}),
		operar(e){
			// root.syncObject.event=e;
			console.warn(e);
			let arrayValue = root.syncObject.valueCriterios;
			let sum = 0 ;
			for (let i = 0; i < arrayValue.length; i++) {
				sum += arrayValue[i];
			}
			root.syncObject.sunTotal=sum;
			console.warn("recuire data",sum);
		}
	},
	computed: {
		
		...mapGetters("core/tipo", ["subtypesByType"]),
	},
	created(){
		root = this;
		root.listEstadosEval = root.subtypesByType("estado_criterios_evaluacion");
		console.warn("root.listEstadosEval", root.listEstadosEval);
	},
	mounted() {
		
		
		root.getAll({
			url: "calls/"+root.inforBase.call_id+"/call_eval_criteria",
			cb: function (results) {
				root.criterios=results;
			},
		});
	},
};
</script>
<style scoped>
.texto{
    color: darkslategrey;
}

</style>