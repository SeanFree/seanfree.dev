<template lang="pug">
	nav.navigation
		ul.navigation__list
			li.navigation__item(v-for="route in routes")
				a.navigation__link(:href="route.path" :key="`nav-link-${route.name}`") {{ route.name }}
</template>

<script>
export default {
	name: 'PrimaryNavigation',
	computed: {
		routes () {
			return this.$router.options.routes.map(route => ({
				name: route.name,
				path: route.path
			}))
		}
	}
}
</script>

<style lang="scss" scoped>
.navigation {
	&__list {
		display: flex;
		list-style: none;
	}

	&__item {
		margin: $space-s;
	}

	&__link {
		color: $white;
		display: block;
		font-family: sans-serif;
	}
}
</style>
