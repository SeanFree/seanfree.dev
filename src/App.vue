<script setup lang="ts">
import Logo from '@/assets/logo-basic.svg'
import { useRoute } from 'vue-router'

const route = useRoute()

const socialLinks = [
  {
    name: 'LinkedIn',
    to: 'https://linkedin.com/in/sean-free',
    icon: 'ph-linkedin-logo',
  },
  {
    name: 'GitHub',
    to: 'https://github.com/seanfree',
    icon: 'ph-github-logo',
  },
  {
    name: 'CodePen',
    to: 'https://codepen.io/seanfree',
    icon: 'ph-codepen-logo',
  },
]
</script>

<template>
  <div
    class="fixed grid h-screen w-screen grid-cols-1
      grid-rows-[auto_minmax(80vh,1fr)_auto]"
  >
    <AppBackground />
    <header class="w-full">
      <div
        class="relative container flex items-start justify-between p-4
          md:items-center"
      >
        <div class="flex items-center gap-4">
          <Logo
            class="fill-primary size-12 transition-colors duration-200"
            role="presentation"
          />

          <div class="relative self-stretch flex items-center">
            <Transition name="slide-up-fade-out">
              <h1 :key="$route.path" class="heading-sm mb-0">
                {{ route.meta.title }}
              </h1>
            </Transition>
          </div>
        </div>

        <AppNav class="absolute right-4 z-10" />
      </div>
    </header>

    <main class="container h-full p-4 scroll-xy relative">
      <RouterView v-slot="{ Component }">
        <Transition name="slide-up-fade-out" appear>
          <component :is="Component" :key="route.name" />
        </Transition>
      </RouterView>
    </main>

    <footer class="relative">
      <div class="container flex items-center justify-between">
        <nav class="p-4">
          <ul class="flex items-center gap-4">
            <li v-for="{ name, to, icon } in socialLinks" :key="name">
              <a
                :href="to"
                class="flex items-center rounded-full p-2 transition-all
                  no-underline"
                rel="noopener noreferrer"
                target="_blank"
                data-color="secondary"
              >
                <i :class="icon" class="ph text-xl" role="presentation"></i>
                <span class="sr-only">{{ name }}</span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="p-4">
          <ThemeSelector />
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.slide-up-fade-out-enter-active,
.slide-up-fade-out-leave-active {
  position: absolute;
  transition: all 300ms ease;
}

.slide-up-fade-out-enter-active {
  transition-delay: 100ms;
}

.slide-up-fade-out-enter-from {
  transform: translateY(18px);
}

.slide-up-fade-out-leave-to {
  transform: translateY(-18px);
}

.slide-up-fade-out-enter-from,
.slide-up-fade-out-leave-to {
  opacity: 0;
}
</style>
