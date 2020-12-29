// Componentes globales
import axios from "axios";
// CSS
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { loadMessages, locale } from "devextreme/localization";
// DX
import esMessages from "devextreme/localization/messages/es.json";
import vue from "vue";
import { mapActions, mapGetters } from "vuex";
import app from "./app.vue";
import "./assets/css/global.scss";
import global from "./assets/js/global";
import router from "./router";
import store from "./store";

// 202010290157: Observable -> https://stackoverflow.com/a/58968089
// ".page-content:first"
let loaderBase = { visible: false, message: "Cargando", element: ".card-body.grid" };
let loaderMask = vue.observable({ object: loaderBase });
Object.defineProperty(vue.prototype, "$loader", {
	get() {
		return loaderMask.object;
	},
	set(value) {
		loaderMask.object = value;
	},
});

// Generales
window.speed = 500;
window.authChecking = false;
window.authCheckingTime = 5; // Minutos

//#region Vue
// VUE
vue.config.productionTip = false;
vue.use(global);
global.checkConsole();

// Mixin
// 202008292329: Mixin global variables
// https://stackoverflow.com/a/40897670
vue.mixin({
	created() {
		loadMessages(esMessages);
		locale("es");
	},
	data() {
		return {
			debug: true,
			loaderMessage: null,
			loaderElement: null,
		};
	},
	mounted() {
		//202011142222:
		this.$global();
		// 202010220211: Verifica autenticación con intervalo en MS
		if (!window.authChecking) {
			window.authChecking = true;
			window.setInterval(() => {
				console.log("Check auth!");
				if (!this.authenticated) this.logOut();
			}, window.authCheckingTime * 60 * 1000);
		}
	},
	methods: {
		...mapActions("auth", ["AuthLogout"]),
		loadShow(msg, element) {
			let root = this;
			if (!root.$loader.visible) {
				console.log(window.vm.$sep);
				console.log("MASK!");
				console.log("root.loaderMessage", root.loaderMessage);
				console.log("root.loaderElement", root.loaderElement);
				root.$loader = {
					visible: true,
					message: typeof msg !== "undefined" ? msg : typeof root.loaderMessage !== "undefined" ? root.loaderMessage : loaderBase.message,
					element: typeof element !== "undefined" ? element : typeof root.loaderElement !== "undefined" ? root.loaderElement : loaderBase.element,
				};
				console.log(window.vm.$sep);
			}
		},
		loadHide() {
			let root = this;
			if (root.$loader.visible) {
				console.log(window.vm.$sep);
				console.log("UNMASK!");
				this.$loader = loaderBase;
				console.log(window.vm.$sep);
			}
		},
		logOut() {
			let root = this;
			root.AuthLogout(function() {
				let cr = root.$router.currentRoute;
				if (cr.meta.requiresAuth) root.$router.push("/inicio");
			});
		},
		scrollTop(cb) {
			window.jQuery.scrollTo(".page-header:first", window.speed * 1.5, {
				offset: -40,
				easing: "easeOut",
				onAfter: function() {
					if (window.vm.$isFunction(cb)) cb();
				},
			});
		},
	},
	computed: {
		...mapGetters("auth", ["authenticated", "user", "userDetails"]),
		isDev() {
			return process.env.NODE_ENV.toString().toLowerCase() === "development";
		},
		env() {
			return window.config.env[process.env.NODE_ENV.toString().toLowerCase()];
		},
		baseUrl() {
			return process.env.BASE_URL;
		},
		imgUrl() {
			return process.env.BASE_URL + "assets/img";
		},
		jsUrl() {
			return process.env.BASE_URL + "assets/js";
		},
	},
});

// Main
function createVue() {
	window.vm = new vue({
		router,
		store,
		global,
		render: (h) => h(app),
	}).$mount("#app");
}

// 202012232002: Carga las variables de entorno
function loadVars(data) {
	var finalVars = data;
	// 202012232009: TODO: Midificar variables segun entorno
	console.log("process.env", process.env);
	console.log("finalVars", finalVars);
	return finalVars;
}
//#endregion

// Preload settings and user data
axios
	.get(process.env.BASE_URL + "data/config.json")
	.then(({ data }) => {
		window.config = loadVars(data);
		if (window.config.impersonate) store.dispatch("auth/SetImpersonation", createVue);
		else createVue();
	})
	.catch((err) => {
		console.log("ERROR", err);
	});
