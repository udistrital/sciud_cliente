<template>
	<div class="col mt-3" id="panel-Patente" v-if="editMode">
		<div class="row data slide">
			<div class="col">
				<div class="card">
					<div class="card-header main">
						<i class="icon-pencil3 mr-1 color-main-600"></i>
						<span class="font-weight-semibold">{{ editData ? "Editar" : "Crear" }} Patente</span>
					</div>
					<div class="card-body mb-0 pb-0 pt-2">
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>Titulo: </label>
									<DxTextBox placeholder="Titulo" class="form-control" :value.sync="patent.title">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>

							<div class="col-md-3">
								<div class="form-group">
									<label>Numero Patente: </label>
									<DxTextBox placeholder="Numero Patente" class="form-control" :value.sync="patent.patent_number">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>

							<div class="col-md-3">
								<div class="form-group">
									<label>Gaceta: </label>
									<DxTextBox placeholder="Gaceta" class="form-control" :value.sync="patent.industrial_publication_gazette">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>

							<div class="col-md-2">
								<div class="form-group">
									<label>Categoria: </label>
									<DxSelectBox
										:grouped="false"
										:search-enabled="false"
										placeholder="Seleccione..."
										:value.sync="patent.category_id"
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

							<div class="col-md-2">
								<div class="form-group">
									<label>Convocatoria: </label>
									<DxSelectBox
										:grouped="false"
										:search-enabled="false"
										placeholder="Seleccione..."
										:value.sync="patent.colciencias_call_id"
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

							<div class="col-md-6"><Geo :lockElement="loaderElement" :syncObject="patent" /></div>
							<div class="col-md-6">
								<div class="form-group">
									<label>fecha de Obtencion: </label>
									<DxDateBox
										class="form-control"
										name="date_of_obtaining"
										:value.sync="patent.date_of_obtaining"
										id="date_of_obtaining"
										placeholder="yyyy-mm-dd"
										display-format="yyyy-MM-dd"
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

							<div class="col-md-3">
								<div class="form-group">
									<label>Registro Patente: </label>
									<DxSelectBox
										:grouped="false"
										:search-enabled="false"
										placeholder="Seleccione..."
										:value.sync="patent.patent_state_id"
										class="form-control"
										:data-source="subtipos"
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
									<label>Activo: </label>
									<DxSwitch :value.sync="patent.active" switched-on-text="SI" switched-off-text="NO" />
								</div>
							</div>

							<div class="col-md-12">
								<div class="form-group">
									<label>Observaciones: </label>
									<DxTextArea :height="100" :max-length="400" :value.sync="patent.observation" placeholder="Observaciones" class="form-control">
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
								<DxButton @click="save" class="nb">
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
								<span class="font-weight-semibold">Patentes</span>
							</h1>
						</div>
						<div class="header-elements">
							<button type="button" @click.prevent="edit()" title="nueva Patente.." class="btn btn-main btn-labeled btn-labeled-left " id="btn-add">
								<b><i class="icon-database-add"></i></b> nueva Patente
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
							<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} Patentes" />
						</DxSummary>
						<DxPager
							:show-info="true"
							:show-page-size-selector="true"
							:show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="Página {0} de {1} ({2} Patentes)"
						/>
						<DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
						<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

						<DxColumn data-field="title" width="15%" caption="Titulo" data-type="string" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn data-field="category_name" caption="Categoria" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="patent_number" caption="Numero Patente" data-type="string" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn
							data-field="industrial_publication_gazette"
							caption="Gaceta de Pub"
							data-type="string"
							alignment="center"
							:visible="true"
							:allow-grouping="false"
						/>
						<DxColumn data-field="date_of_obtaining" caption="Fecha de Obtencion" data-type="date" alignment="center" :visible="true" :allow-grouping="ftrue" />
						<DxColumn data-field="observation" caption="Observaciones" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn data-field="patent_state_name" caption="Registro patente" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="colciencias_call_name" caption="Convocatoria" data-type="string" alignment="center" :visible="true" :allow-grouping="true" />

						<DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" />

						<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" />
						<template #tpl="{ data }">
							<span class="cmds">
								<a title="Editar Patente..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
									<i class="icon-database-edit"></i>
								</a>
								<!-- 
											202103101633: Condicial para activación
											event.preventDefault()
										-->
								<a v-if="data.data.active" title="Desactivar Patente..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
									<i class="icon-database-remove"></i>
								</a>
								<a v-else title="Activar Patente..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
				{{ JSON.stringify(patent, null, "\t") }}
			</div>
		</div>
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
import { DxDateBox, DxSelectBox, DxSwitch, DxButton, DxTagBox, DxTextBox, DxTextArea, DxValidationGroup } from "devextreme-vue";
import { mapState, mapActions, mapGetters } from "vuex";
//DxFileUploader
// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "Patente",
	components: {
		// Commands,
		DxButton,
		// DxFileUploader,
		DxColumn,
		DxColumnChooser,
		DxDataGrid,
		DxDateBox,
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
		Geo: () => import("@/components/element/geo"),
	},
	props: {
		editMode: {
			type: Boolean,
			default: true,
		},
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
		// 	{
		// 		id: 1,
		// 		name: "3094 (2021)",
		// 	},
		// 	{
		// 		id: 2,
		// 		name: "4093 (2019)",
		// 	},
		// ],
		baseEntity: null,
		docLink: null,
		firstLoad: true,
		now: new Date(),
		min: new Date(2000, 0, 1),
		patent: {
			category_id: 2,
			colciencias_call_id: 1,
			patent_number: null,
			title: null,
			date_of_obtaining: null,
			geo_country_ids: null,
			industrial_publication_gazette: null,
			patent_state_id: 2,
			observation: null,
			created_by: 1,
		},
	}),
	mounted() {
		// console.clear();
		root = this;
		//this.getConvocatoria();
		// this.convocatorias=[{id:1,name:"bla bla"},{id:2,name:"bla bla bla"}];
		// root.loaderElement = "#panel-Patente";
		// this.loaderElement = ".card-body";
		this.loaderElement = "#panel-unidades .card-body";
		this.loaderMessage = "Cargando Patentes";
		root.panelData = $("#panel-Patente .data");
		root.panelGrid = $("#panel-Patente .grid");
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
		//...mapGetters("type", { tipos: "items" }),
		...mapGetters("convocatoria", ["convocatorias"]),
		//...mapState("unidad", ["loading"]),
		dataSource: function() {
			// console.clear();
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				endPoint: `research_units/${this.group.id}/patents`,
				// endPoint: `research_units/patents`,
				loadBaseEntity: false,
				onLoading: function(loadOptions) {
					root.loadShow();
					setTimeout(function() {
						root.scrollTop();
					}, 300);
				},
				onLoaded: function(result, baseEntity) {
					root.loadHide();
				},
			});
		},
	},
	watch: {},
	methods: {
		...mapActions("core/tipo", ["getTypes", "getSubtypes"]),
		...mapActions("convocatoria", ["getConvocatoria"]),
		...mapActions("patente", { patentActive: "active" }),

		save() {
			if (this.editData) {
				//alert("usted va a editar datos");
				this.$alert("Datos editados con exito!");
			} else {
				//alert();
				this.$alert("Datos guardados con exito!");
			}

			this.editData = false;
			this.patent = {};
			root.panelData.fadeOut(window.speed, function(params) {
				root.panelGrid.fadeIn(window.speed, function(params) {});
			});
		},

		edit(data) {
			if (data == null) this.editData = false;
			else this.editData = true;

			console.log("data", data);
			root.patent = data;
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
					// root.loaderMessage = `${am} Patente <span class='text-sb'>"${data.data.title}"</span>`;
					root.loaderMessage = `${am}`;
					root.loadShow();
					var dto = {
						url: `research_units/${root.group.id}/patents/${data.data.id}/active`,
						patent: {
							patent: {
								active: state,
								updated_by: 1,
							},
						},
						cb: function(result) {
							console.log("Result", result);
							root.grid.refresh();
							root.loadHide();
							// root.cancel(validationGroup);
							// $("#data").fadeOut(window.speed, function () {
							// $("#grid").fadeIn(window.speed, function () {});
							// });
						},
					};
					console.log("dto", dto);
					root.patentActive(dto);
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
