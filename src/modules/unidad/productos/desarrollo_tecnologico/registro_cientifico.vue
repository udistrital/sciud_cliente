<template>
	<div class="col mt-3 pl-1 pr-1" id="panelCientífico">
		<div class="row">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline mb-2">
						<div class="page-title p-0 m-0">
							<h1>
								<i class="icon-grid3 mr-1 color-main-600"></i>
								<span class="font-weight-semibold">Registro Científico</span>
								<span class="item-title">&nbsp;</span>
							</h1>
						</div>
						<div class="header-elements">
							<span class="cmds">
								<button type="button" @click.prevent="add()" v-if="editMode"  title="Nuevo Nuevo Registro Cientifico.." class="btn btn-main btn-labeled btn-labeled-left ">
									<b><i class="icon-database-add"></i></b> Nuevo Registro Cientifico
								</button>
							</span>
							<span class="cmds-back slide">
								<button
									type="button"
									@click.prevent="retorno()"
									title="Volver al Nuevo Registro Cientifico.."
									class="btn btn-main btn-labeled btn-labeled-left "
								>
									<b><i class="icon-arrow-left"></i></b> Volver A Nuevo Registro Cientifico
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Documentos id="panelCientífico-documentos" end-point="new_scientific_records" :main-obj="baseObj" :parent="this" :tipos="tiposDocumento" />
		<Participantes id="panelCientífico-participantes" end-point="new_scientific_records" :product="baseObj" :group="group" ref="participantes" :parent="this" />
		<DxValidationGroup ref="basicGroup">
			<div class="row data slide">
				<div class="col">
					<div class="card">
						<div class="card-header main">
							<i class="icon-pencil3 mr-1"></i>
							<span class="font-weight-semibold">{{ mode == "edit" ? "Editar" : "Crear" }} Registro Científico</span>
						</div>
						<div class="card-body mb-0 pb-0 pt-2">
							<div class="row">
								<!-- formulatio -->

								<div class="col-md-4">
									<div class="form-group">
										<label>Nombre Registro: </label>
										<DxTextBox placeholder="Nombre Registro" class="form-control" :value.sync="baseObj.nsr_name">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>Nombre /base de datos científica: </label>
										<DxTextBox
											placeholder="Nombre /base de datos 
									científica"
											class="form-control"
											:value.sync="baseObj.nsr_database_name"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-2">
									<div class="form-group">
										<label>Fecha Obtención:</label>
										<DxDateBox
											class="form-control"
											name="approval_date"
											:value.sync="baseObj.nsr_date_of_obtaining"
											id="nsr_date_of_obtaining"
											placeholder="DD/MM/YYYY"
											display-format="dd/MM/yyyy"
											:min="minDate"
											:max="actualDate"
											type="date"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxDateBox>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>Dirección Web: </label>
										<DxTextBox placeholder="Dirección Web" class="form-control" :value.sync="baseObj.nsr_database_url">
											<DxValidator>
												<DxRequiredRule />
												<DxPatternRule message="Recuerde que todas las paginas web deben comenzar por: HTTP:// o HTTPS://." :pattern="urlPattern" />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>Institución certificadora del Nuevo registro científico: </label>
										<DxTextBox
											placeholder="Institución certificadora del Nuevo registro científico"
											class="form-control"
											:value.sync="baseObj.nsr_issuing_institution"
										>
											<DxValidator> </DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>Describa si Anexa Soporte de Certificación: </label>
										<DxTextBox placeholder="Describa si Anexa Soporte de Certificación" class="form-control" :value.sync="baseObj.nsr_certifying_institution">
											<DxValidator> </DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-3">
									<div class="form-group">
										<label>Categoría (NRC_A/NRC_B): </label>
										<DxSelectBox
											:show-clear-button="true"
											:grouped="false"
											:search-enabled="false"
											placeholder="Seleccione..."
											:value.sync="baseObj.category_id"
											class="form-control"
											:data-source="subtipos"
											display-expr="st_name"
											value-expr="id"
										>
										</DxSelectBox>
									</div>
								</div>

								<div class="col-md-3">
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

								<div class="col-md-6">
									<label>Lugar de obtención: </label>
									<Geo :lockElement="loaderElement" :syncObject="baseObj" />
								</div>

								<div class="col-md-12">
									<div class="form-group">
										<label>Observaciones: </label>
										<DxTextArea :height="100" :max-length="400" :value.sync="baseObj.observation" placeholder="Observaciones" class="form-control">
											<DxValidator> </DxValidator>
										</DxTextArea>
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
				<div class="p-0">
					<DxDataGrid
						class="main"
						width="100%"
						@initialized="gridInit"
						@content-ready="onContentReady"
						:allow-column-reordering="true"
						no-data-text="No hay artículos registrados"
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
							<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} artículos" />
						</DxSummary>
						<DxPager
							:show-info="true"
							:show-page-size-selector="true"
							:show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="Página {0} de {1} ({2} artículos)"
						/>
						<DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
						<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

						<DxColumn data-field="id" caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn data-field="nsr_name" caption="Nombre Registro" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn
							data-field="nsr_database_name"
							caption="Nombre /base de datos científica"
							data-type="text"
							alignment="center"
							:visible="true"
							:allow-grouping="false"
						/>
						<DxColumn
							data-field="nsr_date_of_obtaining"
							caption="Fecha de obtención"
							data-type="text"
							alignment="center"
							:visible="true"
							:allow-grouping="false"
						/>
						<DxColumn data-field="nsr_database_url" caption="Dirección Web" data-type="text" alignment="center" :visible="false" :allow-grouping="false" />

						<DxColumn data-field="geo_city_name" caption="Ciudad" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="geo_country_name" caption="Pais" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn data-field="geo_state_name" caption="Estado" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />

						<DxColumn
							data-field="nsr_issuing_institution"
							caption="Institución certificadora del Nuevo registro científico"
							data-type="text"
							alignment="center"
							:visible="false"
							:allow-grouping="false"
						/>
						<DxColumn
							data-field="nsr_certifying_institution"
							caption="Describa si Anexa Soporte de Certificación"
							data-type="text"
							alignment="center"
							:visible="false"
							:allow-grouping="false"
						/>
						<DxColumn
							data-field="category_name"
							caption="Categoría (NRC_A/NRC_B)"
							data-type="text"
							alignment="center"
							:visible="false"
							:allow-grouping="false"
						/>
						<DxColumn
							data-field="colciencias_call_name"
							caption="Categoría Minciencias"
							data-type="text"
							alignment="center"
							:visible="false"
							:allow-grouping="false"
						/>
											<!-- <DxColumn data-field='observation'  caption='Observación' data-type='string' alignment='center' :visible='false' :allow-grouping='false' />  -->

						<DxColumn data-field="webpage" caption="URL" data-type="string" alignment="center" :visible="true" :width="100" cell-template="tplWeb" />
						<DxColumn data-field='observation'  caption='Observaciones' data-type='string' alignment='center' :visible='true'  cell-template="tplObs"/> 
						<DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="70" />
						<DxColumn :width="130" alignment="center" cell-template="tpl" caption="" />
						
						<template #tplWeb="{ data }">
							<a v-if="data.data.url != ''" :title="data.data.url" class="cmd-item color-main-600 mr-2" :href="data.data.url" Target="_blank">
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
								<a title="Editar artículo..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
									<i class="icon-database-edit"></i>
								</a>
								<a
									v-if="data.data.active"
									title="Desactivar Reg_Científico..."
									class="cmd-item color-main-600 mr-2"
									@click.prevent="active(data, false)"
									href="#"
								>
									<i class="icon-database-remove"></i>
								</a>
								<a v-else title="Activar Reg_Científico..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
									<i class="icon-database-check"></i>
								</a>
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
        <DxPopup :visible="popupObs" :drag-enabled="false" :close-on-outside-click="false" :show-title="true" width="60%" height="300" title="Observacion:">
            <div class="row" style="overflow-y: scroll; height:148px">
				<div class="col">
                    <h3>
						<i class="icon-info mr-1 color-main-600"></i>
						<span class="font-weight-semibold">{{baseObj[titlecolum]}}</span>
					</h3>
					<div style="overflow-y: scroll; height:120px" v-html="observarData"></div>
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

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "Reg_Científico",
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
		titlecolum:{
			type: String,
			default: () => 'ind_dsg_registration_title',
		},
		group: {
			type: Object,
			default: () => null,
		},
	},
	data: () => ({
		popupObs: false,
		observarData: null,
		editData: null, //sirve para dejar formulario en limpio o llenar datos
		items: [],
		totaCount: 0,
		grid: null,
		mode: null,
		unidad: null,
		section: null,
		tipos: [],
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
		min: new Date(1950, 1, 1),
		baseEnt: null,
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		baseObj: {
			id: null,
			category_id: null,
			colciencias_call_id: null,
			nsr_name: null,
			nsr_date_of_obtaining: null,
			nsr_database_name: null,
			nsr_database_url: null,
			geo_country_id: null,
			nsr_certifying_institution: null,
			sr_issuing_institution: null,
			observation: null,
			created_by: 1,
			geo_city_id: null,
			geo_state_id: null,
			//geo_country_id: null,
		},
	}),
	created() {
		// console.clear();
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
		root.getConvocatorias();
		root.subtipos = root.subtypesByType("registro_cientifico_categoria");
		root.tiposDocumento = root.subtypesByType("registro_cientifico_documento");
	},
	mounted() {
		// root.getConvocatorias();
		// root.tipos = root.subtypesByType(12);
		// root.subtipos = root.subtypesByType(40); // root.subtypesByType(35);
		console.log("root.tipos", root.tipos);
		root.panelData = $("#panelCientífico .data");
		root.panelGrid = $("#panelCientífico .grid");
		root.panelCmds = $("#panelCientífico .cmds");
		root.panelCmdBack = $("#panelCientífico .cmds-back");
		root.panelDocs = $("#panelCientífico-documentos");
		root.loaderMessage = "Cargando Artículos";
		root.loaderElement = "#panelCientífico .grid";
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapState("unidad/colciencias", { convocatorias: "items" }),
		dataSource: function() {
			if (typeof this.group.id === "undefined") return null;
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				endPoint: `research_units/${root.group.id}/new_scientific_records`,
				onLoading: function(loadOptions) {
					root.loaderShow("Cargando Artículos", root.panelGrid);
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
		//...mapActions("unidad/producto/conocimiento/articulo", { objSave: "save", objUpdate: "update", elementoActive: "active" }),
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
			// console.clear();
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
			$("#panelCientífico .item-title").html(`<span class="font-weight-semibold"> &raquo; Participantes</span> &raquo; ${data.row.data.nsr_database_name}`);
			root.panelParticipantes = $("#panelCientífico-participantes");
			console.log("root.panelParticipantes", root.panelParticipantes.length);
			$("#panelCientífico-documentos").hide();
			root.panelGrid.fadeOut(function(params) {
				root.panelCmdBack.fadeIn();
				$("#panelCientífico-participantes .grid").fadeIn();
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
			$("#panelCientífico .item-title").html(`<span class="font-weight-semibold"> &raquo; Documentos</span> &raquo; ${data.row.data.nsr_database_name}`);
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelCmdBack.fadeIn();
				$("#panelCientífico-documentos").fadeIn(function(params) {});
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
				$("#panelCientífico-documentos").fadeOut(function(params) {
					root.panelCmds.fadeIn();
					root.panelGrid.fadeIn(function(params) {});
				});
			}
			$("#panelCientífico .item-title").html("");
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
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " Artículo";
				root.loaderShow(msg, root.panelData);
				if (root.mode == "add") root.baseObj.created_by = root.user_id;
				if (root.mode == "edit") root.baseObj.updated_by = root.user_id;
				let obj = root.baseObj;
				let dto = {
					unidadId: root.group.id,
					stringEP: "new_scientific_records",
					mod: obj.id,
					objectSend: { new_scientific_record: obj },
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

			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelData.fadeIn(function(params) {});
			});
		},

		add() {
			console.log("ADD");
			root.mode = "add";
			root.baseObj = this.$clone(this.baseEnt);
			root.panelCmds.fadeOut();
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
			let msg = `¿Realmente desea ${a} <span class='text-sb'>"${data.data.nsr_name}"</span>?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am}`, root.panelGrid);
					var dto = {
						url: `research_units/${root.group.id}/new_scientific_records/${data.data.id}/active`,
						data: {
							new_scientific_record: {
								active: state,
								updated_by: 1,
							},
						},
						cb: function(result) {
							console.log("Result", result);
							root.grid.refresh();
							root.loaderHide();
							// root.cancel(validationGroup);
							// $("#data").fadeOut(function () {
							// $("#grid").fadeIn(function () {});
							// });
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

		onContentReady() {
			// $(".commands a").click(function() {
			// 	console.log("Come on lets show the dropdown!!");
			// });
			// var h = "<span class='mr-1 color-text d-none d-md-inline' id='column-chooser-text'>s</span> ";
			// if ($("#column-chooser-text").length <= 0) $(".dx-datagrid-column-chooser-button").before(h);
			// var b = "<span class='mr-1 color-text d-none d-md-inline' id='column-chooser-text'>s</span> ";
			// if ($("#column-chooser-text").length <= 0) $(".dx-datagrid-column-chooser-button").before(b);
		},
	},
};
</script>
