<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :animation-enabled="true" :multiple="true">
				<DxItem title="Diseño Industrial">
					<template #default>
						<Diseno :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Esquema de Circuíto">
					<template #default>
						<Circuito :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Software">
					<template #default>
						<Software :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Planta Piloto">
					<template #default>
						<Planta :group="group" :editMode="editMode" title="Planta Piloto" />
					</template>
				</DxItem>
				<DxItem title="Planta Industrial">
					<template #default>
						<Plantab :group="group" :editMode="editMode" title="Planta Industrial" />
					</template>
				</DxItem>
				<DxItem title="Registro Científico">
					<template #default>
						<Registro :group="group" :editMode="editMode" />
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
		Planta: () => import("@/modules/unidad/productos/desarrollo_tecnologico/formPlanta"),
		Plantab: () => import("@/modules/unidad/productos/desarrollo_tecnologico/plantaind"),
		Circuito: () => import("@/modules/unidad/productos/desarrollo_tecnologico/circuito"),
		Diseno: () => import("@/modules/unidad/productos/desarrollo_tecnologico/diseño"),
		Software: () => import("@/modules/unidad/productos/desarrollo_tecnologico/software"),
		Registro: () => import("@/modules/unidad/productos/desarrollo_tecnologico/registro_cientifico"),
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
	},
};
</script>
