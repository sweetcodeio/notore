import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';

const PACKAGE_ROOT_PATH = process.cwd();
const INPUT_FILE = path.join(PACKAGE_ROOT_PATH, 'lib/index.ts');
const pkg = require(path.join(PACKAGE_ROOT_PATH, 'package.json'));

function makeExternalPredicate(externalArr) {
  if (!externalArr.length) return () => false;
  return id => new RegExp(`^(${externalArr.join('|')})($|/)`).test(id);
}

function getExternal() {
  const external = Object.keys(pkg.peerDependencies || {});
  const allExternal = [...external, ...Object.keys(pkg.dependencies || {})];

  return makeExternalPredicate(allExternal);
}

export default {
  input: INPUT_FILE,
  external: getExternal(),
  output: [
    {
      file: path.resolve(PACKAGE_ROOT_PATH, 'dist/index.js'),
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: path.resolve(PACKAGE_ROOT_PATH, 'dist/index.es.js'),
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    url(),
    resolve(),
    commonjs(),
    babel({ exclude: 'node_modules/**' }),
    typescript({
      rollupCommonJSResolveHack: true,
      useTsconfigDeclarationDir: true,
      objectHashIgnoreUnknownHack: true,
      tsconfigOverride: {
        include: [path.resolve(PACKAGE_ROOT_PATH, './lib/**/*')],
        compilerOptions: {
          declarationMap: true,
          declarationDir: path.resolve(PACKAGE_ROOT_PATH, './typings'),
        },
      },
    }),
  ],
};
