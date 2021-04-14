<template>
	<div v-if="group">
		<Header :group="group" />
		<div class="row">
			<div class="col">
				<div class="card" id="panel-usuarios">
					<div class="card-body group-detail">
						<div class="row mb-3">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-end">
									<div class="title"><i class="icon-books"></i> {{ $titleCase(group.name) }}</div>
									<div class="sub-title"><i class="icon-file-pdf"></i> Documentos</div>
									<a href="#" @click.prevent="userAdd" class="btn btn-sm btn-main btn-labeled btn-labeled-right btn-sm legitRipple ml-3 slide" id="btn-add">
										AGREGAR DOCUMENTO <b><i class="icon-user-plus"></i></b>
									</a>
								</div>
							</div>
						</div>
						<Documentos id="panel-unidad-documentos" end-point="research_units" :main-obj="group" :parent="this" :tipos="tiposDocumento" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
// https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns
let $ = window.jQuery,
	root = null;
import {
	DxColumn,
	DxColumnChooser,
	DxExport,
	DxDataGrid,
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
import { DxButton, DxSelectBox, DxSwitch, DxTextBox, DxNumberBox, DxValidationGroup } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import Notify from "devextreme/ui/notify";
import { mapActions, mapGetters, mapState } from "vuex";
let hideErrors = () => {
	$("#panel-basicos .dx-fileuploader-files-container").hide();
	$("#panel-basicos .dx-invalid-message").hide();
	$("#panel-basicos .dx-invalid").removeClass("dx-invalid");
};

export default {
	name: "datosBasicos",
	created: function() {
		// console.clear();
		root = this;
		root.tiposDocumento = root.subtypesByType("unidad_tipo_documento");
		root.getUnit({
			id: root.$route.params.unidadId,
			cb: function(result) {
				root.group = result;
				document.title += ` ${root.$titleCase(root.group.name)}`;
			},
		});
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
	},
	updated: () => {
		console.log(root.$sep);
		hideErrors();
	},
	components: {
		Header: () => import("@/components/element/header"),
		Documentos: () => import("@/components/element/documentos"),
	},
	mounted() {
		setTimeout(function() {
			$("#panel-unidad-documentos").fadeIn();
		}, 500);
	},
	data: () => ({
		group: null,
	}),
	methods: {
		...mapActions("unidad", ["getUnit"]),
	},
};
</script>
