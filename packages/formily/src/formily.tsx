import { createForm, IFormProps } from '@formily/core'
import { FormProvider, createSchemaField, ISchema } from '@formily/vue'
import * as ImportComps from './bathImport'
import './style/theme.less'

/**
 * 参靠文档
 * createForm：https://core.formilyjs.org/zh-CN/api/entry/create-form
 * schema：https://vue.formilyjs.org/api/shared/schema.html#schema
 * form实例：https://core.formilyjs.org/zh-CN/api/models/form
 */
interface IParams {
  schema: ISchema
  formProps?: IFormProps
}

export function useFormilyForm({ schema = {}, formProps = {} }: IParams) {
  const form = createForm(formProps)
  const submit = async (): Promise<any> =>
    new Promise(async (resolve) => {
      let result = null
      try {
        result = await form.submit()
      } catch (error) {
        console.error('表单校验未通过', error)
      } finally {
        resolve(result)
      }
    })
  // 注册所有用到的组件
  const { SchemaField } = createSchemaField({
    components: {
      ...ImportComps,
    },
  })
  return {
    form,
    submit,
    FormilyForm: () => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ),
  }
}
