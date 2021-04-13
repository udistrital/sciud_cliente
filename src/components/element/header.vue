<template>
	<div class="page-header header-elements-md-inline">
		<div class="page-title d-flex">
			<h1>
				<i class="icon-books mr-1 color-main-600"></i>
				<span class="font-weight-semibold" id="title">Unidades de Investigación</span>
				<span> &raquo; {{ $titleCase(group.group_type_name) }}</span>
			</h1>
			<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
		</div>
		<div class="header-elements">
			<a
				href="#"
				v-if="current('info')"
				@click.prevent="go(`/unidad/${group.id}`)"
				title="Información de la Unidad..."
				class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2"
				><b><i class="icon-info"></i></b> Información</a
			>
			<a
				href="#"
				v-if="current('documentos')"
				@click.prevent="go(`/unidad/${group.id}/documentos`)"
				title="Documentos de la Unidad..."
				class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2"
				><b><i class="icon-file-pdf"></i></b> Documentos</a
			>
			<a
				href="#"
				v-if="current('integrantes')"
				@click.prevent="go(`/unidad/${group.id}/integrantes`)"
				title="Integrantes de la Unidad..."
				class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2"
				><b><i class="icon-users"></i></b> Integrantes</a
			>
			<a
				href="#"
				v-if="current('produccion')"
				@click.prevent="go(`/unidad/${group.id}/produccion`)"
				title="Producción de la Unidad..."
				class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2"
				><b><i class="icon-trophy"></i></b> Producción</a
			>
			<a href="#" @click.prevent="go('/unidad')" title="Volver a Unidades..." class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2"
				><b><i class="icon-arrow-left2"></i></b> Unidades</a
			>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		group: {
			type: Object,
			default: () => {},
		},
	},
	data: () => ({
		route: null,
	}),
	methods: {
		current(section) {
			this.route = this.$router.currentRoute;
			return !(this.route.name == "unidad-" + section);
		},
	},
};
</script>
