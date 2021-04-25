<template>
	<div v-if="group">
		<Header :group="group" />
		<div class="row">
			<div class="col">
				<div class="card" id="panel-produccion">
					<div class="card-body group-detail">
						<div class="row mb-3">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-end">
									<div class="title"><i class="icon-books"></i> {{ $titleCase(group.name) }}</div>
									<div class="sub-title"><i class="icon-trophy"></i> Producción</div>
									<a href="#" @click.prevent="userAdd" class="btn btn-sm btn-main btn-labeled btn-labeled-right btn-sm legitRipple ml-3 slide" id="btn-add">
										ASOCIAR INTEGRANTE <b><i class="icon-user-plus"></i></b>
									</a>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col">
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
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root;
import { mapActions, mapGetters, mapState } from "vuex";
import DxAccordion, { DxItem } from "devextreme-vue/accordion";
export default {
	created: function() {
		root = this;
		root.getUnit({
			id: root.$route.params.unidadId,
			cb: function(result) {
				root.group = result;
				document.title += ` ${root.$titleCase(root.group.name)}`;
				root.loadMembers();
			},
		});
	},
	data: () => ({
		group: null,
	}),
	components: {
		DxItem,
		DxAccordion,
		Header: () => import("@/components/element/header"),
		NuevoConocimiento: () => import("@/modules/unidad/productos/nuevo_conocimiento"),
		DesarrolloTecnologico: () => import("@/modules/unidad/productos/desarrollo_tecnologico"),
		ApropiacionSocial: () => import("@/modules/unidad/productos/apropiacion_social"),
		ActividadesFormacion: () => import("@/modules/unidad/productos/actividades_formacion"),
	},
	methods: {
		...mapActions("unidad", ["getUnit", "getResearchers", "saveResearcher", "updateResearcher"]),
		loadMembers() {
			console.log("members", root.group.member_ids);
		},
	},
};
</script>
