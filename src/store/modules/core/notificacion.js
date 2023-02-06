/* eslint-disable no-unused-vars */
import api from "@/store/api";
import vuex from "vuex";
import vue from "vue";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		item: null,
	},
	actions: {
		async verificar({ commit, state, dispatch }, args) {
			return await api()
				.post(`notifications/health_check`, { notification: { to: args.to, cc: typeof args.cc !== "undefined" ? args.cc : null } })
				.then((r) => {
					return r.data;
				});
		},
		async enviar({ commit, state, dispatch }, args) {
			let not = {
				to: args.to,
				subject: args.subject,
				body: args.body,
			};
			if (typeof args.cc !== "undefined") not["cc"] = args.cc;
			return await api("rest", { hide_errors: true })
				.post(`notifications`, { notification: not })
				.then((r) => {
					return r.data;
				})
				.error((r) => {
					return r.data;
				});
		},
	},
};

export default store;
