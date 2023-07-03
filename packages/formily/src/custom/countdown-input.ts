import { transformComponent } from '@formily/antdv-x3/esm/__builtins__/shared'
import { InputProps } from 'ant-design-vue'
import { connect, mapProps } from '@formily/vue'
import { CountDownInput as Input } from '@radical/components'

const TransformElInput = transformComponent<InputProps>(Input, {
  change: 'input',
})

const CountDownInput = connect(
  TransformElInput,
  mapProps({ readOnly: 'read-only' }),
)

export default CountDownInput
