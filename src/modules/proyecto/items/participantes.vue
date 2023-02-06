<template>
	<div class="col p-0 m-0 slide" :id="id">
		<div class="row data slide externos">
			<div class="col">
				<div class="card">
					<div class="card-header main">{{ editandoExterno ? "Editar" : "Agregar" }} Participante Externo</div>
					<div class="card-body mb-0 pb-0 pt-3">
						<DxValidationGroup ref="valGroupExt">
							<div class="row">
									
				<div class="col-md-2">
                  <div class="form-group">
                    <label>Documento de identidad:</label>
                    <DxNumberBox
                      ref="nbIdNum"
                      class="form-control"
                      :show-clear-button="true"
                      :value.sync="investigador.identification_number"
                      placeholder="Documento"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                      <DxNumberBoxButton
                        :options="searchButton"
                        name="search"
                        location="after"
                      />
                    </DxNumberBox>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label>Nombre:</label>
                    <DxTextBox
                      :value.sync="investigador.name"
                      placeholder="Nombre"
                      class="form-control"
                      :read-only="true"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>

                <div class="col-md-3">
                  <div class="form-group">
                    <label>ID Investigador:</label>
                    <DxTextBox
                      :value.sync="baseObj.researcher_id"
                      placeholder="ID Investigador"
                      class="form-control"
                      :read-only="true"
                    >
                      <DxValidator>
                        <DxRequiredRule />
                      </DxValidator>
                    </DxTextBox>
                  </div>
                </div>


							</div>
						</DxValidationGroup>
					</div>
					
					<div class="card-footer">
						<div class="row">
							<div class="col">
								<DxButton @click="userCancel()" class="nb">
									<template #default>
										<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
											<b><i class="icon-database-remove"></i></b> CANCELAR
										</span>
									</template>
								</DxButton>
							</div>
							<div class="col text-right">
								<DxButton @click="userSave('ext')" class="nb">
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


		<div class="grid">
			<div class="row">
				<div class="col">
					<div class="page-header header-elements-md-inline">
						<div class="page-title"><i class="icon-users mr-1 color-main-600"></i> Participantes colaboradores del producto</div>
						<div class="header-elements">
							<button
								type="button"
								@click.prevent="userAdd('ext')"
								title="Agregar Participante externo..."
								class="btn btn-main btn-labeled btn-labeled-left"
								id="btn-add-ext"
							>
								<b><i class="icon-user-plus"></i></b> Anexar Participante
							</button>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<DxDataGrid
								class="main"
								width="100%"
								:dataSource="dataSourceExt"
								
								:allow-column-reordering="false"
								:remote-operations="true"
								no-data-text="No hay participantes registrados"
								:hover-state-enabled="true"
								:row-alternation-enabled="true"
								:show-borders="false"
							>
								<DxExport :enabled="false" />
								<DxColumnChooser :enabled="false" mode="dragAndDrop" />
								<DxSorting mode="single" /><!-- single, multiple, none" -->
								<DxPaging :page-size="10" />
								<DxFilterRow :visible="false" />
								<DxLoadPanel :enabled="false" />
								<DxGroupPanel :visible="false" :allow-column-dragging="true" />
								<DxGrouping :auto-expand-all="false" />
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
								</DxSummary>
								<DxPager
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="dgPageSizes"
									info-text="Página {0} de {1} ({2} participantes externos)"
								/>
								<DxSearchPanel :visible="false" :highlight-case-sensitive="false" />
							
								<DxColumn

									:width="120"
									alignment="center"
									sort-order="asc"
									caption="ID"
									data-field="id"
									data-type="string"
								/>
								<DxColumn

									:width="120"
									alignment="center"
									
									caption="ID OAS"
									data-field="oas_researcher_id"
									data-type="string"
								/>
								<DxColumn

									alignment="center"
									
									caption="Documento"
									data-field="identification_number"
									data-type="string"
								/>
								
								<DxColumn :width="70" alignment="center" cell-template="tpl" caption="" name="cmds" v-if="editMode" />
								<template #tpl="{ data }">
									<span class="cmds">
										<!-- <a title="Editar usuario..." class="cmd-item color-main-600" @click.prevent="userEdit(data.data, 'ext')" href="#">
											<i class="icon-database-edit"></i>
										</a> -->
										<a
                    title="Desactivar Evaluador..."
                    class="cmd-item color-main-600 mr-2"
                    @click.prevent="active(data)"
                    href="#"
                  >
                    <i class="icon-database-remove"></i>
                  </a>
									</span>

								</template>
							</DxDataGrid>



							
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card mt-3" v-if="debug">
			<div class="card-body">product.researchers:
				{{ JSON.stringify(product.researchers, null, "\t") }}
			</div>
			<div class="card-body">product.researchers:
				<pre>{{dataSourceExt}}</pre>
			</div>
			<div class="card-body">root.dataObjectSend:
				{{ JSON.stringify(dataObjectSend, null, "\t") }}
			</div>
			
		</div>
	</div>

</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root, cmds;
let gridSize = 15;
let $ = window.jQuery;
import { mapGetters, mapActions } from "vuex";
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
import { DxButton, DxSelectBox, DxSwitch, DxTextBox, DxNumberBox, DxValidationGroup } from "devextreme-vue";
import { DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import DxStore from "@/store/dx";
export default {
	name: "datosBasicos",
	components: {
		DxTextBox,
		DxButton,
		DxColumn,
		DxColumnChooser,
		DxDataGrid,
		DxExport,
		DxFilterRow,
		DxValidationGroup,
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
		DxValidator,
	},
	data: () => ({
		panelExt: null,
		panelGrid: null,
		isValid: false,
		btnCancel: null,
		btnAdd: null,
		gridExt: null,
		loading: false,
		editParticipante: false,
		editandoExterno: false,
		rolesParticipante: [],
		tiposParticipante:[],
		baseEnt: null,
		dataSourceExt:[],
		baseObj: {
			role_id: null,
			researcher_id: null,
			active: true,
			start_date: Date(),
		},
		investigador: {
			identification_number: null,
		},
		dataObjectSend:{},
		elimParticipant : false,
		groupResearchers: {},
			searchButton: {
			icon: "find",
			onClick: async () => {
				if(root.investigador.identification_number!==null && typeof root.investigador.identification_number !== undefined)
				await root.getInfoDataUser();
				else
				root.$info("Digite un numero de documento valido");
			},
		},
	}),
	beforeUpdate() {
		console.log(this.$sep);
		console.log("beforeUpdate participantes.vue");
	},
	updated() {
		console.log(this.$sep);
		console.log("updated participantes.vue");
		root.dataSourceExt = root.product.researchers;
		// console.warn("root.dataSourceExt => ",root.dataSourceExt)
	},
	beforeDestroy() {
		console.log(this.$sep);
		console.log("beforeDestroy participantes.vue");
	},
	destroyed() {
		console.log(this.$sep);
		console.log("destroyed participantes.vue");
	},
	async created() {
		root = this;
		let arg = {};
		arg.url =
		'role?filter=[["active","=","true","AND","role_type_id","=","1122"]]';
		root.tiposParticipante = await root.univerdalGet(arg);
		
	},
			
	mounted() {
		console.log(root.$sep);
		root.rolesParticipante = root.subtypesByType("unidad_rol_participante");
		console.warn("root.id",root.id)
		// root.dataSourceExt= ;
		root.valGroupExt = root.$refs.valGroupExt.instance;
		root.loaderElement = "#" + root.id + " .card-body"; //producto-participantes-ext
		root.baseEnt = this.$clone(this.baseObj);
		console.log("root.id", root.id);
		console.log("root.panelGrid", root.panelGrid);
		console.log("participantes MOUNTED!");
		setTimeout(function() {
			root.panelExt = $("#" + root.id + " .data.externos");
			root.panelGrid = $("#" + root.id + " .grid");
			
			if ($("#panel-produccion").length > 0) {
				root.loaderElement = $("#panel-produccion .card-body");
			}
		}, 500);
		
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),

		// dataSourceExt: function() {
		// 	if (typeof root.product.id === "undefined" || root.product.id === null || typeof this.product.id == "undefined" || this.product.id === null) return null;
		// 	console.log("root.baseObj", this.baseObj);
		// 	return DxStore({
		// 		key: ["id"],
		// 		endPoint: `inventories`,//${this.endPoint}/${this.product.id}/ext_participants
		// 		onLoading: function() {
		// 			root.loading = true;
		// 		},
		// 		onLoaded: function(results) {
		// 			console.log("results participantes externos", results);
		// 			root.loadEnd();
		// 		},
		// 	});
		// },


	},
	props: {
		id: {
			type: String,
			default: () => "panel-participantes",
		},
		endPoint: {
			type: String,
			default: () => null,
		},
		product: {
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
		parent: {
			type: Object,
			default: () => null,
		},
		group: {
			type: Object,
			default: () => {},
		},
	},
	methods: {
		
		...mapActions("unidad/integrantes", ["participantCreate", "participantUpdate"]),
		...mapActions("unidad", ["getResearcher", "getResearchers", "saveResearcher", "addGroupMember", "researchers"]),
		
		...mapActions("unidad/producto/universalSentUpAct", {
			univerdalGet: "univerdalGet",
			universalgetOas: "universalgetOas",
			getSinData: "getSinData",
			objSave: "save",
			objUpdate: "update",
			elementoActive: "active",
		}),

		async getDataPropostal(identidad) {
			await root.getSinData({
				url:
				"proposals/by-internal-member?researcher_identification=" +
				identidad,
				cb: function (results) {
				let data = results;
				if (data.data.length > 0) {
					// root.propuesta = data.data[data.data.length - 1];
					// console.warn("propuesta", root.propuesta);
					let msg =
					"El investigador con numero de identificación: " +
					identidad +
					",<br> se encuentra registrado en esta convocatoria de proyecto.";
					//root.$confirm(msg, function (si_no) {
					// console.log("result", si_no);
					// if (!si_no) {
					// 	(root.investigador.identification_number = null),
					// 	(root.investigador.name = null);
					// 	root.baseObj.researcher_id = null;
					// }
					//});
					root.$info(msg);
				}
				},
			});
		},


		getgroupuser(doc) {
			// alert(doc)
			console.clear();
			console.warn("doc=>",doc);
			if(doc !== null || typeof doc !== undefined){
				setTimeout(function () {
					root.getSinData({
					url:
						"/researcher_research_units/?identification_number=" +
						parseInt(doc),
					cb: function (results) {
						let objeto = results;
						root.groupResearchers = objeto;
						if (objeto.length > 0) {
						root.baseObj.researcher_id = root.groupResearchers[0].id;
						root.getDataPropostal(doc);
						} else {
						root.$info(
							"El usuario no se encuentra registrado en una estructura de investigación."
						);
						root.baseObj = root.baseEnt;
						}
						root.loaderHide();
						console.warn("datos internos integrante ", objeto);
					},
					});
				}, 1500);
			}
		},

		
		async getInfoDataUser() {
			root.loaderShow("Buscando Integrante", root.panelData);
			let document = root.investigador.identification_number;
			let data = await root.universalgetOas({ doc: document });
			console.warn("root.investigador.identification_number=>",root.investigador.identification_number)
			if(root.investigador.identification_number !== null || typeof root.investigador.identification_number!== undefined){
				setTimeout(function () {
					if (typeof data.TerceroId !== "undefined") {
					root.investigador = data.TerceroId;
					root.investigador.name = data.TerceroId.NombreCompleto;
					root.loaderShow("Cargando datos del integrante", root.panelData);
					root.getgroupuser(document);

					console.warn("datos de usuario", root.investigador);
					} else {
					root.$info(
						"El usuario con numero de documento: " +
						root.investigador.identification_number +
						", no se encuentra registrado."
					);
					root.investigador = {};
					// root.investigador.name=null;
					root.loaderHide();
					}
				}, 1000);

			}else{
				root.$info("¡Ingrese un numero de documento valido!")
			}
			

		},

		userEdit(data, accion) {
			root.editParticipante = true;
			root.editandoExterno = accion == "ext";
			console.log("data", data);
			this.baseObj = data;
			console.log("id data ", data.id);
			root.parent.panelCmdBack.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelExt.fadeIn(function(params) {});
			});
		},

		userAdd(accion) {
			root.editParticipante = false;
			root.editandoExterno = false;
			root.baseObj = root.baseEnt;
			root.parent.panelCmdBack.fadeOut();
			root.panelGrid.fadeOut(function(params) {
				root.panelExt.fadeIn(function(params) {});
			});
		},

		userCancel() {
			root.panelExt.fadeOut(function(params) {
				root.parent.panelCmdBack.fadeIn();
				root.panelGrid.fadeIn(function(params) {
					root.valGroupExt.reset();
				});
			});
			root.identification_number = null;
			root.baseObj = root.baseEnt;
			root.dataObjectSend={}
			root.editParticipante = false;
		},
		active(data) {
			let msg = `¿Realmente desea desvincular al evaluador: <span class='text-sb'>"${data.data.identification_number}"</span>?`;
			this.$confirm(msg, function (si_no) {
				console.log("result", si_no);
				if (si_no) {
				// root.loaderShow(`Desvinculando Evaluador`, root.panelGrid);
				let arrayEvaluadores = root.product.researchers.filter(
					(item) => item.identification_number !== data.data.identification_number
				);
				root.product.researchers=arrayEvaluadores;
				root.elimParticipant = true;
				root.userSave(data);
				}
			});
		},

		userSave(data) {
			console.log("Entrando a metodo de guardado de datos");
			// root.$info("Entrando a metodo de guardado de datos");
			root.baseObj.researcher_id;
			var result = root.$refs.valGroupExt.instance.validate();

			let vector_user=[];
			if(root.elimParticipant == false){	
				root.$info("Entrando a metodo de guardado de datos");
				if(root.product.researchers !== null){
					for(let i=0; i<root.product.researchers.length; i++)
					vector_user[i]=root.product.researchers[i].id
					vector_user.push(root.baseObj.researcher_id);
				}else{
					vector_user.push(root.baseObj.researcher_id);
				}
			}else{
				
				for(let i=0; i<root.product.researchers.length; i++)
				vector_user[i]=root.product.researchers[i].id
				// vector_user.push(root.baseObj.researcher_id);

				root.elimParticipant = false;
				result.isValid=true; 
			}

			
			if (result.isValid) {
				root.loaderShow(`Actualizando Participantes`, root.panelGrid);
				
				
				
					root.dataObjectSend={
						name: root.product.name,
						product_type_id: root.product.product_type_id,
						indicator_id: root.product.indicator_id,
						beneficiary: root.product.beneficiary,
						validated: root.product.validated,
						active: root.product.active,
						proposal_id: root.product.proposal_id,
						updated_by: root.user_id,
						researcher_ids: vector_user
					};


				console.clear();
				console.warn(root.dataObjectSend)
				console.warn(JSON.parse(`{ "proposal_product" :` + JSON.stringify(root.dataObjectSend) + "}"))
				console.warn(vector_user)
				let obj = root.dataObjectSend;
				var dto = {
					newFormat: true,
					rute2: "proposal_products",
					stringEP: `proposal_products`,
					mod: root.product.id,
					objectSend: JSON.parse(`{ "proposal_product" :` + JSON.stringify(root.dataObjectSend) + "}"),
					cb: function (item) {
						console.log("Result", item);
						root.product=item;
						root.dataSourceExt=root.product.researchers;
						root.loaderHide();
						// root.elimParticipant = false;
						root.userCancel();
					},
				};
				console.warn("dto", dto);
				root.objUpdate(dto);
			}

		},



		// gridInitExt(e) {
		// 	console.log("e", e);
		// 	this.gridExt = e.component;
		// },

		loadEnd() {
			this.loading = false;
			this.loaderHide();
			console.log("loadEnd => root.loading => ", root.loading);
		},
	},
};
</script>
