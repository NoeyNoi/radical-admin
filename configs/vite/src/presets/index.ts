import { createAntdPreset } from './antd'

export type PresetType = 'antd'

export const themColor = '4d85ff'

export function createPreset(framework: PresetType) {
  const presets = {
    antd: createAntdPreset,
  }
  return presets[framework]
}
