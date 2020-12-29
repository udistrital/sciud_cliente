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
					<span v-if="user">Usuario: {{ user.complete_name }}<br /></span>
					Fecha y hora: {{ date }}</span
				>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapGetters } from "vuex";
export default {
	name: "globalHeader",
	components: {},
	data: () => ({
		some: "thing",
	}),
	methods: {
		...mapActions("auth", ["setData"]),
	},
	created() {
		console.log("user", this.user);
		console.log("authenticated", this.authenticated);
		// if (this.authenticated && this.user === null) {
		// 	console.log("this.setData()!");
		// 	this.setData();
		// }
	},
	computed: {
		name: function() {
			return this.$getFormattedDate();
		},
		date: function() {
			return this.$getFormattedDate();
		},
	},
};
</script>
