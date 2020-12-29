// https://codesandbox.io/s/8l0m8qk0q0
// https://www.npmjs.com/package/vuex-rest-api
// 201906111259: https://vuex.vuejs.org/guide/modules.html
// Imports
import vue from "vue";
import vuex from "vuex";
import auth from "./auth";
import nuxeo from "./nuxeo";
// Modules
import actividadesFor from "./_actividadesFormacion";
import animal from "./_animal";
import apropiacionSoc from "./_apropiacionSocial";
import areaConocimiento from "./_areasGeneracion";
import articulo from "./_articulo";
import capitulo from "./_capitulo";
import categoriaArt from "./_categoriaArticulos";
import categoriaLib from "./_categorialibros";
import categoriaObras from "./_categoriaObras";
import cine from "./_cine";
import desarrolloTec from "./_desarrolloTecnologico";
import estadoPatente from "./_estadoPatente";
import estadoSolicitud from "./_estadoSolicitud";
import estudiante from "./_estudiante";
import facultadProyecto from "./_facultadProyecto";
import formContribucion from "./_formContribucion";
import formEstrategia from "./_formEstrategia";
import historialColciencias from "./_historialColciencias";
import libros from "./_libros";
import lineaInvestigacion from "./_lineaInvestigacion";
import listaAreaEsp from "./_listaAreaEsp";
import Ciudad from "./_listaCiudad";
import Pais from "./_listaPais";
import Estado from "./_listaEstado";
import listaTrabajos from "./_listaTrabajos";
import nota from "./_nota";
import nuevoConocimiento from "./_nuevoConocimiento";
import obra from "./_obra";
import ocde from "./_ocde";
import patente from "./_patente";
import planFormacion from "./_planFormacion";
import planProyectos from "./_planProyectos";
import tipoPoblacion from "./_tipoPoblacion";
import poblaciones from "./_poblaciones";
import roles from "./_roles";
import tercero from "./_tercero";
import tipoAnimal from "./_tipoAnimal";
import tipoArt from "./_tipoArticulos";
import tipoCiclo from "./_tipoCiclo";
import tipoPatente from "./_tipoPatente";
import tipoVegetal from "./_tipoVegetal";
import unidad from "./_unidad";
import unidadEstado from "./_unidadEstado";
import unidadTipo from "./_unidadTipo";
import usuario from "./_usuario";
import vegetal from "./_vegetal";
import LibParticipanteExt from "./_libParticipanteExt";
import LibParticipanteInt from "./_libParticipanteInt";
import TipoParticipacion from "./_listaTipoParticipacion";
import ArtParticipanteExt from "./_artParticipanteExt";
import ArtParticipanteInt from "./_artParticipanteInt";
import NotParticipanteExt from "./_notParticipanteExt";
import NotParticipanteInt from "./_notParticipanteInt";
import CapParticipanteExt from "./_capParticipanteExt";
import CapParticipanteInt from "./_capParticipanteInt";
import PatParticipanteExt from "./_patParticipanteExt";
import PatParticipanteInt from "./_patParticipanteInt";
import VegParticipanteExt from "./_vegParticipanteExt";
import VegParticipanteInt from "./_vegParticipanteInt";
import AniParticipanteExt from "./_aniParticipanteExt";
import AniParticipanteInt from "./_aniParticipanteInt";
import PobParticipanteExt from "./_pobParticipanteExt";
import PobParticipanteInt from "./_pobParticipanteInt";
import ObrParticipanteExt from "./_obrParticipanteExt";
import ObrParticipanteInt from "./_obrParticipanteInt";
vue.use(vuex);

const store = new vuex.Store({
	modules: {
		actividadesFor,
		animal,
		apropiacionSoc,
		areaConocimiento,
		articulo,
		auth,
		capitulo,
		categoriaArt,
		categoriaLib,
		categoriaObras,
		cine,
		Ciudad,
		desarrolloTec,
		estadoPatente,
		estadoSolicitud,
		estudiante,
		Estado,
		facultadProyecto,
		formContribucion,
		formEstrategia,
		historialColciencias,
		libros,
		lineaInvestigacion,
		listaAreaEsp,
		listaTrabajos,
		nota,
		nuevoConocimiento,
		nuxeo,
		obra,
		ocde,
		Pais,
		patente,
		planFormacion,
		planProyectos,
		poblaciones,
		roles,
		tercero,
		tipoAnimal,
		tipoArt,
		tipoCiclo,
		tipoPatente,
		tipoPoblacion,
		tipoVegetal,
		unidad,
		unidadEstado,
		unidadTipo,
		usuario,
		vegetal,
		TipoParticipacion,
		LibParticipanteInt,
		LibParticipanteExt,
		ArtParticipanteExt,
		ArtParticipanteInt,
		NotParticipanteExt,
		NotParticipanteInt,
		CapParticipanteExt,
		CapParticipanteInt,
		PatParticipanteExt,
		PatParticipanteInt,
		VegParticipanteExt,
		VegParticipanteInt,
		AniParticipanteExt,
		AniParticipanteInt,
		PobParticipanteExt,
		PobParticipanteInt,
		ObrParticipanteExt,
ObrParticipanteInt,
	},
});

export default store;
