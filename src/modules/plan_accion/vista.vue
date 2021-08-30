<template>
    <div>
        <div class="page-header header-elements-md-inline" id="panel-unidades-head">
			<div class="page-title d-flex">
				<h1>
					<i class="icon-eye2 mr-1 color-main-600"></i>
					<span class="font-weight-semibold" id="title">Vista Impresión</span>
					<span id="msg"> &raquo; Plan de Acción</span>
				</h1>
				<a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
			</div>

            

            
			<!-- <div class="header-elements" v-if="es_admin"> -->
            <div class="header-elements" v-if="true">
				<router-link tag="a" :to="'/unidad/'+$route.params.unidadId+'/plan_accion'" class="btn btn-main btn-labeled btn-labeled-left legitRipple" title="regresar al Listado">
					<b><i class="icon-database-remove"></i></b> Regresar al Listado
				</router-link>

                <a
					href="#"
					@click="download"
					title="Volver a Unidades..."
					class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2">
					<b><i class="icon-file-pdf"></i></b> Vista de Impresión
				</a>

                <a
					href="#"
					@click="print"
					title="Volver a Unidades..."
					class="btn btn-sm btn-main btn-labeled btn-labeled-left legitRipple ml-2">
					<b><i class="icon-file-pdf"></i></b> Vista de Impresión
				</a>

			</div>

		</div>

        <div class="row">
			<div class="col">
                        

                        <vue-html2pdf
                            :show-layout="false"
                            :float-layout="true"
                            :enable-download="false"
                            :preview-modal="true"
                            :paginate-elements-by-height="1400"
                            :filename="datax"
                            :pdf-quality="2"
                            :manual-pagination="false"
                            pdf-format="legal"
                            pdf-orientation="portrait"
                            pdf-content-width="98%"
                            ref="html2Pdf"
                        >
<!--                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       -->
                            <section slot="pdf-content">

                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <table width="100%" border="0">
                                            <thead>
                                                <tr>
                                                    <th rowspan="3"><center><img :src="imgUrl + '/escudo.png'" alt="UDis" width="95" /></center></th>
                                                    <th><center>PLAN DE ACCIÓN ANUAL DE GRUPO Y/O SEMILLERO DE <br>INVESTIGACIÓN-CREACIÓN E iNNOVACIÓN</center></th>
                                                    <th rowspan="3"><center><img :src="imgUrl + '/sigud.png'" alt="UDis" width="150" /></center></th>
                                                </tr>
                                                <tr>
                                                    <td align="center">Macoproceso: Gestión Académica</td>
                                                </tr>
                                                <tr>
                                                    <td align="center">Proceso: Gestión de Investigación</td>
                                                </tr>
                                            </thead>
                                        </table> 
                                    </div>
                                </div>	
                                <br />

                                <table border="0">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div class="row">
                                                    <div class="col-md-12 mt-3">                                       
                                                                <fieldset>
                                                                    <legend>1.0 Información Básica</legend>
                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <div class="row">
                                                                                    <div class="col-md-12">
                                                                                        <strong>Grupo de Investigación o Semillero: </strong>{{group.name}}
                                                                                    </div>
                                                                                    <div class="col-md-12">
                                                                                        <strong>Fecha de Registro Grupo:</strong> {{group.cidc_registration_date}}
                                                                                    </div>
                                                                                    <div class="col-md-12">
                                                                                        <strong>Codigo Colciencias: </strong>{{group.colciencias_code}}
                                                                                    </div>
                                                                                    <div class="col-md-12">
                                                                                        <strong>Enlace GrupLac (SIENTI):</strong> <a :href="group.gruplac" target="_blank">{{group.gruplac}}</a>
                                                                                    </div>
                                                                                    
                                                                                    <div class="col-md-12">
                                                                                        <strong>Correo de Contácto:</strong> <a :href="'mailto:'+group.email" target="_blank">{{group.email}}</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </fieldset>
                                                    </div>
                                                </div>							


                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                            <legend>Proceso de Formación para la Investigación/Investigación Formativa</legend>
                                                           
                                                                <div class="p-0">
                                                <!-- @content-ready="onContentReady" -->
                                                <DxDataGrid
                                                    class="main"
                                                    width="100%"
                                                    @initialized="gridInit"
                                                    
                                                    :allow-column-reordering="true"
                                                    no-data-text="No hay elementos registrados"
                                                    :data-source="dataSource"
                                                    :remote-operations="true"
                                                    :hover-state-enabled="true"
                                                    :row-alternation-enabled="true"
                                                    :word-wrap-enabled="true"
                                                    :show-borders="false"
                                                >
                                                    <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
                                                    <DxSorting mode="single" /><!-- single, multiple, none" -->
                                                    <DxPaging :page-size="10" />
                                                    <DxFilterRow :visible="false" />
                                                    <DxLoadPanel :enabled="false" />
                                                    <DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
                                                    <DxGrouping :auto-expand-all="false" />
                                                    <DxSummary>
                                                        <DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
                                                    </DxSummary>
                                                    <DxPager
                                                        :show-info="true"
                                                        :show-page-size-selector="true"
                                                        :show-navigation-buttons="true"
                                                        :allowed-page-sizes="dgPageSizes"
                                                        info-text="Página {0} de {1} ({2} elementos)"
                                                    />
                                                    <DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
                                                    <!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

                                                    <DxColumn :width="60" data-field="id"  caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
                                                    <DxColumn data-field='indicator_product_type_name'  caption='Tipo ' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                    <DxColumn data-field='indicator_description'  caption='Indicador de Existencia' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                    <DxColumn data-field='goal'  caption='Meta' data-type='String' alignment='center' :visible='true' :allow-grouping='false' /> 
                                                </DxDataGrid>
                                            </div>
                                                            
                                                        </fieldset>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                            <legend>Proyecto de Investigación en el Periodo Anual</legend>
                                                            <div class="p-0">
                                                                <!-- @content-ready="onContentReady" -->
                                                                <DxDataGrid
                                                                    class="main"
                                                                    width="100%"
                                                                    @initialized="gridInit"
                                                                    
                                                                    :allow-column-reordering="true"
                                                                    no-data-text="No hay elementos registrados"
                                                                    :data-source="dataSource2"
                                                                    :remote-operations="true"
                                                                    :hover-state-enabled="true"
                                                                    :row-alternation-enabled="true"
                                                                    :word-wrap-enabled="true"
                                                                    :show-borders="false"
                                                                >
                                                                    <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
                                                                    <DxSorting mode="single" /><!-- single, multiple, none" -->
                                                                    <DxPaging :page-size="10" />
                                                                    <DxFilterRow :visible="false" />
                                                                    <DxLoadPanel :enabled="false" />
                                                                    <DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
                                                                    <DxGrouping :auto-expand-all="false" />
                                                                    <DxSummary>
                                                                        <DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
                                                                    </DxSummary>
                                                                    <DxPager
                                                                        :show-info="true"
                                                                        :show-page-size-selector="true"
                                                                        :show-navigation-buttons="true"
                                                                        :allowed-page-sizes="dgPageSizes"
                                                                        info-text="Página {0} de {1} ({2} elementos)"
                                                                    />
                                                                    <DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
                                                                    <!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

                                                                    <DxColumn :width="60" data-field="id"  caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
                                                                    <DxColumn data-field='financing_type_name'  caption='Tipo ' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn data-field='description'  caption='Indicador de Existencia' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn data-field='goal_state_name'  caption='Meta' data-type='String' alignment='center' :visible='true' :allow-grouping='false' /> 

                                                                </DxDataGrid>
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                            <legend>Productos Resultado de Procesos de Investigación Creacion e Innovación a Generar para el Periodo Anual</legend>
                                                             <div class="p-0">
                                                                <!-- @content-ready="onContentReady" -->
                                                                <DxDataGrid
                                                                    class="main"
                                                                    width="100%"
                                                                    @initialized="gridInit"
                                                                    
                                                                    :allow-column-reordering="true"
                                                                    no-data-text="No hay elementos registrados"
                                                                    :data-source="dataSource3"
                                                                    :remote-operations="true"
                                                                    :hover-state-enabled="true"
                                                                    :row-alternation-enabled="true"
                                                                    :word-wrap-enabled="true"
                                                                    :show-borders="false"
                                                                >
                                                                    <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
                                                                    <DxSorting mode="single" /><!-- single, multiple, none" -->
                                                                    <DxPaging :page-size="10" />
                                                                    <DxFilterRow :visible="false" />
                                                                    <DxLoadPanel :enabled="false" />
                                                                    <DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
                                                                    <DxGrouping :auto-expand-all="false" />
                                                                    <DxSummary>
                                                                        <DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
                                                                    </DxSummary>
                                                                    <DxPager
                                                                        :show-info="true"
                                                                        :show-page-size-selector="true"
                                                                        :show-navigation-buttons="true"
                                                                        :allowed-page-sizes="dgPageSizes"
                                                                        info-text="Página {0} de {1} ({2} elementos)"
                                                                    />
                                                                    <DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
                                                                    <!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

                                                                    <DxColumn :width="60" data-field="id"  caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
                                                                    <DxColumn data-field='indicator_product_type_name'  caption='Tipo ' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn data-field='indicator_description'  caption='Indicador de Existencia' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn data-field='goal'  caption='Meta' data-type='String' alignment='center' :visible='true' :allow-grouping='false' /> 
                                                                </DxDataGrid>
                                                            </div>
                                                        </fieldset>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                            <legend>Productos Con Potencialidad de Transferencia a prestar a la OTRI-Bogotá en el Periodo Anual </legend>
                                                            
                                                            <DxDataGrid
                                                                    class="main"
                                                                    width="100%"
                                                                    @initialized="gridInit"
                                                                    
                                                                    :allow-column-reordering="true"
                                                                    no-data-text="No hay elementos registrados"
                                                                    :data-source="dataSource4"
                                                                    :remote-operations="true"
                                                                    :hover-state-enabled="true"
                                                                    :row-alternation-enabled="true"
                                                                    :word-wrap-enabled="true"
                                                                    :show-borders="false"
                                                                >
                                                                    <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
                                                                    <DxSorting mode="single" /><!-- single, multiple, none" -->
                                                                    <DxPaging :page-size="10" />
                                                                    <DxFilterRow :visible="false" />
                                                                    <DxLoadPanel :enabled="false" />
                                                                    <DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
                                                                    <DxGrouping :auto-expand-all="false" />
                                                                    <DxSummary>
                                                                        <DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
                                                                    </DxSummary>
                                                                    <DxPager
                                                                        :show-info="true"
                                                                        :show-page-size-selector="true"
                                                                        :show-navigation-buttons="true"
                                                                        :allowed-page-sizes="dgPageSizes"
                                                                        info-text="Página {0} de {1} ({2} elementos)"
                                                                    />
                                                                    <DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
                                                                    <!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

                                                                    <DxColumn :width="60" data-field="id"  caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
                                                                    <DxColumn data-field='product_type_name'  caption='Tipo ' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn data-field='description'  caption='Indicador de Existencia' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn data-field='goal'  caption='Meta' data-type='String' alignment='center' :visible='true' :allow-grouping='false' /> 
                                                                </DxDataGrid>
                                                             

                                                        </fieldset>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                            <legend>Recursos con que cuenta el Grupo para el Desarrollo de las Actividades de Investigación</legend>
                                                            <DxDataGrid
                                                                    class="main"
                                                                    width="100%"
                                                                    @initialized="gridInit"
                                                                    
                                                                    :allow-column-reordering="true"
                                                                    no-data-text="No hay elementos registrados"
                                                                    :data-source="dataSource5"
                                                                    :remote-operations="true"
                                                                    :hover-state-enabled="true"
                                                                    :row-alternation-enabled="true"
                                                                    :word-wrap-enabled="true"
                                                                    :show-borders="false"
                                                                >
                                                                    <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
                                                                    <DxSorting mode="single" /><!-- single, multiple, none" -->
                                                                    <DxPaging :page-size="10" />
                                                                    <DxFilterRow :visible="false" />
                                                                    <DxLoadPanel :enabled="false" />
                                                                    <DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
                                                                    <DxGrouping :auto-expand-all="false" />
                                                                    <DxSummary>
                                                                        <DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
                                                                    </DxSummary>
                                                                    <DxPager
                                                                        :show-info="true"
                                                                        :show-page-size-selector="true"
                                                                        :show-navigation-buttons="true"
                                                                        :allowed-page-sizes="dgPageSizes"
                                                                        info-text="Página {0} de {1} ({2} elementos)"
                                                                    />
                                                                    <DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
                                                                    <!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

                                                                    <DxColumn :width="60" data-field="id"  caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
                                                                    <DxColumn data-field='type_description'  caption='Tipo' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn data-field='description'  caption='Descripción' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn data-field="inventoried" caption="Inventariable" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="100" />
                                                                    <DxColumn data-field='inventory_plate'  caption='Placa' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                </DxDataGrid>
                                                            

                                                        </fieldset>
                                                    </div>
                                                </div>

                                                <div class="row" id="printMe">
                                                    <div class="col-md-12 mt-3">
                                                        <fieldset>
                                                            <legend>Redes Académicas de Promoción Científica y/o Artística</legend>
                                                          

                                                          <div class="card text-dark bg-light mb-12">
<div class="card-header dx-button-text" >Información</div>
  <div class="card-body">

  <div class="col-sm-12">
    <div class="card">
      <div class="card-body">
        <p class="card-text"><b>Nombre: </b>Ejemplo Nombre Proyecto</p>
        <p class="card-text"><b>Lineas de Investigación asociadas: </b>Sin datos</p>
        <p class="card-text"><b>Estado Estimado: </b>Presentado</p>
      </div>
    </div>
  </div>


</div>

  <div class="card-header dx-button-text">Areas del Conocimiento</div>
  <div class="card-body">


<div class="row">
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Discipinas OCDE:</h5>
        <p class="card-text">
            <ul>
                <li>Arte
                    <ul>
                        <li>Diseño </li>
                        <li>Otras Artes</li>
                    </ul>
                </li>

                <li>Historia y Arqueología
                    <ul>
                        <li>Arqueología </li>
                        <li>Historia de Colombia</li>
                    </ul>
                </li>
            </ul>
        </p>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">CINE</h5>
        <p class="card-text">Sin Datos.</p>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">SNIES</h5>
        <p class="card-text">Sin Datos.</p>
      </div>
    </div>
  </div>
</div>




  </div>
</div>



                                                        </fieldset>
                                                    </div>
                                                </div>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                            </section>
                        </vue-html2pdf>

            </div>
        </div>

        <div class="row">
			<div class="col">
                <div class="card" id="panel-plan-accion">
					<div class="card-body group-detail mh">
                        
                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                            <legend>Información Básica</legend>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <strong>Grupo de Investigación o Semillero: </strong>{{group.name}}
                                                        </div>
                                                        <div class="col-md-12">
                                                            <strong>Fecha de Registro Grupo:</strong> {{group.cidc_registration_date}}
                                                        </div>
                                                        <div class="col-md-12">
                                                            <strong>Codigo Colciencias: </strong>{{group.colciencias_code}}
                                                        </div>
                                                        <div class="col-md-12">
                                                            <strong>Enlace GrupLac (SIENTI):</strong> <a :href="group.gruplac" target="_blank">{{group.gruplac}}</a>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <strong>Fecha de Registro Grupo:</strong> {{group.cidc_registration_date}}
                                                        </div>
                                                        <div class="col-md-12">
                                                            <strong>Correo de Contácto:</strong> <a :href="'mailto:'+group.email" target="_blank">{{group.email}}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>							


                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                            <legend>Proceso de Formación para la Investigación/Investigación Formativa</legend>
                                            
                                            <div class="p-0">
                                                <!-- @content-ready="onContentReady" -->
                                                <DxDataGrid
                                                    class="main"
                                                    width="100%"
                                                    @initialized="gridInit"
                                                    
                                                    :allow-column-reordering="true"
                                                    no-data-text="No hay elementos registrados"
                                                    :data-source="dataSource"
                                                    :remote-operations="true"
                                                    :hover-state-enabled="true"
                                                    :row-alternation-enabled="true"
                                                    :word-wrap-enabled="true"
                                                    :show-borders="false"
                                                >
                                                    <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
                                                    <DxSorting mode="single" /><!-- single, multiple, none" -->
                                                    <DxPaging :page-size="10" />
                                                    <DxFilterRow :visible="false" />
                                                    <DxLoadPanel :enabled="false" />
                                                    <DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
                                                    <DxGrouping :auto-expand-all="false" />
                                                    <DxSummary>
                                                        <DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
                                                    </DxSummary>
                                                    <DxPager
                                                        :show-info="true"
                                                        :show-page-size-selector="true"
                                                        :show-navigation-buttons="true"
                                                        :allowed-page-sizes="dgPageSizes"
                                                        info-text="Página {0} de {1} ({2} elementos)"
                                                    />
                                                    <DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
                                                    <!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

                                                    <DxColumn :width="60" data-field="id"  caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
                                                    <DxColumn :width="600" data-field='indicator_product_type_name'  caption='Tipo ' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                    <DxColumn data-field='indicator_description'  caption='Indicador de Existencia' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                    <DxColumn data-field='goal'  caption='Meta' data-type='String' alignment='center' :visible='true' :allow-grouping='false' /> 
                                                </DxDataGrid>
                                            </div>
                                            
                                        </fieldset>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                            <legend>Proyecto de Investigación en el Periodo Anual</legend>

                                             <div class="p-0">
                                                <!-- @content-ready="onContentReady" -->
                                                <DxDataGrid
                                                    class="main"
                                                    width="100%"
                                                    @initialized="gridInit"
                                                    
                                                    :allow-column-reordering="true"
                                                    no-data-text="No hay elementos registrados"
                                                    :data-source="dataSource2"
                                                    :remote-operations="true"
                                                    :hover-state-enabled="true"
                                                    :row-alternation-enabled="true"
                                                    :word-wrap-enabled="true"
                                                    :show-borders="false"
                                                >
                                                    <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
                                                    <DxSorting mode="single" /><!-- single, multiple, none" -->
                                                    <DxPaging :page-size="10" />
                                                    <DxFilterRow :visible="false" />
                                                    <DxLoadPanel :enabled="false" />
                                                    <DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
                                                    <DxGrouping :auto-expand-all="false" />
                                                    <DxSummary>
                                                        <DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
                                                    </DxSummary>
                                                    <DxPager
                                                        :show-info="true"
                                                        :show-page-size-selector="true"
                                                        :show-navigation-buttons="true"
                                                        :allowed-page-sizes="dgPageSizes"
                                                        info-text="Página {0} de {1} ({2} elementos)"
                                                    />
                                                    <DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
                                                    <!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

                                                    <DxColumn :width="60" data-field="id"  caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
                                                    <DxColumn data-field='financing_type_name'  caption='Tipo ' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                    <DxColumn :width="600" data-field='description'  caption='Indicador de Existencia' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                    <DxColumn data-field='goal_state_name'  caption='Meta' data-type='String' alignment='center' :visible='true' :allow-grouping='false' /> 

                                                </DxDataGrid>
                                            </div>

                                        </fieldset>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                            <legend>Productos Resultado de Procesos de Investigación Creacion e Innovación a Generar para el Periodo Anual</legend>
                                            
                                             <div class="p-0">
                                                <!-- @content-ready="onContentReady" -->
                                                <DxDataGrid
                                                    class="main"
                                                    width="100%"
                                                    @initialized="gridInit"
                                                    
                                                    :allow-column-reordering="true"
                                                    no-data-text="No hay elementos registrados"
                                                    :data-source="dataSource3"
                                                    :remote-operations="true"
                                                    :hover-state-enabled="true"
                                                    :row-alternation-enabled="true"
                                                    :word-wrap-enabled="true"
                                                    :show-borders="false"
                                                >
                                                    <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
                                                    <DxSorting mode="single" /><!-- single, multiple, none" -->
                                                    <DxPaging :page-size="10" />
                                                    <DxFilterRow :visible="false" />
                                                    <DxLoadPanel :enabled="false" />
                                                    <DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
                                                    <DxGrouping :auto-expand-all="false" />
                                                    <DxSummary>
                                                        <DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
                                                    </DxSummary>
                                                    <DxPager
                                                        :show-info="true"
                                                        :show-page-size-selector="true"
                                                        :show-navigation-buttons="true"
                                                        :allowed-page-sizes="dgPageSizes"
                                                        info-text="Página {0} de {1} ({2} elementos)"
                                                    />
                                                    <DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
                                                    <!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

                                                    <DxColumn :width="60" data-field="id"  caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
                                                    <DxColumn :width="400" data-field='indicator_product_type_name'  caption='Tipo ' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                    <DxColumn data-field='indicator_description'  caption='Indicador de Existencia' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                    <DxColumn data-field='goal'  caption='Meta' data-type='String' alignment='center' :visible='true' :allow-grouping='false' /> 
                                                </DxDataGrid>
                                            </div>

                                        </fieldset>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                            <legend>Productos Con Potencialidad de Transferencia a prestar a la OTRI-Bogotá en el Periodo Anual </legend>

                                            <DxDataGrid
                                                                    class="main"
                                                                    width="100%"
                                                                    @initialized="gridInit"
                                                                    
                                                                    :allow-column-reordering="true"
                                                                    no-data-text="No hay elementos registrados"
                                                                    :data-source="dataSource4"
                                                                    :remote-operations="true"
                                                                    :hover-state-enabled="true"
                                                                    :row-alternation-enabled="true"
                                                                    :word-wrap-enabled="true"
                                                                    :show-borders="false"
                                                                >
                                                                    <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
                                                                    <DxSorting mode="single" /><!-- single, multiple, none" -->
                                                                    <DxPaging :page-size="10" />
                                                                    <DxFilterRow :visible="false" />
                                                                    <DxLoadPanel :enabled="false" />
                                                                    <DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
                                                                    <DxGrouping :auto-expand-all="false" />
                                                                    <DxSummary>
                                                                        <DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
                                                                    </DxSummary>
                                                                    <DxPager
                                                                        :show-info="true"
                                                                        :show-page-size-selector="true"
                                                                        :show-navigation-buttons="true"
                                                                        :allowed-page-sizes="dgPageSizes"
                                                                        info-text="Página {0} de {1} ({2} elementos)"
                                                                    />
                                                                    <DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
                                                                    <!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

                                                                    <DxColumn :width="60" data-field="id"  caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
                                                                    <DxColumn data-field='product_type_name'  caption='Tipo ' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn :width="600" data-field='description'  caption='Indicador de Existencia' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn data-field='goal'  caption='Meta' data-type='String' alignment='center' :visible='true' :allow-grouping='false' /> 
                                                                </DxDataGrid>
                                           
                                        </fieldset>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 mt-3">
                                        <fieldset>
                                            <legend>Recursos con que cuenta el Grupo para el Desarrollo de las Actividades de Investigación</legend>
                                            <DxDataGrid
                                                                    class="main"
                                                                    width="100%"
                                                                    @initialized="gridInit"
                                                                    
                                                                    :allow-column-reordering="true"
                                                                    no-data-text="No hay elementos registrados"
                                                                    :data-source="dataSource5"
                                                                    :remote-operations="true"
                                                                    :hover-state-enabled="true"
                                                                    :row-alternation-enabled="true"
                                                                    :word-wrap-enabled="true"
                                                                    :show-borders="false"
                                                                >
                                                                    <DxColumnChooser :enabled="totaCount > 0" mode="dragAndDrop" />
                                                                    <DxSorting mode="single" /><!-- single, multiple, none" -->
                                                                    <DxPaging :page-size="10" />
                                                                    <DxFilterRow :visible="false" />
                                                                    <DxLoadPanel :enabled="false" />
                                                                    <DxGroupPanel :visible="totaCount > 0" :allow-column-dragging="true" />
                                                                    <DxGrouping :auto-expand-all="false" />
                                                                    <DxSummary>
                                                                        <DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
                                                                    </DxSummary>
                                                                    <DxPager
                                                                        :show-info="true"
                                                                        :show-page-size-selector="true"
                                                                        :show-navigation-buttons="true"
                                                                        :allowed-page-sizes="dgPageSizes"
                                                                        info-text="Página {0} de {1} ({2} elementos)"
                                                                    />
                                                                    <DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
                                                                    <!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->

                                                                    <DxColumn :width="60" data-field="id"  caption="ID" data-type="text" alignment="center" :visible="true" :allow-grouping="false" />
                                                                    <DxColumn data-field='type_description'  caption='Tipo' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn data-field='description'  caption='Descripción' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                    <DxColumn data-field="inventoried" caption="Inventariable" data-type="date" alignment="center" :visible="true" :customize-text="yesNo" width="100" />
                                                                    <DxColumn data-field='inventory_plate'  caption='Placa' data-type='String' alignment='left' :visible='true' :allow-grouping='false' /> 
                                                                </DxDataGrid>
                                                            
                                        </fieldset>
                                    </div>
                                </div>

                                <br />

                                <div class="row">
                                    <div class="col-md-12">
                                        <fieldset>
                                            <legend>Redes Académicas de Promoción Científica y/o Artística</legend>
                                            
                                            
<div class="card text-dark bg-light mb-12">
<div class="card-header dx-button-text">Información</div>
  <div class="card-body">

  <div class="col-sm-12">
    <div class="card">
      <div class="card-body">
        <p class="card-text"><b>Nombre: </b>Ejemplo Nombre Proyecto</p>
        <p class="card-text"><b>Lineas de Investigación asociadas: </b>Sin datos</p>
        <p class="card-text"><b>Estado Estimado: </b>Presentado</p>
      </div>
    </div>
  </div>


</div>

  <div class="card-header dx-button-text">Areas del Conocimiento</div>
  <div class="card-body">


<div class="row">
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Discipinas OCDE:</h5>
        <p class="card-text">
            <ul>
                <li>Arte
                    <ul>
                        <li>Diseño </li>
                        <li>Otras Artes</li>
                    </ul>
                </li>

                <li>Historia y Arqueología
                    <ul>
                        <li>Arqueología </li>
                        <li>Historia de Colombia</li>
                    </ul>
                </li>
            </ul>
        </p>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">CINE</h5>
        <p class="card-text">Sin Datos.</p>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">SNIES</h5>
        <p class="card-text">Sin Datos.</p>
      </div>
    </div>
  </div>
</div>


  </div>
</div>




                                            

                                         </fieldset>   
                                    </div>
                                </div>


                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root;
import { mapActions, mapGetters, mapState } from "vuex";
import DxStore from "@/store/dx";
import {
	DxColumn,
	DxColumnChooser,
	DxDataGrid,
	DxFilterRow,
	DxGroupItem,
	DxGroupPanel,
	DxGrouping,
	DxLoadPanel,
	DxPager,
	DxPaging,
	DxSearchPanel,
	DxSorting,
	DxSummary,
} from "devextreme-vue/data-grid";
import VueHtml2pdf from 'vue-html2pdf'


export default {
	created: function() {
		root = this;
		root.getUnit({
			id: root.$route.params.unidadId,
			cb: function(result) {
				root.group = result;
				document.title += ` ${root.$titleCase(root.group.name)}`;
				root.loadMembers();
			},
		});
	},
	data: () => ({

        popupObs: false,
		observarData: "",
		editData: null, //sirve para dejar formulario en limpio o llenar datos
		tipoproceso:[],
		grid: null,
		mode: null,
		unidad: null,
		section: null,
		tipos: 781,
		totaCount: 0,
		isValid: false,
		panelData: null,
		panelGrid: null,
		panelParticipantes: null,
		panelDocs: null,
		panelCmds: null,
		baseEntity: null,
		docLink: null,
		firstLoad: true,


		group: null,
		// dataSource: data,
        html2PdfOptions: {
        enableLinks: true,
        filename: this.userData.name,
        margin: [140, 40, 40, 140],
        image: {
          type: 'jpeg',
          quality: 1,
        },
        html2canvas: {
          useCORS: true,
          scrollX: 0,
          scrollY: 0,
          onclone: async (element) => {
            const wrapper = element.getElementById('wrapper')
            wrapper.classList.remove('shadow')
            wrapper.style.borderRadius = 0
            wrapper.style.margin = 0
            wrapper.style.padding = 0
            
            wrapper
              .querySelectorAll('.d-print-none')
              .forEach((item) => item.remove())

            wrapper
              .querySelectorAll('.header, .content, .left, .right')
              .forEach((item) => (item.style.borderRadius = 0))
          },
        },
        jsPDF: {
          format: 'ledger',
          floatPrecision: 'smart',
          orientation: 'portrait',
        },
        }
	}),
	components: {
        VueHtml2pdf, 
        DxColumn,
		DxColumnChooser,
		DxDataGrid,
		DxFilterRow,
		DxGrouping,
		DxGroupItem,
		DxGroupPanel,
		DxLoadPanel,
		DxPager,
		DxPaging,
		DxSearchPanel,
		DxSorting,
		DxSummary,
    },
    computed: {
        datax(){
            const d = new Date();
            return "Paln_accion_"+d.getTime();
        },
        dataSource: function() {
			// if (typeof root.$route.params.planId === "undefined") return null;
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				// ids: ["dw_type_id=1"],
				// stringParam: "plan_type_id=" + root.tipos+'& filter=[["active","=","true"]]',
				stringParam: 'filter=[["plan_type_id","=","781", "and", "active","=","true"]]',
				endPoint: `action_plans/${root.$route.params.planId}/form_a_act_plans/`,
                onLoaded: function(results, baseEntity) {
					// console.clear();
					console.log("results", results);
					root.totaCount = results.totalCount;
					root.loaderHide();
				},
			});
		},

        dataSource2: function() {
			// if (typeof root.$route.params.planId === "undefined") return null;
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				// ids: ["dw_type_id=1"],
				// stringParam: "plan_type_id=" + root.tipos+'& filter=[["active","=","true"]]',
				stringParam: 'filter=[["active","=","true"]]',
				endPoint: `action_plans/${root.$route.params.planId}/form_b_act_plans/`,
                onLoaded: function(results, baseEntity) {
					// console.clear();
					console.log("results", results);
					root.totaCount = results.totalCount;
					root.loaderHide();
				},
			});
		},

        dataSource3: function() {
			// if (typeof root.$route.params.planId === "undefined") return null;
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				// ids: ["dw_type_id=1"],
				// stringParam: "plan_type_id=" + root.tipos+'& filter=[["active","=","true"]]',
				stringParam: 'filter=[["plan_type_id","=","782", "and", "active","=","true"]]',
				endPoint: `action_plans/${root.$route.params.planId}/form_a_act_plans/`,
                onLoaded: function(results, baseEntity) {
					// console.clear();
					console.log("results", results);
					root.totaCount = results.totalCount;
					root.loaderHide();
				},
			});
		},

        dataSource4: function() {
			// if (typeof root.$route.params.planId === "undefined") return null;
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				// ids: ["dw_type_id=1"],
				// stringParam: "plan_type_id=" + root.tipos+'& filter=[["active","=","true"]]',
				//stringParam: 'filter=[["plan_type_id","=","782", "and", "active","=","true"]]',
                stringParam: 'filter=[["active","=","true"]]',
				endPoint: `action_plans/${root.$route.params.planId}/form_c_act_plans/`,
                onLoaded: function(results, baseEntity) {
					// console.clear();
					console.log("results", results);
					root.totaCount = results.totalCount;
					root.loaderHide();
				},
			});
		},

        dataSource5: function() {
			// if (typeof root.$route.params.planId === "undefined") return null;
			console.log("root.group", this.group);
			return DxStore({
				key: ["id"],
				// ids: ["dw_type_id=1"],
				// stringParam: "plan_type_id=" + root.tipos+'& filter=[["active","=","true"]]',
				//stringParam: 'filter=[["plan_type_id","=","782", "and", "active","=","true"]]',
                stringParam: 'filter=[["active","=","true"]]',
				endPoint: `action_plans/${root.$route.params.planId}/form_e_act_plans/`,
                onLoaded: function(results, baseEntity) {
					// console.clear();
					console.log("results", results);
					root.totaCount = results.totalCount;
					root.loaderHide();
				},
			});
		},
    },
	methods: {
		...mapActions("unidad", ["getUnit", "getResearchers", "saveResearcher", "updateResearcher"]),
		loadMembers() {
			console.log("members", root.group.member_ids);
		},
		estadoEntrega(cellInfo) {
			return cellInfo.value ? "Terminado" : "Editando...";
		},	
        download() {
            this.$refs.html2Pdf.generatePdf()
        },

        gridInit(e) {
			this.grid = e.component;
		},
        

	},
};
</script>

<style>

</style>