<template>
	<div class="col mt-3" id="panel-capitulo" v-if="editMode">
		<div class="row data slide">
			<div class="col">
				<div class="card">
					<div class="card-header main">
						<i class="icon-pencil3 mr-1 color-main-600"></i>
						<span class="font-weight-semibold">{{ editData ? "Editar" : "Crear" }} Capitulo de Libro</span>
					</div>
					<div class="card-body mb-0 pb-0 pt-2">
						<div class="row">
							<div class="col-md-4">
								<div class="form-group">
									<label>Fecha Publicación: </label>
									<DxDateBox
										class="form-control"
										name="publication_date"
										:value.sync="book_chapter.publication_date"
										id="publication_date"
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

							<div class="col-md-4">
								<div class="form-group">
									<label>Titulo capitulo: </label>
									<DxTextBox placeholder="Titulo capitulo" class="form-control" :value.sync="book_chapter.book_title">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>

							<div class="col-md-4">
								<div class="form-group">
									<label>Titulo Capitulo: </label>
									<DxTextBox placeholder="Titulo Capitulo" class="form-control" :value.sync="book_chapter.title">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>

							<div class="col-md-4">
								<div class="form-group">
									<label>Nombre Editorial: </label>
									<DxTextBox placeholder="Nombre Editorial" class="form-control" :value.sync="book_chapter.editorial_name">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>

							<div class="col-md-4">
								<div class="form-group">
									<label>DOI: </label>
									<DxTextBox placeholder="DOI" class="form-control" :value.sync="book_chapter.doi">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>

							<div class="col-md-2">
								<div class="form-group">
									<label>Colciencias: </label>
									<DxSelectBox
										:grouped="false"
										:search-enabled="false"
										placeholder="Seleccione..."
										:value.sync="book_chapter.colciencias_call_id"
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

							<div class="col-md-2">
								<div class="form-group">
									<label>Categoría: </label>
									<DxSelectBox
										:grouped="false"
										:search-enabled="false"
										placeholder="Seleccione..."
										:value.sync="book_chapter.category_id"
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

							<div class="col-md-6"><Geo :lockElement="loaderElement" :syncObject="book_chapter" /></div>
							<div class="col-md-4">
								<div class="form-group">
									<label>ISBN: </label>
									<DxTextBox placeholder="ISBN" class="form-control" :value.sync="book_chapter.isbn">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>

							<div class="col-md-2">
								<div class="form-group">
									<label>Activo: </label>
									<DxSwitch :value.sync="book_chapter.active" switched-on-text="SI" switched-off-text="NO" />
								</div>
							</div>

							<div class="col-md-4">
								<div class="form-group">
									<label>Web: </label>
									<DxTextBox placeholder="Web" class="form-control" :value.sync="book_chapter.url">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>

							<div class="col-md-12">
								<div class="form-group">
									<label>Observación: </label>
									<DxTextArea :height="100" :max-length="400" :value.sync="book_chapter.observation" placeholder="Observación" class="form-control">
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
								<span class="font-weight-semibold">Capitulo de Libros</span>
							</h1>
						</div>
						<div class="header-elements">
							<button type="button" @click.prevent="edit()" title="Nuevo Capitulo de Libro.." class="btn btn-main btn-labeled btn-labeled-left " id="btn-add">
								<b><i class="icon-database-add"></i></b> Nuevo Capitulo de Libro
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
							<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} capitulos" />
						</DxSummary>
						<DxPager
							:show-info="true"
							:show-page-size-selector="true"
							:show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="Página {0} de {1} ({2} capitulos)"
						/>
						<DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
						<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

						<DxColumn data-field="isbn" caption="ISBN" data-type="string" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn
							data-field="book_title"
							width="20%"
							caption="Titulo capitulo"
							data-type="string"
							alignment="center"
							:visible="true"
							:allow-grouping="false"
						/>
						<DxColumn data-field="title" width="10%" caption="Titulo Capitulo" data-type="string" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn data-field="category_name" caption="Categoría" data-type="string" alignment="center" :visible="true" :allow-grouping="true" />
						<DxColumn data-field="doi" caption="DOI" data-type="string" alignment="center" :visible="true" :allow-grouping="true" />
						<DxColumn data-field="colciencias_call_name" caption="Convocatoria" data-type="string" alignment="center" :visible="true" :allow-grouping="true" />
						<DxColumn data-field="editorial_name" caption="Nombre Editorial" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="geo_city_name" caption="Ciudad" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="geo_country_name" caption="País" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="geo_state_name" caption="Estado" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="observation" caption="Observación" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn data-field="publication_date" caption="Fecha Publicación" data-type="date" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn data-field="url" caption="Web" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />

						<DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" />

						<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" />
						<template #tpl="{ data }">
							<span class="cmds">
								<a title="Editar capitulo..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
									<i class="icon-database-edit"></i>
								</a>
								<!-- 
											202103101633: Condicial para activación
											event.preventDefault()
										-->
								<a v-if="data.data.active" title="Desactivar capitulo..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
									<i class="icon-database-remove"></i>
								</a>
								<a v-else title="Activar capitulo..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
				{{ JSON.stringify(book_chapter, null, "\t") }}
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
	name: "capitulo",
	components: {
		// Commands, DxFileUploader
		DxButton,
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
		book_chapter: {
			book_title: null,
			title: null,
			category_id: null,
			colciencias_call_id: 1,
			doi: null,
			editorial_name: null,
			geo_city_id: null,
			isbn: null,
			publication_date: null,
			url: null,
			observation: null,
			created_by: 1,
			updated_by: 1,
		},
	}),
	mounted() {
		// console.clear();
		root = this;
		//this.getConvocatoria();
		// this.convocatorias=[{id:1,name:"bla bla"},{id:2,name:"bla bla bla"}];
		// root.loaderElement = "#panel-capitulo";
		// this.loaderElement = ".card-body";
		this.loaderElement = "#panel-unidades .card-body";
		this.loaderMessage = "Cargando capitulos";
		root.panelData = $("#panel-capitulo .data");
		root.panelGrid = $("#panel-capitulo .grid");
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
				endPoint: `research_units/${this.group.id}/book_chapters`,
				// endPoint: `research_units/book_chapters`,
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
		...mapActions("capitulo", { bookchapterActive: "active" }),

		save() {
			if (this.editData) {
				//alert("usted va a editar datos");
				this.$alert("Datos editados con exito!");
			} else {
				//alert();
				this.$alert("Datos guardados con exito!");
			}

			this.editData = false;
			this.book_chapter = {};
			root.panelData.fadeOut(window.speed, function(params) {
				root.panelGrid.fadeIn(window.speed, function(params) {});
			});
		},

		edit(data) {
			if (data == null) this.editData = false;
			else this.editData = true;

			console.log("data", data);
			root.book_chapter = data;
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
					// root.loaderMessage = `${am} capitulo <span class='text-sb'>"${data.data.title}"</span>`;
					root.loaderMessage = `${am}`;
					root.loadShow();
					var dto = {
						url: `research_units/${root.group.id}/book_chapters/${data.data.id}/active`,
						book_chapter: {
							book_chapter: {
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
					root.bookchapterActive(dto);
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
