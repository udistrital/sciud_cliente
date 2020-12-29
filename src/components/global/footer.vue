<template>
	<div class="footer navbar navbar-expand-lg navbar-light">
		<div class="text-center d-lg-none w-100">
			<button type="button" class="navbar-toggler dropdown-toggle" data-toggle="collapse" data-target="#navbar-footer">
				<i class="icon-unfold mr-2"></i>
				CRÉDITOS
			</button>
		</div>

		<div class="navbar-collapse collapse" id="navbar-footer">
			<span class="navbar-text">
				SICIUD v2.0.20201202 - ©{{ year }}
				<a
					href="http://cidc.udistrital.edu.co"
					target="_blank"
					title="Centro de Investigaciones y Desarrollo Científico..."
					>Centro de Investigaciones y Desarrollo Científico (CIDC)</a
				>
			</span>
			<ul class="navbar-nav ml-lg-auto">
				<li v-if="oasToken">
					<span class="navbar-nav-link legitRipple color-text" @click.prevent="copyToken()">{{ oasToken }}</span>
				</li>
				<li class="nav-item" v-if="showDev">
					<a :href="link" class="navbar-nav-link legitRipple color-text"><i class="icon-hat"></i> {{ env }}</a>
				</li>
				<li class="nav-item">
					<a href="http://cidc.udistrital.edu.co" class="navbar-nav-link legitRipple" target="_blank"
						><i class="icon-file-text2"></i> Documentación</a
					>
				</li>
				<li class="nav-item">
					<a href="http://cidc.udistrital.edu.co" class="navbar-nav-link legitRipple pr-1" target="_blank"
						><i class="icon-lifebuoy"></i> Soporte</a
					>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "globalFooter",
	components: {},
	data: () => ({
		showDev: true,
	}),
	watch: {
		$route(to) {
			this.showDev = to.name !== "login" && !this.authenticated && this.env.name === "Development";
		},
	},
	methods: {
		copyToken() {
			this.$toClipboard(this.oasToken);
		},
	},
	computed: {
		...mapGetters("auth", ["oasToken"]),
		link() {
			return "";
		},
		year: function() {
			return new Date().getFullYear();
		},
		env: function() {
			return this.$capitalize(process.env.NODE_ENV);
			// return this.$baseUrl();
		},
	},
};
</script>
