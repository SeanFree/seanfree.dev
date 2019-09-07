<template lang="pug">
	nav.navigation
		ul.navigation__list
			li.navigation__item(v-for="route in routes")
				router-link.navigation__link(
					:key="`nav-link-${route.name}`"
					:to="route.path"
					@click.native="updateActiveIndicator($event)"
				) {{ route.name }}
		span.navigation__active-indicator(ref="activeIndicator")
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
	},
	methods: {
		updateActiveIndicator ($event) {
			const activeLink = this.$el.querySelector('.router-link-exact-active')

			this.$refs.activeIndicator.style.transform = `translateX(${activeLink.offsetLeft}px) translateZ(0)`
			this.$refs.activeIndicator.style.width = `${activeLink.offsetWidth}px`
		}
	},
	mounted () {
		setTimeout(this.updateActiveIndicator.bind(this), 50)
	}
}
</script>

<style lang="scss" scoped>
.navigation {
	position: relative;

	&__list {
		display: flex;
		list-style: none;
	}

	&__item {
		&:not(:last-child) {
			margin-right: $space-s;
		}
	}

	&__link {
		color: $white;
		display: block;
		padding: $space-s;
		text-decoration: none;
	}

	&__active-indicator {
			border-bottom: 1px solid $amber-4;
			bottom: 0;
			content: "";
			display: block;
			position: absolute;
			transform: translateX(0) translateZ(0);
			transform-origin: center left;
			transition: transform $transition-duration-s, width $transition-duration-s;
			width: 0;
	}
}
</style>
