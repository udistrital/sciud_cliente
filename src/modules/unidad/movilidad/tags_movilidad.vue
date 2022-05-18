<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :show-nav-buttons="true" :animation-enabled="true" :multiple="true">
				
                <DxItem title="Listado de Convocatorias">
					<template #default>
						<Convocatorias 
							:group="group" 
							:userinfo="researcherData"
							:editMode="editMode" 
							title="Listado Convocatorias Activas"
							objEpdata="mobility_call"
							titleBtn="Registro Convocatoria"	
							titlecolum="title"
							
						/>
					</template>
				</DxItem>

				<DxItem title="Aplicaciones a Movilidad">
					<template #default>
						<Aplicaciones 
							:group="group" 
							:userinfo="researcherData"
							:editMode="editMode" 
							title="Listado de Aplicaciones del Investigador"
							endPointRute="mobility_calls"
							objEpdata="mobility_calls"
							titleBtn="Vista Aplicacion"	
							titlecolum="title"
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
	name: "datosBasicosmv",
	components: {
		DxItem,
		DxTabPanel,
		Aplicaciones: () => import("@/modules/unidad/movilidad/lista_convocatorias_aplicadas.vue"),
        Convocatorias: () => import("@/modules/unidad/movilidad/convocatorias.vue"),
	},
	mounted() {
		root = this;
		console.log("root", root);
	},
	props: {
		researcherData: {
			type: Object,
			default: () => {},
		},
		group: {
			type: Object,
			default: () => {},
		},
	},
};
</script>
