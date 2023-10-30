import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME, isLoginOrRegister, isNoNeedLogin } from '../router'

function UserNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    if (waitingUserData) return
    if (username) {
      if (isLoginOrRegister(pathname)) return
      nav(MANAGE_INDEX_PATHNAME)
    }
    if (isNoNeedLogin(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname, nav])
}

export default UserNavPage
