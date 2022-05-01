import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'
import node_resolve from '@rollup/plugin-node-resolve';
import virtual from '@rollup/plugin-virtual';
import typescript from '@rollup/plugin-typescript'

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
  base: '/vue-apps/',
  build: {
    minify: false,
    outDir: "docs",
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        // index1: resolve(__dirname, 'src/apps/Testing/HubsTest1/index.html'),
        // index2: resolve(__dirname, 'src/apps/Testing/HubsTest2/index.html'),
        // index3: resolve(__dirname, 'src/apps/Center_Map/index.html'),
        // index4: resolve(__dirname, 'src/apps/Center1_Intro/index.html'),
        // index5: resolve(__dirname, 'src/apps/Center2_History/index.html'),
        // index6: resolve(__dirname, 'src/apps/Center3_3D-Tracking/index.html'),
        // index7: resolve(__dirname, 'src/apps/Center4_Presence/index.html'),
        // index8: resolve(__dirname, 'src/apps/Center5_Genres/index.html'),
        // index9: resolve(__dirname, 'src/apps/Center6_Future/index.html'),
        // index10: resolve(__dirname, 'src/apps/Center7_Privacy/index.html'),
        // index11: resolve(__dirname, 'src/apps/Monolith1_Intro/index.html'),
        // index12: resolve(__dirname, 'src/apps/Monolith2_History/index.html'),
        // index13: resolve(__dirname, 'src/apps/Monolith3_3D-Tracking//index.html'),
        // index14: resolve(__dirname, 'src/apps/Monolith4_Presence/index.html'),
        // index15: resolve(__dirname, 'src/apps/Monolith5_Genres/index.html'),
        // index16: resolve(__dirname, 'src/apps/Monolith6_Future/index.html'),
        // index17: resolve(__dirname, 'src/apps/Monolith7_Privacy/index.html'),
        hubs: resolve(__dirname, 'hubs.ts')
      },
    //   external: ['three'],
    //   globals: {
    //     'three': 'THREE'
    //   },
    external: ['three'],

      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        format: 'es',
        globals: {
          three: 'THREE'
        },
      }, 
      plugins: [
        // virtual({
        //     three: `export default THREE`
        //   }),
        typescript({
            typescript: require('typescript'),
        }),
         
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