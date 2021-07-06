<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-home2 mr-2 color-main-600"></i>
					<span class="font-weight-semibold">Inicio</span>
					&raquo; Sistema de Información de Investigaciones (SICIUD v2.0)
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>
			<div class="header-elements d-none py-0 mb-3 mb-md-0">
				<div class="breadcrumb">
					<span class="breadcrumb-item"><i class="icon-home2 mr-1"></i> Inicio</span>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="card">
					<!-- <div class="card-header bg-main-600 font-weight-semibold">INICIO</div> -->
					<!-- <div class="card-body d-flex justify-content-center flex-column"> -->
					<div :class="'card-body d-flex justify-content-center flex-column ' + (es_admin ? 'mh' : 'mhn')">
						<h4 class="font-weight-semibold text-center">
							Sistema de Información de Investigaciones - SICIUD v2.0
						</h4>
						<span class="text-center mr-2">
							<img :src="imgUrl + '/logo-horizontal-color.png'" alt="CIDC" class="mr-4" width="300" />
							<img :src="imgUrl + '/logo-udistrital.png'" alt="UDis" width="300" />
						</span>
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
	components: {},
	methods: {},
	data: () => ({}),
	mounted() {},
	computed: {},
};
</script>
