<template lang="pug">
	footer.page-footer
		section.content-wrapper
			social-nav
</template>

<script>
import socialNav from '@/components/navSocial'

export default {
	name: 'PageFooter',
	components: {
		socialNav
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
	position: relative;
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
