<template>
	<div class="row slide" :id="id">
		<div class="col">
			<div class="card">
				<div class="card-header bg-main-600 main"><i class="icon-user"></i> Editar Usuario</div>
				<div class="card-body mb-0 pb-0">
					<div class="row">
						<div class="col-md-3">
							<div class="form-group">
								<label>Documento de identidad:</label>
								<DxNumberBox :show-clear-button="true" class="form-control" :value.sync="baseObj.identification_number" placeholder="Documento de identidad">
									<DxValidator>
										<DxRequiredRule />
									</DxValidator>
									<DxNumberBoxButton :options="searchButton" name="search" location="after" />
								</DxNumberBox>
							</div>
						</div>
						<div class="col-md-3">
							<div class="form-group">
								<label>Rol:</label>
								<DxSelectBox
									:grouped="false"
									:data-source="userRoles"
									:value.sync="baseObj.user_role_id"
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
						<div class="col-md-4">
							<div class="form-group">
								<label>Nombre:</label>
								<DxTextBox :value.sync="baseObj.name" placeholder="Nombre" class="form-control" :read-only="true" name="name" mode="text">
									<DxValidator>
										<DxRequiredRule />
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
						<div class="col-md-1">
							<div class="form-group">
								<label>OAS ID:</label>
								<DxTextBox :value.sync="baseObj.oas_user_id" placeholder="OAS ID" class="form-control" :read-only="true">
									<DxValidator>
										<DxRequiredRule />
									</DxValidator>
								</DxTextBox>
							</div>
						</div>
						<div class="col-md-1">
							<div class="form-group">
								<label>Activo:</label>
								<DxSwitch :value.sync="baseObj.active" switched-on-text="SI" switched-off-text="NO" />
							</div>
						</div>
					</div>
				</div>
				<div class="card-footer">
					<div class="row">
						<div class="col">
							<DxButton @click="cancelFn" class="nb">
								<template #default>
									<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
										<b><i class="icon-database-remove"></i></b> CANCELAR
									</span>
								</template>
							</DxButton>
						</div>
						<div class="col text-right">
							<DxButton @click="saveFn" class="nb">
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
import { DxButton, DxSelectBox, DxSwitch, DxTextBox, DxNumberBox } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import { mapActions } from "vuex";
export default {
	components: {
		DxTextBox,
		DxRequiredRule,
		DxValidator,
		DxButton,
		DxSwitch,
		DxNumberBox,
		DxNumberBoxButton,
		DxSelectBox,
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
		saveFn: {
			type: Function,
			default: null,
		},
		cancelFn: {
			type: Function,
			default: null,
		},
	},
	mounted() {
		root = this;
	},
	methods: {
		...mapActions("auth/usuario", ["getUser", "saveUser", "updateUser", "getOasUsers", "getOasUser"]),
		gridInit(e) {
			return e;
		},
	},
	data: () => ({
		searchButton: {
			text: "Buscar",
			onClick: async () => {
				// console.clear();
				let id = root.baseObj.identification_number;
				console.log("Documento", id);
				if (id !== null && id.toString().length > 0) {
					root.loadShow("Buscando usuario", "#data-panel-usuario .card");
					// 202103121500: Verifica que no exista ya localmente
					let r = await root.getUser(id);
					console.log("r", r);
					if (r.length > 0) {
						root.loadHide();
						root.$info(`El usuario con el documento "${id}" ya se encuentra registrado.`, function() {});
					} else {
						root.getOasUser({
							doc: id,
							cb: function(usr) {
								// console.clear();
								console.log("User", usr);
								root.loadHide();
								if (typeof usr.Id !== "undefined") {
									root.baseObj.oas_details = usr.TerceroId;
									root.baseObj.oas_user_id = usr.TerceroId.Id.toString();
									root.baseObj.name = usr.TerceroId.NombreCompleto;
								} else {
									root.$info(`No se encontró ningún usuario con el documento "${id}"`, function() {});
								}
							},
						});
					}
				}
			},
		},
	}),
};
</script>
