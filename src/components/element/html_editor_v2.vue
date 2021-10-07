<template>
	<div class="html-editor">
		<DxHtmlEditor :value.sync="markup" :height="height + 'px'" @value-changed="valueChanged">
			<DxToolbar>
				<!-- <DxItem :accepted-values="headerValues" name="header" />
				<DxItem name="separator" />
				<DxItem name="bold" />
				<DxItem name="color" />
				<DxItem name="separator" />
				<DxItem name="alignLeft" />
				<DxItem name="alignCenter" />
				<DxItem name="alignRight" />
				<DxItem name="separator" />
				<DxItem name="insertTable" />
				<DxItem name="deleteTable" />
				<DxItem name="insertRowAbove" />
				<DxItem name="insertRowBelow" />
				<DxItem name="deleteRow" />
				<DxItem name="insertColumnLeft" />
				<DxItem name="insertColumnRight" />
				<DxItem name="deleteColumn" /> -->
				<DxItem style="color:#fff;" format-name="undo" title="Atras" />
				<DxItem format-name="redo" title="Adelante" />
				<!-- <DxItem format-name="separator" />
				<DxItem :format-values="headerValues" format-name="header" /> -->
				<DxItem format-name="separator" />
				<DxItem format-name="bold" />
				<DxItem format-name="italic" />
				<DxItem format-name="strike" />
				<DxItem format-name="underline" />
				<DxItem format-name="separator" />
				<DxItem format-name="alignLeft" />
				<DxItem format-name="alignCenter" />
				<DxItem format-name="alignRight" />
				<DxItem format-name="alignJustify" />
				<DxItem format-name="separator" />
				<DxItem format-name="orderedList" />
				<DxItem format-name="bulletList" />
				<DxItem format-name="separator" />
			</DxToolbar>
		</DxHtmlEditor>
	</div>
</template>
<script>
let root = null;
import { DxHtmlEditor, DxToolbar, DxItem } from "devextreme-vue/html-editor";

export default {
	components: {
		DxHtmlEditor,
		DxToolbar,
		DxItem,
	},
	props: {
		height: {
			type: Number,
			default: () => {
				return 350;
			},
		},
		syncObj: {
			type: Object,
			default: () => {
				return {};
			},
		},
		syncProp: {
			type: String,
			default: () => {
				return null;
			},
		},
	},
	computed: {
		markup1: function() {
			return "";
		},
	},
	data: () => {
		return {
			markup: "",
			headerValues: [false, 1, 2, 3],
		};
	},
	methods: {
		test() {
			console.clear();
			console.log("TEST!");
		},
		setMarkup(html) {
			// root.syncObj[root.syncProp] = html;
			root.markup = html;
		},
		valueChanged(e) {
			console.log("e =>", e);
			console.log("root.syncObj =>", root.syncObj);
			console.log("root.syncProp =>", root.syncProp);
			root.syncObj[root.syncProp] = e.value;
			// root.setMarkup(e.value);
		},
	},
	created() {
		root = this;
		root.markup = root.syncObj[root.syncProp];
	},
};
</script>
