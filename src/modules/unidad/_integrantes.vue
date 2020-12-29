<template>
	<div class="col p-3">
		<div class="row">
			<div class="col pb-3">
				<span class="font-weight-semibold">Instrucciones:</span> Lorem ipsum dolor sit amet, consectetur adipiscing
				elit. Donec urna eros, lacinia eu ullamcorper a, egestas porta nulla. Donec nec est nibh, rhoncus lobortis
				magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna eros, lacinia eu ullamcorper a,
				egestas porta nulla. Donec nec est nibh, rhoncus lobortis magna. Lorem ipsum dolor sit amet.
			</div>
			<div class="col-md-4 d-flex justify-content-end align-items-end">
				<div class="form-group">
					<label>Buscar integrante:</label>
					<DxAutocomplete
						:data-source="documents"
						:show-clear-button="true"
						:value.sync="document"
						@enter-key="addSearch"
						class="form-control"
						@value-changed="searchKeyup"
						value-change-event="keyup"
						placeholder="# de documento"
						width="150"
					/>
				</div>
				<div class="form-group">
					<a
						href="#"
						:class="
							'mb-1 ml-2 btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple' +
								(searchDisabled ? ' disabled' : '')
						"
						@click.prevent="addSearch"
						:disabled="searchDisabled"
					>
						BUSCAR <b><i class="icon-search"></i></b>
					</a>
					<!-- <DxButton @click="addSearch" :disabled="searchDisabled">
						<template #default>
							<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
								BUSCAR <b><i class="icon-search"></i></b>
							</span>
						</template>
					</DxButton> -->
				</div>
			</div>
		</div>

		<div class="row mb-4 slide" id="panel-user" v-if="OasUser">
			<div class="col-12">
				<hr class="sep tit" />
				<h1 class="tit">{{ OasUser.TerceroId.NombreCompleto }}</h1>
			</div>
			<div class="col-12">
				<div class="row">
					<div class="col-md-2">
						<div class="form-group">
							<label>Rol:</label>
							<DxSelectBox
								:data-source="roles"
								placeholder="Seleccione..."
								@value-changed="role.name"
								class="form-control"
								display-expr="name"
								value-expr="id"
							/>
						</div>
					</div>
					<div class="col-md-3">
						<div class="row">
							<div class="col-7">
								<div class="form-group">
									<label>Fecha de nacimiento:</label>
									<DxDateBox
										class="form-control"
										:read-only="true"
										:value.sync="OasUser.TerceroId.FechaNacimiento"
										placeholder="dd/mm/yyyy"
										display-format="dd/MM/yyyy"
										type="date"
									/>
								</div>
							</div>
							<div class="col-5">
								<div class="form-group">
									<label>Orcid ID:</label>
									<DxTextBox class="form-control" placeholder="Orcid ID" name="orcid" id="orcid"> </DxTextBox>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-3">
						<div class="row">
							<div class="col-md-5">
								<div class="form-group">
									<label>Firma Científica:</label>
									<DxTextBox class="form-control" placeholder="Firma" name="firma" id="firma">
										<DxValidator>
											<DxValidationRule type="required" message="Falta Firma Cietifica" />
											<DxRequiredRule message="Campo requerido" />
											<DxStringLengthRule :min="10" message="El codigo es de minimo 10 caracteres" />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>
							<div class="col-md-7">
								<div class="form-group">
									<label>Correo:</label>
									<DxTextBox class="form-control" placeholder="Correo" name="correo" id="correo">
										<DxValidator>
											<DxValidationRule type="required" message="Falta Correo" />
											<DxRequiredRule message="Campo requerido" />
											<DxStringLengthRule :min="10" message="El codigo es de minimo 10 caracteres" />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="row">
							<div class="col-md-5">
								<div class="form-group">
									<label>Número de celular:</label>
									<DxTextBox class="form-control" placeholder="Número de celular" name="cel" id="cel">
										<DxValidator>
											<DxValidationRule type="required" message="Falta Numero Cel" />
											<DxRequiredRule message="Campo requerido" />
											<DxStringLengthRule :min="10" message="El codigo es de minimo 10 caracteres" />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>
							<div class="col-md-7">
								<div class="form-group">
									<label>Dirección:</label>
									<DxTextBox class="form-control" placeholder="Direccion" name="direccion" id="direccion">
										<DxValidator>
											<DxValidationRule type="required" message="Falta Direccion" />
											<DxRequiredRule message="Campo requerido" />
											<DxStringLengthRule :min="10" message="El codigo es de minimo 10 caracteres" />
										</DxValidator>
									</DxTextBox>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="row">
					<div class="col">
						<DxButton @click="addCancel" class="nb">
							<template #default>
								<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
									<b><i class="icon-database-remove"></i></b> CANCELAR
								</span>
							</template>
						</DxButton>
					</div>
					<div class="col text-right">
						<DxButton @click="addSave" class="nb">
							<template #default>
								<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
									ADICONAR <b><i class="icon-database-add"></i></b>
								</span>
							</template>
						</DxButton>
					</div>
				</div>
			</div>
		</div>

		<transition name="fade" mode="out-in">
			<hr class="sep tit mb-2 pb-0" v-if="members.length > 0" />
		</transition>
		<transition name="fade" mode="out-in">
			<div id="grid" class="pt-0" v-if="members.length > 0">
				<DxDataGrid
					class="main"
					width="100%"
					:allow-column-reordering="true"
					:data-source="members"
					:remote-operations="false"
					:hover-state-enabled="true"
					:row-alternation-enabled="true"
					:show-borders="false"
				>
					<DxColumnChooser :enabled="true" mode="dragAndDrop" />
					<DxSorting mode="multiple" />
					<DxPaging :page-size="10" />
					<DxFilterRow :visible="false" />
					<DxLoadPanel :enabled="false" />
					<DxGroupPanel :visible="true" :allow-column-dragging="true" />
					<DxGrouping :auto-expand-all="false" />
					<DxSummary>
						<DxGroupItem summary-type="count" column="group_type_name" display-format="{0} integrantes" />
					</DxSummary>
					<DxPager
						:show-info="true"
						:show-page-size-selector="true"
						:show-navigation-buttons="true"
						:allowed-page-sizes="[10, 20, 50]"
						info-text="Página {0} de {1} ({2} integrantes)"
					/>
					<DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
					<DxColumn
						:sort-index="1"
						sort-order="asc"
						:allow-filtering="false"
						data-field="researcher.id"
						caption="Id"
						data-type="int"
						alignment="center"
						:allow-sorting="true"
						:width="80"
					/>
					<DxColumn
						:allow-filtering="false"
						data-field="oas_details.TerceroId.Id"
						caption="Id OAS"
						data-type="int"
						alignment="center"
						:allow-sorting="true"
						:width="70"
					/>
					<DxColumn
						:customize-text="formatDocument"
						data-field="oas_details.Numero"
						caption="Documento"
						data-type="string"
						alignment="center"
						:visible="true"
						:width="120"
					/>
					<DxColumn
						data-field="oas_details.TerceroId.NombreCompleto"
						caption="Nombre"
						data-type="string"
						alignment="left"
						:visible="true"
					/>
					<DxColumn
						:visible="false"
						data-field="acronym"
						caption="Acrónimo"
						data-type="string"
						alignment="center"
						:width="100"
						cell-template="tplNull"
					/>
					<DxColumn
						:visible="false"
						data-field="cidc_registration_date"
						caption="Fecha Registro CIDC"
						alignment="center"
						data-type="date"
						format="dd/MM/yyyy"
						:width="130"
					/>
					<DxColumn
						data-field="cidc_act_number"
						caption="No. Acta CIDC"
						data-type="string"
						alignment="center"
						:visible="false"
						:width="100"
						cell-template="tplNull"
					/>
					<DxColumn
						data-field="faculty_registration_date"
						caption="Fecha Registro Facultad"
						data-type="date"
						format="dd/MM/yyyy"
						alignment="center"
						:visible="false"
						:width="130"
					/>
					<DxColumn
						data-field="faculty_act_number"
						caption="No. Acta Facultad"
						data-type="string"
						alignment="center"
						:visible="false"
						:width="120"
						cell-template="tplNull"
					/>
					<DxColumn
						data-field="email"
						caption="Email"
						data-type="string"
						alignment="center"
						:visible="true"
						:width="100"
						cell-template="tplEmail"
					/>
					<DxColumn
						data-field="gruplac"
						caption="GrupLAC"
						data-type="string"
						alignment="center"
						:visible="true"
						:width="100"
						cell-template="tplUrl"
					/>
					<DxColumn
						data-field="webpage"
						caption="Página Web"
						data-type="string"
						alignment="center"
						:visible="true"
						:width="100"
						cell-template="tplUrl"
					/>
					<DxColumn
						data-field="group_state_name"
						caption="Estado"
						data-type="string"
						alignment="center"
						:visible="true"
						:width="100"
					/>
					<DxColumn :width="50" alignment="center" cell-template="tplCommands" />
					<template #tplUrl="{ data }">
						<a
							v-if="data.value && data.value.trim() !== 'NULL' && data.value.trim().length > 5"
							target="_blank"
							class="color-main-600"
							:href="data.value"
							:title="'Visitar \'' + data.value + '\'...'"
							><i class="icon-link"></i>
						</a>
						<span v-else> -- </span>
					</template>
					<template #tplNull="{ data }">
						<span
							v-if="
								data.value &&
									data.value.toString().trim() !== 'NULL' &&
									data.value.toString().trim() !== '0' &&
									data.value.toString().trim() !== '.'
							"
							>{{ data.value }}</span
						>
						<span v-else> -- </span>
					</template>
					<template #tplEmail="{ data }">
						<span v-if="data.value && data.value.toString().trim() !== 'NULL'">
							<a
								class="color-main-600"
								:href="'mailto:' + data.value"
								:title="'Escribir a \'' + data.value.trim() + '\'...'"
								><i class="icon-envelop3"></i>
							</a>
							<a
								href=""
								class="ml-2 color-main-600"
								v-if="data.value && data.value.toString().trim() !== 'NULL'"
								@click.prevent="$toClipboard(data.value.toString().trim())"
								:title="'Copiar \'' + data.value.toString().trim() + '\'\r\nal portapapeles'"
								><i class="icon-copy2"></i>
							</a>
						</span>
						<span v-else> -- </span>
					</template>
					<template #tplCapitalize="{ data }">
						<div style="max-width:300px" :title="$capitalize(data.value)">{{ $capitalize(data.value) }}</div>
					</template>
					<template #tplCommands="{ data }">
						<Commands :data="data.data" :edit-cb="edit" :enable-cb="enable" enable-pr="el usuario" />
					</template>
				</DxDataGrid>
			</div>
		</transition>
		<transition name="fade" mode="out-in">
			<hr class="sep tit" v-if="members.length > 0" />
		</transition>
		<div class="row mt-2">
			<div class="col">
				<DxButton @click="cancel" class="nb">
					<template #default>
						<span class="btn btn-main btn-labeled btn-labeled-left btn-sm legitRipple">
							<b><i class="icon-database-remove"></i></b> CANCELAR
						</span>
					</template>
				</DxButton>
			</div>
			<div class="col text-right">
				<DxButton @click="save" class="nb">
					<template #default>
						<span class="btn btn-main btn-labeled btn-labeled-right btn-sm legitRipple">
							GUARDAR <b><i class="icon-database-add"></i></b>
						</span>
					</template>
				</DxButton>
			</div>
		</div>

		<transition name="fade" mode="out-in">
			<div class="mt-3" v-if="members.length > 0 && isDev && debug">
				<hr class="sep tit" />
				<span class="mt-4">{{ members }}</span>
			</div>
		</transition>
	</div>
</template>

<script src="./_integrantes.js"></script>
