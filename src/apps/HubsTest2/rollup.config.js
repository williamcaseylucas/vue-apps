import vue from 'rollup-plugin-vue'

// ESM build to be used with webpack/rollup.
export default 
  {
    input: 'hubs.js',
    output: {
      format: 'esm',
      file: 'dist/hubstest1.esm.js'
    },
    plugins: [
      vue()
    ]
  }