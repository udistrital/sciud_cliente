<template>
	<div class="container">
		<ul class="nav nav-tabs nav-genNuvCon mb-3" id="genNuvCon-tab" role="tablist">
			<li class="nav-item" role="presentation">
				<a 
				class="nav-link active" 
				id="genNuvCon-libro-tab" 
				data-toggle="pill" 
				href="#genNuvCon-libro" 
				role="tab" 
				aria-controls="genNuvCon-libro" 
				aria-selected="true">Libros</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" 
				id="genNuvCon-articulo-tab" 
				data-toggle="pill" 
				href="#genNuvCon-articulo" 
				role="tab" 
				aria-controls="genNuvCon-articulo" 
				aria-selected="false">Articulos</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" 
				id="genNuvCon-capitulo-tab" 
				data-toggle="pill" 
				href="#genNuvCon-capitulo" 
				role="tab" 
				aria-controls="genNuvCon-capitulo" 
				aria-selected="false">cap</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" 
				id="genNuvCon-poblacion-tab" 
				data-toggle="pill" 
				href="#genNuvCon-poblacion" 
				role="tab" 
				aria-controls="genNuvCon-poblacion" 
				aria-selected="false">pob</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" 
				id="genNuvCon-Nuevaraza-tab" 
				data-toggle="pill" 
				href="#genNuvCon-Nuevaraza" 
				role="tab" 
				aria-controls="genNuvCon-Nuevaraza" 
				aria-selected="false">n raza</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" 
				id="genNuvCon-obra-tab" 
				data-toggle="pill" 
				href="#genNuvCon-obra" 
				role="tab" 
				aria-controls="genNuvCon-obra" 
				aria-selected="false">obra</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" 
				id="genNuvCon-nota-tab" 
				data-toggle="pill" 
				href="#genNuvCon-nota" 
				role="tab" 
				aria-controls="genNuvCon-nota" 
				aria-selected="false">nota</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" 
				id="genNuvCon-veg-tab" 
				data-toggle="pill" 
				href="#genNuvCon-veg" 
				role="tab" 
				aria-controls="genNuvCon-veg" 
				aria-selected="false">vegetales</a>
			</li>
		</ul>
		<div class="tab-content" id="genNuvCon-tabContent">
			<div class="tab-pane fade show active" id="genNuvCon-libro" role="tabpanel" aria-labelledby="genNuvCon-libro-tab">
				<Libro :group="group" />
			</div>
			<div class="tab-pane fade" id="genNuvCon-articulo" role="tabpanel" aria-labelledby="genNuvCon-articulo-tab">
				<Articulo :group="group"/>
			</div>
			<div class="tab-pane fade" id="genNuvCon-capitulo" role="tabpanel" aria-labelledby="genNuvCon-capitulo-tab">
				<Capitulo :group="group"/>
			</div>
			<div class="tab-pane fade" id="genNuvCon-poblacion" role="tabpanel" aria-labelledby="genNuvCon-poblacio-tab">
				<Poblacion :group="group"/>
			</div>
			<div class="tab-pane fade" id="genNuvCon-Nuevaraza" role="tabpanel" aria-labelledby="genNuvCon-Nuevaraza-tab">
				<Nuevaraza :group="group"/>
			</div>
			<div class="tab-pane fade" id="genNuvCon-obra" role="tabpanel" aria-labelledby="genNuvCon-obra-tab">
				<Obra :group="group"/>
			</div>
			<div class="tab-pane fade" id="genNuvCon-nota" role="tabpanel" aria-labelledby="genNuvCon-nota-tab">
				<Nota :group="group"/>
			</div>
			<div class="tab-pane fade" id="genNuvCon-veg" role="tabpanel" aria-labelledby="genNuvCon-veg-tab">
				<Vegetales :group="group"/>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: "NuevoConocimiento",
	components: {
		Libro: () => import("./nuevoConocimiento/libro"),
		Articulo: () => import("./nuevoConocimiento/articulo"),
		Capitulo: () => import("./nuevoConocimiento/capitulo"),
		Poblacion: () => import("./nuevoConocimiento/poblacion"),
		Nuevaraza: () => import("./nuevoConocimiento/nuevaRaza"),
		Obra: () => import("./nuevoConocimiento/obras"),
		Nota: () => import('./nuevoConocimiento/notas'),
		Vegetales: () => import('./nuevoConocimiento/vegetales'),
	},
	props: {
		group_prop: {
			type: Object,
			default: () => {},
		},
	},
	data: () => ({
		group: {
			id: 1,
		},
	}),
};
</script>

<style>
	.nav-genNuvCon .nav-link{
		color:#000000;
		font-weight: bold;
	}
	.nav-genNuvCon .nav-link.active{
		background-color: #3c9432;
		color:#FFFFFF;
		font-weight: bold;
	}
</style>