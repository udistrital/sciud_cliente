<template>
	<div>
		<div class="page-header header-elements-md-inline">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-cog mr-1 color-main-600"></i>
					<span class="font-weight-semibold">Administración</span>
					&raquo; Usuarios
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>
			<div class="header-elements">
				<button
					type="button"
					@click="assoc()"
					title="Asociar usuarios..."
					class="btn btn-main btn-labeled btn-labeled-left legitRipple"
					id="btn-add"
				>
					<b><i class="icon-database-add"></i></b> Asociar usuarios
				</button>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<div class="card" id="data-container">
					<div class="card-body pt-0 grid">
						<div id="some" class="pt-3">
							<textarea
								class="form-control"
								style="font-size:11px !important; font-family:'Courier New'; letter-spacing:normal !important;color:#000"
								name="results"
								id="results"
								cols="30"
								rows="10"
								v-model="results"
							>
							</textarea>
						</div>
						<div id="grid" class="pt-3">
							<DxDataGrid
								class="main"
								width="100%"
								@initialized="gridInit"
								@content-ready="onContentReady"
								:allow-column-reordering="true"
								:data-source="items"
								:remote-operations="false"
								:hover-state-enabled="true"
								:row-alternation-enabled="true"
								:show-borders="false"
							>
								<DxColumnChooser :enabled="true" mode="dragAndDrop" />
								<DxSorting mode="multiple" /><!-- single, multiple, none" -->
								<DxPaging :page-size="10" />
								<DxFilterRow :visible="false" />
								<DxLoadPanel :enabled="false" />
								<DxGroupPanel :visible="true" :allow-column-dragging="true" />
								<DxGrouping :auto-expand-all="false" />
								<DxSummary>
									<DxGroupItem summary-type="count" column="group_type_name" display-format="{0}" />
								</DxSummary>
								<DxPager
									:show-info="true"
									:show-page-size-selector="true"
									:show-navigation-buttons="true"
									:allowed-page-sizes="[10, 20, 50]"
									info-text="Página {0} de {1} ({2} usuarios por asociar)"
								/>
								<DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
								<DxColumn
									:allow-filtering="false"
									data-field="Documento"
									caption="Documento"
									data-type="string"
									alignment="center"
									:allow-sorting="true"
									:customize-text="document"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="Nombres"
									data-type="string"
									alignment="left"
									:allow-sorting="true"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="Apellidos"
									data-type="string"
									alignment="left"
									:allow-sorting="true"
								/>
								<DxColumn
									:allow-filtering="false"
									data-field="FechaNacimiento"
									caption="Fecha de Nacimiento"
									data-type="date"
									alignment="center"
									:allow-sorting="true"
									:customize-text="bornDate"
								/>
								<DxColumn :width="50" alignment="center" cell-template="tpl" />
								<template #tpl="{ data }">
									<Commands :data="data.data" :edit-cb="edit" :enable-cb="enable" enable-pr="el grupo" />
								</template>
							</DxDataGrid>
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
let speed = 1000;
let $ = window.jQuery;
import Commands from "@/components/element/commands.vue";
// {{url}}/research_group?page=1&per_page=5&group_type_id=1
import {
	DxColumn,
	DxColumnChooser,
	DxDataGrid,
	DxFilterRow,
	DxGroupItem,
	DxGroupPanel,
	DxGrouping,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import { mapState, mapActions, mapGetters } from "vuex";
// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	name: "inicio",
	components: {
		Commands,
		DxColumn,
		DxColumnChooser,
		DxDataGrid,
		DxFilterRow,
		DxGroupItem,
		DxGroupPanel,
		DxGrouping,
		DxLoadPanel,
		DxPager,
		DxPaging,
		DxSearchPanel,
		DxSorting,
		DxSummary,
	},
	data: () => ({
		grid: null,
		grupo: null,
		results: "",
		isValid: false,
		lookupData: ["Not Started", "Need Assistance", "In Progress"],
	}),
	mounted() {
		this.all();
		this.loadingElement = ".card-body.grid";
		this.loadingVisible = true;
		this.grupo = window.vm.$clone(this.base);
	},
	computed: {
		...mapGetters("usuario", ["items", "base"]),
		...mapGetters("tercero", ["user", "doc"]),
	},
	watch: {
		items: function(val) {
			console.log("val", val.length);
			if (val.length > 0) this.loadingVisible = false;
		},
	},
	methods: {
		...mapActions("usuario", ["all"]),
		...mapActions("tercero", ["getOasUser", "saveOasUser"]),
		assoc() {
			console.clear();
			let docs = [];
			let final = [];
			let root = this;
			let top = root.items.length;
			var textarea = document.getElementById("results");
			console.log("length", root.items.length);
			for (let index = 0; index < top; index++) {
				const usuario = root.items[index];
				const cedula = usuario.Documento;
				if (!docs.includes(cedula) && typeof cedula !== "undefined" && cedula.length > 5) {
					docs.push(cedula);
					root.getOasUser({
						doc: usuario.Documento,
						cb: function(usr) {
							console.log(usr);
							if (typeof usr.Id !== "undefined") {
								console.log("ADDED");
								final.push(usr);
								root.results = JSON.stringify(final, null, 1);
								root.results += "\r\n\r\n" + JSON.stringify(docs);
							} else {
								let user = root.$clone(root.user);
								let doc = root.$clone(root.doc);
								user.PrimerNombre = usuario.Nombres.split(" ")[0];
								user.SegundoNombre = usuario.Nombres.split(" ")[1];
								user.PrimerApellido = usuario.Apellidos.split(" ")[0];
								user.SegundoApellido = usuario.Apellidos.split(" ")[1];
								user.NombreCompleto = usuario.Nombres + " " + usuario.Apellidos;
								user.FechaNacimiento = new Date(usuario.FechaNacimiento);
								doc.TerceroId = user;
								doc.Numero = cedula;
								root.saveOasUser({
									user: user,
									doc: doc,
									cb: function(user) {
										final.push(user);
										console.log("CREATED!", user);
										root.results = JSON.stringify(final, null, 1);
										root.results += "\r\n\r\n" + JSON.stringify(docs);
									},
								});
							}
						},
					});
				}
			}
		},
		bornDate(cellInfo) {
			// console.log("cellInfo", cellInfo);
			return this.$getFormattedDate(cellInfo.value, false);
		},
		document(cellInfo) {
			if (typeof cellInfo.value !== "undefined") {
				return cellInfo.value.split(/(?=(?:...)*$)/).join(".");
			}
		},
		save() {
			this.loadingMessage = (this.grupo.id === 0 ? "Creando" : "Actulizando") + " grupo";
			this.loadingVisible = true;
			$("#btn-add").fadeOut();
			$("#grid").fadeOut(speed, function() {
				$("#data").fadeIn(speed, function() {});
			});
		},
		cancel(validationGroup) {
			// let root = this;
			// $("#btn-add").fadeIn();
			// $("#msg").html("Inicio");
			// $("#data").fadeOut(speed, function () {
			//   validationGroup.reset();
			//   root.grupo = root.$clone(baseEntity);
			//   $("#grid").fadeIn(speed, function () {});
			// });
		},
		add() {
			// console.clear();
			// console.log("ADD!");
			// this.grupo = this.$clone(baseEntity);
			// console.log("this.grupo", this.grupo);
			// $("#btn-add").fadeOut();
			// $("#msg").html("Nueva Unidad");
			// $("#grid").fadeOut(speed, function () {
			//   console.log("END #grid fadeOut!");
			//   $("#data").fadeIn(speed, function(){
			//     console.log("END #data fadeIn!");
			//   });
			// });
		},
		edit(data) {
			// this.grupo = this.$clone(data);
			// console.log("detail " + data.id);
			// $("#btn-add").fadeOut(speed);
			// $("#msg").html("Editar unidad");
			// $("#grid").fadeOut(speed, function () {
			//   $("#data").fadeIn(speed, function () {});
			// });
		},
		enable(result, data) {
			// console.log(`Result: ${result}, Data: ${JSON.stringify(data)}`);
		},
		remove() {
			// console.log("remove " + this.data.id);
		},
		gridInit(e) {
			this.grid = e.component;
			this.grid.beginUpdate = () => {
				// this.loadingVisible = true;
				// console.log("this.loadingVisible", this.loadingVisible);
				// this.loadingVisible = true;
				// console.log("beginUpdate", e);
			};
			this.grid.endUpdate = () => {
				// console.log("endUpdate", e);
			};
		},
		onContentReady() {
			this.loadingVisible = false;
			// console.log("onContentReady!");
			$(".commands a").click(function() {
				console.log("Come on lets show the dropdown!!");
			});
			var h = "<span class='mr-1 color-text d-none d-md-inline' id='column-chooser-text'>Selector de Columnas:</span>";
			if ($("#column-chooser-text").length <= 0) $(".dx-datagrid-column-chooser-button").before(h);
		},
	},
};
</script>
