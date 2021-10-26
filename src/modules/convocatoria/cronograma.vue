<template>
	<div v-if="item">
		<Header :item="item" />
		<div class="row">
			<div class="col">
				<div class="card" id="panel-cronograma">
					<div class="card-body group-detail mh">
						<div class="row pb-3 mb-3 bb">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-end">
									<div>
										<span class="title d-block"><i class="icon-pencil6"></i> Convocatoria {{ item.call_code }}</span>
										<span class="title2 d-block mt-2">{{ item.call_name }}</span>
									</div>
									<div class="sub-title text-nowrap ml-4"><i class="icon-calendar"></i> Cronograma</div>
								</div>
							</div>
						</div>
						<div class="row data slide" v-if="editModeConv">
							<div class="col">
								<div class="card">
									<div class="card-header main">Nueva actividad</div>
									<div class="card-body mb-0 pb-0 pt-3">
										<DxValidationGroup ref="vGroup">
											<div class="row">
												<div class="col">
													<div class="form-group mb-3">
														<label>Descripción de la actividad:</label>
														<DxTextArea
															:height="60"
															:max-length="1000"
															:show-clear-button="true"
															:read-only="!editModeConv"
															class="form-control"
															:value.sync="base_obj.sa_description"
															placeholder="Descripción de la actividad"
														>
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
														</DxTextArea>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-6">
													<div class="form-group mb-3">
														<label>Responsable:</label>
														<DxTextBox
															:show-clear-button="true"
															:read-only="!editModeConv"
															class="form-control"
															:value.sync="base_obj.sa_responsible"
															placeholder="Responsable"
														>
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
														</DxTextBox>
													</div>
												</div>
												<div class="col-2">
													<div class="form-group">
														<label>Fecha de inicio:</label>
														<DxDateBox
															@focus-in="date_focus_in"
															@focus-out="date_focus_out"
															class="form-control"
															:read-only="!editModeConv"
															@value-changed="setDate"
															:value.sync="base_obj.sa_start_date"
															id="cidcRegistrationDate"
															placeholder="dd/mm/yyyy"
															display-format="dd/MM/yyyy"
															type="date"
														>
															<!-- :min="actualDate" -->
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
														</DxDateBox>
													</div>
												</div>
												<div class="col-2">
													<div class="form-group">
														<label>Fecha de cierre:</label>
														<DxDateBox
															@focus-in="date_focus_in"
															@focus-out="date_focus_out"
															class="form-control"
															:value.sync="base_obj.sa_end_date"
															placeholder="dd/mm/yyyy"
															display-format="dd/MM/yyyy"
															:read-only="!editModeConv"
															:min="endDate"
															type="date"
														>
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
														</DxDateBox>
													</div>
												</div>
												<div class="col">
													<div class="form-group">
														<label>Orden:</label>
														<DxNumberBox
															align="center"
															:show-clear-button="true"
															:value.sync="base_obj.sa_order"
															:read-only="!editModeConv"
															placeholder="Orden"
															class="form-control"
														>
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
														</DxNumberBox>
													</div>
												</div>
												<div class="col">
													<div class="form-group">
														<label>Activa:</label>
														<DxSwitch :value.sync="base_obj.active" switched-on-text="SI" switched-off-text="NO" />
													</div>
												</div>
											</div>
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
									<div class="col mb-3 d-flex justify-content-between">
										<span class="title2"></span>
										<a
											href="#"
											id="btn-add"
											v-if="editModeConv"
											title="Nueva actividad..."
											class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple"
										>
											<b><i class="icon-database-add"></i></b> NUEVA ACTIVIDAD
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
											no-data-text="No hay actividades registradas"
											:allow-column-reordering="false"
											:remote-operations="true"
											:hover-state-enabled="true"
											:word-wrap-enabled="true"
											:row-alternation-enabled="true"
											:show-borders="false"
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
											<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/rowDragging -->
											<DxRowDragging :allow-reordering="true" :show-drag-icons="true" drag-direction="vertical" :on-reorder="onReorder" />
											<DxPager
												:visible="true"
												:show-info="true"
												:show-page-size-selector="false"
												:show-navigation-buttons="true"
												:allowed-page-sizes="dgPageSizes"
												info-text="{2} actividades registradas (página {0} de {1})"
											/>
											<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
											<DxColumn
												:visible="false"
												:allow-grouping="false"
												:allow-filtering="false"
												:allow-search="false"
												:allow-sorting="true"
												:width="50"
												alignment="center"
												caption="ID"
												data-field="id"
												data-type="number"
											/>
											<DxColumn
												:allow-grouping="false"
												:allow-filtering="false"
												:allow-search="false"
												:allow-sorting="true"
												sort-order="asc"
												:width="90"
												alignment="center"
												caption="Orden"
												data-field="sa_order"
												data-type="number"
											/>
											<DxColumn
												:allow-filtering="true"
												:allow-sorting="true"
												:allow-grouping="true"
												:customize-text="nullText"
												alignment="left"
												caption="Actividad"
												data-field="sa_description"
												data-type="string"
											/>
											<DxColumn
												:width="160"
												:allow-filtering="true"
												:allow-sorting="true"
												:allow-grouping="true"
												:customize-text="nullText"
												alignment="left"
												caption="Responsable"
												data-field="sa_responsible"
												data-type="string"
											/>
											<DxColumn
												:allow-filtering="true"
												:visible="true"
												data-field="sa_start_date"
												caption="Fecha inicio"
												alignment="center"
												data-type="date"
												format="dd/MM/yyyy"
												:width="100"
											/>
											<DxColumn
												:allow-filtering="true"
												:visible="true"
												data-field="sa_end_date"
												caption="Fecha cierre"
												alignment="center"
												data-type="date"
												format="dd/MM/yyyy"
												:width="100"
											/>
											<DxColumn :width="100" data-field="active" caption="Activa" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" />
											<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editModeConv" />
											<template #tpl="{ data }">
												<span class="cmds">
													<a title="Editar actividad..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
														<i class="icon-database-edit"></i>
													</a>
													<a
														v-if="data.data.active"
														title="Desactivar actividad..."
														class="cmd-item color-main-600 mr-2"
														@click.prevent="active(data.data, false)"
														href="#"
													>
														<i class="icon-database-remove"></i>
													</a>
													<a v-else title="Activar actividad..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data.data, true)" href="#">
														<i class="icon-database-check"></i>
													</a>
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
						{{ percent_max }} - <span class="font-weight-semibold">percent_total:</span> {{ percent_total }},
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
	DxRowDragging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { DxButton, DxTextArea, DxPopup, DxDateBox, DxSelectBox, DxSwitch, DxTextBox, DxNumberBox, DxValidationGroup, DxFileUploader } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import DxStore from "@/store/dx";
export default {
	name: "datosBasicos",
	components: {
		DxPopup,
		DxDateBox,
		DxTextArea,
		DxTextBox,
		DxButton,
		DxFileUploader,
		DxRowDragging,
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
		items: null,
		loading: false,
		editing: false,
		percent_total: 0,
		percent_max: 0,
		tasks: [],
		base_obj_bk: null,
		endDate: new Date(),
		base_obj: {
			sa_order: 0,
			sa_description: null,
			sa_date: "sa_date",
			sa_start_date: new Date(),
			sa_end_date: null,
			sa_responsible: null,
			active: true,
			created_by: 0,
			updated_by: 0,
		},
	}),
	watch: {
		// base_obj(to, from) {
		// 	console.log("to =>", to);
		// 	console.log("from =>", from);
		// 	if (typeof to.cec_percentage === "string") root.base_obj.cec_percentage = parseFloat(to.cec_percentage);
		// 	if (to.cec_percentage !== null) {
		// 		root.percent_total -= parseFloat(to.cec_percentage);
		// 		root.percent_max = 100 - root.percent_total;
		// 	} else {
		// 		root.setMax();
		// 	}
		// },
	},
	methods: {
		...mapActions("convocatoria", ["getItem", "saveActivity", "updateActivity"]),
		setDate(e) {
			// console.clear();
			console.log(root.$sep);
			console.log("e", e);
			root.endDate = e.value;
			// root.item.call_end_date = e.value;
		},
		active(data, state) {
			console.clear();
			root.editing = true;
			console.log("data =>", data);
			console.log("state =>", state);
			let a = state ? "activar" : "desactivar";
			let am = state ? "Activando" : "Desactivando";
			let msg = `¿Realmente desea ${a} la actividad?`;
			this.$confirm(msg, function(si_no) {
				// root.base_obj.cec_percentage = parseFloat(root.base_obj.cec_percentage);
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am} actividad`, $("#panel-cronograma .card-body:first"));
					root.base_obj = data;
					root.base_obj.active = state;
					root.save(false);
				}
			});
		},
		criteriaSelected(e) {
			// console.clear();
			console.log("e =>", e);
		},
		add() {
			root.editing = false;
			root.base_obj.sa_start_date = new Date();
			root.base_obj.sa_order = root.items.length + 1;
			root.base_obj.created_by = root.user_id;
			root.base_obj.updated_by = root.user_id;
			$(".row.grid").fadeOut(function(params) {
				$(".row.data").fadeIn(function(params) {
					console.log("SOME!");
				});
			});
		},
		edit(item) {
			console.clear();
			root.editing = true;
			console.log("item =>", item);
			root.base_obj = root.$clone(item);
			root.base_obj.cec_percentage = parseFloat(item.cec_percentage);
			if (item.active) {
				// if (root.base_obj.cec_percentage > root.percent_max) root.base_obj.cec_percentage = root.percent_max;
				// else
				root.percent_max += root.base_obj.cec_percentage;
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
					if (root.$isFunction(cb)) cb();
				});
			});
		},
		save: async (validate = true) => {
			let valid = validate ? root.$refs.vGroup.instance.validate().isValid : true;
			if (valid) {
				root.loaderShow("Guardando Actividad", $(".row.data .card"));
				root.base_obj.call_id = root.item.id;
				root.base_obj.created_by = root.user_id;
				root.base_obj.updated_by = root.user_id;
				console.log("base_obj =>", root.base_obj);
				let fn = eval(root.editing ? "root.updateActivity" : "root.saveActivity");
				console.log("fn =>", fn);
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
		onReorder: async (e) => {
			// 202108180501: https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/LocalReordering/Vue
			root.loaderShow("Guardando orden", $("#panel-cronograma .card-body:first"));
			console.clear();
			console.log(root.$sep);
			console.log("e =>", e);
			const visibleRows = root.grid.getVisibleRows();
			console.log("visibleRows =>", visibleRows);
			const toIndex = root.items.indexOf(visibleRows[e.toIndex].data);
			const fromIndex = root.items.indexOf(e.itemData);
			const new_items = [...root.items];
			new_items.splice(fromIndex, 1);
			new_items.splice(toIndex, 0, e.itemData);
			root.items = new_items;
			console.log("root.items =>", root.items);
			setTimeout(async function() {
				for (let x = 0; x < root.items.length; x++) {
					const item = root.items[x];
					item.sa_order = x + 1;
					item.call_id = root.item.id;
					item.updated_by = root.user_id;
					let result = await root.updateActivity(item);
					console.log("result =>", result);
				}
				root.grid.refresh();
			}, 1000);
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
						$(".dx-datagrid-drag-icon").attr("title", "Reordenar actividad...");
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
				endPoint: `/calls/${root.item.id}/schedule_activities`,
				loadBaseEntity: false,
				onLoading: function() {
					root.loaderShow("Cargando Actividads");
				},
				onLoaded: function(results) {
					// console.clear();
					console.log(root.$sep);
					root.items = results.data;
					console.log("Grid loaded =>", root.items);
					root.base_obj.sa_order = root.items.length + 1;
					let btn = $("#btn-add");
					$(".dx-toolbar-after:first").append(btn);
					btn.click(function(e) {
						e.preventDefault();
						root.add();
					});
					if (!root.loading) root.loaderHide();
				},
			});
		},
	},
	created: async function() {
		root = this;
		console.log(root.$sep);
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
