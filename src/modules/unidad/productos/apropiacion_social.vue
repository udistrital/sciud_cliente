<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			<DxTabPanel :animation-enabled="true" :multiple="true">
				<!-- <DxItem title="Proyectos CTI">
					<template #default>
						<ProtectoCTI :group="group" :editMode="editMode" title="Participación Ciudadana En Proyectos De CTI"/> 
					</template>
				</DxItem>
				<DxItem title="Ciudadana CTI">
					<template #default>
						<CiudadaniaCTI :group="group" :editMode="editMode" title="Espacios De Participación Ciudadana En CTI"/> 
					</template>
				</DxItem>
				<DxItem title="Comunicación">
					<template #default>
						<Comunicacion :group="group" :editMode="editMode" title="Estrategias De Comunicación Del Conocimiento"/> 
					</template>
				</DxItem>
				<DxItem title="Contenido Digital">
					<template #default>
						<ContenidoDigital :group="group" :editMode="editMode" title="Contenidos Impresos:"/> 
					</template>
				</DxItem>
				<DxItem title="Libro Divulgacion">
					<template #default>
						<LibroDibulgacion :group="group" :editMode="editMode" title="Libro De Divulgación"/> 
					</template>
				</DxItem>
				<DxItem title="Articulo">
					<template #default>
						<Articulo :group="group" :editMode="editMode" title="Artículo"/> 
					</template>
				</DxItem>
				<DxItem title="Cartilla">
					<template #default>
						<Cartilla :group="group" :editMode="editMode" title="Cartilla O Manual"/> 
					</template>
				</DxItem>
				<DxItem title="Programa TV">
					<template #default>
						<Programa :group="group" :editMode="editMode" title="Contenidos Multimedia:"/> 
					</template>
				</DxItem>
				<DxItem title="Video">
					<template #default>
						<Video :group="group" :editMode="editMode" title="Espacio/Programa De Televisión"/> 
					</template>
				</DxItem>
				<DxItem title="Audiovisuales">
					<template #default>
						<Audiovisuales :group="group" :editMode="editMode" title="Video"/> 
					</template>
				</DxItem>
				<DxItem title="Multimedia">
					<template #default>
						<Multimedia :group="group" :editMode="editMode" title="Audiovisuales"/> 
					</template>
				</DxItem>
				<DxItem title="Resultados Multimedia (Audio)">
					<template #default>
						<ResultadosMul :group="group" :editMode="editMode" title="Piezas De Audio Con Resultado De Investigación"/> 
					</template>
				</DxItem>
				<DxItem title="Contenido Audio">
					<template #default>
						<ContenidoAudio :group="group" :editMode="editMode" title="Contenidos De Audio"/> 
					</template>
				</DxItem> -->
				<DxItem title="Evento Científico">
					<template #default>
						<EventoCientifico :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<DxItem title="Eventos Artísticos de Arquitectura o de Diseño">
					<template #default>
						<EventoArtistico :group="group" :editMode="editMode" />
					</template>
				</DxItem>
				<!-- <DxItem title="Conocimiento Especializado">
					<template #default>
						<ContenidoEspecial :group="group" :editMode="editMode" title="Red De Conocimiento Especializado"/> 
					</template>
				</DxItem>
				<DxItem title="Talleres  Creación">
					<template #default>
						<TallerCreacion :group="group" :editMode="editMode" title="Talleres De Creación"/> 
					</template>
				</DxItem>
				
				<DxItem title="Working Paper">
					<template #default>
						<DocumentoTrabajo :group="group" :editMode="editMode" title="Documento De Trabajo (Working Paper)"/> 
					</template>
				</DxItem>
				<DxItem title="Nueva Sec Genética">
					<template #default>
						<NuevaGenetica :group="group" :editMode="editMode" title="Nueva Secuencia Genética"/> 
					</template>
				</DxItem>
				<DxItem title="Resultados Investigacion">
					<template #default>
						<ResultadosInvestigacion :group="group" :editMode="editMode" title="Boletín Divulgativo De Resultado De Investigación"/> 
					</template>
				</DxItem>
				<DxItem title="Libro Resultado">
					<template #default>
						<LibroResultado :group="group" :editMode="editMode" title="Edición De Revista Científica O De Libro Resultado De Investigación"/> 
					</template>
				</DxItem>
				<DxItem title="Informe Final">
					<template #default>
						<InformeFinal :group="group" :editMode="editMode" title="Informe Final De Investigación"/> 
					</template>
				</DxItem>
				<DxItem title="Consultoria Cientifica">
					<template #default>
						<ConultoriaCientifica :group="group" :editMode="editMode" title="Consultoría Científicas-Tecnologías"/> 
					</template>
				</DxItem>
				<DxItem title="Consultoria Procesos">
					<template #default>
						<ConsultoriaProcesos :group="group" :editMode="editMode" title="Consultoría De Procesos En Investigación-Creación En Arte, Arquitectura Y Diseño"/> 
					</template>
				</DxItem> -->
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
		// Libro: () => import("@/modules/unidad/productos/nuevoConocimiento/libro"),
		// // Articulo: () => import("@/modules/unidad/productos/nuevoConocimiento/articulo"),
		// ProtectoCTI: () => import('@/modules/unidad/productos/apropiacion_social/protecto_cti'),
		// CiudadaniaCTI: () => import('@/modules/unidad/productos/apropiacion_social/ciudadania_cti'),
		// Comunicacion: () => import('@/modules/unidad/productos/apropiacion_social/comunicacion'),
		// ContenidoDigital: () => import('@/modules/unidad/productos/apropiacion_social/contenido_digital'),
		// LibroDibulgacion: () => import('@/modules/unidad/productos/apropiacion_social/libro_dibulgacion'),
		// Articulo: () => import('@/modules/unidad/productos/apropiacion_social/articulo'),
		// Cartilla: () => import('@/modules/unidad/productos/apropiacion_social/cartilla'),
		// Programa: () => import('@/modules/unidad/productos/apropiacion_social/programa'),
		// Video: () => import('@/modules/unidad/productos/apropiacion_social/video'),
		// Audiovisuales: () => import('@/modules/unidad/productos/apropiacion_social/audiovisuales'),
		// Multimedia: () => import('@/modules/unidad/productos/apropiacion_social/multimedia'),
		// ResultadosMul: () => import('@/modules/unidad/productos/apropiacion_social/resultados_mul'),
		// ContenidoAudio: () => import('@/modules/unidad/productos/apropiacion_social/contenido_audio'),
		EventoCientifico: () => import("@/modules/unidad/productos/apropiacion_social/evento_cientifico"),
		EventoArtistico: () => import("@/modules/unidad/productos/apropiacion_social/evento_cultural"),
		// ContenidoEspecial: () => import('@/modules/unidad/productos/apropiacion_social/contenido_especial'),
		// TallerCreacion: () => import('@/modules/unidad/productos/apropiacion_social/taller_creacion'),
		// EventoArtisitico: () => import('@/modules/unidad/productos/apropiacion_social/evento_artisitico'),
		// DocumentoTrabajo: () => import('@/modules/unidad/productos/apropiacion_social/documento_trabajo'),
		// NuevaGenetica: () => import('@/modules/unidad/productos/apropiacion_social/nueva_genetica'),
		// ResultadosInvestigacion: () => import('@/modules/unidad/productos/apropiacion_social/resultados_investigacion'),
		// LibroResultado: () => import('@/modules/unidad/productos/apropiacion_social/libro_resultado'),
		// InformeFinal: () => import('@/modules/unidad/productos/apropiacion_social/informe_final'),
		// ConultoriaCientifica: () => import('@/modules/unidad/productos/apropiacion_social/conultoria_cientifica'),
		// ConsultoriaProcesos: () => import('@/modules/unidad/productos/apropiacion_social/consultoria_procesos'),
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
