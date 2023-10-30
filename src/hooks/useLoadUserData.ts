import { useRequest } from 'ahooks'
import { getUserInfo } from '../services/user'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'
import useGetUserInfo from './useGetUserInfo'

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { username } = useGetUserInfo()

  const { run } = useRequest(getUserInfo, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })
  useEffect(() => {
    if (username) {
      return setWaitingUserData(false)
    }
    run()
  }, [username, run])

  return { waitingUserData }
}

export default useLoadUserData
