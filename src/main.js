// Componentes globales
import axios from "axios";
// CSS
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { loadMessages, locale } from "devextreme/localization";
// DX
import esMessages from "devextreme/localization/messages/es.json";
import vue from "vue";
import { mapActions, mapState } from "vuex";
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
window.authChecking = false;
window.authCheckingTime = 5; // Minutos

//#region Vue
// VUE
vue.config.productionTip = false;
vue.use(global);
global.check; // console();

// Mixin
// 202008292329: Mixin global variables
// https://stackoverflow.com/a/40897670
vue.mixin({
	beforeRouteLeave(to, from, next) {
		// If the form is dirty and the user did not confirm leave,
		// prevent losing unsaved changes by canceling navigation
		if (this.confirmStayInDirtyForm()) {
			next(false);
		} else {
			// Navigate to next view
			next();
		}
	},
	beforeDestroy() {
		window.removeEventListener("beforeunload");
	},
	created() {
		window.addEventListener("beforeunload", function(e) {
			this.logOut();
			e.preventDefault();
			e.returnValue = "";
		});
		loadMessages(esMessages);
		locale("es");
	},
	data: () => ({
		loaderMessage: null,
		loaderElement: null,
		si_no: [
			{
				name: "SI",
				value: true,
			},
			{
				name: "NO",
				value: false,
			},
		],
	}),
	mounted() {
		// 202011142222:
		this.$global();

		// 202103081850: Carga los roles de usuario globalmente
		this.getAllRoles();

		// 202103311032: Carga tipos y subtipos
		this.getTypes();
		this.getSubtypes();

		// 202010220211: Verifica autenticación con intervalo en MS
		if (!window.authChecking) {
			window.authChecking = true;
			window.setInterval(() => {
				if (!this.authenticated) this.logOut();
			}, window.authCheckingTime * 60 * 1000);
		}

		// this.loaderHide();
	},
	methods: {
		...mapActions("auth/login", ["authLogout"]),
		...mapActions("auth/usuario", ["getAllRoles"]),
		...mapActions("core/tipo", ["getTypes", "getSubtypes"]),
		go(path, lockMsg = "Cargando", lockEl = ".card .card-body") {
			this.loaderShow(lockMsg, lockEl);
			this.$router.push({ path: path });
		},
		capitalize(e) {
			e.component.instance().option("value", this.$titleCase(e.value));
		},
		confirmLeave() {
			return window.confirm("Do you really want to leave? you have unsaved changes!");
		},
		confirmStayInDirtyForm() {
			return this.form_dirty && !this.confirmLeave();
		},
		loaderShow(msg, element) {
			let root = this;
			if (!root.$loader.visible) {
				// console.log(window.vm.$sep);
				// console.log("MASK!");
				// console.log("root.loaderMessage", root.loaderMessage);
				// console.log("root.loaderElement", root.loaderElement);
				root.$loader = {
					visible: true,
					message: typeof msg !== "undefined" ? msg : typeof root.loaderMessage !== "undefined" ? root.loaderMessage : loaderBase.message,
					element: typeof element !== "undefined" ? element : typeof root.loaderElement !== "undefined" ? root.loaderElement : loaderBase.element,
				};
				// console.log(window.vm.$sep);
			}
		},
		loaderHide() {
			let root = this;
			if (root.$loader.visible) {
				// console.log(window.vm.$sep);
				// console.log("UNMASK!");
				this.$loader = loaderBase;
				// console.log(window.vm.$sep);
			}
		},
		logOut() {
			let root = this;
			root.authLogout(function() {
				window.sessionStorage.clear();
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
		yesNo(cellInfo) {
			return cellInfo.value ? "SI" : "NO";
		},
		siNo() {
			return [
				{
					id: 1,
					name: "SI",
				},
				{
					id: 0,
					name: "NO",
				},
			];
		},
		nullText(cellInfo) {
			if (cellInfo.valueText.length > 0) {
				return cellInfo.valueText;
			} else {
				return "--";
			}
		},
	},
	computed: {
		...mapState("auth/usuario", ["roles"]),
		...mapState("auth/login", ["authenticated", "user"]),
		minDate() {
			return new Date(2000, 0, 1);
		},
		actualDate() {
			return new Date();
		},
		debug() {
			return window.config.debug;
		},
		dgPageSize() {
			return window.config.pageSize;
		},
		dgPageSizes() {
			return window.config.pageSizes;
		},
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
		user_id: function() {
			if (this.user.local !== null && typeof this.user.local !== "undefined") {
				return this.user.local.id;
			} else {
				return null;
			}
		},
		user_role_id: function() {
			if (this.user.local !== null && typeof this.user.local !== "undefined") {
				return this.user.local.user_role_id;
			} else {
				return null;
			}
		},
		user_complete_name() {
			if (this.user !== null && typeof this.user.oas_details !== "undefined" && typeof this.user.oas_details.TerceroId !== "undefined") {
				return this.user.oas_details.TerceroId.NombreCompleto;
			} else if (this.user.oas !== null && typeof this.user.oas !== "undefined") {
				return this.user.oas.sub;
			} else {
				return null;
			}
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
//#endregion

// Preload settings and user data
axios
	.get(process.env.BASE_URL + "data/config.json")
	.then(({ data }) => {
		window.config = data;
		axios
			.get(process.env.BASE_URL + "data/clasifier.json")
			.then(({ data }) => {
				window.clasifier = data;
				createVue();
				console.log("window.config", window.config);
				console.log("window.clasifier", window.clasifier);
				console.log("window.vm.$store", window.vm.$store);
			})
			.catch((err) => {
				console.log("ERROR", err);
			});
	})
	.catch((err) => {
		console.log("ERROR", err);
	});
