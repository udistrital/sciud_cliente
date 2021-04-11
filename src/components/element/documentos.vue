<template>
	<div class="col p-3" id="producto-documentos">
		<DxValidationGroup ref="basicGroup">
			<div class="row dataDoc slidex" v-if="editMode">
				<div class="col">
					<div class="card">
						<div class="card-header main">Agregar Documento</div>
						<div class="card-body mb-0 pb-0 pt-3">
							<DxValidationGroup ref="vGroup">
								<div class="row">
									<div class="col-md-3">
										<div class="form-group">
											<label>Tipo:</label>
											<DxSelectBox
												:grouped="false"
												:data-source="tipos"
												:value.sync="baseObj.document_type_id"
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
									<div class="col-md-6">
										<div class="form-group">
											<label>Nombre:</label>
											<DxTextBox :value.sync="baseObj.doc_name" placeholder="Nombre(s)" class="form-control" :read-only="false" mode="text">
												<DxValidator>
													<DxRequiredRule />
												</DxValidator>
											</DxTextBox>
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
											<label>Doc. de constitución:</label>
											<a href="#" target="_blank" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
												<b><i class="icon-link"></i></b> DOCUMENTO ACTUAL
											</a>
											<DxFileUploader
												label-text=""
												upload-mode="useForm"
												accept="document/*.pdf"
												:max-file-size="4000000"
												id="establishment_document"
												select-button-text="CAMBIAR"
												:allowed-file-extensions="['.pdf']"
												@valueChanged="fileSelected($event, 108)"
												@contentReady="fileReady($event)"
											>
												<!-- <DxValidator>
												<DxRequiredRule />
											</DxValidator> -->
											</DxFileUploader>
										</div>
									</div>
								</div>
							</DxValidationGroup>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col">
									<DxButton @click="userCancel" class="nb">
										<template #default>
											<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
												<b><i class="icon-database-remove"></i></b> CANCELAR
											</span>
										</template>
									</DxButton>
								</div>
								<div class="col text-right">
									<DxButton @click="docSave" class="nb">
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
		<div class="row gridDoc">
			<div class="col">
				<div class="page-header header-elements-md-inline">
					<div class="page-title d-flex">
						<h2>
							<i class="icon-database mr-1 color-main-600"></i>
							<span class="font-weight-semibold">Documentos Guardados</span>
						</h2>
					</div>
					<div class="header-elements">
						<button type="button" @click.prevent="documentAdd()" title="Regresar al listado" class="btn btn-main  " id="btn-add">
							<b><i class="dx-icon-chevrondoubleleft"></i></b> Agregar Documento
						</button>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<DxDataGrid
							class="main"
							width="100%"
							:dataSource="dataSource"
							@initialized="gridInit"
							@content-ready="onContentReady"
							:allow-column-reordering="false"
							:remote-operations="true"
							:hover-state-enabled="true"
							:row-alternation-enabled="true"
							:show-borders="false"
						>
							<DxExport :enabled="false" />
							<DxColumnChooser :enabled="true" mode="dragAndDrop" />
							<DxSorting mode="multiple" /><!-- single, multiple, none" -->
							<DxPaging :page-size="10" />
							<!-- <DxFilterRow :visible="false" /> -->
							<DxLoadPanel :enabled="false" />
							<DxGroupPanel :visible="true" :allow-column-dragging="true" />
							<DxGrouping :auto-expand-all="false" />
							<DxSummary>
								<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
							</DxSummary>
							<DxPager
								:show-info="true"
								:show-page-size-selector="true"
								:show-navigation-buttons="true"
								:allowed-page-sizes="dgPageSizes"
								info-text="Página {0} de {1} ({2} integrantes en el grupo)"
							/>
							<DxSearchPanel :visible="true" :highlight-case-sensitive="false" />
							<DxColumn
								:allow-grouping="false"
								:allow-filtering="false"
								:allow-search="false"
								:allow-sorting="true"
								:width="120"
								alignment="center"
								caption="ID"
								data-field="id"
								data-type="string"
							/>

							<DxColumn
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="false"
								:customize-text="nullText"
								alignment="center"
								caption="Nombre"
								data-field="doc_name"
								data-type="string"
							/>

							<DxColumn
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="false"
								:customize-text="nullText"
								alignment="center"
								caption="Tamaño"
								data-field="doc_size"
								data-type="string"
							/>

							<DxColumn
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="false"
								:customize-text="nullText"
								alignment="center"
								caption="Tipo de Doc"
								data-field="document_type_name"
								data-type="string"
							/>

							<DxColumn
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="false"
								:customize-text="nullText"
								alignment="center"
								caption="Ruta"
								data-field="doc_path"
								data-type="string"
							/>
							<!-- :customize-text="$formatDocument" -->
							<!-- <DxColumn
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="false"
								alignment="center"
								caption="Documento"
								data-field="researcher.identification_number"
								:customize-text="$formatDocument"
								data-type="string"
							/>
							<DxColumn
								:allow-filtering="true"
								:allow-sorting="true"
								:allow-grouping="false"
								:customize-text="nullText"
								alignment="center"
								caption="Nombre"
								data-field="oas_details.TerceroId.NombreCompleto"
								data-type="string"
							/>
							<DxColumn
								:allow-filtering="false"
								:allow-sorting="true"
								:customize-text="nullText"
								alignment="center"
								caption="Rol"
								data-field="role_name"
								data-type="string"
							/> -->
							<DxColumn :width="100" data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" />

							<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editMode" />
							<template #tpl="{ data }">
								<span class="cmds">
									<a title="Editar usuario..." class="cmd-item color-main-600" @click.prevent="userEdit(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a>
									<!-- <a v-if="data.data.active" title="Desactivar usuario..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
										<i class="icon-database-remove"></i>
									</a>
									<a v-else title="Activar usuario..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
										<i class="icon-database-check"></i>
									</a> -->
								</span>
							</template>
						</DxDataGrid>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root, cmds;
let gridSize = 15;
let $ = window.jQuery;
import { mapGetters, mapActions } from "vuex";
import {
	DxColumn,
	DxColumnChooser,
	DxExport,
	DxDataGrid,
	DxGrouping,
	DxGroupItem,
	DxGroupPanel,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { DxButton, DxSelectBox, DxSwitch, DxTextBox, DxNumberBox, DxValidationGroup, DxFileUploader } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import DxStore from "@/store/dx";
export default {
	name: "datosBasicos",
	components: {
		DxTextBox,
		DxButton,
		DxFileUploader,
		DxColumn,
		DxColumnChooser,
		DxDataGrid,
		DxExport,
		// DxFilterRow,
		DxValidationGroup,
		DxGrouping,
		DxGroupItem,
		DxGroupPanel,
		DxLoadPanel,
		DxNumberBox,
		DxNumberBoxButton,
		DxPager,
		DxPaging,
		DxRequiredRule,
		DxSearchPanel,
		DxSelectBox,
		DxSorting,
		DxSummary,
		DxSwitch,
		DxValidator,
	},
	data: () => ({
		baseEnt: null,
		editDoc: false,
		isValid: false,
		btnCancel: null,
		btnAdd: null,
		grid: null,
		loading: false,
		groupResearchers: [],
		panelDataDoc: null,
		panelGridDoc: null,
		panelCmds: null,
		baseObj: {
			doc_name: null,
			doc_path: "/documents/papers/artiiculo_de_pruebas_demo_2021%.pdf",
			doc_size: 427751,
			document_type_id: null,
			created_by: 2,
		},
		dsMembers: new DataSource({
			store: new CustomStore({
				key: "id",
				loadMode: "processed", // "raw",
				load: (loadOptions) => {
					console.log("loadOptions", loadOptions);
					return root.groupResearchers;
				},
				onLoaded: function(result) {
					console.log("onLoaded", result);
					$("#producto-integrantes .card-body").show();
				},
			}),
		}),
	}),
	mounted() {
		root = this;
		root.panelDataDoc = $("#producto-documentos .dataDoc");
		root.panelGridDoc = $("#producto-documentos .gridDoc");
		root.baseEnt = this.$clone(root.baseObj);
		console.log(root.$sep);
		root.loaderElement = "#panel-unidades .card-body";
		console.log("Documents MOUNTED!");
	},
	computed: {
		...mapGetters("unidad", ["researchers"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
		dataSource: function() {
			//console.clear();
			// console.log("tipo", tipo);
			console.log("root.baseObj", root.baseObj);
			return DxStore({
				key: ["id"],
				endPoint: `${this.ep}/${this.productId}/documents`,
				// endPoint: `research_units/papers`,
				loadBaseEntity: false,
				onLoading: function() {
					root.loadShow();
					setTimeout(function() {
						root.scrollTop();
					}, 300);
				},
				onLoaded: function(results) {
					console.log("results", results);
					root.loadHide();
				},
			});
		},
	},
	props: {
		editMode: {
			type: Boolean,
			default: true,
		},
		ep: {
			type: String,
			default: () => null,
		},
		tipos: {
			type: Array,
			default: () => [],
		},
		productId: {
			type: Number,
			default: () => 19,
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
	methods: {
		// ...mapActions("auth/usuario", ["getUser", "getOasUsers", "getOasUser"]),
		...mapActions("unidad/documentos", ["save", "update", "documents"]),
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
			btn.html('<b><i class="icon-file-pdf"></i></b>' + btn.find(".dx-button-text").html());
			// btn-labeled btn-labeled-left legitRipple
			// el.find(".dx-fileuploader-button").hide();
			// console.log("fileReady", e);
		},
		fileSelected(e, document_type_id) {
			console.log("e", e);
			var files = e.value;
			// 202104070926: Obtiene los tipos de documento y filtra por el id
			var type = root.subtypesByType(22).find((o) => o.id === document_type_id);
			let doc = { type_id: document_type_id, type_name: type.st_name, name: e.element.id, file: e.value[0] };
			this.setDocument(doc);
			// console.log(e);
			var el = $(e.element);
			var msg = el.find(".dx-fileuploader-files-container");
			console.log("msgs", msg);
			if (files.length > 0) {
				msg.show();
			} else {
				msg.hide();
			}
		},
		userEdit(data) {
			//console.clear();
			console.log("data", data);
			//root.baseObj=root.baseEnt;
			this.editDoc = true;
			root.baseObj = data;
			root.panelGridDoc.fadeOut(window.speed, function(params) {
				root.panelDataDoc.fadeIn(window.speed, function(params) {});
			});
		},
		documentAdd() {
			this.editDoc = false;
			root.baseObj = root.baseEnt;
			root.panelGridDoc.fadein(window.speed, function(params) {
				root.panelDataDoc.fadeOut(window.speed, function(params) {});
			});
		},
		userCancel() {
			$("#producto-integrantes-data").fadeOut(window.speed, function() {
				$("#producto-integrantes-grid").fadeIn(window.speed, function() {});
			});
		},
		// async userSave() {
		// 	root.baseObj.created_by = root.user_id;
		// 	console.log("Obj", root.baseObj);
		// 	var result = this.$refs.vGroup.instance.validate();
		// 	console.log("result", result);
		// 	if (result.isValid) {
		// 		root.loadShow("Buscando usuario", "#data .card-body");
		// 		let r = await root.saveUser(root.baseObj);
		// 		console.log("Saved", r);
		// 		root.loadHide();
		// 		root.grid.refresh();
		// 		root.$info(`El usuario con el documento "${root.baseObj.identification_number}" se asoció exitosamente!`, function() {
		// 			root.cancel();
		// 		});
		// 	}
		// },

		loadEnd() {
			this.loadHide();
			this.loading = false;
			cmds = $("#producto-integrantes .row.cmds");

			// 202103162325: Botón asociar
			let c = this.btnAdd;
			if (c === null) {
				c = cmds.find(".add").first();
				c.hide();
				cmds.hide();
				var toolbar = $("#producto-integrantes .dx-toolbar-after").first();
				if (toolbar.length > 0) {
					if (!c.is(":visible")) {
						console.log(toolbar);
						toolbar.append(c);
						c.click(this.documentAdd).fadeIn();
					}
				}
			}

			// 202103162325: Botón asociar
			let b = this.btnCancel;
			if (b === null) {
				b = cmds
					.find(".cancel")
					.first()
					.clone();
				b.hide();
				cmds.hide();
			}
			var pager = $("#producto-integrantes .dx-page-sizes");
			if (pager.length > 0) {
				if (!b.is(":visible")) {
					// console.clear();
					console.log(pager);
					pager.before(b);
					b.click(this.cancelFn).fadeIn();
				}
			} else {
				cmds.fadeIn();
			}
		},
		docSave() {
			console.log("Entrando a metodo de guardado de datos");
			// let data="int";
			let objectSent = {};
			let point = "documents";
			var result = false;
			if (root.editDoc) {
				point = `${this.ep}/${this.productId}/${point}/${root.baseObj.id}`;
			} else {
				point = `${this.ep}/${this.productId}/${point}`;
			}
			objectSent = root.baseObj;

			result = root.$refs.vGroup.instance.validate();
			if (result.isValid) {
				root.loadShow();
				var dto = {
					url: point,
					obj: objectSent,
					cb: function(result) {
						console.log("Result", result);
						root.grid.refresh();
						root.loadHide();
					},
				};
				console.log("dto", dto);
				root.grid.refresh();
				if (root.editDoc) root.update(dto);
				else root.save(dto);
				root.loadHide();
			}
			console.log("dto");
			root.baseObj = root.baseEnt;
			this.editDoc = false;
		},

		onContentReady(e) {
			$(".commands a").click(function() {
				console.log("Come on lets show the dropdown!!");
			});
			var h = "<span class='mr-1 color-text d-none d-md-inline' id='column-chooser-text'>s</span> ";
			if ($("#column-chooser-text").length <= 0) $(".dx-datagrid-column-chooser-button").before(h);
			var b = "<span class='mr-1 color-text d-none d-md-inline' id='column-chooser-text'>s</span> ";
			if ($("#column-chooser-text").length <= 0) $(".dx-datagrid-column-chooser-button").before(b);
		},
		cancel() {
			return null;
		},
		gridInit(e) {
			console.log("e", e);
			this.grid = e.component;
			this.loadEnd();
		},

		onOptionChanged() {
			// console.log("e", e);
		},
		// onContentReady(e) {
		// 	console.log("e", e);
		// 	if (!root.loading) {
		// 		root.loading = true;
		// 		root.loadShow("Cargando integrantes", $("#panel-unidades .card-body")[0]);
		// 		let items = [];
		// 		root.grid
		// 			.getVisibleRows()
		// 			.filter((o) => o.rowType === "data")
		// 			.forEach((row) => {
		// 				if (!("oas_details" in row.data)) items.push(row.data);
		// 			});
		// 		if (items.length > 0) {
		// 			root.getOasUsers({
		// 				users: items,
		// 				field: "researcher.identification_number",
		// 				cb: function(result) {
		// 					console.log(root._sep);
		// 					console.log("RESULTADOS", result);
		// 					root.grid.getVisibleRows().forEach((row) => {
		// 						console.log("row", row);
		// 						if (row.rowType === "data") {
		// 							var filtered = result.filter((o) => o.id === row.data.id);
		// 							if (filtered.length > 0) {
		// 								Object.assign(row.data, filtered[0]);
		// 								root.grid.repaintRows([row.rowIndex]);
		// 							}
		// 						}
		// 					});
		// 					root.loadEnd();
		// 				},
		// 			});
		// 		} else {
		// 			root.loadEnd();
		// 		}
		// 	}
		// },
	},
};
</script>
