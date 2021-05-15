import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    conditions: ['source'],
    mainFields: ['module','main']
  },
  server: {
    hmr: {
      port: 443
    }
  },
  base: './',
  build: {
    minify: false,
    outDir: "docs",
    rollupOptions: {
      //external: ['vue'],
      input: {
        // main: resolve(__dirname, 'index.html'),
        index: resolve(__dirname, 'index.html'),
        hubs: resolve(__dirname, 'src/hubs.js'),
        hubs2: resolve(__dirname, 'src/hubs2.js')
      },
    //   manualChunks: {
    //     'ethereal': [
    //       '/packages/ethereal/ethereal.es.js'
    //     ]
    //   },    
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        // paths: {
        //     vue: 'https://resources.realitymedia.digital/html-objects/libs/vue.js'
        // },
        format: 'es'
      },    
    }
  },
  plugins: [vue()],

})