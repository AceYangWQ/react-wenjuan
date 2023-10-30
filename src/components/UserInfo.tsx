import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
// import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { LOGIN_PATHNAME } from '../router'
// import { getUserInfo } from '../services/user'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  // const { data = {} } = useRequest(getUserInfo)
  // const { username, nickname } = data
  const dispatch = useDispatch()
  const { username, nickname } = useGetUserInfo()

  function logout() {
    dispatch(logoutReducer())
    removeToken()
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <div style={{ color: '#ccc' }}>
        <UserOutlined />
        {nickname}
        <Button type="link" onClick={logout}>
          退出
        </Button>
      </div>
    </>
  )

  const Login = (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  )

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
