<script setup lang="ts">
import seanFreePhoto from '/sean-free-photo.png?url'
</script>

<template>
  <div
    class="inline-flex items-center relative gap-4 top-1/2 -translate-y-1/2
      bg-neutral-softest/65 backdrop-blur-md rounded-full py-2 pl-2 pr-10 border
      border-neutral-softer"
  >
    <div class="overflow-hidden rounded-full size-40">
      <img :src="seanFreePhoto" />
    </div>
    <div class="flex h-full flex-col items-start justify-center gap-3">
      <h2 class="heading-2xl">Sean Free</h2>
      <div
        class="after:bg-primary after:block after:h-2 after:w-16
          after:rounded-full"
        role="presentation"
      />
      <p>
        Senior Software Engineer
        <a
          class="rounded transition-colors"
          href="https://www.linkedin.com/company/rialtic-io"
          rel="noopener noreferrer"
          target="_blank"
        >
          @Rialtic
        </a>
      </p>
    </div>
  </div>
</template>
