<template>
	<div class="page-header header-elements-md-inline">
		<div class="page-title d-flex">
			<h1>
				<i class="icon-pencil6 mr-1 color-main-600"></i>&nbsp;
				<span class="font-weight-semibold" id="title">Convocatorias</span>
				<span class="slide"> &raquo; {{ title }}</span>
			</h1>
			<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
		</div>
		<div class="header-elements">
			<a
				href="#"
				v-for="(link, index) in current_links"
				:key="index"
				:title="link.name + '...'"
				@click.prevent="go(item.id, `/convocatoria/${item.id}${link.key !== 'info' ? '/' + link.key : ''}`, `Cargando ${link.name}`)"
				class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2"
				><b><i :class="link.icon"></i></b> {{ link.name }}</a
			>
			<a
				href="#"
				@click.prevent="go(item.id, '/convocatoria', `Cargando Convocatorias`)"
				title="Volver a Convocatorias..."
				class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2"
				><b><i class="icon-arrow-left2"></i></b>&nbsp;Convocatorias</a
			>
		</div>
	</div>
</template>

<script>
let root = null;
import { mapGetters } from "vuex";
export default {
	created() {
		root = this;
	},
	props: {
		item: {
			type: Object,
			default: () => {},
		},
	},
	data: () => ({
		route: null,
	}),
	computed: {
		...mapGetters("convocatoria", ["navItems"]),
		title() {
			if (root.item.id !== null) return root.$titleCase(root.item.call_type_name);
			return "Nueva Convocatoria";
		},
		current_links() {
			let r = [];
			root.route = root.$router.currentRoute;
			// 202105311325: Se esta creando
			if (root.item.id === null) return [];
			root.navItems.forEach((link) => {
				let ln = "convocatoria" + (link.key ? "-" + link.key : "");
				console.log("ln =>", ln);
				console.log("root.route.name =>", root.route.name);
				if (root.route.name !== ln) r.push(link);
			});
			return r;
		},
	},
};
</script>
