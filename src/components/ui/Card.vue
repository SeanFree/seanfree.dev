<script setup lang="ts">
import { computed } from 'vue'

interface CardTheme {
  header?: string
  body?: string
  footer?: string
}

const props = defineProps<{
  compact?: boolean
  theme?: CardTheme
}>()

const paddingClass = computed(() => (props.compact ? 'p-2' : 'p-4'))

defineSlots<{
  default: []
  header: []
  footer: []
}>()
</script>

<template>
  <section
    :class="compact ? 'p-1' : 'p-2'"
    class="flex flex-col bg-neutral-softest/65 backdrop-blur-md border
      border-neutral-softer rounded-xl"
  >
    <header
      v-if="$slots.header"
      :class="[
        paddingClass,
        {
          'mb-1': compact,
        },
      ]"
      class="rounded-lg bg-neutral-softer/35 relative border
        border-neutral-softer"
    >
      <slot name="header" />
    </header>
    <div
      :class="{
        'p-4': !compact,
      }"
    >
      <slot />
    </div>
    <footer :class="paddingClass" class="rounded-b-lg" v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </section>
</template>
