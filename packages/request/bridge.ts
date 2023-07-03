export interface ContextOptions {
  apiUrl?: string
}

export let context: ContextOptions = {
  apiUrl: '',
}

export const initRequest = async (func: AnyFunction<any>) => {
  context = func()
}
