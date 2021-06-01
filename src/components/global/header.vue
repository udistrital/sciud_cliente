<template>
	<div class="navbar navbar-expand-md border-transparent shadow-0 bg-white">
		<div class="head navbar-collapse">
			<div class="navbar-brand wmin-0 mr-5">
				<router-link to="/" class="d-inline-block">
					<img :src="imgUrl + '/logo.png'" alt="SICIUD v2.0" />
				</router-link>
			</div>
			<div id="navbar-mobile" class="collapse navbar-collapse d-flex justify-content-end text-right">
				<span class="font-weight-semibold color-main-500">
					<span v-if="user && user.local">{{ user_complete_name }} ({{ user.local.user_role_name }})<br /></span>
					Fecha y hora: {{ date }}</span
				>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
let root = null;
import { mapActions, mapGetters } from "vuex";
export default {
	name: "globalHeader",
	components: {},
	data: () => ({
		date: null,
		timer: null,
	}),
	methods: {
		...mapActions("auth/login", ["authLogout"]),
	},
	computed: {
		...mapGetters("auth/login", ["authenticated", "oasTokenExp", "oasTokenExpAt"]),
	},
	mounted() {
		// 202011142222:
		this.$global();
		root.date = this.$getFormattedDate();
		root.timer = setInterval(function() {
			// console.log(root.$sep);
			let expCr = new Date();
			root.date = root.$getFormattedDate(expCr);
			if (root.authenticated) {
				// console.log("oasTokenExp", root.oasTokenExp);
				// console.log("oasTokenExpAt", root.oasTokenExpAt);
				let expDf = new Date(root.oasTokenExpAt);
				// console.log("expDf", root.$getFormattedDate(expDf));
				// 202106010035: Add one minute
				// https://stackoverflow.com/a/8036135
				expDf.setTime(expDf.getTime() + 1 * 60000);
				// console.log("expCr", root.date);
				// console.log("expDf", root.$getFormattedDate(expDf));
				if (expDf < expCr)
					root.authLogout(function() {
						// window.location.reload();
						root.$router.push("/inicio");
					});
			}
			// console.log("TIMER => src/components/global/header.vue =>", root.date);
		}, 5000);
	},
	created() {
		root = this;
	},
};
</script>
