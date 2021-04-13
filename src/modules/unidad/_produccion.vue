<template>
	<div>
		<div class="row">
			<div class="col pt-3">
				<DxAccordion :collapsible="false" :multiple="false">
					<template #title="{ data }"
						><div class="col pt-2 pb-2"><i :class="'icon-' + data.icon"></i>{{ data.title }}</div></template
					>
					<DxItem title="Generación de Nuevo Conocimiento" icon="brain" id="generacion" data-idx="1">
						<template #default>
							<NuevoConocimiento :group="group" :editMode="editMode" />
						</template>
					</DxItem>
					<DxItem title="Desarrollo Tecnológico e Innovación" icon="rocket" id="desarrollo" data-idx="2">
						<template #default>
							<DesarrolloTecnologico :group="group" :editMode="editMode" />
						</template>
					</DxItem>
					<DxItem title="Apropiación Social del Conocimiento" icon="bookmark" id="apropiacion" data-idx="3">
						<template #default>
							<ApropiacionSocial :group="group" :editMode="editMode" />
						</template>
					</DxItem>
					<DxItem title="Productos de Actividades Relacionadas con la Formación del Recurso Humano (CTEI)" icon="users4" id="humano" data-idx="4">
						<template #default>
							<ActividadesFormacion :group="group" :editMode="editMode" />
						</template>
					</DxItem>
				</DxAccordion>
			</div>
		</div>
	</div>
</template>
<script>
let root;
import DxAccordion, { DxItem } from "devextreme-vue/accordion";
export default {
	name: "datosBasicos",
	components: {
		DxItem,
		DxAccordion,
		NuevoConocimiento: () => import("@/modules/unidad/productos/_nuevo_conocimiento"),
		DesarrolloTecnologico: () => import("@/modules/unidad/productos/_desarrollo_tecnologico"),
		ApropiacionSocial: () => import("@/modules/unidad/productos/_apropiacion_social"),
		ActividadesFormacion: () => import("@/modules/unidad/productos/_actividades_formacion"),
	},
	mounted() {
		root = this;
	},
	props: {
		editMode: {
			type: Boolean,
			default: false,
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
		loadMembers() {
			console.log("members", root.group.member_ids);
		},
	},
};
</script>
