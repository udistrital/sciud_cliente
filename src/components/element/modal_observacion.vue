<template>
    <DxPopup :visible="data" :drag-enabled="false" :close-on-outside-click="false" :show-title="true" width="60%" height="300" title="Observación:">
        <div class="row">
            <div class="col">
                <h3>
                    <i class="icon-info mr-1 color-main-600"></i>
                    <span class="font-weight-semibold">{{title}}</span>
                </h3>
                <div style="overflow-y: scroll; height:120px" v-html="observarData"></div>
            </div>
        </div>
        <div class="row">
            <div class="col"><hr>
                <DxButton @click= "data=false" class="nb">
                    <template #default>
                        <span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
                            <b><i class="icon-database-remove"></i></b> Salir
                        </span>
                    </template>
                </DxButton>
            </div>
        </div>
    </DxPopup>
</template>

<script>
import {DxPopup, DxButton } from "devextreme-vue";
export default {
    components: { DxPopup, DxButton },
    props:{
        data: Boolean,
        title:{
            type:String,
            default: () => "no Existe un Titulo Asignado al Componente...",
        },
        observarData: {
            type: String,
            default: ()=> '<font style="color:red;"><smal>No existe alguna observacion visible, verifique la propiedad e intente de nuevo.</smal></font>'
        },
    },
    data:()=>({
        mostrar: false,
    }),
    
}
</script>
