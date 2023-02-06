<template>
	<div >
		<div class="row">
			<div class="col">
				<div class="card" id="panel-documentos">
					<div class="card-body">
						<div class="row mb-3">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-end">
									<!-- <div class="title"><i class="icon-books"></i> {{ $titleCase(group.name) }}</div> -->
									<h2><i class="icon-file-pdf"></i> {{datax.name}}</h2>
								</div>
							</div>
						</div>
						<Documentos
							:id="id"
							:parent="this"
							:main-obj="datax"
							:show-on-load="true"
							:tipos="tiposDocumento"
							end-point="mobility_calls"
							lock-element="#panel-documentos .card-body"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<span class="font-weight-semibold">editMode:</span> {{ editMode }}
						<hr class="sep" />
						<!-- <span class="font-weight-semibold">group:</span> {{ JSON.stringify(group, null, 3) }} -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns
let $ = window.jQuery,
	root = null;
import { mapActions, mapGetters } from "vuex";
let hideErrors = () => {
	$("#panel-basicos .dx-fileuploader-files-container").hide();
	$("#panel-basicos .dx-invalid-message").hide();
	$("#panel-basicos .dx-invalid").removeClass("dx-invalid");
};

export default {
	name: "datosBasicos",
	components: {
		// Header: () => import("./_header"),
		Documentos: () => import("@/components/element/documentos"),
	},
	data: () => ({
        datax:{
            group_type_name:"mobility_calls",
            id:null,
            name:"Documentos Requeridos",
        },
		group: {},
		id: "panel-documentos-movilidad",
	}),
	methods: {
		...mapActions("unidad", ["getUnit"]),
	},
    props:{
        id_mobility: {
			type: Number,
			default: null,
		},
    },
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
	},
    
	created: function() {
		root = this;
		console.log(root.$sep);
		root.tiposDocumento = [];
        root.datax.id=root.id_mobility;
		console.log("root.tiposDocumento", root.tiposDocumento);
		
	},
	updated: () => {
		console.log(root.$sep);
		console.log("documentos Updated");
		hideErrors();
	},
	mounted() {
        this.$forceUpdate();
		// setTimeout(function() {
		// 	let id = `#${root.id}`;
		// 	console.log("id", id);
		// 	$(id).fadeIn();
		// }, 700);
	},
};
</script>
