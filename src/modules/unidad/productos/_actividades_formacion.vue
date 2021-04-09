<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :animation-enabled="false" :multiple="false">
				<DxItem title="Tesis Doctorado">
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
		Doctorado: () => import("@/modules/unidad/productos/actividadesFormacion/doctorado"),
		Maestria: () => import("@/modules/unidad/productos/actividadesFormacion/maestria"),
		Pregrado: () => import("@/modules/unidad/productos/actividadesFormacion/pregrado"),
		Desarrollo: () => import("@/modules/unidad/productos/actividadesFormacion/desarrollo"),
		Creacion: () => import("@/modules/unidad/productos/actividadesFormacion/creacion"),
		Desarrollo_idi: () => import("@/modules/unidad/productos/actividadesFormacion/desarrollo_idi"),
		Proyeccion_cti: () => import("@/modules/unidad/productos/actividadesFormacion/proyeccion_cti"),
		Apoyo: () => import("@/modules/unidad/productos/actividadesFormacion/apoyo"),
		Ondas: () => import("@/modules/unidad/productos/actividadesFormacion/ondas"),
	},
	mounted() {
		root = this;
		console.log("root", root);
	},
	props: {
		editMode: {
			type: Boolean,
			default: true,
		},
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
