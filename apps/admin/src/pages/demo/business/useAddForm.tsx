import { useModal } from '@radical/hooks'
import { useFormilyForm } from '@radical/formily'
import { addFormSchema } from './useFormSchema'
import { addBusinessData } from '@/apis/demo/table'
import { message } from 'ant-design-vue'

const { FormilyForm, form, submit } = useFormilyForm({
  schema: addFormSchema(),
})
export const useAdd = (handleSubmit) => {
  useModal({
    content: () => <FormilyForm />,
    modalConfig: {
      title: '新增',
      maskClosable: false,
      onOk: async () => {
        const res = await submit()
        if (res) {
          await addBusinessData(res)
          message.success('添加成功')
          handleSubmit()
          return Promise.resolve(true)
        }
        return Promise.reject(false)
      },
      onClose: () => {
        // 重置表单
        form.reset()
      },
    },
  })
}
