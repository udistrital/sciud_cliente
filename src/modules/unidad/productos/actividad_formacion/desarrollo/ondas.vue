/* Elementos a remplazar: Ondas = Titulos Principales de la aplicacion en singular una palabra Nuevo Programa Ondas = Son para los botones de nuevo elemento
Programa Ondas = titulo abrebiado de la del contenido a mostrar programaOndasjs = nombre del archivo store al cual esta configurado axios research_units= ruta
principal del modulo en el endPoint ondas_program = objeto json al cual se enviaran los datos de formulario */

<template>
	<div class="col mt-3" id="panel-Ondas" v-if="editMode">
		<div class="row data slide">
			<div class="col">
				<div class="card">
					<div class="card-header main">
						<i class="icon-pencil3 mr-1 color-main-600"></i>
						<span class="font-weight-semibold">{{ editData ? "Editar" : "Crear" }} Ondas</span>
					</div>
					<div class="card-body mb-0 pb-0 pt-2">
						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<label>Nombre del Proyecto: </label>
									<DxTextBox placeholder="Nombre del Proyecto" class="form-control" :value.sync="ondas_program.projects_name">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>

							<div class="col-md-3">
								<div class="form-group">
									<label>Convocatoria: </label>
									<DxSelectBox
										:show-clear-button="true"
										:grouped="false"
										:search-enabled="false"
										placeholder="Seleccione..."
										:value.sync="ondas_program.colciencias_call_id"
										class="form-control"
										:data-source="convocatoria"
										display-expr="name"
										Value-expr="id "
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
							</div>

							<div class="col-md-3">
								<div class="form-group">
									<label>Registro Proyectos aprobados: </label>
									<DxSelectBox
										:show-clear-button="true"
										:grouped="false"
										:search-enabled="false"
										placeholder="Seleccione..."
										:value.sync="ondas_program.registration_projects_approved"
										class="form-control"
										:data-source="proyectos"
										display-expr="name"
										Value-expr="id "
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
							</div>

							<div class="col-md-3">
								<div class="form-group">
									<label>Institución del proyecto: </label>
									<DxTextBox placeholder="Institución del proyecto" class="form-control" :value.sync="ondas_program.institution_project">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>

							<div class="col-md-3">
								<div class="form-group">
									<label>Categoría: </label>
									<DxSelectBox
										:show-clear-button="true"
										:grouped="false"
										:search-enabled="false"
										placeholder="Seleccione..."
										:value.sync="ondas_program.category_id"
										class="form-control"
										:data-source="subtipos"
										display-expr="st_name"
										Value-expr="id "
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxSelectBox>
								</div>
							</div>

							<div class="col-md-6"><Geo :lockElement="loaderElement" :syncObject="ondas_program" /></div>
							<div class="col-md-2">
								<div class="form-group">
									<label>Activo: </label>
									<DxSwitch :value.sync="ondas_program.active" switched-on-text="SI" switched-off-text="NO" />
								</div>
							</div>

							<div class="col-md-4">
								<div class="form-group">
									<label>Documento: </label>
									<a
										v-if="group.establishment_document"
										:href="getLink(group.establishment_document)"
										target="_blank"
										class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple"
									>
										<b><i class="icon-link"></i></b> VER DOCUMENTO</a
									>
									<DxFileUploader
										v-else
										label-text=""
										upload-mode="useForm"
										accept="document/*.pdf"
										:max-file-size="4000000"
										:read-only="!editMode"
										id="establishment_document"
										select-button-text="Seleccione"
										:allowed-file-extensions="['.pdf']"
										@valueChanged="fileSelected($event)"
										@contentReady="fileReady($event)"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxFileUploader>
								</div>
							</div>

							<div class="col-md-12">
								<div class="form-group">
									<label>Resultado de investigación: </label>
									<DxTextArea
										:height="100"
										:max-length="400"
										:value.sync="ondas_program.research_results"
										placeholder="Resultado de investigación"
										class="form-control"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextArea>
								</div>
							</div>

							<div class="col-md-12">
								<div class="form-group">
									<label>Observaciones: </label>
									<DxTextArea :height="100" :max-length="400" :value.sync="ondas_program.observation" placeholder="Observaciones" class="form-control">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextArea>
								</div>
							</div>
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

		<div class="row grid">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline">
						<div class="page-title d-flex">
							<h1>
								<i class="icon-grid3 mr-1 color-main-600"></i>
								<span class="font-weight-semibold">{{ title }}</span>
							</h1>
						</div>
						<div class="header-elements">
							<button type="button" @click.prevent="edit()" title="Nuevo Programa Ondas.." class="btn btn-main btn-labeled btn-labeled-left " id="btn-add">
								<b><i class="icon-database-add"></i></b>Nuevo Programa Ondas
							</button>
						</div>
					</div>

					<DxDataGrid
						class="main"
						width="100%"
						@initialized="gridInit"
						@content-ready="onContentReady"
						:allow-column-reordering="true"
						:data-source="dataSource"
						:remote-operations="true"
						:hover-state-enabled="true"
						:row-alternation-enabled="true"
						:show-borders="false"
					>
						<DxColumnChooser :enabled="true" mode="dragAndDrop" />
						<DxSorting mode="multiple" /><!-- single, multiple, none" -->
						<DxPaging :page-size="10" />
						<DxFilterRow :visible="false" />
						<DxLoadPanel :enabled="false" />
						<DxGroupPanel :visible="true" :allow-column-dragging="true" />
						<DxGrouping :auto-expand-all="false" />
						<DxSummary>
							<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} Ondas" />
						</DxSummary>
						<DxPager
							:show-info="true"
							:show-page-size-selector="true"
							:show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="Página {0} de {1} ({2} Ondas)"
						/>
						<DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
						<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

						<DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" />

						<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" />

						<template #tplObs="{ data }">
							<a v-if="data.data.observation != '' && data.data.observation != null" :title="data.data.observation" class="cmd-item color-main-600 mr-2" @click.prevent="verObservar(data.data)" href="#" Target="_blank">
								<i class="icon-info mr-1"></i> Ver
							</a>
							<a v-else title="No dispone" class="cmd-item color-main-600 mr-2" href="#">-</a>
						</template>

						<template #tpl="{ data }">
							<span class="cmds">
								<a title="Editar Ondas..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
									<i class="icon-database-edit"></i>
								</a>
								<!-- 
									202103101633: Condicial para activación
									event.preventDefault()
								-->
								<a v-if="data.data.active" title="Desactivar Ondas..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
									<i class="icon-database-remove"></i>
								</a>
								<a v-else title="Activar Ondas..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
				{{ JSON.stringify(ondas_program, null, "\t") }}
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
import { DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator } from "devextreme-vue/validator";
import { DxFileUploader, DxSelectBox, DxSwitch, DxButton, DxTagBox, DxTextBox, DxTextArea, DxValidationGroup } from "devextreme-vue";
import { mapState, mapActions, mapGetters } from "vuex";
// DxDateBox,
// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "",
	components: {
		// Commands,
		DxButton,
		DxFileUploader,
		DxColumn,
		DxColumnChooser,
		DxDataGrid,
		// DxDateBox,
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
		DxSwitch,
		DxTextArea,
		DxTextBox,
		DxValidator,
		// Geo: () => import("@/components/element/geo"),
	},
	props: {
		
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
		title: String,
	},
	data: () => ({
		editData: false, //sirve para dejar formulario en limpio o llenar datos
		items: [],
		grid: null,
		unidad: null,
		isValid: false,
		panelData: null,
		paneGrid: null,
		subtipos: [],
		// convocatorias: [
		//  	{
		//  		id: 1,
		//  		name: "3094 (2021)",
		//  	},
		//  	{
		//  		id: 2,
		//  		name: "4093 (2019)",
		//  	},
		//  ],
		baseEntity: null,
		docLink: null,
		firstLoad: true,
		now: new Date(),
		min: new Date(2000, 0, 1),
		ondas_program: {
			projects_name: null,
			colciencias_call_id: 2,
			registration_projects_approved: null,
			institution_project: null,
			category_id: 2,
			place_project: null,
			active: false,
			document: null,
			research_results: null,
			observation: null,
			created_by: 2,
		},
	}),

	mounted() {
		// console.clear();
		root = this;
		// root.loaderElement = "#panel-Ondas";
		// this.loaderElement = ".card-body";
		this.loaderElement = "#panel-unidades .card-body";
		this.loaderMessage = "Cargando Programa Ondas";
		root.panelData = $("#panel-Ondas .data");
		root.panelGrid = $("#panel-Ondas .grid");
		// console.clear();
		console.log("this.group.id", this.group.id);
		// this.loadShow();
		this.getSubtypes({
			typeId: 3,
			cb: function(result) {
				root.subtipos = result;
				console.log("subtipos", root.subtipos);
			},
		});
	},

	computed: {
		dataSource: function() {
			// console.clear();
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				endPoint: `research_units/${root.group.id}/ondas_programs`,
				// endPoint: `research_units/ondas_programs`,
				loadBaseEntity: false,
				onLoading: function(loadOptions) {
					root.loadShow();
					setTimeout(function() {
						root.scrollTop();
					}, 300);
				},
				onLoaded: function(result, baseEntity) {
					root.loaderHide();
				},
			});
		},
	},

	watch: {},

	methods: {
		...mapActions("tipo", ["getTypes", "getSubtypes"]),
		...mapActions("convocatoria", ["getConvocatoria"]),
		...mapActions("programaOndasjs", { ondas_programActive: "active" }),
		...mapActions("programaOndasjs", ["all", "saveChange", "updateChange"]),

		save() {
			let args = {
				unidadId: root.group.id,
				data: root.ondas_program,
			};

			if (this.editData) {
				//alert("usted va a editar datos");
				this.$alert("Datos editados con exito!");
			} else {
				//alert();
				//this.saveChange(args)
				console.log(this.ondas_program);
				this.$alert("Datos guardados con exito!");
			}

			this.editData = false;
			this.ondas_program = {};
			root.panelData.fadeOut(window.speed, function(params) {
				root.panelGrid.fadeIn(window.speed, function(params) {});
			});
		},

		edit(data) {
			if (data == null) this.editData = false;
			else this.editData = true;

			console.log("data", data);
			root.ondas_program = data;
			root.panelGrid.fadeOut(window.speed, function(params) {
				root.panelData.fadeIn(window.speed, function(params) {});
			});
		},

		cancel() {
			console.clear();
			console.log("CANCEL!");
			root.panelData.fadeOut(window.speed, function(params) {
				root.panelGrid.fadeIn(window.speed, function(params) {});
			});
		},

		fileReady(e) {
			// console.clear();
			// console.log(e);
			var el = $(e.element);
			el.find(".dx-fileuploader-upload-button,.dx-fileuploader-input-container").hide();
			var btn = el.find(".dx-fileuploader-button.dx-button-has-text:first");
			btn
				.removeClass("dx-fileuploader-button dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-text")
				.addClass("btn btn-main btn-sm btn-labeled btn-labeled-left legitRipple w-100");
			// console.log(btn.html());
			btn.html('<b><i class="icon-link"></i></b>' + btn.find(".dx-button-text").html());
			// btn-labeled btn-labeled-left legitRipple
			// el.find(".dx-fileuploader-button").hide();
		},

		fileSelected(e) {
			let doc = { name: e.element.id, file: e.value[0] };
			// this.setDocument(doc);
			// console.clear();
			console.log("doc", doc);
			// console.log(e);
			// var el = $(e.element);
			// var files = e.value;
			// if (files.length > 0) {
			// 	el.find(".btn").hide();
			// 	el.find(".dx-fileuploader-upload-button").hide();
			// 	el.find(".dx-fileuploader-input-wrapper").hide();
			// 	var ei = el.find(".dx-fileuploader-file-name");
			// 	// ei.html("<i class='icon-file-pdf'></i>&nbsp;" + ei.html());
			// 	var w = Math.round(el.parents(".form-grupo:first").width()) - 75;
			// 	// console.log("w", w);
			// 	// el.find(".dx-fileuploader-file-status-message").css({
			// 	//   width: "100%",
			// 	// });
			// 	ei.removeAttr("style").css({ "max-width": w + "px" });
			// } else {
			// 	el.find(".dx-fileuploader-input-wrapper").show();
			// 	el.find(".btn").show();
			// }
		},

		active(data, state) {
			console.clear();
			console.log("active", data);
			console.log("state", state);
			let a = state ? "activar" : "desactivar";
			let am = state ? "Activando" : "Desactivando";
			let msg = `¿Realmente desea ${a} <span class='text-sb'>"${data.data.title}"</span>?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderMessage = `${am}`;
					root.loadShow();
					var dto = {
						url: `research_units/${root.group.id}/ondas_programs/${data.data.id}/active`,
						ondas_program: {
							ondas_program: {
								active: state,
								updated_by: 1,
							},
						},
						cb: function(result) {
							console.log("Result", result);
							root.grid.refresh();
							root.loaderHide();
						},
					};
					console.log("dto", dto);
					root.ondas_programActive(dto);
				}
			});
		},

		gridInit(e) {
			this.grid = e.component;
		},

		onContentReady() {
			$(".commands a").click(function() {
				console.log("Come on lets show the dropdown!!");
			});
			var h = "<span class='mr-1 color-text d-none d-md-inline' id='column-chooser-text'>s</span> ";
			if ($("#column-chooser-text").length <= 0) $(".dx-datagrid-column-chooser-button").before(h);
			var b = "<span class='mr-1 color-text d-none d-md-inline' id='column-chooser-text'>s</span> ";
			if ($("#column-chooser-text").length <= 0) $(".dx-datagrid-column-chooser-button").before(b);
		},
	},
};
</script>
