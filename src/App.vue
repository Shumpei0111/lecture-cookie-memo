<template>
	<div id="app">
		<div v-if="!isLoggedIn">
			<Login @valid-login="validLogin" />
		</div>
		<div v-else>
			<img class="vue-logo" alt="Vue logo" src="./assets/logo.png">
			<TaskContainer />
		</div>
	</div>
</template>

<script>
import Login from "@/components/global/Login.vue";
import TaskContainer from '@/components/global/TaskContainer.vue';

import { cookieManager } from './lib/Cookie.js';

export default {
	name: 'App',
	components: {
		TaskContainer,
		Login
	},
	data: function() {
		return {
			isLoggedIn: false,
		}
	},
	methods: {
		validLogin: function( item ) {
			const { id, pass } = item;
			console.log(id, pass);
			if( id === "cooptech" && pass === "frontend" ) {
				this.isLoggedIn = true;
				cookieManager.validLoggedIn();
				return;
			}
			alert( "invalid authenticated" );
			return;
		},
		init: function() {
			if( cookieManager.checkValidLoggedIn() ) {
				this.isLoggedIn = true;
			}
		},
	},
	mounted: function() {
		this.init();
	},
}
</script>

<style lang="scss">
@use "../src/assets/util.scss";

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	max-width: 768px;
	width: 768px;
	margin: 0 auto;
	padding: 40px 0;
	min-height: 100vh;
	overflow-x: hidden;

	.vue-logo {
		width: 40px;
	}
}
</style>
