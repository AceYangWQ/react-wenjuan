import React, { FC } from 'react'
import { Typography, Spin } from 'antd'
import { useTitle } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import QuestionCard from '../../components/QuestionCard'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

import styles from './common.module.scss'

const { Title } = Typography

const List: FC = () => {
  useTitle('问卷-我的问卷')

  const { loading, data = {} } = useLoadQuestionListData()
  const { list = [] } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {/* 问卷列表 */}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>loadMore... 上滑加载更多...</div>
    </>
  )
}

export default List
