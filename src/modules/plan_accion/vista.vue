<template>
    <div>
        <div class="page-header header-elements-md-inline" id="panel-unidades-head">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-eye2 mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">Vista Impresión</span>
					<span id="msg"> &raquo; Plan de Acción</span>
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>

            

            
			<!-- <div class="header-elements" v-if="es_admin"> -->
            <div class="header-elements" v-if="true">
				<router-link tag="a" :to="'/unidad/'+$route.params.unidadId+'/plan_accion'" class="btn btn-main btn-labeled btn-labeled-left legitRipple" title="regresar al Listado">
					<b><i class="icon-database-remove"></i></b> Regresar al Listado
				</router-link>

                <a
					href="#"
					@click="download"
					title="Volver a Unidades..."
					class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2">
					<b><i class="icon-file-pdf"></i></b> Vista de Impresión
				</a>

                <!-- <a
					href="#"
					@click="print"
					title="Volver a Unidades..."
					class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2">
					<b><i class="icon-file-pdf"></i></b> Vista de Impresión
				</a> -->

			</div>

		</div>

        <div class="row">
			<div class="col">
                        

                        <vue-html2pdf
                            :show-layout="false"
                            :float-layout="true"
                            :enable-download="false"
                            :preview-modal="true"
                            :paginate-elements-by-height="1400"
                            :filename="datax"
                            :pdf-quality="2"
                            :manual-pagination="false"
                            pdf-format="legal"
                            pdf-orientation="portrait"
                            pdf-content-width="98%"
                            ref="html2Pdf"
                        >
<!--                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       -->
                            <section slot="pdf-content">

                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <table width="100%" border="0">
                                            <thead>
                                                <tr>
                                                    <th rowspan="3"><center><img :src="imgUrl + '/escudo.png'" alt="UDis" width="95" /></center></th>
                                                    <th><center>PLAN DE ACCIÓN ANUAL DE GRUPO Y/O SEMILLERO DE <br>INVESTIGACIÓN-CREACIÓN E iNNOVACIÓN</center></th>
                                                    <th rowspan="3"><center><img :src="imgUrl + '/sigud.png'" alt="UDis" width="150" /></center></th>
                                                </tr>
                                                <tr>
                                                    <td align="center">Macoproceso: Gestión Académica</td>
                                                </tr>
                                                <tr>
                                                    <td align="center">Proceso: Gestión de Investigación</td>
                                                </tr>
                                            </thead>
                                        </table> 
                                    </div>
                                </div>	
                                

                                <br />
                                    <div class="card-body group-detail mh">
                                                <div class="row">
                                                    <div class="col-md-12 mt-3">                                       
                                                                <fieldset>
                                                                     <legend><small>1.0 Información Básica </small></legend>
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                    <div class="col-md-12">
                                                                                        <strong>Grupo de Investigación o Semillero: </strong>{{group.name}}
                                                                                    </div>
                                                                                    <div class="col-md-12">
                                                                                        <strong>Fecha de Registro Grupo:</strong> {{group.cidc_registration_date}}
                                                                                    </div>
                                                                                    <div class="col-md-12">
                                                                                        <strong>Codigo Colciencias: </strong>{{group.colciencias_code}}
                                                                                    </div>
                                                                                    <div class="col-md-12">
                                                                                        <strong>Enlace GrupLac (SIENTI):</strong> <a :href="group.gruplac" target="_blank">{{group.gruplac}}</a>
                                                                                    </div>
                                                                                    
                                                                                    <div class="col-md-12">
                                                                                        <strong>Correo de Contácto:</strong> <a :href="'mailto:'+group.email" target="_blank">{{group.email}}</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </fieldset>
                                                    </div>
                                                </div>							


                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                             <legend><small>Proceso de Formación para la Investigación/Investigación Formativa </small></legend>
                                                           
                                                <ProcesoFormacion
													:group="group"
													:action_panel_id="parseInt($route.params.planId)" 
													:editMode="editMode" 
													title="Listado de Procesos de Formacion" 
															
													titleBtn="Agregar Proceso"	
													titlecolum="title"
                          :validateImp="true"
												/>

                                                        </fieldset>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                             <legend><small>Proyecto de Investigación en el Periodo Anual </small></legend>
                                                             <ProyectoInvestigacion
                                                                :group="group"
                                                                :action_panel_id="parseInt($route.params.planId)"   
                                                                :editMode="editMode" 
                                                                title="Listado de Proyectos de Investigación" 
                                                                        
                                                                titleBtn="Agregar Proyecto"	
                                                                titlecolum="title"
                          :validateImp="true"
                                                            />
                                                        </fieldset>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                             <legend><small>Productos Resultado de Procesos de Investigación Creacion e Innovación a Generar para el Periodo Anual </small></legend>
                                                             <ProductosResultados
                                                                :group="group"
                                                                :action_panel_id="parseInt($route.params.planId)"    
                                                                :editMode="editMode" 
                                                                title="Listado de Productos Resultado de Investigación Creacion" 
                                                                        
                                                                titleBtn="Agregar Producto"	
                                                                titlecolum="title"
                          :validateImp="true"
                                                            />
                                                        </fieldset>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                             <legend><small>Productos Con Potencialidad de Transferencia a prestar a la OTRI-Bogotá en el Periodo Anual  </small></legend>
                                                             <ProductosTransferencia
                                                                :group="group"
                                                                :action_panel_id="parseInt($route.params.planId)"  
                                                                :editMode="editMode" 
                                                                title="Listado de Productos Con Potencialidad  de Transferencia" 
                                                                        
                                                                titleBtn="Agregar Producto"	
                                                                titlecolum="title"
                          :validateImp="true"
                                                            /> 
                                                    </fieldset>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                             <legend><small>Recursos con que cuenta el Grupo para el Desarrollo de las Actividades de Investigación </small></legend>
                                                             <RecursosGrupo
                                                                :group="group"
                                                                :action_panel_id="parseInt($route.params.planId)"   
                                                                :editMode="editMode" 
                                                                title="Listado de Recursos con que cuenta el Grupo para el Desarrollo"        
                                                                titleBtn="Agregar Recurso"	
                                                                titlecolum="title"
                          :validateImp="true"
                                                            />
                                                        </fieldset>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                             <legend><small>Redes Académicas de Promoción Científica y/o Artística </small></legend>
                                                          

                                                <!-- <RedesAcademicas
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"  
													:editMode="editMode" 
													title="Listado de Redes Académicas de Promoción Cientifica"													
                                                    :validateImp="true"
													titleBtn="Agregar Rede Academica"	
													titlecolum="title"
												/> -->


                                                        </fieldset>
                                                    </div>
                                                </div>
                                    </div>
                            </section>
                        </vue-html2pdf>

            </div>
        </div>

        <div class="row">
			<div class="col">
                <div class="card" id="panel-plan-accion">
					<div class="card-body group-detail mh">
                        
                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                             <legend><small>Información Básica </small></legend>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <strong>Grupo de Investigación o Semillero: </strong>{{group.name}}
                                                        </div>
                                                        <div class="col-md-12">
                                                            <strong>Fecha de Registro Grupo:</strong> {{group.cidc_registration_date}}
                                                        </div>
                                                        <div class="col-md-12">
                                                            <strong>Codigo Colciencias: </strong>{{group.colciencias_code}}
                                                        </div>
                                                        <div class="col-md-12">
                                                            <strong>Enlace GrupLac (SIENTI):</strong> <a :href="group.gruplac" target="_blank">{{group.gruplac}}</a>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <strong>Fecha de Registro Grupo:</strong> {{group.cidc_registration_date}}
                                                        </div>
                                                        <div class="col-md-12">
                                                            <strong>Correo de Contácto:</strong> <a :href="'mailto:'+group.email" target="_blank">{{group.email}}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>							


                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                             <legend><small>Proceso de Formación para la Investigación/Investigación Formativa </small></legend>
                                              <ProcesoFormacion
													:group="group"
													:action_panel_id="parseInt($route.params.planId)" 
													:editMode="editMode" 
													title="Listado de Procesos de Formacion" 
															
													titleBtn="Agregar Proceso"	
													titlecolum="title"
                          :validateImp="true"
												/>
                                         
                                        </fieldset>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                             <legend><small>Proyecto de Investigación en el Periodo Anual </small></legend>
                                             <ProyectoInvestigacion
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"   
													:editMode="editMode" 
													title="Listado de Proyectos de Investigación" 
															
													titleBtn="Agregar Proyecto"	
													titlecolum="title"
                          :validateImp="true"
												/>
                                             
                                        </fieldset>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                             <legend><small>Productos Resultado de Procesos de Investigación Creacion e Innovación a Generar para el Periodo Anual </small></legend>
                                            <ProductosResultados
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"    
													:editMode="editMode" 
													title="Listado de Productos Resultado de Investigación Creacion" 
															
													titleBtn="Agregar Producto"	
													titlecolum="title"
                          :validateImp="true"
												/>
                                             

                                        </fieldset>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                             <legend><small>Productos Con Potencialidad de Transferencia a prestar a la OTRI-Bogotá en el Periodo Anual  </small></legend>
                                             <ProductosTransferencia
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"  
													:editMode="editMode" 
													title="Listado de Productos Con Potencialidad  de Transferencia" 
													titleBtn="Agregar Producto"	
													titlecolum="title"
                          :validateImp="true"
												/> 
                                        </fieldset>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                             <legend><small>Recursos con que cuenta el Grupo para el Desarrollo de las Actividades de Investigación </small></legend>
                                              <RecursosGrupo
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"   
													:editMode="editMode" 
													title="Listado de Recursos con que cuenta el Grupo para el Desarrollo"
													titleBtn="Agregar Recurso"	
													titlecolum="title"
                                                    :validateImp="true"
												/>                                                          
                                        </fieldset>
                                    </div>
                                </div>

                                <br />

                                <div class="row">
                                    <div class="col-md-12">
                                        <fieldset>
                                             <legend><small>Redes Académicas de Promoción Científica y/o Artística </small></legend>
                                            <RedesAcademicas
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"  
													:editMode="editMode" 
													title="Listado de Redes Académicas de Promoción Cientifica"													
                                                     :validateImp="true"
													titleBtn="Agregar Rede Academica"	
													titlecolum="title"
												/>
                                         </fieldset>   
                                    </div>
                                </div>


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
import { mapActions, mapGetters, mapState } from "vuex";
import DxStore from "@/store/dx";
import VueHtml2pdf from 'vue-html2pdf'


export default {
	created: function() {
		root = this;
		root.getUnit({
			id: root.$route.params.unidadId,
			cb: function(result) {
				root.group = result;
				document.title += ` ${root.$titleCase(root.group.name)}`;
				// root.loadMembers();
			},
		});
	},
	data: () => ({

        popupObs: false,
		observarData: "",
		editData: null, //sirve para dejar formulario en limpio o llenar datos
		tipoproceso:[],
		grid: null,
		mode: null,
		unidad: null,
		section: null,
		tipos: 781,
		totaCount: 0,
		isValid: false,
		panelData: null,
		panelGrid: null,
		panelParticipantes: null,
		panelDocs: null,
		panelCmds: null,
		baseEntity: null,
		docLink: null,
		firstLoad: true,
		group: null,
		// dataSource: data,
        
	}),
	components: {
        VueHtml2pdf, 
        ProcesoFormacion: () => import("@/modules/plan_accion/forms/proceso_formacion"),
        ProductosTransferencia: () => import("@/modules/plan_accion/forms/productos_transferencia"),  
		RedesAcademicas: () => import("@/modules/plan_accion/forms/redes_academicas"),  
		ProyectoInvestigacion: () => import("@/modules/plan_accion/forms/proyecto_investigacion"),
		ProductosResultados: () => import("@/modules/plan_accion/forms/productos_resultado"),  
        RecursosGrupo: () => import("@/modules/plan_accion/forms/recursos_grupo"),
        VistaRedesAcademicas: () => import("@/modules/plan_accion/forms/vista_redes_academicas"),  
    },
    computed: {
        datax(){
            const d = new Date();
            return "Paln_accion_"+d.getTime();
        },

    },
	methods: {
		...mapActions("unidad", ["getUnit", "getResearchers"]),
		// loadMembers() {
		// 	console.log("members", root.group.member_ids);
		// },
		estadoEntrega(cellInfo) {
			return cellInfo.value ? "Terminado" : "Editando...";
		},	
        download() {
            this.$refs.html2Pdf.generatePdf()
        },

        // gridInit(e) {
		// 	this.grid = e.component;
		// },
        

	},
};
</script>

<style>

</style>