<script setup lang="ts">
import { computed, useAttrs, type ButtonHTMLAttributes } from 'vue'

type ButtonVariant = 'solid' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'
type UiColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'error'
  | 'success'
  | 'warning'
interface ButtonTheme {
  root?: string
  startIcon?: string
  endIcon?: string
  text?: string
}
interface ButtonProps {
  variant?: ButtonVariant
  color?: UiColor
  text?: string
  rounded?: boolean
  startIcon?: string
  endIcon?: string
  size?: ButtonSize
  theme?: ButtonTheme
}

const {
  variant = 'solid',
  color = 'primary',
  text,
  rounded = false,
  startIcon,
  endIcon,
  size = 'md',
} = defineProps<ButtonProps>()

const slots = defineSlots<{
  default: []
  'start-icon': []
  'end-icon': []
  text: []
}>()

const attrs = useAttrs() as Partial<ButtonHTMLAttributes>

const iconOnly = computed(
  () => !text && !slots.default && (endIcon || startIcon),
)

const rootClasses: Record<ButtonVariant, Record<UiColor, string>> = <const>{
  solid: {
    primary: 'bg-primary active:bg-primary-soft',
    secondary: 'bg-secondary-soft active:bg-secondary-softer',
    neutral: 'bg-neutral-softer active:bg-neutral-softest',
    error: 'bg-error-soft active:bg-error-softer',
    success: 'bg-success active:bg-success-soft',
    warning: 'bg-warning active:bg-warning-soft',
  },
  outline: {
    primary:
      'border-2 border-primary bg-transparent hover:bg-primary-softer active:bg-primary-soft',
    secondary:
      'border-2 border-secondary bg-transparent hover:bg-secondary-softer active:bg-secondary-soft',
    neutral:
      'border-2 border-neutral bg-transparent hover:bg-neutral-softest active:bg-neutral-softer',
    error:
      'border-2 border-error bg-transparent hover:bg-error-softer active:bg-error-soft',
    warning:
      'border-2 border-warning bg-transparent hover:bg-warning-softer active:bg-warning-soft',
    success:
      'border-2 border-success bg-transparent hover:bg-success-softer active:bg-success-soft',
  },
  ghost: {
    primary: 'bg-transparent hover:bg-primary-softer active:bg-primary-soft',
    secondary:
      'bg-transparent hover:bg-secondary-softer active:bg-secondary-soft',
    neutral: 'bg-transparent hover:bg-neutral-softest active:bg-neutral-softer',
    error: 'bg-transparent hover:bg-error-softer active:bg-error-soft',
    warning: 'bg-transparent hover:bg-warning-softer active:bg-warning-soft',
    success: 'bg-transparent hover:bg-success-softer active:bg-success-soft',
  },
}

const focusableClasses: Record<UiColor, string> = <const>{
  primary: 'focusable',
  secondary: 'focusable-secondary',
  neutral: 'focusable',
  error: 'focusable-error',
  warning: 'focusable-warning',
  success: 'focusable-success',
}

const sizeClasses = computed<Record<ButtonSize, string>>(() => ({
  sm: `text-sm ${rounded || iconOnly.value ? 'p-1.5' : 'px-3 py-1.5'} gap-1 leading-3.5`,
  md: `text-md ${rounded || iconOnly.value ? 'p-2' : 'px-3.5 py-2'} gap-2 leading-4`,
  lg: `text-lg ${rounded || iconOnly.value ? 'p-2.5' : 'px-4 py-2.5'} gap-3 leading-4.5`,
}))

const buttonClasses = computed(() => [
  {
    'rounded-full': rounded,
    'rounded-md': !rounded,
  },
  focusableClasses[color],
  rootClasses[variant][color],
  sizeClasses.value[size],
])
</script>

<template>
  <button
    :class="[buttonClasses, theme?.root ?? '']"
    class="rounded-full text-neutral-stronger transition-colors duration-75
      font-light flex items-center"
    v-bind="attrs"
  >
    <i
      v-if="startIcon"
      :class="[startIcon, theme?.startIcon ?? '']"
      class="ph"
    />
    <span v-if="$slots.default || text" :class="theme?.text ?? ''">
      <slot v-if="$slots.default" />
      <template v-else>{{ text }}</template>
    </span>
    <i v-if="endIcon" :class="[endIcon, theme?.endIcon ?? '']" class="ph" />
  </button>
</template>
