<template lang="pug">
	main(:id="`page--${pageName}`")
		section.content-wrapper
			slot
</template>

<script>
export default {
	name: 'PageTemplate'
}
</script>
