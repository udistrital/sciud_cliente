<template>
	<div>
		<div class="page-header header-elements-md-inline" id="panel-unidades-head">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-pencil6 mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">&nbsp;Convocatorias</span>
					<span id="msg"></span>
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>
			<div class="header-elements" v-if="es_admin">
				<router-link tag="a" to="/convocatoria/crear" class="btn btn-main  mr-1  btn-labeled btn-labeled-left legitRipple" title="Nueva convocatoria...">
					<b><i class="icon-database-add"></i></b> Nueva Convocatoria
				</router-link>

				<!-- <router-link tag="a" to="/convocatoria/movilidad" class="btn btn-main mr-1 btn-labeled btn-labeled-left legitRipple" title="Nueva convocatoria...">
					<b><i class="icon-database-add"></i></b> Movilidad
				</router-link> -->
			</div>

			<div class="header-elements" v-else>
				<router-link tag="a" to="/convocatoria/aplicaciones" class="btn btn-main  mr-1  btn-labeled btn-labeled-left legitRipple" title="Listado de Aplicaciones...">
					<b><i class="icon-list2"></i></b> Listado de Aplicaciones
				</router-link>

				<!-- <router-link tag="a" to="/convocatoria/movilidad" class="btn btn-main mr-1 btn-labeled btn-labeled-left legitRipple" title="Nueva convocatoria...">
					<b><i class="icon-database-add"></i></b> Movilidad
				</router-link> -->
			</div>
		</div>
		



		<div class="row" id="panel-unidades">
			<div class="col">
				<div class="card">
					<div :class="'card-body pt-3 ' + (es_admin ? 'mh' : 'mhn')">
						<!-- // 202107051635: https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/FilterPanel/Vue -->
						<!--
						<div class="slide data" v-if="unidad">
							<Tabs ref="Tabs" :group="unidad" :parent="this" :documents="documentos" :saveFn="save" :cancelFn="cancel" :editModeConv="editModeConv" />
						</div>
						-->
						<div class="grid">
							<DxDataGrid
								class="main"
								width="100%"
								@initialized="gridInit"
								@content-ready="onContentReady"
								:allow-column-reordering="true"
								:data-source="dsEstructuras"
								:remote-operations="true"
								:hover-state-enabled="true"
								:row-alternation-enabled="true"
								:word-wrap-enabled="true"
								:show-borders="false"
							>
								<!-- type="custom" :custom-load="loadState" :custom-save="saveState" -->
								<DxColumnChooser :enabled="es_admin" mode="dragAndDrop" />
								<DxExport :enabled="false" />
								<DxFilterPanel :visible="false" />
								<DxFilterRow :visible="true" />
								<DxGrouping :auto-expand-all="true" />
								<DxGroupPanel :visible="es_admin" :allow-column-dragging="true" />
								<DxLoadPanel :enabled="false" />
								<DxPaging :page-size="dgPageSize" />
								<DxSorting :mode="es_admin ? 'multiple' : 'single'" /><!-- single, multiple, none" -->
								<DxStateStoring :enabled="false" type="sessionStorage" />
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} convocatorias" />
								</DxSummary>
								<DxPager
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="dgPageSizes"
									info-text="{2} convocatorias de investigación (Página {0} de {1})"
								/>
								<DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
								
								<DxColumn
									:allow-filtering="false"
									:sort-index="1"
									sort-order="asc"
									data-field="id"
									caption="ID"
									data-type="number"
									alignment="center"
									:allow-sorting="true"
									:width="70"
								/>

								<!-- <DxColumn
									:allow-filtering="true"
									data-field="call_state_id"
									caption="Estado"
									:group-index="0"
									data-type="number"
									alignment="left"
									:visible="true"
									:width="110"
								>
									<DxLookup :data-source="estados" value-expr="id" display-expr="st_name" />
								</DxColumn> -->

								<DxColumn
									:allow-filtering="false"
									:visible="true"
									data-field="call_code"
									caption="Código"
									data-type="string"
									alignment="left"
									:width="120"
									cell-template="tplNull"
								/>
								
								<DxColumn :allow-filtering="es_admin"  data-field="call_state_id" caption="Estado" data-type="number" alignment="left" :visible="true" >
									<DxLookup :data-source="estados" value-expr="id" display-expr="st_name" />
								</DxColumn>

								<DxColumn :allow-filtering="true" data-field="call_type_id" caption="Tipo" data-type="number" alignment="left" :visible="true" >
									<DxLookup :data-source="tipos" value-expr="id" display-expr="st_name" />
								</DxColumn>

								<DxColumn :allow-filtering="true" data-field="call_name" caption="Nombre" data-type="string" alignment="left" :visible="true" />
								
								<DxColumn
									:allow-filtering="es_admin"
									data-field="call_beneficiary_id"
									caption="Beneficiarios"
									data-type="number"
									alignment="center"
									:visible="!es_admin"
									:width="100"
								>
									<DxLookup :data-source="beneficiarios" value-expr="id" display-expr="st_name" />
								</DxColumn>


								<DxColumn
									:allow-filtering="true"
									:visible="!es_admin"
									data-field="call_start_date"
									caption="Fecha apertura"
									alignment="center"
									data-type="date"
									format="dd/MM/yyyy"
									:width="130"
								/>
								<DxColumn
									:allow-filtering="true"
									:visible="!es_admin"
									data-field="call_end_date"
									caption="Fecha cierre"
									alignment="center"
									data-type="date"
									format="dd/MM/yyyy"
									:width="130"
								/>
								<DxColumn
									:allow-filtering="true"
									:visible="es_admin"
									data-field="call_duration"
									caption="Duración"
									alignment="center"
									data-type="number"
									format="#0 meses"
									:width="130"
								/>
								<DxColumn
									:allow-filtering="true"
									data-field="call_global_budget"
									caption="Monto"
									data-type="number"
									alignment="center"
									:allow-grouping="false"
									format="$ #,##0."
									:allow-search="true"
									:allow-sorting="true"
									:visible="es_admin"
									:width="100"
								/>
								<!--suspendido por carlos 
								<DxColumn :allow-filtering="false"  name="idEdit" data-field="id" :width="160" alignment="center" cell-template="tplCommands" caption="Acciones" :fixed="true"  fixed-position="right"/>
								-->
								<DxColumn :width="70" :allow-filtering="false" alignment="center" cell-template="tplCMD" caption="Acciones" name="cmds" :fixed="true" fixed-position="right" />
								
								
								<template #tplCMD="{ data }">
									<DxDropDownButton
										v-if="es_admin"
										:drop-down-options="{ width: '200' }"
										:items="navItems"
										@item-click="cmdClick({$event, data})"
										display-expr="text"
										icon="save"
										item-template="list-item"
										template="item"
										key-expr="id"
									>
										<template #item><strong><i class="hand icon-menu9"></i></strong></template>
										<template #list-item="{ data }" >
											<span class="cmd-item" :title="'Observar '+ data.name "><i :class="data.icon"></i><span v-html="data.name"></span></span>
										</template>
									</DxDropDownButton>

									<div v-else>
										<span class="cmds">	
											
											<a
												v-if="data.data.call_type_name=='Movilidad'"
												title="Aplicar a Movilidad..."
												href="#"
												@click.prevent="go(data.value, `convocatoria/${data.data.id}/aplicar`, 'Cargando Documentos')"
												class="cmd-item color-main-600"
											>
												<i class="icon-insert-template"></i>
											</a>

											<a :title="data.data.name" class="cmd-item color-main-600 mr-2"
												@click.prevent="verObservar(data.data)" href="#" Target="_blank">
												<i class="icon-eye"></i>
											</a>
										</span>
									</div>

								</template>
								
								<!-- suspendido por carlos 
								<template #tplCommands="{ data }">
									<span class="cmds">
										<a
											v-for="(link, index) in navItems"
											href="#"
											:key="index"
											:title="'Observar ' + link.name + '...'"
											@click.prevent="go(data.value, `/convocatoria/${data.value}${link.key !== 'info' ? '/' + link.key : ''}`, `Cargando ${link.name}`)"
											class="cmd-item color-main-600 mr-2"
											><b><i :class="link.icon"></i></b>
										</a>
									</span>
								</template>
								-->


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
							</DxDataGrid>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body"><span class="font-weight-semibold">editModeConv:</span> {{ editModeConv }}</div>
				</div>
			</div>
		</div>

		<DxPopup :visible="popupObs" ref="popupConv" :drag-enabled="false" :close-on-outside-click="false"
			:show-close-button="false" :show-title="true" width="75%" height="70%" title="Datos de la Convocatoria:">
			<DxScrollView id="scrollview" ref="scrollViewWidget" :scroll-by-content="true" :scroll-by-thumb="true"
				show-scrollbar="onScroll" :bounce-enabled="true">
				<div class="col-12">
					<Verplanilla :id_convocatoria="id_data_cov" :key="id_data_cov" v-if="id_data_cov != 0" />
				</div>
			</DxScrollView>
			<DxToolbarItem widget="dxButton" toolbar="bottom" location="after" :options="closeButtonOptions" />
		</DxPopup>


	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root = null;
let $ = window.jQuery;
import DxStore from "@/store/dx";

import DxDropDownButton from "devextreme-vue/drop-down-button";
// import Commands from "@/components/element/commands.vue";
// {{url}}/research_group?page=1&per_page=5&group_type_id=1
import {
	DxColumn,
	DxColumnChooser,
	DxDataGrid,
	DxExport,
	DxFilterPanel,
	DxFilterRow,
	DxGrouping,
	DxGroupItem,
	DxGroupPanel,
	DxLoadPanel,
	DxLookup,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxStateStoring,
	DxSummary,
} from "devextreme-vue/data-grid";
import { mapActions, mapGetters } from "vuex";
import { DxPopup, DxToolbarItem } from 'devextreme-vue/popup';
import { DxScrollView } from 'devextreme-vue/scroll-view';
// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "inicio",
	components: {
		DxScrollView,
		DxPopup,
		DxToolbarItem,
		DxStateStoring,
		DxDropDownButton,
		DxColumn,
		DxFilterPanel,
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
		// Tabs,
		Verplanilla: () => import("@/modules/convocatoria/movilidad/plantilla.vue"),
	},

	data: () => ({
		popupObs: false,
		id_data_cov: 0,
		items: [],
		grid: null,
		mode: null,
		unidad: null,
		documentos: [],
		isValid: false,
		baseEntity: {},
		docLink: null,
		firstLoad: true,
		closeButtonOptions: {
			text: 'Salir',
			onClick: () => {
				root.popupObs = false;
			},
		},
	}),
	created() {
		root = this;
	},
	mounted() {
		console.log("MOUNTED");
		root.loaderElement = "#panel-unidades .card-body";
		root.loaderMessage = "Cargando Convocatorias";
		root.loaderShow();
		root.unidad = window.vm.$clone(root.baseEntity);
		root.getGroupRoles();
		root.loaderHide();
		console.log("editModeConv", root.editModeConv);
		root.filterByEstate();

	},
	computed: {
		...mapGetters("convocatoria", ["navItems"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapGetters("unidad", ["documents", "states", "types"]),
		
		
		tipos() {
			return root.subtypesByType("convocatoria_tipo", "id");
		},
		beneficiarios() {
			return root.subtypesByType("convocatoria_beneficiario", "id");
		},
		estados() {
			// let estado
			// if(root.es_admin) estado=root.subtypesByType("convocatoria_estado", "id");
			// else estado=root.subtypesByType("convocatoria_estado", "id").filter(dato=> dato.st_name=="Abierta");
			return root.subtypesByType("convocatoria_estado", "id")
		},

		
		
		closeOnOutsideClick(e) {
			console.warn("data: ", e)
			root.popupObs = !root.popupObs ? true : false;
			return true;
		},

		dsEstructuras: function() {
			// 202103120855: Obtiene los grupos del usuario actual si es participante
			var ids = [];
			console.log("root.user_role_id", root.user_role_id);
			if (root.user_role_id === root.get_role_id("integrante")) {
				console.clear();
				console.log("ES INTEGRANTE!");
				console.log("root.user =>", root.user);
				console.log("root.user.groups =>", root.user.groups);
				// 202107040646: Solo los grupos en los que se encuentre activo el usuario
				let groups = root.user.groups.filter((o) => o.gm_state_id === 1);
				console.log("groups =>", groups);
				groups.forEach((group) => {
					ids.push(group.research_group_id);
				});
			}
			// 202107040621: Determina las facultades si el usuario tiene rol Gestor facultad
			let faculties = [];
			if (root.user_role_id === root.get_role_id("gestor_facultad")) {
				console.clear();
				console.log("ES GESTOR FACULTAD!");
				console.log("root.user =>", root.user);
				faculties = root.user.local.faculties_ids;
				console.log("faculties =>", faculties);
			}
			return DxStore({
				key: ["id"],
				endPoint: "calls",
				loadBaseEntity: true,
				// 202107040725: Determina si debe mostrar solo los grupos activos
				// state: root.es_admin ? null : 1,
				state: null,
				onLoading: function(loadOptions) {
					root.loaderShow();
					setTimeout(function() {
						root.scrollTop();
					}, 300);
				},
				onApiLoaded: async (results) => {
					console.log(root.$sep);
					console.log("onApiLoaded => ", results);
					return results;
				},
				onLoaded: function(results, baseEntity) {
					root.isLoading = false;
					console.log("onLoaded Added");
					console.log("result", results);
					root.items = results.data;
					console.log("baseEntity", baseEntity);
					if (root.baseEntity === null) {
						root.baseEntity = baseEntity;
						root.baseEntity["id"] = 0;
						root.baseEntity["cidc_registration_date"] = new Date();
						root.baseEntity["faculty_registration_date"] = new Date();
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
			// if (val.length > 0) root.loadingVisible = false;
		},
	},
	methods: {
		...mapActions("nuxeo", { fUpload: "upload", fCreate: "createDoc" }),
		...mapActions("auth/usuario", ["getGroupRoles"]),
		...mapActions("unidad", ["getResearchers", "setUnit", "saveUnit"]),
		...mapActions("convocatoria/documentos", { getDocs: "get" }),

		verObservar(data) {
			this.popupObs = true
			console.warn("popupConv", this.popupObs)
			this.id_data_cov = data.id;

		},

		vermovilidad(data_id){
			// data==1059
			let resultado=true;
			console.warn("estado valor grilla",data_id);
			let valor = root.tipos.find(contipos => contipos.tipos = "Movilidad" );
			console.warn("codigo movilidad", valor);
			// data.find( => element > 10);
			return resultado;
		},

		filterByEstate() {
            if(!root.es_admin) root.grid.filter([[ "call_state_id", "=", 654 ]]);
        },


		cmdClick(e) {
			console.warn("e:", e);
			console.warn("e.data:", e.data.data);
			console.warn("e.$event.itemData", e.$event.itemData);
			console.warn("ruta: ",  `/convocatoria/${e.data.data.id}${e.$event.itemData.key !== 'info' ? '/' + e.$event.itemData.key : ''}`);
			root.go(e.data.data.id, `/convocatoria/${e.data.data.id}${e.$event.itemData.key !== 'info' ? '/' + e.$event.itemData.key : ''}`, `Cargando ${e.$event.itemData.name}`)
		},
		// cmdGet(data) {
		// 	return [
		// 		{
		// 			command: `/convocatoria/${data.value}`,
		// 			text: "Información",
		// 			icon: "icon-info",
		// 		},
		// 		{
		// 			command: `/convocatoria/${data.value}/documentos`,
		// 			text: "Documentos",
		// 			icon: "icon-file-pdf",
		// 		},
		// 		{
		// 			command: `/convocatoria/${data.value}/integrantes`,
		// 			text: "Integrantes",
		// 			icon: "icon-users4",
		// 		},
		// 		{
		// 			command: `/convocatoria/${data.value}/produccion`,
		// 			text: "Producción",
		// 			icon: "icon-trophy",
		// 		},
		// 	];
		// },
		customizeText(cellInfo) {
			console.log("cellInfo", cellInfo);
			return cellInfo.value + "$";
		},
		save(validationGroup) {
			root.scrollTop();
			$("#btn-add").fadeOut();
			let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " unidad";
			root.loaderMessage = msg;
			root.loaderShow(msg);
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
					$("#panel-unidades .data").fadeOut(function() {
						$("#panel-unidades .grid").fadeIn();
					});
				},
			});
		},
		reload() {
			window.location.reload();
		},
		cancel() {
			// root.editModeConv = false;
			console.log(root.$sep);
			$("#title").html("Convocatorias");
			$("#msg").html("");
			$("#panel-unidades-head .btn-back").fadeOut();
			$("#panel-unidades .data").fadeOut(function() {
				var g = $("#panel-unidades .grid");
				g.fadeIn(function() {
					$("#btn-add").fadeIn();
					root.unidad = root.$clone(root.baseEntity);
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
			root.unidad = root.$clone(root.baseEntity);
			console.log("root.unidad", root.unidad);
			$("#btn-add").fadeOut();
			$("#msg").html("Nueva Tabs");
			root.$refs.Tabs.changeTab(0);
			$("#panel-unidades .grid").fadeOut(function() {
				console.log("END #panel-unidades fadeOut!");
				$("#panel-unidades-head .btn-back").fadeIn();
				$("#panel-unidades .data").fadeIn(function() {
					root.scrollTop();
					console.log("END #panel-unidades .data fadeIn!");
				});
			});
		},
		edit(row) {
			console.log("row", row);
			root.setUnit(row.data);
			root.go(row.data.id, `/convocatoria/${row.data.id}`);
		},
		edit2(row) {
			root.mode = "add";
			// console.clear();
			root.loaderMessage = "Cargando unidad";
			root.loaderShow();
			console.log("row", row);
			let u = root.$clone(row.data);
			let m = root.$titleCase(u.name);
			root.getResearchers(u.id);
			root.$refs.Tabs.changeTab(0);
			// 202103170030: Determina el rol del usuario dentro del grupo si es Integrante
			console.log("user", root.user);
			if (root.user_role_id === 5) {
				var gs = root.user.groups.filter((o) => o.research_group_id === u.id);
				if (gs.length > 0) {
					let g = gs[0];
					console.log("group", g);
					// Tiene que ser director del grupo
					// root.editModeConv = g.role_id === 1;
					m += ` (Rol: ${g.role_name})`;
				}
			} else {
				// TODO: 202103170059: Implementar restricción para otros roles
			}
			console.log("editModeConv", root.editModeConv);
			$("#btn-add").fadeOut();
			$("#title").html(`${u.group_type_name} &raquo; `);
			$("#msg").html(m);
			// 202104102143: Carga documentos
			root.getDocs({
				id: u.id,
				cb: function(docs) {
					console.log(root.$sep);
					console.log("Documentos", docs);
					u["documents"] = docs;
					root.unidad = u;
					$("#panel-unidades .grid").fadeOut(function() {
						root.loaderHide();
						$("#panel-unidades-head .btn-back").fadeIn();
						$("#panel-unidades .data").fadeIn(function() {
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
			console.log("remove " + root.data.id);
		},
		gridInit(e) {
			root.grid = e.component;
			root.filterByEstate();
			root.grid.beginUpdate = () => {};
			root.grid.endUpdate = () => {};
		},
		onContentReady() {
			// // root.loadingVisible = false;
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
