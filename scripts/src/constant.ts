export const IGNORE_WORKSPACE = ['packages/*', 'configs/*', 'scripts']

export enum SelectTypeEnum {
  SINGLE = 'select',
  MULTI = 'multiselect',
}
// 启动项目的方式：支持 单个 | 多个
export const DEFAULT_SELECT_TYPE = SelectTypeEnum.SINGLE
