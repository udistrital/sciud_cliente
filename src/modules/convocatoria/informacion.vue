<template>
	<div class="mh" v-if="item">
		<Header :item="item" />
		<div class="row">
			<div class="col">
				<div class="card">
					<div class="card-body group-detail" id="item-panel">
						<div class="row mb-3" v-if="item.id">
							<div class="col d-flex justify-content-between align-items-center">
								<div class="title">
									<i class="icon-pencil6"></i>&nbsp;&nbsp;Convocatoria <span>{{ item.call_code }}</span>
								</div>
								<div class="sub-title"><i class="icon-info"></i> Información</div>
							</div>
						</div>
						<div class="row">
							<DxValidationGroup ref="basicItem">
								<div class="col-12">
									<fieldset>
										<legend>Información Básica</legend>
										<div class="row">
											<div class="col-12">
												<div class="form-group">
													<label>Nombre:</label>
													<DxTextArea
														:height="90"
														:max-length="700"
														:show-clear-button="true"
														:read-only="!editModeConv"
														class="form-control"
														:value.sync="item.call_name"
														placeholder="Nombre de la convocatoria"
														name="name"
														id="name"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxTextArea>
												</div>
											</div>
											<div class="col-3">
												<div class="form-group">
													<label>Código:</label>
													<DxTextBox
														:show-clear-button="true"
														:read-only="!editModeConv"
														:value.sync="item.call_code"
														class="form-control"
														placeholder="Código"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxTextBox>
												</div>
											</div>
											<div class="col-3">
												<div class="form-group">
													<label>Estado:</label>
													<DxSelectBox
														:show-clear-button="true"
														:read-only="!editModeConv"
														:data-source="estados"
														:value.sync="item.call_state_id"
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
											<div class="col-3">
												<div class="form-group">
													<label>Tipo:</label>
													<DxSelectBox
														:show-clear-button="true"
														:data-source="tipos"
														:grouped="false"
														:value.sync="item.call_type_id"
														:search-enabled="false"
														placeholder="Seleccione..."
														class="form-control"
														:read-only="!editModeConv"
														display-expr="st_name"
														value-expr="id"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxSelectBox>
												</div>
											</div>
											<div class="col-3">
												<div class="form-group">
													<label>Beneficiarios:</label>
													<DxSelectBox
														:show-clear-button="true"
														:data-source="beneficiarios"
														:grouped="false"
														:value.sync="item.call_beneficiary_id"
														:search-enabled="false"
														placeholder="Seleccione..."
														class="form-control"
														:read-only="!editModeConv"
														display-expr="st_name"
														value-expr="id"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxSelectBox>
												</div>
											</div>
											<div class="col-3">
												<div class="form-group">
													<label>Monto total:</label>
													<DxNumberBox
														align="right"
														format="$ #,##0."
														:show-clear-button="true"
														:value.sync="item.call_global_budget"
														:read-only="!editModeConv"
														placeholder="Monto (en pesos)"
														class="form-control"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxNumberBox>
												</div>
											</div>
											<div class="col-3">
												<div class="form-group">
													<label>Monto máximo por postulación:</label>
													<DxNumberBox
														align="right"
														format="$ #,##0."
														:show-clear-button="true"
														:max="item.call_global_budget"
														:value.sync="item.call_max_budget_per_project"
														:read-only="!editModeConv"
														placeholder="Monto (en pesos)"
														class="form-control"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxNumberBox>
												</div>
											</div>
											<div class="col-2">
												<div class="form-group">
													<label>Fecha de apertura:</label>
													<DxDateBox
														@focus-in="date_focus_in"
														@focus-out="date_focus_out"
														class="form-control"
														:read-only="!editModeConv"
														name="call_start_date"
														@value-changed="setDate"
														:value.sync="item.call_start_date"
														id="cidcRegistrationDate"
														placeholder="dd/mm/yyyy"
														display-format="dd/MM/yyyy"
														type="date"
													>
														<!-- :min="actualDate" -->
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxDateBox>
												</div>
											</div>
											<div class="col-2">
												<div class="form-group">
													<label>Fecha de cierre:</label>
													<DxDateBox
														@focus-in="date_focus_in"
														@focus-out="date_focus_out"
														class="form-control"
														name="call_end_date"
														@value-changed="setDuration"
														:value.sync="item.call_end_date"
														id="facultyRegistrationDate"
														placeholder="dd/mm/yyyy"
														display-format="dd/MM/yyyy"
														:read-only="!editModeConv"
														:min="endDate"
														type="date"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxDateBox>
												</div>
											</div>
											<div class="col-2">
												<div class="form-group">
													<label>Duración:</label>
													<DxTextBox :read-only="true" :value.sync="duration" placeholder="Meses" class="form-control" />
												</div>
											</div>
											<div class="col-12">
												<div class="form-group">
													<label>Dirigida a:</label>
													<DxTextArea
														:read-only="!editModeConv"
														:height="120"
														:max-length="1200"
														:value.sync="item.call_directed_towards"
														placeholder="Dirigida a"
														class="form-control"
													>
														<DxValidator>
															<DxRequiredRule />
														</DxValidator>
													</DxTextArea>
												</div>
											</div>
											<div class="col-12">
												<div class="form-group">
													<label>Objetivos:</label>
													<DxTextArea
														:read-only="!editModeConv"
														:height="120"
														:max-length="1200"
														:value.sync="item.call_objective"
														placeholder="Objetivos"
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
							</DxValidationGroup>
						</div>
						<div class="row mt-3">
							<div class="col">
								<a
									href="#"
									title="Volver a Convocatorias..."
									@click.prevent="go(item.id, '/convocatoria', `Cargando Convocatorias`)"
									class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple"
									><b><i class="icon-arrow-left"></i></b> Volver</a
								>
							</div>
							<div class="col text-right" v-if="editModeConv">
								<a href="#" @click.prevent="save()" title="Guardar Convocatoria..." class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple"
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
						<span class="font-weight-semibold">editModeConv:</span> {{ editModeConv }}
						<hr class="sep mb-0" />
						<span class="font-weight-semibold">item:</span> {{ JSON.stringify(item, null, 3) }}
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
import { DxButton, DxDateBox, DxFileUploader, DxSelectBox, DxSwitch, DxTagBox, DxTextArea, DxTextBox, DxNumberBox, DxValidationGroup } from "devextreme-vue";
import DxValidator, { DxRequiredRule, DxEmailRule, DxPatternRule } from "devextreme-vue/validator";
import DataSource from "devextreme/data/data_source";
import { mapActions, mapGetters, mapState } from "vuex";
let hideErrors = () => {
	$("#panel-basicos .dx-fileuploader-files-container").hide();
	$("#panel-basicos .dx-invalid-message").hide();
	$("#panel-basicos .dx-invalid").removeClass("dx-invalid");
};

export default {
	name: "datosBasicos",
	created: async function() {
		root = this;
		// 202106162214: 202106162214 Nuevo
		console.log("router", root.$router);
		// console.clear();
		console.log("root.$baseUrl()", root.$baseUrl());
		root.loaderElement = "#item-panel";
		// root.getOcde();
		// root.getCine(root.getFacultades());
		// 202105311305: Determina si se esta creando o editando
		console.log("root.$route", root.$route);
		// 202105311314: Editando
		let id = root.$route.params.itemId;
		if (root.$route.name === "convocatoria-info") {
			root.item = await root.getItem(id);
			console.log("item", root.item);
			setTimeout(function() {
				document.title += ` ${root.$titleCase(root.item.call_code)}`;
				root.mode = "edit";
				root.loaderHide();
				root.setDuration();
			}, 500);
		} else {
			// 202105311312: Creando
			document.title += ` Nueva Convocatoria`;
			root.item = root.baseItem;
			root.item.created_by = root.user_id;
			root.item.updated_by = root.user_id;
			root.mode = "add";
			root.loaderHide();
		}
	},
	mounted() {
		// console.clear();
		root.beneficiarios = root.subtypesByType("convocatoria_beneficiario", "id");
		root.estados = root.subtypesByType("convocatoria_estado", "id");
		root.tipos = root.subtypesByType("convocatoria_tipo");
		console.log("root.estados =>", typeof root.estados);
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
		DxNumberBox,
		Header: () => import("./_header"),
	},
	data: () => ({
		files: [],
		mode: "edit",
		item: null,
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
		beneficiarios: null,
		tipos: null,
		estados: null,
		endDate: new Date(),
		duration: null,
		baseItem: {
			id: null,
			call_name: null,
			call_beneficiary_id: null,
			call_directed_towards: null,
			call_duration: null,
			call_global_budget: null,
			call_max_budget_per_project: 0,
			call_state_id: 653, // Borrador
			call_type_id: null,
			call_objective: null,
			call_start_date: new Date(),
			call_end_date: new Date(),
			active: true,
			created_by: null,
			created_at: null,
			updated_by: null,
			updated_at: null,
		},
	}),
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
	},
	methods: {
		...mapActions("convocatoria", ["getItem", "saveItem", "updateItem"]),
		setDate(e) {
			// console.clear();
			console.log(root.$sep);
			console.log("e", e);
			root.endDate = e.value;
			// root.item.call_end_date = e.value;
		},
		setDuration(e) {
			// console.clear();
			console.log(root.$sep);
			console.log("e", e);
			let d1 = root.item.call_start_date;
			let d2 = root.item.call_end_date;
			if (typeof d1 === "string") {
				let from = d1.split("-");
				let to = d2.split("-");
				console.log("d1", d1);
				console.log("d2", d2);
				d1 = new Date(from[0], from[1] - 1, from[2]);
				d2 = new Date(to[0], to[1] - 1, to[2]);
			}
			console.log("d1", d1);
			console.log("d2", d2);
			root.item.call_duration = root.$monthDiff(d1, d2).toString();
			root.duration = root.item.call_duration + " meses";
		},
		async save() {
			console.log(root.$sep);
			// console.clear();
			var result = root.$refs.basicItem.instance.validate();
			// root.loaderHide();
			console.log("result", result);
			// root.loaderMessage = "Rekiki";
			// root.loaderShow();
			if (result.isValid) {
				console.log("VALID!");
				$("#btn-add").fadeOut();
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " convocatoria";
				root.loaderMessage = msg;
				root.loaderShow(msg);
				if (root.mode == "add") root.item.created_by = root.user_id;
				if (root.mode == "edit") root.item.updated_by = root.user_id;
				let saved_item = root.mode == "add" ? await root.saveItem(root.item) : await root.updateItem(root.item);
				console.log("new_item =>", saved_item);
				// 202107140052: Redirecciona si se creó La convocatoria
				if (root.mode == "add") {
					root.loaderHide();
					root.$info(`La convocatoria se creó exitosamente!`, function() {
						root.loaderShow(`Cargando convocatoria`, "#item-panel");
						setTimeout(function() {
							window.location.href = window.location.href.replace("/crear", `/${saved_item.id}`);
						}, 1000);
					});
				} else {
					root.loaderHide();
					root.$info(`La convocatoria se actualizó exitosamente!`);
				}
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
						item: "PadreNombre",
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
					console.log("root.beneficiarios", root.beneficiarios);
					console.log("clasificador.facultad", window.clasificador.facultad);
					items.forEach((facultad_oas) => {
						let facultad_local = window.clasificador.facultad.find((o) => o.id_oas === facultad_oas.Id);
						if (typeof facultad_local !== "undefined") {
							// 202105071039: Se encontró el Id local
							root.beneficiarios.forEach((linea) => {
								if (linea.parent_id === facultad_local.id) {
									final.push({ PadreId: linea.parent_id, PadreNombre: linea.parent_name, Id: linea.id, Nombre: linea.st_name });
								}
							});
						}
					});
					final = root.$objectSort(final, "Nombre");
					console.log("final", final);
					root.lineasInvestigacion = new DataSource({
						item: "PadreNombre",
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
				root.item.cine_broad_area_id = item.cine_broad_area_id;
				// root.item.cine_detailed_area_ids = [];
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
