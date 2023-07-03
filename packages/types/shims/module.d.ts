declare module '*.vue' {
  // @ts-ignore
  import { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}

declare module 'virtual:*' {
  const result: any
  export default result
}
export {}
