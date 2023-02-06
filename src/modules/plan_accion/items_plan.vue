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
					<router-link tag="a" :to="'/unidad/'+$route.params.unidadId+'/plan_accion'" class="btn btn-main btn-labeled mr-1  btn-labeled-left legitRipple" title="regresar al Listado">
						<b><i class="icon-database-remove"></i></b> Regresar al Listado
					</router-link>
				
					<router-link tag="a" :to="'/unidad/'+$route.params.unidadId" class="btn btn-main btn-labeled btn-labeled-left mr-1 legitRipple" title="regresar al Listado">
						<b><i class="icon-info"></i></b> información del Grupo
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
										<div class="sub-title"><i class="icon-books"></i>{{$titleCase(group.name)}}<br>
										<small v-if="dateplansys.is_draft==true && dateplansys.management_report_is_draft==true">Editando Plan de Acción</small>
										<small v-if="dateplansys.is_draft==false && dateplansys.management_report_is_draft==true">Editando Informe de Gestión</small>
										<small v-if="dateplansys.is_draft==false && dateplansys.management_report_is_draft==false">Informe de Gestión</small>
										</div>
										
										<div class="header-elements" v-if="dateplansys.is_draft==false && dateplansys.management_report_is_draft==true">
											<button type="button" @click.prevent="retorno2()" title="Volver al trabajo.." class="btn btn-warning btn-labeled btn-labeled-left ">
												<b><i class="icon-database-add"></i></b> Concluir Informe de Gestion 
											</button>
										</div>

										<div class="header-elements" v-if="dateplansys.is_draft==true && dateplansys.management_report_is_draft==true">
											<button type="button" @click.prevent="retorno()" title="Volver al trabajo.." class="btn btn-warning btn-labeled btn-labeled-left ">
												<b><i class="icon-database-add"></i></b>  Plan de Accion
											</button>
										</div>

									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<DxAccordion :collapsible="false" :multiple="false" >
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
													title="Listado de Procesos de Formación"
													:actInfor="!dateplansys.is_draft"		
													titleBtn="Agregar Proceso"	
													titlecolum="product_type_name"
													:editing="dateplansys.is_draft==true || dateplansys.management_report_is_draft==true"
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
													:actInfor="!dateplansys.is_draft"
													:editing="dateplansys.is_draft==true || dateplansys.management_report_is_draft==true"
													titleBtn="Agregar Proyecto"	
													titlecolum="id"
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
													:actInfor="!dateplansys.is_draft"
													:editing="dateplansys.is_draft==true || dateplansys.management_report_is_draft==true"
													titleBtn="Agregar Producto"	
													titlecolum="product_type_name"
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
													:actInfor="!dateplansys.is_draft"
													:editing="dateplansys.is_draft==true || dateplansys.management_report_is_draft==true"
													titleBtn="Agregar Producto"	
													titlecolum="product_type_name"
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
													:actInfor="!dateplansys.is_draft" 
													:editing="dateplansys.is_draft==true || dateplansys.management_report_is_draft==true"
													titleBtn="Agregar Recurso"	 
													titlecolum="type_description"
												/>
											</template>
										</DxItem> 

										<DxItem title="Redes Académicas de Promoción Científica y/o Artística " icon="sphere" id="plan_accion" data-idx="1">
											<template #default>
												<RedesAcademicas
													:group="group"
													:action_panel_id="parseInt($route.params.planId)"  
													:editMode="editMode" 
													title="Listado de Redes Académicas de Promoción Científica"	
													:actInfor="!dateplansys.is_draft"
													:editing="dateplansys.management_report_is_draft==true"							
													:totalLineasInv="listlines"
													titleBtn="Agregar Rede Academica"	
													titlecolum="name"
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
			
			<div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<span class="font-weight-semibold">editMode:</span> {{ editMode }}
						<hr class="sep mb-0" />
						<span class="font-weight-semibold">group:</span> {{ JSON.stringify(dateplansys, null, 3) }}
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
import DataSource from "devextreme/data/data_source";

export default {

	created: function() {
		root = this;
		// document.title += ` ${root.$titleCase(root.group.name)}`;
		

		root.LineasInvConocimiento({
          parent_id: 159,
          cb: function (results) {
            root.listlines = root.listlines.concat(results);
          },
        });

        root.LineasInvConocimiento({
          parent_id: 511,
          cb: function (results) {
            root.listlines = root.listlines.concat(results);
          },
        });

        root.LineasInvConocimiento({
          parent_id: 512,
          cb: function (results) {
            root.listlines = root.listlines.concat(results);
          },
        });

        root.LineasInvConocimiento({
          parent_id: 513,
          cb: function (results) {
            root.listlines = root.listlines.concat(results);
          },
        });

        root.LineasInvConocimiento({
          parent_id: 514,
          cb: function (results) {
            root.listlines = root.listlines.concat(results);
          },
        });



		root.getUnit({
			id: root.$route.params.unidadId,
			cb: function(result) {
				root.group = result;
				document.title += ` ${root.$titleCase(root.group.name)}`;
				root.loadMembers();
			},
		});
		// root.eval();
		//root.line_group=root.selectorLineas(root.listlines);
	},

	data() {
		return {
			editarInf:true,
			dateplansys:{},
			listlines:[],
			tp: null,
			group: null,
			baseObjx: {
				execution_validity: 0,
				is_draft: true,
				active: true,
			},
			baseObjc: {
				management_report_is_draft: true,
				updated_by: null,
			}
		};
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		
		
	},
	mounted() {
		console.clear();
		console.log("Ingresando a plan de accion...");
		root = this;
		// root.loadLineasInv()
		
		let args={url:null, cb:{}};
		args.url=`action_plans/${root.$route.params.planId}`;
		args.cb = function(item) {
						console.warn("date planaction", item);
						root.dateplansys=item;
						root.loaderHide();
					};
		let dataplan = root.getplan(args);
		
		console.warn("datos del plan", root.dateplansys);
		console.log("obheto grupo", root.group);
		// root.eval(dataplan);
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
		...mapActions("unidad/producto/universalSentUpAct", { getplan: "get", objSave: "save", objUpdate: "update", elementoActive: "active" }),
		...mapActions("unidad/indicadores", { LineasInvConocimiento: "getAreasKnow" }),
		loadMembers() {
		// console.log("members", root.group.member_ids);
		},

		nuevoInfo(){
			let msg = "Guardando Plan de Acción";
			root.loaderShow(msg);
			root.baseObjc.updated_by = root.user_id;
			root.baseObjc.management_report_is_draft = false;
			// root.baseObjc.active = true;
			let obj = root.baseObjc;
			if(root.baseObjc.updated_by!=null){
				console.warn(root.baseObjx);
				let dto = {
					unidadId: root.group.id,
					stringEP: "ap_management_reports",
					mod: root.$route.params.planId,
					newFormat:true,
					objectSend: { ap_management_report: obj },
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
		
	

	// selectorLineas(results){
    //   let limpio = [];
    //   let datax = results;
    //   for (let i = 0; i < root.group.research_focus_ids.length; i++) {
    //     limpio = limpio.concat(datax.filter((datax) => parseInt(datax.id) ==  parseInt(root.group.research_focus_ids[i]) ) );
    //   }
    //   root.contLineas=limpio.length;
    //   console.warn("cantidad de llineas", root.contLineas);
    //   return limpio;
    // },
		
		nuevoPlan(){
			let msg = "Guardando Plan de Acción";
			root.loaderShow(msg);
			
			root.baseObjx.updated_by = root.user_id;
			root.baseObjx.is_draft = false;
			root.baseObjx.active = true;
			let obj = root.baseObjx;
			console.warn(root.baseObjx);
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
					root.baseObjx.execution_validity = root.group.execution_validity;
					root.nuevoPlan();
				}
			});
		},

		retorno2() {
			let msg = `¿Realmente desea guardar y terminar este Informe de Gestion? <br>Recuerde que una vez finalizado no podrá editar información.`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.baseObjx.execution_validity = root.group.execution_validity;
					root.nuevoInfo();
				}
			});
		},

	},
};
</script>