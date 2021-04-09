<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :animation-enabled="false" :multiple="false">
				<DxItem title="Libro">
					<template #default>
						<Libro :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Artículo">
					<template #default>
						<Articulo :group="group" :editMode="editMode"/>
					</template>
				</DxItem>
				<DxItem title="Nota Científica">
					<template #default>
						<!-- <Articulo :group="group" /> -->
						<Nota :group="group" :editMode="editMode"/>
					</template>
				</DxItem>
				<DxItem title="Capítulo">
					<template #default>
						<Capitulo :group="group" :editMode="editMode"/>
					</template>
				</DxItem>
				<DxItem title="Patente">
					<template #default>
						<Patente :group="group" :editMode="editMode"/>
					</template>
				</DxItem>
				<DxItem title="Variedad Vegetal">
					<template #default>
						<!-- <Articulo :group="group" /> -->
						<Vegetales :group="group" :editMode="editMode"/>
					</template>
				</DxItem>
				<DxItem title="Raza Animal">
					<template #default>
						<Nuevaraza :group="group" :editMode="editMode"/>
					</template>
				</DxItem>
				<DxItem title="Raza Pecuaria">
					<template #default>
						<Poblacion :group="group" :editMode="editMode"/>
					</template>
				</DxItem>
				<DxItem title="Obra de Investigación">
					<template #default>
						<Obra :group="group" :editMode="editMode" />
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
		Libro: () => import("@/modules/unidad/productos/nuevoConocimiento/libro"),
		Articulo: () => import("@/modules/unidad/productos/nuevoConocimiento/articulo"),
		Capitulo: () => import("./nuevoConocimiento/capitulo"),
		Poblacion: () => import("./nuevoConocimiento/poblacion"),
		Nuevaraza: () => import("./nuevoConocimiento/nuevaRaza"),
		Patente: () => import("./nuevoConocimiento/patente"),
		Obra: () => import("./nuevoConocimiento/obras"),
		Nota: () => import("./nuevoConocimiento/notas"),
		Vegetales: () => import("./nuevoConocimiento/vegetales"),
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
