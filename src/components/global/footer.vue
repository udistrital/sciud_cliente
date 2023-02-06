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
				SICIUD v2.0.20230206 - ©{{ year }}
				<a href="http://cidc.udistrital.edu.co" target="_blank" title="Centro de Investigaciones y Desarrollo Científico..."
					>Centro de Investigaciones y Desarrollo Científico (CIDC)</a
				>
			</span>
			<!-- <span class="text-center"> User: {{ user }}</span> -->
			<ul class="navbar-nav ml-lg-auto" v-if="oasToken">
				<li v-if="oasToken">
					<span class="navbar-nav-link legitRipple color-text" @click.prevent="copyToken()">{{ oasToken }}</span>
				</li>
			</ul>
			<ul class="navbar-nav ml-lg-auto" v-else>
				<!--<li class="nav-item" v-for="(item, index) in links" :key="index">
					<a :href="linkLogin(item.cc)" :class="cssClass" :data-title="item.title"><i class="icon-user"></i> {{ item.text }}</a>
				</li>-->
				<li class="nav-item dropup" v-if="debug">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Roles (Modo Pruebas)
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<li class="nav-item" v-for="(item, index) in links" :key="index">
							<a :href="linkLogin(item.cc)" :class="cssClass" :data-title="item.title"><i class="icon-user"></i> {{ item.text }}</a>
						</li>
					</div>
				</li>
			</ul>
		</div>
		<DxTooltip ref="ttip">
			<template>
				<p id="ttip-msg">Tooltip content</p>
			</template>
		</DxTooltip>
	</div>
</template>

<script>
let $ = window.jQuery,
	root = null;
import { mapGetters } from "vuex";
// 202107040426: https://js.devexpress.com/Documentation/Guide/UI_Components/Tooltip/Overview/
import { DxTooltip } from "devextreme-vue/tooltip";
export default {
	name: "globalFooter",
	components: { DxTooltip },
	mounted() {
		root = this;
		root.ttip = this.$refs.ttip.instance;
		console.log("ttip", this.ttip);
		let links = $("a.ttip");
		console.log("links", links);
		links.each(function() {
			var el = $(this);
			el.mouseenter(function() {
				var title = el.data("title");
				$("#ttip-msg").text(title);
				console.log("mouseenter");
				root.ttip.option("target", el);
				root.ttip.show();
			});
			el.mouseleave(function() {
				console.log("mouseleave");
				root.ttip.hide();
			});
		});
	},
	data: () => ({
		ttip: null,
		cssClass: "navbar-nav-link legitRipple color-text ttip",
		defaultVisible: false,
		showDev: true,
		items: [
			{
				cc: "79602309", //79602309
				title: "Diego Alfonso Vargas Villegas (Administrador)",
				text: "Administrador Diego",
			},
			{
				cc: "1013622639",
				title: "Carlos (Administrador)",
				text: "Administrador Carlos",
			},

			{
				cc: "1016082469",
				title: "edwar",
				text: "Edwar Pruebas",
			},

			//1023867324 dato cambiado para ingreso y simulacion de gestor
			{
				cc: "80843691",
				title: "Gestor Facultad",
				text: "Gestor Facultad",
			},

			// 80843691 dato cambiado para ingreso y simulacion de gestor
			{
				cc: "9872650",
				title: "lector",
				text: "lector",
			},

			{
				cc: "52899935",
				title: "Prueba Estudiante Siciud (Directora)",
				text: "Directora",
			},

			{
				cc: "52899935",
				title: "Prueba Estudiante Siciud (Directora)",
				text: "Directora",
			},

			{
				cc: "1026278985",
				title: "Luis Javier Enrique Romero Puentes (Integrante)",
				text: "Estudiante Integrante",
			},

			{
				cc: "53009619",
				title: "Luzangela Piñeros Botero (Líder Semillero)",
				text: "Líder Semillero",
			},

			/*
			este usuario no funciona en pruebas
			{
				cc: "65432123",
				title: "Prueba Estudiante Siciud (Gestor)",
				text: "Gestor",
			},

			{
				cc: "1111111104",
				title: "Prueba Usuario",
				text: "Docente Tutor",
			},

			{
				cc: "98765432",
				title: "German Arturo Lopez Martinez (Integrante)",
				text: "Integrante",
			},

			*/

			//seccion administrativa visible
			// {
			// 	cc: "43105248",
			// 	title: "Edis Aleida Villa Martinez (Integrante Semillero)",
			// 	text: "Int. Semillero",
			// },
			/*
			este usuario no funciona en pruebas
			
			*/

			//fin seccion administrativa visible
		],
	}),
	watch: {
		$route(to) {
			this.showDev = to.name !== "login" && !this.authenticated && this.is_dev;
		},
	},
	methods: {
		toggleDefault() {
			this.defaultVisible = !this.defaultVisible;
		},
		copyToken() {
			this.$toClipboard(this.oasToken);
		},
		linkLogin(doc, sub = "jabocanegraa") {
			let id_e = window.btoa(
				JSON.stringify({
					at_hash: "YmWV36VYR-1MmyMUzYFPLw",
					sub: sub,
					aud: ["k1wCyBLq8NYU1KOXF0ufhBmSKOEa"],
					role: ["CONTRATISTA", "Internal/everyone", `Application/${sub}_cidc_SANDBOX`, `Application/${sub}_cidc_PRODUCTION`],
					azp: "k1wCyBLq8NYU1KOXF0ufhBmSKOEa",
					iss: "autenticacion.portaloas.udistrital.edu.co",
					documento: doc,
					documento_compuesto: "CC" + doc,
					exp: 1600902431,
					nonce: "b8655c3420bac0f75e860ed4f5865686",
					iat: 1600898831,
					email: sub + "@correo.udistrital.edu.co",
				})
			);
			let token = window.config.api.oas.token_value;
			let link = `/login#access_token=${token}&id_token=eyJ4NXQiOiJObUptT0dVeE16WmxZak0yWkRSaE5UWmxZVEExWXpkaFpUUmlPV0UwTldJMk0ySm1PVGMxWkEiLCJraWQiOiJkMGVjNTE0YTMyYjZmODhjMGFiZDEyYTI4NDA2OTliZGQzZGViYTlkIiwiYWxnIjoiUlMyNTYifQ.${id_e}.SkE3-WIm7H81gHLrFqmvEBF5f3DvS5cukno0OkasxHaKM-3HmlnC_nLgYIozQsCge7StS1c0o_g4UclFu1s3H20dlurQcGGKco455KOcuSs7EQYnonwwn4r8sXsns2dsp_8RC4ZafqODHaSSfMcyMYgvjYD0Ct6xyt106GbsfJs&state=3b219ab064b0515e0e95b9d0983885fa&token_type=Bearer&expires_in=3600&session_state=d1b12f2be30113e82f30828798aa3e59819abb228ab2a16d0114ff6d6f45913d.xyH5LS0fbHX4B92MBZqW8w`;
			return link;
		},
	},
	computed: {
		...mapGetters("auth/login", ["oasToken"]),
		links() {
			return this.is_dev ? this.items : [];
		},
		token() {
			return window.config.api.oas.token_value;
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
