<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :show-nav-buttons="true" :animation-enabled="true" :multiple="true">
				
				
				
				<DxItem title="Consultorías en arte, arquitectura y diseño">
					<template #default>
						<ConsultoriasArtisticas
							:group="group" 
							:editMode="editMode" 
							title="Consultorías en arte, arquitectura y diseño"
							endPointRute="consultancies"
							objEpdata="consultancy"
							titleBtn="Agregar Consultoría Artistica"	
							titlecolum="title"
						/>
					</template>
				</DxItem>

				<DxItem title="Consultorías científicas">
					<template #default>
						<ConsultoriasCientificas
							:group="group" 
							:editMode="editMode" 
							title="Consultorías científicas- tecnologías"
							endPointRute="consultancies"
							objEpdata="consultancy"
							titleBtn="Agregar Consultoría científica"	
							titlecolum="title"
						/>
					</template>
				</DxItem>

				<DxItem title="Informes Técnicos">
					<template #default>
						<InformeTecnico
							:group="group" 
							:editMode="editMode" 
							title="Informes Técnicos"
							endPointRute="reports"
							objEpdata="report"
							titleBtn="Agregar Informe final"	
							titlecolum="name"
						/>
					</template>
				</DxItem>


				<DxItem title="Informe de Investigación">
					<template #default>
						<InformeFinal
							:group="group" 
							:editMode="editMode" 
							title="Informe Final de Investigación"
							endPointRute="reports"
							objEpdata="report"
							titleBtn="Agregar Informe final"	
							titlecolum="name"
						/>
					</template>
				</DxItem>

				<DxItem title="Nueva Secuencia Genética">
					<template #default>
						<SecuenciaGenetica
							:group="group" 
							:editMode="editMode" 
							title="Nueva Secuencia Genética"
							endPointRute="new_genetic_sequences"
							objEpdata="new_genetic_sequence"
							titleBtn="Agregar Nueva Secuencia"	
							titlecolum="name"
						/>
					</template>
				</DxItem>


				<DxItem title="Nueva Secuencia Genética">
					<template #default>
						<SecuenciaGenetica
							:group="group" 
							:editMode="editMode" 
							title="Nueva Secuencia Genética"
							endPointRute="new_genetic_sequences"
							objEpdata="new_genetic_sequence"
							titleBtn="Agregar Nueva Secuencia"	
							titlecolum="name"
						/>
					</template>
				</DxItem>
				
				<DxItem title="Working paper">
					<template #default>
						<DocumentoTrabajo
							:group="group" 
							:editMode="editMode" 
							title="Documento de trabajo (Working paper)"
							endPointRute="working_papers"
							objEpdata="working_paper"
							titleBtn="Nuevo Documento de trabajo"	
							titlecolum="title"
						/>
					</template>
				</DxItem>


				<DxItem title="Taller Creación">
					<template #default>
						<tallerCreacion
							:group="group" 
							:editMode="editMode" 
							title="Taller Creación"
							endPointRute="creation_workshops"
							objEpdata="creation_workshop"
							titleBtn="Nuevo taller Creación"	
							titlecolum="name"
						/>
					</template>
				</DxItem>


				<DxItem title="Red de Conomimiento">
					<template #default>
						<RedConocimiento 
							:group="group" 
							:editMode="editMode" 
							title="Red de conocimiento Especializado"
							endPointRute="knowledge_networks"
							objEpdata="knowledge_network"
							titleBtn="Nueva Red de Conocimiento"	
							titlecolum="name"
						/>
					</template>
				</DxItem>

				<DxItem title="Evento Científico">
					<template #default>
						<EventoCientifico :group="group" :editMode="editMode" />
					</template>
				</DxItem>

				<DxItem title="Eventos Artísticos de Arquitectura o de Diseño">
					<template #default>
						<EventoArtistico :group="group" :editMode="editMode" />
					</template>
				</DxItem>

				<DxItem title="Fortalecimiento o Solucion de Asuntos de Interes">
					<template #default>
						<AsuntosInteres 
							:group="group" 
							:editMode="editMode" 
							title="Fortalecimiento o Solucion de Asuntos de Interes"
							endPointRute="appropriation_processes"
							objEpdata="appropriation_process"
							titleBtn="Nuevo fortalecimiento o solucion"	
							titlecolum="name"
						/>
					</template>
				</DxItem>
  
				<DxItem title="Generación de Insumos de Política Pública y Normatividad">
					<template #default>
						<GeneracionInsumos 
							:group="group" 
							:editMode="editMode" 
							title="Generación de Insumos de Política Pública y Normatividad"
							endPointRute="appropriation_processes"
							objEpdata="appropriation_process"
							titleBtn="Nueva generación de insumos"	
							titlecolum="name"
						/>
					</template>
				</DxItem>

				<DxItem title="Fortalecimiento de Cadenas Productivas">
					<template #default>
						<FortalecimientoCadenas 
							:group="group" 
							:editMode="editMode" 
							title="Fortalecimiento de Cadenas Productivas"
							endPointRute="appropriation_processes"
							objEpdata="appropriation_process"
							titleBtn="Nueva Cadena Productiva"	
							titlecolum="name"
						/>
					</template>
				</DxItem>

				<DxItem title="Resultado del Trabajo Conjunto">
					<template #default>
						<ResultadoTrabajo 
							:group="group" 
							:editMode="editMode" 
							title="Resultado del Trabajo Conjunto entre un Centro de Ciencia y un Grupo de Investigación"
							endPointRute="appropriation_processes"
							objEpdata="appropriation_process"
							titleBtn="Nuevo Resultado de trabajo"	
							titlecolum="name"
						/>
					</template>
				</DxItem>

			</DxTabPanel>
		</div>
	</div>
</template>
<script>
let root;
import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";

export default {
	name: "datosBasicos",
	components: {
		DxItem,
		DxTabPanel,
		EventoCientifico: () => import("@/modules/unidad/productos/apropiacion_social/evento_cientifico"),
		EventoArtistico: () => import("@/modules/unidad/productos/apropiacion_social/evento_cultural"),
		AsuntosInteres: () => import("@/modules/unidad/productos/apropiacion_social/asuntos_interes"),
		ResultadoTrabajo: () => import("@/modules/unidad/productos/apropiacion_social/resultado_trabajo"),
		GeneracionInsumos: () => import("@/modules/unidad/productos/apropiacion_social/generacion_insumos"),
		FortalecimientoCadenas: () => import("@/modules/unidad/productos/apropiacion_social/fortalecimiento_cadenas"),
		RedConocimiento: () => import("@/modules/unidad/productos/apropiacion_social/red_conocimiento"),
		tallerCreacion: () => import("@/modules/unidad/productos/apropiacion_social/trabajo_creacion"),
		DocumentoTrabajo: () => import("@/modules/unidad/productos/apropiacion_social/documento_trabajo"),
		SecuenciaGenetica: () => import("@/modules/unidad/productos/apropiacion_social/secuencia_genetica"),
		InformeFinal: ()=> import("@/modules/unidad/productos/apropiacion_social/informe_final"),
		InformeTecnico: ()=> import("@/modules/unidad/productos/apropiacion_social/informe_tecnico"),
		ConsultoriasCientificas: ()=> import("@/modules/unidad/productos/apropiacion_social/consultorias_cientificas"),
		ConsultoriasArtisticas: ()=> import("@/modules/unidad/productos/apropiacion_social/consultorias_artisticas")
	},
	mounted() {
		root = this;
		console.log("root", root);
	},
	props: {
		
		group: {
			type: Object,
			default: () => {},
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
		some() {
			console.log("SOME!");
		},
	},
};
</script>
