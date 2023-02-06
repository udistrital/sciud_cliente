/* eslint-disable no-unused-vars */
import vue from "vue";
import router from "vue-router";
import store from "@/store";
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
			component: () => import("@/components/global/login.vue"),
		},
		{
			path: "/denied",
			name: "denied",
			meta: { title: "Acceso Denegado", requiresAuth: false },
			component: () => import("@/components/global/login_denied.vue"),
		},
		{
			name: "unidad",
			path: "/unidad",
			meta: { title: "Estructuras de Investigación", requiresAuth: true },
			component: () => import("@/modules/unidad/"),
		},
		{
			name: "unidad-crear",
			path: "/unidad/crear",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/unidad/informacion"),
		},
		{
			name: "unidad-info",
			path: "/unidad/:unidadId",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/unidad/informacion"),
		},
		{
			name: "unidad-documentos",
			path: "/unidad/:unidadId/documentos",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/unidad/documentos"),
		},


		{
			name: "manuales-documentos",
			path: "/help",
			meta: { title: "ayuda", requiresAuth: false },
			component: () => import("@/modules/documentacion"),
		},



		{
			name: "unidad-integrantes",
			path: "/unidad/:unidadId/integrantes",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/unidad/integrantes"),
		},
		{
			name: "unidad-produccion",
			path: "/unidad/:unidadId/produccion",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/unidad/produccion"),
		},
		{
			name: "convocatoria",
			path: "/convocatoria",
			meta: { title: "Convocatorias", requiresAuth: true },
			component: () => import("@/modules/convocatoria/"),
		},
		{
			name: "convocatoria-crear",
			path: "/convocatoria/crear",
			meta: { title: "Nueva convocatoria", requiresAuth: true },
			component: () => import("@/modules/convocatoria/informacion"),
		},

		
		//convocatoria movilidad
		{
			name: "convocatoria-Movilidad",
			path: "/convocatoria/:itemId/movilidad",
			meta: { title: "Conv-Movilidad", requiresAuth: true },
			component: () => import("@/modules/convocatoria/movilidad/index.vue"),
		},

		//convocatoria movilidad postulacion
		{
			path: "/convocatoria/aplicaciones",
			name: "Movilidad-listado-aplicacion",
			meta: { title: "Movilidad-listado-aplicacion", requiresAuth: true },
			component: () => import("@/modules/convocatoria/movilidad/postulacion/index.vue"),
		},
		{
			name: "aplicacion-movilidad",
			path: "/convocatoria/:itemId/aplicar",
			meta: { title: "aplicacion-movilidad", requiresAuth: true },
			component: () => import("@/modules/convocatoria/movilidad/postulacion/aplicar.vue"),
		},


		
//convocatoria diego

		{
			name: "convocatoria-info",
			path: "/convocatoria/:itemId",
			meta: { title: "Convocatoria", requiresAuth: true },
			component: () => import("@/modules/convocatoria/informacion"),
		},
		{
			name: "convocatoria-documentos",
			path: "/convocatoria/:itemId/documentos",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/convocatoria/documentos"),
		},
		{
			name: "convocatoria-cronograma",
			path: "/convocatoria/:itemId/cronograma",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/convocatoria/cronograma"),
		},
		{
			name: "convocatoria-criterios",
			path: "/convocatoria/:itemId/criterios",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/convocatoria/criterios"),
		},
		{
			name: "convocatoria-aspectos",
			path: "/convocatoria/:itemId/aspectos",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/convocatoria/aspectos"),
		},
		{
			name: "convocatoria-rubros",
			path: "/convocatoria/:itemId/rubros",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/convocatoria/rubros"),
		},
		{
			name: "convocatoria-plantilla",
			path: "/convocatoria/:itemId/plantilla",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/convocatoria/plantilla"),
		},
		
		

		//----------------------------------------------------------
		//		constitucion de la red de investigación
		//----------------------------------------------------------
		{
			name: "red",
			path: "/red",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/red_investigacion/index.vue"),
		},

		{
			name: "red-crear",
			path: "/red/crear",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/red_investigacion/informacion_red"),
		},

		{
			name: "red-info",
			path: "/red/:unidadId",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/red_investigacion/informacion_red"),
		},
		{
			name: "red-documentos",
			path: "/red/:unidadId/documentos",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/red_investigacion/documentos"),
		},
		{
			name: "red-grupos",
			path: "/red/:unidadId/grupos",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/red_investigacion/grupos"),
		},

		//---------------------------------------------------
		//				Entrada de proyectos: camorenos
		//---------------------------------------------------

		{
			name: "proyecto-propuesta",
			path: "/convocatoria/:convocatoriaId/propuesta",
			meta: { title: "Creación propuesta", requiresAuth: true },
			component: () => import("@/modules/convocatoria/proyectos/propuesta/index"),
		},
		

		{
			name: "convocatoria-proyecto",
			path: "/convocatoria/:itemId/proyecto",
			meta: { title: "Conv-propuesta", requiresAuth: true },
			component: () => import("@/modules/convocatoria/proyectos/evaluacion/index"),
		},

		{
			name: "seguimiento-proyecto",
			path: "/propuesta/:propuestaId/proyecto",
			meta: { title: "Conv-proyecto", requiresAuth: true },
			component: () => import("@/modules/convocatoria/proyectos/evaluacion/evaluar.vue"),
		},

		// {
		// 	name: "proyecto-Edicion",
		// 	path: "/convocatoria/:convocatoriaId/propuesta/:propuestaId",
		// 	meta: { title: "Edición Propuesta", requiresAuth: true },
		// 	component: () => import("@/modules/convocatoria/proyectos/propuesta/index"),
		// },

		//---------------------------------------------------
		//	 Entrada de proyectos seguimiento: camorenos
		//---------------------------------------------------

		{
			name: "lista-proyecto-seguimiento",
			path: "/proyecto/:propuestaId",
			meta: { title: "seguimiento-proyecto", requiresAuth: true },
			component: () => import("@/modules/proyecto/informacion.vue"),
		},

		{
			name: "proyecto-seguimiento",
			path: "/proyecto",
			meta: { title: "seguimiento-proyecto", requiresAuth: true },
			component: () => import("@/modules/proyecto/index.vue"),
		},

		//-----------------------------------------
		//   Comienzo de rutas plan de accion: camorenos
		//-----------------------------------------
		{
			path: "/plan_historico",
			name: "plan-accion-historico",
			meta: { title: "plan-accion-historico", requiresAuth: true },
			component: () => import("@/modules/plan_accion/historico"),
		},
		{
			path: "/unidad/:unidadId/plan_accion",
			name: "plan-accion",
			meta: { title: "plan-accion", requiresAuth: true },
			component: () => import("@/modules/plan_accion/"),
		},
		{
			path: "/unidad/:unidadId/plan_accion/crear",
			name: "plan-accion-nuevo-reg",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/plan_accion/ingreso_datos"),
		},
		{
			name: "plan-accion-datos",
			path: "/unidad/:unidadId/plan_accion/:planId/datos",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/plan_accion/items_plan"),
		},
		{
			name: "plan-accion-vista",
			path: "/unidad/:unidadId/plan_accion/:planId/vista",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/plan_accion/vista"),
		},

		//---------------------------------------------------
		//				Entrada de entidades: camorenos
		//---------------------------------------------------
		{
			name: "entidades",
			path: "/admin/entidades",
			component: () => import("@/modules/admin/entidades"),
			meta: { title: "Administración » Entidades", requiresAuth: true },
		},
		{
			name: "entidades-dep-represent",
			path: "/admin/entidades/:idEnt/dependencias/:idDep",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/admin/form_entidades/index"),
		},
		{
			name: "entidades-represent",
			path: "/admin/entidades/:idEnt",
			meta: { title: "", requiresAuth: true },
			component: () => import("@/modules/admin/form_entidades/index"),
		},
		{
			name: "dependencias",
			path: "/admin/entidades/:idEnt/dependencias",
			component: () => import("@/modules/admin/dependencias"),
			meta: { title: "Administración » Dependencias", requiresAuth: true },
		},

		{
			name: "roles",
			path: "/admin/rol_usuarios",
			component: () => import("@/modules/admin/rol"),
			meta: { title: "Administración » Roles", requiresAuth: true },
		},

		// {
		// 	path: "*",
		// 	redirect: { name: DEFAULT_ROUTE },
		// },
		//--------------------------------------------
		//			Fin plan de accion: camorenos
		//--------------------------------------------

		{
			// UserProfile will be rendered inside User's <router-view>
			// when /user/:id/profile is matched
			name: "usuarios",
			path: "/admin/usuarios",
			component: () => import("@/modules/admin/usuarios.vue"),
			meta: { title: "Administración » Usuarios", requiresAuth: true },
		},
		{
			name: "tipos",
			path: "/admin/tipos",
			component: () => import("@/modules/admin/tipos"),
			meta: { title: "Administración » Tipos", requiresAuth: true },
		},
		{
			name: "indicadores",
			path: "/admin/indicadores",
			component: () => import("@/modules/admin/indicadores"),
			meta: { title: "Administración » Indicadores", requiresAuth: true },
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
	let authenticated = store.getters["auth/login/authenticated"];
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
