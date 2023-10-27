import React, { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Space, Typography, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'

import styles from './Login.module.scss'
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from '../router'
import { login } from '../services/user'
import { setToken } from '../utils/user-token'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

const rememberInfo = (username: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

const deleteFromStorage = () => {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

const getFromStorage = () => {
  const username = localStorage.getItem(USERNAME_KEY)
  const password = localStorage.getItem(PASSWORD_KEY)
  return {
    username,
    password,
  }
}

const Login: FC = () => {
  const nav = useNavigate()
  const [form] = Form.useForm()
  useEffect(() => {
    const { username, password } = getFromStorage()
    form.setFieldsValue({ username, password })
  }, [form])

  const { run } = useRequest(async (username, password) => await login(username, password), {
    manual: true,
    onSuccess(result) {
      const { token } = result
      setToken(token)
      message.success('登录成功')
      nav(MANAGE_INDEX_PATHNAME)
    },
  })

  const onFinish = (values: any) => {
    const { username, password, remember } = values || {}
    run(username, password)
    if (remember) {
      rememberInfo(username, password)
    } else {
      deleteFromStorage()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>

      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { type: 'string', min: 6, max: 20, message: '字符长度在 6-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>去注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
