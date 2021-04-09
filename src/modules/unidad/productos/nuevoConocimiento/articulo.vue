<template>
	<div class="col mt-3" id="panel-articulo" v-if="editMode">
		
		<div class="integ slide">
			<div class="page-header header-elements-md-inline">
				<div class="page-title d-flex">
					<h1>
						<i class="icon-users mr-1 color-main-600"></i>
						<span class="font-weight-semibold">Integrantes <small>{{editData}}</small></span>
					</h1>
				</div>
				<div class="header-elements">							
					<button type="button" @click.prevent="retorno('integ')" title="Regresar al listado" class="btn btn-main  " id="btn-add">
						<b><i class="dx-icon-chevrondoubleleft"></i></b> Regresar Seccion de Productos
					</button>
				</div>
			</div>
  			<Integrantes  id="panel-articulo-integrantes" ep="papers" :product-id="baseObj.id" />
		</div>
		
		<div class="docs slide">
			<div class="page-header header-elements-md-inline">
				<div class="page-title d-flex">
					<h1>
						<i class="icon-file-pdf mr-1 color-main-600"></i>
						<span class="font-weight-semibold">Documentos <small>{{editData}}</small></span>
					</h1>
				</div>
				<div class="header-elements">							
					<button type="button" @click.prevent="retorno('docs')" title="Regresar al listado" class="btn btn-main  " id="btn-add">
						<b><i class="dx-icon-chevrondoubleleft"></i></b> Regresar Seccion de Productos
					</button>
				</div>
			</div>
 			<Documentos id="panel-articulo-documentos" ep="papers" :product-id="baseObj.id" :tipos="tiposDocumento" />
		</div> 
		
		<DxValidationGroup ref="basicGroup">
			<div class="row data slide">
				<div class="col">
					<div class="card">
						<div class="card-header main">
							<i class="icon-pencil3 mr-1"></i>
							<span class="font-weight-semibold">{{ mode == "edit" ? "Editar" : "Crear" }} Artículo</span>
						</div>
						<div class="card-body mb-0 pb-0 pt-2">
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>Título del Artículo:</label>
										<DxTextBox placeholder="Titulo Articulo" class="form-control" :value.sync="baseObj.title">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>Nombre Revista:</label>
										<DxTextBox placeholder="Nombre Revista" class="form-control" :value.sync="baseObj.journal_name">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-2">
									<div class="form-group">
										<label>Categoría:</label>
										<DxSelectBox
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

								<div class="col-md-2">
									<div class="form-group">
										<label>Convocatoria Minciencias:</label>
										<DxSelectBox
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

								<div class="col-md-2">
									<div class="form-group">
										<label>Volumen:</label>
										<DxNumberBox placeholder="Volumen" class="form-control" :value.sync="baseObj.volume">
										</DxNumberBox>
									</div>
								</div>

								<div class="col-md-2">
									<div class="form-group">
										<label>Páginas:</label>
										<DxNumberBox placeholder="Cant Paginas" class="form-control" :value.sync="baseObj.number_of_pages">
										</DxNumberBox>
									</div>
								</div>

								<div class="col-md-2">
									<div class="form-group">
										<label>Pág. inicial:</label>
										<DxNumberBox placeholder="Pag Inicial" class="form-control" :value.sync="baseObj.initial_page">
										</DxNumberBox>
									</div>
								</div>

								<div class="col-md-2">
									<div class="form-group">
										<label>Pág. final:</label>
										<DxNumberBox placeholder="Pag Final" class="form-control" :value.sync="baseObj.final_page">>
										</DxNumberBox>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>ISSN:</label>
										<DxTextBox placeholder="ISSN" class="form-control" :value.sync="baseObj.issn">
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group">
										<label>Web Articulo:</label>
										<DxTextBox placeholder="Web Articulo" class="form-control" :value.sync="baseObj.url">
											<DxValidator>
												<!-- <DxRequiredRule />  -->
												<DxPatternRule message="Por favor Ingrese la Pagina WEB con los datos completos Ej: http://miweb.com/articulo" :pattern="urlPattern" />
											</DxValidator>
										</DxTextBox>
									</div>
								</div>								


								<div class="col-md-4">
									<div class="form-group">
										<label>DOI:</label>
										<DxTextBox placeholder="DOI" class="form-control" :value.sync="baseObj.doi">
										</DxTextBox>
									</div>
								</div>

								<div class="col-md-2">
									<div class="form-group">
										<label>Fecha Aprobación:</label>
										<DxDateBox
											class="form-control"
											name="approval_date"
											:value.sync="baseObj.approval_date"
											id="approval_date"
											placeholder="DD/MM/YYYY"
											display-format="dd/MM/yyyy"
											:min="minDate"
											:max="actualDate"
											type="date"
										>
										</DxDateBox>
									</div>
								</div>

								<div class="col-md-2">
									<div class="form-group">
										<label>Fecha Publicación:</label>
										<DxDateBox
											class="form-control"
											name="publication_date"
											:value.sync="baseObj.publication_date"
											id="publication_date"
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

								<div class="col-md-2">
									<div class="form-group">
										<label>Tipo de Artículo:</label>
										<DxSelectBox
											:grouped="false"
											:search-enabled="false"
											placeholder="Seleccione..."
											:value.sync="baseObj.paper_type_id"
											class="form-control"
											:data-source="tipos"
											display-expr="st_name"
											value-expr="id"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxSelectBox>
									</div>
								</div>

								<div class="col-md-6"><Geo :lockElement="loaderElement" :syncObject="baseObj" /></div>

								<div class="col-md-12">
									<div class="form-group">
										<label>Observaciones:</label>
										<DxTextArea :height="100" :max-length="400" :value.sync="baseObj.observation" placeholder="Observaciones" class="form-control" />
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
		</DxValidationGroup>

		<div class="row grid">
			
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline">
						<div class="page-title d-flex">
							<h1>
								<i class="icon-grid3 mr-1 color-main-600"></i>
								<span class="font-weight-semibold">Articulos</span>
							</h1>
						</div>
						<div class="header-elements">
							<span id="cmds">
								<button type="button" @click.prevent="add()" title="Nuevo Articulo.." class="btn btn-main btn-labeled btn-labeled-left " id="btn-add">
									<b><i class="icon-database-add"></i></b> Nuevo Articulo
								</button>
							</span>
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
							<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} articulos" />
						</DxSummary>
						<DxPager
							:show-info="true"
							:show-page-size-selector="true"
							:show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="Página {0} de {1} ({2} articulos)"
						/>
						<DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
						<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->
						<DxColumn data-field="id" caption="Id" data-type="int" alignment="center" :visible="true" :allow-grouping="false" />
						<DxColumn data-field="title" caption="Titulo" data-type="string" alignment="left" :visible="true" :allow-grouping="false" />
						<DxColumn data-field="journal_name" caption="Nombre Revista" data-type="string" alignment="left" :visible="true" :allow-grouping="true" />
						<DxColumn data-field="issn" caption="ISSN" data-type="string" alignment="center" :visible="true" :allow-grouping="false" />	
						<DxColumn data-field="publication_date" caption="Fecha Publicacion" data-type="date" alignment="center" :visible="true" :allow-grouping="true" />
						<DxColumn data-field="geo_city_name" caption="Ciudad" data-type="string" alignment="center" :visible="true" :allow-grouping="true" />

						<DxColumn data-field="approval_date" caption="Fecha Aprobacion" data-type="date" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="category_name" caption="Categoria" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="colciencias_call_name" caption="Colciencias" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="doi" caption="DOI" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn data-field="final_page" caption="pagina Final" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn data-field="geo_city_name" caption="Ciudad" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="geo_country_name" caption="Pais" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn data-field="geo_state_name" caption="Estado" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn data-field="initial_page" caption="Pagina inicial" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						
						<DxColumn data-field="number_of_pages" caption="Numero Paginas" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />
						<DxColumn data-field="observation" caption="Observacion" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						
						<DxColumn data-field="url" caption="WEB" data-type="string" alignment="center" :visible="false" :allow-grouping="false" />
						<DxColumn data-field="volume" caption="Volumen" data-type="string" alignment="center" :visible="false" :allow-grouping="true" />

						<DxColumn data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" />

						<DxColumn :width="150" alignment="center" cell-template="tpl" caption="" />
						<template #tpl="{ data }">
							<span class="cmds">
								
								<a v-if="data.data.url==''" title="No tiene Url" class="cmd-item color-main-600 mr-2"  href="#">
									-
								</a>
								<a v-else :title="data.data.url" class="cmd-item color-main-600 mr-2" :href="data.data.url" target="_blank">
									<i class="dx-icon-link"></i>
								</a>


								<a title="Observar documentos..." class="cmd-item color-main-600 mr-2" @click.prevent="documentos(data)" href="#">
									<i class="icon-file-pdf"></i>
								</a>
								<a title="Observar integrantes..." class="cmd-item color-main-600 mr-2" @click.prevent="integrantes(data)" href="#">
									<i class="icon-users"></i>
								</a>
								<a title="Editar articulo..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
									<i class="icon-database-edit"></i>
								</a>

								<a v-if="data.data.active" title="Desactivar articulo..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
									<i class="icon-database-remove"></i>
								</a>
								<a v-else title="Activar articulo..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
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
import { DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator, DxPatternRule } from "devextreme-vue/validator";
import { DxDateBox, DxSelectBox, DxButton, DxTagBox, DxTextBox, DxNumberBox, DxTextArea, DxValidationGroup } from "devextreme-vue";
import { mapState, mapActions, mapGetters } from "vuex";

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "articulo",
	components: {
		// Commands,
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
		Documentos: () => import("@/components/element/documentos"),
		Integrantes: () => import("@/components/element/integrantes"),
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
		editData: null, //sirve para dejar formulario en limpio o llenar datos
		items: [],
		grid: null,
		mode: null,
		unidad: null,
		tipos: [],
		tiposDocumento: [],
		subtipos: [],
		isValid: false,
		panelData: null,
		panelGrid: null,
		panelCmds: null,
		baseEntity: null,
		docLink: null,
		firstLoad: true,
		validationGroup: null,
		now: new Date(),
		baseEnt: null,
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		baseObj: {
			category_id: null,
			colciencias_call_id: null,
			journal_name: null,
			title: null,
			publication_date: null,
			approval_date: null,
			volume: null,
			number_of_pages: null,
			initial_page: null,
			final_page: null,
			issn: null,
			url: null,
			doi: null,
			paper_type_id: 1,
			observation: null,
			geo_city_id: null,
		},
	}),
	mounted() {
		// console.clear();
		root = this;
		root.baseEnt = this.$clone(this.baseObj);
		root.getConvocatorias();
		root.tipos = root.subtypesByType(5);
		root.subtipos = root.subtypesByType(12);
		root.tiposDocumento = root.subtypesByType(23);
		console.log("root.tipos", root.tipos);
		root.validationGroup = root.$refs.basicGroup.instance;
		this.loaderElement = "#panel-unidades .card-body";
		this.loaderMessage = "Cargando Articulos";
		root.panelData = $("#panel-articulo .data");
		root.panelGrid = $("#panel-articulo .grid");
		root.panelinteg = $("#panel-articulo .integ");
		root.paneldocs = $("#panel-articulo .docs");
		root.panelCmds = $("#panel-articulo #cmds");
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapState("unidad/colciencias", { convocatorias: "items" }),
		dataSource: function() {
			// console.clear();
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				endPoint: `research_units/${this.group.id}/papers`,
				// endPoint: `research_units/papers`,
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
		...mapActions("unidad/colciencias", { getConvocatorias: "getAll" }),
		...mapActions("unidad/producto/conocimiento/articulo", { objSave: "save", objUpdate: "update", elementoActive:"active" }),
		
		integrantes(data) {
			console.clear();
			console.log("integrantes", data.row.data);
			this.editData = data.row.data.title;
			root.baseObj = data.row.data;
			//root.baseObj = data;
			root.panelCmds.fadeOut(window.speed);
			root.panelGrid.fadeOut(window.speed, function(params) {
				root.panelinteg.fadeIn(window.speed, function(params) {});
			});
		},

		documentos(data) {
			console.clear();
			console.log("documentos", data.row.data);
			root.baseObj = data.row.data;
			this.editData = data.row.data.title;
			root.panelCmds.fadeOut(window.speed);
			root.panelGrid.fadeOut(window.speed, function(params) {
				root.paneldocs.fadeIn(window.speed, function(params) {});
			});
		},
		
		save() {
			console.log(this.$sep);
			var result = root.validationGroup.validate();
			console.log("result", result);
			if (result.isValid) {
				console.log("VALID!");
				root.scrollTop();
				root.panelCmds.fadeOut();
				// root.loadingElement = ;
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " Artículo";
				root.loadShow(msg, root.panelData);
				if (root.mode == "add") root.baseObj.created_by = root.user_id;
				if (root.mode == "edit") root.baseObj.updated_by = root.user_id;
				let dto = {
					unidadId: root.group.id,
					paper: root.baseObj,
					cb: function(item) {
						console.log("item", item);
						root.grid.refresh();
						root.loadHide();
						root.cancel();
					},
				};
				console.log("root.mode", root.mode);
				if (root.mode == "edit") root.objUpdate(dto);
				else root.objSave(dto);
			}
		},

		edit(data) {
			root.mode = "edit";
			console.log("data", data);
			root.baseObj = data;
			root.panelCmds.fadeOut(window.speed);
			root.panelGrid.fadeOut(window.speed, function(params) {
				root.panelData.fadeIn(window.speed, function(params) {});
			});
		},

		add() {
			console.log("ADD");
			root.mode = "add";
			root.baseObj = this.$clone(this.baseEnt);
			root.panelCmds.fadeOut(window.speed);
			root.panelGrid.fadeOut(window.speed, function(params) {
				root.panelData.fadeIn(window.speed, function(params) {});
			});
		},

		cancel() {
			console.log("CANCEL!");
			root.panelData.fadeOut(window.speed, function(params) {
				root.panelCmds.fadeIn(window.speed);
				root.panelGrid.fadeIn(window.speed, function(params) {});
			});
		},

		retorno(param) {
			if(param=='integ'){
				console.log("Regresar!");
				root.panelinteg.fadeOut(window.speed, function(params) {
					root.panelCmds.fadeIn(window.speed);
					root.panelGrid.fadeIn(window.speed, function(params) {});
				});
			}else{
				console.log("Regresar!");
				root.paneldocs.fadeOut(window.speed, function(params) {
					root.panelCmds.fadeIn(window.speed);
					root.panelGrid.fadeIn(window.speed, function(params) {});
				});
			}
			
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
					// root.loaderMessage = `${am} articulo <span class='text-sb'>"${data.data.title}"</span>`;
					root.loaderMessage = `${am}`;
					root.loadShow();
					var dto = {
						url: `research_units/${root.group.id}/papers/${data.data.id}/active`,
						paper: {
							paper: {
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
					root.elementoActive(dto);
					root.loadHide();
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
