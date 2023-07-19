export const queryFormSchema = ({
  handleSubmit,
  handleReset,
}: {
  handleSubmit: Function
  handleReset: Function
}) => {
  return {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        'x-component-props': {
          layout: 'inline',
        },
        properties: {
          name: {
            type: 'string',
            title: '姓名',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              style: 'margin-right: 10px;',
            },
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入姓名',
              allowClear: true,
            },
          },
          sex: {
            type: 'string',
            title: '性别',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              style: 'margin-right: 10px;',
            },
            'x-component': 'Select',
            'x-component-props': {
              placeholder: '请选择',
              style: 'width: 200px',
              options: [
                { value: '1', label: '男' },
                { value: '0', label: '女' },
              ],
            },
          },
          btns: {
            type: 'void',
            'x-component': 'FormButtonGroup',
            properties: {
              submit: {
                type: 'void',
                'x-component': 'Button',
                'x-component-props': {
                  type: 'primary',
                  '@click': () => handleSubmit(),
                  style: 'width: 70px',
                },
                'x-content': '查询',
              },
              reset: {
                type: 'void',
                'x-component': 'Button',
                'x-component-props': {
                  '@click': () => handleReset(),
                  style: 'width: 70px',
                },
                'x-content': '重置',
              },
            },
          },
        },
      },
    },
  }
}

export const addFormSchema = () => {
  return {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        'x-component-props': {
          layout: 'horizontal',
          labelCol: 6,
          wrapperCol: 14,
        },
        properties: {
          name: {
            type: 'string',
            title: '姓名',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入姓名',
              allowClear: true,
            },
            required: true,
          },
          nickname: {
            type: 'string',
            title: '昵称',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入昵称',
              allowClear: true,
            },
            required: true,
          },
          age: {
            type: 'number',
            title: '年龄',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              placeholder: '请输入年龄',
              style: 'width: 100%',
            },
            required: true,
          },
          sex: {
            type: 'string',
            title: '性别',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              placeholder: '请选择',
              style: 'width: 100%',
              options: [
                { value: '1', label: '男' },
                { value: '0', label: '女' },
              ],
            },
            required: true,
          },
        },
      },
    },
  }
}

export const editFormSchema = () => {
  return {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        'x-component-props': {
          layout: 'horizontal',
          labelCol: 6,
          wrapperCol: 14,
        },
        properties: {
          name: {
            type: 'string',
            title: '姓名',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入姓名',
              allowClear: true,
            },
            required: true,
          },
          nickname: {
            type: 'string',
            title: '昵称',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入昵称',
              allowClear: true,
            },
            required: true,
          },
          age: {
            type: 'number',
            title: '年龄',
            'x-decorator': 'FormItem',
            'x-component': 'InputNumber',
            'x-component-props': {
              placeholder: '请输入年龄',
              style: 'width: 100%',
            },
            required: true,
          },
          sex: {
            type: 'string',
            title: '性别',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              placeholder: '请选择',
              style: 'width: 100%',
              options: [
                { value: '1', label: '男' },
                { value: '0', label: '女' },
              ],
            },
            required: true,
          },
        },
      },
    },
  }
}
