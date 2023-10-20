import React, { FC, useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '../constants'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const [value, setValue] = useState('')

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  function onSearch(value: any) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }

  const [searchParams] = useSearchParams()
  useEffect(() => {
    let curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  return (
    <div>
      <Search
        placeholder="请输入关键字"
        allowClear
        onChange={onChange}
        onSearch={onSearch}
        style={{ width: 260 }}
        value={value}
      />
    </div>
  )
}

export default ListSearch
