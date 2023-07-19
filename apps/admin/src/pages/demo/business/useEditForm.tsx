import { useModal } from '@radical/hooks'
import { useFormilyForm } from '@radical/formily'
import { editFormSchema } from './useFormSchema'
import { editBusinessData } from '@/apis/demo/table'
import { message } from 'ant-design-vue'

const { FormilyForm, form, submit } = useFormilyForm({
  schema: editFormSchema(),
})
export const useEdit = (handleSubmit, row) => {
  const { id, name, nickname, sex, age } = row
  form.setValues({
    name,
    nickname,
    sex,
    age,
  })
  useModal({
    content: () => <FormilyForm />,
    modalConfig: {
      title: '新增',
      maskClosable: false,
      onOk: async () => {
        const res = await submit()
        if (res) {
          await editBusinessData({ id, ...res })
          message.success('编辑成功')
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
