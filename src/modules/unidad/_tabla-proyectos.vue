<template>
	<div>
		<div class="row">
			<div class="card-body">
				<DxDataGrid
					class="main"
					:data-source="items"
					:remote-operations="false"
					:allow-column-reordering="true"
					:row-alternation-enabled="true"
					:show-borders="false"
				>
					<DxPaging :page-size="5" />
					<DxGroupPanel :visible="true" />
					<DxGrouping :auto-expand-all="true" />
					<DxPager :show-page-size-selector="true" :allowed-page-sizes="pageSizes" :show-info="true" />
					<DxColumn data-field="Numero" caption="Numero" data-type="string" alignment="center" />
					<DxColumn data-field="Convocatoria" caption="Convocatoria" data-type="string" alignment="center" />
					<DxColumn data-field="Nombre" caption="Nombre del Proyecto" data-type="string" />

					<DxColumn data-field="Accion" caption="Accion" data-type="string" alignment="center" />
				</DxDataGrid>
			</div>
		</div>
	</div>
</template>

<script>
import { DxDataGrid, DxColumn, DxPager, DxPaging, DxGrouping, DxGroupPanel } from 'devextreme-vue/data-grid';

import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'TablaProyectos',
	components: {
		DxDataGrid,
		DxColumn,
		DxPager,
		DxPaging,
		DxGrouping,
		DxGroupPanel,
	},
	data() {
		return {
			opt: false,
			pageSizes: [5, 10, 20],
		};
	},
	computed: {
		...mapGetters('planProyectos', ['items']),
	},
	methods: {
		onContentReady() {
			window.jQuery('.commands a').click(function() {
				console.log('Come on lets show the dropdown!!');
			});
			// console.log("onContentReady!");
		},
		...mapActions('planProyectos', ['all']),
	},

	mounted() {
		this.all();
	},
};
</script>
