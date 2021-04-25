<template>
	<DxPopup :visible="popupVisible" :drag-enabled="false" :close-on-outside-click="false" :show-title="true" width="90%" height="90%" title="Documento">
		<iframe :src="docLink" title="Documento"></iframe>
	</DxPopup>
</template>

<script>
import { DxPopup } from "devextreme-vue";
export default {
	components: {
		DxPopup,
	},
};
</script>

<style></style>
