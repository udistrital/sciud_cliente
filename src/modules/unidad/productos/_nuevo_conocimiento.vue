<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :animation-enabled="false" :multiple="false">
				<DxItem title="Artículo">
					<template #default>
						<Articulo :group="group" :editMode="editMode" />
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
		Articulo: () => import("@/modules/unidad/productos/nuevoConocimiento/articulo"),
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
	},
};
</script>
