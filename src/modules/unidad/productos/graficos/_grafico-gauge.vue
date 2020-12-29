<template>
  <DxChart id="chart" :data-source="dataSource" palette="Soft">
    <DxCommonSeriesSettings
      :ignore-empty-points="true"
      argument-field="type"
      value-field="number"
      type="bar"
    />
    <DxExport :enabled="true" />
    <DxSeriesTemplate name-field="type" />
    <DxTitle text="Productos" subtitle="Generación de Nuevo Conocimiento" />
  </DxChart>
</template>
<script>
import {
  DxChart,
  DxSeriesTemplate,
  DxCommonSeriesSettings,
  DxTitle,
  DxExport,
} from "devextreme-vue/chart";

export default {
  components: {
    DxChart,
    DxSeriesTemplate,
    DxCommonSeriesSettings,
    DxTitle,
    DxExport,
  },
  data() {
    return {
      dataSource: [
        { type: "Libros", number: 17 },
        { type: "Revistas", number: 11 },
        { type: "capitulos", number: 5 },
        { type: "patentes", number: 2 },
        { type: "Var. Animal", number: 1 },
        { type: "Var. Vegetal", number: 0 },
        { type: "Poblaciones", number: 1 },
        { type: "Obras", number: 1 },
      ],
    };
  },
};
</script>
<style>
#chart {
  height: 440px;
}
</style>