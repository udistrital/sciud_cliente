<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-pencil6 mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">&nbsp;Convocatorias</span>
					<span id="msg"></span>
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>
			<div class="header-elements" v-if="editMode">
				<button
					type="button"
					@click="add()"
					title="Nueva Unidad de Investigación..."
					class="btn btn-main btn-labeled btn-labeled-left legitRipple slide"
					id="btn-add"
				>
					<b><i class="icon-database-add"></i></b> Nueva Convocatoria
				</button>
			</div>
		</div>

		<div class="row" id="panel-unidades">
			<div class="col">
				<div class="card">
					<div class="card-body pt-3 mh">
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
									:allowed-page-sizes="dgPageSizes"
									info-text="Página {0} de {1} ({2} Estructuras de investigación)"
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
								<DxColumn
									data-field="member_ids.length"
									caption="Miembros"
									data-type="int"
									alignment="center"
									:allow-grouping="false"
									:allow-filtering="false"
									:allow-search="false"
									:allow-sorting="true"
									:visible="true"
									:width="100"
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
									<div style="max-width: 300px" :title="$titleCase(data.value)">
										{{ $titleCase(data.value) }}
									</div>
								</template>
								<template #tplCommands="{ data }">
									<span class="cmds">
										<a title="Editar usuario..." class="cmd-item color-main-600" @click.prevent="edit(data)" href="#">
											<i class="icon-database-edit"></i>
										</a>
									</span>
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
		DxColumn,
		DxColumnChooser,
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
	},
	data: () => ({
		items: [],
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
		console.log("MOUNTED");
		root = this;
		this.loaderElement = "#panel-unidades .card-body";
		this.loaderMessage = "Cargando Estructuras";
		this.loaderShow();
		this.unidad = window.vm.$clone(this.baseEntity);
		this.getGroupRoles();
	},
	computed: {
		...mapGetters("unidad", ["documents"]),
		// ...mapState("unidad", ["loading"]),
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
					root.loaderShow();
					setTimeout(function() {
						root.scrollTop();
					}, 300);
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
					root.loaderHide();
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
		...mapActions("core/nuxeo", { fUpload: "upload", fCreate: "createDoc" }),
		...mapActions("auth/usuario", ["getGroupRoles"]),
		...mapActions("unidad", ["getResearchers"]),
		customizeText(cellInfo) {
			console.log("cellInfo", cellInfo);
			return cellInfo.value + "$";
		},
		save(validationGroup) {
			root.scrollTop();
			$("#btn-add").fadeOut();
			let msg = (this.unidad.id === 0 ? "Creando" : "Actualizando") + " unidad";
			root.loaderMessage = msg;
			root.loaderShow(msg);
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
					$("#panel-unidades .data").fadeOut(function() {
						$("#panel-unidades .grid").fadeIn();
					});
				},
			});
			// }, 1000);
		},
		cancel(validationGroup) {
			root.editMode = false;
			console.log(this.$sep);
			$("#title").html("Estructuras de Investigación");
			$("#msg").html("");
			root.scrollTop();
			$("#panel-unidades .data").fadeOut(function() {
				var g = $("#panel-unidades .grid");
				g.fadeIn(function() {
					$("#btn-add").fadeIn();
					if (typeof validationGroup.reset !== "undefined") validationGroup.reset();
					root.unidad = root.$clone(this.baseEntity);
					root.$refs.Tabs.clearMembers();
					root.$refs.Tabs.changeTab(0);
				});
			});
		},
		add() {
			console.log("ADD!");
			this.unidad = this.$clone(this.baseEntity);
			console.log("this.unidad", this.unidad);
			$("#btn-add").fadeOut();
			$("#msg").html("Nueva Tabs");
			root.$refs.Tabs.changeTab(0);
			$("#panel-unidades .grid").fadeOut(function() {
				console.log("END #panel-unidades fadeOut!");
				$("#panel-unidades .data").fadeIn(function() {
					root.scrollTop();
					console.log("END #panel-unidades .data fadeIn!");
				});
			});
		},
		edit(row) {
			// console.clear();
			console.log("row", row);
			this.unidad = this.$clone(row.data);
			this.getResearchers(this.unidad.id);
			$("#btn-add").fadeOut();
			$("#title").html(`${this.unidad.group_type_name} &raquo; `);
			let m = this.$titleCase(this.unidad.name);
			root.$refs.Tabs.changeTab(0);
			// 202103170030: Determina el rol del usuario dentro del grupo si es Integrante
			console.log("user", root.user);
			if (root.user_role_id === 5) {
				var gs = root.user.groups.filter((o) => o.research_group_id === this.unidad.id);
				if (gs.length > 0) {
					let g = gs[0];
					console.log("group", g);
					// Tiene que ser director del grupo
					// root.editMode = g.role_id === 1;
					m += ` (Rol: ${g.role_name})`;
				}
			} else {
				// TODO: 202103170059: Implementar restricción para otros roles
			}
			$("#msg").html(m);
			console.log("editMode", root.editMode);

			$("#panel-unidades .grid").fadeOut(function() {
				$("#panel-unidades .data").fadeIn(function() {
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
			this.grid = e.component;
			this.grid.beginUpdate = () => {};
			this.grid.endUpdate = () => {};
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
