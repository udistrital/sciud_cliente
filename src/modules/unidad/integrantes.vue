<template>
	<div v-if="group">
		<Header :group="group" />
		<div class="row">
			<div class="col">
				<div class="card slide" id="panel-integrantes">
					<div class="card-body group-detail mh">
						<div class="row mb-3">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-end">
									<div class="title"><i class="icon-books"></i> {{ $titleCase(group.name) }}</div>
									<div class="sub-title"><i class="icon-users"></i> Integrantes</div>
								</div>
							</div>
						</div>
						<div class="row slide" id="panel-integrantes-data" v-if="editMode">
							<div class="col">
								<div class="card">
									<div class="card-header main">Agregar</div>
									<div class="card-body mb-0 pb-0 pt-3">
										<DxValidationGroup ref="vGroup">
											<div v-if="anchoVista==12" class="alert alert-success col-md-12 mt-3" role="alert">
												<div class="sub-title"><i class="icon-info"></i> Información: </div> Para poder diligenciar estos campos, ingrese el número de documento del nuevo integrante sin puntos o comas, previamente registrado en la OAS y SICIUD V2, luego presione el icono de la lupa que esta al costado derecho del campo de documento.
											</div>
											<div class="row">
												<div :class="'col-md-'+anchoVista">
													<div class="form-group">
														<label>Documento de identidad:</label>
														<DxNumberBox
															ref="nbIdNum"
															class="form-control"
															:show-clear-button="true"
															:value.sync="researcher.identification_number"
															placeholder="Documento"
														>
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
															<DxNumberBoxButton :options="searchButton" name="search" location="after" />
														</DxNumberBox>
													</div>
												</div>
												<!-- <div class="col-md-2">
													<div class="form-group">
														<label>Rol:</label>
														<DxSelectBox
															:show-clear-button="true"
															:grouped="false"
															:data-source="groupRoles"
															:value.sync="group_member.role_id"
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
												</div> -->

												<div class="col-md-2"   v-bind:style="styleObject">
													<div class="form-group">
														<label>Rol </label>
														<DxSelectBox
															:show-clear-button="true"
															:grouped="false"
															:data-source="rol2"
															:value.sync="group_member.role_id"
															:search-enabled="false"
															placeholder="Seleccione..."
															class="form-control"
															display-expr="name"
															value-expr="id"
															:read-only="estateRol"
														>
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
														</DxSelectBox>
													</div>
												</div>
												
												<div class="col-md-3"   v-bind:style="styleObject"> <!--v-if="visible=true">-->
													<div class="form-group">
														<label>Nombre:</label>
														<DxTextBox :value.sync="group_member.name" placeholder="Nombre" class="form-control" :read-only="true" mode="text">
															<DxValidator>
																<DxRequiredRule />
															</DxValidator>
														</DxTextBox>
													</div>
												</div>
												<div class="col-md-5"   v-bind:style="styleObject"> <!--v-if="visible=true">-->
													<div class="row">
														<div class="col-md-4">
															<div class="form-group">
																<label>Investigador ID:</label>
																<DxTextBox :value.sync="researcher.id" placeholder="Investigador ID" class="form-control" :read-only="true" />
															</div>
														</div>
														<div class="col-md-3"   v-bind:style="styleObject"> <!--v-if="visible=true">-->
															<div class="form-group">
																<label>OAS ID:</label>
																<DxTextBox :value.sync="researcher.oas_researcher_id" placeholder="OAS ID" class="form-control" :read-only="true">
																	<DxValidator>
																		<DxRequiredRule />
																	</DxValidator>
																</DxTextBox>
															</div>
														</div>
														<div class="col-md-2"   > <!--v-if="visible=true">-->
															<div class="form-group">
																<label>Activo:</label>
																<DxSwitch
																	ref="chkActiveRef"
																	:value.sync="group_member.active"
																	:read-only="!editMode"
																	switched-on-text="SI"
																	switched-off-text="NO"
																	@valueChanged="activeChanged"
																/>
															</div>
														</div>
														<div class="col-md-3"   > <!--v-if="visible=true">-->
															<div class="form-group">
																<label>CVLAC:</label>
																<DxTextBox :value.sync="researcher.cvlac" placeholder="CVLAC" class="form-control" />
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-3"   v-bind:style="styleObject"> <!--v-if="visible=true">-->
													<div class="row">
														<div class="col">
															<div class="form-group">
																<label>ORCID ID:</label>
																<DxTextBox :value.sync="researcher.orcid_id" placeholder="ORCID ID" class="form-control" :read-only="false" mode="text" />
															</div>
														</div>
														<div class="col">
															<div class="form-group">
																<label>Firma Científica:</label>
																<DxTextBox :value.sync="researcher.scientific_signature" placeholder="Firma Científica" class="form-control" mode="text" >
																<DxNumberBoxButton :options="questionbutton" name="question" location="after" />
																</DxTextBox>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-3"   v-bind:style="styleObject"> <!--v-if="visible=true">-->
													<div class="row">
														<div class="col">
															<div class="form-group">
																<label>Celular:</label>
																<DxTextBox
																	:value.sync="researcher.mobile_number_one"
																	placeholder="Celular 1"
																	class="form-control"
																	mask="(000) 000-0000"
																	mode="text"
																/>
															</div>
														</div>
														<!-- <div class="col-md-3">
															<div class="form-group">
																<label>Celular 2:</label>
																<DxTextBox
																	:value.sync="researcher.mobile_number_two"
																	placeholder="Celular 2"
																	class="form-control"
																	mask="(000) 000-0000"
																	mode="text"
																/>
															</div>
														</div> -->
														<div class="col">
															<div class="form-group">
																<label>Teléfono:</label>
																<DxTextBox
																	:value.sync="researcher.phone_number_one"
																	placeholder="Teléfono 1"
																	class="form-control"
																	mask="000-0000"
																	mode="text"
																/>
															</div>
														</div>
														<!-- <div class="col-md-3">
															<div class="form-group">
																<label>Teléfono 2:</label>
																<DxTextBox
																	:value.sync="researcher.phone_number_two"
																	placeholder="Teléfono 2"
																	class="form-control"
																	mask="000-0000"
																	mode="text"
																/>
															</div>
														</div> -->
													</div>
												</div>
												<div class="col-md-6"   v-bind:style="styleObject"> <!--v-if="visible=true">-->
													<div class="row">
														<div class="col-md-5">
															<div class="form-group">
																<label>Dirección:</label>
																<DxTextBox
																	:value.sync="researcher.address"
																	:show-clear-button="true"
																	placeholder="Dirección"
																	class="form-control"
																	mode="text"
																/>
															</div>
														</div>
														<div class="col-md-7">
															<div class="row">
																<div class="col">
																	<div class="form-group">
																		<label>Fecha inicio periodo:</label>
																		<DxDateBox
																			@focus-in="date_focus_in"
																			@focus-out="date_focus_out"
																			:max="now"
																			type="date"
																			class="form-control"
																			:show-clear-button="false"
																			:value.sync="gm_period.initial_date"
																			placeholder="DD/MM/YYYY"
																			display-format="dd/MM/yyyy"
																		>
																			<DxValidator>
																				<DxRequiredRule />
																			</DxValidator>
																		</DxDateBox>
																	</div>
																</div>
																<div class="col">
																	<div class="form-group">
																		<label>Fecha fin periodo:</label>
																		<DxDateBox
																			@focus-in="date_focus_in"
																			@focus-out="date_focus_out"
																			:max="now"
																			type="date"
																			class="form-control"
																			:show-clear-button="false"
																			:value.sync="gm_period.final_date"
																			placeholder="DD/MM/YYYY"
																			display-format="dd/MM/yyyy"
																		/>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												
											</div>
										</DxValidationGroup>
										<div class="row" id="periods">
											<div class="col mb-3">
												<fieldset>
													<legend>Periodos</legend>
													<DxDataGrid
														class="main"
														width="100%"
														:show-borders="false"
														:dataSource="dsPeriods"
														:remote-operations="false"
														:hover-state-enabled="true"
														:row-alternation-enabled="true"
														:allow-column-reordering="false"
														no-data-text="No hay periodos registrados"
													>
														<DxExport :enabled="false" />
														<DxColumnChooser :enabled="false" mode="dragAndDrop" />
														<DxSorting mode="single" /><!-- single, multiple, none" -->
														<DxPaging :page-size="dgPageSize" />
														<DxFilterRow :visible="false" />
														<DxLoadPanel :enabled="false" />
														<DxGroupPanel :visible="false" :allow-column-dragging="true" />
														<DxGrouping :auto-expand-all="false" />
														<!-- <DxSummary>
															<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} integrantes" />
														</DxSummary> -->
														<DxPager
															:visible="false"
															:show-info="true"
															:show-page-size-selector="true"
															:show-navigation-buttons="true"
															:allowed-page-sizes="dgPageSizes"
															info-text="{2} periodos (página {0} de {1})"
														/>
														<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
														<DxColumn
															:allow-grouping="false"
															:allow-filtering="false"
															:allow-search="false"
															:allow-sorting="true"
															:width="120"
															alignment="center"
															caption="Periodo ID"
															data-field="id"
															data-type="string"
														/>
														<DxColumn
															:allow-grouping="false"
															:allow-filtering="false"
															:allow-sorting="true"
															:customize-text="nullText"
															caption="Fecha inicio"
															data-field="initial_date"
															alignment="center"
															data-type="date"
															format="dd/MM/yyyy"
														/>
														<DxColumn
															:allow-grouping="false"
															:allow-filtering="false"
															:allow-sorting="true"
															:customize-text="nullText"
															caption="Fecha fin"
															data-field="final_date"
															alignment="center"
															data-type="date"
															format="dd/MM/yyyy"
														/>
														<DxColumn
															:allow-filtering="true"
															:allow-sorting="true"
															:allow-grouping="false"
															alignment="center"
															caption="Rol"
															data-field="role_name"
															:customize-text="nullText"
															data-type="string"
														/>
														<DxColumn
															:allow-filtering="true"
															:allow-sorting="true"
															:allow-grouping="false"
															alignment="center"
															caption="Periodo actual"
															data-field="is_current"
															:customize-text="yesNo"
															data-type="bool"
														/>
														<!--
														<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editMode" />
														<template #tpl="{ data }">
															<span class="cmds" v-if="cmdVisible(data.data)">
																<a title="Editar usuario..." class="cmd-item color-main-600" @click.prevent="userEdit(data.data)" href="#">
																	<i class="icon-database-edit"></i>
																</a>
															</span>
														</template>
														-->
													</DxDataGrid>
												</fieldset>
											</div>
										</div>
									</div>
									<div class="card-footer">
										<div class="row">
											<div class="col">
												<DxButton @click="userCancel" class="nb">
													<template #default>
														<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
															<b><i class="icon-database-remove"></i></b> CANCELAR
														</span>
													</template>
												</DxButton>
											</div>
											<div class="col text-right">
												<DxButton @click="userSave" class="nb"    v-bind:style="styleObject">
													<template #default>
														<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
															GUARDAR <b><i class="icon-database-add"></i></b>
														</span>
													</template>
												</DxButton>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row" id="panel-integrantes-grid">
							<div class="col">
								<div class="row">
									<div class="col">
										<a
											href="#"
											v-if="editMode"
											@click.prevent="userAdd"
											class="btn btn-sm btn-main btn-labeled btn-labeled-right btn-sm legitRipple ml-3 slide"
											id="btn-add"
										>
											ASOCIAR INTEGRANTE <b><i class="icon-user-plus"></i></b>
										</a>
										<DxDataGrid
											class="main"
											width="100%"
											:dataSource="dsMembers"
											@initialized="gridInit"
											:allow-column-reordering="false"
											:remote-operations="false"
											:hover-state-enabled="true"
											:row-alternation-enabled="true"
											:show-borders="false"
										>
											<DxExport :enabled="false" />
											<DxColumnChooser :enabled="false" mode="dragAndDrop" />
											<DxSorting mode="multiple" /><!-- single, multiple, none" -->
											<DxPaging :page-size="dgPageSize" />
											<DxFilterRow :visible="false" />
											<DxLoadPanel :enabled="false" />
											<DxGroupPanel :visible="true" :allow-column-dragging="true" />
											<DxGrouping :auto-expand-all="false" />
											<DxSummary>
												<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} integrantes" />
											</DxSummary>
											<DxPager
												:visible="true"
												:show-info="true"
												:show-page-size-selector="true"
												:show-navigation-buttons="true"
												:allowed-page-sizes="dgPageSizes"
												info-text="{2} Histórico (página {0} de {1})"
											/>
											<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
											<DxColumn
												:allow-grouping="false"
												:allow-filtering="false"
												:allow-search="false"
												:allow-sorting="true"
												:width="120"
												alignment="center"
												caption="ID"
												data-field="id"
												data-type="string"
											/>
											<DxColumn
												:allow-grouping="false"
												:allow-filtering="false"
												:allow-sorting="true"
												:customize-text="nullText"
												:width="120"
												alignment="center"
												caption="OAS ID"
												data-field="oas_details.TerceroId.Id"
												data-type="string"
											/>
											<!-- :customize-text="$formatDocument" -->
											<DxColumn
												:allow-filtering="true"
												:allow-sorting="true"
												:allow-grouping="false"
												alignment="center"
												caption="Documento"
												data-field="researcher.identification_number"
												:customize-text="$formatDocument"
												data-type="string"
											/>
											<DxColumn
												:allow-filtering="true"
												:allow-sorting="true"
												:allow-grouping="false"
												:customize-text="nullText"
												alignment="center"
												caption="Nombre"
												data-field="oas_details.TerceroId.NombreCompleto"
												data-type="string"
											/>
											<DxColumn
												:group-index="1"
												:allow-filtering="false"
												:allow-sorting="true"
												:customize-text="nullText"
												alignment="center"
												caption="Rol"
												data-field="role_name"
												data-type="string"
											/>
											<DxColumn
												:width="100"
												:group-index="0"
												caption="Activo"
												data-type="number"
												alignment="center"
												:visible="true"
												data-field="gm_state_id"
												:customize-text="gmState"
											/>
											<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editMode" />
											<template #tpl="{ data }">
												<span class="cmds" v-if="cmdVisible(data.data)">
												<!-- <span class="cmds" v-if="cmdVisible(data.data)"> -->
													<a title="Editar usuario..." class="cmd-item color-main-600" @click.prevent="userEdit(data.data)" href="#">
														<i class="icon-database-edit"></i>
													</a>
													<!-- <a
														v-if="data.data.gm_state_id === 1"
														title="Desactivar usuario..."
														class="cmd-item color-main-600 mr-2"
														@click.prevent="userActive(data.data, false)"
														href="#"
													>
														<i class="icon-database-remove"></i>
													</a>
													<a v-else title="Activar usuario..." class="cmd-item color-main-600 mr-2" @click.prevent="userActive(data.data, true)" href="#">
														<i class="icon-database-check"></i>
													</a> -->
												</span>
												<span class="cmds" v-else>
													<a title="Editar usuario..." class="cmd-item color-main-600" @click.prevent="unactive(data.data)" href="#">
														<i class="icon-user-cancel2"></i>
													</a>
												</span>
											</template>
										</DxDataGrid>
									</div>
								</div>
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
						<hr class="sep" />
						<span class="font-weight-semibold">app_user:</span> {{ JSON.stringify(app_user, null, 3) }}
						<hr class="sep" />
						<span class="font-weight-semibold">group_member:</span> {{ JSON.stringify(group_member, null, 3) }}
						<hr class="sep" />
						<span class="font-weight-semibold">researcher:</span> {{ JSON.stringify(researcher, null, 3) }}
						<hr class="sep" />
						<span class="font-weight-semibold">gm_period:</span> {{ JSON.stringify(gm_period, null, 3) }}
						<hr class="sep" />
						<span class="font-weight-semibold">group:</span> {{ JSON.stringify(group, null, 3) }}
						<hr class="sep" />
						<span class="font-weight-semibold">user:</span> {{ JSON.stringify(user, null, 3) }}
						user
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
import {
	DxColumn,
	DxColumnChooser,
	DxExport,
	DxDataGrid,
	DxFilterRow,
	DxGrouping,
	DxGroupItem,
	DxGroupPanel,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { DxButton, DxSelectBox, DxSwitch, DxTextBox, DxNumberBox, DxValidationGroup, DxDateBox } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import CustomStore from "devextreme/data/custom_store";
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
		root.panelMain = "#panel-integrantes";
		root.panelData = root.panelMain + "-data";
		root.panelGrid = root.panelMain + "-grid";
		root.loaderElement = root.panelMain;
		root.loaderMessage = "Cargando Información<br>de Integrantes";
		
		let uId = root.$route.params.unidadId;
		root.getUnit({
			id: uId,
			cb: function(result) {
				root.group = result;
				document.title += ` ${root.$titleCase(root.group.name)}`;
				root.loadMembers();
				root.listChange();
			},
		});
	},
	mounted() {
		
		
		console.log(this.$sep);
		setTimeout(function() {
			root.nbId = typeof root.$refs.nbIdNum !== "undefined" ? root.$refs.nbIdNum.instance : null;
			root.chkActive = typeof root.$refs.chkActiveRef !== "undefined" ? root.$refs.chkActiveRef.instance : null;
			root.nbIdBtn = root.nbId !== null ? root.nbId.getButton("search") : null;
			root.group_member_bk = root.$clone(root.group_member);
			root.researcher_bk = root.$clone(root.researcher);
			root.gm_period_bk = root.$clone(root.gm_period);
			console.log("root.nbIdBtn", root.nbIdBtn);
			console.log("root.chkActive", root.chkActive);
		}, 1000);
		console.warn("lectura rol2: ",root.rol2.data);
	},
	beforeUpdate: () => {},
	updated: () => {
		console.log(root.$sep);
		hideErrors();
	},
	components: {
		DxButton,
		DxColumn,
		DxColumnChooser,
		DxDateBox,
		DxDataGrid,
		DxExport,
		DxFilterRow,
		DxGrouping,
		DxGroupItem,
		DxGroupPanel,
		DxLoadPanel,
		DxNumberBox,
		DxNumberBoxButton,
		DxPager,
		DxPaging,
		DxRequiredRule,
		DxSearchPanel,
		DxSelectBox,
		DxSorting,
		DxSummary,
		DxSwitch,
		DxTextBox,
		DxValidationGroup,
		DxValidator,
		Header: () => import("./_header"),
	},
	data: () => ({
		roluser:0,
		styleObject:{visibility:'hidden'},
		anchoVista:12,
		estateRol:false,
		rol2:[],
		app_user: null,
		chkActive: null,
		periods: null,
		accept: "*.",
		cineDetallados: {},
		files: [],
		nbId: null,
		fromCancel: false,
		nbIdBtn: null,
		formRefName: "tree-view",
		group: null,
		isValid: false,
		loading: true,
		min: new Date(2000, 0, 1),
		mode: null,
		multiple: false,
		now: new Date(),
		ocdeDetallado: {},
		ocdeDisabled: true,
		panelData: null,
		panelGrid: null,
		panelMain: null,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
		placeholder: "Busque y seleccione...",
		proyectos: {},
		tbEspecificoDisabled: true,
		tbProyectoDisabled: true,
		uploadMode: "instantly",
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		dsMembers: new DataSource({
			store: new CustomStore({
				key: "id",
				loadMode: "processed", // "raw",
				load: (loadOptions) => {
					console.log(root.$sep);
					console.log("dsMembers loadOptions =>", loadOptions);
					console.log("root.groupResearchers =>", root.groupResearchers);
					return root.groupResearchers;
				},
				onLoaded: function(result) {
					// root.loading = false;
					console.log("onLoaded");
				},
			}),
		}),
		dsPeriods: new DataSource({
			store: new CustomStore({
				key: "id",
				loadMode: "processed", // "raw",
				load: (loadOptions) => {
					console.log(root.$sep);
					console.log("dsMembers loadOptions =>", loadOptions);
					console.log("root.periods =>", root.periods);
					return root.periods;
				},
				onLoaded: function(result) {
					// root.loading = false;
					console.log("onLoaded");
				},
			}),
		}),
		searchButton: {
			icon: "find",
			onClick: async () => {
				// console.clear();
				let id = root.researcher.identification_number;
				console.log("Documento", id);
				if (id !== null && id.toString().length > 0) {
					root.loaderShow("Buscando usuario");

					// 202103171618: Verifica que no exista en el grupo actual ->  80192128 1000136995
					let current_user = null;
					root.groupResearchers.forEach((item) => {
						// console.log(`${item.researcher.identification_number} === ${id}`);
						if (item.researcher.identification_number.toString() === id.toString()) {
							current_user = item;
							return;
						}
					});
					if (current_user !== null) {
						console.log(root.$sep);
						console.log("current_user =>", current_user);
						let rol = current_user.role_name;
						let det = current_user.oas_details;
						let nombre = typeof det !== "undefined" ? `"${det.TerceroId.NombreCompleto}"` : `con el documento "${id}"`;
						root.$info(`El usuario ${nombre} ya se<br>encuentra registrado como "${rol}" en el grupo.`);
						root.loaderHide();
						root.styleObject={visibility:'hidden'};
						root.anchoVista=12;
						return false;
					}

					// 202103171645: Verifica que el usuario exista en la OAS
					let oas_user = await root.getOasUser({ doc: id });
					if (!("TerceroId" in oas_user)) {
						let m = `El documento "${id}" no se encuentra registrado<br>en el `;
						m += `<a href="https://contratistas.portaloas.udistrital.edu.co" title="Visite el Sistema de Autenticación Única..." class="link" target="_blank"`;
						m += `>Sistema de Autenticación Única</a> de la Universidad Distrital`;
						root.$info(m);
						root.styleObject={visibility:'hidden'};
						root.anchoVista=12;
						root.loaderHide();
						return false;
					}
					console.log(root.$sep);
					console.log("await root.getOasUser =>", oas_user);
					let t = oas_user.TerceroId;
					root.group_member.name = t.NombreCompleto;
					root.researcher.oas_researcher_id = t.Id.toString();

					// 202103171630: Obtiene el investigador
					console.log(root.$sep);
					let researcher = await root.getResearcher(id);
					console.log("await root.getResearcher =>", researcher);
					if (researcher.length > 0) {
						researcher[0].id = researcher[0].id.toString();
						researcher[0].identification_number = parseInt(researcher[0].identification_number);
						root.researcher = researcher[0];
						root.researcher.oas_researcher_id = t.Id.toString();
						root.group_member.researcher_id = root.researcher.id;
					} else {
						console.log("");
					}
					root.anchoVista=2;
					root.styleObject={visibility:'visible'},
					root.loaderHide();
				}
			},
		},

		questionbutton: {
			icon: "info",
			onClick: async () => {
				root.$info("La firma científica es la utilizada por el investigador para que se identifique y se distinga <br /> de otros autores, incluye tanto el nombre como la institución en la que trabaja.")
			},
		},
		
		group_member_bk1: null,
		group_member_bk: null,
		group_member: {
			id: null,
			role_id: null,
			role_id_db: null,
			gm_state_id: 1,
			researcher_id: null,
			name: null,
			active: true,
			created_by: null,
			updated_by: null,
		},
		researcher_bk1: null,
		researcher_bk: null,
		researcher: {
			id: null,
			oas_researcher_id: null,
			identification_number: null,
			orcid_id: null,
			scientific_signature: null,
			mobile_number_one: null,
			mobile_number_two: null,
			phone_number_one: null,
			phone_number_two: null,
			address: null,
		},
		gm_period_bk1: null,
		gm_period_bk: null,
		gm_period: {
			id: null,
			initial_date: new Date(),
			final_date: null,
			role_id: null,
			role_id_db: null,
			is_current: true,
			active: true,
			group_member_id: null,
			created_by: null,
			updated_by: null,
			created_at: new Date(),
			updated_at: new Date(),
		},
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
		...mapGetters("auth/usuario", ["groupRoles"]),
		...mapGetters("core/tipo", ["subtypesByType"]),
	},
	methods: {
		...mapActions("unidad", [
			"addGroupMember",
			"addPeriod",
			"getPeriods",
			"getResearcher",
			"getResearchers",
			"getUnit",
			"saveResearcher",
			"updateGroupMember",
			"activatePeriod",
			"updatePeriod",
			"updateResearcher",
		]),
		...mapActions("auth/usuario", ["getUser", "saveUserAsync", "getOasUsers", "getOasUser"]),
		...mapActions("unidad/producto/universalSentUpAct", {univerdalGet: "univerdalGet", univerdalID: "univerdalID" }),


		async listChange() {
			let arg={url:''},arg2={url:''}
			let grupo=[], ambos=[];
			console.warn("grupo = ", root.group);
			arg.url='role?filter=[["active","=","true","AND","role_type_id","=","1055"]]';//para grupo y semillero
			if(root.group.group_type_id==3) arg2.url='role?filter=[["active","=","true","AND","role_type_id","=","1057"]]';//para grupo y semillero
			else arg2.url='role?filter=[["active","=","true","AND","role_type_id","=","1056"]]';//semillero 
			grupo=await root.univerdalGet(arg2);
			ambos=await root.univerdalGet(arg);
			root.rol2=ambos.concat(grupo);
			// if(root.rol2.length > 0) root.$info("Seleccione Producto Específico");
			console.warn("aldata2 data = ", root.rol2);
		},


// let arg={url:''};
// 		arg.url='role';
// 		root.rol2=root.univerdalID(arg);

		
		activeChanged(e) {
			const previousValue = e.previousValue;
			const is_active = e.value;
			console.log("previousValue =>", previousValue);
			console.log("newValue =>", is_active);
			root.group_member.gm_state_id = is_active ? 1 : 2;
			console.log("root.group_member", root.group_member);
			// Event handling commands go here
		},
		cmdVisible(data) {
			// console.log("cmdVisible", e);
			return typeof data.oas_details !== "undefined" && typeof data.oas_details.Id !== "undefined";
		},
		gridInit(e) {
			console.log("e", e);
			root.grid = e.component;
			setTimeout(function() {
				let tb = $(root.panelGrid + " .dx-toolbar-after");
				let btn = $(root.panelGrid + " #btn-add");
				console.log("tb", tb);
				console.log("btn", btn);
				tb.append(btn);
				btn.fadeIn();
			}, 1000);
			root.grid.on({
				contentReady: (e) => {
					console.log("e", e);
					console.log("contentReady loading?", root.loading);
					if (!root.loading) {
						root.loading = true;
						root.loaderShow();
						// root.loaderShow("Guardando usuario", "#panel-integrantes-data .card");
						// root.loaderShow("Cargando integrantes", "#panel-integrantes-data .card");
						let items = [];
						root.grid
							.getVisibleRows()
							.filter((o) => o.rowType === "data")
							.forEach((row) => {
								if (!("oas_details" in row.data)) items.push(row.data);
							});
						if (root.grid.getVisibleRows().length > 0) root.grid.expandRow(root.grid.getKeyByRowIndex(0));
						if (items.length > 0) {
							root.getOasUsers({
								users: items,
								field: "researcher.identification_number",
								cb: function(result) {
									console.log(root._sep);
									console.log("RESULTADOS", result);
									root.grid.getVisibleRows().forEach((row) => {
										console.log("row", row);
										if (row.rowType === "data") {
											var filtered = result.filter((o) => o.id === row.data.id);
											if (filtered.length > 0) {
												Object.assign(row.data, filtered[0]);
												root.grid.repaintRows([row.rowIndex]);
											}
										}
									});
									root.loading = false;
									root.loaderHide();
									root.loadEnd();
								},
							});
						} else {
							root.loading = false;
							root.loaderHide();
							root.loadEnd();
						}
					}
				},
			});
		},
		loadMembers(loaderHide = true, cb) {
			// root.loaderShow("Cargando Integrantes", root.panelMain);
			if (root.grid !== null && typeof root.grid !== "undefined") {
				root.grid.clearFilter();
				root.grid.collapseAll(0);
				root.grid.pageIndex(0);
			}
			if (!loaderHide) root.loading = true;
			root.getResearchers({
				id: root.group.id,
				cb: function(result) {
					// console.clear();
					// root.loading = false;
					console.log(root.$sep);
					console.log("getResearchers =>", result);
					root.groupResearchers = result.researchers;
					console.log("root.groupResearchers =>", root.groupResearchers);
					// 202106170030: Solo activos para roles diferentes a admin y gestor
					if (root.user_role_id > 2) {
						root.groupResearchers = root.groupResearchers.filter((o) => o.gm_state_id === 1);
					}
					if (loaderHide) {
						root.dsMembers.reload();
						root.loading = false;
						root.loaderHide();
					}
					if (root.$isFunction(cb)) cb();
				},
			});
		},
		userEditEnd() {
			// 8345	4523	1.013.622.639	Moreno Susatama Carlos Arturo	T:2 / A:1 / I:1	1	1	--	Administrador	SI	
			// let userdatagrid=null, usersystem=null;

			// usersystem=root.user.local.id;
			// userdatagrid=root.group_member;


			// console.warn("usersystem", usersystem);
			// console.warn("userdatagrid", userdatagrid);
			// app_user
			
			$(root.panelData + " #periods").show();
			root.dsPeriods.reload();
			$(root.panelData + " #periods").show();
			$(root.panelData + " .card-header.main").html("Editando integrante");
			$(root.panelGrid).fadeOut(function() {
				$(root.panelData).fadeIn();
				// 202107010657: Copias para verificar cambios
				root.group_member_bk1 = root.$clone(root.group_member);
				root.researcher_bk1 = root.$clone(root.researcher);
				root.gm_period_bk1 = root.$clone(root.gm_period);
			});
		},

		unactive5(d) {
			console.clear();
			root.mode == "edit";
			let data = root.$clone(d);
			console.warn("data unable", data);
		},
		unactive(d) {
			console.clear();
			root.mode == "edit";
			let data = root.$clone(d);
			console.log("data", data);

			console.warn("root.group_member", root.group_member);
			console.warn("root.researcher", root.researcher);
			// root.$refs.vGroup.instance.reset();
			root.nbIdBtn = root.nbId.getButton("search");
			console.log("root.nbIdBtn", root.nbIdBtn);
			root.nbId.option("readOnly", true);
			root.nbIdBtn.option("visible", false);
			root.chkActive.option("readOnly", false);
			root.group_member.id = data.id;
			root.group_member.role_id = data.role_id;
			root.group_member.active = data.gm_state_id === 1;
			root.group_member.researcher_id = data.researcher.id.toString();
			//root.group_member.name = data.oas_details.TerceroId.NombreCompleto;
			data.researcher.id = data.researcher.id.toString();
			data.researcher.identification_number = parseInt(data.researcher.identification_number);
			root.researcher = data.researcher;
			if (typeof data.oas_details !== "undefined") root.researcher.oas_researcher_id = data.oas_details.TerceroId.Id.toString();
			console.log("root.group_member", root.group_member);
			// 202107010440: Carga los periodos si no lo ha hecho ya
			root.getPeriods({
				group_member_id: data.id,
				cb: function(periods) {
					root.periods = periods.data;
					console.log("root.periods =>", root.periods);
					root.group_member.gm_periods = periods.data;
					let p = root.periods.filter((o) => o.is_current);
					if (p.length > 0) {
						root.gm_period = root.$clone(p[0]);
						root.gm_period_bk1 = root.$clone(p[0]);
					} else {
						root.gm_period = root.$clone(root.gm_period_bk);
						root.gm_period_bk = root.$clone(root.gm_period_bk);
					}
					console.log("AFTER root.group_member", root.group_member);
					root.userEditEnd();
				},
			});
		},

		async userEdit(d) {
			

			console.clear();
			root.mode == "edit";
			let data = root.$clone(d);
			console.log("data", data);
			root.estateRol=false;
			root.roluser= await root.univerdalID({url:'role/'+data.role_id});
			console.warn("datos del rol: ",root.roluser);

			if(!root.es_admin) if(root.roluser.parent_id==1 || root.roluser.parent_id==5 || root.roluser.parent_id==7) root.estateRol=true;
			else console.warn("Este usuario es administrador");
			// if(root.roluser.parent_id==data.role_id) root.estateRol=true;//root.estateRol=true;


			// root.$refs.vGroup.instance.reset();
			root.nbIdBtn = root.nbId.getButton("search");
			console.log("root.nbIdBtn", root.nbIdBtn);
			root.nbId.option("readOnly", true);
			root.nbIdBtn.option("visible", false);
			root.chkActive.option("readOnly", false);
			root.group_member.id = data.id;
			root.group_member.role_id = data.role_id;
			root.group_member.active = data.gm_state_id === 1;
			root.group_member.researcher_id = data.researcher.id.toString();
			root.group_member.name = data.oas_details.TerceroId.NombreCompleto;
			data.researcher.id = data.researcher.id.toString();
			data.researcher.identification_number = parseInt(data.researcher.identification_number);
			root.researcher = data.researcher;
			if (typeof data.oas_details !== "undefined") root.researcher.oas_researcher_id = data.oas_details.TerceroId.Id.toString();
			console.log("root.group_member", root.group_member);
			// 202107010440: Carga los periodos si no lo ha hecho ya
			root.getPeriods({
				group_member_id: data.id,
				cb: function(periods) {
					root.periods = periods.data;
					console.log("root.periods =>", root.periods);
					root.group_member.gm_periods = periods.data;
					let p = root.periods.filter((o) => o.is_current);
					if (p.length > 0) {
						root.gm_period = root.$clone(p[0]);
						root.gm_period_bk1 = root.$clone(p[0]);
					} else {
						root.gm_period = root.$clone(root.gm_period_bk);
						root.gm_period_bk = root.$clone(root.gm_period_bk);
					}
					console.log("AFTER root.group_member", root.group_member);
					root.userEditEnd();
				},
			});
			

			root.anchoVista=2;
			root.styleObject={visibility:'visible'};
		},
		userAdd() {
			root.mode == "add";
			root.nbId.option("readOnly", false);
			root.nbIdBtn = root.nbId.getButton("search");
			root.nbIdBtn.option("visible", true);
			root.chkActive.option("readOnly", true);
			$(root.panelData + " #periods").hide();
			$(root.panelData + " .card-header.main").html("Nuevo integrante");
			root.gm_state = root.$clone(root.gm_state_bk);
			$(root.panelGrid).fadeOut(function() {
				$(root.panelData).fadeIn();
			});
		},
		async disablePeriods(periods) {
			console.log(root.$sep);
			console.log("disablePeriods =>", periods);
			let results = [];
			// 202107032207: Actualiza en for
			for (let x = 0; x < periods.length; x++) {
				let period = periods[x];
				period.is_current = false;
				// period.active = false;
				period.final_date = new Date().getFormatted();
				period.updated_by = root.user_id;
				let p = await root.updatePeriod(period);
				console.log("UPDATED period =>", p);
				results.push(p);
			}
			return results;
		},
		async userSave() {
			console.clear();
			console.log(root.$sep);
			console.log("userSave() START");
			var result = this.$refs.vGroup.instance.validate();
			console.log("result", result);
			if (result.isValid) {
				root.loaderShow("Guardando usuario", "#panel-integrantes-data .card");

				// 202109160428: Verifica que el usuario exista localmente
				let usrs = await root.getUser(root.researcher.identification_number);
				// El usuario no existe, lo crea con rol 'Integrante'
				if (usrs.length <= 0) {
					let to_send = {
						identification_number: root.researcher.identification_number.toString(),
						oas_user_id: root.researcher.oas_researcher_id,
						user_role_id: root.get_role_id("integrante"),
						faculties_ids: [],
						created_by: root.user_id,
					};
					console.log("to_send =>", to_send);
					root.app_user = await root.saveUserAsync(to_send);
					console.log("created =>", root.app_user);
				} else {
					root.app_user = usrs[0];
					console.log("root.app_user =>", root.app_user);
				}

				// 202106010400: Investigador
				let r = null;
				root.researcher.created_by = root.user_id;
				root.researcher.updated_by = root.user_id;
				// 202107010713: Condicional
				if (root.researcher.id === null) {
					// Nuevo
					r = await root.saveResearcher(root.researcher);
				} else {
					// Actualizando
					if (root.$isDifferent(root.researcher_bk1, root.researcher)) {
						console.log(root.$sep);
						r = await root.updateResearcher(root.researcher);
						console.log("researcher CAMBIÓ!!");
						console.log("SAVED Researcher =>", r);
					} else r = root.researcher;
				}

				// 202106010400: Integrante
				root.group_member.researcher_id = r.id;
				root.group_member.created_by = root.user_id;
				root.group_member.updated_by = root.user_id;
				let o = { group_id: root.group.id, item: root.group_member };
				console.log("root.group_member =>", o);

				// 202107010713: Si el integrante es NUEVO
				if (root.group_member.id === null) {
					console.log("group_member NUEVO!!");
					// Crea el nuevo integrante
					r = await root.addGroupMember(o);
					// 202107011429: Crea el periodo para el nuevo integrante
					let p = root.addPeriod({
						group_member_id: r.id,
						gm_period: {
							initial_date: root.gm_period.initial_date,
							final_date: null,
							role_id: root.group_member.role_id,
							is_current: true,
							active: true,
							created_by: root.user_id,
						},
					});
					console.log("CREATED period =>", p);
				} else {
					// 202107051834: El integrante ya existe
					console.log("SAVED group_member =>", r);
					// Si cambió el rol o el estado (activo o inactivo)
					if (root.group_member_bk1.role_id != root.group_member.role_id || root.group_member_bk1.gm_state_id != root.group_member.gm_state_id) {
						console.log("group_member CAMBIÓ!!");
						console.log(root.$sep);
						// Actualiza el integrante
						console.log("updateGroupMember =>", o);
						r = await root.updateGroupMember(o);
						console.log("updateGroupMember recibido =>", r);

						// 202107011429: Cierra los periodos actuales
						let periods = root.group_member.gm_periods.filter((o) => o.is_current);
						await root.disablePeriods(periods);

						// 202107011445: Crea el nuevo periodo SOLO si está marcado como activo el nuevo
						if (root.group_member.active) {
							let np = {
								group_member_id: root.group_member.id,
								gm_period: {
									initial_date: new Date().getFormatted(),
									// initial_date: root.gm_period.initial_date,
									final_date: null,
									role_id: root.group_member.role_id,
									is_current: true,
									active: true,
									created_by: root.user_id,
								},
							};
							console.log("addPeriod =>", np);
							let p = await root.addPeriod(np);
							console.log("CREATED period =>", p);
						}
					} else {
						// 202107011736: Si no cambiaron rol o estado (activo o inactivo) verifica si cambió la fecha de inicio
						if (root.gm_period_bk1.initial_date != root.gm_period.initial_date) {
							console.log("gm_period CAMBIÓ!! =>", root.gm_period);
							let p = null;
							// 202107011844: Actualiza o crea el periodo
							if (root.gm_period.id !== null) {
								root.gm_period.updated_by = root.user_id;
								p = await root.updatePeriod(root.gm_period);
								console.log("UPDATED period =>", p);
							} else {
								p = await root.addPeriod({
									group_member_id: root.group_member.id,
									gm_period: {
										initial_date: root.gm_period.initial_date,
										final_date: null,
										role_id: root.group_member.role_id,
										is_current: true,
										active: true,
										created_by: root.user_id,
									},
								});
								console.log("CREATED period =>", p);
							}
						}
					}
				}

				// 202106010429: Finaliza
				console.log("userSave() END");
				console.log(root.$sep);
				root.loadMembers(false, function() {
					root.loading = false;
					root.userCancel(true, function() {
						root.dsMembers.reload();
						if (root.grid.getVisibleRows().length > 0) root.grid.expandRow(root.grid.getKeyByRowIndex(0));
					});
				});
			}
			root.anchoVista=12;
			root.estateRol=false;//root.estateRol=false;


			root.styleObject={visibility:'hidden'};
		},
		userCancel(loaderHide = false, cb) {
			root.estateRol=false;//root.estateRol=false;
			root.fromCancel = true;
			$(root.panelData).fadeOut(function() {
				if (loaderHide) root.loaderHide();
				$(root.panelGrid).fadeIn(function() {
					root.group_member = root.$clone(root.group_member_bk);
					root.researcher = root.$clone(root.researcher_bk);
					root.gm_state = root.$clone(root.gm_state_bk);
					root.$refs.vGroup.instance.reset();
					$(root.panelData).clear();
					if (root.$isFunction(cb)) cb();
				});
			});
			root.anchoVista=12;
			root.styleObject={visibility:'hidden'};
		},
		async userActive(data, state) {
			console.clear();
			console.log("data", data);
			console.log("state", state);
			let a = state ? "activar" : "desactivar";
			let ti = data.oas_details.TerceroId;
			let mn = typeof ti !== "undefined" ? `<br>"${ti.NombreCompleto}"` : `con<br>el documento "${root.$formatDocument(data.identification_number)}"`;
			let msg = `¿Realmente desea ${a} al usuario ${mn}?`;
			this.$confirm(msg, async function(confirma) {
				console.log("confirma =>", confirma);
				if (confirma) {
					root.loaderMessage = `${state ? "Activando" : "Desactivando"} usuario`;
					root.loaderShow();
					// 202107040008: Investigador
					let researcher = data.researcher;
					researcher.active = state;
					researcher.updated_by = root.user_id;
					console.log("researcher TO SEND =>", researcher);
					let r = await root.updateResearcher(researcher);
					console.log("SAVED Researcher =>", r);

					// 202107040008: Integrante
					let group_member = data;
					group_member.active = state;
					group_member.updated_by = root.user_id;
					let gm = await root.updateGroupMember({ group_id: root.group.id, item: group_member });
					console.log("group_member desactivado =>", gm);
					// 202107010440: Carga los periodos
					root.getPeriods({
						group_member_id: group_member.id,
						cb: async function(periods) {
							console.log("RECEIVED periods.data =>", periods.data);
							let currents = periods.data.filter((o) => o.is_current);
							console.log("periods to disable =>", currents);
							let updated_periods = await root.disablePeriods(currents);
							console.log("updated_periods =>", updated_periods);
							// root.userEditEnd();
							root.grid.refresh();
							root.loaderHide();
						},
					});
				}
			});
		},
		loadEnd() {
			$(root.panelMain).fadeIn();
			console.log("loadEnd loading?", root.loading);
		},
		validateUrl(e) {
			console.log("e.value", e);
			var r = /^(http|https):\/\/[^ "]+$/;
			return r.test(e.value);
		},
		save() {
			console.log(this.$sep);
			var result = root.$refs.basicGroup.instance.validate();
			console.log("result", result);
			if (result.isValid) {
				console.log("VALID!");
				if (this.$isFunction(this.saveFn)) this.saveFn(root.validationGroup.validationGroup);
			}
		},
		onButtonClick() {
			Notify("Uncomment the line to enable sending a form to the server.");
			// const form = this.$refs[this.formRefName];
			// form.submit();
		},
	},
};
</script>
