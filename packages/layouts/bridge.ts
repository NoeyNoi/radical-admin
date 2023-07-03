export interface ContextOptions {
  useUserStore: () => unknown
  logo: string
}

export let context: ContextOptions = {
  useUserStore: () => undefined,
  logo: '',
}

export const initLayout = async (func: AnyFunction<any>) => {
  context = func()
}
