<!-- calls/2/call_eval_criteria -->
<template>
<div>
	<!-- <DxValidationGroup ref="basicGroup2"> -->
	<div class="card-body">
		
		<div class="row" v-for="(criterio, index) of criterios" :key="index">
			
			<div class="col-md-6 p-2">
				<div class="form-group">
					<h3 class="texto">{{criterio.id+". "+criterio.eval_criterion_name}}</h3>
				</div>
			</div>
			<div class="col-md-2 p-2">
				<div class="form-group" v-if="criterio.cec_percentage!=null">
					<h3 class="texto">Max: {{criterio.cec_percentage}}</h3>
				</div>
			</div>
			<div class="col-md-2">
				<div class="form-group">
					<DxNumberBox 
						placeholder="Puntuacion" 
						class="form-control" 
						:value.sync="syncObject.valueCriterios[index]"
						@value-changed="operar"
						:max="parseFloat(criterio.cec_percentage!=null? criterio.cec_percentage: 100)"
						:min="0"
					>
						<DxValidator>
							<DxRequiredRule />
						</DxValidator>
					</DxNumberBox>
				</div>
			</div>

			<div class="col-md-2">
				<DxButton @click="edit(criterio)" class="nb" v-if="citerioEditMode">
					<template #default>
						<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
							Cambiar Valor<b><i class="icon-pencil"></i></b>
						</span>
					</template>
				</DxButton>
			</div>

		</div>
	</div>

	<div class="card-body">
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

			<div class="col-md-4">
				<DxButton @click="updateEstate()" class="nb" v-if="citerioEditMode">
					<template #default>
						<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
							Actualizar estado<b><i class="icon-pencil"></i></b>
						</span>
					</template>
				</DxButton>
			</div>


			
		</div>
	</div>

	<div class="card-footer">
		<div class="row">

			<div class="col text-right">
				<DxButton @click="save" class="nb">
					<template #default>
						<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple" v-if="!citerioEditMode">
							GUARDAR <b><i class="icon-database-add"></i></b>
						</span>
					</template>
				</DxButton>
			</div>
		</div>
	</div>

	<div class="row" v-if="is_dev && debug">
			<div class="col-12">
				<div class="card">
					<div class="card-body"><strong>syncObject:</strong> {{ JSON.stringify(syncObject, null, 3) }}</div>
				</div>
                <div class="card">
					<pre><div class="card-body"><strong>syncObject.valueCriterios:</strong> {{ JSON.stringify(syncObject.valueCriterios, null, 3) }}</div></pre>
				</div>
			</div>
		</div>
	<!-- </DxValidationGroup> -->
</div>
</template>

<script>
/* eslint-disable no-unused-vars */
let root, $ = window.jQuery;

let hideErrors = () => {
    $("#panel-basicos .dx-fileuploader-files-container").hide();
    $("#panel-basicos .dx-invalid-message").hide();
    $("#panel-basicos .dx-invalid").removeClass("dx-invalid");
};

import { mapState, mapActions, mapGetters } from "vuex";
import { DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator } from "devextreme-vue/validator";
import { DxDateBox, DxFileUploader, DxSelectBox, DxSwitch, DxButton, DxTagBox, DxTextBox, DxNumberBox, DxValidationGroup } from "devextreme-vue";
import M from "minimatch";
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

		reference: {
			type: Object,
			default: () => {},
		},
        
	},
	
	data: () => ({
		listEstadosEval:[],
		criterios:null,
		citerioEditMode: false,
		syncObject:{
			document_type_id:null,
			valueCriterios:[],
			estadoEval:0,
			sunTotal:0,
		}
	}),
	

	methods: {
        ...mapActions("unidad/producto/universalSentUpAct", {  getAll:"getAll", getSinData:"getSinData",  objSave: "save", objUpdate: "update", elementoActive: "active"}),
		operar(e){
			// root.syncObject.event=e;
			console.warn(e);
			let arrayValue = root.syncObject.valueCriterios;
			let sum = 0 ;
			for (let i = 0; i < arrayValue.length; i++) {
				sum += arrayValue[i];
			}
			root.syncObject.sunTotal=sum;
		},

		save(){
			let listValuesCriterias=[];
			let error=false;
			console.clear();
			console.warn("save => root.criterios: ", root.criterios)
			for(let i=0; i<root.criterios.length; i++){
				
				if(error===false){
					error = root.syncObject.valueCriterios[i]!=null? false: true;
					let id_criterio=root.criterios[i].id;
					let objValoracion={
						call_eval_criterion_id: id_criterio,
						value: root.syncObject.valueCriterios[i],
						active: true
					}
					listValuesCriterias.push(objValoracion);
				}
			}
			let obj={criteria:listValuesCriterias, created_by: root.user_id};
			console.warn("save => obj: ", obj);


			if (!error) {
				
				var result = root.reference.$refs.basicGroup.instance.validate();

				if (result.isValid) {
					this.$confirm("¿Esta seguro que desea terminar de evaluar al evento llamado: "+root.inforBase.event_name+" ?", function(si_no) {
						console.log("result", si_no);
						if (si_no) {
							let dto = {
								newFormat: true,
								rute2: "mobility_calls/"+root.inforBase.id+"/mobility_call_criteria",
								stringEP: "mobility_calls",
								//objectSend: { regulation : obj },
								objectSend: JSON.parse(`{ "mobility_call_criterion": ` + JSON.stringify(obj) + "}"),
								cb: function (item) {
									console.log("item", item);
									// root.grid.refresh();
									// root.loaderHide();
									root.pathEstate();
									root.reference.cancel();
									root.$info("La evaluación de criterios para el evento llamado: <b>"+root.inforBase.event_name+"</b>, se guardo con éxito.");
								},
							};
							root.objSave(dto);
						}
					});
				}
				
			}




			
		},


		edit(Objeto){
			console.warn("editar objeto",Objeto);
			let value = root.syncObject.valueCriterios[Objeto.arrayListId];
			let call_eval_criterion_id= Objeto.call_eval_criterion_id;
			console.warn("root.syncObject.valueCriterios["+Objeto.arrayListId+"]: ",value);
			root.updateCriterios(Objeto.id, {value: value, call_eval_criterion_id: call_eval_criterion_id});
		},

		updateCriterios(id_criterio, objeto){
			var result = root.reference.$refs.basicGroup.instance.validate();
			if (result.isValid) {
				this.$confirm("¿Esta seguro que desea cambiar el valor de este campo?", function(si_no) {
					console.log("result", si_no);
					if (si_no) {
						// console.warn("obj: ",obj);
						let obj = {
							call_eval_criterion_id: objeto.call_eval_criterion_id,
							value: objeto.value,
							active: true,
							mobility_call_id: root.inforBase.id,//root.inforBase.call_id,
							updated_by: root.user_id
						};
						console.warn("obj: ",obj);
						let dto = {
							newFormat: true,
							rute2:"role",
							// unidadId: root.baseObj.id,
							stringEP: "mobility_call_criteria",
							mod: id_criterio,//id_criterio,
							//objectSend: { regulation : obj },
							objectSend: JSON.parse(`{ "mobility_call_criterion": ` + JSON.stringify(obj) + "}"),
							cb: function(item) {
								console.log("item", item);
								root.$info("Valor actualizado");
								// root.updateEstate();
								root.pathEstate();
								root.$confirm("¿Desea regresar a la lista de evaluación?", function(si_no) {
									console.log("result", si_no);
									if (si_no) {
										root.reference.cancel();

									}
								});

							},
						};

						root.objUpdate(dto);
						console.warn("dto", dto)
					}

				});	// root.cancel();
			}
		},

		pathEstate(){
			// root.loaderShow(`${am}`, root.panelGrid);
			let dataPatch = JSON.stringify({ active: true, updated_by: root.user_id, state_id:root.syncObject.estadoEval, total:root.syncObject.sunTotal });
			var dto = {
				newFormat: true,
				url: `mobility_calls/${root.inforBase.id}`,
				data: JSON.parse(`{ "mobility_call" :` + dataPatch + "}"),
				cb: function(result) {
					console.log("Result", result);
					// root.grid.refresh();
					// root.loaderHide();
				},
			};
			console.log("dto", dto);
			root.elementoActive(dto);
		},
		updateEstate() {
			// console.clear();
			this.$confirm("Esta seguro que desea cambiar de estado", function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.pathEstate();
					root.$confirm("¿Desea regresar a la lista de evaluación?", function(si_no) {
						console.log("result", si_no);
						if (si_no) {
							root.reference.cancel();
							// root.loaderHide();
						}
					});
					// root.loaderHide();
				}
			});
		},

		

		cancel() {
			root.mode = null;
			console.log("CANCEL!");
			root.panelData.fadeOut(function() {

				root.panelCmd.fadeIn();
				root.panelGrid.fadeIn();
			});
			root.grid.refresh();

		},

		loadEvaluationEdit(){
			root.getAll({
				// url: "/research_units/117/group_member/10286",
				url: "mobility_calls/"+root.inforBase.id+"/mobility_call_criteria",
				cb: function (results) {
					let list = results;
					let objeto=list[0];	
					if(objeto.criteria!=null){
						root.criterios=objeto.criteria;
						let arrayValues=[];
						for(let i=0; i<objeto.criteria.length; i++){ //syncObject.valueCriterios
							// arrayValues[i]= objeto.criteria[i].arrayListId=i;
							arrayValues[i]=objeto.criteria[i].value;
							root.criterios[i].arrayListId=i;
							root.citerioEditMode=true;
							console.warn("syncObject.valueCriterios["+ i +"] = "+objeto.criteria[i].value)
						}
						root.syncObject.valueCriterios=arrayValues;
					}
						console.warn("mobility_call_criteria Edit: ", objeto)
				},
			});
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

	updated: () => {
        hideErrors();
    },

	async mounted() {
		console.warn("root.inforBase: ", root.inforBase);
		root.syncObject.estadoEval=root.inforBase.state_id;
		root.syncObject.sunTotal=root.inforBase.total
		

		await root.getAll({
			url: "calls/"+root.inforBase.call_id+"/call_eval_criteria",
			cb: function (results) {
				root.criterios=results;
				let i=0;
				for(i=0; i<root.criterios.length; i++){
					root.syncObject.valueCriterios[i]=0;
				}
				root.loadEvaluationEdit();
				
				console.warn("root.syncObject.valueCriterios: ", root.syncObject.valueCriterios)
				console.warn("mobility_call_criteria: ", root.criterios)
			},
		});

		
		this.$forceUpdate();
	},
};
</script>
<style scoped>
.texto{
    color: darkslategrey;
}

</style>