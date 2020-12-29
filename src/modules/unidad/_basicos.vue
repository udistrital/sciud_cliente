<template>
	<div class="col p-3">
		<div class="row">
			<div class="col pb-3">
				<span class="font-weight-semibold">Instrucciones:</span> Lorem ipsum dolor sit amet, consectetur adipiscing
				elit. Donec urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus lobortis
				magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia eu ullamcorper a,
				egestas porta nulla. Donec nec est nibh, rhoncus lobortis magna. Lorem ipsum dolor sit amet.
			</div>
		</div>
		<hr class="sep" />
		<DxValidationGroup ref="basicGroup">
			<div class="row">
				<div class="col-md-4">
					<div class="form-group">
						<label>Facultad(es):</label>
						<DxTagBox
							name="faculty_ids"
							id="faculty_ids"
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
							display-expr="name"
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
						<a
							v-if="group.establishment_document"
							:href="getLink(group.establishment_document)"
							target="_blank"
							class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple"
						>
							<b><i class="icon-link"></i></b> VER DOCUMENTO
						</a>
						<DxFileUploader
							v-else
							label-text=""
							upload-mode="useForm"
							accept="document/*.pdf"
							:max-file-size="4000000"
							id="establishment_document"
							select-button-text="Seleccione"
							:allowed-file-extensions="['.pdf']"
							@valueChanged="fileSelected($event)"
							@contentReady="fileReady($event)"
						>
							<DxValidator>
								<DxRequiredRule />
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
									display-expr="name"
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
								<DxSwitch :value.sync="group.interinstitutional" switched-on-text="SI" switched-off-text="NO" />
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label>Estado:</label>
								<DxSelectBox
									:data-source="unidadEstados"
									:value.sync="group.group_state_id"
									class="form-control"
									display-expr="name"
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
							name="cidcRegistrationDate"
							:value.sync="group.cidc_registration_date"
							id="cidcRegistrationDate"
							placeholder="dd/mm/yyyy"
							display-format="dd/MM/yyyy"
							:min="min"
							:max="now"
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
						<a
							v-if="group.cidc_act_document"
							:href="getLink(group.cidc_act_document)"
							target="_blank"
							class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple"
						>
							<b><i class="icon-link"></i></b> VER DOCUMENTO
						</a>
						<DxFileUploader
							v-else
							label-text=""
							upload-mode="useForm"
							accept="document/*.pdf"
							:max-file-size="4000000"
							id="cidc_act_document"
							select-button-text="Seleccione"
							:allowed-file-extensions="['.pdf']"
							@valueChanged="fileSelected($event)"
							@contentReady="fileReady($event)"
						>
							<DxValidator>
								<DxRequiredRule />
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
							:min="min"
							:max="now"
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
						<a
							v-if="group.faculty_act_document"
							:href="getLink(group.faculty_act_document)"
							target="_blank"
							class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple"
						>
							<b><i class="icon-link"></i></b> VER DOCUMENTO
						</a>
						<DxFileUploader
							v-else
							label-text=""
							upload-mode="useForm"
							accept="document/*.pdf"
							:max-file-size="4000000"
							id="faculty_act_document"
							select-button-text="Seleccione"
							:allowed-file-extensions="['.pdf']"
							@valueChanged="fileSelected($event)"
							@contentReady="fileReady($event)"
						>
							<DxValidator>
								<DxRequiredRule />
							</DxValidator>
						</DxFileUploader>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label>Misión:</label>
						<DxTextArea
							:height="60"
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
				<div class="col-md-6">
					<div class="form-group">
						<label>Visión:</label>
						<DxTextArea
							:height="60"
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
				<div class="col-md-12">
					<div class="form-group">
						<label>Descripción:</label>
						<DxTextArea
							:height="60"
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
			<div class="col text-right">
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

<script src="./_basicos.js"></script>
