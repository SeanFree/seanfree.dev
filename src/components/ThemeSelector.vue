<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

type ThemeName = 'ocean' | 'mint' | 'sienna'
type ThemeKey = ThemeName | `${ThemeName}-dark`

const LOCAL_STORAGE_THEME_KEY = 'seanfree-dev-theme'
const defaultTheme = 'sienna'

const themes: ThemeName[] = ['mint', 'ocean', 'sienna']

const theme = useLocalStorage<ThemeKey>(LOCAL_STORAGE_THEME_KEY, defaultTheme)

const themePreviewClasses = {
  mint: 'bg-teal-300 hover:bg-teal-400 dark:bg-teal-600',
  ocean: 'bg-blue-300 hover:bg-blue-400 dark:bg-blue-600',
  sienna:
    'bg-orange-300 hover:bg-orange-400 dark:bg-orange-700 dark:hover:bg-orange-500',
}

const themeName = computed({
  get() {
    return theme.value.replace('-dark', '') as ThemeName
  },
  set(key: ThemeName) {
    theme.value = `${key}${isDark.value ? '-dark' : ''}`
  },
})

const isOpen = ref(false)
const isDark = computed(() => theme.value.endsWith('dark'))

const toggleDarkTheme = () => {
  if (isDark.value) {
    theme.value = theme.value.replace('-dark', '') as ThemeKey
  } else {
    theme.value = `${theme.value}-dark` as ThemeKey
  }
}

watch(theme, () => {
  document.documentElement.setAttribute('data-theme', theme.value)

  document.body.dispatchEvent(new Event('theme-change'))
})
</script>

<template>
  <div class="flex flex-row-reverse items-center gap-3 transition-transform">
    <UiButton
      variant="ghost"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      :start-icon="isOpen ? 'ph-x' : 'ph-palette'"
      rounded
      @click="isOpen = !isOpen"
    />
    <div class="inline-flex items-center gap-3">
      <UiButton
        :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
        class="transition-all! delay-75! duration-100!"
        :class="{
          'pointer-events-none translate-x-4 opacity-0': !isOpen,
          'translate-x-0 opacity-100': isOpen,
        }"
        variant="ghost"
        rounded
        :start-icon="isDark ? 'ph-moon' : 'ph-sun'"
        :tabindex="isOpen ? 0 : -1"
        @click="toggleDarkTheme"
      />

      <fieldset class="flex items-center gap-3 self-stretch">
        <label
          v-for="(name, i) in themes"
          :key="name"
          class="flex items-center transition-all"
          :class="{
            'pointer-events-none translate-x-4 opacity-0': !isOpen,
            'translate-x-0 opacity-100': isOpen,
          }"
          :style="{
            transitionDelay: `${25 * themes.length - (i + 1) * 25}ms`,
          }"
          :for="`rdo-theme-${name}`"
        >
          <span class="sr-only">{{ name }}</span>

          <input
            :id="`rdo-theme-${name}`"
            v-model="themeName"
            class="peer sr-only"
            type="radio"
            name="theme"
            :value="name"
            :tabindex="isOpen ? 0 : -1"
          />

          <div
            :class="themePreviewClasses[name]"
            class="peer-focus:outline-primary-strong clickable flex size-full
              overflow-hidden rounded-full p-1 outline-2 outline-transparent
              justify-center transition-all peer-checked:*:opacity-100
              peer-focus:outline-2"
          >
            <i class="ph ph-eye opacity-0 text-neutral-stronger" />
          </div>
        </label>
      </fieldset>
    </div>
  </div>
</template>
