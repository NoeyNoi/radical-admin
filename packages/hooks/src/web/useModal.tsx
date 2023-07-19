// @ts-nocheck
import { createVNode, render as vueRender, VNode, VNodeProps } from 'vue'
import { ConfigProvider, Modal as AntModal, ModalProps } from 'ant-design-vue'
import { useConfigStoreWithOut } from '@radical/stores'

/**
 * @param content：组件
 * @param props：组件属性
 * @param modalConfig：https://3x.antdv.com/components/modal-cn#API
 */
interface modalConfig extends ModalProps {
  // jsx 中destroyOnClose无法生效，可通过onClose回调处理相关逻辑
  onClose?: Function
}
interface Param {
  content: VNode | (() => JSX.Element)
  props?: VNodeProps
  modalConfig: modalConfig
}
interface returnRes {
  close: Function // 关闭实例
  destroy: Function // 销毁实例
  update: (modalConfig: modalConfig) => void // 更新实例
  [key: string]: any
}
export function useModal({
  content,
  props = {},
  modalConfig,
}: Param): returnRes {
  const container = document.createDocumentFragment()
  // content部分
  const _contentVnode = createVNode(content, props)
  const metadata = Object.create({
    okText: '确定',
    cancelText: '取消',
    visible: true,
    ...modalConfig,
  })

  metadata.onCancel = async function (e) {
    await modalConfig.onCancel?.(e)
    close()
  }

  metadata.onOk = async function (e) {
    if (!(modalConfig.onOk instanceof Function)) {
      close()
      return
    }
    const result: any = modalConfig.onOk(e)
    // 必须是一个promise函数
    if (!(result instanceof Promise)) {
      close()
      return
    }
    update({ confirmLoading: true })
    return result
      .then(() => {
        update({ confirmLoading: false })
        close()
      })
      .catch(() => {
        update({ confirmLoading: false })
      })
  }
  // tsx 中需要适配主题，因为此时已经没有ant- 之类的样式
  const { getDarkMode } = useConfigStoreWithOut()
  const modalVm = createVNode(AntModal, metadata, () => _contentVnode)
  const vm = createVNode(
    ConfigProvider,
    {
      prefixCls: getDarkMode,
    },
    () => modalVm,
  )

  function update(config) {
    // 只更新modal实例
    Object.assign(modalVm.component.props, config)
    modalVm.component.update()
  }

  function close() {
    metadata.visible = false
    update(metadata)
    metadata?.onClose?.()
  }

  function destroy() {
    if (vm) {
      vueRender(null, container)
    }
  }
  /** 渲染 */
  vueRender(vm, container)
  return {
    ..._contentVnode,
    close,
    destroy,
    update,
  }
}
