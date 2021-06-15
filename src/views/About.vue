<template lang="pug">
	page-template.about-page
		.about-page__content
			.about-page__heading-container
				h1.about-page__heading About Me
			.about-page__copy
				p.about-page__text Hello there!
				p.about-page__text My name is Sean Free.
				p.about-page__text I'm a web development enthusiast and creative coding hobbyist.
				p.about-page__text I currently work as a Microsoft Collaboration Consultant at&nbsp;
					a(href="https://thrivenextgen.com/" target="_blank" rel="noreferrer") Thrive
					| .
</template>

<script>
import pageTemplate from '@/components/pageTemplate'

export default {
	name: 'AboutPage',
	components: {
		pageTemplate
	}
}
</script>

<style lang="scss" scoped>
.about-page {
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;

	&__content {
		display: flex;
		flex-direction: column;
	}

	&__heading-container {
		overflow: hidden;
		position: relative;

		&:after {
			animation: scaleX $transition-duration-m forwards;
			animation-delay: $transition-duration-l;
			background-color: $amber-4;
			bottom: $space-m - 1px;
			content: "";
			display: block;
			height: 1px;
			position: absolute;
			transform: scaleX(0);
			transform-origin: center left;
			width: $space-4xl;
		}
	}

	&__heading {
		animation: fadeInDetranslate $transition-duration-m forwards;
		animation-delay: $transition-duration-m;
		opacity: 0;
		transform: translateY($space-s);
	}

	&__text {
		animation: fadeInDetranslate $transition-duration-m forwards;
		opacity: 0;
		transform: translateY($space-m);

		@for $i from 1 through 4 {
			&:nth-child(#{$i}) {
				animation-delay: $transition-duration-l + ($transition-duration-s * $i);
			}
		}
	}
}

@keyframes scaleX {
	to {
		transform: scaleX(1);
	}
}

@keyframes fadeInDetranslate {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
