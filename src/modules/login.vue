<template>
	<div class="content d-flex justify-content-center align-items-center">
		<div class="col-xl-4 col-lg-5 col-md-6 col-sm-7 col-xs-10 mb-4 mt-4 p-0 card" id="login">
			<div class="card-body">
				<div class="text-center mb-3">
					<i
						class="icon-user-lock icon-2x color-main-600 border-2 border-main rounded-round p-3 mb-1 mt-1 d-inline-block"
					></i>
					<h2 class="mb-0 color-main-600 font-weight-semibold">
						Ingreso al sistema
					</h2>
					<span class="d-block mb-0">Diligencie sus datos de acceso:</span>
				</div>
				<DxValidationGroup ref="loginGroup">
					<div class="form-group form-group-feedback form-group-feedback-left mb-2">
						<div class="form-control-feedback">
							<i class="icon-user color-main-600"></i>
						</div>
						<DxTextBox
							class="form-control"
							value-change-event="keyup"
							@value-changed="validate($event)"
							placeholder="Correo electrónico"
							:value.sync="username"
						>
							<DxValidator>
								<!--
              <DxAsyncRule
                :validation-callback="asyncValidation"
                message="Email is already registered"
              />
              -->
								<DxEmailRule message="No es un correo válido" />
								<DxRequiredRule message="Campo requerido" />
								<DxStringLengthRule :min="10" message="Debe ingresar mínimo 10 caracteres" />
							</DxValidator>
						</DxTextBox>
					</div>
					<div class="form-group form-group-feedback form-group-feedback-left">
						<div class="form-control-feedback">
							<i class="icon-lock2 color-main-600"></i>
						</div>
						<DxTextBox
							type="password"
							class="form-control"
							placeholder="Contraseña"
							mode="password"
							value-change-event="keyup"
							@value-changed="validate($event)"
							:value.sync="password"
							autocomplete="off"
						>
							<DxValidator>
								<DxRequiredRule message="Campo requerido" />
								<DxStringLengthRule :min="6" message="Debe ingresar mínimo 10 caracteres" />
							</DxValidator>
						</DxTextBox>
					</div>
				</DxValidationGroup>
				<div class="form-group mb-0">
					<DxButton
						id="a-login-ud"
						class="btn btn-main"
						title="Usuarios Universidad Distrital..."
						@click="loginUd($event)"
					>
						<template #default>
							<i class="icon-users mr-1"></i>USUARIOS UD FJC<i class="icon-new-tab ml-1"></i></template
					></DxButton>
					<DxButton class="btn btn-main float-right" :disabled="!isValid" @click="login($event)">
						<template #default>Ingresar <i class="icon-circle-right2"></i> </template
					></DxButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
// https://github.com/DevExpress/devextreme-vue/blob/master/example/components/validation-example.vue
import { confirm } from "devextreme/ui/dialog";
import { DxButton, DxTextBox, DxValidationGroup } from "devextreme-vue";
import { DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator } from "devextreme-vue/validator";
import { mapActions, mapGetters } from "vuex";
let $ = window.jQuery;
export default {
	components: {
		DxButton,
		DxEmailRule,
		DxRequiredRule,
		DxStringLengthRule,
		DxTextBox,
		DxValidationGroup,
		DxValidator,
	},
	data: () => ({
		username: null,
		password: null,
		show: false,
		isValid: false,
	}),
	methods: {
		...mapActions("auth", ["OasInit", "OasLogin", "OasLoginData", "AuthLogin"]),
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
								messageHtml:
									"<i class='icon-cancel-circle msg-icon'></i><h3 class='text-sb'>Inicio de sesión no válido</h3>",
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
			}, 2000);
		},
	},
	computed: {
		...mapGetters("auth", ["authStatus", "user", "userDetails"]),
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
		let root = this;
		let qs = this.$qsParams();
		if (qs.id_token !== null && qs.id_token !== undefined) {
			// Es respuesta de la OAS
			this.loadShow("Verificando credenciales", "#login");
			console.log("oasLoginData!");
			this.OasLoginData({
				qs,
				callback: function() {
					$("#login").fadeOut(1000, function() {
						root.loadHide();
						window.vm.$router.push("/inicio");
					});
				},
			});
		} else {
			this.loadShow("Direccionando a ingreso<br/>Universidad Distrital", "#login");
			// 202010211331: Envía a login UD por defecto
			this.loginUd();
			// this.loadingVisible = false;
			// if (this.env.name === "dev") {
			// 	this.username = "demo@email.co";
			// 	this.password = "asd123";
			// }
		}
	},
};
</script>
