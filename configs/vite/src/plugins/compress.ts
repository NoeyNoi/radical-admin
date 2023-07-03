/**
 * 用于打包和输出gzip。
 * TODO: 请注意，这在Vite中无法正常工作，具体原因仍在调查中
 * @see https://github.com/anncwb/vite-plugin-compression
 */
import type { PluginOption } from 'vite'
import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin(
  compress: 'gzip' | 'brotli' | 'none',
  deleteOriginFile = false,
) {
  const compressList = compress.split(',')

  const plugins: PluginOption[] = []

  if (compressList.includes('gzip')) {
    plugins.push(compressPlugin({ deleteOriginFile }))
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        algorithm: 'brotliCompress',
        deleteOriginFile,
      }),
    )
  }
  return plugins
}
