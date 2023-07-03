import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export const handleImport = () => {
  return Components({
    resolvers: [AntDesignVueResolver()],
  })
}
