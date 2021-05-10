<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :show-nav-buttons="true" :animation-enabled="true" :multiple="true">
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
				<DxItem title="Conceptos Tecnicos">
					<template #default>
						<TechnicalConcept :group="group" :editMode="editMode" title="Conseptos Tecnicos"/>
					</template>
				</DxItem>
				<DxItem title="Signos Distintivos">
					<template #default>
						<SignosDistintivos :group="group" :editMode="editMode" title="Signos Distintivos"/>
					</template>
				</DxItem>
				<DxItem title="Productos Nautraceúticos">
					<template #default>
						<ProductosNutraceuticos :group="group" :editMode="editMode" title="Productos Nautraceúticos"/>
					</template>
				</DxItem>
				<DxItem title="Colección Científica">
					<template #default>
						<ColeccionCientifica :group="group" :editMode="editMode" title="Colección Científica"/>
					</template>
				</DxItem>
				<DxItem title="Secreto Empresarial">
					<template #default>
						<SecretoEmpresarial :group="group" :editMode="editMode" title="Secreto Empresarial"/>
					</template>
				</DxItem>
				<DxItem title="Innovación Generada">
					<template #default>
						<InnovacionGenerada :group="group" :editMode="editMode" title="Secreto Empresarial"/>
					</template>
				</DxItem>
				<DxItem title="Innovación Procedimiento">
					<template #default>
						<InnovacionProcedimiento :group="group" :editMode="editMode" title="Secreto Empresarial"/>
					</template>
				</DxItem>
				<DxItem title="Empresas de Bases Tecnológicas">
					<template #default>
						<EmpresaBase :group="group" :editMode="editMode" title="Empresarial"/>
					</template>
				</DxItem>
				<DxItem title="Empresas Creativas y Culturales">
					<template #default>
						<EmpresaCreativa :group="group" :editMode="editMode" title="Empresarial"/>
					</template>
				</DxItem>

			

				<DxItem title="Normas">
					<template #default>
						<RegulacionNorma :group="group" :editMode="editMode" title="Empresarial"/>
					</template>
				</DxItem>

				<DxItem title="Regulaciones">
					<template #default>
						<Regulacion :group="group" :editMode="editMode" title="Empresarial"/>
					</template>
				</DxItem>

				<DxItem title="Reglamentos">
					<template #default>
						<RegulacionReglamento :group="group" :editMode="editMode" title="Empresarial"/>
					</template>
				</DxItem>
				<DxItem title="Legislaciones">
					<template #default>
						<RegulacionLegislacion :group="group" :editMode="editMode" title="Empresarial"/>
					</template>
				</DxItem>

				<DxItem title="Guias Practicas Clinica">
					<template #default>
						<GuiaPracticaClinica :group="group" :editMode="editMode" title="Empresarial"/>
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

		Planta: () => import("@/modules/unidad/productos/desarrollo_tecnologico/planta_piloto"),
		Plantab: () => import("@/modules/unidad/productos/desarrollo_tecnologico/planta_ind"),
		Circuito: () => import("@/modules/unidad/productos/desarrollo_tecnologico/circuito"),
		Diseno: () => import("@/modules/unidad/productos/desarrollo_tecnologico/disenio"),
		Software: () => import("@/modules/unidad/productos/desarrollo_tecnologico/software"),
		Registro: () => import("@/modules/unidad/productos/desarrollo_tecnologico/registro_cientifico"),
		TechnicalConcept: () => import("@/modules/unidad/productos/desarrollo_tecnologico/conceptos_tecnicos"),
		SignosDistintivos: () => import("@/modules/unidad/productos/desarrollo_tecnologico/signos_distintivos"),
		ProductosNutraceuticos: () => import("@/modules/unidad/productos/desarrollo_tecnologico/productos_nutraceuticos"),
		ColeccionCientifica: () => import("@/modules/unidad/productos/desarrollo_tecnologico/coleccion_cientifica"),
		SecretoEmpresarial: () => import("@/modules/unidad/productos/desarrollo_tecnologico/secreto_empresarial"),
		InnovacionGenerada: () => import("@/modules/unidad/productos/desarrollo_tecnologico/innovacion_generada"),
		InnovacionProcedimiento: () => import("@/modules/unidad/productos/desarrollo_tecnologico/innovacion_procedimiento"),
		EmpresaBase: () => import("@/modules/unidad/productos/desarrollo_tecnologico/empresa_base"),
		EmpresaCreativa: () => import("@/modules/unidad/productos/desarrollo_tecnologico/empresa_creativa"),
		RegulacionNorma: () => import("@/modules/unidad/productos/desarrollo_tecnologico/regulacion_norma"),
		Regulacion: () => import("@/modules/unidad/productos/desarrollo_tecnologico/regulacion"),
		RegulacionReglamento: () => import("@/modules/unidad/productos/desarrollo_tecnologico/regulacion_reglamento"),
		RegulacionLegislacion: () => import("@/modules/unidad/productos/desarrollo_tecnologico/regulacion_legislacion"),

		GuiaPracticaClinica: () => import("@/modules/unidad/productos/desarrollo_tecnologico/guia_practica_clinica"),


		
		

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
