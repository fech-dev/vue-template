import type { ComponentResolver } from 'unplugin-vue-components/types'

import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

const IconifyResolver: ComponentResolver = (name: string) => {
  if (name.toLowerCase() === 'icon') {
    return { name, from: '@iconify/vue' }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', VueRouterAutoImports],
      dirs: ['src/composables/**'],
      vueTemplate: true,
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [IconifyResolver],
      dirs: ['src/components/**', 'src/views/**'],
      exclude: ['**/*.view.vue']
    }),
    VueRouter({
      routesFolder: [{ src: 'src/views', path: '' }],
      filePatterns: ['**/*.view.vue']
    }),
    Vue(),
    VueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
