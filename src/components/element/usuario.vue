<template>
	<div class="row slide" :id="id">
		<div class="col">
			<div class="card">
				<div class="card-header bg-main-600 main"><i class="icon-user"></i> <span id="action-title">Editar Usuario</span></div>
				<div class="card-body mb-0 pb-0">
					<DxValidationGroup ref="vgUser">
						<div class="row">
							<div class="col-md-3">
								<div class="form-group">
									<label>Documento de identidad:</label>
									<DxNumberBox
										ref="nbId"
										:show-clear-button="true"
										class="form-control"
										:value.sync="baseObj.identification_number"
										placeholder="Documento de identidad"
									>
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
										<DxNumberBoxButton :options="searchButton" name="search" location="after" />
									</DxNumberBox>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<label>Nombre:</label>
									<DxTextBox :value.sync="baseObj.name" placeholder="Nombre" class="form-control" :read-only="true" name="name" mode="text">
										<DxValidator>
											<DxRequiredRule />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>
							<div class="col-md-6">
								<div class="row">
									<div class="col-md-2">
										<div class="form-group">
											<label>OAS ID:</label>
											<DxTextBox :value.sync="baseObj.oas_user_id" placeholder="OAS ID" class="form-control" :read-only="true">
												<DxValidator>
													<DxRequiredRule />
												</DxValidator>
											</DxTextBox>
										</div>
									</div>
									<div class="col-md-4">
										<div class="form-group">
											<label>Rol:</label>
											<DxSelectBox
												:show-clear-button="true"
												:grouped="false"
												:data-source="userRoles"
												:value.sync="baseObj.user_role_id"
												:search-enabled="false"
												placeholder="Seleccione un rol..."
												class="form-control"
												@value-changed="enableFaculties"
												display-expr="name"
												value-expr="id"
											>
												<DxValidator>
													<DxRequiredRule />
												</DxValidator>
											</DxSelectBox>
										</div>
									</div>
									<div class="col-md-6" v-if="faculties.length > 0">
										<div class="form-group">
											<label>Facultades:</label>
											<DxTagBox
												name="faculty_ids"
												id="faculty_ids"
												display-expr="Nombre"
												value-expr="Id"
												class="form-control"
												:search-enabled="false"
												:show-selection-controls="true"
												:value.sync="faculty_ids"
												placeholder="Seleccione una o más facultades..."
												:data-source="faculties"
											>
												<!-- @value-changed="facultadChange" -->
												<!-- <DxValidator>
											<DxRequiredRule />
										</DxValidator> -->
											</DxTagBox>
										</div>
									</div>
								</div>
							</div>
						</div>
					</DxValidationGroup>
				</div>
				<div class="card-footer">
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
			</div>
		</div>
		<div class="row" v-if="isDev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body code">
						{{ JSON.stringify(baseObj, null, 3) }}
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
let root = null;
import { DxButton, DxSelectBox, DxTextBox, DxNumberBox, DxValidationGroup, DxTagBox } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import { mapActions } from "vuex";
export default {
	components: {
		DxButton,
		DxNumberBox,
		DxNumberBoxButton,
		DxRequiredRule,
		DxSelectBox,
		DxTextBox,
		DxValidationGroup,
		DxValidator,
		DxTagBox,
	},
	props: {
		id: {
			type: String,
			default: () => "data-panel-usuario",
		},
		baseObj: {
			type: Object,
			default: () => {},
		},
		userRoles: {
			type: Array,
			default: () => [],
		},
		faculties: {
			type: Array,
			default: () => [],
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
	created() {
		root = this;
	},
	methods: {
		...mapActions("auth/usuario", ["getUser", "saveUser", "updateUser", "getOasUsers", "getOasUser"]),
		save() {
			let vg = root.$refs.vgUser.instance;
			root.saveFn(vg);
		},
		cancel() {
			root.$refs.vgUser.instance.reset();
			root.cancelFn();
		},
		gridInit(e) {
			return e;
		},
		enableFaculties(e) {
			console.clear();
			console.log("e", e);
		},
	},
	data: () => ({
		faculty_ids: [],
		searchButton: {
			text: "Buscar",
			onClick: async () => {
				// console.clear();
				let id = root.baseObj.identification_number;
				console.log("Documento", id);
				if (id !== null && id.toString().length > 0) {
					root.loaderShow("Buscando usuario", `#${root.id} .card`);
					// 202103121500: Verifica que no exista ya localmente
					let r = await root.getUser(id);
					console.log("r", r);
					if (r.length > 0) {
						root.loaderHide();
						root.$info(`El usuario con el documento "${id}" ya se encuentra registrado.`, function() {});
					} else {
						let oas_user = await root.getOasUser({ doc: id });
						if (!("TerceroId" in oas_user)) {
							let m = `El documento "${id}" no se encuentra registrado<br>en el `;
							m += `<a href="https://contratistas.portaloas.udistrital.edu.co" title="Visite el Sistema de Autenticación Única..." class="link" target="_blank"`;
							m += `>Sistema de Autenticación Única</a> de la Universidad Distrital`;
							root.$info(m);
							root.loaderHide();
							return false;
						}
						root.baseObj.oas_details = oas_user.TerceroId;
						root.baseObj.oas_user_id = oas_user.TerceroId.Id.toString();
						root.baseObj.name = oas_user.TerceroId.NombreCompleto;
						root.loaderHide();
					}
				}
			},
		},
	}),
};
</script>
