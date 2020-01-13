import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import {terser} from 'rollup-plugin-terser';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const external = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.peerDependencies || {}))

export default [{
  input: pkg.entries.server,

  external: [],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),
  ],
  external,

  output: [{
    file: pkg.main,
    format: 'cjs',
  }, {
    file: pkg.module,
    format: 'es',
   },
   {
    file: pkg.unpkg,
    format: 'umd',
    name: 'fetchTx'
  }
],
},

{
  input: pkg.entries.browser,
  plugins: [
    // Allows node_modules resolution
    resolve({ extensions, mainFields: ['browser', 'module', 'main'] }),
    commonjs(),
    babel({
      extensions,
      exclude: 'node_modules/**',
    }),
    terser()  
  ],
  external,
  output: {
    file: pkg.browser,
    format: 'iife',
    name: 'fetchTx',
  }
}
];