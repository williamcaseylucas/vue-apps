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
import sourcemaps from 'rollup-plugin-sourcemaps';
import copy from 'rollup-plugin-copy'
import cssImport from "postcss-import"
import cssUrl from 'postcss-url'

var serverPath
if ((process.env.BUILD !== 'production')) {
    // your ngrok host name for local testing
    serverPath = "https://blairhome.ngrok.io";
} else {
    serverPath = "https://resources.realitymedia.digital";
}
var componentPath = serverPath + '/test-vue-app/'
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
      copy({
        targets: [{ src: ['src/assets/theme/fonts/*/*.ttf','src/assets/theme/fonts/*/*.eot','src/assets/theme/fonts/*/*.woff'], dest: 'docs/dist/public/fonts' }],
        verbose: true
      }),
      rollupPluginNodeResolve(),
      url({
        // by default, rollup-plugin-url will not handle font files
        include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif', '**/*.woff', '**/*.woff2'],
        // setting infinite limit will ensure that the files 
        // are always bundled with the code, not copied to /dist
        //limit: Infinity,
        limit: 1000,
        publicPath: serverPath + '/test-vue-app/dist/',
      }),
      replace({
          'process.env.NODE_ENV': JSON.stringify( 'production' ),
         // 'https://resources.realitymedia.digital/test-vue-app/': componentPath //JSON.stringify( componentPath )

      }),
      vue({
          preprocessStyles: true
      }),
      postcss({
        plugins: [
        //     cssUrl({
        //     url: "inline", // enable inline assets using base64 encoding
        //     maxSize: 1000, // maximum file size to inline (in kilobytes)
        //     publicPath: serverPath + '/test-vue-app/dist/',
        // }),
          cssImport({
            plugins: [
                cssUrl({
                    filter: ['src/assets/theme/fonts/**/*.eot', 'src/assets/theme/fonts/**/*.ttf', 'src/assets/theme/fonts/**/*.woff'], 
                    
                    url: (asset) => `${serverPath}/test-vue-app/dist/public/fonts/${asset.relativePath}`             
                })]
          })]
      }),
      sourcemaps(),

    ]
  }