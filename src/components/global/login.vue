<template>
	<div class="content d-flex justify-content-center align-items-center">
		<div class="col-xl-4 col-lg-5 col-md-6 col-sm-7 col-xs-10 mb-4 mt-4 p-0 card" id="login">
			<div class="card-body d-flex justify-content-center align-items-center">&nbsp;</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
// https://github.com/DevExpress/devextreme-vue/blob/master/example/components/validation-example.vue
let root = null;
import { mapActions, mapGetters } from "vuex";
let $ = window.jQuery;
export default {
	components: {},
	data: () => ({
		username: null,
		password: null,
		show: false,
		isValid: false,
	}),
	computed: {
		...mapGetters("auth/login", ["authStatus", "user"]),
	},
	methods: {
		...mapActions("auth/login", ["GetUser", "OasInit", "OasLogin", "OasLoginData", "AuthLogin"]),
		validate() {
			var result = this.$refs.loginGroup.instance.validate();
			this.isValid = result.isValid;
			return result.isValid;
		},
		login(e) {
			let root = this;
			console.log("e", e);
			let router = this.$router;
			let nt = this.$nextTick;
			e.event.preventDefault();
			root.loadingVisible = true;
			root.loadingMessage = "Verificando credenciales";
			this.AuthLogin([
				{ email: this.username, password: this.password },
				function(e) {
					console.log("Received!", e);
					if (e.is_success) {
						// root.loadingMessage = "Hola nuevamente<br/>" + e.user.first_name + "!";
						// setTimeout(function() {
						window.jQuery("#login").fadeOut(1000, function() {
							router.push("/inicio");
						});
						// }, 1000);
					} else {
						nt(function() {
							let result = confirm({
								showTitle: false,
								dragEnabled: false,
								messageHtml: "<i class='icon-cancel-circle msg-icon'></i><h3 class='text-sb'>Inicio de sesión no válido</h3>",
								buttons: [
									{
										text: "ENTENDIDO",
										onClick: function() {
											return true;
										},
									},
								],
							});
							result.then((dialogResult) => {
								root.loadHide();
								console.log(dialogResult ? "Confirmed" : "Canceled");
							});
						});
					}
				},
			]);
		},
		loginUd(e) {
			this.OasInit();
			if (typeof e !== "undefined") {
				console.log("e", e);
				e.event.preventDefault();
			}
			setTimeout(() => {
				this.OasLogin();
			}, 1000);
		},
	},
	// watch: {
	// 	authStatus: function(val) {
	// 		this.loadingVisible = val === "loading";
	// 	},
	// },
	created() {
		if (this.authenticated) this.$router.push("/inicio");
	},
	mounted() {
		root = this;
		let qs = this.$qsParams();
		if (qs.id_token !== null && qs.id_token !== undefined) {
			// Es respuesta de la OAS
			// access_token=5f140179-5158-3af2-9cbd-365c22952c8e
			// expires_in=266
			// id_token=eyJ4NXQiOiJObUptT0dVeE16
			// session_state=38302010296d63cdcb80b4b57fc2
			// state=9296c56c0e97095b2845b1d2142bff21
			// token_type=Bearer
			this.loadShow("Verificando credenciales<br>un momento por favor", "#login");
			// 202103120335: Verifica que el usuario exista localmente
			root.GetUser({
				qs: qs,
				cb: function(result) {
					// console.clear();
					console.log(window.vm.$sep);
					console.log("GETUSER RESULT", result);
					setTimeout(function() {
						if (result.hasAccess && result.user.local.active) {
							root.OasLoginData({
								qs: qs,
								user: result.user,
								callback: function(loggedUser) {
									console.log(window.vm.$sep);
									console.log("OasLoginData result", loggedUser);
									console.log(JSON.stringify(loggedUser));
									// 202103120145: Verifica que exista como usuario del sistema
									root.loadHide();
									$("#login").fadeOut(window.speed, function() {
										// setTimeout(function() {
										window.vm.$router.push("/inicio");
										// }, window.speed);
									});
								},
							});
						} else {
							root.loadHide();
							window.vm.$router.push("/denied");
						}
					}, 1000);
				},
			});
		} else {
			// 202103120432: Esta redireccionando
			this.loadShow("Direccionando a ingreso<br/>Universidad Distrital", "#login");
			// 202010211331: Envía a login UD por defecto
			this.loginUd();
		}
	},
};
</script>

<style scoped>
.card-body {
	min-height: 300px !important;
}
</style>
