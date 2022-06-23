<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :show-nav-buttons="true" :animation-enabled="true" :multiple="true" ref="tabPanel">

				<DxItem title="1. Datos de Movilidad">
					<template #default>
                        <div class="card-body">
						<div class="page-title d-flex">
                            <h2>
                                <i class="icon-info mr-1 color-main-600"></i>
                                <span class="font-weight-semibold" id="title">Información de la Postulación</span>
                            </h2>
                        </div>
						
						<div class="row p-3">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Nombre del evento: </label>
                                    <p class="texto">{{baseObj.event_name}}</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Nombre de la ponencia: </label>
                                    <p class="texto">{{baseObj.paper_name}}</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Fecha del evento: </label>
                                    <p class="texto">{{baseObj.event_date}}</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>N° del Evento: </label>
                                    <p class="texto">{{baseObj.event_edition_number}}</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Grupo por el cual se presenta: </label>
                                    <p class="texto">{{baseObj.research_group_name}}</p>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Organizado por la Universidad: </label>
                                    <p class="texto">{{baseObj.is_organizer==true? "Si": "No"}}</p>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Aplicación: </label>
                                    <p class="texto">{{baseObj.active==true? "Activa": "Desactivada"}}</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Pagina del evento: </label>
                                    <p><a v-if="baseObj.event_page != ''" :title="baseObj.event_page" class="cmd-item color-main-600 mr-2" :href="baseObj.event_page" Target="_blank">
                                        <i class="icon-link"></i> Web del Evento
                                    </a></p>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>País: </label>
                                    <p class="texto">{{baseObj.geo_country_name}}</p>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Estado: </label>
                                    <p class="texto">{{baseObj.geo_state_name}}</p>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Ciudad: </label>
                                    <p class="texto">{{baseObj.geo_city_name}}</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Fecha Aplicación: </label>
                                    <p class="texto">{{convertirFecha(baseObj.created_at)}}</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Fecha Modificación: </label>
                                    <p class="texto">{{convertirFecha(baseObj.updated_at)}}</p>
                                </div>
                            </div>
                        </div>

					</div></template>
				</DxItem>
                
                <DxItem title="2. Datos Básicos del Aspirante">
					<template #default>
                        <div class="row">
                            <informacionAspirante :inforBase="baseObj"></informacionAspirante> 
                        </div>
					</template>
				</DxItem>

                <DxItem title="3. Documentos">
					<template #default>
						<vistaDocumentos :id_mobility="baseObj.id"/>
					</template>
				</DxItem>

                <DxItem title="4. Criterios de Evaluación">
					<template #default>
                        <div class="card-body">
                            <div class="page-title d-flex">
                                <h2>
                                    <i class="icon-info mr-1 color-main-600"></i>
                                    <span class="font-weight-semibold" id="title">Formulario de calificación y aceptacion del aspirante</span>
                                </h2>
                            </div>
                            <Evaluacion :inforBase="baseObj" :syncObject="saveUpdateeval"/>
                        </div>
					</template>
				</DxItem>
				
			</DxTabPanel>
		</div>


        <div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body"><strong>saveUpdateEval:</strong> {{ JSON.stringify(saveUpdateeval, null, 3) }}</div>
				</div>
			</div>
		</div>


	</div>
</template>


<script>
let root;
import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";
export default {
	name: "movilidadAspirantes",
	components: {
		DxItem,
		DxTabPanel,
		VistaDocumentos: () => import("@/modules/convocatoria/movilidad/vista_documentos.vue"),
        informacionAspirante: () => import("@/modules/convocatoria/movilidad/informacion_base.vue"),
        Evaluacion: () => import("@/modules/convocatoria/movilidad/eval_criterios.vue"),
	},
	data() {
		return {
			tp: null,
            saveUpdateeval:{
                valueCriterios:[],
                state:false,

            }
		};
	},
	mounted() {
		console.clear();
		root = this;
		root.tp = root.$refs.tabPanel.instance;
		
		root.tp.option("onItemClick", function() {
			console.log("pestaña CLICK!");
		});
	},
	props: {
		
		group: {
			type: Object,
			default: () => {},
		},
        baseObj: {
			type: Object,
			default: () => {},
		},
	},
    methods:{
        convertirFecha(timestamp){
            var date = new Date(timestamp);
            return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
      }
    },
};
</script>

<style scoped>
.texto{
    color: darkslategrey;
}

</style>
