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
									data="driveC"
									filter=".dx-treeview-item"
									:allow-drop-inside-item="true"
									:allow-reordering="true"
									@drag-change="onDragChange"
									@drag-end="onDragEnd"
								>
									<DxTreeView
										id="treeview"
										data-structure="tree"
										:expand-nodes-recursive="false"
										ref="treeview"
										:items="itemsDriveC"
										display-expr="name"
										show-check-boxes-mode="none"
										selection-mode="single"
										:select-nodes-recursive="false"
										:select-by-click="true"
										@selection-changed="treeViewSelectionChanged"
									>
										<!-- show-check-boxes-mode="selectAll, normal, none" -->
										<template #item="item">
											{{ item.data.name + " (" + item.data.id + ")" }}
										</template>
									</DxTreeView>
								</DxSortable>
							</div>
							<div class="col" v-if="selectedItem">
								<div class="row">
									<div class="col sub-title color-main-600 mb-3">{{ selectedItem.name }} ({{ selectedItem.id }})</div>
								</div>
								<div class="row">
									<div class="col">
										<Contenido :height="600" />
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
let $ = window.jQuery,
	root = null;
import { mapActions, mapGetters } from "vuex";
import DxTreeView from "devextreme-vue/tree-view";
import DxSortable from "devextreme-vue/sortable";
import { DxCheckBox } from "devextreme-vue/check-box";
import DxContextMenu from "devextreme-vue/context-menu";
import { DxHtmlEditor, DxToolbar, DxMediaResizing, DxItem } from "devextreme-vue/html-editor";
const treeviewRef = "treeview";
const treeViewDriveDRef = "treeViewDriveD";

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
		item: null,
		id: "panel-convocatoria-documentos",
		selectedItem: null,
		menuItems: [
			{ id: "expand", text: "Expand category" },
			{ id: "collapse", text: "Collapse category" },
			{ id: "details", text: "Show product details" },
			{ id: "copy", text: "Copy product info" },
		],
		sizeValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"],
		fontValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"],
		headerValues: [false, 1, 2, 3, 4, 5],
		isMultiline: false,
		markup: `<h2>
        <img src="./logo.png" alt="HtmlEditor">
        Formatted Text Editor (HTML Editor)
    </h2>
    <br>
    <p>DevExtreme JavaScript HTML Editor is a client-side WYSIWYG text editor that allows its users to format textual and visual content and store it as HTML or Markdown.</p>
    <p>Supported features:</p>
    <ul>
        <li>Inline formats:
            <ul>
                <li><strong>Bold</strong>, <em>italic</em>, <s>strikethrough</s> text formatting</li>
                <li>Font, size, color changes (HTML only)</li>
            </ul>
        </li>
        <li>Block formats:
            <ul>
                <li>Headers</li>
                <li>Text alignment</li>
                <li>Lists (ordered and unordered)</li>
                <li>Code blocks</li>
                <li>Quotes</li>
            </ul>
        </li>
        <li>Custom formats</li>
        <li>HTML and Markdown support</li>
        <li>Mail-merge placeholders (for example, %username%)</li>
        <li>Adaptive toolbar for working images, links, and color formats</li>
        <li>Insert images as a link or base64 (drag and drop images to convert them to base64)</li>
        <li>Copy-paste rich content (unsupported formats are removed)</li>
        <li>Tables support</li>
    </ul>
    <br>
    <p>Supported frameworks and libraries</p>
    <table>
        <tr>
            <td><strong>jQuery</strong></td>
            <td style="text-align: right;">v2.1 - v2.2 and v3.x</td>
        </tr>
        <tr>
            <td><strong>Angular</strong></td>
            <td style="text-align: right;">v7.0.x - v10.0.x</td>
        </tr>
        <tr>
            <td><strong>React</strong></td>
            <td style="text-align: right;">v16.2+</td>
        </tr>
        <tr>
            <td><strong>Vue</strong></td>
            <td style="text-align: right;">v2.6.3+</td>
        </tr>
    </table>`,
		itemsDriveD: [],
		itemsDriveC: [
			{
				id: "1",
				name: "Documents",
				icon: "activefolder",
				isDirectory: true,
				expanded: true,
				items: [
					{
						id: "2",
						name: "Projects",
						icon: "activefolder",
						isDirectory: true,
						expanded: true,
						items: [
							{
								id: "3",
								name: "About.rtf",
								icon: "file",
								isDirectory: false,
							},
							{
								id: "4",
								name: "Passwords.rtf",
								icon: "file",
								isDirectory: false,
							},
						],
					},
					{
						id: "5",
						name: "About.xml",
						icon: "file",
						isDirectory: false,
					},
					{
						id: "6",
						name: "Proceso de verificación, selección y evaluación de las propuestas",
						icon: "file",
						isDirectory: false,
					},
					{
						id: "7",
						name: "ToDo.txt",
						icon: "file",
						isDirectory: false,
					},
				],
			},
			{
				id: "8",
				name: "Images",
				icon: "activefolder",
				isDirectory: true,
				expanded: true,
				items: [
					{
						id: "9",
						name: "logo.png",
						icon: "file",
						isDirectory: false,
					},
					{
						id: "10",
						name: "banner.gif",
						icon: "file",
						isDirectory: false,
					},
				],
			},
			{
				id: "11",
				name: "System",
				isDirectory: true,
				icon: "activefolder",
				expanded: true,
				items: [
					{
						id: "12",
						name: "Employees.txt",
						icon: "file",
						isDirectory: false,
					},
					{
						id: "13",
						name: "PasswordList.txt",
						icon: "file",
						isDirectory: false,
					},
				],
			},
			{
				id: "14",
				name: "Description.rtf",
				icon: "activefolder",
				isDirectory: false,
			},
			{
				id: "15",
				name: "Description.txt",
				icon: "activefolder",
				isDirectory: false,
			},
		],
	}),
	methods: {
		...mapActions("convocatoria", ["getItem"]),
		contextMenuItemClick(e) {
			let logEntry = "";
			switch (e.itemData.id) {
				case "expand": {
					logEntry = `The '${this.selectedTreeItem.text}' group was expanded`;
					this.treeView.expandItem(this.selectedTreeItem.id);
					break;
				}
				case "collapse": {
					logEntry = `The '${this.selectedTreeItem.text}' group was collapsed`;
					this.treeView.collapseItem(this.selectedTreeItem.id);
					break;
				}
				case "details": {
					logEntry = `Details about '${this.selectedTreeItem.text}' were displayed`;
					break;
				}
				case "copy": {
					logEntry = `Information about '${this.selectedTreeItem.text}' was copied`;
					break;
				}
			}
			this.logItems = this.logItems.concat(logEntry);
		},
		treeViewSelectionChanged(e) {
			root.selectedItem = e.component.getSelectedNodes().map((node) => node.itemData)[0];
			console.log("selectedItem =>", root.selectedItem);
		},
		treeViewContentReady(e) {
			// const selectedItem = e.component.getSelectedNodes().map((node) => node.itemData);
			// console.log("selectedItem =>", selectedItem);
		},
		onDragChange(e) {
			if (e.fromComponent === e.toComponent) {
				const fromNode = this.findNode(this.getTreeView(e.fromData), e.fromIndex);
				const toNode = this.findNode(this.getTreeView(e.toData), this.calculateToIndex(e));
				if (toNode !== null && this.isChildNode(fromNode, toNode)) {
					e.cancel = true;
				}
			}
		},
		onDragEnd(e) {
			if (e.fromComponent === e.toComponent && e.fromIndex === e.toIndex) {
				return;
			}
			const fromTreeView = this.getTreeView(e.fromData);
			const toTreeView = this.getTreeView(e.toData);
			const fromNode = this.findNode(fromTreeView, e.fromIndex);
			const toNode = this.findNode(toTreeView, this.calculateToIndex(e));
			if (e.dropInsideItem && toNode !== null && !toNode.itemData.isDirectory) {
				return;
			}
			const fromTopVisibleNode = this.getTopVisibleNode(e.fromComponent);
			const toTopVisibleNode = this.getTopVisibleNode(e.toComponent);
			const fromItems = this.getItems(e.fromData);
			const toItems = this.getItems(e.toData);
			this.moveNode(fromNode, toNode, fromItems, toItems, e.dropInsideItem);
			this.itemsDriveC = [].concat(this.itemsDriveC);
			this.itemsDriveD = [].concat(this.itemsDriveD);
			this.$root.$nextTick(() => {
				fromTreeView.scrollToItem(fromTopVisibleNode);
				toTreeView.scrollToItem(toTopVisibleNode);
			});
		},
		getTreeView(driveName) {
			return driveName === "driveC" ? this.treeview : this.treeViewDriveD;
		},

		getItems(driveName) {
			return driveName === "driveC" ? this.itemsDriveC : this.itemsDriveD;
		},

		calculateToIndex(e) {
			if (e.fromComponent != e.toComponent || e.dropInsideItem) {
				return e.toIndex;
			}

			return e.fromIndex >= e.toIndex ? e.toIndex : e.toIndex + 1;
		},

		findNode(treeView, index) {
			const nodeElement = treeView.element().querySelectorAll(".dx-treeview-node")[index];
			if (nodeElement) {
				return this.findNodeById(treeView.getNodes(), nodeElement.getAttribute("data-item-id"));
			}
			return null;
		},

		findNodeById(nodes, id) {
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].itemData.id == id) {
					return nodes[i];
				}
				if (nodes[i].children) {
					const node = this.findNodeById(nodes[i].children, id);
					if (node != null) {
						return node;
					}
				}
			}
			return null;
		},

		moveNode(fromNode, toNode, fromItems, toItems, isDropInsideItem) {
			const fromNodeContainingArray = this.getNodeContainingArray(fromNode, fromItems);
			const fromIndex = fromNodeContainingArray.findIndex((item) => item.id == fromNode.itemData.id);
			fromNodeContainingArray.splice(fromIndex, 1);

			if (isDropInsideItem) {
				toNode.itemData.items.splice(toNode.itemData.items.length, 0, fromNode.itemData);
			} else {
				const toNodeContainingArray = this.getNodeContainingArray(toNode, toItems);
				const toIndex = toNode === null ? toNodeContainingArray.length : toNodeContainingArray.findIndex((item) => item.id == toNode.itemData.id);
				toNodeContainingArray.splice(toIndex, 0, fromNode.itemData);
			}
		},

		getNodeContainingArray(node, rootArray) {
			return node === null || node.parent === null ? rootArray : node.parent.itemData.items;
		},

		isChildNode(parentNode, childNode) {
			let parent = childNode.parent;
			while (parent !== null) {
				if (parent.itemData.id === parentNode.itemData.id) {
					return true;
				}
				parent = parent.parent;
			}
			return false;
		},

		getTopVisibleNode(component) {
			const treeViewElement = component.element();
			const treeViewTopPosition = treeViewElement.getBoundingClientRect().top;
			const nodes = treeViewElement.querySelectorAll(".dx-treeview-node");
			for (let i = 0; i < nodes.length; i++) {
				const nodeTopPosition = nodes[i].getBoundingClientRect().top;
				if (nodeTopPosition >= treeViewTopPosition) {
					return nodes[i];
				}
			}

			return null;
		},
	},
	computed: {
		...mapGetters("core/tipo", ["subtypesByType"]),
	},
	created: async function() {
		root = this;
		console.log(root.$sep);
		root.tiposDocumento = root.subtypesByType("convocatoria_doc_emitir");
		console.log("root.tiposDocumento =>", root.tiposDocumento);
		let uId = root.$route.params.itemId;
		root.item = await root.getItem(uId);
		console.log("item =>", root.item);
		document.title += ` Convocatoria ${root.item.call_code}`;
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
