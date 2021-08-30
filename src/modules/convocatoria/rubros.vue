<template>
	<div v-if="item">
		<Header :item="item" />
		<div class="row">
			<div class="col">
				<div class="card" id="panel-rubros">
					<div class="card-body group-detail mh">
						<div class="row pb-3 mb-3 bb">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-end">
									<div>
										<span class="title d-block"><i class="icon-pencil6"></i> Convocatoria {{ item.call_code }}</span>
										<span class="title2 d-block mt-2">{{ item.call_name }}</span>
									</div>
									<div class="sub-title text-nowrap ml-4"><i class="icon-coins"></i> Rubros a Financiar</div>
								</div>
							</div>
						</div>
						<div class="row data slide" v-if="editModeConv">
							<div class="col">
								<div class="card">
									<div class="card-header main d-flex justify-content-between">
										<span>Asociar Rubro de Financiación</span>
										<span>${{ assigned_budget.format() }} de ${{ item.call_max_budget_per_project.format() }}</span>
									</div>
									<div class="card-body mb-0 pb-0 pt-3">
										<DxValidationGroup ref="vGroup">
											<div class="row">
												<div class="col-8">
													<div class="form-group mb-3">
														<label>Rubro de financiación:</label>
														<DxSelectBox
															:grouped="false"
															:show-clear-button="true"
															:data-source="rubros"
															:value.sync="base_obj.item_id"
															:search-enabled="true"
															placeholder="Busque y seleccione un rubro de financiación..."
															class="form-control"
															display-expr="st_name"
															@value-changed="itemSelected"
															value-expr="id"
														>
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
														</DxSelectBox>
													</div>
												</div>
												<div class="col">
													<div class="row">
														<div class="col-5">
															<div class="form-group mb-3">
																<label>Porcentaje:</label>
																<DxNumberBox
																	:value.sync="base_obj.ci_percentage"
																	placeholder="%"
																	:show-spin-buttons="true"
																	:max="percent_max"
																	@value-changed="itemChanged"
																	format="#0' %'"
																	class="form-control"
																	:read-only="false"
																	:min="5"
																	:step="5"
																>
																	<DxValidator>
																		<DxRequiredRule />
																	</DxValidator>
																</DxNumberBox>
															</div>
														</div>
														<div class="col-5">
															<div class="form-group mb-3">
																<label>Porc. máximo:</label>
																<DxNumberBox
																	:value.sync="base_obj.ci_maximum_percentage"
																	placeholder="%"
																	:show-spin-buttons="true"
																	format="#0' %'"
																	class="form-control"
																	:read-only="false"
																	:min="5"
																	:step="5"
																>
																	<DxValidator>
																		<DxRequiredRule />
																	</DxValidator>
																</DxNumberBox>
															</div>
														</div>
														<div class="col-2">
															<div class="form-group">
																<label>Activo: </label>
																<DxSwitch :value.sync="base_obj.active" switched-on-text="SI" switched-off-text="NO" />
															</div>
														</div>
													</div>
												</div>
											</div>
											<transition name="fade">
												<div v-if="rubro && rubro.st_description" class="row">
													<div class="col mb-3 title-zone">
														<span class="title-desc"><i class="icon-info"></i> {{ rubro.st_name }}:&nbsp;</span>{{ rubro.st_description }}
													</div>
												</div>
											</transition>
										</DxValidationGroup>
									</div>
									<div class="card-footer">
										<div class="row">
											<div class="col">
												<a href="#" id="btn-cancel" @click.prevent="cancel" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
													<b><i class="icon-database-remove"></i></b> CANCELAR
												</a>
											</div>
											<div class="col text-right">
												<a
													href="#"
													id="btn-save"
													@click.prevent="save"
													:class="'btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple' + (percent_total < 100 ? '' : 'disabled')"
												>
													<b><i class="icon-database-add"></i></b> GUARDAR
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row grid">
							<div class="col">
								<div class="row">
									<div class="col mb-3 d-flex justify-content-between align-items-end">
										<span class="title2">
											<span class="color-main-600">&raquo; Monto total:</span> <small>$&nbsp;</small>{{ item.call_global_budget.format() }}&nbsp;&nbsp;&nbsp;
											<span class="color-main-600">&raquo; Monto máx. por proyecto:</span> <small>$&nbsp;</small>{{ item.call_max_budget_per_project.format()
											}}<br /><span class="color-main-600">&raquo; Porcentaje asignado:</span> {{ percent_total }}<small>&nbsp;%</small>&nbsp;&nbsp;&nbsp;
											<span class="color-main-600">&raquo; Monto destinado:</span> <small>$&nbsp;</small>{{ assigned_budget.format() }}
										</span>
										<a
											href="#"
											id="btn-add"
											v-if="editModeConv"
											title="Asociar rubro de financiación..."
											class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple slide"
										>
											<b><i class="icon-database-add"></i></b> ASOCIAR RUBRO DE FINANCIACIÓN
										</a>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<DxDataGrid
											class="main"
											width="100%"
											:dataSource="dataSource"
											@initialized="gridInit"
											no-data-text="No hay rubros de financiación asociados"
											:allow-column-reordering="false"
											:remote-operations="true"
											:hover-state-enabled="true"
											:row-alternation-enabled="true"
											:show-borders="false"
											:word-wrap-enabled="true"
										>
											<DxExport :enabled="false" />
											<DxColumnChooser :enabled="false" mode="dragAndDrop" />
											<DxSorting mode="single" /><!-- single, multiple, none" -->
											<DxPaging :page-size="10" />
											<!-- <DxFilterRow :visible="false" /> -->
											<DxLoadPanel :enabled="false" />
											<DxGroupPanel :visible="false" :allow-column-dragging="true" />
											<DxGrouping :auto-expand-all="true" />
											<DxSummary>
												<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
											</DxSummary>
											<DxPager
												:visible="true"
												:show-info="true"
												:show-page-size-selector="false"
												:show-navigation-buttons="true"
												:allowed-page-sizes="dgPageSizes"
												info-text="{2} rubros asociados (página {0} de {1})"
											/>
											<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
											<DxColumn
												:allow-grouping="false"
												:allow-filtering="false"
												:allow-search="false"
												:allow-sorting="true"
												sort-order="asc"
												:width="120"
												alignment="center"
												caption="ID"
												data-field="id"
												data-type="string"
											/>
											<DxColumn
												:allow-filtering="true"
												:allow-sorting="true"
												:allow-grouping="true"
												:customize-text="nullText"
												alignment="left"
												caption="Rubro a financiar"
												data-field="item_name"
												data-type="string"
											/>
											<DxColumn
												:width="120"
												:allow-filtering="true"
												:allow-sorting="true"
												:allow-grouping="false"
												format="#0' %'"
												alignment="center"
												caption="Porcentaje"
												data-field="ci_percentage"
												data-type="number"
												cell-template="per1"
											/>
											<template #per1="{ data }">
												<span v-if="data.data.active" class="font-weight-semibold">{{ parseFloat(data.data.ci_percentage) }} %</span>
												<span v-else class="color-gray-20">{{ parseFloat(data.data.ci_percentage) }} %</span>
											</template>
											<DxColumn
												:width="120"
												:allow-filtering="true"
												:allow-sorting="true"
												:allow-grouping="false"
												format="#0' %'"
												alignment="center"
												caption="Monto máximo"
												data-type="number"
												cell-template="mou"
											/>
											<template #mou="{ data }">
												<span v-if="data.data.active" class="font-weight-semibold">${{ getBudget(data.data.ci_percentage, true) }}</span>
												<span v-else class="color-gray-20">${{ getBudget(data.data.ci_percentage, true) }}</span>
											</template>
											<DxColumn
												:width="120"
												:allow-filtering="true"
												:allow-sorting="true"
												:allow-grouping="false"
												format="#0' %'"
												alignment="center"
												caption="Porc. Máximo"
												data-field="ci_maximum_percentage"
												data-type="number"
												cell-template="per"
											/>
											<template #per="{ data }">
												<span v-if="data.data.active" class="font-weight-semibold">{{ parseFloat(data.data.ci_maximum_percentage) }} %</span>
												<span v-else class="color-gray-20">{{ parseFloat(data.data.ci_maximum_percentage) }} %</span>
											</template>
											<DxColumn :width="100" data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" />
											<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editModeConv" />
											<template #tpl="{ data }">
												<span class="cmds">
													<a title="Editar criterio..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
														<i class="icon-database-edit"></i>
													</a>
													<a
														v-if="data.data.active"
														title="Desactivar criterio..."
														class="cmd-item color-main-600 mr-2"
														@click.prevent="active(data.data, false)"
														href="#"
													>
														<i class="icon-database-remove"></i>
													</a>
													<span v-else>
														<a
															v-if="percent_total < 100"
															title="Activar criterio..."
															class="cmd-item color-main-600 mr-2"
															@click.prevent="active(data.data, true)"
															href="#"
														>
															<i class="icon-database-check"></i>
														</a>
													</span>
												</span>
											</template>
										</DxDataGrid>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<span class="font-weight-semibold">editModeConv:</span> {{ editModeConv }} - <span class="font-weight-semibold">percent_max:</span>
						{{ percent_max }} - <span class="font-weight-semibold">percent_total:</span> {{ percent_total }} -
						<span class="font-weight-semibold">assigned_budget:</span>
						{{ assigned_budget.format() }}
						<hr class="sep mb-0" />
						<span class="font-weight-semibold">base_obj:</span> {{ JSON.stringify(base_obj, null, 3) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let $ = window.jQuery,
	root = null;
import { mapActions, mapGetters } from "vuex";
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
import { DxButton, DxPopup, DxSelectBox, DxSwitch, DxTextBox, DxNumberBox, DxValidationGroup, DxFileUploader } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import DxStore from "@/store/dx";
export default {
	name: "datosBasicos",
	components: {
		DxPopup,
		DxTextBox,
		DxButton,
		DxFileUploader,
		DxColumn,
		DxColumnChooser,
		DxDataGrid,
		DxExport,
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
		Header: () => import("./_header"),
	},
	data: () => ({
		item: null,
		grid: null,
		rubro: null,
		items: null,
		loading: false,
		editing: false,
		percent_total: 0,
		percent_max: 0,
		assigned_budget: 0,
		base_obj_bk: null,
		base_obj: {
			id: null,
			item_id: null,
			ci_percentage: 5,
			ci_maximum_percentage: 5,
			active: true,
			call_id: null,
			item_name: null,
			created_by: 0,
			updated_by: 0,
		},
	}),
	watch: {
		// base_obj(to, from) {
		// 	console.log("to =>", to);
		// 	console.log("from =>", from);
		// 	if (typeof to.ci_percentage === "string") root.base_obj.ci_percentage = parseFloat(to.ci_percentage);
		// 	if (to.ci_percentage !== null) {
		// 		root.percent_total -= parseFloat(to.ci_percentage);
		// 		root.percent_max = 100 - root.percent_total;
		// 	} else {
		// 		root.setMax();
		// 	}
		// },
	},
	methods: {
		...mapActions("convocatoria", ["getItem", "saveFinancingItem", "updateFinancingItem"]),
		getBudget(percent, format = false) {
			if (percent !== null && typeof percent === "string") percent = parseFloat(percent);
			let r = (root.item.call_max_budget_per_project * percent) / 100;
			return format ? r.format() : r;
		},
		active(data, state) {
			console.clear();
			root.editing = true;
			console.log("data =>", data);
			console.log("state =>", state);
			let a = state ? "activar" : "desactivar";
			let am = state ? "Activando" : "Desactivando";
			let msg = `¿Realmente desea ${a} el criterio?`;
			this.$confirm(msg, function(si_no) {
				// root.base_obj.ci_percentage = parseFloat(root.base_obj.ci_percentage);
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am} Criterio`, $("#panel-rubros .card-body:first"));
					root.base_obj = data;
					root.base_obj.active = state;
					root.save(false);
				}
			});
		},
		itemSelected(e) {
			console.clear();
			console.log("e =>", e);
			root.rubro = root.rubros.find((o) => o.id == e.value);
			console.log("root.rubro =>", root.rubro);
		},
		itemChanged(e) {
			// console.clear();
			console.log("e =>", e);
			root.assigned_budget = root.getBudget(e.value);
		},
		setMax() {
			root.percent_total = 0;
			root.items
				.filter((o) => o.active)
				.forEach((item) => {
					root.percent_total += parseFloat(item.ci_percentage);
				});
			root.percent_max = 100 - root.percent_total;
			root.assigned_budget = root.getBudget(root.percent_total);
			if (root.percent_total < 100) {
				$("#btn-add").fadeIn();
			} else {
				$("#btn-add").fadeOut();
			}
		},
		add() {
			root.editing = false;
			$(".row.grid").fadeOut(function(params) {
				root.base_obj.ci_percentage = 5;
				root.itemChanged({ value: 5 });
				$(".row.data").fadeIn(function(params) {});
			});
		},
		edit(item) {
			console.clear();
			root.setMax();
			root.editing = true;
			console.log("item =>", item);
			root.base_obj = root.$clone(item);
			root.base_obj.ci_percentage = parseFloat(item.ci_percentage);
			if (item.active) {
				// if (root.base_obj.ci_percentage > root.percent_max) root.base_obj.ci_percentage = root.percent_max;
				// else
				root.percent_max += root.base_obj.ci_percentage;
			}
			console.log("item =>", root.base_obj);
			console.log("percent_max =>", root.percent_max);
			$(".row.grid").fadeOut(function(params) {
				$(".row.data").fadeIn(function(params) {
					console.log("percent_max =>", root.percent_max);
				});
			});
		},
		cancel(cb) {
			$(".row.data").fadeOut(function(params) {
				root.loaderHide();
				$(".row.grid").fadeIn(function(params) {
					root.base_obj = root.$clone(root.base_obj_bk);
					root.$refs.vGroup.instance.reset();
					root.editing = false;
					root.setMax();
					if (root.$isFunction(cb)) cb();
				});
			});
		},
		save: async (validate = true) => {
			let valid = validate ? root.$refs.vGroup.instance.validate().isValid : true;
			if (valid) {
				root.loaderShow("Guardando Rubro", $(".row.data .card"));
				// root.setMax();
				root.base_obj.call_id = root.item.id;
				root.base_obj.created_by = root.user_id;
				root.base_obj.updated_by = root.user_id;
				if (root.base_obj.ci_percentage > root.percent_max && root.base_obj.active) root.base_obj.ci_percentage = root.percent_max;
				console.log("root.percent_max =>", root.percent_max);
				console.log("root.percent_total =>", root.percent_total);
				console.log("base_obj =>", root.base_obj);
				let fn = eval(root.editing ? "root.updateFinancingItem" : "root.saveFinancingItem");
				let result = await fn(root.base_obj);
				console.log("result =>", result);
				setTimeout(function() {
					root.loading = true;
					root.grid.refresh();
					root.cancel(function() {
						root.loading = false;
					});
				}, 1000);
			}
		},
		gridInit(e) {
			console.log(root.$sep);
			console.log("GRID INIT!!");
			console.log("e", e);
			root.grid = e.component;
			root.grid.on({
				contentReady: (e) => {
					setTimeout(function() {
						console.log(root.$sep);
						console.log("GRID INIT TIMEOUT!!");
					}, 400);
				},
			});
		},
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		dataSource: function() {
			return DxStore({
				key: ["id"],
				endPoint: `/calls/${root.item.id}/call_items`,
				loadBaseEntity: false,
				onLoading: function() {
					root.loaderShow("Cargando Rubros");
				},
				onLoaded: function(results) {
					// console.clear();
					console.log(root.$sep);
					root.items = results.data;
					console.log("Grid loaded =>", root.items);
					let btn = $("#btn-add");
					$(".dx-toolbar-after:first").append(btn);
					btn.click(function(e) {
						e.preventDefault();
						root.add();
					});
					root.setMax();
					if (!root.loading) root.loaderHide();
				},
			});
		},
	},
	created: async function() {
		root = this;
		console.log(root.$sep);
		root.rubros = root.subtypesByType("convocatoria_rubro");
		console.log("root.rubros =>", root.rubros);
		let uId = root.$route.params.itemId;
		root.item = await root.getItem(uId);
		console.log("item =>", root.item);
		document.title += ` Convocatoria ${root.item.call_code}`;
		root.base_obj_bk = root.$clone(root.base_obj);
	},
	updated: () => {},
	mounted() {},
};
</script>
