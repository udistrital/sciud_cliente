<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :animation-enabled="false" :multiple="false">
				<DxItem title="Diseño">
					<template #default>
						<Diseno :group="group" />
					</template>
				</DxItem>
				<DxItem title="Circuito">
					<template #default>
						<Circuito :group="group" />
					</template>
				</DxItem>
				<DxItem title="Software">
					<template #default>
						<Software :group="group" />
					</template>
				</DxItem>
				<DxItem title="Planta">
					<template #default>
					<Planta :group="group" />
					</template>
				</DxItem>
				
				

<DxItem title='Distintivos'>
	<template #default>Signos distintivos</template>
</DxItem>
<DxItem title='Nutraceúticos'>
	<template #default>Productos nutraceúticos</template>
</DxItem>
<DxItem title='Colección Cientifica'>
	<template #default>Colección científica</template>
</DxItem>
<DxItem title='Registro Cientifico'>
	<template #default>Nuevo registro científico</template>
</DxItem>
<DxItem title='Secreto'>
	<template #default>Secreto empresarial</template>
</DxItem>
<DxItem title='Spin-off y Start-up'>
	<template #default>Empresa de base tecnológica (Spin-off y Start-up)</template>
</DxItem>
<DxItem title='Creativo Cultural'>
	<template #default>Empresas creativas y culturales</template>
</DxItem>
<DxItem title='Innovación'>
	<template #default>Innovación generada en la gestión empresarial</template>
</DxItem>
<DxItem title='Innovación en Servicio '>
	<template #default>Innovación en procedimiento y servicio</template>
</DxItem>
<DxItem title='GCP'>
	<template #default>Guía de Práctica Clínica (GPC)</template>
</DxItem>
<DxItem title='Manejo Forence'>
	<template #default>Guía de Manejo Clínico Forense</template>
</DxItem>
<DxItem title='Atencion Diferencial'>
	<template #default>Manuales y Modelos de atención diferencial a víctimas</template>
</DxItem>
<DxItem title='Prototipos Atenuacion'>
	<template #default>Protocolos de atención a usuarios/víctimas (pacientes)</template>
</DxItem>
<DxItem title='Vigilancia Epidemiologica'>
	<template #default>Protocolos de vigilancia epidemiológica</template>
</DxItem>
<DxItem title='Acto Legislotivo'>
	<template #default>Acto Legislativo</template>
</DxItem>
<DxItem title='Proyecto de Ley'>
	<template #default>Proyecto de Ley</template>
</DxItem>
<DxItem title='Conceptos Técoicos'>
	<template #default>Conceptos técnicos</template>
</DxItem>
<DxItem title='Informe Téonico'>
	<template #default>Informe técnico</template>
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
		Planta: () => import('@/modules/unidad/productos/desarrolloTecnologico/planta'),
		Circuito: () => import('@/modules/unidad/productos/desarrolloTecnologico/circuito'),
		Diseno: () => import('@/modules/unidad/productos/desarrolloTecnologico/diseño'),
		Software: () => import('@/modules/unidad/productos/desarrolloTecnologico/software'),
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
