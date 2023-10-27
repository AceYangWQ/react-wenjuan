import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { Typography, Spin, Empty } from 'antd'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import QuestionCard from '../../components/QuestionCard'

import styles from './common.module.scss'
import { useSearchParams } from 'react-router-dom'
import { getQuestionList } from '../../services/question'
import { LIST_PAGE_SIZE_COUNT, LIST_SEARCH_PARAM_KEY } from '../../constants'

const { Title } = Typography

const List: FC = () => {
  useTitle('问卷-我的问卷')

  const [started, setStarted] = useState(false)
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const hasMoreData = total > list.length

  const [searchParams] = useSearchParams()

  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  const { run: loadMore, loading } = useRequest(
    async () => {
      const data = await getQuestionList({
        page,
        pageSize: LIST_PAGE_SIZE_COUNT,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: newList = [], total = 0 } = result
        setList(list.concat(newList))
        setPage(page + 1)
        setTotal(total)
      },
    }
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem === null) return
      const domReact = elem.getBoundingClientRect()
      if (domReact == null) return
      const { bottom } = domReact
      const { clientHeight } = document.body
      if (bottom <= clientHeight) {
        loadMore()
        setStarted(true)
      }
    },
    { wait: 1000 }
  )

  useEffect(() => {
    tryLoadMore()
  }, [tryLoadMore, searchParams])

  useEffect(() => {
    if (hasMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, hasMoreData, tryLoadMore])

  const loadMoreElement = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (hasMoreData) return <span>开始加载下一页</span>
    return <span>没有更多数据了...</span>
  }, [started, loading, hasMoreData, total])

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
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreElement}</div>
      </div>
    </>
  )
}

export default List
