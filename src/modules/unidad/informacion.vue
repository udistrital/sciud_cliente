<template>
	<div class="mh" v-if="group">
		<Header :group="group" />
		<div class="row">
			<div class="col">
				<div class="card">
					<div class="card-body group-detail" id="group-panel">
						<div class="row mb-3">
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
														:read-only="!editMode"
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
								<a href="#" @click.prevent="go('/unidad')" title="Volver a Unidades..." class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple"
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
		<div class="row" v-if="isDev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						editMode: {{ editMode }}<br />
						{{ JSON.stringify(group, null, 3) }}
					</div>
					<div class="card-footer">
						<a @click.prevent="scrollTop()" class="font-weight-semibold" href="#">SCROLL!!!</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
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
		root.loaderElement = "#group-panel";
		root.getOcde();
		root.getCine(root.getFacultades());
		root.getUnit({
			id: root.$route.params.unidadId,
			cb: function(result) {
				root.group = result;
				console.log("group", root.group);
				setTimeout(function() {
					root.ocdeChange({ value: root.group.oecd_knowledge_subarea_id });
					root.cineChange({ value: root.group.cine_specific_area_id });
					root.facultadChange({ value: root.group.faculty_ids });
					document.title += ` ${root.$titleCase(root.group.name)}`;
					root.loaderHide();
				}, 500);
			},
		});
	},
	mounted() {},
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
		Header: () => import("@/components/element/header"),
	},
	data: () => ({
		files: [],
		mode: "edit",
		group: null,
		isValid: false,
		editMode: true, // Asume administrador
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
		proyectosCurriculares: null,
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
	computed: {
		...mapState("unidad", ["documents"]),
		...mapState("unidad/oas", ["facultades"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
		...mapGetters("unidad", { unidadEstados: "states", unidadTipos: "types" }),
		...mapGetters("unidad/cine", { cEspecificos: "specific", cDetallados: "detailed" }),
		...mapState("unidad/ocde", { oEspecificos: "subareas", oDetallados: "disciplines" }),
		ocdeEspecificos() {
			var sorted = this.$objectSort(this.oEspecificos, "name");
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
		lineasInvestigacion() {
			return this.subtypesByType("unidad_linea_investigacion");
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
		...mapActions("unidad", ["getUnit", "saveUnit", "setDocument"]),
		...mapActions("unidad/cine", { getCine: "all" }),
		...mapActions("unidad/oas", { getFacultades: "facultades" }),
		...mapActions("unidad/ocde", { getOcde: "getAll" }),
		validateUrl(e) {
			console.log("e.value", e);
			var r = /^(http|https):\/\/[^ "]+$/;
			return r.test(e.value);
		},
		ocdeChange(e) {
			console.log(this.$sep);
			console.log("e", e);
			var items = this.oDetallados.filter((o) => o.oecd_knowledge_subarea_id === e.value);
			if (items.length > 0) {
				items = this.$objectSort(items, "name");
				this.ocdeDetallado = items;
				this.ocdeDisabled = false;
				console.log("ocdeDetallado", this.ocdeDetallado);
			} else {
				this.ocdeDisabled = true;
			}
		},
		ocdeDiscChange(e) {
			console.log(this.$sep);
			console.log("e", e);
			// var items = this.oDetallados.filter((o) => o.oecd_knowledge_subarea_id === e.value);
			// if (items.length > 0) {
			// 	items = this.$objectSort(items, "name");
			// 	this.ocdeDetallado = items;
			// 	this.ocdeDisabled = false;
			// 	console.log("ocdeDetallado", this.ocdeDetallado);
			// } else {
			// 	this.ocdeDisabled = true;
			// }
		},
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
			var result = root.$refs.basicGroup.instance.validate();
			console.log("result", result);
			if (result.isValid) {
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
				root.saveUnit({
					unidad: root.group,
					callback: function(result) {
						console.log("result", result);
						root.loaderHide();
						root.$info(`La unidad "${result.name}" se actualizó exitosamente!`);
					},
				});
			}
		},
		facultadChange(e) {
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
					let sorted = this.$objectSort(opts, "Nombre");
					console.log("items", sorted);
					this.proyectosCurriculares = new DataSource({
						group: "PadreNombre",
						store: {
							key: "Id",
							type: "array",
							data: sorted,
						},
						map: function(groupedItem) {
							console.log(groupedItem);
							return groupedItem;
						},
					});
					// console.log("proyectos", this.proyectos);
				} else {
					this.tbProyectoDisabled = true;
				}
			}
		},
		cineChange(e) {
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
