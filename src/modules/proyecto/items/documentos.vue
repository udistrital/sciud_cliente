<template>
	<div>
		<div class="row">
			<div class="col">
				<div class="card" id="panel-documentos">
					<div class="card-body">
						<div class="row mb-3">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-end">
									<!-- <div class="title"><i class="icon-books"></i> {{ $titleCase(group.name) }}</div> -->
									<h2><i class="icon-file-pdf"></i> {{ datax.name }}</h2>
								</div>
							</div>
						</div>
						<!-- <div class="card-body" v-html="requisitoArchivo()"></div> -->
						<Documentos
							:id="id"
							:parent="this"
							:main-obj="datax"
							:show-on-load="true"
							:tipos="tiposDocumento"
							end-point="proposals"
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
						<span class="font-weight-semibold">propuesta:</span> {{ propuesta }}
						<hr class="sep" />
						<span class="font-weight-semibold">editMode:</span> {{ editMode }}
						<hr class="sep" />
						<span class="font-weight-semibold">tiposDocumento:</span>
						{{ tiposDocumento }}
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
		Documentos: () => import("@/components/element/documentos"),
	},
	data: () => ({
		id_seguimiento_documento: 0,
		datax: {
			group_type_name: "proposals",
			id: null,
			name: "Documentos del Proyecto",
		},
		tiposDocumento: [],
		group: {},
		id: "panel-documentos-seguimiento",
		stateUpDocument: { visible: true },
	}),
	methods: {
		// ...mapActions("unidad", ["getUnit"]),
		...mapActions("unidad/producto/universalSentUpAct", {
			objSave: "save",
			objUpdate: "update",
			elementoActive: "active",
			getSinData: "getSinData",
			getAll: "getAll",
		}),

		async documentos(data, tiposSubtipos) {
			// console.clear();
			console.warn("documentos", data);
			root.loaderShow("Cargando lista Documentos");
			console.warn("id list docs", data.id);

			await root.getAll({
				url: "/calls/" + parseInt(data.call_id) + "/call_documents",
				cb: function(results) {
					let listDocuments = results;
					console.warn("propuesta docs list ", listDocuments);
					setTimeout(function() {
						root.listDoc2subtipos(listDocuments, tiposSubtipos);
						root.loaderHide();
					}, 700);
				},
			});
		},

		listDoc2subtipos(parametro, tiposSubtipos) {
			if (parametro.length >= 1) {
				// alert("leyo")
				parametro.map(function(lista) {
					let require = lista.cd_required ? "(Requerido)" : "";
					lista.id_ant = lista.id;
					lista.st_name = lista.document_name + " " + require + "";
					lista.id = lista.document_id;
					return lista;
				});
				root.tiposDocumento = parametro.concat(tiposSubtipos);
			}
		},
	},
	props: {
		id_proposal: {
			type: Number,
			default: null,
		},
		propuesta: {
			type: Object,
			default: null,
		},

		permisoGuardar: {
			type: Boolean,
			default: () => false,
		},
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
	},

	created: function() {
		console.clear();
		root = this;
		console.log(root.$sep);
		let doc_segui = root.subtypesByType("proyecto_seguimiento");
		root.documentos(root.propuesta, doc_segui);

		root.id_seguimiento_documento = root.get_sub_type_id("documentos_seguimiento");

		root.datax.id = root.propuesta.id;
		console.log("root.tiposDocumento", root.tiposDocumento);
	},

	beforeUpdate() {
		console.log(this.$sep);
		console.log("beforeUpdate documentos.vue");
	},

	beforeDestroy() {
		console.log(this.$sep);
		console.log("beforeDestroy documentos.vue");
	},
	destroyed() {
		console.log(this.$sep);
		console.log("destroyed documentos.vue");
	},

	updated: () => {
		console.log(root.$sep);

		console.log("documentos Updated");
		hideErrors();
	},

	mounted() {
		this.$forceUpdate();
		root.stateUpDocument = { visible: root.permisoGuardar };
		console.warn("stateUpDocument", root.stateUpDocument);
	},
};
</script>
