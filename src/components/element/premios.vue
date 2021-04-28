<template>
	<div class="col p-0 m-0 docs slide" :id="id">
		<DxValidationGroup ref="basicGroup">
			<div class="row data slide" v-if="editMode">
				<div class="col">
					<div class="card">
						
						<div class="card-header main">{{editPremio===false? "Anexar":"Editar"}} Reconocimiento o Premio</div>

						<div class="card-body mb-0 pb-0 pt-3">
							<DxValidationGroup ref="vGroup">
								<div class="row">

									<div class="col-md-7">
										<div class="form-group">
										<label>Nombre del Premio o Reconocimiento: </label>
										<DxTextBox placeholder="Nombre" class="form-control" :value.sync="baseObjA.name">
										<DxValidator>
										</DxValidator>
										</DxTextBox>
										</div>
									</div>

									<div class="col-md-3">
										<div class="form-group">
										<label>Obtención: </label>
										<DxSwitch :value.sync="baseObjA.is_national" switched-on-text="Nacional" switched-off-text="Internacional" />
										</div>
									</div>

									<div class="col-md-2">
										<div class="form-group">
										<label>Activo: </label>
										<DxSwitch :value.sync="baseObjA.active" switched-on-text="SI" switched-off-text="NO" />
										</div>
									</div>

								</div>
							</DxValidationGroup>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col">
									<DxButton @click="awardCancel" class="nb">
										<template #default>
											<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
												<b><i class="icon-database-remove"></i></b> CANCELAR
											</span>
										</template>
									</DxButton>
								</div>
								<div class="col text-right">
									<DxButton @click="awdSave" class="nb">
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
				<div class="row">
					<div class="col">
						<button type="button" @click.prevent="premioAdd()" title="Nuevo Reconocimiento.." class="btn btn-main btn-labeled btn-labeled-left" id="btn-add-doc">
							<b><i class="icon-database-add"></i></b> Nuevo Reconocimiento
						</button>
						<DxDataGrid
							class="main"
							width="100%"
							:dataSource="dataSource"
							@initialized="gridInit"
							:allow-column-reordering="false"
							:remote-operations="true"
							:hover-state-enabled="true"
							:row-alternation-enabled="true"
							:show-borders="false"
						>
							<DxExport :enabled="false" />
							<DxColumnChooser :enabled="false" mode="dragAndDrop" />
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
							<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
							
							<DxColumn :width="30" data-field='id'  caption='ID' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
							<DxColumn data-field='name'  caption='Nombre Reconocimiento' data-type='string' alignment='center' :visible='true' :allow-grouping='false' /> 
							<DxColumn data-field="is_national" caption="Participacion" data-type="date" alignment="center" :visible="true" :customize-text="parNal" />
							
							<DxColumn :width="100" data-field="active" caption="Activo" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" />

							<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editMode" />
							<template #tpl="{ data }">
								<span class="cmds">
									<a title="Editar Premio..." class="cmd-item color-main-600" @click.prevent="awardEdit(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a>
									<!-- <a v-if="data.data.active" title="Desactivar usuario..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
										<i class="icon-database-remove"></i>
									</a>
									<a v-else title="Activar usuario..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
										<i class="icon-database-check"></i>
									</a>  -->
								</span>
							</template>
						</DxDataGrid>
					</div>
				</div>
			</div>
		</div>


		<div class="card mt-3" v-if="debug">
			<div class="card-body">
				{{ JSON.stringify(baseObjA, null, "\t") }}
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
import { DxButton, DxSelectBox, DxSwitch, DxTextBox, DxNumberBox, DxValidationGroup } from "devextreme-vue";
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
		editPremio: false,
		isValid: false,
		btnCancel: null,
		btnAdd: null,
		grid: null,
		loading: false,
		groupResearchers: [],
		panelDataDoc: null,
		panelGridDoc: null,
		panelCmds: null,
		baseObjA: {
			name: null,
			is_national: true,
			active: null,
			created_by: null, 
			updated_by: null,
		},
	}),
	mounted() {
		root = this;
		root.panelDataDoc = $("#" + root.id + " .data");
		root.panelGridDoc = $("#" + root.id + " .grid");
		root.baseEnt = this.$clone(root.baseObjA);
		console.log(root.$sep);
		// }/research_units/1/awards/
		root.loaderElement = "#" + root.id;
		console.log("awards MOUNTED!");
	},
	computed: {
		...mapGetters("unidad", ["researchers"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
		ep: () => {
			return `${root.endPoint}/${root.mainObj.id}/awards`;
		},
		dataSource: function() {
			root = this;
			console.log("root.mainObj", root.mainObj);
			if (typeof root.mainObj.id == "undefined") return null;
			if (root.mainObj.id === null) return null;
			return DxStore({
				key: ["id"],
				endPoint: root.ep,
				loadBaseEntity: false,
				onLoading: function() {
					//root.loaderShow();
					setTimeout(function() {
						root.scrollTop();
					}, 300);
				},
				onLoaded: function(results) {
					// console.clear();
					console.log("results", results);
					$("#" + root.id + " .grid").fadeIn();
					//root.loaderHide();
				},
			});
		},
	},
	props: {
		mainObj: {
			type: Object,
			default: () => null,
		},
		tipos: {
			type: Array,
			default: () => [],
		},
		endPoint: {
			type: String,
			default: () => "research_units",
		},
		id: {
			type: String,
			default: () => "panel-premios",
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
		...mapActions("unidad/premios", ["save", "update", "awards"]),
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update" }),
		awardEdit(data) {
			//console.clear();
			console.log("data", data);
			//root.baseObjA=root.baseEnt;
			root.editPremio = true;
			root.baseObjA = data;
			root.panelGridDoc.fadeOut(function(params) {
				root.panelDataDoc.fadeIn(function(params) {});
			});
		},
		premioAdd() {
			root.editPremio = false;
			root.baseObjA = root.baseEnt;
			//this.awardCancel();
			root.panelGridDoc.fadeOut(function(params) {
				root.panelDataDoc.fadeIn();
			});
		},
		parNal(cellInfo) {
			return cellInfo.value ? "Nacional" : "Internacional";
		},

		awardCancel() {
			
			this.loaderHide();
			root.editPremio = false;
			root.baseObjA = root.baseEnt;
			root.panelDataDoc.fadeOut(function(params) {
				root.panelGridDoc.fadeIn();
			});
		},

		loadEnd() {
			this.loading = false;
		},

		awdSave() {
			console.log(this.$sep);
			var result = root.$refs.basicGroup.instance.validate();
			console.log("result", result);
			if (result.isValid) {
				console.log("VALID!");
				if (root.editPremio === false) root.baseObjA.created_by = root.user_id;
				if (root.editPremio === true) root.baseObjA.updated_by = root.user_id;

                let obj=root.baseObjA;
				//alert("nueva data "+obj.id);
				let dto = {
					unidadId: root.mainObj.id,
					rute:"research_creation_works",
					stringEP:"awards",
					mod: obj.id,
					objectSend:{ award : obj },
					cb: function(item) {
						console.log("item", item);
						root.grid.refresh();
						root.loaderHide();
						root.awardCancel();
					},
				};
				console.log("root.mode", root.mode);
				console.log("root.mode", root.dto);
				if (root.editPremio === true) root.objUpdate(dto);
				else root.objSave(dto);
				console.log(dto);
			}
			
			//root.loaderHide();
			//root.cancel();
			root.awardCancel();
		},
		cancel() {
			root.editPremio = false;
			return null;
		},
		gridInit(e) {
			console.log("e", e);
			this.grid = e.component;
			//$(".dx-toolbar-after").append($("#btn-add-doc"));
			this.loadEnd();
		},
	},
};
</script>
