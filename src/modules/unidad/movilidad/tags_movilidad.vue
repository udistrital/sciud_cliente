<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :show-nav-buttons="true" :animation-enabled="true" :multiple="true">
				
                <DxItem title="Listado de Convocatorias" v-if="puedeAplicar">
					<template #default>
						<Convocatorias 
							:group="group" 
							:userinfo="researcherData"
							:editMode="editMode" 
							title="Convocatorias Activas"
							objEpdata="mobility_call"
							titleBtn="Registro Convocatoria"	
							titlecolum="title"
						/>
					</template>
				</DxItem>

				<DxItem title="Listado Aplicaciones">
					<template #default>
						<Aplicaciones 
							:group="group" 
							:userinfo="researcherData"
							:editMode="editMode" 
							title="Listado de Aplicaciones"
							endPointRute="mobility_calls"
							objEpdata="mobility_call"
							titleBtn="Vista Aplicacion"	
							titlecolum="event_name"
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
		puedeAplicar:{
			type:Boolean,
			default: false
		}
	},
};
</script>
