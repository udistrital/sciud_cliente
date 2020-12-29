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
let $ = window.jQuery;
import { DxLoadPanel } from "devextreme-vue/load-panel";
export default {
	components: {
		DxLoadPanel,
	},
	mounted() {
		console.log("LOADER MOUNTED!!!");
	},
	data: () => ({
		visible: false,
		message: "Cargando",
		position: { of: ".card-body" },
	}),
	watch: {
		$loader(obj) {
			console.log("WATCH $loader CHANGED!!");
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
		onShown() {
			console.clear();
			var w = window.jQuery(".dx-loadpanel-content:first").width();
			console.log("w", w);
			var lp = $(".dx-loadpanel-wrapper");
			var nb = $(".navbar-sticky.is_stuck");
			var lpI = parseInt(lp.css("z-index"));
			var nbI = parseInt(nb.css("z-index"));
			console.log("lp zindex", lpI);
			console.log("nb zindex", nbI);
			nb.css("z-index", (lpI + 1).toString());
			console.log(nb.css("z-index"));
			console.log("onShown!");
			console.log("SHOWN!");
			setTimeout(() => {
				this.visible = false;
			}, 3000);
		},
		onHidden() {
			// console.log("onHidden!");
		},
		onShowing() {
			// console.log("this.$loader", this.$loader);
			let msg = this.$loader.message + "<small>Un momento por favor...</small>";
			var tgt = window.jQuery(".dx-loadpanel-message:first");
			// console.log("tgt", tgt);
			// console.log("onShowing!", msg);
			// setTimeout(function() {
			tgt.html(msg);
			// }, 20);
		},
	},
};
</script>
