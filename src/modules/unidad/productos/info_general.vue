<template>
<div class="card-body mb-0 pb-0 pt-2">
  <div class="row">
    <p>En esta seccion se encuentran las graficas que indican el avance en cada una de las etapas de produccion en el grupo o semillero de investigacion. </p>
    <div class="col-md-6">
        <DxPieChart
        :data-source="dataSource"
        :resolve-label-overlapping="resolveMode"
        palette="Bright"
        title="<h2>Nuevo Conocimiento<h2>"
        >
        <DxSeries
            argument-field="productos"
            value-field="cantidad"
        >
            <DxLabel
            :visible="true"
            :customize-text="formatText"
            />
        </DxSeries>
        <DxMargin :bottom="10"/>
        <DxExport :enabled="true"/>
        <DxLegend :visible="true"/>
        <DxAnimation :enabled="true"/>
        </DxPieChart>
    </div>

    
    <div class="col-md-6">
        <DxPieChart
        :data-source="dataSource2"
        :resolve-label-overlapping="resolveMode"
        palette="Bright"
        title="Desarrollo Tecnólogico"
        >
        <DxSeries
            argument-field="productos"
            value-field="cantidad"
        >
            <DxLabel
            :visible="true"
            :customize-text="formatText"
            />
        </DxSeries>
        <DxMargin :bottom="10"/>
        <DxExport :enabled="true"/>
        <DxLegend :visible="true"/>
        <DxAnimation :enabled="true"/>
        </DxPieChart>
    </div>

    <div class="col-md-6">
        <DxPieChart
        :data-source="dataSource"
        :resolve-label-overlapping="resolveMode"
        palette="Bright"
        title="Apropiación Social"
        >
        <DxSeries
            argument-field="productos"
            value-field="cantidad"
        >
            <DxLabel
            :visible="true"
            :customize-text="formatText"
            />
        </DxSeries>
        <DxMargin :bottom="10"/>
        <DxExport :enabled="true"/>
        <DxLegend :visible="true"/>
        <DxAnimation :enabled="true"/>
        </DxPieChart>
    </div>

    <div class="col-md-6">
        <DxPieChart
        :data-source="dataSource"
        :resolve-label-overlapping="resolveMode"
        palette="Bright"
        title="Formación Recurso Humano"
        >
        <DxSeries
            argument-field="productos"
            value-field="cantidad"
        >
            <DxLabel
            :visible="true"
            :customize-text="formatText"
            />
        </DxSeries>
        <DxMargin :bottom="10"/>
        <DxExport :enabled="true"/>
        <DxLegend :visible="true"/>
        <DxAnimation :enabled="true"/>
        </DxPieChart>
    </div>


  </div>
</div>
</template>

<script>
import DxPieChart, {
  DxSeries,
  DxLabel,
  DxMargin,
  DxExport,
  DxLegend,
  DxAnimation
} from 'devextreme-vue/pie-chart';
// import DxSelectBox from 'devextreme-vue/select-box';

// export const dataSource = [{
//   productos: 'Libros Formacion',
//   cantidad: 40
// }, {
//   productos: 'Articulos',
//   cantidad: 2
// }, {
//   productos: 'Libros',
//   cantidad: 10
// }];


export default {
  components: {
    DxPieChart,
    DxSeries,
    DxLabel,
    DxMargin,
    DxExport,
    DxLegend,
    DxAnimation,
    // DxSelectBox
  },
  data() {
    return {
      dataSource:[{
        productos: 'Libros Formacion',
        cantidad: 40
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Articulos',
        cantidad: 2
        }, {
        productos: 'Libros',
        cantidad: 10
        }],

     dataSource2:[{
        productos: 'Acto legislativo',
        cantidad: 20
        }, {
        productos: 'Coleccion cientifica',
        cantidad: 2
        }, {
        productos: 'Conceptos Tecnicos',
        cantidad: 10
        }, {
        productos: 'Diseño Industrial',
        cantidad: 1
        }],
      resolveMode: 'shift',
    };
  },
  methods: {
    formatText(pointInfo) {
      return `${pointInfo.argumentText} (${pointInfo.percentText})`;
    }
  }
};
</script>

<style>
.options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    margin-top: 20px;
}

.option {
    margin-top: 10px;
}

.caption {
    font-size: 18px;
    font-weight: 500;
}

.option > span {
    margin-right: 14px;
}

.option > .dx-widget {
    display: inline-block;
    vertical-align: middle;
}
</style>
