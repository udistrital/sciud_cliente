<template>
	<div v-if="item">
		<Header :item="item" />
		<div class="row">
			<div class="col">
				<div class="card" id="panel-documentos">
					<div class="card-body group-detail mh">
						<div class="row pb-3 mb-3 bb">
							<div class="col">
								<div class="col d-flex justify-content-between align-items-end">
									<div>
										<span class="title d-block"><i class="icon-pencil6"></i> Convocatoria {{ item.call_code }}</span>
										<span class="title2 d-block mt-2">{{ item.call_name }}</span>
									</div>
									<div class="sub-title text-nowrap ml-4"><i class="icon-page-break"></i>&nbsp;Plantilla de documento</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-3">
								<DxSortable
									group="shared"
									data="document_items"
									filter=".dx-treeview-item"
									:allow-drop-inside-item="true"
									:allow-reordering="true"
									@drag-change="onDragChange"
									@drag-end="onDragEnd"
								>
									<DxTreeView
										:expand-nodes-recursive="false"
										:items="document_items"
										:select-by-click="true"
										:select-nodes-recursive="false"
										@item-context-menu="treeViewItemContextMenu"
										@selection-changed="treeViewSelectionChanged"
										data-structure="plain"
										parent-id-expr="ch_parent_id"
										key-expr="id"
										display-expr="ch_title"
										id="treeview"
										ref="treeviewRef"
										selection-mode="single"
										show-check-boxes-mode="none"
									>
										<!-- show-check-boxes-mode="selectAll, normal, none" -->
										<template #item="item">
											<span class="list-item">
												<span class="numeral">{{ item.data.numeral }}.</span><span>{{ item.data.ch_title }}</span>
											</span>
										</template>
									</DxTreeView>
								</DxSortable>
							</div>
							<div class="col" v-if="selectedItem">
								<div class="row">
									<div class="col sub-title color-main-600 mb-3">{{ selectedItem.numeral }}. {{ selectedItem.ch_title }}</div>
								</div>
								<div class="row">
									<div class="col">
										<Contenido :height="600" :syncValue.sync="baseObj" />
									</div>
								</div>
							</div>
							<div class="col" v-else>
								<div class="row mt-5">
									<div class="col mt-5 title2">
										<i class="icon-point-left mr-2 d-inline-block"></i>Haga clic en algún ítem para editarlo o arrastre y suelte para modificar su orden.
									</div>
								</div>
								<div class="row">
									<div class="col pt-2 pl-4 font-weight-semibold">(clic derecho para más opciones)</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<DxContextMenu ref="contextMenu" :data-source="menuItems" target="#treeview .dx-treeview-item" @item-click="contextMenuItemClick" />
		<div class="row" v-if="is_dev && debug">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<span class="font-weight-semibold">document_items:</span>
						<pre>{{ JSON.stringify(document_items, null, 3) }}</pre>
						<hr class="sep" />
						<span class="font-weight-semibold">editMode:</span> {{ editMode }}
						<hr class="sep" />
						<span class="font-weight-semibold">item:</span> {{ JSON.stringify(item, null, 3) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
// 202108180553: https://js.devexpress.com/Demos/WidgetsGallery/Demo/TreeView/DragAndDropHierarchicalDataStructure/Vue
// 202108180602: https://js.devexpress.com/Demos/WidgetsGallery/Demo/TreeView/ItemSelectionAndCustomization/Vue
// 202109240240: https://js.devexpress.com/Demos/WidgetsGallery/Demo/TreeView/ContextMenuIntegration/Vue
// 202109240601: https://js.devexpress.com/Demos/WidgetsGallery/Demo/TreeView/DragAndDropPlainDataStructure/Vue
let $ = window.jQuery,
	root = null;
import { mapActions, mapGetters } from "vuex";
import DxTreeView from "devextreme-vue/tree-view";
import DxSortable from "devextreme-vue/sortable";
import { DxCheckBox } from "devextreme-vue/check-box";
import DxContextMenu from "devextreme-vue/context-menu";
import { DxHtmlEditor, DxToolbar, DxMediaResizing, DxItem } from "devextreme-vue/html-editor";

export default {
	name: "datosBasicos",
	components: {
		DxTreeView,
		DxSortable,
		DxHtmlEditor,
		DxMediaResizing,
		DxContextMenu,
		DxToolbar,
		DxItem,
		DxCheckBox,
		Header: () => import("./_header"),
		Contenido: () => import("@/components/element/html_editor"),
	},
	data: () => ({
		treeView: null,
		item: null,
		baseObj: {
			observation: null,
		},
		document_items: [],
		id: "panel-convocatoria-documentos",
		selectedItem: null,
		menuItems: [
			{ id: "rename", text: "Renombrar" },
			{ id: "add", text: "Agregar" },
			{ id: "delete", text: "Eliminar" },
		],
	}),
	methods: {
		...mapActions("convocatoria", ["getItem", "getTemplate"]),
		setNumerals(parent_id) {
			if (typeof parent_id === "undefined") parent_id = null;
			root.document_items
				.filter((o) => o.ch_parent_id === parent_id)
				.forEach((item, index) => {
					let num = index + 1;
					item["expanded"] = true;
					item["isDirectory"] = root.document_items.filter((o) => o.ch_parent_id === item.id).length > 0;
					item["numeral"] = (parent_id !== null ? root.document_items.filter((o) => o.id === parent_id)[0].numeral + "." : "") + num;
					root.setNumerals(item.id);
				});
		},
		treeViewItemContextMenu(e) {
			root.selectedItem = e.itemData;
			// const isProduct = e.itemData.price !== undefined;
			// root.contextMenu.option("items[0].visible", !isProduct);
			// root.contextMenu.option("items[1].visible", !isProduct);
			// root.contextMenu.option("items[2].visible", isProduct);
			// root.contextMenu.option("items[3].visible", isProduct);
			// root.contextMenu.option("items[0].disabled", e.node.expanded);
			// root.contextMenu.option("items[1].disabled", !e.node.expanded);
		},
		contextMenuItemClick(e) {
			console.clear();
			console.log("e =>", e);
			console.log("root.selectedItem =>", root.selectedItem);
			switch (e.itemData.id) {
				case "rename": {
					root.treeView.expandItem(root.selectedItem.id);
					break;
				}
				case "add": {
					root.treeView.collapseItem(root.selectedItem.id);
					break;
				}
				case "delete": {
					break;
				}
			}
		},
		treeViewSelectionChanged(e) {
			console.clear();
			let se = e.component.getSelectedNodes().map((node) => node.itemData)[0];
			if (typeof se !== "undefined") {
				root.selectedItem = e.component.getSelectedNodes().map((node) => node.itemData)[0];
				console.log("selectedItem =>", root.selectedItem);
				root.baseObj.observation = root.selectedItem.ch_description;
				console.log("selectedItem =>", root.selectedItem);
			}
		},
		treeViewContentReady(e) {
			root.selectedItem = e.component.getSelectedNodes().map((node) => node.itemData);
			console.log("root.selectedItem =>", root.selectedItem);
		},
		move(arr, old_index, new_index) {
			if (new_index >= arr.length) {
				var k = new_index - arr.length + 1;
				while (k--) {
					arr.push(undefined);
				}
			}
			arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
			// return arr; // for testing
		},
		onDragChange(e) {
			// if (e.fromComponent === e.toComponent) {
			// 	const fromNode = root.findNode(root.getTreeView(e.fromData), e.fromIndex);
			// 	const toNode = root.findNode(root.getTreeView(e.toData), root.calculateToIndex(e));
			// 	if (toNode !== null && root.isChildNode(fromNode, toNode)) {
			// 		e.cancel = true;
			// 	}
			// }
		},
		onDragEnd(e) {
			console.clear();
			if (e.fromIndex === e.toIndex) return;
			const fromNode = root.findNode(e.fromIndex);
			const toNode = root.findNode(root.calculateToIndex(e));
			root.moveNode(fromNode, toNode, e.dropInsideItem);
			root.setNumerals();
		},
		calculateToIndex(e) {
			if (e.fromComponent != e.toComponent || e.dropInsideItem) return e.toIndex;
			return e.fromIndex >= e.toIndex ? e.toIndex : e.toIndex + 1;
		},
		findNode(index) {
			const nodeElement = root.treeView.element().querySelectorAll(".dx-treeview-node")[index];
			return nodeElement ? root.findNodeById(root.treeView.getNodes(), nodeElement.getAttribute("data-item-id")) : null;
		},
		findNodeById(nodes, id) {
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].itemData.id == id) {
					return nodes[i];
				}
				if (nodes[i].children) {
					const node = root.findNodeById(nodes[i].children, id);
					if (node != null) {
						return node;
					}
				}
			}
			return null;
		},
		moveNode(fromNode, toNode, isDropInsideItem) {
			const fromIndex = root.document_items.findIndex((item) => item.id == fromNode.itemData.id);
			root.document_items.splice(fromIndex, 1);
			const toIndex = toNode === null || isDropInsideItem ? root.document_items.length : root.document_items.findIndex((item) => item.id == toNode.itemData.id);
			root.document_items.splice(toIndex, 0, fromNode.itemData);
			root.moveChildren(fromNode);
			if (isDropInsideItem) {
				fromNode.itemData.ch_parent_id = toNode.itemData.id;
			} else {
				fromNode.itemData.ch_parent_id = toNode != null ? toNode.itemData.ch_parent_id : undefined;
			}
		},
		moveChildren(node) {
			if (!node.itemData.isDirectory) return;
			node.children.forEach((child) => {
				if (child.itemData.isDirectory) {
					root.moveChildren(child);
				}
				const fromIndex = root.document_items.findIndex((item) => item.id == child.itemData.id);
				root.document_items.splice(fromIndex, 1);
				root.document_items.splice(root.document_items.length, 0, child.itemData);
			});
		},
		isChildNode(parentNode, childNode) {
			let parent = childNode.parent;
			while (parent !== null) {
				if (parent.itemData.id === parentNode.itemData.id) return true;
				parent = parent.parent;
			}
			return false;
		},
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
	},
	created: async function() {
		root = this;
		root.document_items = await root.getTemplate();
		root.setNumerals();
		root.tiposDocumento = root.subtypesByType("convocatoria_doc_emitir");
		console.log("root.tiposDocumento =>", root.tiposDocumento);
		let uId = root.$route.params.itemId;
		root.item = await root.getItem(uId);
		console.log("item =>", root.item);
		document.title += ` Convocatoria ${root.item.call_code}`;
		setTimeout(function() {
			root.treeView = root.$refs.treeviewRef.instance;
			console.log("root.treeView =>", root.treeView);
		}, 500);
	},
	updated: () => {
		console.log(root.$sep);
		console.log("documentos Updated");
	},
	mounted() {
		// setTimeout(function() {
		// 	let id = `#${root.id}`;
		// 	console.log("id", id);
		// 	$(id).fadeIn();
		// }, 700);
		root.loaderHide();
	},
};
</script>
