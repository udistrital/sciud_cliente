<template>
	<div v-if="item">
		<Header :item="item" />
		<div class="row">
			<div class="col">
				<div class="card" id="panel-documentos">
					<div class="card-body group-detail mh">
						<div class="row mb-3">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-center">
									<div class="title"><i class="icon-pencil6"></i> Convocatoria {{ item.call_code }}</div>
									<div class="sub-title"><i class="icon-file-pdf"></i> Ejes Temáticos</div>
								</div>
							</div>
						</div>
						<Documentos
							:id="id"
							:parent="this"
							:main-obj="item"
							:show-on-load="true"
							:tipos="tiposDocumento"
							end-point="calls"
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
						<span class="font-weight-semibold">item:</span> {{ JSON.stringify(item, null, 3) }}
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
		Header: () => import("./_header"),
		Documentos: () => import("@/components/element/documentos"),
	},
	data: () => ({
		item: null,
		id: "panel-convocatoria-documentos",
	}),
	methods: {
		...mapActions("convocatoria", ["getItem"]),
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
	},
	created: async function() {
		root = this;
		console.log(root.$sep);
		root.tiposDocumento = root.subtypesByType("convocatoria_doc_emitir");
		console.log("root.tiposDocumento =>", root.tiposDocumento);
		let uId = root.$route.params.itemId;
		root.item = await root.getItem(uId);
		console.log("item =>", root.item);
		document.title += ` Convocatoria ${root.item.call_code}`;
	},
	updated: () => {
		console.log(root.$sep);
		console.log("documentos Updated");
		hideErrors();
	},
	mounted() {
		// setTimeout(function() {
		// 	let id = `#${root.id}`;
		// 	console.log("id", id);
		// 	$(id).fadeIn();
		// }, 700);
	},
};
</script>
