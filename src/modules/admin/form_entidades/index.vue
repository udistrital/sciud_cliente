// Advertencia:
// para la ejeccuon de estas vistas se requiere instalar:
// npm install jspdf jspdf-autotable

<template>
	<div>

		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-books mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">Entidades</span>
					<span> &raquo; Representantes y Contactos</span>
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>

			<div class="header-elements">
				<router-link tag="a" :to="'/admin/entidades'" class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2" title="Entidades...">
                    <b><i class="icon-arrow-left2"></i></b> Regresar a Entidades
                </router-link>
				<router-link tag="a" :to="'/admin/entidades/'+$route.params.idEnt+'/dependencias'" class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2" title="Entidades...">
                    <b><i class="icon-info"></i></b>Listar Dependencias Entidad
                </router-link>
				<!-- <a
					href="#"
					@click.prevent="go(group.id, '/admin/entidades', `Cargando Entidades`)"
					title="Volver a Unidades..."
					class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2">
					<b><i class="icon-arrow-left2"></i></b> Entidades
				</a> -->
			</div>
			
		</div>


		<div class="row">
			<div class="col">
				<div class="card" id="panel-plan-accion">
					<div class="card-body group-detail mh">
						
						<div class="row mb-3">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-end">
									<div class="title"><i class="icon-info"></i><small> <i>Informacion Básica </i>  &raquo; {{entidad.name}}</small></div>
									<!-- <div class="sub-title"><i class="icon-history"></i>Gestion de Informacion</div> -->
								</div>
							</div>
						</div>

						
						
						

                        <p> </p>
                        <div v-if="$route.params.idDep!=0 && $route.params.idDep!=null" class="row">
							<div class="col-md-12">
								<fieldset>
									<legend>Contactos</legend>
										<div class="row grid">
											<div class="col">
												<h2></h2>
												<div class="p-0">
													<Contactos
                                                        :group="group" 
                                                        :editMode="true" 
                                                        title="Listado de Contactos"
                                                        endPointRute="hist_legal_representatives"
                                                        objEpdata="hist_legal_representative"
                                                        titleBtn="Nueva"	
                                                        titlecolum="legal_representative_name"
                                                    />
												</div>
											</div>
										</div>
								</fieldset>
							</div>
						</div>
						<div v-else class="row">
							<div class="col-md-12">
								<fieldset>
									<legend>Representante Legal</legend>
										<div class="row grid">
											<div class="col">
												<h2></h2>
												<div class="p-0">
													
                                                        <Representantes
                                                            :group="group" 
                                                            :editMode="true" 
                                                            title="Listado Representantes Legales"
                                                            endPointRute="hist_legal_representatives"
                                                            objEpdata="hist_legal_representative"
                                                            titleBtn="Nuevo"	
                                                            titlecolum="legal_representative_name"
                                                        />
                                                    
												</div>
											</div>
										</div>
								</fieldset>
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
						<span class="font-weight-semibold">editMode:</span> {{ editMode }}
						<hr class="sep mb-0" />
						<span class="font-weight-semibold">group:</span> {{ JSON.stringify(entidad, null, 3) }}
					</div>
				</div>
			</div>
		</div>


	</div>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root;

let $ = window.jQuery;
import DxStore from "@/store/dx";
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
import { DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator, DxPatternRule } from "devextreme-vue/validator";
import { DxDateBox, DxSelectBox, DxButton, DxTagBox, DxTextBox, DxNumberBox, DxTextArea, DxValidationGroup, DxPopup } from "devextreme-vue";


import { mapActions, mapGetters, mapState } from "vuex";
import DxAccordion, { DxItem } from "devextreme-vue/accordion";

export default {
	created: function() {
		root = this;
		root.isAdmin = (this.user_role_id === this.get_role_id('administrador'));
        root.group.id=root.$route.params.idEnt;
        root.loaderHide();
	},
    mounted: function() {
        root.loadEntidad;
	}, 
	data: () => ({
		group: null,
		isAdmin:false,
        entidad:{},
	}),
	components: {
		DxItem,
		DxAccordion,
		DxPopup,
		DxButton,
		DxColumn,
		DxPatternRule,
		DxColumnChooser,
		DxDataGrid,
		DxDateBox,
		DxNumberBox,
		DxFilterRow,
		DxGrouping,
		DxGroupItem,
		DxGroupPanel,
		DxLoadPanel,
		DxPager,
		DxPaging,
		DxRequiredRule,
		DxSearchPanel,
		DxSelectBox,
		DxSorting,
		DxSummary,
		DxTextArea,
		DxTextBox,
		DxValidator,
		DxValidationGroup,
        Representantes: () => import("@/modules/admin/form_entidades/representar"),
        Contactos: () => import("@/modules/admin/form_entidades/contactos"),
	},
	computed: {
        loadEntidad: async () =>{
			let dep=root.$route.params.idEnt;
			root.entidad= await root.getSerarchID({url: 'entities/' + dep });	
		}
	},	
	methods: {
		// ...mapActions("unidad", ["getUnit", "getResearchers", "saveResearcher", "updateResearcher"]),
		...mapActions("unidad/producto/universalSentUpAct", { getSerarchID: "univerdalID"}),

	},
};
</script>
