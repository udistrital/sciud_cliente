<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :show-nav-buttons="true" :animation-enabled="true" :multiple="true" ref="tabPanel">
				<DxItem title="Libros Resultados de Investigación">
					<template #default>
						<Libro :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Artículos">
					<template #default>
						<Articulo :group="group" :editMode="editMode" />
					</template>
				</DxItem>

				<DxItem title="Notas Científicas">
					<template #default>
						<Nota :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Capítulos de Libro">
					<template #default>
						<Capitulo :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Patentes">
					<template #default>
						<Patente :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Nuevas Variedades Vegetales">
					<template #default>
						<Vegetales :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Nuevas Razas Animales">
					<template #default>
						<NuevaRaza :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Nuevas Razas Pecuarias">
					<template #default>
						<Poblacion :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Obras de Investigación o Creación">
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
		Articulo: () => import("@/modules/unidad/productos/nuevo_conocimiento/articulo"),
		Libro: () => import("@/modules/unidad/productos/nuevo_conocimiento/libro"),
		Capitulo: () => import("@/modules/unidad/productos/nuevo_conocimiento/capitulo"),
		Poblacion: () => import("@/modules/unidad/productos/nuevo_conocimiento/poblacion"),
		NuevaRaza: () => import("@/modules/unidad/productos/nuevo_conocimiento/nueva_raza"),
		Obra: () => import("@/modules/unidad/productos/nuevo_conocimiento/obras"),
		Nota: () => import("@/modules/unidad/productos/nuevo_conocimiento/notas"),
		Vegetales: () => import("@/modules/unidad/productos/nuevo_conocimiento/vegetales"),
		Patente: () => import("@/modules/unidad/productos/nuevo_conocimiento/patente"),
	},
	data() {
		return {
			tp: null,
		};
	},
	mounted() {
		console.clear();
		root = this;
		root.tp = root.$refs.tabPanel.instance;
		console.log("root", root);
		root.tp.option("onItemClick", function() {
			console.log("CLICK!");
		});
	},
	props: {
		
		group: {
			type: Object,
			default: () => {},
		},
	},
};
</script>