<template>
	<div>
		<DxTabPanel :loop="true" ref="tabPanel" :swipe-enabled="false" :animation-enabled="false" @selection-changed="tabChange($event)">
			<DxItem title="1. Datos básicos" id="basicos" data-idx="1">
				<template #default>
					<DatosBasicos :group="group" :saveFn="saveFn" :cancelFn="cancelFn" :editMode="editMode" />
				</template>
			</DxItem>
			<DxItem title="2. Integrantes" :disabled="creating" id="integrantes">
				<template #default>
					<Integrantes :group="group" :saveFn="saveFn" :cancelFn="cancelFn" ref="compIntegrantes" :editMode="editMode" />
				</template>
			</DxItem>
			<DxItem title="3. Institucional" :disabled="creating" id="institucional">
				<template #default>
					<Institucional :group="group" :saveFn="saveFn" :cancelFn="cancelFn" ref="compInstitucional" :editMode="editMode" />
				</template>
			</DxItem>
			<DxItem title="4. Producción" :disabled="creating">
				<template #default>
					<Produccion :group="group" :saveFn="saveFn" :cancelFn="cancelFn" ref="compProduccion" :editMode="editMode" />
				</template>
			</DxItem>
		</DxTabPanel>
	</div>
</template>
<script>
let $ = window.jQuery;
import DxTabPanel, { DxItem } from "devextreme-vue/tab-panel";
let root = null;
export default {
	name: "unidad",
	components: {
		DxItem,
		DxTabPanel,
		DatosBasicos: () => import("@/modules/unidad/_basicos"),
		Institucional: () => import("@/modules/unidad/_institucional"),
		Integrantes: () => import("@/modules/unidad/_integrantes"),
		Produccion: () => import("@/modules/unidad/_produccion"),
	},
	props: {
		group: {
			type: Object,
			default: () => {},
		},
		editMode: {
			type: Boolean,
			default: false,
		},
		documents: {
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
		parent: {
			type: Object,
			default: () => {},
		},
		selected: {
			type: Number,
			default: null,
		},
	},
	data: () => ({
		creating: false,
		isValid: false,
		progress: 37,
		selectedIndex: 0,
		tabPanel: null,
	}),
	watch: {
		group: function(g) {
			console.log(this.$sep);
			console.log("watch.group", g);
			// TODO: 202010290412: Lógica que incluya validación de datos básicos
			this.creating = typeof g.id !== "undefined" && g.id.toString() === "0";
		},
	},
	beforeUpdate() {
		console.log(this.$sep);
		console.log("beforeUpdate _base.vue");
	},
	updated() {
		console.log(this.$sep);
		console.log("updated _base.vue");
	},
	beforeDestroy() {
		console.log("beforeDestroy");
	},
	destroyed() {
		console.log("destroyed");
	},
	computed: {
		// ...mapGetters("unidad", ["researchers"]),
		oth() {
			return "";
		},
	},
	methods: {
		changeTab: function(idx) {
			console.log(this.$sep);
			console.log("changeTab", idx);
			this.tabPanel.option("selectedIndex", idx);
		},
		clearMembers: function() {
			root.members = [];
		},
		tabChange(e) {
			// console.clear();
			console.log("e", e);
			console.log("root.$refs", root.$refs);
			let idx = this.tabPanel.option("selectedIndex");
			root.scrollTop();
			console.log(root.$sep);
			console.log(idx);
			switch (idx) {
				case 0:
					console.log("basicos");
					break;
				case 1:
					var comp = root.$refs.compIntegrantes;
					if (typeof comp !== "undefined") {
						comp.groupResearchers = [];
						comp.loadMembers();
					}
					root.loaderShow("Cargando usuarios", $("#panel-unidades .card-body")[0]);
					break;
				case 2:
					console.log("institucional");
					break;
				case 3:
					console.log("produccion");
					break;
				case 4:
					console.log("plan");
					break;
				case 5:
					console.log("inventario");
					break;
				default:
					console.log("otro");
					break;
			}
		},
	},
	mounted() {
		root = this;
		console.log(root.$sep);
		console.log("TABS MOUNTED!");
		console.log("Solo lectura", this.editMode);
		root.loaderElement = ".card-body.grid";
		root.tabPanel = root.$refs.tabPanel.instance;
		console.log("members", root.members);
		console.log("tabPanel", root.tabPanel);
	},
};
</script>
