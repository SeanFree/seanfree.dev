<template lang="pug">
	footer.page-footer
		section.content-wrapper
			footer-nav
</template>

<script>
import footerNav from '@/components/navFooter'

export default {
	name: 'PageFooter',
	components: {
		footerNav
	},
	computed: {
		pageName () {
			return this.$route.name
		}
	}
}
</script>

<style lang="scss" scoped>
.page-footer {
	bottom: 0;
	position: absolute;
	width: 100%;

	.content-wrapper {
		display: flex;
		justify-content: flex-end;
		width: 100%;
	}
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
