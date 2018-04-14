import resolve      from 'rollup-plugin-node-resolve'
import commonjs     from 'rollup-plugin-commonjs'
import buble        from 'rollup-plugin-buble';

const NAME = 'postcssChef';

export default {
  input   : 'src/index.js',
  output  : [
    {
      file  : 'build/umd.js',
      format: 'umd',
      name  :  NAME
    },
    {
      file  : 'build/cjs.js',
      format: 'cjs',
    }
  ],
  sourceMap: false,
  external: ['postcss'],
  plugins: [ 
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    buble()
  ]
}
