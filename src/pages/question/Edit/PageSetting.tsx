import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { resetPageInfo } from '../../../store/pageInfoReducer'

const { TextArea } = Input
const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo, form])

  function handleValuesChange() {
    dispatch(resetPageInfo(pageInfo))
  }

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea placeholder="请输入描述" />
      </Form.Item>
      <Form.Item label="CSS样式" name="css">
        <TextArea placeholder="请输入 CSS 样式" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输入脚本代码" />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
