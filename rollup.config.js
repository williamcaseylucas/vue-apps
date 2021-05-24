// import hubsTest1 from './src/Apps/HubsTest1/rollup.config.js';
// import hubsTest2 from './src/Apps/HubsTest2/rollup.config.js';

// export default [
//   hubsTest1,
//   hubsTest2
// ];
import replace from '@rollup/plugin-replace'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url';
import virtual from '@rollup/plugin-virtual';
import { terser } from "rollup-plugin-terser";

var serverPath
if ((process.env.BUILD !== 'production')) {
    // your ngrok host name for local testing
    serverPath = "https://blairhome.ngrok.io";
} else {
    serverPath = "https://resources.realitymedia.digital";
}

export default {
    input: 'hubs.js',
    // external: ['three'],
    // globals: {
    //   'three': 'THREE'
    // },
  
    output: [{
        dir: 'docs/dist',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        format: 'es',
        sourcemap: 'inline'
      },
      {
        file: "docs/dist/hubs.min.js", 
        format: 'es', 
        plugins: [terser()]
      }], 

    plugins: [
      virtual({
          three: `export default THREE`
      }),

      url({
          // by default, rollup-plugin-url will not handle font files
          include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif', '**/*.woff', '**/*.woff2'],
          // setting infinite limit will ensure that the files 
          // are always bundled with the code, not copied to /dist
          //limit: Infinity,
          limit: 100,
          publicPath: serverPath + '/test-vue-app/dist/',
      }),
      rollupPluginNodeResolve(),
      replace({
          'process.env.NODE_ENV': JSON.stringify( 'production' )
      }),  
      vue({
          preprocessStyles: true
      }),
      postcss()

    ]
  }