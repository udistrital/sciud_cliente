// Componentes globales
import axios from "axios";

// DX
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { loadMessages, locale } from "devextreme/localization";
import esMessages from "devextreme/localization/messages/es.json";

// Otros
import vue from "vue";
import { mapActions, mapState } from "vuex";
import app from "./app.vue";
import global from "./assets/js/global";
import router from "./router";
import store from "./store";
import "./assets/css/global.scss";

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
		// 202104180627: https://stackoverflow.com/a/56551646
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
		window.removeEventListener("beforeunload", this.beforeWindowUnload);
	},
	created() {
		window.addEventListener("beforeunload", this.beforeWindowUnload);
		loadMessages(esMessages);
		locale("es");
	},
	data: () => ({
		editModeOld: false,
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
		gmStates: [
			{
				id: 1,
				name: "SI",
			},
			{
				id: 2,
				name: "NO",
			},
		],
	}),
	mounted() {
		this.$global();

		// 202105242012:
		if (this.user !== null && this.user.local !== null && typeof this.user.local !== "undefined") {
			// 202103081850: Carga los roles de usuario globalmente
			this.getAllRoles();
			// 202103311032: Carga tipos y subtipos
			this.getTypes();
			this.getSubtypes();
		}
	},
	methods: {
		...mapActions("auth/login", ["authLogout"]),
		...mapActions("auth/usuario", ["getAllRoles"]),
		...mapActions("core/tipo", ["getTypes", "getSubtypes"]),
		date_focus_in(e) {
			// console.log("date_focus_in =>", e);
			e.component.open();
		},
		date_focus_out(e) {
			// console.log("date_focus_out =>", e);
			e.component.close();
		},
		// 202108250029: Obtiene el id de un rol de grupo
		get_group_role_id: (name) => {
			let item = window.clasificador.estructura_rol.find((o) => o.name == name);
			return typeof item !== "undefined" ? item["id"] : null;
		},
		// 202108250030: Obtiene el id de un tipo de grupo
		get_group_type_id: (name) => {
			let item = window.clasificador.estructura_tipo.find((o) => o.name == name);
			return typeof item !== "undefined" ? item["id"] : null;
		},
		get_role_id: (name) => {
			let item = window.clasificador.rol.find((o) => o.name == name);
			return typeof item !== "undefined" ? item["id"] : null;
		},
		get_faculty_name: (id) => {
			let item = window.clasificador.facultad.find((o) => o.id.toString() == id.toString());
			return typeof item !== "undefined" ? item["nombre"] : null;
		},
		get_faculty_name_by_oas: (oas_id) => {
			let item = window.clasificador.facultad.find((o) => o.id_oas.toString() == oas_id.toString());
			return typeof item !== "undefined" ? item["nombre"] : null;
		},
		go(groupId = 0, path, lockMsg = "Cargando", lockEl = ".page-content") {
			console.clear();
			console.log("groupId", groupId);
			this.loaderShow(lockMsg, lockEl);
			this.$router.push({ path: path });
			console.log("this.$router", this.$router);
		},
		capitalize(e) {
			e.component.instance().option("value", this.$titleCase(e.value));
		},
		confirmLeave() {
			return true;
		},
		confirmStayInDirtyForm() {
			return this.form_dirty && !this.confirmLeave();
		},
		beforeWindowUnload(e) {
			if (this.confirmStayInDirtyForm()) {
				window.sessionStorage.clear();
				e.preventDefault();
				e.returnValue = "";
			}
		},
		loaderShow(msg, element) {
			let root = this;
			console.log("root.$loader.visible =>", root.$loader.visible);
			if (!root.$loader.visible) {
				root.$loader = {
					visible: true,
					message: typeof msg !== "undefined" ? msg : typeof root.loaderMessage !== "undefined" ? root.loaderMessage : loaderBase.message,
					element: typeof element !== "undefined" ? element : typeof root.loaderElement !== "undefined" ? root.loaderElement : loaderBase.element,
				};
			}
		},
		loaderHide() {
			let root = this;
			if (root.$loader.visible) {
				this.$loader = loaderBase;
			}
		},
		logOut() {
			let root = this;
			root.authLogout(function() {
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
		gmState(cellInfo) {
			console.log("gmState", cellInfo.value);
			return cellInfo.value === 1 ? "SI" : "NO";
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
		nullTextCap(cellInfo) {
			if (cellInfo.valueText.length > 0) {
				return window.vm.$capitalize(cellInfo.valueText);
			} else {
				return "--";
			}
		},
		nullTextTitle(cellInfo) {
			if (cellInfo.valueText.length > 0) {
				return window.vm.$titleCase(cellInfo.valueText);
			} else {
				return "--";
			}
		},
	},
	computed: {
		...mapState("auth/usuario", ["roles"]),
		...mapState("auth/login", ["authenticated", "user"]),
		es_admin() {
			return this.user_role_id == this.get_role_id("administrador");
		},
		editMode() {
			let root = this;
			let result = false;
			console.log(window.vm.$sep);
			console.log("editMode");
			if (
				root.user_role_id === this.get_role_id("administrador") ||
				root.user_role_id === this.get_role_id("gestor") ||
				root.user_role_id === this.get_role_id("gestor_facultad")
			) {
				result = true;
			} else {
				console.log("this.$route.params", root.$route.params);
				let groupId = root.$route.params.unidadId;
				if (typeof groupId !== "undefined" && typeof window.vm.user !== "undefined") {
					console.log("groupId =>", groupId);
					console.log("user =>", window.vm.user);
					// 202106162157: Filtra el grupo actual de los grupos seleccionados
					if (typeof window.vm.user.groups !== "undefined") {
						console.log("groups =>", window.vm.user.groups);
						let g = window.vm.user.groups.find((o) => o.research_group_id == groupId);
						if (typeof g !== "undefined") {
							console.log("current_group =>", g);
							console.log("current_group => role_id =>", g.role_id);
							// 202106170127: Si es director en el grupo actual
							if (g.role_id === root.get_group_role_id("director")) result = true;
							// 202108250019: Si el grupo es semillero y el rol es lider semillero
							if (g.group_type_id === root.get_group_type_id("semillero") && g.role_id === root.get_group_role_id("lider_semillero")) result = true;
						}
					}
				}
			}
			console.log("editMode =>", result);
			console.log(window.vm.$sep);
			return result;
		},
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
		is_dev() {
			return process.env.NODE_ENV.toString().toLowerCase() === "development";
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
			if (this.user !== null && this.user.local !== null && typeof this.user.local !== "undefined") {
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
			.get(process.env.BASE_URL + "data/clasificador.json")
			.then(({ data }) => {
				window.clasificador = data;
				createVue();
				console.log("window.config", window.config);
				console.log("window.clasificador", window.clasificador);
				console.log("window.vm.$store", window.vm.$store);
			})
			.catch((err) => {
				console.log("ERROR", err);
			});
	})
	.catch((err) => {
		console.log("ERROR", err);
	});
