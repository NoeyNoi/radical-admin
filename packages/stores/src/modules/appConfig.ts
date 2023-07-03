import { defineStore } from 'pinia'
import {
  DefineAppConfigOptions,
  HeaderConfigOptions,
  LogoConfigOptions,
  MenuConfigOptions,
  TabTbrConfigOptions,
} from '@radical/types'
import { _assign } from '@radical/utils'
import {
  CacheTypeEnum,
  MenuModeEnum,
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
} from '@radical/constants'

export const useAppConfig = defineStore({
  id: 'APP_CONFIG',
  state: (): DefineAppConfigOptions => ({
    theme: ThemeEnum.LIGHT,
    showThemeModeToggle: true,
    openKeepAlive: true,
    closeMessageOnSwitch: false,
    removeAllHttpPending: true,
    permissionCacheType: CacheTypeEnum.LOCAL,
    settingButtonPosition: SettingButtonPositionEnum.AUTO,
    openSettingDrawer: false,
    permissionMode: PermissionModeEnum.ROUTE_MAPPING,
    sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
    grayMode: false,
    colorWeak: false,
    canEmbedIFramePage: true,
    sidebar: {
      show: true,
      visible: true,
      width: 210,
      collapsedWidth: 48,
      collapsed: false,
    },
    menu: {
      mode: MenuModeEnum.VERTICAL,
      accordion: false,
      topMenuAlign: 'start',
      dropdownPlacement: 'top-start',
    },
    header: {
      show: true,
      visible: true,
      height: 48,
      showBreadCrumb: true,
      showFullScreen: true,
      showLocalePicker: true,
      showSetting: true,
    },
    logo: {
      show: true,
      visible: true,
      showTitle: true,
    },
    tabTar: {
      show: true,
      visible: true,
      height: 36,
      canDrag: false,
      showFold: true,
      showQuick: true,
      showRedo: true,
    },
  }),
  getters: {
    isHorizontal: (state) => state.menu.mode === MenuModeEnum.HORIZONTAL,
  },
  actions: {
    setTheme(value: ThemeEnum) {
      this.theme = value
    },
    setShowThemeModeToggle(value: boolean) {
      this.showThemeModeToggle = value
    },
    setOpenKeepAlive(value: boolean) {
      this.openKeepAlive = value
    },
    setCloseMessageOnSwitch(value: boolean) {
      this.closeMessageOnSwitch = value
    },
    setRemoveAllHttpPending(value: boolean) {
      this.removeAllHttpPending = value
    },
    setPermissionCacheType(value: CacheTypeEnum) {
      this.permissionCacheType = value
    },
    setSettingButtonPosition(value: SettingButtonPositionEnum) {
      this.settingButtonPosition = value
    },
    setOpenSettingDrawer(value: boolean) {
      this.openSettingDrawer = value
    },
    setPermissionMode(value: PermissionModeEnum) {
      this.permissionMode = value
    },
    setSessionTimeoutProcessing(value: SessionTimeoutProcessingEnum) {
      this.sessionTimeoutProcessing = value
    },
    setGrayMode(value: boolean) {
      this.grayMode = value
    },
    setColorWeak(value: boolean) {
      this.colorWeak = value
    },
    setCanEmbedIFramePage(value: boolean) {
      this.canEmbedIFramePage = value
    },
    setMenu(value: Partial<MenuConfigOptions>) {
      _assign(this.menu, value)
    },
    setHeader(value: Partial<Omit<HeaderConfigOptions, 'height'>>) {
      _assign(this.header, value)
    },
    setLogo(value: Partial<LogoConfigOptions>) {
      _assign(this.logo, value)
    },
    setTabTar(value: Partial<TabTbrConfigOptions>) {
      _assign(this.tabTar, value)
    },
  },
  persist: {
    paths: [
      'theme',
      'showThemeModeToggle',
      'openKeepAlive',
      'closeMessageOnSwitch',
      'removeAllHttpPending',
      'permissionCacheType',
      'settingButtonPosition',
      'permissionMode',
      'sessionTimeoutProcessing',
      'grayMode',
      'colorWeak',
      'canEmbedIFramePage',
      'sidebar',
      'menu',
      'header',
      'logo',
      'tabTar',
      'content',
    ],
  },
})
