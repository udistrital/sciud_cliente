/* eslint-disable no-unused-vars */
import vue from "vue";
import store from "../store";
import router from "vue-router";
vue.use(router);

// Constants
const DEFAULT_ROUTE = "inicio";
const DEFAULT_TITLE = "SICIUD v2.0";

let routes = new router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			redirect: { name: DEFAULT_ROUTE, requiresAuth: false },
		},
		{
			path: "/inicio",
			name: "inicio",
			meta: { title: "Inicio", requiresAuth: false },
			component: () => import("@/modules/inicio.vue"),
		},
		{
			path: "/login",
			name: "login",
			meta: { title: "Ingreso", requiresAuth: false },
			component: () => import("@/modules/login.vue"),
		},
		{
			path: "/unidad",
			name: "unidad",
			meta: { title: "Unidades de Investigación", requiresAuth: true },
			component: () => import("@/modules/unidad/index.vue"),
		},
		{
			// UserProfile will be rendered inside User's <router-view>
			// when /user/:id/profile is matched
			name: "usuarios",
			path: "/admin/usuarios",
			component: () => import("@/modules/admin/usuarios.vue"),
			meta: { title: "Administración » Usuarios", requiresAuth: true },
		},
		{
			path: "*",
			redirect: { name: DEFAULT_ROUTE },
		},
	],
});
// 202009200429: Before each auth
// https://www.codota.com/code/javascript/functions/vue-router/VueRouter/beforeEach?snippet=5d4cfa7e7a552d0c003d2c79
routes.beforeEach((to, from, next) => {
	// console.log("store.getters", store.getters["auth/authenticated"]);

	// If doesn't require authentication, accept.
	// console.log("to", to);
	if (!to.meta.requiresAuth) return next();

	// Check authentication
	let authenticated = store.getters["auth/authenticated"];
	console.log("authenticated", authenticated);

	// If user is athenticated and page is login redirect
	// if (authenticated && to.name === "login") {
	// 	// console.log("REDIRECT LOGIN!");
	// 	next("/");
	// }

	// If require auth but user is not authenticated, go to login.
	if (!authenticated) return next("/login");

	// If user is authenticated and page doesn't define roles, accept.
	if (!to.meta.roles) return next();

	// If page defines roles, check if user type is included in the roles.
	if (to.meta.roles.includes(store.getters.getCurrentUser.role)) return next();

	// Otherwise, denied.
	next("/");
});
routes.afterEach((to) => {
	let t = DEFAULT_TITLE;
	if (typeof to.meta.title !== undefined) t = DEFAULT_TITLE + " » " + to.meta.title;
	document.title = t;
});
export default routes;
