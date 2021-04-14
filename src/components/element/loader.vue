<template>
	<div>
		<DxLoadPanel
			:close-on-outside-click="false"
			:indicator-src="this.imgUrl + '/loader.gif'"
			:message="message"
			:position="position"
			:on-showing="onShowing"
			:on-shown="onShown"
			:on-hidden="onHidden"
			:shading="true"
			:show-indicator="true"
			:show-pane="false"
			:visible.sync="visible"
			class="main"
		/>
		<!-- :visible.sync="visible" -->
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
let $ = window.jQuery;
import { DxLoadPanel } from "devextreme-vue/load-panel";
export default {
	components: {
		DxLoadPanel,
	},
	mounted() {},
	data: () => ({
		visible: false,
		message: "Cargando",
		position: { of: ".card-body" },
	}),
	watch: {
		$loader(obj) {
			// console.log(window.vm.$sep);
			// console.log("$loader changed!", obj);
			if (obj.visible) {
				this.position = { of: obj.element };
				this.onShowing();
				this.visible = true;
			} else {
				this.visible = false;
			}
		},
	},
	methods: {
		onShown(e) {
			// var w = $(".dx-loadpanel-content:first").width();
			// var lp = $(".dx-loadpanel-wrapper");
			// var nb = $(".navbar-sticky.is_stuck");
			// var lpI = parseInt(lp.css("z-index"));
			// var nbI = parseInt(nb.css("z-index"));
			// nb.css("z-index", (lpI + 1).toString());
			// let ovl = $(".dx-overlay-content:first");
			// ovl.removeAttr("style").css("height", "auto !important");
			// console.log("ovl.height", ovl.height());
		},
		onHidden(e) {
			// console.log(window.vm.$sep);
			// console.log("onHidden!", e);
			// console.log("$loader", window.vm.$loader);
		},
		onShowing(e) {
			let msg = this.$loader.message + "<small>Un momento por favor...</small>";
			var tgt = $(".dx-loadpanel-message:first");
			tgt.html(msg);
		},
	},
};
</script>
