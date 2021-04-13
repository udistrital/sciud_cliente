<template>
	<div class="row divider">
		<div class="col subtab pb-1">
			CTEL
		</div>
	</div>
</template>
<script>
let root;
export default {
	name: "datosBasicos",
	components: {},
	mounted() {
		root = this;
		console.log("root", root);
	},
	props: {
		editMode: {
			type: Boolean,
			default: true,
		},
		group: {
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
	},
	methods: {
		some() {
			console.log("SOME!");
		},
	},
};
</script>
