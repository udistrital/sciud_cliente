<template>
	<div>
		<div class="page-header header-elements-md-inline" id="panel-unidades-head">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-books mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">Unidades de Investigación</span>
					<span id="msg"></span>
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>
			<div class="header-elements" v-if="editMode">
				<a
					href="#"
					@click.prevent="add()"
					title="Nueva Unidad de Investigación..."
					class="btn btn-main btn-labeled btn-labeled-left legitRipple slide"
					id="btn-add"
					><b><i class="icon-database-add"></i></b> Nueva Unidad</a
				>
				<a href="#" @click.prevent="reload()" title="Volver a Unidades..." class="btn btn-main btn-labeled btn-labeled-left legitRipple slide btn-back ml-3"
					><b><i class="icon-arrow-left"></i></b> Volver a Unidades</a
				>
			</div>
		</div>

		<div class="row" id="panel-unidades">
			<div class="col">
				<div class="card">
					<div class="card-body mh pt-3">
						<div class="slide data" v-if="unidad">
							<Tabs ref="Tabs" :group="unidad" :parent="this" :documents="documentos" :saveFn="save" :cancelFn="cancel" :editMode="editMode" />
						</div>
						<div class="grid">
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
								<DxExport :enabled="false" />
								<DxColumnChooser :enabled="true" mode="dragAndDrop" />
								<DxSorting mode="multiple" /><!-- single, multiple, none" -->
								<DxPaging :page-size="dgPageSize" />
								<DxFilterRow :visible="true" />
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
									:allowed-page-sizes="dgPageSizes"
									info-text="Página {0} de {1} ({2} unidades de investigación)"
								/>
								<DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
								<DxColumn
									:allow-filtering="false"
									:sort-index="1"
									sort-order="asc"
									data-field="id"
									caption="Id"
									data-type="int"
									alignment="center"
									:allow-sorting="true"
									:width="70"
								/>
								<DxColumn :allow-filtering="true" data-field="group_type_id" caption="Tipo" data-type="int" alignment="left" :visible="true" :width="180">
									<DxLookup :data-source="tiposUnidad" value-expr="id" display-expr="st_name" />
								</DxColumn>
								<DxColumn
									:allow-filtering="true"
									data-field="name"
									caption="Nombre"
									data-type="string"
									alignment="left"
									:visible="true"
									cell-template="titleCase"
								/>
								<DxColumn
									:allow-filtering="false"
									:visible="false"
									data-field="acronym"
									caption="Acrónimo"
									data-type="string"
									alignment="center"
									:width="100"
									cell-template="tplNull"
								/>
								<DxColumn
									:allow-filtering="false"
									:visible="false"
									data-field="cidc_registration_date"
									caption="Registro CIDC"
									alignment="center"
									data-type="date"
									format="dd/MM/yyyy"
									:width="130"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="cidc_act_number"
									caption="No. Acta CIDC"
									data-type="string"
									alignment="center"
									:visible="false"
									:width="100"
									cell-template="tplNull"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="faculty_registration_date"
									caption="Registro Facultad"
									data-type="date"
									format="dd/MM/yyyy"
									alignment="center"
									:visible="false"
									:width="130"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="faculty_act_number"
									caption="No. Acta Facultad"
									data-type="string"
									alignment="center"
									:visible="false"
									:width="120"
									cell-template="tplNull"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="member_count"
									caption="Miembros"
									data-type="int"
									alignment="center"
									:allow-grouping="true"
									:allow-search="false"
									:allow-sorting="true"
									:visible="true"
									:width="100"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="email"
									caption="Email"
									data-type="string"
									alignment="center"
									:visible="true"
									:width="100"
									cell-template="tplEmail"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="gruplac"
									caption="GrupLAC"
									data-type="string"
									alignment="center"
									:visible="true"
									:width="100"
									cell-template="tplUrl"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="webpage"
									caption="Página Web"
									data-type="string"
									alignment="center"
									:visible="true"
									:width="100"
									cell-template="tplUrl"
								/>
								<DxColumn
									:allow-filtering="true"
									data-field="group_state_id"
									caption="Estado"
									data-type="string"
									alignment="center"
									:visible="true"
									:width="100"
								>
									<DxLookup :data-source="estadosUnidad" value-expr="id" display-expr="st_name" />
								</DxColumn>
								<DxColumn :allow-filtering="false" caption="" name="idEdit" data-field="id" :width="50" alignment="center" cell-template="tplCommands" />
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
									<div style="max-width: 300px" :title="$titleCase(data.value)">
										{{ $titleCase(data.value) }}
									</div>
								</template>
								<template #tplCommands="{ data }">
									<span class="cmds">
										<a title="Editar..." class="cmd-item color-main-600" @click.prevent="edit(data)" href="#">
											<i class="icon-database-edit"></i>
										</a>
									</span>
								</template>
							</DxDataGrid>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row" v-if="isDev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						editMode: {{ editMode }}<br />
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
let root = null;
let $ = window.jQuery;
import Tabs from "@/modules/unidad/tabs";
import DxStore from "@/store/dx";
// import Commands from "@/components/element/commands.vue";
// {{url}}/research_group?page=1&per_page=5&group_type_id=1
import {
	DxColumn,
	DxColumnChooser,
	DxDataGrid,
	DxExport,
	DxFilterRow,
	DxGrouping,
	DxGroupItem,
	DxGroupPanel,
	DxLookup,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { mapActions, mapGetters } from "vuex";

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "inicio",
	components: {
		DxColumn,
		DxColumnChooser,
		DxLookup,
		DxDataGrid,
		DxExport,
		DxFilterRow,
		DxGrouping,
		DxGroupItem,
		DxGroupPanel,
		DxLoadPanel,
		DxPager,
		DxPaging,
		DxSearchPanel,
		DxSorting,
		DxSummary,
		Tabs,
	},
	data: () => ({
		items: [],
		grid: null,
		mode: null,
		unidad: null,
		documentos: [],
		isValid: false,
		editMode: true, // Asume administrador
		baseEntity: null,
		docLink: null,
		firstLoad: true,
		lookupData: ["Not Started", "Need Assistance", "In Progress"],
	}),
	mounted() {
		console.log("MOUNTED");
		root = this;
		this.loaderElement = "#panel-unidades .card-body";
		this.loaderMessage = "Cargando unidades";
		this.loadShow();
		this.unidad = window.vm.$clone(this.baseEntity);
		this.getGroupRoles();
		this.getTypes();
		this.getStates();
	},
	computed: {
		...mapGetters("unidad", ["documents", "states", "types"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
		tiposUnidad() {
			return this.subtypesByType(2);
		},
		estadosUnidad() {
			return this.subtypesByType(1);
		},
		dataSource: function() {
			// 202103120855: Obtiene los grupos del usuario actual si es participante
			var ids = [];
			console.log("this.user_role_id", this.user_role_id);
			if (this.user_role_id === 5) {
				this.user.groups.forEach((group) => {
					ids.push(group.research_group_id);
				});
			}
			return DxStore({
				ids: ids,
				key: ["id"],
				endPoint: "research_units",
				loadBaseEntity: true,
				onLoading: function(loadOptions) {
					root.loadShow();
					setTimeout(function() {
						root.scrollTop();
					}, 300);
				},
				onApiLoaded: async (results) => {
					console.log(this.$sep);
					console.log("onApiLoaded => ", results);
					return results;
				},
				onLoaded: function(result, baseEntity) {
					root.isLoading = false;
					console.log("onLoaded Added");
					console.log("result", result);
					root.items = result.data;
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
					root.loadHide();
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
		...mapActions("auth/usuario", ["getGroupRoles"]),
		...mapActions("unidad", ["getTypes", "getStates", "getResearchers", "saveUnit"]),
		...mapActions("unidad/documentos", { getDocs: "get" }),
		customizeText(cellInfo) {
			console.log("cellInfo", cellInfo);
			return cellInfo.value + "$";
		},
		save(validationGroup) {
			root.scrollTop();
			$("#btn-add").fadeOut();
			let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " unidad";
			root.loadingMessage = msg;
			root.loadShow(msg);
			root.unidad.acronym = root.unidad.acronym.toUpperCase();
			root.unidad.cidc_act_number = root.unidad.cidc_act_number.toUpperCase();
			root.unidad.faculty_act_number = root.unidad.faculty_act_number.toUpperCase();
			if (root.mode == "add") root.unidad.created_by = root.user_id;
			if (root.mode == "edit") root.unidad.updated_by = root.user_id;

			// TODO: 202010281221 Arreglar para obtener 'oecd_knowledge_area_id' en '_integrantes.vue'
			root.unidad.oecd_knowledge_area_id = 1;

			root.saveUnit({
				unidad: root.unidad,
				callback: function(gResponse) {
					console.log("gResponse", gResponse);
					root.grid.refresh();
					root.cancel(validationGroup);
					$("#panel-unidades .data").fadeOut(window.speed, function() {
						$("#panel-unidades .grid").fadeIn(window.speed, function() {});
					});
				},
			});
		},
		reload() {
			window.location.reload();
		},
		cancel() {
			// root.editMode = false;
			console.log(this.$sep);
			$("#title").html("Unidades de Investigación");
			$("#msg").html("");
			$("#panel-unidades-head .btn-back").fadeOut();
			$("#panel-unidades .data").fadeOut(window.speed, function() {
				var g = $("#panel-unidades .grid");
				g.fadeIn(window.speed, function() {
					$("#btn-add").fadeIn();
					root.unidad = root.$clone(this.baseEntity);
					setTimeout(function() {
						root.$refs.Tabs.clearMembers();
						root.$refs.Tabs.changeTab(0);
					}, 300);
				});
			});
		},
		add() {
			root.mode = "add";
			console.log("ADD!");
			this.unidad = this.$clone(this.baseEntity);
			console.log("this.unidad", this.unidad);
			$("#btn-add").fadeOut();
			$("#msg").html("Nueva Tabs");
			root.$refs.Tabs.changeTab(0);
			$("#panel-unidades .grid").fadeOut(window.speed, function() {
				console.log("END #panel-unidades fadeOut!");
				$("#panel-unidades-head .btn-back").fadeIn();
				$("#panel-unidades .data").fadeIn(window.speed, function() {
					root.scrollTop();
					console.log("END #panel-unidades .data fadeIn!");
				});
			});
		},
		edit(row) {
			root.mode = "add";
			// console.clear();
			this.loaderMessage = "Cargando unidad";
			this.loadShow();
			console.log("row", row);
			let u = this.$clone(row.data);
			let m = this.$titleCase(u.name);
			this.getResearchers(u.id);
			root.$refs.Tabs.changeTab(0);
			// 202103170030: Determina el rol del usuario dentro del grupo si es Integrante
			console.log("user", root.user);
			if (root.user_role_id === 5) {
				var gs = root.user.groups.filter((o) => o.research_group_id === u.id);
				if (gs.length > 0) {
					let g = gs[0];
					console.log("group", g);
					// Tiene que ser director del grupo
					root.editMode = g.role_id === 1;
					m += ` (Rol: ${g.role_name})`;
				}
			} else {
				// TODO: 202103170059: Implementar restricción para otros roles
			}
			console.log("editMode", root.editMode);
			$("#btn-add").fadeOut(window.speed);
			$("#title").html(`${u.group_type_name} &raquo; `);
			$("#msg").html(m);
			// 202104102143: Carga documentos
			this.getDocs({
				id: u.id,
				cb: function(docs) {
					console.log(root.$sep);
					console.log("Documentos", docs);
					u["documents"] = docs;
					root.unidad = u;
					$("#panel-unidades .grid").fadeOut(window.speed, function() {
						root.loadHide();
						$("#panel-unidades-head .btn-back").fadeIn();
						$("#panel-unidades .data").fadeIn(window.speed, function() {
							// root.scrollTop();
						});
					});
				},
			});
		},
		enable(result, data) {
			console.log(`Result: ${result}, Data: ${JSON.stringify(data)}`);
		},
		remove() {
			console.log("remove " + this.data.id);
		},
		gridInit(e) {
			this.grid = e.component;
			this.grid.beginUpdate = () => {};
			this.grid.endUpdate = () => {};
		},
		onContentReady() {
			// // this.loadingVisible = false;
			// // console.log("onContentReady!");
			// $(".commands a").click(function() {
			// 	console.log("Come on lets show the dropdown!!");
			// });
			// var h = "<span class='mr-1 color-text d-none d-md-inline' id='column-chooser-text'>Selector de Columnas:</span>";
			// if ($("#column-chooser-text").length <= 0) $(".dx-datagrid-column-chooser-button").before(h);
		},
	},
};
</script>
