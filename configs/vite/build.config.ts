import { defineBuildConfig } from 'unbuild'

// rollup打包器：https://github.com/unjs/unbuild#readme
export default defineBuildConfig({
  clean: true,
  entries: ['src/index'],
  declaration: true,
  outDir: 'dist',
  rollup: {
    emitCJS: true,
    cjsBridge: true,
  },
})
