// import hubsTest1 from './src/Apps/HubsTest1/rollup.config.js';
// import hubsTest2 from './src/Apps/HubsTest2/rollup.config.js';

// export default [
//   hubsTest1,
//   hubsTest2
// ];
import vue from 'rollup-plugin-vue'
//import css from 'rollup-plugin-css-only'
//import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url';


export default {
    input: 'hubs.js',
    
    output: {
        dir: 'docs/dist',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        // paths: {
        //     vue: 'https://resources.realitymedia.digital/html-objects/libs/vue.js'
        // },
        format: 'esm'
      }, 

    plugins: [
      url({
          // by default, rollup-plugin-url will not handle font files
          include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif', '**/*.woff', '**/*.woff2'],
          // setting infinite limit will ensure that the files 
          // are always bundled with the code, not copied to /dist
          limit: Infinity,
          publicPath: '/public',
      }),
      //css(),
    //   postcss({
    //     extensions: [ '.css' ],
    //   }),
    rollupPluginNodeResolve(),

      vue({
        preprocessStyles: true

        //css: true
        // {
        //     loaderOptions: {
        //       css: {
        //         localIdentName: '[local][HubsVue][hash:base64:8]'
        //       }
        //     }
        //   }
      }),
      postcss()

    ]
  }