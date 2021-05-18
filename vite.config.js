import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'
import node_resolve from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    conditions: ['source'],
    mainFields: ['module','main']
  },
  server: {
    hmr: {
      port: 3000
    }
  },
  base: '/test-vue-app/',
  build: {
    minify: false,
    outDir: "docs",
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        index1: resolve(__dirname, 'src/apps/HubsTest1/index.html'),
        index2: resolve(__dirname, 'src/apps/HubsTest2/index.html'),
        //hubs: resolve(__dirname, 'hubs.js')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        format: 'es'
      }, 
      plugins: [
          node_resolve(),
      ]
    }
  },
  plugins: [vue({
    css: {
        loaderOptions: {
          css: {
            localIdentName: '[local][HubsVue][hash:base64:8]'
          }
        }
      }
    }
  )],

})