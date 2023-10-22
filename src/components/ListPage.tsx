import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_COUNT, LIST_PAGE_SIZE_PARAM_KEY } from '../constants'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE_COUNT)

  useEffect(() => {
    const page = Number(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    setCurrent(page)
    const pageSize =
      Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE_COUNT
    setPageSize(pageSize)
  }, [searchParams])

  function onChange(page: number, pageSize: number) {
    setCurrent(page)
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    setPageSize(pageSize)
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  return <Pagination current={current} total={total} pageSize={pageSize} onChange={onChange} />
}

export default ListPage
