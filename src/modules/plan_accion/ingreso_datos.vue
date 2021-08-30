<template>
  <div>
      <div class="page-header header-elements-md-inline" id="panel-unidades-head">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-history mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">Plan de Acción &raquo; {{ $titleCase(group.name) }}</span>
					<span id="msg"></span>
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>
			<!-- <div class="header-elements" v-if="es_admin"> -->
            <div class="header-elements" v-if="true">
				<router-link tag="a" :to="'/unidad/'+$route.params.unidadId+'/plan_accion'" class="btn btn-main btn-labeled btn-labeled-left legitRipple" title="regresar al Listado">
					<b><i class="icon-database-add"></i></b> Regresar al Plan de Accion
				</router-link>
			</div>
		</div>

        <div class="row" id="panel-plan-accion">
			<div class="col">
				<div class="card">
                    <div class="card-body">
                        
                        <div class="page-title p-0 m-0">
							<h1>
								<i class="icon-pencil mr-1 color-main-600"></i>
								<span class="font-weight-semibold">Nuevo Plan de Acción</span>
								<span class="item-title">&nbsp;</span>
							</h1>
						</div>

                        <div class="row grid">
                            <div class="col">
                                <h2></h2>
                                <div class="p-0">
                                    
                                <div class="card-body mb-0 pb-0 pt-2">
                                    <div class="row">
                                        <!-- formulatio -->

                                        <div class="col-md-9">
                                            <div class="form-group">
                                                <label>Titulo del Plan de Acción: </label>
                                                <DxTextBox placeholder="Titulo del Plan de Acción" class="form-control" :value.sync="baseObj.program_name">
                                                    <DxValidator>
                                                        <DxRequiredRule />
                                                    </DxValidator>
                                                </DxTextBox>
                                            </div>
                                        </div>

										<div class="col-md-2">
									<div class="form-group">
										<label>Año Implementacion</label>
										<DxSelectBox :items="anos"/>
									</div>
								</div>
                                       

                                        <!-- <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Año de Presentación: </label>
                                                <DxNumberBox placeholder="Año de Presentación" class="form-control" :value.sync="baseObj.num_administrative_act" />
                                                <DxValidator>
                                                    <DxRequiredRule />
                                                </DxValidator>
                                            </div>
                                        </div> -->
                                        

                                        <!-- <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Observaciones: </label>
                                                <Observaciones :syncValue.sync="baseObj" />
                                            </div>
                                        </div> -->

                                        <div class="col-md-12" v-if="tiposDocumento.length > 0">
                                            <div class="card-body" v-html="requisitoArchivo()"></div>
                                        </div>

                                        <!-- fin formulario -->
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="row">
                                        <div class="col">
                                            
											<router-link tag="a" :to="'/unidad/'+$route.params.unidadId+'/plan_accion'" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple" title="regresar al Listado">
												<b><i class="icon-database-remove"></i></b>CANCELAR
											</router-link>
                                        </div>
                                        <div class="col text-right">
                                            <!-- <DxButton @click="save" class="nb" v-if="editMode"> -->
                                            <DxButton @click="save" class="nb" v-if="true">    
                                                <template #default>
                                                    <span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
                                                        GUARDAR <b><i class="icon-database-add"></i></b>
                                                    </span>
                                                </template>
                                            </DxButton>
                                        </div>
                                    </div>
                                </div>                    


                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>


        <div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<span class="font-weight-semibold">editMode:</span> {{ editMode }}
						<hr class="sep mb-0" />
						<span class="font-weight-semibold">group:</span> {{ JSON.stringify(group, null, 3) }}
					</div>
				</div>
			</div>
		</div>

		
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */

let root = null;
let $ = window.jQuery;
import DxStore from "@/store/dx";
import {
	DxColumn,
	DxColumnChooser,
	DxDataGrid,
	DxFilterRow,
	DxGroupItem,
	DxGroupPanel,
	DxGrouping,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator, DxPatternRule } from "devextreme-vue/validator";
import { DxDateBox, DxSelectBox, DxButton, DxTagBox, DxTextBox, DxNumberBox, DxTextArea, DxValidationGroup, DxPopup } from "devextreme-vue";
import { mapState, mapActions, mapGetters } from "vuex";
//import { DxStateStoring } from 'node_modules/devextreme-vue/pivot-grid';

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	components: {
		// Commands,
		DxPopup,
		DxButton,
		DxColumn,
		DxPatternRule,
		DxColumnChooser,
		DxDataGrid,
		DxDateBox,
		DxNumberBox,
		DxFilterRow,
		DxGrouping,
		DxGroupItem,
		DxGroupPanel,
		DxLoadPanel,
		DxPager,
		DxPaging,
		DxRequiredRule,
		DxSearchPanel,
		DxSelectBox,
		DxSorting,
		DxSummary,
		DxTextArea,
		DxTextBox,
		DxValidator,
		DxValidationGroup,
		Geo: () => import("@/components/element/geo"),
		Observaciones: () => import("@/components/element/html_editor"),
		Documentos: () => import("@/components/element/documentos"),
		Participantes: () => import("@/components/element/participantes"),
	},
	props: {
		group: {
			type: Object,
			default: () => null,
		},

		endPointRute: {
			type: String,
			default: () => null,
		},
		objEpdata: {
			type: String,
			default: () => null,
		},
		title: {
			type: String,
			default: () => null,
		},

	},
	data: () => ({
		namePanel: "panel-plan-accion",
		codEP: null,
		popupObs: false,
		observarData: "",
		editData: null,
		items: [],
		totaCount: 0,
		grid: null,
		mode: null,
		// unidad: null,
		section: null,
		//tipos: 587, //584-179
		tipox: [],
		totalCount: 0,
		tiposDocumento: [],
		subtipos: [],
		isValid: false,
		panelData: null,
		panelGrid: null,
		panelParticipantes: null,
		panelDocs: null,
		panelCmds: null,
		baseEntity: null,
		docLink: null,
		firstLoad: true,
		now: new Date(),
		baseEnt: null,
		participationid: null,
		id_panel_documentos: "documentos",
		id_panel_participantes: "participantes",
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		baseObj: {
            id: null,
            title: null,
            year_create: null,
            year_end: null,
            state: null,
		},
	}),
	created() {
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
		// root.getConvocatorias();
		//root.subtipos = root.subtypesByType("libro_categoria");
		//root.tiposDocumento = root.subtypesByType("libro_documento");
		// root.subtipos = root.subtypesByType("libro_formacion_categoria");
		// root.tiposDocumento = root.subtypesByType("libro_formacion_documento");
		root.getUnit({
			id: root.$route.params.unidadId,
			cb: function(result) {
				root.group = result;
				document.title += ` ${root.$titleCase(root.group.name)}`;
				root.loadMembers();
			},
		});
	},
	mounted() {
		console.log("root.tipos", this.tipos);
		
		root.panelData = $("#" + this.namePanel + " .data");
		root.panelGrid = $("#" + this.namePanel + " .grid");
		root.panelCmds = $("#" + this.namePanel + " .cmds");
		root.panelCmdBack = $("#" + this.namePanel + " .cmds-back");
		// root.panelDocs = $("#" + this.namePanel + "-documentos");
		root.loaderMessage = "Cargando PLan Accion";
		root.loaderElement = "#" + this.namePanel + " .grid";
	},
	computed: {
		anos(){
			let anios=[], fecha = new Date(), ano = fecha.getFullYear();
			for(let i=0; i<=10; i++) anios.push(ano-i);
			return anios;
		},
	},
	watch: {},
	methods: {
		// // ...mapActions("unidad/colciencias", { getConvocatorias: "getAll" }),
		// ...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active" }),
		...mapActions("unidad", ["getUnit", "getResearchers", "saveResearcher", "updateResearcher"]),
		loadMembers() {
			console.log("members", root.group.member_ids);
		},

		gridInit(e) {
			this.grid = e.component;
		},

		onContentReady() {},
	},
};
</script>
