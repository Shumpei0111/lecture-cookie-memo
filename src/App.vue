<template>
	<div id="app">
		<img class="vue-logo" alt="Vue logo" src="./assets/logo.png">
		<TaskContainer />
	</div>
</template>

<script>
import TaskContainer from '@/components/global/TaskContainer.vue';

export default {
	name: 'App',
	components: {
		TaskContainer
	}
}
</script>

<style lang="scss">
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
