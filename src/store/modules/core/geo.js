/* eslint-disable no-unused-vars */
// 202005070848: https://stackoverflow.com/a/48458134
// 202005071437: https://vuex.vuejs.org/guide/modules.html
// 202005071338: https://appdividend.com/2018/05/08/vuex-axios-get-request-tutorial-with-example
import api from "@/store/api";
import vuex from "vuex";
import vue from "vue";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		loading: false,
		countries: [],
	},
	actions: {
		getCountries({ commit, state }, cb) {
			if (state.countries.length <= 0) {
				api()
					.get("geo_countries")
					.then((r) => {
						state.countries = r.data;
						cb(r.data);
						// commit("setCountries", r.data);
					});
			} else cb(state.countries);
		},
		getStates({ commit, state }, args) {
			api()
				.get(`geo_countries/${args.country_id}/geo_states`)
				.then((r) => {
					args.cb(r.data);
				});
		},
		getCities({ commit, state }, args) {
			api()
				.get(`geo_states/${args.state_id}/geo_cities`)
				.then((r) => {
					args.cb(r.data);
				});
		},
	},
	mutations: {
		setCountries(state, data) {
			state.countries = data;
			console.log("PAISES", state.countries);
		},
	},
	getters: {
		countries: (state, getters) => {
			return state.countries;
		},
	},
};

export default store;
