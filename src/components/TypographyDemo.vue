<script setup lang="ts"></script>

<template>
  <div class="flex flex-col w-full flex-wrap lg:flex-row gap-4 items-stretch">
    <UiCard class="flex-2">
      <template #header>
        <h2 class="heading-md">Fonts</h2>
      </template>
      <ul>
        <li><span class="font-sans">Lexend (sans-serif) (default)</span></li>
        <li><span class="font-mono">Anonymous Pro (monospace)</span></li>
      </ul>
    </UiCard>

    <UiCard class="flex-5">
      <template #header>
        <h2 class="heading-md">Headings</h2>
      </template>
      <ul>
        <li><span class="heading-2xl">Heading XX-Large</span></li>
        <li><span class="heading-xl">Heading X-Large</span></li>
        <li><span class="heading-lg">Heading Large</span></li>
        <li><span class="heading-md">Heading Medium</span></li>
        <li><span class="heading-sm">Heading Small</span></li>
        <li><span class="heading-xs">Heading X-Small</span></li>
        <li><span class="heading-2xs">Heading XX-Small</span></li>
      </ul>
    </UiCard>
  </div>
</template>
