<template lang="pug">
	main.main
		section.content-wrapper
			slot
</template>

<script>
export default {
	name: 'PageTemplate'
}
</script>

<style lang="scss" scoped>
.main {
	flex: 1;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		width: 0;
	}
}
</style>
