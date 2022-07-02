<template>
	<div class="mh" >
		

        <div class="page-header header-elements-md-inline" id="panel-unidades-head">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-pencil6 mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">Aplicación Movilidad&nbsp;</span>
					<span id="msg">{{baseItem.call_name}}</span>
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>
			

			<div class="header-elements" >
				<router-link tag="a" to="/convocatoria/aplicaciones" class="btn btn-main  mr-1  btn-labeled btn-labeled-left legitRipple" title="Listado de Aplicaciones...">
					<b><i class="icon-list2"></i></b> Listado de Aplicaciones
				</router-link>

				<!-- <router-link tag="a" to="/convocatoria/movilidad" class="btn btn-main mr-1 btn-labeled btn-labeled-left legitRipple" title="Nueva convocatoria...">
					<b><i class="icon-database-add"></i></b> Movilidad
				</router-link> -->
			</div>
		</div>


		<div class="row">
			<div class="col">
				<div class="card">
					<div class="card-body group-detail" id="item-panel">
						



    <div class="col-md-12 mt-1">
        <div class="alert alert-warning" role="alert"
            v-if="!validDateConv"> <i class="icon-info mr-1 "></i>
            Verifique las fechas de inicio y cierre de la convocatora para proceder a la postulación...
        </div>
    </div>


	<div class="row" v-if="validDateConv">
                            
        <DxValidationGroup ref="basicGroup">
			<div class="row data ">
				<div class="col">
					<div class="card">
						
						<div class="card-body mb-0 pb-0 pt-2">
							<h2><span class="item-title mr-1">Por favor verifique bien la información diligenciada, esta
									aplicación no se podrá editar más adelante.</span></h2>
							<div class="row">
								<!-- formulatio -->

                                <div class="col-md-4">
									<div class="form-group">
										<label>Estructuras de Investigación:</label>
										<DxSelectBox
											:show-clear-button="true"
											:read-only="false"
											:data-source="listGrupoInvestigador"
											:value.sync="baseObj.research_group_id"
											class="form-control"
											display-expr="research_group_name"
											value-expr="research_group_id"
											placeholder="Seleccione..."
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxSelectBox>
									</div>
								</div>

								<div class="col-md-3">
									<div class="form-group">
										<label>Nombre del evento al que se asiste: </label>
										<DxTextBox placeholder="Nombre del evento al que se asiste" class="form-control"
											:value.sync="baseObj.event_name">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>



								<div class="col-md-3">
									<div class="form-group">
										<label>Nombre de la ponencia: </label>
										<DxTextBox placeholder="Nombre de la ponencia" class="form-control"
											:value.sync="baseObj.paper_name">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-2">
									<div class="form-group">
										<label>N° de ediciones del Evento: </label>
										<DxNumberBox placeholder="N° de ediciones del Evento" class="form-control"
											:value.sync="baseObj.event_edition_number">
											<DxValidator>
											</DxValidator>
										</DxNumberBox>
									</div>
								</div>

								<div class="col-md-12">
									<label>Lugar: </label>
									<Geo :lockElement="loaderElement" :syncObject="baseObj" />
								</div>
								<div class="col-md-3">
									<div class="form-group">
										<label>¿La UD participa como organizador o miembro de mesas de evaluación?:
										</label>
										<DxSwitch :value.sync="baseObj.is_organizer" switched-on-text="SI"
											switched-off-text="NO" />
									</div>
								</div>

								<div class="col-md-3">
									<div class="form-group">
										<label>Fecha del evento: </label>
										<DxDateBox class="form-control" name="event_date"
											:value.sync="baseObj.event_date" id="event_date" placeholder="DD/MM/YYYY"
											display-format="dd/MM/yyyy" :min="minDate" :max="actualDate" type="date">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxDateBox>
									</div>
								</div>

								<div class="col-md-6">
									<div class="form-group">
										<label>Pagina del evento: </label>
										<DxTextBox placeholder="Pagina del evento" class="form-control"
											:value.sync="baseObj.event_page">
											<DxValidator>
												<DxRequiredRule />
												<DxPatternRule
													message="Por favor Ingrese la Pagina WEB con los datos completos Ej: http://miweb.com/articulo"
													:pattern="urlPattern" />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>


								<div class="col-md-12" v-if="tiposDocumento.length > 0">
									<div class="card-body" v-html="requisitoArchivo()"></div>
								</div> 
								<!-- fin formulario -->
							</div>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col">
									<a
                                        href="#"
                                        title="Volver a Convocatorias..."
                                        @click.prevent="go(id, '/convocatoria', `Cargando Convocatorias`)"
                                        class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
                                        <b><i class="icon-arrow-left"></i></b> Volver</a
                                    >
								</div>
								<div class="col text-right">
									<DxButton @click="save" v-if="validDateConv" class="nb">
										<!-- v-if="editMode">-->
										<template #default>
											<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
												{{ mode == "edit" ? "Crear Aplicación" : "Aplicando.."}} <b><i
														class="icon-database-add"></i></b>
											</span>
										</template>
									</DxButton>
								</div>
							</div>
						</div> 
					</div>
				</div>
			</div>
		</DxValidationGroup>



						</div>
						<!-- <div class="row mt-3">
							<div class="col">
								<a
									href="#"
									title="Volver a Convocatorias..."
									@click.prevent="go(item.id, '/convocatoria', `Cargando Convocatorias`)"
									class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple"
									><b><i class="icon-arrow-left"></i></b> Volver</a
								>
							</div>
							<div class="col text-right" v-if="editModeConv">
								<a href="#" @click.prevent="save()" title="Guardar Convocatoria..." class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple"
									>Guardar <b><i class="icon-floppy-disk"></i></b
								></a>
							</div>
						</div> -->
					</div>
				</div>
			</div>
		</div>
		<div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<span class="font-weight-semibold">editModeConv:</span> {{ editModeConv }}
						<hr class="sep mb-0" />
						<span class="font-weight-semibold">baseItem:</span> {{ JSON.stringify(baseItem, null, 3) }}
                        <hr class="sep mb-0" />
                       <span class="font-weight-semibold">baseObj:</span> {{ JSON.stringify(baseObj, null, 3) }}
						<hr class="sep mb-0" />
						<pre><span class="font-weight-semibold">tipoEstados:</span> {{ JSON.stringify(estadoconv, null, 3) }}</pre>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
// https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns
let $ = window.jQuery,
	root = null;
import { DxButton, DxDateBox, DxFileUploader, DxSelectBox, DxSwitch, DxTagBox, DxTextArea, DxTextBox, DxNumberBox, DxValidationGroup } from "devextreme-vue";
import DxValidator, { DxRequiredRule, DxEmailRule, DxPatternRule } from "devextreme-vue/validator";
import DataSource from "devextreme/data/data_source";
import { mapActions, mapGetters, mapState } from "vuex";
let hideErrors = () => {
	$("#panel-basicos .dx-fileuploader-files-container").hide();
	$("#panel-basicos .dx-invalid-message").hide();
	$("#panel-basicos .dx-invalid").removeClass("dx-invalid");
};

export default {
	name: "aplicacionMobilidad",
	created: async function() {
		root = this;
        root.dataUserLogin = this.user;
        root.userResearcherUnits();

        let id = root.$route.params.itemId;
        root.viewCall(id);
        
		root.getDocumentos(id);

		
       
        this.loaderHide();

	},
    
	mounted() {
		let id_estado = root.estadoconv.find( estado => estado.st_name == 'Sin Enviar' );
		root.baseObj.state_id=id_estado.id;
		// console.clear();
        // let aplicar=root.validDateConv();
		// if(root.baseItem.call_type_id != 1056){ this.go(0, '/convocatoria', `Cargando Convocatorias`); }
        // if(!aplicar) {this.go(0, '/convocatoria', `Cargando Convocatorias`);}
	},
	beforeUpdate: () => {},
	updated: () => {
		console.log(root.$sep);
		hideErrors();
	},
	components: {
		DxDateBox,
		DxFileUploader,
		DxValidator,
		DxButton,
		DxRequiredRule,
		DxSelectBox,
		DxSwitch,
		DxTagBox,
		DxTextArea,
		DxPatternRule,
		DxEmailRule,
		DxTextBox,
		DxValidationGroup,
		DxNumberBox,
		Geo: () => import("@/components/element/geo"),
	},
	data: () => ({
        listGrupoInvestigador:[],
        dataUserLogin:[],
		mode: "edit",
		item: null,
		isValid: false,
		placeholder: "Busque y seleccione...",
        tiposDocumento: [],


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
		
		
        baseItem: {
			id: null,
			call_name: null,
			call_beneficiary_id: null,
			call_directed_towards: null,
			call_duration: null,
			call_global_budget: null,
			call_state_id: null, // Borrador
			call_type_id: null,
			call_objective: null,
			call_start_date: null,
			call_end_date: null,
			active: true,
			created_by: null,
			created_at: null,
			updated_by: null,
			updated_at: null,
		},


        baseObj: {
			geo_city_id: null,
			geo_country_id: null,
			geo_state_id: null,
			event_name: null,
			event_edition_number: null,
			event_date: null,
			paper_name: null,
			is_organizer: null,
			event_page: null,
			research_group_id: null,
			researcher_id: null,
			state_id:null,
			state_id2:null,
			active: true,
		},
	}),
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		tipos() {
			return root.subtypesByType("convocatoria_tipo", "id");
		},
		estadoconv() {
			return root.subtypesByType("estado_criterios_evaluacion", "id");
		},
		

        validDateConv(){

			
            let data=root.baseItem;
            console.warn("fecha final: " + data.call_end_date + ",  fecha hoy: " + new Date() + " => ", root.baseItem);
			let fecha_final = root.sistemaDate(data.call_end_date, "mayor");
			console.warn("fecha inicial: " + data.call_start_date + ",  fecha hoy: " + new Date() + " => ");
			let fecha_inicial = root.sistemaDate(data.call_start_date, "menor");
			if(root.baseItem.call_type_name != "Movilidad"){ this.go(0, '/convocatoria', `Cargando Convocatorias`); }
			return fecha_final === fecha_inicial

        },
	},
	methods: {
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active", getAll: "getAll", get: "get",  getSinData: "getSinData"  }),
        
        

        async viewCall(id){
            await root.get({
				url: 'calls/' + id,
				cb: function (results) {
					root.baseItem = results;
                    
				},
			});
        },

        userResearcherUnits(){
            root.getSinData({
                // url: "/research_units/117/group_member/10286",
                url: "/researcher_research_units/?identification_number=" + parseInt(root.dataUserLogin.local.identification_number),
                cb: function (results) {
                    let objeto = results;
                    root.listGrupoInvestigador = objeto;
                    if(root.listGrupoInvestigador.length>=1)  root.baseObj.researcher_id=root.listGrupoInvestigador[0].id;
                    console.warn("datos internos integrante ", objeto)
                },
            });
        },

        getDocumentos(id){
            root.getAll({
				// url: "/research_units/117/group_member/10286",
				url: "/calls/" + id + "/call_documents",
				cb: function (results) {
					let listDocuments = results;
					console.warn("movilidad docs list ", listDocuments);
					root.listDoc2subtipos(listDocuments);
					// root.loaderHide();
				},
			});
        },

		requisitoArchivo() {
			let tipos = root.tiposDocumento;
			let i = 0,
				print = "";
			if (Array.isArray(tipos) && tipos.length != 0) {
				print = "<h3><i class='icon-info mr-1 color-main-600'></i><b><i>Lista de documentos para aplicar:</i></b></h3> ";
				print = print + "<ul>";
				for (i = 0; i < tipos.length; i++) {
					let text = tipos[i].st_description == null ? "" : "<br>" + tipos[i].st_description;
					let importante = tipos[i].cd_required? '<em>(Requerido).</em>': ''
					if (tipos[i].active) print = print + "<li>" + "<b>" + tipos[i].st_name + " "+ importante +" </b>" + text + "</li>";
				}
				print = print + "</ul>";
			}
			return print;
		},

         sistemaDate(e_date, operador) {
			let resultado = null 
			let date = e_date.split("-");
			// let fecha = new Date(date[0], date[1], date[2]);
			let fecha = new Date(date[1]+"/"+date[0]+"/"+date[2]);
			let hoy = Date.now();
			// hoy.setHours(0,0,0,0);
			// fecha.setHours(23,59,59,0);

			if (operador == "mayor") { 
				resultado = fecha.valueOf() >= hoy.valueOf(); 
			}
			else if (operador == "menor") { 
				resultado = fecha.valueOf() <= hoy.valueOf(); 
				
			}
			else {
				resultado = null
				console.error("error en en la funcion sistemaDate(fecha, operador) debe colorcar de operador mayor o menor");
			}

			console.warn("comparacion: "+new Date(date[1]+"/"+date[0]+"/"+date[2])+" "+operador+" "+new Date(), resultado)
			return resultado;
		},

        listDoc2subtipos(parametro) {
			if (parametro.length >= 1) {
				parametro.map(function (lista) {
					lista.id_ant = lista.id
					lista.st_name = lista.document_name;
					lista.id = lista.document_id;
					return lista;
				});
				root.tiposDocumento = parametro;
			}

		},



        save() {
			console.log(this.$sep);
			var result = root.$refs.basicGroup.instance.validate();
			console.log("result", result);
			root.mode = "add"
            
            if (result.isValid) {
				console.log("VALID!");
				// root.scrollTop();
				// root.panelCmds.fadeOut();
				// root.loaderElement = ;
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " Elemento";
				root.loaderShow(msg, root.panelData);
				root.baseObj.created_by = root.user_id;
				// if (root.mode == "edit") root.baseObj.updated_by = root.user_id;

				// root.baseObj.product_type_id = root.codEP;
				// root.baseObj.research_group_id = root.group.id;
				let obj = root.baseObj;
                console.log("root.mode", root.mode);
				let dto = {
					newFormat: true,
					rute2: "calls/" + root.$route.params.itemId + "/mobility_calls",

					stringEP: "mobility_calls",

					mod: root.$route.params.itemId,
					objectSend: JSON.parse(`{ "mobility_call": ` + JSON.stringify(obj) + "}"),
					cb: function (item) {
						root.$info("Estimado investigador, Su aplicación fue creada con éxito. <br/> Guarde en la plataforma los documentos requeridos y luego en la columna acciones presione el botón enviar.")
						console.log("item", item);
                        root.go(0, '/convocatoria/aplicaciones', `Cargando Convocatorias`)
                        
						// root.grid.refresh();
						// root.loaderHide();
						// root.cancel();
					},
				};
				
				// if (root.mode == "edit") root.objUpdate(dto);
				root.objSave(dto);
				root.cancel();
				
			}
		},


		add() {
			console.log("ADD");
			root.mode = "add";
			root.baseObj = this.$clone(this.baseEnt);
			//root.panelCmdBack.fadeOut();
			root.panelCmds.fadeOut();
			console.warn("clase padre: ", this.padre);
			console.warn("name panel: ", root.namePanel);
			root.panelGrid.fadeOut(function (params) {
				root.panelData.fadeIn(function (params) { });
			});
		},

		cancel() {
			root.baseObj = root.baseEnt;
			console.log("CANCEL!");
			root.panelData.fadeOut(function (params) {
				root.panelCmds.fadeIn();
				root.panelGrid.fadeIn(function (params) { });
			});
		},
		

		
	},
};
</script>
