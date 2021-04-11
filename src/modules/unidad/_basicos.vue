<template>
	<div class="col p-3" id="panel-basicos">
		<DxValidationGroup ref="basicGroup">
			<div class="row">
				<div class="col-md-4">
					<div class="form-group">
						<label>Facultad(es):</label>
						<DxTagBox
							name="faculty_ids"
							id="faculty_ids"
							:read-only="!editMode"
							value-expr="Id"
							display-expr="Nombre"
							class="form-control"
							:search-enabled="true"
							:show-selection-controls="true"
							:value.sync="group.faculty_ids"
							:placeholder="placeholder"
							:data-source="facultades"
							@value-changed="sbFacultadChange"
						>
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxTagBox>
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label>Proyecto(s) Curricular(es):</label>
						<DxTagBox
							:grouped="true"
							name="curricular_project_ids"
							:read-only="!editMode"
							id="curricular_project_ids"
							value-expr="Id"
							display-expr="Nombre"
							class="form-control"
							:search-enabled="true"
							:show-selection-controls="true"
							:value.sync="group.curricular_project_ids"
							:placeholder="placeholder"
							:disabled="tbProyectoDisabled"
							:data-source="proyectos"
						>
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxTagBox>
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label>Línea(s) de investigación:</label>
						<DxTagBox
							name="faculty_ids"
							id="faculty_ids"
							value-expr="id"
							display-expr="st_name"
							:read-only="!editMode"
							class="form-control"
							:search-enabled="true"
							:show-selection-controls="true"
							:value.sync="group.research_focus_ids"
							:data-source="lineasInvestigacion"
							:placeholder="placeholder"
						>
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxTagBox>
					</div>
				</div>
				<div class="col-md-5">
					<div class="form-group">
						<label>CINE Amplio y Específico:</label>
						<DxSelectBox
							:grouped="true"
							:search-enabled="true"
							:placeholder="placeholder"
							:read-only="!editMode"
							:data-source="cineEspecificos"
							@value-changed="sbEspecificoChange"
							:value.sync="group.cine_specific_area_id"
							class="form-control"
							display-expr="name"
							value-expr="id"
						>
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxSelectBox>
					</div>
				</div>
				<div class="col-md-5">
					<div class="form-group">
						<label>CINE Detallado:</label>
						<DxTagBox
							value-expr="id"
							display-expr="name"
							class="form-control"
							:read-only="!editMode"
							:search-enabled="true"
							:show-selection-controls="true"
							:value.sync="group.cine_detailed_area_ids"
							:placeholder="placeholder"
							:disabled="tbEspecificoDisabled"
							:data-source="cineDetallados"
						>
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxTagBox>
					</div>
				</div>
				<div class="col-md-2">
					<div class="form-group">
						<label>Doc. de constitución:</label>
						<a v-if="getDocument(108)" :href="getLink(108)" target="_blank" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
							<b><i class="icon-link"></i></b> DOCUMENTO ACTUAL
						</a>
						<DxFileUploader
							label-text=""
							upload-mode="useForm"
							accept="document/*.pdf"
							:max-file-size="4000000"
							v-if="editMode"
							id="establishment_document"
							:select-button-text="getDocument(108) ? 'CAMBIAR' : 'SELECCIONAR'"
							:allowed-file-extensions="['.pdf']"
							@valueChanged="fileSelected($event, 108)"
							@contentReady="fileReady($event)"
						>
							<DxValidator>
								<DxRequiredRule v-if="!getDocument(108)" />
							</DxValidator>
						</DxFileUploader>
					</div>
				</div>
				<div class="col-md-7">
					<div class="row">
						<div class="col-md-4">
							<div class="form-group">
								<label>Tipo de unidad:</label>
								<DxSelectBox
									:data-source="unidadTipos"
									:grouped="false"
									:value.sync="group.group_type_id"
									:search-enabled="false"
									placeholder="Seleccione..."
									class="form-control"
									:read-only="!editMode"
									display-expr="st_name"
									value-expr="id"
								>
									<DxValidator>
										<DxRequiredRule />
									</DxValidator>
								</DxSelectBox>
							</div>
						</div>
						<div class="col-md-8">
							<div class="form-group">
								<label>Nombre de la unidad:</label>
								<DxTextBox
									:show-clear-button="true"
									:read-only="!editMode"
									class="form-control"
									:value.sync="group.name"
									placeholder="Nombre de la unidad"
									name="name"
									id="name"
								>
									<DxValidator>
										<DxRequiredRule />
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-5">
					<div class="row">
						<div class="col-md-4">
							<div class="form-group">
								<label>Acrónimo:</label>
								<DxTextBox
									:show-clear-button="true"
									:read-only="!editMode"
									class="form-control upper"
									placeholder="Acrónimo"
									:value.sync="group.acronym"
									name="acronym"
									id="acronym"
								>
									<DxValidator>
										<DxRequiredRule />
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label>Inter Institucional:</label>
								<DxSwitch :value.sync="group.interinstitutional" :read-only="!editMode" switched-on-text="SI" switched-off-text="NO" />
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label>Estado:</label>
								<DxSelectBox
									:read-only="!editMode"
									:data-source="unidadEstados"
									:value.sync="group.group_state_id"
									class="form-control"
									display-expr="st_name"
									value-expr="id"
									placeholder="Seleccione..."
								>
									<DxValidator>
										<DxRequiredRule />
									</DxValidator>
								</DxSelectBox>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-2">
					<div class="form-group">
						<label>Número de acta CIDC:</label>
						<DxTextBox
							:read-only="!editMode"
							:show-clear-button="true"
							class="form-control"
							:value.sync="group.cidc_act_number"
							placeholder="Número de acta CIDC"
							name="actaCidc"
							id="actaCidc"
						>
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxTextBox>
					</div>
				</div>
				<div class="col-md-2">
					<div class="form-group">
						<label>Fecha creación CIDC:</label>
						<DxDateBox
							class="form-control"
							:read-only="!editMode"
							name="cidcRegistrationDate"
							:value.sync="group.cidc_registration_date"
							id="cidcRegistrationDate"
							placeholder="dd/mm/yyyy"
							display-format="dd/MM/yyyy"
							:min="minDate"
							:max="actualDate"
							type="date"
						>
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxDateBox>
					</div>
				</div>
				<div class="col-md-2">
					<div class="form-group">
						<label>Documento acta CIDC:</label>
						<a v-if="getDocument(107)" :href="getLink(107)" target="_blank" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
							<b><i class="icon-link"></i></b> DOCUMENTO ACTUAL
						</a>
						<DxFileUploader
							label-text=""
							upload-mode="useForm"
							v-if="editMode"
							accept="document/*.pdf"
							:max-file-size="4000000"
							id="cidc_act_document"
							:select-button-text="getDocument(107) ? 'CAMBIAR' : 'SELECCIONAR'"
							:allowed-file-extensions="['.pdf']"
							@valueChanged="fileSelected($event, 107)"
							@contentReady="fileReady($event)"
						>
							<DxValidator>
								<DxRequiredRule v-if="!getDocument(107)" />
							</DxValidator>
						</DxFileUploader>
					</div>
				</div>
				<div class="col-md-2">
					<div class="form-group">
						<label>Número de acta Facultad:</label>
						<DxTextBox
							:show-clear-button="true"
							class="form-control"
							:read-only="!editMode"
							:value.sync="group.faculty_act_number"
							placeholder="Número de acta Facultad"
							name="actaFaculty"
							id="actaFaculty"
						>
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxTextBox>
					</div>
				</div>
				<div class="col-md-2">
					<div class="form-group">
						<label>Fecha creación Facultad:</label>
						<DxDateBox
							class="form-control"
							name="facultyRegistrationDate"
							:value.sync="group.faculty_registration_date"
							id="facultyRegistrationDate"
							placeholder="dd/mm/yyyy"
							display-format="dd/MM/yyyy"
							:read-only="!editMode"
							:min="minDate"
							:max="actualDate"
							type="date"
						>
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxDateBox>
					</div>
				</div>
				<div class="col-md-2">
					<div class="form-group">
						<label>Documento acta Facultad:</label>
						<a v-if="getDocument(106)" :href="getLink(106)" target="_blank" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
							<b><i class="icon-link"></i></b> DOCUMENTO ACTUAL
						</a>
						<DxFileUploader
							label-text=""
							upload-mode="useForm"
							accept="document/*.pdf"
							:max-file-size="4000000"
							v-if="editMode"
							id="faculty_act_document"
							:select-button-text="getDocument(106) ? 'CAMBIAR' : 'SELECCIONAR'"
							:allowed-file-extensions="['.pdf']"
							@valueChanged="fileSelected($event, 106)"
							@contentReady="fileReady($event)"
						>
							<DxValidator>
								<DxRequiredRule v-if="!getDocument(106)" />
							</DxValidator>
						</DxFileUploader>
					</div>
				</div>
				<div class="col-md-12">
					<div class="form-group">
						<label>Misión:</label>
						<DxTextArea :read-only="!editMode" :height="100" :max-length="400" :value.sync="group.mission" placeholder="Misión" class="form-control">
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxTextArea>
					</div>
				</div>
				<div class="col-md-12">
					<div class="form-group">
						<label>Visión:</label>
						<DxTextArea :read-only="!editMode" :height="100" :max-length="400" :value.sync="group.vision" placeholder="Visión" class="form-control">
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxTextArea>
					</div>
				</div>
				<div class="col-md-12">
					<div class="form-group">
						<label>Descripción:</label>
						<DxTextArea :read-only="!editMode" :height="80" :max-length="400" :value.sync="group.description" placeholder="Descripción" class="form-control">
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxTextArea>
					</div>
				</div>
			</div>
		</DxValidationGroup>
		<div class="row">
			<div class="col">
				<DxButton @click="cancel" class="nb">
					<template #default>
						<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
							<b><i class="icon-database-remove"></i></b> CANCELAR
						</span>
					</template>
				</DxButton>
			</div>
			<div class="col text-right" v-if="editMode">
				<DxButton @click="save" class="nb">
					<template #default>
						<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
							GUARDAR <b><i class="icon-database-add"></i></b>
						</span>
					</template>
				</DxButton>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
// https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns
let $ = window.jQuery,
	root = null;
import { DxButton, DxDateBox, DxFileUploader, DxSelectBox, DxSwitch, DxTagBox, DxTextArea, DxTextBox, DxValidationGroup } from "devextreme-vue";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import DataSource from "devextreme/data/data_source";
import Notify from "devextreme/ui/notify";
import { mapActions, mapGetters, mapState } from "vuex";
let hideErrors = () => {
	$("#panel-basicos .dx-fileuploader-files-container").hide();
	$("#panel-basicos .dx-invalid-message").hide();
	$("#panel-basicos .dx-invalid").removeClass("dx-invalid");
};

export default {
	name: "datosBasicos",
	props: {
		editMode: {
			type: Boolean,
			default: true,
		},
		group: {
			type: Object,
			default: () => {},
		},
		saveFn: {
			type: Function,
			default: null,
		},
		cancelFn: {
			type: Function,
			default: null,
		},
	},
	// beforeUpdate: () => {
	// 	console.log("beforeUpdate _basicos.vue");
	// },
	updated: () => {
		console.log(root.$sep);
		hideErrors();
		console.log("updated _basicos.vue");
	},
	components: {
		DxDateBox,
		DxFileUploader,
		DxValidator,
		DxButton,
		DxRequiredRule,
		DxSelectBox,
		DxSwitch,
		DxTagBox,
		DxTextArea,
		DxTextBox,
		DxValidationGroup,
	},
	data: () => ({
		files: [],
		isValid: false,
		postMount: false,
		validationGroup: null,
		placeholder: "Busque y seleccione...",
		formRefName: "tree-view",
		now: new Date(),
		cineDetallados: {},
		proyectos: {},
		min: new Date(2000, 0, 1),
		tbProyectoDisabled: true,
		tbEspecificoDisabled: true,
		accept: "*.",
		multiple: false,
		uploadMode: "instantly",
		group_member: {
			role_id: 2,
			researcherId: 1,
			typeResearcher: "external",
		},
		grupoInterinstitucional: [
			{
				id: 1,
				value: true,
				name: "SI",
			},
			{
				id: 0,
				value: false,
				name: "NO",
			},
		],
		fileTypesSource: [
			{ name: "Documentos", value: "image/*" },
			{ name: "Videos", value: "video/*" },
		],
	}),
	mounted() {
		root = this;
		console.log(this.$sep);
		console.log("_basicos.vue mounted!");
		root.postMount = false;
		root.loadingElement = "#data";
		root.loadingMessage = "Guardando Grupo<br/>de Investigación";
		root.validationGroup = root.$refs.basicGroup.instance;
		root.getCine(root.getFacultades());
	},
	computed: {
		...mapState("unidad", ["documents"]),
		...mapState("unidad/oas", ["facultades"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapGetters("unidad", { unidadEstados: "states", unidadTipos: "types" }),
		...mapGetters("unidad/cine", { cEspecificos: "specific", cDetallados: "detailed" }),
		lineasInvestigacion() {
			return this.subtypesByType(35);
		},
		cineEspecificos() {
			console.log("this.cEspecificos", this.cEspecificos);
			console.log("this.cDetallados", this.cDetallados);
			return new DataSource({
				group: "cine_broad_area_name",
				store: {
					data: this.cEspecificos,
					key: "id",
					type: "array",
				},
				map: function(groupedItem) {
					// console.log(groupedItem);
					return groupedItem;
				},
			});
		},
	},
	methods: {
		...mapActions("unidad", ["setDocument"]),
		...mapActions("unidad/cine", { getCine: "all" }),
		...mapActions("unidad/oas", { getFacultades: "facultades" }),
		getDocument(document_type_id) {
			// console.log("state.documents", this.documents);
			// console.log(`getDocument(${document_type_id}) => group: `, this.group);
			return typeof this.group.documents !== "undefined" ? root.group.documents.find((o) => o.document_type_id == document_type_id) : null;
		},
		getLink(document_type_id) {
			var doc = root.getDocument(document_type_id);
			console.log("document", doc);
			return doc !== null ? `https://documental.portaloas.udistrital.edu.co/nuxeo/nxfile/default/${doc.id}/file:content/${doc.path}` : null;
		},
		save() {
			console.log(this.$sep);
			var result = root.validationGroup.validate();
			console.log("result", result);
			if (result.isValid) {
				console.log("VALID!");
				if (this.$isFunction(this.saveFn)) this.saveFn(root.validationGroup.validationGroup);
			}
		},
		cancel() {
			hideErrors();
			if (this.$isFunction(this.cancelFn)) this.cancelFn();
			//
		},
		onButtonClick() {
			Notify("Uncomment the line to enable sending a form to the server.");
			// const form = this.$refs[this.formRefName];
			// form.submit();
		},
		fileReady(e) {
			// console.clear();
			// console.log(e);
			var el = $(e.element);
			el.find(".dx-fileuploader-upload-button,.dx-fileuploader-input-container").hide();
			var btn = el.find(".dx-fileuploader-button.dx-button-has-text:first");
			btn
				.removeClass("dx-fileuploader-button dx-button dx-button-normal dx-button-mode-contained dx-widget dx-button-has-text")
				.addClass("btn btn-main btn-sm btn-labeled btn-labeled-left legitRipple w-100");
			// console.log(btn.html());
			btn.html('<b><i class="icon-file-pdf"></i></b>' + btn.find(".dx-button-text").html());
			// btn-labeled btn-labeled-left legitRipple
			// el.find(".dx-fileuploader-button").hide();
			// console.log("fileReady", e);
		},
		fileSelected(e, document_type_id) {
			console.log("e", e);
			var files = e.value;
			// 202104070926: Obtiene los tipos de documento y filtra por el id
			var type = root.subtypesByType(22).find((o) => o.id === document_type_id);
			let doc = { type_id: document_type_id, type_name: type.st_name, name: e.element.id, file: e.value[0] };
			this.setDocument(doc);
			// console.log(e);
			var el = $(e.element);
			var msg = el.find(".dx-fileuploader-files-container");
			console.log("msgs", msg);
			if (files.length > 0) {
				msg.show();
			} else {
				msg.hide();
			}
		},
		sbFacultadChange(e) {
			// console.clear();
			console.log("value", e.value);
			console.log("facultades", this.facultades);
			if (typeof e.value !== "undefined") {
				var items = this.facultades.filter((o) => e.value.includes(o.Id));
				console.log("items", items);
				if (items.length > 0) {
					this.tbProyectoDisabled = false;
					let opts = [];
					items.forEach((padre) => {
						padre.Opciones.forEach((opt) => {
							opts.push({ PadreId: padre.Id, PadreNombre: padre.Nombre, Id: opt.Id, Nombre: opt.Nombre });
						});
						console.log(padre.Nombre + ": " + padre.Opciones.length);
						console.log("Total", opts.length);
					});
					this.tbProyectoDisabled = false;
					let proyectosCurriculares = this.$objectSort(opts, "Nombre");
					console.log("proyectosCurriculares", proyectosCurriculares);
					this.proyectos = new DataSource({
						group: "PadreNombre",
						store: {
							key: "Id",
							type: "array",
							data: proyectosCurriculares,
						},
						map: function(groupedItem) {
							// console.log(groupedItem);
							return groupedItem;
						},
					});
					// console.log("proyectos", this.proyectos);
				} else {
					this.tbProyectoDisabled = true;
				}
			}
		},
		sbEspecificoChange(e) {
			var items = this.cDetallados.filter((o) => o.cine_specific_area_id === e.value);
			if (items.length > 0) {
				console.log(this.$sep);
				console.log(this.cEspecificos);
				var item = this.cEspecificos.filter((o) => o.id === e.value)[0];
				root.group.cine_broad_area_id = item.cine_broad_area_id;
				// this.group.cine_detailed_area_ids = [];
				items = this.$objectSort(items, "name");
				this.cineDetallados = items;
				this.tbEspecificoDisabled = false;
				// console.log("cineDetallados", this.cineDetallados);
			} else {
				this.tbEspecificoDisabled = true;
			}
		},
	},
};
</script>
