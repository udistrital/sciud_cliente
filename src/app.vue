<template>
	<div id="app" class="d-flex flex-column flex-1 layout-boxed">
		<globalHeader />
		<globalMenu />
		<div class="page-content" :style="'background: url(' + imgUrl + '/bg.png)'">
			<div class="content-wrapper">
				<transition name="fade" mode="out-in">
					<router-view class="content" id="content" />
				</transition>
			</div>
		</div>
		<globalFooter />
		<Loader />
	</div>
</template>

<script>
import Loader from "@/components/element/loader.vue";
import globalHeader from "./components/global/header.vue";
import globalMenu from "./components/global/menu.vue";
import globalFooter from "./components/global/footer.vue";

export default {
	name: "app",
	components: {
		globalHeader,
		globalMenu,
		globalFooter,
		Loader,
	},
};
</script>
