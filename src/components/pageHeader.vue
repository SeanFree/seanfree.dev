<template lang="pug">
	header.page-header
		section.content-wrapper
			header-nav
</template>

<script>
import headerNav from '@/components/navHeader'

export default {
	name: 'PageHeader',
	components: {
		headerNav
	}
}
</script>
