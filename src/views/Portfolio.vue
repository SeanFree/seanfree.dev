<template lang="pug">
	page-template.portfolio-page
		section.portfolio-page__list
			div.portfolio-page__item(v-for="(item, index) in items" :key="`item-${index}`")
</template>

<script>
import pageTemplate from '@/components/pageTemplate'

export default {
	name: 'PortfolioPage',
	data () {
		return {
			items: [
				0,
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				13,
				14,
				15,
				16,
				17,
				18
			]
		}
	},
	components: {
		pageTemplate
	}
}
</script>

<style lang="scss" scoped>
.portfolio-page {
	&__list {
		align-items: flex-start;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	&__item {
		border: 1px solid $cyan-2;
		min-height: 200px;
		flex: 0 0 33%;
		margin: 0 $space-xs $space-xs 0;

		&:nth-child(3n) {
			margin-right: 0;
		}
	}
}
</style>
