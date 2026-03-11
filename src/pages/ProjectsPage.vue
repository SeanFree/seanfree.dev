<script setup lang="ts">
import fractoidLogo from '/fractoid-logo.png?url'
import fractoidPreview from '/fractoid-preview.png?url'
import classtabLogo from '/classtab-logo.png?url'
import classtabDarkModePreview from '/classtab-dark-mode-preview.png?url'

interface ProjectItem {
  title: string
  url: string
  sourceUrl: string
  description: string
  logoUrl: string
  previewUrl: string
  tools: string[]
}

const projects: ProjectItem[] = [
  {
    title: 'Fractoid',
    url: 'https://fractoid.dev',
    sourceUrl: 'https://github.com/seanfree/fractoid',
    description:
      'An audio app with a fractal visualizer. This app is built with a fully custom WebGL + Web Audio implementation, no libraries. All shader uniforms are exposed in the UI and can be mapped to audio frequency channels to tune the visualizer.',
    logoUrl: fractoidLogo,
    previewUrl: fractoidPreview,
    tools: ['Vue', 'TypeScript', 'WebGL', 'GLSL'],
  },
  {
    title: 'Classtab Dark Mode',
    url: 'https://chromewebstore.google.com/detail/classtaborg-dark-mode/ekbhhepfdbfghbgpcfokaggmokndljoa',
    sourceUrl: 'https://github.com/seanfree/chrome-classtab-dark-mode',
    description:
      "A chrome extension which adds 4 dark mode themes for classtab.org. As a self-taught classical guitarist, I'm a long time user of classtab.org (around 24 years). Some facebook community members were requesting a dark mode for the site and I offered to develop a chrome extension.",
    logoUrl: classtabLogo,
    previewUrl: classtabDarkModePreview,
    tools: ['JavaScript', 'Chrome API'],
  },
]
</script>

<template>
  <div class="flex flex-col gap-8">
    <UiCard v-for="(project, i) in projects" :key="i">
      <template #header>
        <h2 class="heading-md flex items-center gap-3">
          <img :src="project.logoUrl" class="size-6" role="presentation" />
          {{ project.title }}
        </h2>
      </template>
      <div class="flex items-start gap-4 flex-col md:flex-row">
        <p class="mb-4">{{ project.description }}</p>

        <figure
          class="overflow-hidden rounded-md shrink-0 max-w-84
            border-neutral-softer border"
        >
          <img :src="project.previewUrl" class="h-full" />
        </figure>
      </div>
      <template #footer>
        <div class="flex items-center justify-between">
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="(tool, j) in project.tools"
              :key="`${i}-${j}`"
              class="bg-neutral-softest border border-neutral-softer
                text-neutral-strong rounded-full px-2"
            >
              {{ tool }}
            </li>
          </ul>
          <div class="flex flex-wrap items-center justify-end gap-4">
            <a
              class="rounded whitespace-nowrap"
              :href="project.url"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i class="ph ph-globe text-sm"></i>
              Website
            </a>
            <a
              class="rounded"
              :href="project.sourceUrl"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i class="ph ph-github-logo text-sm"></i>
              Source Code
            </a>
          </div>
        </div>
      </template>
    </UiCard>
  </div>
</template>
