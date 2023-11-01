import React, { FC } from 'react'
import { Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <div>
      <div>QuestionLayout</div>
      <div>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Spin></Spin>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}

export default QuestionLayout
