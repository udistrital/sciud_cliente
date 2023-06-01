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
							:botonUploadVisible="{
								visible: true,
								id: id_seguimiento_documento,
							}"
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
						<span class="font-weight-semibold">inforBase:</span> {{ JSON.stringify(inforBase, null, 3) }}
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
		tiposDocumento:[]
	}),
	methods: {
		...mapActions("unidad", ["getUnit"]),
		...mapActions("unidad/producto/universalSentUpAct", {  getAll: "getAll" }),
		listDoc2subtipos(parametro) {
			if (parametro.length >= 1) {
				parametro.map(function (lista) {
					let require = lista.cd_required? "*": "";
					lista.id_ant = lista.id
					lista.st_name = lista.document_name + " "+ require +"";
					lista.id = lista.document_id;
					return lista;
				});
				root.tiposDocumento = parametro;
			}
		},
	},
    props:{
        id_mobility: {
			type: Number,
			default: null,
		},
		inforBase: {
			type: Object,
			default: () => {},
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
		// root.$info("dentro="+parseInt(root.mobility_calls.id));
		
			root.getAll({
				url: "/calls/" + parseInt(root.inforBase.call_id) + "/call_documents",
				cb: function (results) {
					let listDocuments = results;
					console.warn("movilidad docs list ", listDocuments);
					root.listDoc2subtipos(listDocuments);
					root.loaderHide();
				},
			});		
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
