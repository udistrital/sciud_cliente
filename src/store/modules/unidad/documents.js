/* eslint-disable no-unused-vars */
import vuex from "vuex";
import vue from "vue";
import api from "@/store/api";
vue.use(vuex);

// Store
const store = {
	namespaced: true,
	state: {
		items: [],
	},
	
    actions: {
        
		save({ commit, state, dispatch }, args) {
			console.log("CREATE!");
            let url=args.url;
            let objSen=args.obj;
			api()
				.post(url, objSen)
				.then((r) => {
					args.cb(r.data);
				});
		},
		update({ commit, state, dispatch }, args) {
			console.log("UPDATE!");
            let url=args.url;
            let objSen=args.obj;
            console.log("UPDATE!",objSen);
			api()
				.put(url, objSen)
				.then((r) => {
					args.cb(r.data);
				});
		},
		active({ commit, state, dispatch }, args) {
			console.log("Indica si el archivo esta activado", args);
            let url=args.url;
            let objSen=args.obj;
			api()
				.put(url, objSen)
				.then((r) => {
					console.log("Guardado", r.data);
					return this._vm.$isFunction(args.cb) ? args.cb(r.data) : null;
				});
		},
		documents({ commit, state, dispatch }, args) {
            let url=args.url;
            // let objSen=args.obj;
			api()
				.get(url)
				.then((r) => {
					console.log("Guardado", r.data);
					return this._vm.$isFunction(args.cb) ? args.cb(r.data) : null;
				});
		},
	},

	mutations: {
		SetData(state, data) {
			// for (let x = 0; x < data.length; x++) {
			// 	let o = data[x];
			// 	if (o.avance !== null) o.avance = o.avance.toString().replace(".", ",") + "%";
			// }
			state.items = data;
		},
	},
	
    getters: {
		items: (state, getters) => {
			return state.items;
		},
		item: (state, getters) => (id) => {
			if (state.items.length > 0) {
				let item = state.items.find((o) => o.id.toString() === id.toString());
				return item;
			}
		},
	},

};

export default store;
