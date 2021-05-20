<template>
    <span class="new-style">
    <DxHtmlEditor :value.sync="syncValue.observation" :placeholder="placeholder" :height="250" :max-length="400"  >
		<DxToolbar>
			<DxItem style="color:#fff;" format-name="undo" title="Atras" />
			<DxItem format-name="redo" title="Adelante" />
			<DxItem format-name="separator"/>
			<DxItem :format-values="headerValues" format-name="header" />
			<DxItem format-name="separator"/>
			<DxItem format-name="bold"/>
			<DxItem format-name="italic"/>
			<DxItem format-name="strike"/>
			<DxItem format-name="underline"/>
			<DxItem format-name="separator"/>
			<DxItem format-name="alignLeft"/>
			<DxItem format-name="alignCenter"/>
			<DxItem format-name="alignRight"/>
			<DxItem format-name="alignJustify"/>
            <DxItem format-name="separator"/>
            <DxItem format-name="orderedList"/>
            <DxItem format-name="bulletList"/>
            <DxItem format-name="separator"/>
		</DxToolbar>
	</DxHtmlEditor>
    </span>
</template>

<script>
    import { DxHtmlEditor,  DxToolbar,  DxItem } from 'devextreme-vue/html-editor';
    export default {
        components: {
            DxHtmlEditor,
            DxToolbar,
            DxItem,
        },
        props:{
            syncValue:{
                type: Object,
                default: () => {
                   return {observation : null,}; 
                }
            },
            placeholder:{
                type: String,
                default: () => "Digite en este espacio la observacion para este elemento."
            }
        },
        data: ()=>({
            popupVisible: false,
            sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
            fontValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
            headerValues: [false,  3, 4, 5],
        }),
    }
</script>

<style>
	.new-style .dx-button {
		background-color: #f5f5f5 !important;
	}
</style>