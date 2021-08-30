<template>
	<div v-if="group">
		<div>
			<Header :group="group" 	:action_panel_id="$route.params.planId"   /> 
			<div class="page-header header-elements-md-inline" id="panel-unidades-head">
				<div class="page-title d-flex">
					<h1>
						<i class="icon-clipboard mr-1 color-main-600"></i>
						<span class="font-weight-semibold" id="title">Plan de Acción</span>
						<span id="msg"></span>
					</h1>
					<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
				</div>
				<!-- <div class="header-elements" v-if="es_admin"> -->
				<div class="header-elements" v-if="true">
					<router-link tag="a" :to="'/unidad/'+$route.params.unidadId+'/plan_accion'" class="btn btn-main btn-labeled btn-labeled-left legitRipple" title="regresar al Listado">
						<b><i class="icon-database-remove"></i></b> Regresar al Listado
					</router-link>
				</div>
			</div>

			<div class="row">
				<div class="col">
					<div class="card" id="panel-produccion">
						<div class="card-body group-detail mh">
							<div class="row mb-3">
								<div class="col">
									<div class="col d-flex justify-content-between align-items-end">
										<div class="sub-title"><i class="icon-trophy"></i>{{$titleCase(group.name)}}</div>
										<div class="header-elements" v-if="true">
											<button type="button" @click.prevent="retorno()" title="Volver al trabajo.." class="btn btn-main btn-labeled btn-labeled-left ">
												<b><i class="icon-database-add"></i></b> Guardar y Cerrar 
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<DxAccordion :collapsible="false" :multiple="false">
										<template #title="{ data }"
											>
											<div class="col pt-2 pb-2"><i :class="'icon-' + data.icon"></i>{{ data.title }}</div>
										</template>

										<DxItem title="Proceso de Formación para la Investigación/Investigación Formativa" icon="rocket" id="plan_accion" data-idx="1">
											<template #default>
												<ProcesoFormacion
													:group="group"
													:action_panel_id="parseInt($route.params.planId)" 
													:editMode="editMode" 
													title="Listado de Procesos de Formacion" 
															
													titleBtn="Agregar Proceso"	
													titlecolum="title"
												/>
											</template>
										</DxItem>

										<DxItem title="Proyecto de Investigación en el Periodo Anual" icon="meter" id="plan_accion" data-idx="1">
											<template #default>
												<ProyectoInvestigacion
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"   
													:editMode="editMode" 
													title="Listado de Proyectos de Investigación" 
															
													titleBtn="Agregar Proyecto"	
													titlecolum="title"
												/>
											</template>
										</DxItem>

										<DxItem title="Productos Resultado de Procesos de Investigación Creacion e Innovación a Generar para el Periodo Anual" icon="lab" id="plan_accion" data-idx="1">
											<template #default>
												<ProductosResultados
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"    
													:editMode="editMode" 
													title="Listado de Productos Resultado de Investigación Creacion" 
															
													titleBtn="Agregar Producto"	
													titlecolum="title"
												/>
											</template>
										</DxItem>

										<DxItem title="Productos Con Potencialidad de Transferencia a prestar a la OTRI-Bogotá en el Periodo Anual " icon="road" id="plan_accion" data-idx="1">
											<template #default>
												<ProductosTransferencia
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"  
													:editMode="editMode" 
													title="Listado de Productos Con Potencialidad  de Transferencia" 
															
													titleBtn="Agregar Producto"	
													titlecolum="title"
												/> 
											</template>
										</DxItem>

										<DxItem title="Recursos con que cuenta el Grupo para el Desarrollo de las Actividades de Investigación " icon="calculator" id="plan_accion" data-idx="1">
											<template #default>
												<RecursosGrupo
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"   
													:editMode="editMode" 
													title="Listado de Recursos con que cuenta el Grupo para el Desarrollo"													
 
															
													titleBtn="Agregar Recurso"	
													titlecolum="title"
												/>
											</template>
										</DxItem>
<!-- 
										<DxItem title="Recursos con que cuenta el Grupo para el Desarrollo de las Actividades de Investigación" icon="calculator" id="plan_accion" data-idx="1">
											<template #default>
												<div>
												<h4>
													Nota: Esta sección solamente debe ser diligenciado por los Grupos de Investigación-Creación e Innovación
												</h4>
												<RecursosGrupo
													:group="group"
													:action_panel_id="root.$route.params.planId"   
													:editMode="editMode" 
													title="Listado de Recursos con que cuenta el Grupo para el Desarrollo" 
															
													titleBtn="Agregar Recurso"	
													titlecolum="title"
												/></div>
												<!- - <NuevoConocimiento :group="group"
													:action_panel_id="root.$route.params.planId"   :editMode="editMode" /> - ->
											</template>
										</DxItem> -->

										<DxItem title="Redes Académicas de Promoción Científica y/o Artística " icon="sphere" id="plan_accion" data-idx="1">
											<template #default>
												<RedesAcademicas
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"  
													:editMode="editMode" 
													title="Listado de Redes Académicas de Promoción Cientifica"													
 
															
													titleBtn="Agregar Rede Academica"	
													titlecolum="title"
												/>
											</template>
										</DxItem>


										
										
									</DxAccordion>
								</div>
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
import DxAccordion, { DxItem } from "devextreme-vue/accordion";
export default {

	created: function() {
		root = this;
		// document.title += ` ${root.$titleCase(root.group.name)}`;
		root.getUnit({
			id: root.$route.params.unidadId,
			cb: function(result) {
				root.group = result;
				document.title += ` ${root.$titleCase(root.group.name)}`;
				root.loadMembers();
			},
		});
		
	},

	data() {
		return {
			tp: null,
			group: null,
			baseObjx: {
				execution_validity: 0,
				is_draft: true,
				active: true,
			}
		};
	},
	mounted() {
		console.clear();
		console.log("Ingresando a plan de accion...");
		root = this;
		console.log("obheto grupo", root.group);
	},

	components: {
		DxItem,
		DxAccordion,
		ProcesoFormacion: () => import("@/modules/plan_accion/forms/proceso_formacion"),
		// NuevoConocimiento: () => import("@/modules/unidad/productos/nuevo_conocimiento"),
		ProductosTransferencia: () => import("@/modules/plan_accion/forms/productos_transferencia"),  
		RedesAcademicas: () => import("@/modules/plan_accion/forms/redes_academicas"),  
		ProyectoInvestigacion: () => import("@/modules/plan_accion/forms/proyecto_investigacion"),
		ProductosResultados: () => import("@/modules/plan_accion/forms/productos_resultado"),  
		RecursosGrupo: () => import("@/modules/plan_accion/forms/recursos_grupo")
	},
	methods: {
		...mapActions("unidad", ["getUnit", "getResearchers", "saveResearcher", "updateResearcher"]),
		...mapActions("unidad/producto/universalSentUpAct", { objSave: "save", objUpdate: "update", elementoActive: "active" }),
		loadMembers() {
		// console.log("members", root.group.member_ids);
		},

		nuevoPlan(){
			let msg = "Guardando Plan de Acción";
			root.loaderShow(msg);
			root.baseObjx.updated_by = root.user_id;
			root.baseObjx.is_draft = false;
			root.baseObjx.active = true;
			let obj = root.baseObjx;
			if(root.baseObjx.updated_by!=null){
				console.warn(root.baseObjx);
				let dto = {
					unidadId: root.group.id,
					stringEP: "action_plans",
					mod: root.$route.params.planId,
					newFormat:true,
					objectSend: { action_plan: obj },
					cb: function(item) {
						console.log("dato", item);
						//root.grid.refresh();
						// root.$router.go('/unidad/'+root.$route.params.unidadId+'/plan_accion');
						root.go(0, `/unidad/${root.$route.params.unidadId}/plan_accion`, 'Cargando Ingreso de Datos');
						root.loaderHide();
					},
				};
				console.log("root.mode", this.user_role_id === this.get_role_id("administrador"));
				root.objUpdate(dto);
			}else{
				root.loaderHide();
			}	
		},


		retorno() {
			let msg = `¿Realmente desea guardar y terminar este plan de acción? <br>Recuerde que una vez finalizado no podrá editar información.`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.nuevoPlan();
				}
			});
		},
	},
};
</script>
