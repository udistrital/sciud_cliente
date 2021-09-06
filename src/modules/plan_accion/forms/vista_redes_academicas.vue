<template>
                                              
<div class="card text-dark bg-light mb-12">
	<div class="card-header dx-button-text">Información</div>
	<div class="card-body">
		<div class="col-sm-12">
			<div class="card">
			<div class="card-body">
				<p class="card-text"><b>Nombre: </b>{{root.datalist}}</p>
				<p class="card-text"><b>Lineas de Investigación asociadas: </b>Sin datos</p>
				<p class="card-text"><b>Estado Estimado: </b>datalist</p>
			</div>
			</div>
		</div>
	</div>

	<div class="card-header dx-button-text">Areas del Conocimiento</div>
	<div class="card-body">


		<div class="row">
			<div class="col-sm-4">
				<div class="card">
				<div class="card-body">
					<h5 class="card-title">Discipinas OCDE:</h5>
					<p class="card-text">
						<ul>
							<li>Arte
								<ul>
									<li>Diseño </li>
									<li>Otras Artes</li>
								</ul>
							</li>

							<li>Historia y Arqueología
								<ul>
									<li>Arqueología </li>
									<li>Historia de Colombia</li>
								</ul>
							</li>
						</ul>
					</p>
				</div>
				</div>
			</div>

			<div class="col-sm-4">
				<div class="card">
				<div class="card-body">
					<h5 class="card-title">CINE</h5>
					<p class="card-text">Sin Datos.</p>
				</div>
				</div>
			</div>

			<div class="col-sm-4">
				<div class="card">
				<div class="card-body">
					<h5 class="card-title">SNIES</h5>
					<p class="card-text">Sin Datos.</p>
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
let root = null;
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    datalist: {},
    dataForm: {},
    listaGeneral: [],
  }),
  created() {
    root = this;
    root.listaRedes();
  },
  props: {
    group: {
      type: Object,
      default: null,
    },

    action_panel_id: {
      type: Number,
      default: 0,
    },

    editMode: {
      type: Boolean,
      default: false,
    },

    alidateImp: {
      type: Boolean,
      default: true,
    },

    validateImp: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // ...mapGetters("core/tipo", ["subtypesByType"]),
    // ...mapState("unidad/snies", { sniesItem : "items" }),
    ...mapState("unidad/producto/universalSentUpAct", { data: "items" }),
  },
  methods: {
    // ...mapActions("unidad/colciencias", { getConvocatorias: "getAll" }),
    // ...mapActions("unidad", ["getUnit", "saveUnit", "setDocument"]),
    // ...mapActions("unidad/oas", { getFacultades: "facultades" }),
    // ...mapActions("unidad/indicadores", { LineasInvConocimiento: "getAreasKnow" }),
    // ...mapActions("unidad/ocde", { getOcde: "getAll" }),
    // ...mapActions("unidad/cine", { getCine: "all" }),
    // ...mapActions("unidad/snies", { getSnies: "getSnies" }),
    ...mapActions("unidad/producto/universalSentUpAct", {
      getDataAll: "getAll",
      getForm: "get",
    }),
    vista(id) {
      //root.loaderShow(`Completando Formulario`, "#panel-plan_accion .card-body");
      setTimeout(function () {
        root.getForm({
          url: "form_d_act_plans/" + id,
          cb: function (results) {
            root.dataForm =results;
            root.loaderHide();
          },
        });
      }, 10);
    },

    listaRedes() {
      setTimeout(function () {
        root.getDataAll({
          url:"/action_plans/" + root.$route.params.planId + "/form_d_act_plans",
          cb: function (results) {
            console.clear();
            root.datalist = results;
			console.warn(root.datalist);
            root.loaderHide();
          },
        });
      }, 1000);
    },
  },
};
</script>

<style>
</style>