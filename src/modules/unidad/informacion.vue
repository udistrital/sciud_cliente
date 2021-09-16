<template>
	<div class="mh" v-if="group">
		<Header :group="group" />
		<div class="row">
			<div class="col">
				<div class="card">
					<div class="card-body group-detail" id="group-panel">
						<div class="row mb-3" v-if="group.id">
							<div class="col d-flex justify-content-between align-items-end">
								<div class="title"><i class="icon-books"></i> {{ $titleCase(group.name) }}</div>
								<div class="sub-title"><i class="icon-info"></i> Información</div>
							</div>
						</div>
						<div class="row">
							<DxValidationGroup ref="basicGroup">
								<div class="col-md-12">
									<fieldset>
										<legend>Información Básica</legend>
										<div class="row">
											<div class="col-md-10">
												<div class="form-group">
													<label>Nombre de la estructura:</label>
													<DxTextBox
														:show-clear-button="true"
														:read-only="!editMode"
														class="form-control"
														:value.sync="group.name"
														placeholder="Nombre de la estructura"
														name="name"
														id="name"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxTextBox>
												</div>
											</div>
											<div class="col-md-2">
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
													<label>Facultad(es):</label>
													<DxTagBox
														name="faculty_ids"
														id="faculty_ids"
														:read-only="!es_admin"
														value-expr="Id"
														display-expr="Nombre"
														class="form-control"
														:search-enabled="true"
														:show-selection-controls="true"
														:value.sync="group.faculty_ids"
														:placeholder="placeholder"
														:data-source="facultades"
														@value-changed="facultadChange"
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
														:search-enabled="true"
														:placeholder="placeholder"
														:read-only="!editMode"
														:disabled="tbDisabled"
														:show-selection-controls="true"
														:data-source="proyectosCurriculares"
														:value.sync="group.curricular_project_ids"
														class="form-control"
														display-expr="Nombre"
														value-expr="Id"
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
														:grouped="true"
														:search-enabled="true"
														:placeholder="placeholder"
														:read-only="!editMode"
														:disabled="tbDisabled"
														:show-selection-controls="true"
														:data-source="lineasInvestigacion"
														:value.sync="group.research_focus_ids"
														class="form-control"
														display-expr="Nombre"
														value-expr="Id"
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
														:show-clear-button="true"
														:grouped="true"
														:search-enabled="true"
														:placeholder="placeholder"
														:read-only="!editMode"
														:data-source="cineEspecificos"
														@value-changed="cineChange"
														:value.sync="group.cine_specific_area_id"
														ref="tbCine"
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
											<div class="col-md-4">
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
											<div class="col-md-3">
												<div class="form-group">
													<label>Tipo de unidad:</label>
													<DxSelectBox
														:show-clear-button="true"
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
											<div class="col-md-2">
												<div class="form-group">
													<label>Inter Institucional:</label>
													<DxSwitch :value.sync="group.interinstitutional" :read-only="!editMode" switched-on-text="SI" switched-off-text="NO" />
												</div>
											</div>
											<div class="col-md-2">
												<div class="form-group">
													<label>Estado:</label>
													<DxSelectBox
														:show-clear-button="true"
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
														@focus-in="date_focus_in"
														@focus-out="date_focus_out"
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
														@focus-in="date_focus_in"
														@focus-out="date_focus_out"
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
											<div class="col-md-4">
												<div class="form-group">
													<label>Misión:</label>
													<DxTextArea
														:read-only="!editMode"
														:height="100"
														:max-length="400"
														:value.sync="group.mission"
														placeholder="Misión"
														class="form-control"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxTextArea>
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group">
													<label>Visión:</label>
													<DxTextArea
														:read-only="!editMode"
														:height="100"
														:max-length="400"
														:value.sync="group.vision"
														placeholder="Visión"
														class="form-control"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxTextArea>
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group">
													<label>Descripción:</label>
													<DxTextArea
														:read-only="!editMode"
														:height="100"
														:max-length="400"
														:value.sync="group.description"
														placeholder="Descripción"
														class="form-control"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxTextArea>
												</div>
											</div>
										</div>
									</fieldset>
								</div>
								<div class="col-md-12 mt-3">
									<fieldset>
										<legend>Información Institucional</legend>
										<div class="row">
											<div class="col-md-2">
												<div class="form-group">
													<label>Código Colciencias:</label>
													<DxTextBox
														class="form-control"
														:read-only="!editMode"
														:show-clear-button="true"
														:value.sync="group.colciencias_code"
														placeholder="Código Colciencias"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxTextBox>
												</div>
											</div>
											<div class="col-md-2">
												<div class="form-group">
													<label>Código SNIES:</label>
													<DxTextBox
														class="form-control"
														:read-only="!editMode"
														:show-clear-button="true"
														:value.sync="group.snies_id"
														placeholder="Código SNIES"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxTextBox>
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group">
													<label>
														Url GrupLAC:
														<a class="color-main-600 ml-1 font-weight-semibold" v-if="group.gruplac" :href="group.gruplac" target="_blank"
															>VISITAR <i class="icon-link"></i
														></a>
													</label>
													<DxTextBox
														class="form-control"
														:read-only="!editMode"
														:show-clear-button="true"
														:value.sync="group.gruplac"
														placeholder="Url GrupLAC"
													>
														<DxValidator>
															<DxPatternRule message="La Url no es válida" :pattern="urlPattern" />
														</DxValidator>
													</DxTextBox>
												</div>
											</div>
											<div class="col-md-4">
												<div class="form-group">
													<label
														>Página Web:
														<a class="color-main-600 ml-1 font-weight-semibold" v-if="group.webpage" :href="group.webpage" target="_blank"
															>VISITAR <i class="icon-link"></i
														></a>
													</label>
													<DxTextBox
														class="form-control"
														:read-only="!editMode"
														:show-clear-button="true"
														:value.sync="group.webpage"
														placeholder="Url Página Web"
													>
														<DxValidator>
															<DxPatternRule message="La Url no es válida" :pattern="urlPattern" />
														</DxValidator>
													</DxTextBox>
												</div>
											</div>
											<div class="col-md-3">
												<div class="form-group">
													<label>Correo electrónico:</label>
													<DxTextBox
														class="form-control"
														:read-only="!editMode"
														:show-clear-button="true"
														:value.sync="group.email"
														placeholder="Correo electrónico"
													>
														<DxValidator>
															<DxEmailRule />
														</DxValidator>
													</DxTextBox>
												</div>
											</div>
											<div class="col-md-9">
												<div class="row">
													<div class="col-md-6">
														<div class="form-group">
															<label>Área OCDE:</label>
															<DxSelectBox
																:show-clear-button="true"
																@value-changed="ocdeChange"
																:data-source="ocdeEspecificos"
																:grouped="true"
																:search-enabled="true"
																class="form-control"
																:read-only="!editMode"
																display-expr="name"
																:value.sync="group.oecd_knowledge_subarea_id"
																placeholder="Busque y/o seleccione..."
																value-expr="id"
																ref="sbOcdeArea"
															>
																<DxValidator>
																	<DxRequiredRule />
																</DxValidator>
															</DxSelectBox>
														</div>
													</div>
													<div class="col-md-6">
														<div class="form-group">
															<label>Discipinas OCDE:</label>
															<DxTagBox
																@value-changed="ocdeDiscChange"
																:data-source="ocdeDetallado"
																:disabled="ocdeDisabled"
																:search-enabled="true"
																:show-selection-controls="true"
																:value.sync="group.oecd_discipline_ids"
																class="form-control"
																:read-only="!editMode"
																display-expr="name"
																placeholder="Busque y/o seleccione..."
																value-expr="id"
															>
																<DxValidator>
																	<DxRequiredRule />
																</DxValidator>
															</DxTagBox>
														</div>
													</div>
												</div>
											</div>
										</div>
									</fieldset>
								</div>
							</DxValidationGroup>
						</div>
						<div class="row mt-3">
							<div class="col">
								<a href="#" @click.prevent="go(0, '/unidad')" title="Volver a Unidades..." class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple"
									><b><i class="icon-arrow-left"></i></b> Volver</a
								>
							</div>
							<div class="col text-right" v-if="editMode">
								<a href="#" @click.prevent="save()" title="Guardar Unidad..." class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple"
									>Guardar <b><i class="icon-floppy-disk"></i></b
								></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<span class="font-weight-semibold">editMode:</span> {{ editMode }}
						<hr class="sep mb-0" />
						<span class="font-weight-semibold">group:</span> {{ JSON.stringify(group, null, 3) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
// https://vuejs.org/v2/guide/single-file-components.html#What-About-Separation-of-Concerns
let $ = window.jQuery,
	root = null;
import { DxButton, DxDateBox, DxFileUploader, DxSelectBox, DxSwitch, DxTagBox, DxTextArea, DxTextBox, DxValidationGroup } from "devextreme-vue";
import DxValidator, { DxRequiredRule, DxEmailRule, DxPatternRule } from "devextreme-vue/validator";
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
	created: function() {
		root = this;
		// 202106162214: 202106162214 Nuevo
		console.log("router", root.$router);
		// console.clear();
		console.log("root.$baseUrl()", root.$baseUrl());
		root.loaderElement = "#group-panel";
		root.getOcde();
		root.getCine(root.getFacultades());
		// 202105311305: Determina si se esta creando o editando
		console.log("root.$route", root.$route);
		// 202105311314: Editando
		let uId = root.$route.params.unidadId;
		if (root.$route.name === "unidad-info") {
			root.getUnit({
				id: uId,
				cb: function(result) {
					root.group = result;
					console.log("group", root.group);
					setTimeout(function() {
						root.ocdeChange({ value: root.group.oecd_knowledge_subarea_id });
						root.cineChange({ value: root.group.cine_specific_area_id });
						root.facultadChange({ value: root.group.faculty_ids });
						document.title += ` ${root.$titleCase(root.group.name)}`;
						root.mode = "edit";
						root.loaderHide();
					}, 500);
				},
			});
		} else {
			// 202105311312: Creando
			document.title += ` Nueva Estructura`;
			root.group = root.baseGroup;
			root.group.created_by = root.user_id;
			root.group.updated_by = root.user_id;
			root.mode = "add";
			root.loaderHide();
		}
	},
	mounted() {
		root.lineas = root.subtypesByType("unidad_linea_investigacion");
	},
	beforeUpdate: () => {},
	updated: () => {
		console.log(root.$sep);
		hideErrors();
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
		DxPatternRule,
		DxEmailRule,
		DxTextBox,
		DxValidationGroup,
		Header: () => import("./_header"),
	},
	data: () => ({
		files: [],
		mode: "edit",
		group: null,
		isValid: false,
		placeholder: "Busque y seleccione...",
		formRefName: "tree-view",
		now: new Date(),
		cineDetallados: {},
		ocdeDetallado: {},
		ocdeDisabled: true,
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		validationRules: {
			required: { type: "required", message: "Position is required." },
			url: {
				type: "custom",
				message: "La Url no es válida",
				validationCallback: function(e) {
					console.log("e.value", e);
					var r = /^(http|https):\/\/[^ "]+$/;
					return r.test(e.value);
				},
			},
		},
		lineas: null,
		lineasInvestigacion: null,
		proyectosCurriculares: null,
		min: new Date(2000, 0, 1),
		tbDisabled: true,
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
		baseGroup: {
			id: null,
			name: null,
			acronym: null,
			cidc_act_number: null,
			cidc_registration_date: null,
			cine_detailed_area_ids: [],
			cine_broad_area_id: null,
			cine_specific_area_id: null,
			colciencias_code: null,
			curricular_project_ids: [],
			description: null,
			email: null,
			faculty_act_number: null,
			faculty_ids: [],
			faculty_registration_date: null,
			group_state_id: 1, // Activo
			group_type_id: 3, // Grupo de Investigación
			gruplac: null,
			historical_colciencias: [],
			interinstitutional: false,
			legacy_siciud_id: null,
			mission: null,
			oecd_knowledge_area_id: null,
			oecd_knowledge_subarea_id: null,
			oecd_discipline_ids: [],
			research_focus_ids: [],
			snies_id: null,
			vision: null,
			webpage: null,
			created_by: null,
			updated_by: null,
			created_at: null,
			updated_at: null,
		},
	}),
	computed: {
		...mapState("unidad", ["documents"]),
		...mapState("unidad/oas", ["facultades"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapGetters("unidad/cine", { cEspecificos: "specific", cDetallados: "detailed" }),
		...mapState("unidad/ocde", { oEspecificos: "subareas", oDetallados: "disciplines" }),
		ocdeEspecificos() {
			var sorted = root.$objectSort(root.oEspecificos, "name");
			return new DataSource({
				group: "oecd_knowledge_area_name",
				store: {
					data: sorted,
					key: "id",
					type: "array",
				},
				map: function(groupedItem) {
					console.log("grouped");
					console.log(groupedItem);
					return groupedItem;
				},
			});
		},
		unidadTipos() {
			return root.subtypesByType("unidad_tipo");
		},
		unidadEstados() {
			return root.subtypesByType("unidad_estado");
		},
		cineEspecificos() {
			console.log("root.cEspecificos", root.cEspecificos);
			console.log("root.cDetallados", root.cDetallados);
			return new DataSource({
				group: "cine_broad_area_name",
				store: {
					data: root.cEspecificos,
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
		...mapActions("unidad", ["getUnit", "saveUnit", "setDocument", "getMembers", "updateGroupMember", "activatePeriod", "updatePeriod"]),
		...mapActions("unidad/cine", { getCine: "all" }),
		...mapActions("unidad/oas", { getFacultades: "facultades" }),
		...mapActions("unidad/ocde", { getOcde: "getAll" }),
		validateUrl(e) {
			console.log("e.value", e);
			var r = /^(http|https):\/\/[^ "]+$/;
			return r.test(e.value);
		},
		ocdeChange(e) {
			console.log(root.$sep);
			console.log("e", e);
			var items = root.oDetallados.filter((o) => o.oecd_knowledge_subarea_id === e.value);
			if (items.length > 0) {
				items = root.$objectSort(items, "name");
				root.ocdeDetallado = items;
				root.ocdeDisabled = false;
				console.log("ocdeDetallado", root.ocdeDetallado);
			} else {
				root.ocdeDisabled = true;
			}
		},
		ocdeDiscChange(e) {
			console.log(root.$sep);
			console.log("e", e);
			// var items = root.oDetallados.filter((o) => o.oecd_knowledge_subarea_id === e.value);
			// if (items.length > 0) {
			// 	items = root.$objectSort(items, "name");
			// 	root.ocdeDetallado = items;
			// 	root.ocdeDisabled = false;
			// 	console.log("ocdeDetallado", root.ocdeDetallado);
			// } else {
			// 	root.ocdeDisabled = true;
			// }
		},
		getDocument(document_type_id) {
			// console.log("state.documents", root.documents);
			// console.log(`getDocument(${document_type_id}) => group: `, root.group);
			return typeof root.group.documents !== "undefined" ? root.group.documents.find((o) => o.document_type_id == document_type_id) : null;
		},
		getLink(document_type_id) {
			var doc = root.getDocument(document_type_id);
			console.log("document", doc);
			return doc !== null ? `https://documental.portaloas.udistrital.edu.co/nuxeo/nxfile/default/${doc.id}/file:content/${doc.path}` : null;
		},
		saveDo() {
			// 202105311349: Redirecciona si se creó La estructura
			// 202109160649: Se independiza en función
			root.saveUnit({
				unidad: root.group,
				callback: function(result) {
					console.log("result", result);
					if (root.mode == "add") {
						root.loaderHide();
						root.$info(`La estructura "${result.name}" se creó exitosamente!`, function() {
							root.loaderShow(`Cargando "${result.name}"`, "#group-panel");
							setTimeout(function() {
								window.location.href = window.location.href.replace("/crear", `/${result.id}`);
							}, 1000);
							// https://support.nemedi.com/udistrital/siciud-v2/unidad/crear
							// root.$router.push(`/unidad`);
						});
					} else {
						root.loaderHide();
						root.$info(`La estructura "${result.name}" se actualizó exitosamente!`);
					}
				},
			});
		},
		save: async () => {
			console.clear();
			var result = root.$refs.basicGroup.instance.validate();
			// root.loaderHide();
			console.log("result", result);
			// root.loaderMessage = "Rekiki";
			// root.loaderShow();
			if (result.isValid) {
				console.log(root.$sep);
				console.log("VALID!");
				$("#btn-add").fadeOut();
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " unidad";
				root.loaderMessage = msg;
				root.loaderShow(msg);
				root.group.name = root.$titleCase(root.group.name);
				root.group.acronym = root.group.acronym.toUpperCase();
				root.group.cidc_act_number = root.group.cidc_act_number.toUpperCase();
				root.group.faculty_act_number = root.group.faculty_act_number.toUpperCase();
				if (root.mode == "add") root.group.created_by = root.user_id;
				if (root.mode == "edit") root.group.updated_by = root.user_id;

				// 202109160622: Inactivar grupo
				if (root.mode == "edit" && root.group.group_state_id == "2") {
					let msg = `¿Realmente desea desinstitucionalizar el ${root.group.group_type_name} "${root.group.name}"?`;
					msg += `<span class="font-weight-semibold mt-1 d-block red">Los integrantes ya no tendrán acceso al mismo.</span>`;
					root.$confirm(msg, async function(si_no) {
						console.log("result", si_no);
						if (si_no) {
							// 202109160653: Inactiva integrantes activos
							let members = await root.getMembers(root.group.id);
							console.log("members =>", members);
							if (members.length > 0) {
								let active_members = members.filter((o) => o.gm_state_id === 1);
								console.log("active_members =>", active_members);
								// 202109160748: NOTE: 'for' es requerido para un loop con instrucciones 'async'
								for (let x = 0; x < active_members.length; x++) {
									// 202109160746: Desactiva el integrante
									const member = active_members[x];
									member.gm_state_id = 2;
									member.updated_by = root.user_id;
									let updated_member = await root.updateGroupMember({ group_id: root.group.id, item: member });
									console.log(root.$sep);
									console.log("updated_member =>", updated_member);
									// Obtiene los periodos abiertos si los hay
									let periods = member.gm_periods.filter((o) => o.final_date === null);
									if (periods.length > 0) {
										// 202109160747: Cierra el periodo
										let period = periods[0];
										period.is_current = false;
										period.final_date = new Date().getFormatted();
										period.updated_by = root.user_id;
										let updated_period = await root.updatePeriod(period);
										console.log("updated_period =>", updated_period);
									}
								}
							}
							root.saveDo();
						}
					});
				} else root.saveDo();
			}
		},
		facultadChange(e) {
			// console.clear();
			console.log("value", e.value);
			console.log("facultades", root.facultades);
			if (typeof e.value !== "undefined") {
				var items = root.facultades.filter((o) => e.value.includes(o.Id));
				console.log("items", items);
				if (items.length > 0) {
					root.tbDisabled = false;
					let opts = [];
					items.forEach((padre) => {
						padre.Opciones.forEach((opt) => {
							opts.push({ PadreId: padre.Id, PadreNombre: padre.Nombre, Id: opt.Id, Nombre: opt.Nombre });
						});
						console.log(padre.Nombre + ": " + padre.Opciones.length);
						console.log("Total", opts.length);
					});
					let hijos = root.$objectSort(opts, "Nombre");
					console.log("hijos", hijos);
					root.proyectosCurriculares = new DataSource({
						group: "PadreNombre",
						store: {
							key: "Id",
							type: "array",
							data: hijos,
						},
						map: function(groupedItem) {
							console.log(groupedItem);
							return groupedItem;
						},
					});
					// 202105071020: Filtra Lineas de Investigación por Facultad
					// console.clear();
					let final = [];
					console.log("items", items);
					console.log("root.lineas", root.lineas);
					console.log("clasificador.facultad", window.clasificador.facultad);
					items.forEach((facultad_oas) => {
						let facultad_local = window.clasificador.facultad.find((o) => o.id_oas === facultad_oas.Id);
						if (typeof facultad_local !== "undefined") {
							// 202105071039: Se encontró el Id local
							root.lineas.forEach((linea) => {
								if (linea.parent_id === facultad_local.id) {
									final.push({ PadreId: linea.parent_id, PadreNombre: linea.parent_name, Id: linea.id, Nombre: linea.st_name });
								}
							});
						}
					});
					final = root.$objectSort(final, "Nombre");
					console.log("final", final);
					root.lineasInvestigacion = new DataSource({
						group: "PadreNombre",
						store: {
							key: "Id",
							type: "array",
							data: final,
						},
						map: function(groupedItem) {
							// console.log(groupedItem);
							return groupedItem;
						},
					});
				} else {
					root.tbDisabled = true;
				}
			}
		},
		cineChange(e) {
			var items = root.cDetallados.filter((o) => o.cine_specific_area_id === e.value);
			if (items.length > 0) {
				console.log(root.$sep);
				console.log(root.cEspecificos);
				var item = root.cEspecificos.filter((o) => o.id === e.value)[0];
				root.group.cine_broad_area_id = item.cine_broad_area_id;
				// root.group.cine_detailed_area_ids = [];
				items = root.$objectSort(items, "name");
				root.cineDetallados = items;
				root.tbEspecificoDisabled = false;
				// console.log("cineDetallados", root.cineDetallados);
			} else {
				root.tbEspecificoDisabled = true;
			}
		},
	},
};
</script>
