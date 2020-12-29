<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-books mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">Unidades de Investigación</span>
					<span id="msg"></span>
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>
			<div class="header-elements">
				<button
					type="button"
					@click="add()"
					title="Nueva Unidad de Investigación..."
					class="btn btn-main btn-labeled btn-labeled-left legitRipple slide"
					id="btn-add"
				>
					<b><i class="icon-database-add"></i></b> Nueva Unidad
				</button>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="card" id="data-container">
					<div class="card-body pt-3 grid">
						<!-- <a @click.prevent="upload" href="#" class="font-weight-semibold color-main-600">Upload</a>
						<span v-if="docLink">
							&raquo; <a :href="docLink" target="_blank" class="font-weight-semibold color-main-600">Browse</a></span
						> -->
						<div id="data" class="slide" v-if="unidad">
							<Unidad ref="Unidad" :group="unidad" :parent="this" :documents="documentos" :saveFn="save" :cancelFn="cancel" />
						</div>
						<div id="grid">
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
								<DxPaging :page-size="15" />
								<DxFilterRow :visible="false" />
								<DxLoadPanel :enabled="false" />
								<DxGroupPanel :visible="true" :allow-column-dragging="true" />
								<DxGrouping :auto-expand-all="false" />
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} unidades" />
								</DxSummary>
								<DxPager
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="[15, 30, 50]"
									info-text="Página {0} de {1} ({2} unidades de investigación)"
								/>
								<DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
								<DxColumn
									:sort-index="1"
									sort-order="asc"
									:allow-filtering="false"
									data-field="id"
									caption="Id"
									data-type="int"
									alignment="center"
									:allow-sorting="true"
									:width="70"
								/>
								<DxColumn data-field="group_type_name" caption="Tipo" data-type="string" alignment="left" :visible="true" :width="170" />
								<DxColumn data-field="name" caption="Nombre" data-type="string" alignment="left" :visible="true" cell-template="titleCase" />
								<DxColumn :visible="false" data-field="acronym" caption="Acrónimo" data-type="string" alignment="center" :width="100" cell-template="tplNull" />
								<DxColumn
									:visible="false"
									data-field="cidc_registration_date"
									caption="Fecha Registro CIDC"
									alignment="center"
									data-type="date"
									format="dd/MM/yyyy"
									:width="130"
								/>
								<DxColumn
									data-field="cidc_act_number"
									caption="No. Acta CIDC"
									data-type="string"
									alignment="center"
									:visible="false"
									:width="100"
									cell-template="tplNull"
								/>
								<DxColumn
									data-field="faculty_registration_date"
									caption="Fecha Registro Facultad"
									data-type="date"
									format="dd/MM/yyyy"
									alignment="center"
									:visible="false"
									:width="130"
								/>
								<DxColumn
									data-field="faculty_act_number"
									caption="No. Acta Facultad"
									data-type="string"
									alignment="center"
									:visible="false"
									:width="120"
									cell-template="tplNull"
								/>
								<DxColumn data-field="email" caption="Email" data-type="string" alignment="center" :visible="true" :width="100" cell-template="tplEmail" />
								<DxColumn data-field="gruplac" caption="GrupLAC" data-type="string" alignment="center" :visible="true" :width="100" cell-template="tplUrl" />
								<DxColumn data-field="webpage" caption="Página Web" data-type="string" alignment="center" :visible="true" :width="100" cell-template="tplUrl" />
								<DxColumn data-field="group_state_name" caption="Estado" data-type="string" alignment="center" :visible="true" :width="100" />
								<DxColumn caption="" name="idEdit" data-field="id" :width="50" alignment="center" cell-template="tplCommands" />
								<template #tplUrl="{ data }">
									<a
										v-if="data.value && data.value.trim() !== 'NULL' && data.value.trim().length > 5"
										target="_blank"
										class="color-main-600"
										:href="data.value"
										:title="'Visitar \'' + data.value + '\'...'"
										><i class="icon-link"></i>
									</a>
									<span v-else> -- </span>
								</template>
								<template #tplNull="{ data }">
									<span
										v-if="data.value && data.value.toString().trim() !== 'NULL' && data.value.toString().trim() !== '0' && data.value.toString().trim() !== '.'"
										>{{ data.value }}</span
									>
									<span v-else> -- </span>
								</template>
								<template #tplEmail="{ data }">
									<span v-if="data.value && data.value.toString().trim() !== 'NULL'">
										<a class="color-main-600" :href="'mailto:' + data.value" :title="'Escribir a \'' + data.value.trim() + '\'...'"
											><i class="icon-envelop3"></i>
										</a>
										<a
											href=""
											class="ml-2 color-main-600"
											v-if="data.value && data.value.toString().trim() !== 'NULL'"
											@click.prevent="$toClipboard(data.value.toString().trim())"
											:title="'Copiar \'' + data.value.toString().trim() + '\'\r\nal portapapeles'"
											><i class="icon-copy2"></i>
										</a>
									</span>
									<span v-else> -- </span>
								</template>
								<template #titleCase="{ data }">
									<div style="max-width:300px" :title="$titleCase(data.value)">{{ $titleCase(data.value) }}</div>
								</template>
								<template #tplCommands="{ data }">
									<a title="Editar unidad..." class="cmd-item color-main-600" @click.prevent="edit(data.value)" href="#">
										<i class="icon-database-edit"></i>
									</a>
								</template>
							</DxDataGrid>
						</div>
						<!--
              <transition name="fade">
              <div class="row" v-if="unidad">
                <div class="col">
                  <b>Grupo:</b>
                  <code> {{ JSON.stringify(unidad, null, 4) }} </code>
                </div>
              </div>
            </transition>
            -->
					</div>
				</div>
			</div>
		</div>
		<div class="row" v-if="isDev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						{{ JSON.stringify(unidad, null, 3) }}
					</div>
					<div class="card-footer">
						<a @click.prevent="scrollTop()" class="font-weight-semibold" href="#">SCROLL!!!</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
let $ = window.jQuery;
import Unidad from "./base.vue";
import DxStore from "@/store/dx";
// import Commands from "@/components/element/commands.vue";
// {{url}}/research_group?page=1&per_page=5&group_type_id=1
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
import { mapState, mapActions, mapGetters } from "vuex";

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "inicio",
	components: {
		// Commands,
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
		Unidad,
	},
	data: () => ({
		grid: null,
		unidad: null,
		documentos: [],
		isValid: false,
		baseEntity: null,
		docLink: null,
		firstLoad: true,
		lookupData: ["Not Started", "Need Assistance", "In Progress"],
	}),
	mounted() {
		this.loaderElement = ".card-body";
		this.loaderMessage = "Cargando unidades";
		this.loadShow();
		this.unidad = window.vm.$clone(this.baseEntity);
	},
	computed: {
		...mapGetters("unidad", ["documents"]),
		// ...mapState("unidad", ["loading"]),
		dataSource: function() {
			let root = this;
			return DxStore({
				key: ["id"],
				endPoint: "research_unit",
				loadBaseEntity: root.baseEntity === null,
				onLoading: function(loadOptions) {
					if (!root.$loader.visible) {
						console.log("SCROLL!");
						root.loadShow();
						setTimeout(function() {
							root.scrollTop();
						}, 300);
					}
				},
				onLoaded: function(result, baseEntity) {
					root.isLoading = false;
					console.log("onLoaded Added");
					console.log("result", result);
					console.log("baseEntity", baseEntity);
					if (root.baseEntity === null) {
						root.baseEntity = baseEntity;
						root.baseEntity.id = 0;
						root.baseEntity.cidc_registration_date = new Date();
						root.baseEntity.faculty_registration_date = new Date();
						root.unidad = window.vm.$clone(root.baseEntity);
						console.log("root.baseEntity", root.baseEntity);
					}
					$("#btn-add").fadeIn();
					setTimeout(
						function() {
							root.firstLoad = false;
							root.loadHide();
						},
						root.firstLoad ? 2000 : 200
					);
				},
			});
		},
	},
	watch: {
		items: function(val) {
			// console.log("val", val.length);
			// if (val.length > 0) this.loadingVisible = false;
		},
	},
	methods: {
		...mapActions("nuxeo", { fUpload: "upload", fCreate: "createDoc" }),
		...mapActions("unidad", { gSave: "save", clearMembers: "clearMembers" }),
		customizeText(cellInfo) {
			console.log("cellInfo", cellInfo);
			return cellInfo.value + "$";
		},
		save(validationGroup) {
			let root = this;
			root.scrollTop();
			$("#btn-add").fadeOut();
			let msg = (this.unidad.id === 0 ? "Creando" : "Actualizando") + " unidad";
			root.loadingMessage = msg;
			root.loadShow(msg);
			// root.loadingVisible = true;
			// setTimeout(function(){
			root.unidad.acronym = root.unidad.acronym.toUpperCase();
			root.unidad.cidc_act_number = root.unidad.cidc_act_number.toUpperCase();
			root.unidad.faculty_act_number = root.unidad.faculty_act_number.toUpperCase();
			// TODO: 202010281221 Arreglar para obtener 'oecd_knowledge_area_id' en '_integrantes.vue'
			root.unidad.oecd_knowledge_area_id = 1;
			// TODO: 202011252347: Corregir para obtener usuarios reales!
			if (root.unidad.created_by === null) root.unidad.created_by = 1;
			if (root.unidad.updated_by === null) root.unidad.updated_by = 1;
			root.gSave({
				unidad: root.unidad,
				callback: function(gResponse) {
					console.log("gResponse", gResponse);
					root.grid.refresh();
					root.cancel(validationGroup);
					$("#data").fadeOut(window.speed, function() {
						$("#grid").fadeIn(window.speed, function() {});
					});
				},
			});
			// }, 1000);
		},
		cancel(validationGroup) {
			let root = this;
			console.log(this.$sep);
			console.log("unidad/index.vue -> cancel");
			$("#btn-add").fadeIn();
			$("#title").html("Unidades de Investigación");
			$("#msg").html("");
			root.scrollTop();
			$("#data").fadeOut(window.speed, function() {
				console.log("Data fadeOut");
				root.loadingVisible = false;
				if (typeof validationGroup !== "undefined") validationGroup.reset();
				root.unidad = root.$clone(this.baseEntity);
				$("#grid").fadeIn(window.speed, function() {
					console.log("Grid fadeIn");
					root.loadingMessage = "Cargando";
					root.$refs.Unidad.changeTab(0);
					root.clearMembers();
					setTimeout(function() {
						$("#grid").show();
					}, 500);
					console.log("#grid length", $("#grid").length);
				});
			});
		},
		add() {
			var root = this;
			console.log("ADD!");
			this.unidad = this.$clone(this.baseEntity);
			console.log("this.unidad", this.unidad);
			$("#btn-add").fadeOut();
			$("#msg").html("Nueva Unidad");
			root.$refs.Unidad.changeTab(0);
			$("#grid").fadeOut(window.speed, function() {
				console.log("END #grid fadeOut!");
				$("#data").fadeIn(window.speed, function() {
					root.scrollTop();
					console.log("END #data fadeIn!");
				});
			});
		},
		edit(id) {
			console.log("id", id);
			var root = this;
			var data = root.grid
				.getDataSource()
				.items()
				.filter((o) => o.id === id)[0];
			this.unidad = this.$clone(data);
			// if (this.unidad.cidc_act_document !== null)
			// 	this.unidad.cidc_act_document = JSON.parse(this.unidad.cidc_act_document);
			// if (this.unidad.establishment_document !== null)
			// 	this.unidad.establishment_document = JSON.parse(this.unidad.establishment_document);
			// if (this.unidad.faculty_act_document !== null)
			// 	this.unidad.faculty_act_document = JSON.parse(this.unidad.faculty_act_document);
			console.log("detail " + data.id);
			$("#btn-add").fadeOut(window.speed);
			$("#title").html("Editando &raquo; " + this.unidad.group_type_name + " &raquo; ");
			$("#msg").html(this.$titleCase(this.unidad.name));
			root.$refs.Unidad.changeTab(0);
			$("#grid").fadeOut(window.speed, function() {
				$("#data").fadeIn(window.speed, function() {
					root.scrollTop();
				});
			});
		},
		enable(result, data) {
			console.log(`Result: ${result}, Data: ${JSON.stringify(data)}`);
		},
		remove() {
			console.log("remove " + this.data.id);
		},
		gridInit(e) {
			let root = this;
			root.grid = e.component;
			root.grid.beginUpdate = () => {
				// root.loadShow();
				// this.scrollTop();
				// this.loadingVisible = true;
				// console.log("this.loadingVisible", this.loadingVisible);
				// this.loadingVisible = true;
				// console.log("beginUpdate", e);
			};
			root.grid.endUpdate = () => {
				// root.loadHide();
				// console.log("endUpdate", e);
				// this.loadingVisible = false;
			};
		},
		onContentReady() {
			// this.loadingVisible = false;
			// console.log("onContentReady!");
			$(".commands a").click(function() {
				console.log("Come on lets show the dropdown!!");
			});
			var h = "<span class='mr-1 color-text d-none d-md-inline' id='column-chooser-text'>Selector de Columnas:</span>";
			if ($("#column-chooser-text").length <= 0) $(".dx-datagrid-column-chooser-button").before(h);
		},
	},
};
</script>
