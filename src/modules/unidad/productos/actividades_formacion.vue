<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :animation-enabled="true" :multiple="true">
				<DxItem title="Dirección de Trabajos Pregrado">
					<template #default>
						<Trabajos :group="group" :editMode="editMode" title="Trabajo de Grado Pregrado" id_trabajo="1" />
					</template>
				</DxItem>
				<DxItem title="Dirección de Trabajos Maestria">
					<template #default>
						<Trabajos2 :group="group" :editMode="editMode" title="Tesis oTrabajo de Grado Maestria" id_trabajo="2" />
					</template>
				</DxItem>
				<DxItem title="Dirección de Trabajos Doctorado">
					<template #default>
						<Trabajos3 :group="group" :editMode="editMode" title="Tesis Doctorado" id_trabajo="3" />
					</template>
				</DxItem>
				<!-- <DxItem title="Tesis Doctorado">
					<template #default>
						<Doctorado :group="group" :editMode="editMode" title="Dirección de Tesis de Doctorado" />
					</template>
				</DxItem>
				<DxItem title="Trabajo Maestría">
					<template #default>
						<Maestria :group="group" :editMode="editMode" title="Dirección de Trabajo de Grado de Maestría" />
					</template>
				</DxItem>
				<DxItem title="Trabajo Pregrado">
					<template #default>
						<Pregrado :group="group" :editMode="editMode" title="Dirección de Trabajo de Grado de Pregrado" />
					</template>
				</DxItem>
				<DxItem title="Investigación Desarrollo">
					<template #default>
						<Desarrollo :group="group" :editMode="editMode" title="Proyectos de Investigación y Desarrollo" />
					</template>
				</DxItem>
				<DxItem title="Investigación Creación">
					<template #default>
						<Creacion :group="group" :editMode="editMode" title="Proyectos de Investigación-Creación" />
					</template>
				</DxItem>
				<DxItem title="Proyecto (ID+I)">
					<template #default>
						<Desarrollo_idi :group="group" :editMode="editMode" title="Desarrollo e Innovación (ID+I)" />
					</template>
				</DxItem>
				<DxItem title="Proyecto CTI">
					<template #default>
						<Proyeccion_cti :group="group" :editMode="editMode" title="Extensión y Responsabilidad Social en CTI" />
					</template>
				</DxItem>
				<DxItem title="Apoyo Investigadores">
					<template #default>
						<Apoyo :group="group" :editMode="editMode" title="Apoyo a Creación de Cursos, Formación de Investigadores" />
					</template>
				</DxItem>
				<DxItem title="Acompañamiento y Accesorias">
					<template #default>
						<Ondas :group="group" :editMode="editMode" title="Acompañamientos y asesorías (programa Ondas)" />
					</template>
				</DxItem> -->
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
		Trabajos: () => import("@/modules/unidad/productos/actividades_formacion/trabajos_grado_p"),
		Trabajos2: () => import("@/modules/unidad/productos/actividades_formacion/trabajos_grado_m"),
		Trabajos3: () => import("@/modules/unidad/productos/actividades_formacion/trabajos_grado_d"),
		// Doctorado: () => import("@/modules/unidad/productos/actividades_formacion/doctorado"),
		// Maestria: () => import("@/modules/unidad/productos/actividades_formacion/maestria"),
		// Pregrado: () => import("@/modules/unidad/productos/actividades_formacion/pregrado"),
		// Desarrollo: () => import("@/modules/unidad/productos/actividades_formacion/desarrollo"),
		// Creacion: () => import("@/modules/unidad/productos/actividades_formacion/creacion"),
		// Desarrollo_idi: () => import("@/modules/unidad/productos/actividades_formacion/desarrollo_idi"),
		// Proyeccion_cti: () => import("@/modules/unidad/productos/actividades_formacion/proyeccion_cti"),
		// Apoyo: () => import("@/modules/unidad/productos/actividades_formacion/apoyo"),
		// Ondas: () => import("@/modules/unidad/productos/actividades_formacion/ondas"),
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
