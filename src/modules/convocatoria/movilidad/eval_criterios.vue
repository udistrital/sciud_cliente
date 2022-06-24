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
					<DxNumberBox placeholder="Puntuacion" class="form-control" :value.sync="syncObject.valueCriterios[i]">
						<DxValidator>
							<DxRequiredRule />
						</DxValidator>
					</DxNumberBox>
				</div>
			</div>
		</div>
	</div>

	<!-- <div class="card-body" v-if="is_dev && debug">
        <div class="card">
            <div class="card-body">
                <span class="font-weight-semibold">criterios:</span> {{ criterios }}
                <hr class="sep mb-0" /> 
            </div>
        </div>
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
					geo_city_id: null,
					geo_state_id: null,
					geo_country_id: null,
				};
			},
		},
	},
	data: () => ({
		countries: [],
		states: [],
		cities: [],
        criterios:{}
	}),
	methods: {
        ...mapActions("unidad/producto/universalSentUpAct", {  getAll:"getAll"}),

	},
	computed: {
		
	},
	mounted() {
		root = this;
		root.getAll({
			// url: "/research_units/117/group_member/10286",
			//url: "/calls/" + parseInt(data.id) + "/call_documents",
			url: "calls/"+root.inforBase.call_id+"/call_eval_criteria",
			cb: function (results) {
				//let listDocuments = results;
				root.criterios=results;
				// console.warn("movilidad docs list ", listDocuments);
				// root.listDoc2subtipos(listDocuments);
				// root.loaderHide();
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