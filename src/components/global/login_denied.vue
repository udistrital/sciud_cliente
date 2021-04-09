<template>
	<div class="content d-flex justify-content-center align-items-center">
		<div class="col-xl-4 col-lg-5 col-md-6 col-sm-7 col-xs-10 mb-4 mt-4 p-0 card" id="login">
			<div class="card-body d-flex justify-content-center align-items-center">
				<span class="text-center slide" id="error">
					<h1 class="font-weight-semibold mb-3"><i class="icon-warning color-error d-block"></i> Acceso denegado</h1>
					<h3 class="font-weight-semibold color-gray-50">Lo sentimos, no se puede conceder acceso<br />con las credenciales suministradas.</h3>
					<router-link to="/" tag="a" class="btn btn-main mt-3">
						<i class="icon-home2 pr-1"></i>
						VOLVER A INICIO
					</router-link>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
let $ = window.jQuery;
export default {
	components: {},
	data: () => ({}),
	methods: {},
	computed: {},
	created() {
		if (this.authenticated) this.$router.push("/inicio");
	},
	mounted() {
		$("#error").fadeIn(window.speed);
	},
};
</script>

<style scoped>
.card-body {
	min-height: 300px !important;
}
</style>
