import rootImport  from 'rollup-plugin-root-import'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs'
import copy        from 'rollup-plugin-copy'
import buble       from 'rollup-plugin-buble'
import filesize    from 'rollup-plugin-filesize'

module.exports = {
  input   : 'src/app.js',
  output  : {
    file: 'dist/app.js',
    format  : 'umd',
  },
  plugins : [
    rootImport({ root: `${__dirname}/src`, extensions: ['.js', '/index.js'] }),
    nodeResolve({ jsnext: true, main: true, browser: true, preferBuiltins: false }),
    commonjs({}),
    copy({
      'resources/' : 'dist/',
      'node_modules/@ajusa/lit/dist/lit.css' : 'dist/lit.css'
    }),
    buble(),
    filesize()
  ]
}
