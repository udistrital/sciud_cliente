\* 
data.title=titulo para activar o desactiva
{{titleBtn}}  = Titulo botones 
{{title}}  = Titulo principal 
{{titleBtn}} =titulo abreviado
namePanel=nombredepaneles
root.endPointRute = regulation enlace
regulation=endpoindt especifico endpoinds tutas generales update
*\
<template>
	<div class="col mt-3 pl-1 pr-1" :id="namePanel">
		
		<div class="row">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline mb-2">
						<div class="page-title p-0 m-0">
							<h1>
								<i class="icon-grid3 mr-1 color-main-600"></i>
								<span class="font-weight-semibold">{{title}}</span>
								<span class="item-title">&nbsp;</span>
							</h1>
						</div>
						<div class="header-elements">
							<span class="cmds">
								<button type="button" @click.prevent="add()" v-if="editMode"  title="Agregar Nuevo Elemento .." class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-database-add"></i></b> {{titleBtn}}
								</button>
							</span>
							<span class="cmds-back slide">
								<button type="button" @click.prevent="retorno()" title="Volver al panel principal.." class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-arrow-left"></i></b> Volver A {{title}}
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>


        <Documentos :id="id_panel_documentos" :end-point="endPointRute" :main-obj="baseObj" :parent="this" :tipos="tiposDocumento" />
		<Participantes :id="id_panel_participantes" :end-point="endPointRute" :product="baseObj" :group="group" ref="participantes" :parent="this" />
		
        <DxValidationGroup ref="basicGroup">
			<div class="row data slide">
				<div class="col">
					<div class="card">
						<div class="card-header main">
							<i class="icon-pencil3 mr-1"></i>
							<span class="font-weight-semibold">{{ mode == "edit" ? "Editar" : "Crear" }} {{titleBtn}} </span>
						</div>
						<div class="card-body mb-0 pb-0 pt-2">
							<div class="row">
								<!-- formulatio -->

                                <div class="col-md-4">
                                    <div class="form-group">
                                    <label>Titulo: </label>
                                    <DxTextBox placeholder="Titulo" class="form-control" :value.sync="baseObj.title">
                                    <DxValidator>
                                        <DxRequiredRule />
                                    </DxValidator>
                                    </DxTextBox>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                    <label>Categoría: </label>
                                    <DxSelectBox
                                        :show-clear-button="true"
                                        :grouped="false"
                                        :search-enabled="false"
                                        placeholder="Seleccione..."
                                        :value.sync="baseObj.category_id" 
                                        class="form-control"
                                        :data-source="subtipos" 
                                        display-expr="st_name"
                                        value-expr="id">
                                    </DxSelectBox>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Convocatoria Minciencias:</label>
                                            <DxSelectBox
                                        :show-clear-button="true"
                                        :grouped="false"
                                                :search-enabled="false"
                                                placeholder="Seleccione..."
                                                :value.sync="baseObj.colciencias_call_id"
                                                class="form-control"
                                                :data-source="convocatorias"
                                                display-expr="name"
                                                value-expr="id"
                                                item-template="item"
                                            >
                                                <template #item="{ data }">
                                                    <div>{{ data.name }} de {{ data.year }}</div>
                                                </template>
                                            </DxSelectBox>
                                        </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                    <label>DOI: </label>
                                    <DxTextBox placeholder="DOI" class="form-control" :value.sync="baseObj.doi">
                                    <DxValidator>
                                        <DxRequiredRule />
                                    </DxValidator>
                                    </DxTextBox>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                <div class="form-group">
                                <label>Fecha Elaboración: </label>
                                    <DxDateBox 
                                        class="form-control" 
                                        name="elaboration_date" 
                                        :value.sync="baseObj.elaboration_date" 
                                        id="elaboration_date" 
                                        placeholder="DD/MM/YYYY" 
                                        display-format="dd/MM/yyyy" 
                                        :min="minDate" 
                                        :max="actualDate" 
                                        type="date"> 
                                    <DxValidator> 
                                        <DxRequiredRule />
                                    </DxValidator> 
                                    </DxDateBox>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                    <label>Institución relacionada: </label>
                                    <DxTextBox placeholder="Institución relacionada" class="form-control" :value.sync="baseObj.related_institution">
                                    <DxValidator>
                                    </DxValidator>
                                    </DxTextBox>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                    <label>Pagina Web: </label>
                                    <DxTextBox placeholder="Pagina Web" class="form-control" :value.sync="baseObj.web_page">
                                    <DxValidator>
                                        <DxRequiredRule />
                                        <DxPatternRule message="Por favor Ingrese la Pagina WEB con los datos completos Ej: http://miweb.com/articulo" :pattern="urlPattern" />
                                    </DxValidator>
                                    </DxTextBox>
                                    </div>
                                </div>


                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Observaciones: </label>
                                        <Observaciones :syncValue.sync="baseObj"/>
                                    </div>
                                </div>

                                <div class="col-md-12" v-if="tiposDocumento.length>0">
                                    <div class="card-body" v-html="requisitoArchivo()"></div>
                                </div>

								<!-- fin formulario -->
							</div>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col">
									<DxButton @click="cancel" class="nb">
										<template #default>
											<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
												<b><i class="icon-database-remove"></i></b> CANCELAR
											</span>
										</template>
									</DxButton>
								</div>
								<div class="col text-right">
									<DxButton @click="save" class="nb" v-if="editMode">
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
		</DxValidationGroup>
		<div class="row grid">
			<div class="col">
                <h2></h2>
				<div class="p-0">
					<DxDataGrid
						class="main"
						width="100%"
						@initialized="gridInit"
						@content-ready="onContentReady"
						:allow-column-reordering="true"
						no-data-text="No hay elementos registrados"
						:data-source="dataSource"
						:remote-operations="true"
						:hover-state-enabled="true"
						:row-alternation-enabled="true"
						:show-borders="false"
					>
						<DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
						<DxSorting mode="single" /><!-- single, multiple, none" -->
						<DxPaging :page-size="10" />
						<DxFilterRow :visible="false" />
						<DxLoadPanel :enabled="false" />
						<DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
						<DxGrouping :auto-expand-all="false" />
						<DxSummary>
							<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
						</DxSummary>
						<DxPager
							:show-info="true"
							:show-page-size-selector="true"
							:show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="Página {0} de {1} ({2} elementos)"
						/>
						<DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
						<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->
                        <DxColumn data-field='id'  caption='ID' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 

                        <DxColumn data-field='title'  caption='Titulo' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
                        <DxColumn data-field='category_name'  caption='Categoria' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
                        <DxColumn data-field='doi'  caption='DOI' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
                        <DxColumn data-field='elaboration_date'  caption='Fecha Elabora ion' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
                        <DxColumn data-field='related_institution'  caption='Institucion financiadora' data-type='string' alignment='center' :visible='false' :allow-grouping='false' /> 
                        <DxColumn data-field='colciencias_call_name'  caption='Minciencias' data-type='string' alignment='center' :visible='false' :allow-grouping='false' /> 
                        <DxColumn data-field='colciencias_call_year'  caption='Minciencias Año' data-type='string' alignment='center' :visible='false' :allow-grouping='false' /> 

						<DxColumn data-field='observation'  caption='Observaciones' data-type='string' alignment='center' :visible='true'  cell-template="tplObs"/> 
						<DxColumn data-field="web_page" caption="Pagina" data-type="string" alignment="center" :visible="true" :width="100" cell-template="tplWeb" />
						<DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="70" />
						<DxColumn :width="130" alignment="center" cell-template="tpl" caption="" />

						<template #tplWeb="{ data }">
							<a v-if="data.data.web_page != '' && data.data.web_page != null" :title="data.data.web_page" class="cmd-item color-main-600 mr-2" :href="data.data.web_page" Target="_blank">
								<i class="icon-link"></i> Visitar
							</a>
							<a v-else title="No dispone de Url" class="cmd-item color-main-600 mr-2" href="#">-</a>
						</template>

                        <template #tplObs="{ data }">
							<a v-if="data.data.observation != '' && data.data.observation != null" :title="data.data.observation" class="cmd-item color-main-600 mr-2" @click.prevent="verObservar(data.data)" href="#" Target="_blank">
								<i class="icon-info mr-1"></i> Ver
							</a>
							<a v-else title="No dispone" class="cmd-item color-main-600 mr-2" href="#">-</a>
						</template>

						<template #tpl="{ data }">
							<span class="cmds">
								<a title="Observar documentos..." class="cmd-item color-main-600 mr-2" @click.prevent="documentos(data)" href="#">
									<i class="icon-file-pdf"></i>
								</a>
								<a title="Observar participantes..." class="cmd-item color-main-600 mr-2" @click.prevent="participantes(data)" href="#">
									<i class="icon-users"></i>
								</a>
								<span v-if="editMode">
									<a title="Editar elemento..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a>
									<a v-if="data.data.active" title="Desactivar Libro..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
										<i class="icon-database-remove"></i>
									</a>
									<a v-else title="Activar Libro..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
										<i class="icon-database-check"></i>
									</a>
								</span>
							</span>
						</template>
					</DxDataGrid>

				</div>
			</div>
		</div>

		<div class="card mt-3" v-if="debug">
			<div class="card-body">
				{{ JSON.stringify(baseObj, null, "\t") }}
			</div>
		</div>

        <DxPopup :visible="popupObs" :drag-enabled="false" :close-on-outside-click="false" :show-title="true" width="60%" height="300" title="Observación:">
            <div class="row" style="overflow-y: scroll; height:148px">
				<div class="col">
                    <h3>
						<i class="icon-info mr-1 color-main-600"></i>
						<span class="font-weight-semibold">{{baseObj[titlecolum]}}</span>
					</h3>
					<div v-html="observarData"></div>
				</div>
			</div>
            <div class="row">
				<div class="col"><hr>
					<DxButton @click="popupObs=false" class="nb">
						<template #default>
							<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
								<b><i class="icon-database-remove"></i></b> Salir
							</span>
						</template>
					</DxButton>
				</div>
			</div>
		</DxPopup>

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
        // namePanel:{
        //     type: String,
        //     default: () => "panelPrincipal",
        // },
        endPointRute:{
            type: String,
            default: () => null,
        },
        objEpdata:{
            type: String,
            default: () => null,
        },
        title:{
            type: String,
            default: () => null,
        },
        titleBtn:{
            type: String,
            default: () => null,
        },
        titlecolum:{
            type: String,
            default: () => null,
        },
        // },
        // codEP:{
        //     type: String,
        //     default: () => null,
        // },
        // padre:{
        //     type: Object,
		// 	default: () => null,
        // },
	},
	data: () => ({
		namePanel:"paperWorking",
        codEP: null,//611 612 613
        popupObs: false,
        observarData:"",
		editData: null, //sirve para dejar formulario en limpio o llenar datos
		items: [],
		totaCount: 0,
		grid: null,
		mode: null,
		unidad: null,
		section: null,
		//tipos: 587, //584-179
        tipox:[],
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
            title: null,
            category_id: null,
            colciencias_call_id: null,
            doi: null,
            elaboration_date: null,
            related_institution: null,
            research_group_id: null,
            observation: null,
            web_page: null,
            active: true,
		},
	}),
	created() {
		// console.clear();
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
		root.getConvocatorias();
		// root.tipox = root.subtypesByType("regulacion_reglamento_tipo");
		root.subtipos = root.subtypesByType("documento_trabajo_w_categoria");
		root.tiposDocumento = root.subtypesByType("documento_trabajo_w_documento");
        // root.participationid = root.subtypesByType("evento_participacion");
	},
	mounted() {
		console.log("root.tipos", this.tipos);
        root.id_panel_documentos= this.namePanel + "documentos"
        root.id_panel_participantes= this.namePanel + "participantes"
		root.panelData = $("#" + this.namePanel + " .data");
        root.panelGrid = $("#" + this.namePanel + " .grid");
        root.panelCmds = $("#" + this.namePanel + " .cmds");
        root.panelCmdBack = $("#" + this.namePanel + " .cmds-back");
        root.panelDocs = $("#" + this.namePanel + "-documentos");
        root.loaderMessage = "Cargando Elementos";
        root.loaderElement = "#" + this.namePanel + " .grid";

	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapState("unidad/colciencias", { convocatorias: "items" }),
		dataSource: function() {
			if (typeof this.group.id === "undefined") return null;
            let data = root.codEP;
            data = (data != null) ? "product_type_id=" + data : null,
            console.warn("codEP: ",root.codEP);
            console.warn("valor de data: ",root.codEP);
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				stringParam: data,
				endPoint: `research_units/${root.group.id}/${root.endPointRute}`,
				onLoading: function(loadOptions) {
					root.loaderShow("Cargando elementos", "#panel-produccion .card-body");
				},
				onLoaded: function(results, baseEntity) {
					// console.clear();
					console.log("results", results);
					root.totaCount = results.totalCount;
					root.loaderHide();
				},
			});
		},
	},
	watch: {},
	methods: {
		...mapActions("unidad/colciencias", { getConvocatorias: "getAll" }),
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active" }),
		
        verObservar(data){
            root.observarData=data.observation;
            root.baseObj[root.titlecolum]=data[root.titlecolum];
            root.popupObs= !root.popupObs ? true : false ;
        },
		
		requisitoArchivo(){
			let tipos=root.tiposDocumento;
			let i=0, print="";
			if(Array.isArray(tipos) && tipos.length != 0 && root.editMode){
				print="<h3><i class='icon-info mr-1 color-main-600'></i><b><i>Documentos Adicionales:</i></b></h3>";
				print=print + "<ul>";
				for(i=0; i<tipos.length; i++){
					let text = tipos[i].st_description==null ? "": "<br>"+tipos[i].st_description ;
					if(tipos[i].active) print=print + "<li>" + "<b>"+tipos[i].st_name+ "</b>"+text+"</li>";
				}
				print=print + "</ul>";
			}
			return print;
		},

		participantes(data) {
			root.section = "participantes";
			console.log("participantes", data.row.data);
			root.baseObj = data.row.data;
			// 202104111513: Error
			if (data.row.data.volume !== null) data.row.data.volume = parseInt(data.row.data.volume);
			let rd = data.row.data;
			if (rd.volume !== null) rd["volume"] = parseInt(rd.volume);
			console.log("rd", rd);
			root.baseObj = rd;
			root.panelCmds.fadeOut();
			$("#" + root.namePanel + " .item-title").html(`<span class="font-weight-semibold"> &raquo; Participantes</span> &raquo; ${data.row.data[root.titlecolum]}`);
			root.panelParticipantes = $("#" + root.id_panel_participantes);
			console.log("root.panelParticipantes", root.id_panel_participantes.length);
			$("#" + root.namePanel + "-documentos").hide();
			root.panelGrid.fadeOut(function(params) {
				root.panelCmdBack.fadeIn();
				$("#" + root.namePanel + "-participantes .grid").fadeIn();
				root.panelParticipantes.fadeIn(function(params) {});
			});
		},

		documentos(data) {
			// console.clear();
			console.log("documentos", data.row.data);
			root.section = "documentos";
			// 202104111513: Error
			if (data.row.data.volume !== null) data.row.data.volume = parseInt(data.row.data.volume);
			let rd = data.row.data;
			if (rd.volume !== null) rd["volume"] = parseInt(rd.volume);
			console.log("rd", rd);
			root.baseObj = rd;
			$("#" + root.namePanel + " .item-title").html(`<span class="font-weight-semibold"> &raquo; Documentos</span> &raquo;  ${data.row.data[root.titlecolum]}`);
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelCmdBack.fadeIn();
				$("#" + root.id_panel_documentos).fadeIn(function(params) {});
			});
		},

		retorno() {
			console.log(root.section);
			root.panelCmdBack.fadeOut();
			if (root.section == "participantes") {
				root.panelParticipantes.fadeOut(function(params) {
					root.panelCmds.fadeIn();
					root.panelGrid.fadeIn(function(params) {});
				});
			} else {
				console.log("Regresar!");
				console.log("root.panelDocs", root.panelDocs);
				$("#" + root.id_panel_documentos).fadeOut(function(params) {
					root.panelCmds.fadeIn();
					root.panelGrid.fadeIn(function(params) {});
				});
			}
			$("#" + root.namePanel + " .item-title").html("");
			root.baseObj = this.$clone(root.baseEnt);
			root.section = null;
		},

		save() {
			console.log(this.$sep);
			var result = root.$refs.basicGroup.instance.validate();
			console.log("result", result);
			if (result.isValid) {
				console.log("VALID!");
				root.scrollTop();
				root.panelCmds.fadeOut();
				// root.loaderElement = ;
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " Elemento";
				root.loaderShow(msg, root.panelData);
				if (root.mode == "add") root.baseObj.created_by = root.user_id;
				if (root.mode == "edit") root.baseObj.updated_by = root.user_id;
                
				root.baseObj.product_type_id = root.codEP;
                root.baseObj.research_group_id=root.group.id;
				let obj = root.baseObj;
                //let json1 = `{ "${mydata}": `+JSON.stringify(obj)+" } ";
				let dto = {
					newFormat:true,
					unidadId: root.group.id,
					stringEP: root.endPointRute,
					mod: obj.id,
					//objectSend: { regulation : obj },
                    objectSend: JSON.parse(`{ "${root.objEpdata}": ` + JSON.stringify(obj) + "}"),
					cb: function(item) {
						console.log("item", item);
						root.grid.refresh();
						root.loaderHide();
						root.cancel();
					},
				};
				console.log("root.mode", root.mode);
				if (root.mode == "edit") root.objUpdate(dto);
				else root.objSave(dto);
				root.cancel();
			}
		},

		edit(data) {
			root.mode = "edit";
			console.log("data", data);
			root.baseObj = data;
            //root.panelCmdBack.fadeOut();
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelData.fadeIn(function(params) {});
			});
		},

		add() {
			console.log("ADD");
			root.mode = "add";
			root.baseObj = this.$clone(this.baseEnt);
            //root.panelCmdBack.fadeOut();
			root.panelCmds.fadeOut();
            console.warn("clase padre: ", this.padre);
            console.warn("name panel: ", root.namePanel);
			root.panelGrid.fadeOut(function(params) {
				root.panelData.fadeIn(function(params) {});
			});
		},

		cancel() {
			console.log("CANCEL!");
			root.panelData.fadeOut(function(params) {
				root.panelCmds.fadeIn();
				root.panelGrid.fadeIn(function(params) {});
			});
		},

		active(data, state) {
			// console.clear();
			console.log("active", data);
			console.log("state", state);
			let a = state ? "activar" : "desactivar";
			let am = state ? "Activando" : "Desactivando";
			let msg = `¿Realmente desea ${a} <span class='text-sb'>"${data.data[root.titlecolum]}"</span>?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am}`, root.panelGrid);
                    let active=JSON.stringify({active: state,  updated_by: root.user_id});

					var dto = {
                        newFormat:true,
                        url: `${root.endPointRute}/${data.data.id}`,
                        data:  JSON.parse(`{ "${root.objEpdata}" :` + active + "}"),
						cb: function(result) {
							console.log("Result", result);
							root.grid.refresh();
							root.loaderHide();
						},
					};
					console.log("dto", dto);
					root.elementoActive(dto);
					root.loaderHide();
				}
			});
		},

		gridInit(e) {
			this.grid = e.component;
		},

		onContentReady() {},
	},
};
</script>
