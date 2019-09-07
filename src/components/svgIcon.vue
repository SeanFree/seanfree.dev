<template lang="pug">
	span(
		:class="classArray"
		v-html="src"
	)
</template>

<script>
export default {
	name: 'SVGIcon',
	props: {
		icon: {
			type: String,
			required: true
		},
		size: {
			type: String,
			default: 's'
		}
	},
	computed: {
		classArray () {
			return [
				'svg-icon',
				`svg-icon--${this.size}`
			]
		},
		src () {
			return require(`!svg-inline-loader!@/assets/icons/${this.icon}.svg`)
		}
	}
}
</script>

<style lang="scss" scoped>
.svg-icon {
	display: inline-block;

	/deep/ svg {
		display: block;
		width: 100%;
	}

	&--s {
		height: $size-s;
		width: $size-s;
	}

	&--m {
		height: $size-m;
		width: $size-m;
	}

	&--l {
		height: $size-l;
		width: $size-l;
	}
}
</style>
