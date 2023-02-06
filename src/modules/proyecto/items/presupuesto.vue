<template>
	<div class="col mt-3 pl-1 pr-1" :id="namePanel">
		<div class="row">
			<div class="col">
				<div class="p-0">
					<div class="page-header header-elements-md-inline mb-2">
						<div class="page-title p-0 m-0">
							<h1>
								<i class="icon-coin-dollar mr-2 color-main-600"></i>
								<span class="font-weight-semibold">Presupuesto</span>
								<span class="item-title"></span>
							</h1>
						</div>
						<div class="header-elements">
							<span class="cmds mr-2">
								<button
									v-if="permisoGuardar"
									type="button"
									@click.prevent="add()"
									title="Crear nuevo rubro..."
									class="btn btn-main btn-labeled btn-labeled-left "
								>
									<b><i class="icon-database-add"></i></b> Nuevo rubro
								</button>
							</span>
							<span class="cmds-back slide">
								<button type="button" @click.prevent="retorno()" title="Volver al panel principal.." class="btn btn-main btn-labeled btn-labeled-left mr-2">
									<b><i class="icon-arrow-left"></i></b> Volver a rubros
								</button>
								<button
									v-if="permisoGuardar"
									type="button"
									@click.prevent="addDesc()"
									title="Crear nueva descripción..."
									class="btn btn-main btn-labeled btn-labeled-left"
								>
									<b><i class="icon-database-add"></i></b> Nueva descripción
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row data slide">
			<div class="col">
				<div class="card">
					<div class="card-header main d-flex justify-content-between align-items-center">
						<span
							><i class="icon-pencil3 mr-2"></i> <span class="font-weight-semibold">{{ mode == "edit" ? "Editar" : "Nuevo" }} rubro</span></span
						>
						<span>
							Máx. proyecto ${{ convocatoria.call_max_budget_per_project.format() }}
							<span v-if="montoMaximoCidc > 0"> - Máx. rubro: ${{ montoMaximoCidc.format() }}</span>
							<span v-if="base_obj.subtotal > 0"> - Total rubro: ${{ base_obj.subtotal.format() }}</span>
						</span>
					</div>
					<div class="card-body mb-0 pb-0 pt-3">
						<DxValidationGroup ref="vGroup">
							<div class="row">
								<div class="col-md-12">
									<div class="form-group mb-3">
										<label>Rubro de convocatoria:</label>
										<!-- @value-changed="rubroSelected" -->
										<DxSelectBox
											:show-clear-button="true"
											:grouped="false"
											:data-source="rubros"
											:value.sync="base_obj.call_item_id"
											@selection-changed="rubroSelected"
											:search-enabled="false"
											placeholder="Seleccione..."
											class="form-control"
											display-expr="item_name"
											value-expr="id"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxSelectBox>
									</div>
								</div>
								<!-- <div class="col">
									<div class="row">
										<div class="col">
											<div class="form-group mb-3">
												<label>Monto Solicitado CIDC:</label>
												<DxNumberBox
													id="monto"
													:max="montoMaximoCidc"
													:min="0"
													value-change-event="keyup"
													:show-clear-button="true"
													:show-spin-buttons="true"
													:value.sync="base_obj.amount_request_cidc"
													class="form-control"
													format="$ #,##0.##"
													placeholder="Valor"
													@value-changed="valueChanged"
													:step="1"
												>
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxNumberBox>
											</div>
										</div>
										<div class="col">
											<div class="form-group mb-3">
												<label>Contrapartida Externa:</label>
												<DxNumberBox
													id="partida"
													:max="montoMaximoCidc"
													:min="0"
													value-change-event="keyup"
													:show-clear-button="true"
													:show-spin-buttons="true"
													:value.sync="base_obj.counterparty"
													class="form-control"
													format="$ #,##0.##"
													placeholder="Valor"
													@value-changed="valueChanged"
													:step="1000"
												>
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxNumberBox>
											</div>
										</div>
										<div class="col">
											<div class="form-group mb-3">
												<label>Monto en especie:</label>
												<DxNumberBox
													id="especie"
													:max="montoMaximoCidc"
													:min="0"
													value-change-event="keyup"
													:show-clear-button="true"
													:show-spin-buttons="true"
													:value.sync="base_obj.amount_in_kind"
													class="form-control"
													format="$ #,##0.##"
													placeholder="Valor"
													@value-changed="valueChanged"
													:step="1000"
												>
													<DxValidator>
														<DxRequiredRule />
													</DxValidator>
												</DxNumberBox>
											</div>
										</div>
									</div>
								</div> -->
							</div>
						</DxValidationGroup>
					</div>
					<div class="card-footer">
						<div class="row d-flex justify-content-between align-items-center">
							<a href="#" id="btn-cancel" @click.prevent="cancel" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
								<b><i class="icon-database-remove"></i></b> CANCELAR
							</a>
							<span v-if="canSave !== null" class="error"
								>ERROR: El total del rubro (${{ base_obj.subtotal.format() }}) excede el máximo permitido (${{ montoMaximoCidc.format() }})</span
							>
							<a href="#" id="btn-save" @click.prevent="save" :class="'btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple ' + canSave">
								<b><i class="icon-database-add"></i></b> AGREGAR RUBRO
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row grid">
			<div class="col">
				<div class="p-0">
					<DxDataGrid
						:allow-column-reordering="true"
						:data-source="dataSource"
						:hover-state-enabled="true"
						:remote-operations="true"
						:row-alternation-enabled="true"
						:show-borders="false"
						:word-wrap-enabled="true"
						@content-ready="onContentReady"
						@initialized="gridInit"
						class="main"
						no-data-text="No hay elementos registrados"
						width="100%"
					>
						<DxColumnChooser :enabled="false" mode="dragAndDrop" />
						<DxSorting mode="single" /><!-- single, multiple, none" -->
						<DxPaging :page-size="10" />
						<DxFilterRow :visible="false" />
						<DxLoadPanel :enabled="false" />
						<DxGroupPanel :visible="false" :allow-column-dragging="true" />
						<DxGrouping :auto-expand-all="true" />
						<DxPager
							:show-info="true"
							:show-page-size-selector="true"
							:show-navigation-buttons="true"
							:allowed-page-sizes="dgPageSizes"
							info-text="Página {0} de {1} ({2} elementos)"
						/>
						<DxSearchPanel :visible="false" :highlight-case-sensitive="true" />
						<!-- https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/columns/ -->
						<!-- <DxColumn data-field="id" caption="ID" data-type="null" alignment="center" :visible="true" :allow-grouping="false" width="110" />
						<DxColumn data-field="name" caption="Nombre" :customize-text="nullText" data-type="null" alignment="left" :visible="true" :allow-grouping="false" /> -->
						<!-- <DxColumn alignment="left" data-field="id" cell-template="tpl-rubro" caption="Rubro de convocatoria" :customize-text="getRubro" /> -->
						<DxColumn data-field="item_name" caption="Rubro de convocatoria" />
						<DxColumn
							:allow-filtering="false"
							:visible="true"
							data-field="amount_request_cidc"
							caption="Monto Solicitado CIDC"
							:customize-text="currency"
							alignment="right"
							width="120"
						/>
						<DxColumn
							:allow-filtering="false"
							:visible="true"
							data-field="counterparty"
							caption="Contrapartida Externa"
							:customize-text="currency"
							alignment="right"
							width="120"
						/>
						<DxColumn
							:allow-filtering="false"
							:visible="true"
							data-field="amount_in_kind"
							caption="Monto en Especie"
							:customize-text="currency"
							alignment="right"
							width="120"
						/>
						<!-- https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/GridSummaries/Vue/Light -->
						<!-- <DxSummary>
							<DxTotalItem column="amount_request_cidc" summary-type="sum" :customize-text="getTotal" />
							<DxTotalItem column="counterparty" summary-type="count" />
							<DxTotalItem column="amount_in_kind" summary-type="sum" :customize-text="getTotal" />
							<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} elementos" />
						</DxSummary> -->
						<DxColumn
							:allow-filtering="false"
							:visible="true"
							data-field="subtotal"
							caption="Total"
							:customize-text="currency"
							alignment="right"
							:width="100"
						/>
						<DxColumn :allow-filtering="false" :visible="true" data-field="amount_executed" caption="Ejecutado" alignment="right" :width="100" />
						<!-- data-field="balance" -->
						<DxColumn :allow-filtering="false" :visible="true" caption="Saldo" cell-template="calTAE" alignment="right" :width="100" />
						<template #calTAE="{ data }">
							<span>
								$ {{ (data.data.amount_executed != null ? Math.abs(data.data.subtotal - data.data.amount_executed) : data.data.subtotal).format() }}
							</span>
						</template>

						<!-- :customize-text="currency" -->

						<DxColumn data-field="active" caption="Activo" data-type="null" alignment="center" :visible="true" :customize-text="yesNo" :width="70" />
						<DxColumn alignment="center" cell-template="tpl" caption="" :width="80" />
						<template #tpl="{ data }">
							<span class="cmds">
								<a title="Adquisiciones..." class="cmd-item color-main-600" @click.prevent="descriptions(data.data)" href="#">
									<i class="icon-bubbles8"></i>
								</a>
								<span v-if="permisoGuardar">
									<!-- <a title="Editar..." class="cmd-item color-main-600" @click.prevent="edit(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a> -->
									<a v-if="data.data.active" title="Desactivar..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, false)" href="#">
										<i class="icon-database-remove"></i>
									</a>
									<a v-else title="Activar..." class="cmd-item color-main-600 mr-2" @click.prevent="active(data, true)" href="#">
										<i class="icon-database-check"></i>
									</a>
								</span>
							</span>
						</template>
					</DxDataGrid>
				</div>
			</div>
		</div>

		<div class="row data-desc slide">
			<div class="col">
				<div class="card">
					<div class="card-header main d-flex justify-content-between align-items-center">
						<span
							><i class="icon-pencil3 mr-2"></i> <span class="font-weight-semibold">{{ mode_desc == "edit" ? "Editar" : "Nueva" }} descripción</span></span
						>
						<span>
							<span>Total descripción: ${{ base_desc.subtotal.format() }}</span>
						</span>
					</div>
					<div class="card-body mb-0 pb-0 pt-3">
						<DxValidationGroup ref="vGroupDesc">
							<div class="row">
								<!--fila 1-->
								<div class="col-md-5">
									<div class="form-group">
										<label>Tipo de Monto:</label>
										<DxSelectBox
											:show-clear-button="true"
											:grouped="false"
											:search-enabled="false"
											:read-only="!editing"
											placeholder="Seleccione..."
											:value.sync="base_desc.source_id"
											class="form-control"
											:data-source="rubroTiposMonto"
											display-expr="st_name"
											value-expr="id"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxSelectBox>
									</div>
								</div>
								<div class="col-md-2">
									<div class="form-group">
										<label>Fecha adquisición:</label>
										<DxDateBox
											@focus-in="date_focus_in"
											@focus-out="date_focus_out"
											class="form-control"
											:read-only="!editing"
											@value-changed="setDate"
											:value.sync="base_desc.estimated_date"
											placeholder="dd/mm/yyyy"
											display-format="dd/MM/yyyy"
											:min="actualDate"
											type="date"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxDateBox>
									</div>
								</div>
								<div class="col-md-3">
									<div class="form-group mb-3">
										<label>Costo individual:</label>
										<DxNumberBox
											id="monto"
											:min="0"
											value-change-event="keyup"
											:show-clear-button="true"
											:show-spin-buttons="true"
											:value.sync="base_desc.individual_cost"
											class="form-control"
											format="$ #,##0.##"
											placeholder="Costo"
											@value-changed="valueChangedDesc"
											:step="1000"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxNumberBox>
									</div>
								</div>
								<div class="col-md-2">
									<div class="form-group mb-3">
										<label>Cantidad:</label>
										<DxNumberBox
											id="monto"
											:min="0"
											value-change-event="keyup"
											:show-clear-button="true"
											:show-spin-buttons="true"
											:value.sync="base_desc.quantity"
											class="form-control"
											placeholder="Cantidad"
											@value-changed="valueChangedDesc"
											:step="1"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxNumberBox>
									</div>
								</div>
								<!--fila 2-->

								<div class="col-md-4">
									<div class="form-group">
										<label>Estado:</label>
										<DxSelectBox
											:show-clear-button="true"
											:grouped="false"
											:search-enabled="false"
											:read-only="!editing"
											placeholder="Seleccione..."
											:value.sync="base_desc.state_id"
											class="form-control"
											:data-source="rubroTiposMonto"
											display-expr="st_name"
											value-expr="id"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxSelectBox>
									</div>
								</div>

								<div class="col-md-4">
									<div class="form-group mb-3">
										<label>Valor Ejecutado (Administrador):</label>
										<DxNumberBox
											id="monto"
											:min="0"
											value-change-event="keyup"
											:show-clear-button="true"
											:show-spin-buttons="true"
											:value.sync="base_desc.executed_amount"
											class="form-control"
											format="$ #,##0.##"
											placeholder="Valor"
											@value-changed="valueChangedDesc"
											:step="1000"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxNumberBox>
									</div>
								</div>
								<div class="col-md-2">
									<div class="form-group mb-3">
										<label>Pagos:</label>
										<DxNumberBox
											id="monto"
											:min="0"
											value-change-event="keyup"
											:show-clear-button="true"
											:show-spin-buttons="true"
											:value.sync="base_desc.payments"
											class="form-control"
											placeholder="Cantidad"
											@value-changed="valueChangedDesc"
											:step="1"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxNumberBox>
									</div>
								</div>
								<div class="col-md-2">
									<div class="form-group">
										<label>Aprobado: </label>
										<DxSwitch :value.sync="base_desc.state_id" switched-on-text="SI" switched-off-text="NO" />
									</div>
								</div>
								<!--fila 3-->

								<div class="col-md-6">
									<div class="form-group mb-3">
										<label>Descripción:</label>
										<DxTextArea
											:height="60"
											:max-length="1000"
											:show-clear-button="true"
											:read-only="!editing"
											value-change-event="keyup"
											class="form-control"
											:value.sync="base_desc.description"
											placeholder="Descripción"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextArea>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group mb-3">
										<label>Justificación:</label>
										<DxTextArea
											:height="60"
											:max-length="1000"
											:show-clear-button="true"
											value-change-event="keyup"
											:read-only="!editing"
											class="form-control"
											:value.sync="base_desc.justification"
											placeholder="Justificación"
										>
											<DxValidator>
												<DxRequiredRule />
											</DxValidator>
										</DxTextArea>
									</div>
								</div>
							</div>
						</DxValidationGroup>
					</div>
					<div class="card-footer">
						<div class="row d-flex justify-content-between align-items-center">
							<a href="#" id="btn-cancel" @click.prevent="cancelDesc" class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
								<b><i class="icon-database-remove"></i></b> CANCELAR
							</a>
							<span v-if="canSave !== null" class="error"
								>ERROR: El total del rubro (${{ base_obj.subtotal.format() }}) excede el máximo permitido (${{ montoMaximoCidc.format() }})</span
							>
							<a href="#" id="btn-save" @click.prevent="saveDesc" :class="'btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple '">
								<b><i class="icon-database-add"></i></b> GUARDAR
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row grid-desc slide">
			<div class="col">
				<div class="row">
					<div class="col mb-2">
						<h1 class="color-text mb-0" v-if="rubro">
							Adquisiciones para el Rubro <span class="font-weight-semibold">"{{ rubro.item_name }}"</span>
						</h1>
					</div>
				</div>
				<div class="row">
					<div class="p-0">
						<DxDataGrid
							class="main"
							width="100%"
							@initialized="gridInitDesc"
							@content-ready="onContentReady"
							:allow-column-reordering="true"
							no-data-text="No hay elementos registrados"
							:data-source="dataSourceDesc"
							:remote-operations="true"
							:hover-state-enabled="true"
							:row-alternation-enabled="true"
							:show-borders="false"
							:word-wrap-enabled="true"
						>
							<DxColumnChooser :enabled="false" mode="dragAndDrop" />
							<DxSorting mode="single" /><!-- single, multiple, none" -->
							<DxPaging :page-size="10" />
							<DxFilterRow :visible="false" />
							<DxLoadPanel :enabled="false" />
							<DxGroupPanel :visible="false" :allow-column-dragging="true" />
							<DxGrouping :auto-expand-all="true" />
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
							<DxColumn data-field="source_name" caption="Tipo de Monto" :width="150" />
							<DxColumn data-field="description" caption="Descripción" />
							<DxColumn
								:allow-filtering="false"
								:visible="true"
								data-field="estimated_date"
								caption="Fecha estimada"
								alignment="center"
								data-type="date"
								format="dd/MM/yyyy"
								:width="80"
							/>
							<DxColumn
								:allow-filtering="false"
								:visible="true"
								data-field="quantity"
								caption="Cantidad"
								:customize-text="number"
								alignment="center"
								:width="80"
							/>
							<DxColumn
								:allow-filtering="false"
								:visible="true"
								data-field="individual_cost"
								caption="Costo"
								:customize-text="currency"
								alignment="right"
								:width="80"
							/>
							<DxColumn
								:allow-filtering="false"
								:visible="true"
								data-field="subtotal"
								caption="Total"
								:customize-text="currency"
								alignment="right"
								:width="100"
								class="font-weight-semibold"
							/>

							<DxColumn data-field="active" caption="Activo" data-type="null" alignment="center" :visible="true" :customize-text="yesNo" width="60" />
							<DxColumn alignment="center" cell-template="tpl" caption="" v-if="permisoGuardar" :width="70" />
							<template #tpl="{ data }">
								<span class="cmds">
									<a title="Editar..." class="cmd-item color-main-600" @click.prevent="editDesc(data.data)" href="#">
										<i class="icon-database-edit"></i>
									</a>
									<a v-if="data.data.active" title="Desactivar..." class="cmd-item color-main-600 mr-2" @click.prevent="activeDesc(data, false)" href="#">
										<i class="icon-database-remove"></i>
									</a>
									<a v-else title="Activar..." class="cmd-item color-main-600 mr-2" @click.prevent="activeDesc(data, true)" href="#">
										<i class="icon-database-check"></i>
									</a>
								</span>
							</template>
						</DxDataGrid>
					</div>
				</div>
			</div>
		</div>

		<div class="card mt-3" v-if="debug">
			<div class="card-body color-text">
				<b>mode:</b> {{ mode }}<br />
				<b>editing:</b> {{ editing }}<br />
				<b>base_obj:</b> {{ base_obj }}<br />
				<b>base_obj_copy:</b> {{ base_obj_copy }}<br />
				<b>base_desc:</b> {{ base_desc }}<br />
				<b>base_desc_copy:</b> {{ base_desc_copy }}<br />
				<b>proposal:</b> {{ proposal }}
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
let root = null;
let $ = window.jQuery;
import DxStore from "@/store/dx";
import {
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
	DxTotalItem,
} from "devextreme-vue/data-grid";
import { DxEmailRule, DxRequiredRule, DxStringLengthRule, DxValidator, DxPatternRule } from "devextreme-vue/validator";
import { DxTagBox, DxDateBox, DxSelectBox, DxButton, DxSwitch, DxTextBox, DxNumberBox, DxTextArea, DxValidationGroup, DxPopup } from "devextreme-vue";
import { mapState, mapActions, mapGetters } from "vuex";
//import { DxStateStoring } from 'node_modules/devextreme-vue/pivot-grid';

// https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CustomDataSource/Vue/
export default {
	components: {
		// Commands,
		DxPopup,
		DxButton,
		DxColumn,
		DxPatternRule,
		DxColumnChooser,
		DxDataGrid,
		DxDateBox,
		DxNumberBox,
		DxFilterRow,
		DxGrouping,
		DxGroupItem,
		DxGroupPanel,
		DxLoadPanel,
		DxPager,
		DxPaging,
		DxRequiredRule,
		DxTagBox,
		DxTotalItem,
		DxSearchPanel,
		DxSelectBox,
		DxSorting,
		DxSummary,
		DxTextArea,
		DxTextBox,
		DxValidator,
		DxValidationGroup,
		DxSwitch,
	},
	props: {
		convocatoria: {
			type: Object,
			default: () => {},
		},
		propuesta: {
			type: Object,
			default: () => {},
		},
		editing: {
			type: Boolean,
			default: () => true,
		},
		permisoGuardar: {
			type: Boolean,
			default: () => false,
		},
	},
	data: () => ({
		total: 0,
		rubro: null,
		go_update: false,
		data: [],
		data_desc: [],
		data_desc_bk: [],
		dataSourceDesc: null,
		canSave: null,
		assigned_budget: 0,
		montoMaximoCidc: 0,
		startDate: null,
		maxDate: null,
		rubros: [],
		rubros_bk: [],
		rubroTiposMonto: [],
		rubroTiposMontoBk: [],
		estadoProducto: [],
		plazos: null,
		tipos_impacto: null,
		namePanel: "proyecto-impactos",
		titlecolum: "Cronograma de impactoes",
		titleBtn: "Nuevo rubro",
		title: "Cronograma de impactoes",
		proposal: null,
		base_desc_copy: {},
		base_desc: {
			proposal_budget_id: null,
			description: null,
			justification: null,
			estimated_date: new Date(),
			quantity: 0,
			individual_cost: 0,
			subtotal: 0,
			active: true,
			created_by: 0,
		},
		base_obj_copy: {},
		base_obj: {
			call_item_id: null,
			amount_request_cidc: 0,
			counterparty: 0,
			amount_in_kind: 0,
			subtotal: 0,
			active: true,
		},
		popupObs: false,
		observarData: "",
		editData: null, //sirve para dejar formulario en limpio o llenar datos
		items: [],
		totaCount: 0,
		grid: null,
		gridDesc: null,
		mode: null,
		mode_desc: null,
		unidad: null,
		section: null,
		//tipos: 587, //584-179
		tipox: [],
		totalCount: 0,
		tiposDocumento: [],
		subtipos: [],
		isValid: false,
		panelData: null,
		panelDataDesc: null,
		panelGrid: null,
		panelGridDesc: null,
		panelParticipantes: null,
		panelDocs: null,
		panelCmds: null,
		baseEntity: null,
		docLink: null,
		firstLoad: true,
		now: new Date(),
		participationid: null,
		urlPattern: /^(http|https):\/\/[^ "]+$/,
		phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
	}),
	created() {
		// console.clear();
		root = this;
		console.log("convocatoria =>", root.convocatoria);
		console.log("propuesta =>", root.propuesta);
		root.plazos = root.subtypesByType("proyecto_indicador_meta_plazo", "id");
		root.tipos_impacto = root.subtypesByType("proyecto_tipo_impacto");
		root.base_obj_copy = root.$clone(root.base_obj);
		root.base_desc_copy = root.$clone(root.base_desc);
	},
	async mounted() {
		console.clear();
		console.log("root.propuesta =>", root.propuesta);
		root.base_obj.proposal_id = root.propuesta.id;
		root.base_obj_copy = root.$clone(root.base_obj);
		root.panelData = $("#" + root.namePanel + " .data");
		root.panelDataDesc = $("#" + root.namePanel + " .data-desc");
		root.panelGrid = $("#" + root.namePanel + " .grid");
		root.panelGridDesc = $("#" + root.namePanel + " .grid-desc");
		root.panelCmds = $("#" + root.namePanel + " .cmds");
		root.panelCmdBack = $("#" + root.namePanel + " .cmds-back");
		root.loaderMessage = "Cargando Objetivos";
		root.loaderElement = "#" + root.namePanel + " .grid";
		root.rubroTiposMontoBk = root.subtypesByType("propuesta_tipo_monto_rubro");
		console.log("rubroTiposMontoBk =>", root.rubroTiposMontoBk);
		root.estadoProducto = root.subtypesByType("Proyecto_Seguimiento_estado_producto");
		console.log("root.tiposDocumento", root.tiposDocumento);
		await root.getSinData({
			url: `/proposals/${root.propuesta.id}`,
			cb: async function(results) {
				console.log(root.$sep);
				root.proposal = results;
				console.log("root.proposal =>", root.proposal);
			},
		});
		await root.getSinData({
			url: `/calls/${root.convocatoria.id}/call_items`,
			cb: async function(results) {
				if (results.data.length > 0) {
					console.log(root.$sep);
					root.rubros_bk = window.vm.$objectSort(results.data, "item_name");
					// root.rubros_bk = root.$clone(root.rubros);
					console.log("root.rubros =>", root.rubros);
				}
			},
		});
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
		actualDate() {
			return new Date() + 1;
		},

		dataSource: function() {
			if (typeof this.propuesta.id === "undefined") return null;
			console.log("root.propuesta", root.propuesta);
			return DxStore({
				key: ["id"],
				endPoint: `proposals/${root.propuesta.id}/proposal_budgets`,
				onLoading: function() {
					// root.loaderShow("Cargando elementos", "#panel-produccion .card-body");
				},
				onLoaded: function(results) {
					console.log(root.$sep);
					// console.clear();
					console.log("results =>", results);
					root.totaCount = results.totalCount;
					root.data = results.data;
					console.log("root.data =>", root.data);
					root.checkRubro();
					// root.getObjetives();
				},
			});
		},
	},

	watch: {},
	methods: {
		...mapActions("unidad/producto/universalSentUpAct", { getSinData: "getSinData", objSave: "save", objUpdate: "update", elementoActive: "active" }),
		checkRubro: () => {
			console.log(root.$sep);
			console.log("data =>", root.data);
			console.log("rubros_bk =>", root.rubros_bk);
			root.rubros = [];
			root.rubros_bk.forEach((rubro) => {
				let items = root.data.filter((o) => o.item_id == rubro.item_id);
				// console.log("items =>", items);
				if (items.length <= 0) root.rubros.push(rubro);
			});
			console.log("rubros =>", root.rubros);
		},
		checkDesc: (cb) => {
			console.clear();
			// Guardar
			console.log(root.$sep);
			console.log("checkDesc");
			console.log("root.rubro =>", root.rubro);
			console.log("data_desc =>", root.data_desc);
			console.log("rubroTiposMontoBk =>", root.rubroTiposMontoBk);
			root.rubroTiposMonto = [];
			// 202212042145: Filtra
			root.rubroTiposMontoBk.forEach((tipoMonto) => {
				let items = root.data_desc.filter((o) => o.source_id == tipoMonto.id);
				// console.log("items =>", items);
				if (items.length <= 0) root.rubroTiposMonto.push(tipoMonto);
			});
			console.log("rubroTiposMonto =>", root.rubroTiposMonto);
			console.log("proposal =>", root.proposal);
			console.log("amount_in_kind =>", root.proposal.amount_in_kind);
			console.log("amount_request_cidc =>", root.proposal.amount_request_cidc);
			console.log("counterparty =>", root.proposal.counterparty);
			console.log(root.$sep);
			console.log("root.base_obj =>", root.base_obj);
			console.log("root.rubro =>", root.rubro);
			console.log("----------------------");
			root.rubroTiposMontoBk.forEach((tipo) => {
				// tipo.st_description => amount_in_kind, amount_request_cidc, counterparty
				console.log("tipo.st_description =>", tipo.st_description);
				// 202209211405: Obtiene el id del tipo de monto con base en la descripción
				let item = root.rubroTiposMontoBk.find((o) => o.st_description == tipo.st_description);
				let id = item != undefined ? item.id : null;
				if (id != null) {
					console.log("id tipo monto =>", id);
					let item_b = root.data_desc.find((o) => o.source_id == id);
					if (item_b != undefined) {
						console.log("item_b =>", item_b);
						let field_name = tipo.st_description.replace("total_", "");
						root.rubro[field_name] = item_b.subtotal;
						console.log(`root.rubro.${field_name} =>`, root.rubro[field_name]);
					}
				}
				console.log("----------------------");
			});
			if (root.go_update) {
				console.log("----------------------");
				console.log("GUARDAR!!!!");
				root.mode == "edit";
				console.log("root.rubro =>", root.rubro);
				root.base_obj = root.$clone(root.rubro);
				console.log("root.base_obj =>", root.base_obj);
				root.save(cb);
			} else cb();
		},
		getTotal(data, otr) {
			console.log("getTotal() data =>", data);
			console.log("getTotal() otr =>", otr);
			return "Diego";
		},
		getRubro(id) {
			let rubro = root.rubros.find((o) => o.id == id);
			console.log("getRubro =>", rubro);
			return rubro != null ? rubro.item_name : id;
		},
		rubroSelected(e) {
			if (e.selectedItem !== null) {
				// console.clear();
				let total = root.convocatoria.call_max_budget_per_project;
				let porcentaje = parseInt(e.selectedItem.ci_maximum_percentage);
				let porcentajeMaximo = parseInt(e.selectedItem.ci_percentage);
				console.log("total =>", total);
				console.log("porcentaje =>", porcentaje);
				console.log("porcentajeMaximo =>", porcentajeMaximo);
				root.montoMaximoCidc = (total * porcentajeMaximo) / 100;
				console.log("montoMaximoCidc =>", root.montoMaximoCidc);
			}
		},
		setDuration() {},
		valueChanged(e) {
			console.log("e =>", e);
			root.base_obj.subtotal = root.base_obj.amount_request_cidc + root.base_obj.counterparty + root.base_obj.amount_in_kind;
			root.canSave = root.base_obj.subtotal > root.montoMaximoCidc ? "disabled" : null;
		},
		valueChangedDesc(e) {
			console.log("e =>", e);
			root.base_desc.subtotal = root.base_desc.individual_cost * root.base_desc.quantity;
		},
		beginUpdate(e) {
			console.log("e =>", e);
		},
		setDate(e) {
			// console.clear();
			console.log(root.$sep);
			let id = $(e.element).attr("id");
			console.log("id =>", id);
			console.log("e =>", e);
			var d = new Date(e.value);
			if (id == "start_date") {
				d.setDate(d.getDate() + 1);
				root.startDate = d;
			}
			if (id == "end_date") {
				root.maxDate = d;
			}
			if (root.base_obj.end_date != null) {
				console.log("typeof =>", typeof root.base_obj.start_date);
				// root.base_obj.duration = Math.round((root.base_obj.end_date - root.base_obj.start_date) / (1000 * 60 * 60 * 24));
				root.base_obj.duration = Math.round((root.base_obj.end_date - root.base_obj.start_date) / (1000 * 60 * 60 * 24)) + " días";
			}
		},

		async getObjetives() {
			await root.getSinData({
				url: "/proposals/" + root.propuesta.id + '/rubros?skip=0&sort=[{"selector":"id","desc":true}]', //,filter=["parent_id","=","null"]',
				cb: function(results) {
					if (results.data.length > 0) {
						console.log(root.$sep);
						// 202207291827: Filtra solo los objetivos específicos
						root.rubros = results.data.filter((o) => o.parent_id != null);
						console.log("rubros =>", root.rubros);
					}
					root.loaderHide();
				},
			});
		},

		save(cb) {
			console.clear();
			console.log(this.$sep);
			console.log("ACTUALIZANDO!!");
			let result = root.$refs.vGroup.instance.validate();
			console.log("result", result);
			if (result.isValid || typeof cb != undefined) {
				console.log("VALID!");
				root.scrollTop();
				root.panelCmds.fadeOut();
				let msg = (root.mode == "add" ? "Creando" : "Actualizando") + " Rubro";
				root.loaderShow(msg, root.panelData);
				if (root.go_update) {
					root.mode = "edit";
				}
				if (root.mode == "add") root.base_obj.created_by = root.user_id;
				if (root.mode == "edit") root.base_obj.updated_by = root.user_id;
				let obj = root.base_obj;
				// 202210030639: Total
				obj.subtotal = obj.amount_in_kind + obj.amount_request_cidc + obj.counterparty;
				let dto = {
					newFormat: true,
					rute2: "proposals/" + root.propuesta.id + "/proposal_budgets",
					stringEP: "proposal_budgets",
					mod: obj.id,
					objectSend: JSON.parse(`{ "proposal_budget": ` + JSON.stringify(obj) + "}"),
					cb: function(item) {
						// console.clear();
						console.log("item =>", item);
						console.log("root.go_update =>", root.go_update);
						if (root.go_update) root.go_update = false;
						root.grid.refresh();
						root.cancel();
					},
				};
				console.log("root.go_update =>", root.go_update);
				console.log("dto =>", dto);
				console.log("root.mode =>", root.mode);
				if (root.mode == "edit") root.objUpdate(dto);
				else root.objSave(dto);
				root.updateProposal();
				if (typeof cb != undefined) cb();
			}
		},

		async updateProposal() {
			console.log(this.$sep);
			console.log("updateProposal()");
			await root.getSinData({
				url: `proposals/${root.propuesta.id}/proposal_budgets`,
				cb: async function(results) {
					if (results.data.length > 0) {
						let in_kind = 0;
						let request_cidc = 0;
						let counterparty = 0;
						results.data.forEach((item) => {
							in_kind += item.amount_in_kind;
							request_cidc += item.amount_request_cidc;
							counterparty += item.counterparty;
						});
						root.proposal.total_amount_in_kind = in_kind;
						root.proposal.total_amount_request_cidc = request_cidc;
						root.proposal.total_counterparty = counterparty;
						console.log("root.proposal =>", root.proposal);
						root.objUpdate({
							newFormat: true,
							mod: root.proposal.id,
							stringEP: "proposals",
							rute2: "calls/" + root.$route.params.convocatoriaId + "/proposals",
							objectSend: JSON.parse(`{ "proposal": ` + JSON.stringify(root.proposal) + "}"),
							cb: function(item) {
								console.log(root.$sep);
								console.log("updated proposal =>", item);
								console.log("root.$emit =>", root.$emit);
								root.$emit("update-proposal", item);
								console.log("root.go_update =>", root.go_update);
								// if (!root.go_update)
								root.cancel();
							},
						});
					}
				},
			});
		},

		saveDesc() {
			console.log(this.$sep);
			let result = root.$refs.vGroupDesc.instance.validate();
			console.log("result", result);
			if (result.isValid) {
				let msg = (root.mode_desc == "add" ? "Creando" : "Actualizando") + " descripción";
				root.loaderShow(msg, root.panelDataDesc);
				if (root.mode_desc == "add") root.base_desc.created_by = root.user_id;
				if (root.mode_desc == "edit") root.base_desc.updated_by = root.user_id;
				let obj = root.base_desc;
				let dto = {
					newFormat: true,
					rute2: "proposals/" + root.propuesta.id + "/item_details",
					stringEP: "item_details",
					mod: obj.id,
					objectSend: JSON.parse(`{ "item_detail": ` + JSON.stringify(obj) + "}"),
					cb: function(item) {
						console.log("item", item);
						root.go_update = true;
						root.gridDesc.refresh();
						root.cancelDesc();
					},
				};
				// console.clear();
				if (root.mode_desc == "edit") root.objUpdate(dto);
				else root.objSave(dto);
				root.cancelDesc();
			}
		},

		descriptions(data) {
			// console.clear();
			root.rubro = data;
			root.loaderShow(`Cargando Adquisiciones`);
			console.log("data =>", data);
			root.base_desc.proposal_budget_id = data.id;
			root.dataSourceDesc = DxStore({
				endPoint: `/proposal_budgets/${data.id}/item_details`,
				onLoading: function(loadOptions) {
					console.log("loadOptions =>", loadOptions);
				},
				onLoaded: function(results) {
					console.log("results =>", results);
					root.data_desc = results.data;
					console.log("root.data_desc =>", root.data_desc);
					root.checkDesc(function() {
						root.panelCmds.fadeOut();
						root.panelGrid.fadeOut(function() {
							root.panelCmdBack.fadeIn();
							root.panelGridDesc.fadeIn(function() {
								root.loaderHide();
							});
						});
					});
				},
			});
		},

		retorno() {
			root.panelCmdBack.fadeOut();
			root.panelGridDesc.fadeOut(function() {
				root.panelCmds.fadeIn();
				root.panelGrid.fadeIn(function() {});
			});
		},

		edit(data) {
			// console.clear();
			root.mode = "edit";
			console.log("data =>", data);
			root.base_obj = root.$clone(data);
			root.panelCmds.fadeOut();
			root.panelGrid.fadeOut(function() {
				root.panelData.fadeIn(function() {});
			});
		},

		add() {
			console.log("ADD");
			root.mode = "add";
			root.base_obj = root.$clone(root.base_obj_copy);
			//root.panelCmdBack.fadeOut();
			root.panelCmds.fadeOut();
			console.warn("clase padre: ", this.padre);
			console.warn("name panel: ", root.namePanel);
			root.panelGrid.fadeOut(function() {
				root.panelData.fadeIn(function() {});
			});
		},

		cancel() {
			// console.clear();
			console.log("CANCEL!");
			root.panelData.fadeOut(function() {
				root.mode = null;
				root.panelCmds.fadeIn();
				root.panelGrid.fadeIn(function() {});
				root.base_obj = root.$clone(root.base_obj_copy);
				root.$refs.vGroup.instance.reset();
				root.loaderHide();
			});
		},

		active(data, state) {
			// console.clear();
			console.log("active", data);
			console.log("state", state);
			let a = state ? "activar" : "desactivar";
			let am = state ? "Activando" : "Desactivando";
			let msg = `¿Realmente desea ${a} el ítem seleccionado?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am}`);
					let active = JSON.stringify({ active: state, updated_by: root.user_id });
					var dto = {
						newFormat: true,
						url: `proposal_budgets/${data.data.id}`,
						data: JSON.parse(`{ "proposal_budget" :` + active + "}"),
						cb: function(result) {
							console.log("Result", result);
							root.grid.refresh();
							root.loaderHide();
						},
					};
					console.log("dto", dto);
					root.elementoActive(dto);
					root.loaderHide();
				}
			});
		},

		editDesc(data) {
			// console.clear();
			root.mode_desc = "edit";
			console.log("data =>", data);
			root.base_desc = root.$clone(data);
			root.panelCmdBack.fadeOut();
			root.panelGridDesc.fadeOut(function() {
				root.panelDataDesc.fadeIn(function() {});
			});
		},

		addDesc() {
			console.log("ADD");
			root.mode_desc = "add";
			root.base_desc = root.$clone(root.base_desc_copy);
			root.base_desc.proposal_budget_id = root.rubro.id;
			root.panelCmdBack.fadeOut();
			root.panelGridDesc.fadeOut(function() {
				root.panelDataDesc.fadeIn(function() {});
			});
		},

		cancelDesc() {
			root.panelDataDesc.fadeOut(function() {
				root.mode_desc = null;
				root.panelGridDesc.fadeIn();
				root.panelCmdBack.fadeIn();
				root.base_desc = root.$clone(root.base_desc_copy);
				root.$refs.vGroupDesc.instance.reset();
				root.loaderHide();
			});
		},

		activeDesc(data, state) {
			let a = state ? "activar" : "desactivar";
			let am = state ? "Activando" : "Desactivando";
			let msg = `¿Realmente desea ${a} el ítem seleccionado?`;
			this.$confirm(msg, function(si_no) {
				console.log("result", si_no);
				if (si_no) {
					root.loaderShow(`${am}`);
					let active = JSON.stringify({ active: state, updated_by: root.user_id });
					var dto = {
						newFormat: true,
						url: `item_details/${data.data.id}`,
						data: JSON.parse(`{ "item_detail" :` + active + "}"),
						cb: function(result) {
							console.log("Result", result);
							root.gridDesc.refresh();
							root.loaderHide();
						},
					};
					console.log("dto", dto);
					root.elementoActive(dto);
					root.loaderHide();
				}
			});
		},

		gridInit(e) {
			this.grid = e.component;
		},

		gridInitDesc(e) {
			this.gridDesc = e.component;
		},

		onContentReady() {},
	},
};
</script>
