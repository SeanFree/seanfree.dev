<template lang="pug">
	main.main
		page-header
		router-view
</template>

<script>
import pageHeader from './components/pageHeader'

export default {
	name: 'App',
	components: {
		pageHeader
	}
}
</script>

<style lang="scss">
@import "./styles/normalize.css";

html, body {
	background-color: $gray-10;
	color: $white;
	width: 100%;
}
</style>
