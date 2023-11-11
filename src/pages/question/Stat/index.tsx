import React, { FC } from 'react'
import { Spin, Result, Button } from 'antd'
import { useTitle } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import StatHeader from './StatHeader'

import styles from './index.module.scss'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()
  const nav = useNavigate()
  useTitle(`问卷统计-${title}`)

  const LoadingElem = () => {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <Spin></Spin>
      </div>
    )
  }

  const MainElem = () => {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="页面暂未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      )
    }
    return (
      <div className={styles.content}>
        <div className={styles.left}>左</div>
        <div className={styles.main}>中</div>
        <div className={styles.right}>右</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading && <LoadingElem />}
        {!loading && MainElem()}
      </div>
    </div>
  )
}

export default Stat
