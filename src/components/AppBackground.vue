<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import convert from 'color-convert'
import { useWebWorker } from '@vueuse/core'
import ParticlesWorker from '@/animation/Particles.worker?worker'

const particleCount = 750

const canvas = useTemplateRef('canvas')
const resizeObserver = ref<ResizeObserver>()
const worker = useWebWorker(new ParticlesWorker())

const getColors = () => {
  const style = getComputedStyle(document.body)
  const primaryHex = style.getPropertyValue('--theme-color-primary')
  const secondaryHex = style.getPropertyValue('--theme-color-secondary')
  return {
    primary: convert.hex.hsl(primaryHex.slice(1)),
    secondary: convert.hex.hsl(secondaryHex.slice(1)),
  }
}

const onThemeChange = () => {
  worker.post({
    type: 'color',
    ...getColors(),
  })
}

const onResize = () => {
  worker.post({
    type: 'resize',
    width: innerWidth,
    height: innerHeight,
  })
}

const onRouteChange = () => {
  worker.post({
    type: 'shift',
    direction: 'up',
  })
}

const onMouseEnter = ({ clientX, clientY }: MouseEvent) => {
  worker.post({
    type: 'mouseenter',
    x: clientX,
    y: clientY,
  })
}

const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
  worker.post({
    type: 'mousemove',
    x: clientX,
    y: clientY,
  })
}

const onMouseLeave = () => {
  worker.post({ type: 'mouseleave' })
}

onMounted(() => {
  const offscreenCanvas = canvas.value?.transferControlToOffscreen()!

  worker.post(
    {
      type: 'start',
      canvas: offscreenCanvas,
      size: [innerWidth, innerHeight],
      count: particleCount,
      colors: getColors(),
      delay: 500,
    },
    {
      transfer: [offscreenCanvas],
    },
  )

  resizeObserver.value = new ResizeObserver(onResize)
  resizeObserver.value.observe(canvas.value!)

  document.body.addEventListener('theme-change', onThemeChange)
  document.body.addEventListener('route-change', onRouteChange)
  document.body.addEventListener('mouseenter', onMouseEnter)
  document.body.addEventListener('mousemove', onMouseMove)
  document.body.addEventListener('mouseleave', onMouseLeave)
})

onUnmounted(() => {
  worker.post({ type: 'stop' })

  document.body.removeEventListener('theme-change', onThemeChange)
  document.body.removeEventListener('route-change', onRouteChange)
  document.body.removeEventListener('mouseenter', onMouseEnter)
  document.body.removeEventListener('mousemove', onMouseMove)
  document.body.removeEventListener('mouseleave', onMouseLeave)
})
</script>

<template>
  <canvas v-once ref="canvas" class="fixed top-0 left-0 size-full" />
</template>
