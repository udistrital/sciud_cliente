<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-books mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">Proyecto</span>
					<span> &raquo; Seguimiento</span>
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>

			<div class="header-elements">
				<a
					href="#"
					@click.prevent="go(0, '/proyecto', `Cargando Estructuras`)"
					title="Volver a Listado..."
					class="
            btn btn-sm btn-main btn-labeled btn-labeled-left
            legitRipple
            ml-2
          "
					><b><i class="icon-arrow-left2"></i></b>Lista Proyectos</a
				>
			</div>
		</div>

		<div class="card" id="panel-seguimiento-proyecto">
			<div class="card-body group-detail mh">
				<!---->
				<div class="row mb-3">
					<div class="col">
						<div class="col d-flex justify-content-between align-items-end">
							<div class="title"><i class="icon-books"></i>{{ titulo_propuesta }}</div>
							<div class="sub-title"><i class="icon-info"></i>{{ modoEditar ? " En Seguimiento" : " Información" }}</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<DxTabPanel :show-nav-buttons="true" :animation-enabled="true" :multiple="true" ref="tabPanel">
							<DxItem title="Presupuesto" :disabled="!modoEditar">
								<template #default>
									<div class="card">
										<div class="card-body">
											<Presupuesto
												:id_proposal="propuesta.id"
												:propuesta="propuesta"
												:edit="true"
												:permisoGuardar="true"
												:convocatoria="convocatoria"
											></Presupuesto>
										</div>
									</div>
								</template>
							</DxItem>

							<DxItem title="Documentos del Proyecto" :disabled="!modoEditar">
								<template #default>
									<div class="card">
										<div class="card-body">
											<Documentos :id_proposal="propuesta.id" :propuesta="propuesta" :permisoGuardar="!visibleguardar"></Documentos>
										</div>
									</div>
								</template>
							</DxItem>

							<DxItem title="Cronograma" :disabled="!modoEditar">
								<template #default>
									<div class="card">
										<div class="card-body">
											<Cronograma :id_proposal="propuesta.id" :propuesta="propuesta" :edit="modoEditar" :permisoGuardar="visibleguardar"></Cronograma>
										</div>
									</div>
								</template>
							</DxItem>

							<!-- en desarrollo -->
							<DxItem title="Productos" :disabled="!modoEditar">
								<template #default>
									<div class="card">
										<div class="card-body">
											<Productos
												:group="propuesta"
												:editMode="!visibleguardar"
												title="Productos Registrados"
												endPointRute="proposal_products"
												objEpdata="proposal_product"
												titleBtn="Nuevo Producto"
												titlecolum="id"
											></Productos>
										</div>
									</div>
								</template>
							</DxItem>

							<!-- <DxItem title=" Adquisiciones" :disabled="!modoEditar">
                <template #default>
                  <div class="card">
                    <div class="card-body">
                      <Adquisiciones
                        :id_proposal="propuesta.id"
                        :propuesta="propuesta"
                        :edit="modoEditar"
                        :permisoGuardar="visibleguardar"
                      ></Adquisiciones>
                    </div>
                  </div>
                </template>
              </DxItem> -->

							<!-- <DxItem title=" Modificaciones" :disabled="!modoEditar">
								<template #default>
									<div class="card">
										<div class="card-body">
											<Modificaciones :id_proposal="propuesta.id" :propuesta="propuesta" :edit="modoEditar" :permisoGuardar="visibleguardar"></Modificaciones>
										</div>
									</div>
								</template>
							</DxItem> -->

							<!-- en desarrollo -->
							<DxItem title=" Inventario" :disabled="!modoEditar">
								<template #default
									><!--$route.params.planId-->
									<div class="card">
										<div class="card-body">
											<RecursosGrupo
												:group="propuesta"
												:propuesta_id="propuesta.id"
												:editMode="editMode"
												title="Inventario del Proyecto"
												:actInfor="!true"
												:editing="true"
												titleBtn="Agregar al inventario"
												titlecolum="type_description"
											/>
										</div>
									</div>
								</template>
							</DxItem>

							<DxItem title=" Investigadores" :disabled="!modoEditar">
								<template #default>
									<div class="card">
										<div class="card-body">
											<Investigadores :convocatoria="propuesta" :editOBJ="!visibleguardar" :propuesta="propuesta"></Investigadores>
										</div>
									</div>
								</template>
							</DxItem>
						</DxTabPanel>
					</div>
				</div>
			</div>
		</div>

		<div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card">
						<div class="card-body">
							<strong>propuesta:</strong>
							{{ JSON.stringify(propuesta, null, 3) }}
							<hr />
							<strong>proposal:</strong> {{ JSON.stringify(proposal, null, 3) }}
						</div>
					</div>
					<div class="card">
						<!-- <span class="font-weight-semibold">editMode:</span> {{ editMode }} -->
						<hr class="sep mb-0" />
						<span class="font-weight-semibold">modoEditar:</span>
						{{ JSON.stringify(modoEditar, null, 3) }}
					</div>
					<div class="card">
						<div class="card-body">
							<strong>dataUserLogin:</strong>
							{{ JSON.stringify(dataUserLogin, null, 3) }}
						</div>
					</div>
					<div class="card">
						<div class="card-body">
							<strong>propuesta:</strong>
							{{ JSON.stringify(propuesta, null, 3) }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root;
import { mapActions, mapGetters, mapState } from "vuex";
import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";
// import Productos from "@/modules/proyecto/items/productos.vue";
export default {
	created: function() {
		root = this;
		root.estado.borrador = root.get_sub_type_id("borrador");
		root.estado.subsanar = root.get_sub_type_id("por_subsanar");
		root.estado.enviar = root.get_sub_type_id("enviar");
		console.warn("root.estado => ", root.estado);
	},
	async mounted() {
		root.dataUserLogin = await root.universalgetOas({
			doc: root.user.local.identification_number,
		});
		root.getDataPropostal();
	},
	data: () => ({
		estado: {
			subsanar: 0,
			borrador: 0,
			enviar: 0,
		},
		visibleguardar: false,
		convocatoria: {},
		existe_propuesta: false,
		modoEditar: false,
		titulo_propuesta: null,
		dataUserLogin: {},
		propuesta: null,
		proposal: null,
	}),
	components: {
		DxItem,
		DxTabPanel,
		Documentos: () => import("@/modules/proyecto/items/documentos.vue"),
		Cronograma: () => import("@/modules/proyecto/items/cronograma"),
		RecursosGrupo: () => import("@/modules/proyecto/items/inventarios.vue"),
		Productos: () => import("@/modules/proyecto/items/productos.vue"),
		Presupuesto: () => import("@/modules/proyecto/items/presupuesto"),
		Adquisiciones: () => import("@/modules/proyecto/items/adquisiciones"),
		Modificaciones: () => import("@/modules/proyecto/items/modificaciones"),
		Investigadores: () => import("@/modules/proyecto/items/investigadores"),
	},
	methods: {
		...mapActions("unidad/producto/universalSentUpAct", {
			getSerarchDoc: "univerdalGet",
			getSinData: "getSinData",
			universalgetOas: "universalgetOas",
			get: "get",
			elementoActive: "active",
		}),

		async getDataPropostal() {
			await root.getSinData({
				url: "proposals/" + root.$route.params.propuestaId,
				cb: function(results) {
					let data = results;

					root.propuesta = data;

					root.get({
						url: "calls/" + data.call_id,
						cb: function(results) {
							root.convocatoria = results;
							root.loaderHide();
						},
					});

					console.warn("propuesta", root.propuesta);
					root.titulo_propuesta = root.propuesta.title;
					root.modoEditar = true;

					console.warn("root.$route.params.propuestaId => ", root.$route.params.propuestaId);
				},
			});
		},
	},
};
</script>
