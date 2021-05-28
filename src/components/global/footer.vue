<template>
	<div class="footer navbar navbar-expand-lg navbar-light">
		<div class="text-center d-lg-none w-100">
			<button type="button" class="navbar-toggler dropdown-toggle" data-toggle="collapse" data-target="#navbar-footer">
				<i class="icon-unfold mr-2"></i>
				CRÉDITOS
			</button>
		</div>

		<div class="navbar-collapse collapse" id="navbar-footer">
			<span class="navbar-text">
				SICIUD v2.0.20210526 - ©{{ year }}
				<a href="http://cidc.udistrital.edu.co" target="_blank" title="Centro de Investigaciones y Desarrollo Científico..."
					>Centro de Investigaciones y Desarrollo Científico (CIDC)</a
				>
			</span>
			<!-- <span class="text-center"> User: {{ user }}</span> -->
			<ul class="navbar-nav ml-lg-auto">
				<li v-if="oasToken">
					<span class="navbar-nav-link legitRipple color-text" @click.prevent="copyToken()">{{ oasToken }}</span>
				</li>
				<li class="nav-item" v-if="isDev && !authenticated">
					<a :href="linkLogin1" class="navbar-nav-link legitRipple color-text"><i class="icon-user"></i> Administrador</a>
				</li>
				<li class="nav-item" v-if="isDev && !authenticated">
					<a :href="linkLogin2" class="navbar-nav-link legitRipple color-text"><i class="icon-user"></i> Integrante</a>
				</li>
				<li class="nav-item" v-if="isDev && !authenticated">
					<a :href="linkLogin4" class="navbar-nav-link legitRipple color-text"><i class="icon-user"></i> Estudiante</a>
				</li>
				<li class="nav-item">
					<a href="http://cidc.udistrital.edu.co" class="navbar-nav-link legitRipple" target="_blank"><i class="icon-file-text2"></i> Documentación</a>
				</li>
				<li class="nav-item">
					<a href="http://cidc.udistrital.edu.co" class="navbar-nav-link legitRipple pr-1" target="_blank"><i class="icon-lifebuoy"></i> Soporte</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "globalFooter",
	components: {},
	data: () => ({
		showDev: true,
	}),
	watch: {
		$route(to) {
			this.showDev = to.name !== "login" && !this.authenticated && this.isDev;
		},
	},
	methods: {
		copyToken() {
			this.$toClipboard(this.oasToken);
		},
	},
	computed: {
		...mapGetters("auth/login", ["oasToken"]),
		token() {
			return window.config.api.oas.token_value;
		},
		link() {
			return "";
		},
		linkLogin1() {
			return `/login#access_token=${this.token}&id_token=eyJ4NXQiOiJObUptT0dVeE16WmxZak0yWkRSaE5UWmxZVEExWXpkaFpUUmlPV0UwTldJMk0ySm1PVGMxWkEiLCJraWQiOiJkMGVjNTE0YTMyYjZmODhjMGFiZDEyYTI4NDA2OTliZGQzZGViYTlkIiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiRGg4QXhOX2FDLTZOQVBkbXFSblVLdyIsInN1YiI6ImR2YXJnYXN2IiwiYXVkIjpbImsxd0N5QkxxOE5ZVTFLT1hGMHVmaEJtU0tPRWEiXSwicm9sZSI6WyJDT05UUkFUSVNUQSIsIkludGVybmFsXC9ldmVyeW9uZSJdLCJhenAiOiJrMXdDeUJMcThOWVUxS09YRjB1ZmhCbVNLT0VhIiwiaXNzIjoiYXV0ZW50aWNhY2lvbi5wb3J0YWxvYXMudWRpc3RyaXRhbC5lZHUuY28iLCJkb2N1bWVudG8iOiI3OTYwMjMwOSIsImRvY3VtZW50b19jb21wdWVzdG8iOiJDQzc5NjAyMzA5IiwiZXhwIjoxNjE1NTM4ODgxLCJub25jZSI6ImQ3ZGI3ZjU3YjM0YTJkMmI3ZGJlOTNjZGU2NDg4OGQ0IiwiaWF0IjoxNjE1NTM1MjgxLCJlbWFpbCI6ImR2YXJnYXN2QHVkaXN0cml0YWwuZWR1LmNvIn0.SkE3-WIm7H81gHLrFqmvEBF5f3DvS5cukno0OkasxHaKM-3HmlnC_nLgYIozQsCge7StS1c0o_g4UclFu1s3H20dlurQcGGKco455KOcuSs7EQYnonwwn4r8sXsns2dsp_8RC4ZafqODHaSSfMcyMYgvjYD0Ct6xyt106GbsfJs&state=3b219ab064b0515e0e95b9d0983885fa&token_type=Bearer&expires_in=3600&session_state=d1b12f2be30113e82f30828798aa3e59819abb228ab2a16d0114ff6d6f45913d.xyH5LS0fbHX4B92MBZqW8w`;
		},
		linkLogin2() {
			return `/login#access_token=${this.token}&id_token=eyJ4NXQiOiJObUptT0dVeE16WmxZak0yWkRSaE5UWmxZVEExWXpkaFpUUmlPV0UwTldJMk0ySm1PVGMxWkEiLCJraWQiOiJkMGVjNTE0YTMyYjZmODhjMGFiZDEyYTI4NDA2OTliZGQzZGViYTlkIiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiWW1XVjM2VllSLTFNbXlNVXpZRlBMdyIsInN1YiI6ImphYm9jYW5lZ3JhYSIsImF1ZCI6WyJrMXdDeUJMcThOWVUxS09YRjB1ZmhCbVNLT0VhIl0sInJvbGUiOlsiQ09OVFJBVElTVEEiLCJJbnRlcm5hbFwvZXZlcnlvbmUiLCJBcHBsaWNhdGlvblwvamFib2NhbmVncmFhX2NpZGNfU0FOREJPWCIsIkFwcGxpY2F0aW9uXC9qYWJvY2FuZWdyYWFfY2lkY19QUk9EVUNUSU9OIl0sImF6cCI6Imsxd0N5QkxxOE5ZVTFLT1hGMHVmaEJtU0tPRWEiLCJpc3MiOiJhdXRlbnRpY2FjaW9uLnBvcnRhbG9hcy51ZGlzdHJpdGFsLmVkdS5jbyIsImRvY3VtZW50byI6IjEwMzI0Nzk5MjkiLCJkb2N1bWVudG9fY29tcHVlc3RvIjoiQ0MxMDMyNDc5OTI5IiwiZXhwIjoxNjAwOTAyNDMxLCJub25jZSI6ImI4NjU1YzM0MjBiYWMwZjc1ZTg2MGVkNGY1ODY1Njg2IiwiaWF0IjoxNjAwODk4ODMxLCJlbWFpbCI6ImphYm9jYW5lZ3JhYUBjb3JyZW8udWRpc3RyaXRhbC5lZHUuY28ifQ.Gsd3C8d20caZgIt7n62Q3FEhjdJ5AL9mZHKzArcOR8UiK6QIuhhM362PyjpdXPp5cNC729moZCyzG6pfNe8NkFupk9B54QWK8YrVyCdHHKLOhce5gZsb1M6LT2U1N30K1qqIpot4_W0AJuT72Dmu2WPzSi6f9EAdwpFayantBXE&state=3b6c19bba400cad389a6785e69673c57&token_type=Bearer&expires_in=3600&session_state=d98e15a38acca0c22052c5a29438b652ac29b2170507e1cd40ea77217cc1125f.CB_Hff8FUA1N53GvLwFacQ%3E`;
		},
		linkLogin3() {
			return `/login#access_token=${this.token}&id_token=eyJ4NXQiOiJObUptT0dVeE16WmxZak0yWkRSaE5UWmxZVEExWXpkaFpUUmlPV0UwTldJMk0ySm1PVGMxWkEiLCJraWQiOiJkMGVjNTE0YTMyYjZmODhjMGFiZDEyYTI4NDA2OTliZGQzZGViYTlkIiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiV2xiZUc5VGVSTUtCdmxqc0hyMTBOZyIsInN1YiI6ImR2YXJnYXN2QHVkaXN0cml0YWwuZWR1LmNvIiwiYXVkIjpbImsxd0N5QkxxOE5ZVTFLT1hGMHVmaEJtU0tPRWEiXSwiYXpwIjoiazF3Q3lCTHE4TllVMUtPWEYwdWZoQm1TS09FYSIsImlzcyI6ImF1dGVudGljYWNpb24ucG9ydGFsb2FzLnVkaXN0cml0YWwuZWR1LmNvIiwiZXhwIjoxNjE4NDUxNjgwLCJub25jZSI6Ijc3NDQ0NDViNmEzM2JjYjk1NjQzNWQwN2VmNTFiOTBkIiwiaWF0IjoxNjE4NDQ4MDgwLCJlbWFpbCI6ImR2YXJnYXN2QHVkaXN0cml0YWwuZWR1LmNvIn0.PiQHxnAs0JtJrAjGVZ-_ZtFxBhyVlpX4MlMcOh4ZFtbX73BS7A44ymYOnCFX2iK3FmeGR9gAA_FVoHYZ52zsmKaQy89BwXm9LwMU-ZXdf390Z8fhZbwyqU8bE2_UXq63nuDaMrMdvzrH5ov2KJ5ez0_nKn6nzhAi00BSgYHT3hQ&state=3db777601d837072a41b65ea8796d0bb&token_type=Bearer&expires_in=2512&session_state=3498d77ad4d663c5a686c7fb07c2754118c08343ebc3d694c9ee6238a7f4e989.lfpcCJ6hrlptLkQaVQNP_A`;
		},
		linkLogin4() {
			return `/login#access_token=${this.token}&id_token=eyJ4NXQiOiJObUptT0dVeE16WmxZak0yWkRSaE5UWmxZVEExWXpkaFpUUmlPV0UwTldJMk0ySm1PVGMxWkEiLCJraWQiOiJkMGVjNTE0YTMyYjZmODhjMGFiZDEyYTI4NDA2OTliZGQzZGViYTlkIiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiMFNjclBsVC1ESXI0SXFwR0NOS3FzQSIsInN1YiI6ImNlcm9jaGFjQGNvcnJlby51ZGlzdHJpdGFsLmVkdS5jbyIsImF1ZCI6WyJrMXdDeUJMcThOWVUxS09YRjB1ZmhCbVNLT0VhIl0sImF6cCI6Imsxd0N5QkxxOE5ZVTFLT1hGMHVmaEJtU0tPRWEiLCJpc3MiOiJhdXRlbnRpY2FjaW9uLnBvcnRhbG9hcy51ZGlzdHJpdGFsLmVkdS5jbyIsImV4cCI6MTYxODg2NTkyMCwibm9uY2UiOiJiNWRhZDEwZDBlODA2Mjc1NjA4Y2I1ZDQ4YzE3YjcwOSIsImlhdCI6MTYxODg2MjMyMCwiZW1haWwiOiJjZXJvY2hhY0Bjb3JyZW8udWRpc3RyaXRhbC5lZHUuY28ifQ.RuKwo4MAB5ZEN4FzPFUrDC5GOdOJ5n4478pjqPsVZ38ok_B15qt7AXz7uGWTPjkU1HhOjrj42zDMb7kv7dYacPHZHDtlqVfjpGHx_z_DXG4-7aaoChHMh9DC_Pw8_KzHkyta-b6qe5Ni-dZ5D8Kqu1eHh_FS3h4CuG26MjzfGPQ&state=3db777601d837072a41b65ea8796d0bb&token_type=Bearer&expires_in=2512&session_state=3498d77ad4d663c5a686c7fb07c2754118c08343ebc3d694c9ee6238a7f4e989.lfpcCJ6hrlptLkQaVQNP_A`;
		},
		year: function() {
			return new Date().getFullYear();
		},
		env: function() {
			return this.$capitalize(process.env.NODE_ENV);
			// return this.$baseUrl();
		},
	},
};
</script>
