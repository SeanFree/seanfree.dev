<script setup lang="ts">
const tokenClasses = {
  Neutral: {
    Softest: 'bg-neutral-softest',
    Softer: 'bg-neutral-softer',
    Soft: 'bg-neutral-soft',
    Base: 'bg-neutral',
    Strong: 'bg-neutral-strong',
    Stronger: 'bg-neutral-stronger',
    Strongest: 'bg-neutral-strongest',
  },
  Primary: {
    Softer: 'bg-primary-softer',
    Soft: 'bg-primary-soft',
    Base: 'bg-primary',
    Strong: 'bg-primary-strong',
    Stronger: 'bg-primary-stronger',
  },
  Secondary: {
    Softer: 'bg-secondary-softer',
    Soft: 'bg-secondary-soft',
    Base: 'bg-secondary',
    Strong: 'bg-secondary-strong',
    Stronger: 'bg-secondary-stronger',
  },
  Error: {
    Softer: 'bg-error-softer',
    Soft: 'bg-error-soft',
    Base: 'bg-error',
    Strong: 'bg-error-strong',
    Stronger: 'bg-error-stronger',
  },
  Warning: {
    Softer: 'bg-warning-softer',
    Soft: 'bg-warning-soft',
    Base: 'bg-warning',
    Strong: 'bg-warning-strong',
    Stronger: 'bg-warning-stronger',
  },
  Success: {
    Softer: 'bg-success-softer',
    Soft: 'bg-success-soft',
    Base: 'bg-success',
    Strong: 'bg-success-strong',
    Stronger: 'bg-success-stronger',
  },
}
const primitiveClasses = {
  Blue: [
    'bg-blue-50',
    'bg-blue-100',
    'bg-blue-200',
    'bg-blue-300',
    'bg-blue-400',
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-blue-800',
    'bg-blue-900',
    'bg-blue-950',
  ],

  Teal: [
    'bg-teal-50',
    'bg-teal-100',
    'bg-teal-200',
    'bg-teal-300',
    'bg-teal-400',
    'bg-teal-500',
    'bg-teal-600',
    'bg-teal-700',
    'bg-teal-800',
    'bg-teal-900',
    'bg-teal-950',
  ],

  Green: [
    'bg-green-50',
    'bg-green-100',
    'bg-green-200',
    'bg-green-300',
    'bg-green-400',
    'bg-green-500',
    'bg-green-600',
    'bg-green-700',
    'bg-green-800',
    'bg-green-900',
    'bg-green-950',
  ],

  Yellow: [
    'bg-yellow-50',
    'bg-yellow-100',
    'bg-yellow-200',
    'bg-yellow-300',
    'bg-yellow-400',
    'bg-yellow-500',
    'bg-yellow-600',
    'bg-yellow-700',
    'bg-yellow-800',
    'bg-yellow-900',
    'bg-yellow-950',
  ],

  Orange: [
    'bg-orange-50',
    'bg-orange-100',
    'bg-orange-200',
    'bg-orange-300',
    'bg-orange-400',
    'bg-orange-500',
    'bg-orange-600',
    'bg-orange-700',
    'bg-orange-800',
    'bg-orange-900',
    'bg-orange-950',
  ],

  Red: [
    'bg-red-50',
    'bg-red-100',
    'bg-red-200',
    'bg-red-300',
    'bg-red-400',
    'bg-red-500',
    'bg-red-600',
    'bg-red-700',
    'bg-red-800',
    'bg-red-900',
    'bg-red-950',
  ],

  Purple: [
    'bg-purple-50',
    'bg-purple-100',
    'bg-purple-200',
    'bg-purple-300',
    'bg-purple-400',
    'bg-purple-500',
    'bg-purple-600',
    'bg-purple-700',
    'bg-purple-800',
    'bg-purple-900',
    'bg-purple-950',
  ],

  Gray: [
    'bg-gray-50',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-300',
    'bg-gray-400',
    'bg-gray-500',
    'bg-gray-600',
    'bg-gray-700',
    'bg-gray-800',
    'bg-gray-900',
    'bg-gray-950',
  ],

  'Warm Gray': [
    'bg-warm-gray-50',
    'bg-warm-gray-100',
    'bg-warm-gray-200',
    'bg-warm-gray-300',
    'bg-warm-gray-400',
    'bg-warm-gray-500',
    'bg-warm-gray-600',
    'bg-warm-gray-700',
    'bg-warm-gray-800',
    'bg-warm-gray-900',
    'bg-warm-gray-950',
  ],

  'Cool Gray': [
    'bg-cool-gray-50',
    'bg-cool-gray-100',
    'bg-cool-gray-200',
    'bg-cool-gray-300',
    'bg-cool-gray-400',
    'bg-cool-gray-500',
    'bg-cool-gray-600',
    'bg-cool-gray-700',
    'bg-cool-gray-800',
    'bg-cool-gray-900',
    'bg-cool-gray-950',
  ],
}
</script>

<template>
  <section>
    <h2 class="heading-lg border-b-neutral-softer border-b py-4 mb-4">
      Color Tokens
    </h2>
    <div class="flex flex-col gap-4">
      <p>Themeable color variables</p>
      <section v-for="(tokens, colorName) in tokenClasses" :key="colorName">
        <h3 class="heading-md mb-2">
          {{ colorName }}
        </h3>
        <div class="flex items-start gap-4">
          <UiCard
            v-for="(bgClass, tokenName) in tokens"
            :key="`${colorName}-${tokenName}`"
            compact
          >
            <template #header>
              <h4 class="heading-2xs">{{ tokenName }}</h4>
            </template>
            <div
              class="border-neutral-softest size-24 rounded-lg border"
              :class="bgClass"
            />
          </UiCard>
        </div>
      </section>
    </div>
  </section>

  <section>
    <h2 class="heading-lg border-b-neutral-softer border-b py-4 mb-4">
      Primitive Colors
    </h2>
    <div class="flex flex-col gap-4">
      <section
        v-for="(primitives, colorName) in primitiveClasses"
        :key="colorName"
      >
        <h3 class="heading-md mb-2">{{ colorName }}</h3>
        <div class="scroll-y flex items-start gap-2 overflow-x-auto">
          <UiCard
            v-for="(bgClass, i) in primitives"
            :key="`${colorName}-${i}`"
            compact
          >
            <template #header>
              <h4 class="heading-2xs">{{ bgClass.replace(/[^0-9]/g, '') }}</h4>
            </template>
            <div
              class="border-neutral-softest size-24 rounded-lg border"
              :class="bgClass"
            />
          </UiCard>
        </div>
      </section>
    </div>
  </section>
</template>
