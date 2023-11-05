import React, { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { Form, Checkbox, Input } from 'antd'

const { TextArea } = Input
const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter, form])

  function handleValuesChange() {
    onChange?.(form.getFieldsValue())
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea></TextArea>
      </Form.Item>

      <Form.Item valuePropName="checked" name="isCenter">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
