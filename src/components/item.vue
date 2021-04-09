<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-home2 mr-2 color-main-600"></i>
					<span class="font-weight-semibold">Admin</span>
					&raquo; Contenedor de Pruebas
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="card">
					<!-- <div class="card-header bg-main-600 font-weight-semibold">PRUEBAS</div> -->
					<div class="card-body d-flex justify-content-center flex-column mh">
						<Articulo :group="group" :editMode="editMode" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable vue/no-unused-components */

export default {
	name: "inicio",
	components: {
		Articulo: () => import("@/modules/unidad/productos/nuevoConocimiento/articulo"),
	},
	methods: {},
	data: () => ({
		editMode: true,
		group: {
			id: 1,
		},
	}),
	mounted() {},
	computed: {},
};
</script>
