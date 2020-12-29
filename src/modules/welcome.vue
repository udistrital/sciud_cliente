<template>
	<div id="app" class="container-fluid h-100" :style="'background: url(' + imgUrl + 'bg.png)'">
		<div class="row justify-content-center h-100">
			<div class="centering text-center">
				<div class="h-100 wlcm">
					<img v-rjs="2" id="SICIUD" alt="SICIUD" width="250" height="86" :src="imgUrl + 'logo-siciud.png'" />
					<a href="http://www.udistrital.edu.co" target="_blank" title="CIDC...">
						<img
							v-rjs="2"
							id="UD"
							alt="UD"
							width="200"
							height="63"
							class="d-block"
							:src="imgUrl + 'logo-udistrital-gray.png'"
						/>
					</a>
					<a href="http://cidc.udistrital.edu.co" target="_blank" title="CIDC...">
						<img
							v-rjs="2"
							id="CIDC"
							alt="CIDC"
							width="200"
							height="51"
							class="d-block"
							:src="imgUrl + 'logo-cidc-gray.png'"
					/></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
let url = process.env.BASE_URL;
export default {
	name: "app",
	data() {
		return {
			imgUrl: url + "assets/img/",
		};
	},
	components: {
		// HelloWorld
	},
};
</script>
