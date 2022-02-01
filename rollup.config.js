import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

import { terser } from 'rollup-plugin-terser'

const PACKAGE_ROOT_PATH = process.cwd()
const { LERNA_PACKAGE_NAME, LERNA_ROOT_PATH } = process.env

const packageName = LERNA_PACKAGE_NAME.split('/')[1]

export default {
  input: `${PACKAGE_ROOT_PATH}/src/index.ts`,
  output: [
    {
      file: `dist/${packageName}.cjs.js`,
      format: 'cjs',
    },
    {
      file: `dist/${packageName}.esm.js`,
      format: 'esm',
    },
    {
      name: packageName,
      file: `dist/${packageName}.umd.js`,
      format: 'umd',
    },
  ],
  plugins: [json(), resolve(), commonjs(), typescript({ tsconfig: `${LERNA_ROOT_PATH}/tsconfig.json` })],
}
