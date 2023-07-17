// @ts-nocheck
import { createVNode, render as vueRender, VNode, VNodeProps } from 'vue'
import { Modal as AntModal, ModalProps } from 'ant-design-vue'
/**
 * @param content：组件
 * @param props：组件属性
 * @param modalConfig：https://3x.antdv.com/components/modal-cn#API
 */
interface Param {
  content: VNode
  props: VNodeProps
  modalConfig: ModalProps
}
interface returnRes {
  close: Function // 关闭实例
  destroy: Function // 销毁实例
  update: (modalConfig: ModalProps) => void // 更新实例
  [key: string]: any
}
export default function useModal({
  content,
  props = {},
  modalConfig,
}: Param): returnRes {
  const container = document.createDocumentFragment()
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

  const vm = createVNode(AntModal, metadata, () => _contentVnode)
  function update(config) {
    Object.assign(vm.component.props, config)
    vm.component.update()
  }

  function close() {
    metadata.visible = false
    update(metadata)
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
