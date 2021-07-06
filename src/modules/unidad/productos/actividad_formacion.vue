<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :show-nav-buttons="true" :animation-enabled="true" :multiple="true">
				<DxItem title="Acompañamiento y Asesoría">
					<template #default>
						<AcompaniamientoAsesoria
							:group="group" 
							:editMode="editMode" 
							title="Acompañamiento y Asesoría de Línea Temática"
							endPointRute="accompaniment_consultancies"
							objEpdata="accompaniment_consultancy"
							titleBtn="Nuevo Acompañamiento"	
							titlecolum="project_name"
						/>
					</template>
				</DxItem>
				
				<DxItem title="Apoyo a Creación de Investigadores">
					<template #default>
						<ApoyoCreacion
							:group="group" 
							:editMode="editMode" 
							title="Apoyo a Creación Programa o Curso de Formación de Investigadores"
							endPointRute="training_courses"
							objEpdata="training_course"
							titleBtn="Nuevo Curso o Apoyo"	
							titlecolum="program_name"
						/>
					</template>
				</DxItem>
				
				
				
				
				<DxItem title="Dirección de Trabajos Pregrado">
					<template #default>
						<Trabajos :group="group" :editMode="editMode" title="Trabajo de Grado Pregrado" id_trabajo="1" />
					</template>
				</DxItem>

				<DxItem title="Dirección de Trabajos Maestria">
					<template #default>
						<Trabajos2 :group="group" :editMode="editMode" title="Tesis o Trabajo de Grado Maestria" id_trabajo="2" />
					</template>
				</DxItem>
				
				<DxItem title="Dirección de Trabajos Doctorado">
					<template #default>
						<Trabajos3 :group="group" :editMode="editMode" title="Tesis Doctorado" id_trabajo="3" />
					</template>
				</DxItem>

				<DxItem title="Proyecto de Investigación y Desarrollo">
					<template #default>
						<ProyectoInvestigacionDesarrollo
							:group="group" 
							:editMode="editMode" 
							title="Proyecto de Investigación y Desarrollo"
							endPointRute="investigation_projects"
							objEpdata="investigation_project"
							titleBtn="Nuevo Proyecto Desarrollo"	
							titlecolum="title"
						/>
					</template>
				</DxItem>

				<DxItem title="Proyecto de Investigación- Creación">
					<template #default>
						<ProyectoInvestigacionCreacion
							:group="group" 
							:editMode="editMode" 
							title="Proyecto de Investigación- Creación"
							endPointRute="investigation_projects"
							objEpdata="investigation_project"
							titleBtn="Nueva Creacion"	
							titlecolum="title"
						/>
					</template>
				</DxItem>


				<DxItem title="Proyecto ID+I con Formación">
					<template #default>
						<ProyectoIDI
							:group="group" 
							:editMode="editMode" 
							title="Proyecto ID+I con Formación"
							endPointRute="idi_investigation_projects"
							objEpdata="idi_investigation_project"
							titleBtn="Nuevo Proyecto ID+I"	
							titlecolum="title"
						/>
					</template>
				</DxItem>
				

				<DxItem title="Proyecto de Extensión CTeI">
					<template #default>
						<ProyectoExtencion
							:group="group" 
							:editMode="editMode" 
							title="Proyecto de Extensión y Responsabilidad Social en CTeI"
							endPointRute="extension_projects"
							objEpdata="extension_project"
							titleBtn="Nuevo Proyecto"	
							titlecolum="project_name"
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
		Trabajos: () => import("@/modules/unidad/productos/actividad_formacion/trabajo_grado_p"),
		Trabajos2: () => import("@/modules/unidad/productos/actividad_formacion/trabajo_grado_m"),
		Trabajos3: () => import("@/modules/unidad/productos/actividad_formacion/trabajo_grado_d"),
		AcompaniamientoAsesoria: () => import("@/modules/unidad/productos/actividad_formacion/Acompaniamiento_asesoria"),
		ApoyoCreacion: () => import("@/modules/unidad/productos/actividad_formacion/apoyo_creacion"),
		ProyectoExtencion: () => import("@/modules/unidad/productos/actividad_formacion/proyecto_extencion"),
		ProyectoIDI: () => import("@/modules/unidad/productos/actividad_formacion/proyecto_idi"),
		ProyectoInvestigacionDesarrollo: () => import("@/modules/unidad/productos/actividad_formacion/proyecto_investigacion_desarrollo"),
		ProyectoInvestigacionCreacion: () => import("@/modules/unidad/productos/actividad_formacion/proyecto_investigacion_creacion"),
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
