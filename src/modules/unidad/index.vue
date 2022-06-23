<template>
	<div>
		<div class="page-header header-elements-md-inline" id="panel-unidades-head">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-books mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">Estructuras de Investigación</span>
					<span id="msg"></span>
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>

			<div class="header-elements" v-if="es_admin">
				<router-link tag="a" :to="'/plan_historico'" class="btn btn-main btn-labeled btn-labeled-left legitRipple" title="Histórico Plan de Acción e informes de Gestin">
					<b><i class="icon-history"></i></b>Historico Planes e Informes
				</router-link>
				<router-link tag="a" to="/red" class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2" title="Nueva Red de Investigación...">
					<b><i class="icon-collaboration"></i></b> Redes Investicación
				</router-link> 
				<router-link tag="a" to="/unidad/crear" class="btn btn-main btn-labeled btn-labeled-left legitRipple ml-2" title="Nueva Estructura de Investigación...">
					<b><i class="icon-database-add"></i></b> Nueva Estructura
				</router-link>
			</div>
		</div>

		<div class="filter slide">
			<div class="form-group row">
				<label class="col-2 col-form-label text-right">FILTRAR POR:</label>
				<div class="col">
					<DxSelectBox
						:show-clear-button="true"
						:grouped="false"
						:search-enabled="false"
						placeholder="Elija un criterio..."
						:data-source="filterCategories"
						:value.sync="filter.category"
						@value-changed="filterCategoryChange"
						ref="filterCategoryRef"
						class="form-control"
						display-expr="name"
						value-expr="key"
					/>
				</div>
				<div class="col-5 filter-select" v-if="filter.category != 'members'">
					<DxSelectBox
						:show-clear-button="true"
						:grouped="false"
						:search-enabled="false"
						:disabled="filter.category == null"
						placeholder="Seleccione"
						:data-source="filterCriteria"
						:value.sync="filter.value"
						ref="filterCriteriaRef"
						class="form-control"
						display-expr="Nombre"
						value-expr="Id"
					/>
				</div>
				<div class="col-4 filter-doc" v-if="filter.category == 'members'">
					<DxNumberBox
						ref="nbCedulaRef"
						class="form-control"
						value-change-event="keyup"
						:show-clear-button="true"
						:value.sync="filter.value"
						placeholder="Documento de identidad"
					/>
				</div>
				<div class="col-5 filter-select" v-if="filter.category == 'faculty_idsx'">
					<DxTagBox
						name="faculties"
						id="faculties"
						:read-only="!es_admin"
						value-expr="Id"
						display-expr="Nombre"
						class="form-control"
						:search-enabled="true"
						:show-selection-controls="true"
						:value.sync="filter.value"
						placeholder="Seleccione una facultad"
						:data-source="facultades"
					/>
				</div>
				<div class="col-2">
					<DxButton @click="filterDo($event)" title="Filtrar Estructuras..." class="nb" :disabled="filter.value == null">
						<template #default>
							<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
								Filtrar <b><i class="icon-search"></i></b>
							</span>
						</template>
					</DxButton>
				</div>
			</div>
		</div>

		<div class="row" id="panel-unidades">
			<div class="col">
				<div class="card">
					<div :class="'card-body pt-3 ' + (es_admin ? 'mh' : 'mhn')">
						<!-- // 202107051635: https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/FilterPanel/Vue -->
						<!--
						<div class="slide data" v-if="unidad">
							<Tabs ref="Tabs" :group="unidad" :parent="this" :documents="documentos" :saveFn="save" :cancelFn="cancel" :editMode="editMode" />
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
								:show-borders="false"

								:word-wrap-enabled="false"
							>
							<!-- nuevas caracteristicas 10042022 camorenos-->
							<DxColumnFixing :enabled="true" />
							<!--Fin de modificaciones-->
								<!-- type="custom" :custom-load="loadState" :custom-save="saveState" -->
								<DxColumnChooser :enabled="es_admin" mode="dragAndDrop" />
								<DxExport :enabled="false" />
								<DxFilterPanel :visible="false" />
								<DxFilterRow :visible="true" />
								<DxGrouping :auto-expand-all="true" />
								<DxGroupPanel :visible="true" :allow-column-dragging="true" />
								<DxLoadPanel :enabled="false" />
								<DxPaging :page-size="dgPageSize" />
								<DxSorting :mode="es_admin ? 'multiple' : 'single'" /><!-- single, multiple, none" -->
								<DxStateStoring :enabled="true" type="sessionStorage" />
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} estructuras" />
								</DxSummary>
								<DxPager
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="dgPageSizes"
									info-text="{2} estructuras de investigación (Página {0} de {1})"
								/>
								<DxSearchPanel :visible="false" :highlight-case-sensitive="true" />


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
								<DxColumn :allow-filtering="true" data-field="group_type_id" caption="Tipo" data-type="number" alignment="left" :visible="true" :width="180">
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
									:allow-filtering="true"
									data-field="member_count"
									caption="Integrantes"
									data-type="number"
									alignment="center"
									:allow-grouping="false"
									:allow-search="true"
									:allow-sorting="true"
									:visible="es_admin"
									:width="90"
								/>
								<DxColumn
									:allow-filtering="true"
									data-field="active_member_count"
									:caption="es_admin ? 'Int. Activos' : 'Integrantes'"
									data-type="number"
									alignment="center"
									:allow-grouping="false"
									:allow-search="true"
									:allow-sorting="true"
									:visible="true"
									:width="es_admin ? 90 : 120"
								/>
								<DxColumn
									:allow-filtering="true"
									data-field="inactive_member_count"
									caption="Int. Inactivos"
									data-type="number"
									alignment="center"
									:allow-grouping="false"
									:allow-search="true"
									:allow-sorting="true"
									:visible="es_admin"
									:width="90"
								/>
								<DxColumn
									:allow-filtering="true"
									data-field="faculty_ids.length"
									caption="Facultades"
									data-type="number"
									alignment="center"
									:allow-grouping="false"
									:allow-search="false"
									:allow-sorting="false"
									:visible="es_admin"
									:width="90"
								/>
								<DxColumn
									:allow-filtering="true"
									:visible="false"
									data-field="acronym"
									caption="Acrónimo"
									data-type="string"
									alignment="center"
									:width="90"
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
									:width="70"
									:allow-filtering="false"
									data-field="email"
									caption="Email"
									data-type="string"
									alignment="center"
									:visible="!es_admin"
									cell-template="tplEmail"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="gruplac"
									caption="GrupLAC"
									data-type="string"
									alignment="center"
									:visible="!es_admin"
									:width="70"
									cell-template="tplUrl"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="webpage"
									caption="Web"
									data-type="string"
									alignment="center"
									:width="70"
									:visible="!es_admin"
									cell-template="tplUrl"
								/>
								<DxColumn
									:width="90"
									
									data-field="group_state_id"
									caption="Estado"
									data-type="string"
									alignment="center"
									:visible="es_admin"
									:group-index="es_admin ? 0 : null"
								>
									<DxLookup :data-source="estadosUnidad" value-expr="id" display-expr="st_name" />
								</DxColumn>


								<!-- <DxColumn :allow-filtering="false" caption="" name="idEdit" data-field="id" :width="150" alignment="center" cell-template="tplCommands" :fixed="true" fixed-position="right"/>
								<template #tplCommands="{ data }">
									<span class="cmds">
										<a
											title="Observar información..."
											href="#"
											@click.prevent="go(data.value, `unidad/${data.value}`, 'Cargando Información')"
											class="cmd-item color-main-600 mr-2"
										>
											<i class="icon-info"></i>
										</a>
										<a
											title="Observar documentos..."
											href="#"
											@click.prevent="go(data.value, `unidad/${data.value}/documentos`, 'Cargando Documentos')"
											class="cmd-item color-main-600 mr-2"
										>
											<i class="icon-file-pdf"></i>
										</a>
										<a
											title="Observar integrantes..."
											href="#"
											@click.prevent="go(data.value, `unidad/${data.value}/integrantes`, 'Cargando Integrantes')"
											class="cmd-item color-main-600 mr-2"
										>
											<i class="icon-users"></i>
										</a>
										<a
											title="Observar producción..."
											href="#"
											@click.prevent="go(data.value, `unidad/${data.value}/produccion`, 'Cargando Producción')"
											class="cmd-item color-main-600"
										>
											<i class="icon-trophy"></i>
										</a>

										<! -- Nuevo elementos plan accion  -- >
										<a
											title="Observar Plan Accion..."
											href="#"
											@click.prevent="go(data.value, `unidad/${data.value}/plan_accion`, 'Cargando Plan Acción...')"
											class="cmd-item color-main-600"
										>
											<i class="icon-clipboard"></i>
										</a>
									</span>
								</template> -->

								<DxColumn :width="70" alignment="center" cell-template="tpl" caption="Menú" name="cmds" :fixed="true" fixed-position="right" />
								<template #tpl="{ data }">
									<DxDropDownButton
										:drop-down-options="{ width: '200' }"
										:items="cmdGet(data)"
										@item-click="cmdClick($event, data)"
										
										display-expr="text"
										icon="save"
										item-template="list-item"
										template="item"
										key-expr="id"
									>
										<template #item><strong><i class="hand icon-menu9"></i></strong></template>
										<template #list-item="{ data }">
											<span class="cmd-item" title="Ver Sub Modulos..."><i :class="data.icon"></i><span v-html="data.text"></span></span>
										</template>
									</DxDropDownButton>
								</template>

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
					<div class="card-body">
						<span class="font-weight-semibold">editMode:</span> {{ editMode }}
						<hr class="sep" />
						<span class="font-weight-semibold">filter:</span> {{ JSON.stringify(filter, null, 3) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root = null;
let $ = window.jQuery;
import DxStore from "@/store/dx";
import { mapActions, mapState, mapGetters } from "vuex";
import { DxTagBox, DxSelectBox, DxNumberBox, DxButton, DxTextBox, DxDropDownButton } from "devextreme-vue";
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
	DxColumnFixing
} from "devextreme-vue/data-grid";

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "inicio",
	components: {
		DxTagBox,
		DxButton,
		DxSelectBox,
		DxNumberBox,
		DxTextBox,
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
		DxColumnFixing
		// Tabs,
	},
	data: () => ({
		faculties: null,
		members: null,
		cine: null,
		curricular: null,
		oecd: null,
		research: null,
		items: [],
		grid: null,
		mode: null,
		unidad: null,
		documentos: [],
		isValid: false,
		baseEntity: {},
		docLink: null,
		firstLoad: true,
		filter: {
			current: null,
			category: null,
			value: null,
		},
		filterCriteria: [],
		filterCategories: [
			{
				key: "members",
				name: "Cédula de Integrante",
			},
			// {
			// 	key: "cine_detailed_area_ids",
			// 	name: "CINE",
			// },
			{
				key: "faculties",
				name: "Facultad",
			},
			// {
			// 	key: "research_focus_ids",
			// 	name: "Línea de Investigación",
			// },
			// {
			// 	key: "oecd_discipline_ids",
			// 	name: "OCDE",
			// },
			// {
			// 	key: "curricular_project_ids",
			// 	name: "Proyecto Curricular",
			// },
		],
	}),
	created() {
		root = this;
	},
	mounted() {
		console.log("MOUNTED");
		root.loaderElement = "#panel-unidades .card-body";
		root.loaderMessage = "Cargando Estructuras";
		root.loaderShow();
		root.unidad = window.vm.$clone(root.baseEntity);
		root.getGroupRoles();
		root.getFacultades();
		root.loaderHide();
		console.log("editMode", root.editMode);
		console.warn("dsEstructuras: ",root.dsEstructuras)
	},
	computed: {
		...mapState("unidad/oas", ["facultades"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapGetters("unidad", ["documents", "states", "types"]),
		tiposUnidad() {
			return root.subtypesByType("unidad_tipo");
		},
		estadosUnidad() {
			return root.subtypesByType("unidad_estado");
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
			if (root.user_role_id === root.get_role_id("gestor_facultad")) {
				console.clear();
				console.log("ES GESTOR FACULTAD!");
				console.log("root.user =>", root.user);
				root.faculties = root.user.local.faculties_ids;
				console.log("root.faculties =>", root.faculties);
			}
			return DxStore({
				ids: ids,
				key: ["id"],
				faculties: root.faculties,
				members: root.members,
				cine: root.cine,
				curricular: root.curricular,
				oecd: root.oecd,
				research: root.research,
				loadBaseEntity: true,
				endPoint: "research_units",
				// 202107040725: Determina si debe mostrar solo los grupos activos
				state: root.es_admin ? null : 1,
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

					// 202110102158: Filtros!
					if ($(".dx-toolbar-center .filter").length <= 0) {
						$(".dx-toolbar-center").append($(".filter.slide"));
						$(".dx-toolbar-center .filter").fadeIn();
					}

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
		...mapActions("unidad/documentos", { getDocs: "get" }),
		...mapActions("unidad/cine", { getCine: "all" }),
		...mapActions("unidad/oas", { getFacultades: "facultades" }),
		...mapActions("unidad/ocde", { getOcde: "getAll" }),
		filterDo(e) {
			// e.preventDefault();
			console.clear();
			console.log("e =>", e);
			console.log("filter =>", JSON.stringify(root.filter));
			root.filter.current = root.filter.category;
			root[root.filter.category] = [root.filter.value];
			console.log("filtered =>", `root.${root.filter.category}`);
			root.loaderShow("Filtrando Estructuras");
		},
		filterCategoryChange(e) {
			root.filter.value = null;
			console.clear();
			console.log("e =>", e);
			if (e.value == "faculties") {
				console.log("root.facultades =>", root.facultades);
				root.filterCriteria = root.facultades;
			} else if (e.value == "members") {
				setTimeout(function() {
					$(".filter-doc input").focus();
				}, 500);
			} else {
				console.log("root.filter.category =>", root.filter.category);
				root[root.filter.category] = null;
				root[root.filter.current] = null;
				root.filter.category = null;
				root.filter.current = null;
				root.grid.refresh();
			}
		},
		cmdClick(e) {
			console.log("e.itemData", e.itemData);
			root.go(e.itemData.text, e.itemData.command, `Cargando ${e.itemData.text}`);
		},
		cmdGet(data) {
			return [
				{
					command: `/unidad/${data.data.id}`,
					text: "Información ",
					icon: "icon-info",
				},
				{
					command: `/unidad/${data.data.id}/documentos`,
					text: "Documentos",
					icon: "icon-file-pdf",
				},
				{
					command: `/unidad/${data.data.id}/integrantes`,
					text: "Integrantes",
					icon: "icon-users4",
				},
				{
					command: `/unidad/${data.data.id}/produccion`,
					text: "Producción",
					icon: "icon-trophy",
				},
				{
					command: `/unidad/${data.data.id}/plan_accion`,
					text: "Plan de Acción e <br> Informe de Gestión",
					icon: "icon-clipboard",
				},
				// {
				// 	command: `/unidad/${data.data.id}/movilidad`,
				// 	text: "Aplicar a Convocatorias",
				// 	icon: "icon-paperplane",
				// },
			];
		},
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
			// root.editMode = false;
			console.log(root.$sep);
			$("#title").html("Estructuras de Investigación");
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
			root.go(row.data.id, `/unidad/${row.data.id}`);
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
					// root.editMode = g.role_id === 1;
					m += ` (Rol: ${g.role_name})`;
				}
			} else {
				// TODO: 202103170059: Implementar restricción para otros roles
			}
			console.log("editMode", root.editMode);
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
			root.grid.beginUpdate = () => {};
			root.grid.endUpdate = () => {
				// $(".dx-toolbar-center").append("Diego!");
			};
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
