import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svg from 'vite-svg-loader'
import tailwindcss from '@tailwindcss/vite'
import components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
    }),
    vueDevTools(),
    svg(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
