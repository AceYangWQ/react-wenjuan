import React, { FC, useEffect } from 'react'
import { Form, Input, Select, Checkbox, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { QuestionRadioPropsType } from './interface'
import { nanoid } from '@reduxjs/toolkit'
import { OptionType } from './interface'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title = '', options = [], value = '', isVertical = false, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, options, value, isVertical })
  }, [title, options, value, isVertical, form])

  function handleValuesChange() {
    const values = form.getFieldsValue() as QuestionRadioPropsType
    const { options = [] } = values
    options.filter(opt => !(opt.label == null))

    options.forEach((option: OptionType) => {
      if (!option.value) {
        option.value = nanoid(5)
      }
    })
    onChange?.(values)
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, options, value, isVertical }}
      onValuesChange={handleValuesChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入单选标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    name={[name, 'label']}
                    rules={[
                      { required: true, message: '请输入选项文字' },
                      {
                        validator(_, label) {
                          let count = 0
                          const { options = [] } = form.getFieldsValue()
                          options.forEach((option: OptionType) => {
                            if (option.label === label) count++
                          })
                          if (count === 1) return Promise.resolve()
                          return Promise.reject(new Error('存在相同的选项'))
                        },
                      },
                    ]}
                  >
                    <Input placeholder="请输入选项文字" />
                  </Form.Item>
                  {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ value: '', label: '' })}
                  block
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item label="默认选中" name="value">
        <Select options={options}></Select>
      </Form.Item>
      <Form.Item valuePropName="checked" name="isVertical">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
