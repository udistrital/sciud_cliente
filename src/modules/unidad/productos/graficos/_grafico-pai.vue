<template>
  <DxPieChart
    id="pie"
    :data-source="populationByRegions"
    type="doughnut"
    title="Pruduccion"
    palette="Material"
  >
    <DxSeries argument-field="region">
      <DxLabel :visible="true" format="decimal">
        <DxConnector :visible="true" />
      </DxLabel>
    </DxSeries>
    <DxExport :enabled="true" />
    <DxLegend
      :margin="0"
      horizontal-alignment="center"
      vertical-alignment="bottom"
    />
    <DxTooltip :enabled="true" :customize-tooltip="customizeTooltip">
      <DxFormat type="decimal" />
    </DxTooltip>
  </DxPieChart>
</template>
<script>
import DxPieChart, {
  DxLegend,
  DxSeries,
  DxTooltip,
  DxFormat,
  DxLabel,
  DxConnector,
  DxExport,
} from "devextreme-vue/pie-chart";

export default {
  components: {
    DxPieChart,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxFormat,
    DxLabel,
    DxConnector,
    DxExport,
  },
  data() {
    return {
      populationByRegions: [
        {
          region: "Generación de Nuevo Conocimiento",
          val: 80,
        },
        {
          region: "Formación de Recurso Humano para la CTeI",
          val: 12,
        },
        {
          region: "Apropiación Social del Conocimiento",
          val: 7,
        },
        {
          region: "Desarrollo tecnologico e Innovacion",
          val: 1,
        },
      ],
    };
  },
  methods: {
    customizeTooltip({ valueText, percent }) {
      return {
        text: `${valueText} - ${(percent * 100).toFixed(1)}%`,
      };
    },
  },
};
</script>
<style>
#pie {
  height: 440px;
}
</style>
