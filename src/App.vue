<template lang="pug">
	div#app.page-wrapper
		page-header
		transition(name="fade" mode="out-in")
			router-view
		page-footer
</template>

<script>
import pageHeader from '@/components/pageHeader'
import pageTemplate from '@/components/pageTemplate'
import pageFooter from '@/components/pageFooter'

export default {
	name: 'App',
	components: {
		pageHeader,
		pageTemplate,
		pageFooter
	}
}
</script>

<style lang="scss">
@import "./styles/generic/reset.css";
@import "./styles/main.scss";

.fade-enter-active,
.fade-leave-active {
	transform: translateX(0);
  transition: opacity $transition-duration-m, transform $transition-duration-m;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
	transform: translateX($space-xl);
}

.background-canvas {
	height: 100vh;
	left: 0;
	position: absolute;
	top: 0;
	width: 100vw;

	&__overlay {
		background-image: radial-gradient(transparentize($gray-10, 0.8), transparentize($gray-10, 0.2));
		height: 100vh;
		left: 0;
		position: absolute;
		top: 0;
		width: 100vw;
	}
}
</style>
