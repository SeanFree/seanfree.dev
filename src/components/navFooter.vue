<template lang="pug">
	ul.social-links
		li.social-links__item(
			:key="`social-link--${link.name}`"
			v-for="link in socialLinks"
		)
			a.social-links__link(
				:href="link.href"
				target="_blank"
			)
				svg-icon(
					:icon="link.name"
					size="l"
				)
</template>

<script>
import svgIcon from '@/components/svgIcon'

export default {
	name: 'PrimaryNavigation',
	components: {
		svgIcon
	},
	data () {
		return {
			socialLinks: [
				{
					name: 'codepen',
					href: 'https://codepen.io/seanfree'
				},
				{
					name: 'github',
					href: 'https://github.com/SeanFree'
				},
				{
					name: 'twitter',
					href: 'https://twitter.com/stolentext'
				},
				{
					name: 'linkedin',
					href: 'https://www.linkedin.com/in/sean-free-501a8611b/'
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.social-links {
	display: flex;

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
		transition: transform $transition-duration-s;

		&:hover {
			transform: scale(1.1);
		}
	}
}
</style>
