<template>
	<div id="panel-datos-usuario">
		<div class="card-body">
			<div class="page-title d-flex">
				<h2>
					<i class="icon-info mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">Información de la Estructura</span>
				</h2>
			</div>

			<div class="row">
				<div class="col-md-3">
					<div class="form-group">
						<label>Nombre de la Estructura: </label>
						<p class="texto">{{ group.name }}</p>
					</div>
				</div>

				<div class="col-md-3">
					<div class="form-group">
						<label>Acronimo: </label>
						<p class="texto">{{ group.acronym }}</p>
					</div>
				</div>

				<div class="col-md-3">
					<div class="form-group">
						<label>Correo: </label>
						<!-- <p class='texto'>{{ group.email }}</p> -->
						<p>
							<a :title="group.email" class="cmd-item color-main-600 mr-2" :href="'mailto:' + group.email" Target="_blank">
								<i class="icon-mail"></i> {{ group.email }}
							</a>
						</p>
					</div>
				</div>

				<div class="col-md-3">
					<div class="form-group">
						<label>Estado del Grupo: </label>
						<p class="texto">{{ group.group_state_name }}</p>
					</div>
				</div>

				<div class="col-md-3">
					<div class="form-group">
						<label>Tipo de Estructura: </label>
						<p class="texto">{{ group.group_type_name }}</p>
					</div>
				</div>

				<div class="col-md-3">
					<div class="form-group">
						<label>GrupLAC: </label>
						<!-- <p class='texto'>{{ group.gruplac }}</p> -->
						<p>
							<a :title="group.gruplac" class="cmd-item color-main-600 mr-2" :href="group.gruplac" Target="_blank"> <i class="icon-link"></i> Direccionar </a>
						</p>
					</div>
				</div>

				<div class="col-md-3">
					<div class="form-group">
						<label>SNIES: </label>
						<p class="texto">{{ group.snies_name }}</p>
					</div>
				</div>

				<div class="col-md-3">
					<div class="form-group">
						<label>URL: </label>
						<p>
							<a :title="group.webpage" class="cmd-item color-main-600 mr-2" :href="group.webpage" Target="_blank">
								<i class="icon-link"></i> Web de la Estructura
							</a>
						</p>
					</div>
				</div>

				<div class="card-body">
					<div class="page-title d-flex">
						<h2>
							<i class="icon-info mr-1 color-main-600"></i>
							<span class="font-weight-semibold" id="title">Información del Aspirante</span>
						</h2>
					</div>

					<div class="row">
						<div class="col-md-3">
							<div class="form-group">
								<label>Nombre: </label>
								<p class="texto">{{ dataUserLogin.TerceroId.NombreCompleto }}</p>
							</div>
						</div>

						<div class="col-md-3">
							<div class="form-group">
								<label>Tipo Dcoumento: </label>
								<p class="texto">{{ dataUserLogin.TipoDocumentoId.Nombre }}</p>
							</div>
						</div>

						<div class="col-md-3">
							<div class="form-group">
								<label>Identificacion: </label>
								<p class="texto">{{ groupResearchers.datagroupmenber.identification_number }}</p>
							</div>
						</div>

						<div class="col-md-3">
							<div class="form-group">
								<label>ID OAS: </label>
								<p class="texto">{{ groupResearchers.datagroupmenber.oas_researcher_id }}</p>
							</div>
						</div>

						<div class="col-md-3">
							<div class="form-group">
								<label>Estado del Investigador: </label>
								<p class="texto">{{ groupResearchers.datagroupmenber.researcher_is_active == true ? "Activo" : "Inactivo" }}</p>
							</div>
						</div>

						<div class="col-md-3">
							<div class="form-group">
								<label>Rol en Estructura: </label>
								<p class="texto">{{ groupResearchers.datagroupmenber.role_name }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- <div class="card">
					<div class="card-body"><strong>group:</strong> {{ JSON.stringify(group, null, 3) }}</div>
				</div> 
                <div class="card">
					<div class="card-body"><strong>dataUserLogin:</strong> {{ JSON.stringify(dataUserLogin, null, 3) }}</div>
				</div> 
				<div class="card">
					<div class="card-body"><strong>groupResearchers:</strong> {{ JSON.stringify(groupResearchers, null, 3) }}</div>
				</div> 
                <div class="card">
					<div class="card-body"><strong>identiicacion:</strong> {{ JSON.stringify(identification, null, 3) }}</div>
				</div> 
                <div class="card">
					<div class="card-body"><strong>inforBase:</strong> {{ JSON.stringify(inforBase, null, 3) }}</div>
				</div>  -->
		</div>
	</div>
</template>

<script>
// https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns
let $ = window.jQuery,
	root = null;

import { mapActions } from "vuex"; //, mapGetters
let hideErrors = () => {
	$("#panel-basicos .dx-fileuploader-files-container").hide();
	$("#panel-basicos .dx-invalid-message").hide();
	$("#panel-basicos .dx-invalid").removeClass("dx-invalid");
};

export default {
	name: "informacion_base",
	components: {},
	data: () => ({
		group: {},
		dataUserLogin: {},
		identification: {},
		groupResearchers: { gropusmember: {}, datagroupmenber: { role_name: null, id: null } }, //guarda datos importantes del usuario logeado de la estructura logeada
	}),
	methods: {
		...mapActions("unidad", ["getUnit"]),
		...mapActions("unidad/producto/universalSentUpAct", {
			getSerarchDoc: "univerdalGet",
			getSinData: "getSinData",
			universalgetOas: "universalgetOas",
		}),
		loadMembers() {
			console.log("members", root.group.member_id);
		},
	},
	props: {
		inforBase: {
			type: Object,
			default: () => {},
		},
	},

	computed: {},

	created: function() {
		root = this;
	},
	updated: () => {
		// console.log(root.$sep);
		// console.log("documentos Updated");
		hideErrors();
	},
	async mounted() {
		root.loaderShow("Cargando Información");

		await root.getSinData({
			// url: "/research_units/117/group_member/10286",
			url: "/researchers/" + parseInt(root.inforBase.researcher_id),
			cb: function(results) {
				let objeto = results;
				root.identification = objeto;
			},
		});
		root.dataUserLogin = await root.universalgetOas({ doc: root.identification.identification_number });

		await root.getSinData({
			// url: "/research_units/117/group_member/10286",
			url: "/researcher_research_units/?identification_number=" + parseInt(root.identification.identification_number),
			cb: function(results) {
				let objeto = results;
				root.groupResearchers.gropusmember = objeto;
				let resoultFind = objeto.find((buscador) => buscador.research_group_id === parseInt(root.inforBase.research_group_id));
				if (resoultFind != undefined) root.groupResearchers.datagroupmenber = resoultFind;
				root.loaderHide();
				console.warn("datos internos integrante ", objeto);
			},
		});

		await root.getUnit({
			id: root.inforBase.research_group_id,
			cb: function(result) {
				root.group = result;
				// document.title += ` ${root.$titleCase(root.group.name)}`;
				root.loadMembers();
			},
		});
		let reload = setTimeout(function() {
			root.loaderHide();
		}, 5000);
		reload;
		this.$forceUpdate();
	},
};
</script>
<style scoped>
.texto {
	color: darkslategrey;
}
/* #panel-datos-usuario{
    height: 500px;
} */</style
>>
