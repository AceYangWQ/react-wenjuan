import React, { FC, useEffect } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { Form, Input, Checkbox, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { QuestionCheckboxPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title = '', optionList = [], isVertical = false, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, optionList, isVertical })
  }, [title, optionList, isVertical, form])

  function handleValuesChange() {
    const values = form.getFieldsValue() as QuestionCheckboxPropsType
    const { optionList = [] } = values
    optionList.filter((opt: OptionType) => !(opt.label == null))

    optionList.forEach((opt: OptionType) => {
      if (!opt.value) {
        opt.value = nanoid(5)
      }
    })
    onChange?.(values)
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, optionList, isVertical }}
      onValuesChange={handleValuesChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="多选标题"
        name="title"
        rules={[{ required: true, message: '请输入多选标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="optionList">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item
                      name={[name, 'label']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator(_, label) {
                            let count = 0
                            const { optionList = [] } = form.getFieldsValue()
                            optionList.forEach((option: OptionType) => {
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
                    <Form.Item>
                      {index > 0 && (
                        <Button
                          type="text"
                          onClick={() => remove(name)}
                          icon={<MinusCircleOutlined />}
                        ></Button>
                      )}
                    </Form.Item>
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ value: '', label: '', checked: false })}
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

      <Form.Item valuePropName="checked" name="isVertical">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
