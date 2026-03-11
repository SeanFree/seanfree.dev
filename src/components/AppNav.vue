<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isOpen = ref(true)

const routerLinks = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'Resume',
    to: '/resume',
  },
  {
    name: 'Projects',
    to: '/projects',
  },
]
</script>

<template>
  <div class="flex flex-row-reverse items-center">
    <UiButton
      variant="ghost"
      rounded
      :aria-label="`${isOpen ? 'Close' : 'Open'} nav menu`"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      aria-controls="app-nav"
      :start-icon="isOpen ? 'ph-x' : 'ph-list'"
      @click="isOpen = !isOpen"
    />
    <nav id="app-nav" class="p-2">
      <ul class="flex items-center gap-2">
        <li
          v-for="({ name, to }, i) in routerLinks"
          :key="name"
          class="flex items-center justify-end"
        >
          <RouterLink
            :to="to"
            data-color="primary"
            class="flex items-center rounded-full px-3 py-1 text-right
              transition-all"
            :class="{
              'text-neutral-strong': route.path === to,
              'pointer-events-none translate-x-4 opacity-0': !isOpen,
              'translate-x-0 opacity-100': isOpen,
            }"
            :style="{
              transitionDelay: `${25 * routerLinks.length - (i + 1) * 25}ms`,
            }"
            :tabindex="isOpen ? 0 : -1"
          >
            {{ name }}
            <div
              class="bg-primary h-1 rounded-full transition-all"
              :class="{
                'bg-primary ml-2 w-4': route.path === to,
                'ml-0 w-0 bg-transparent': route.path !== to,
              }"
              role="presentation"
            />
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
