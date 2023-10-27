import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionList } from '../services/question'
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_COUNT,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
} from '../constants'

type Options = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<Options> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  const page = Number(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
  const pageSize = Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE_COUNT
  async function load() {
    const data = await getQuestionList({ keyword, isStar, isDeleted, page, pageSize })
    return data
  }
  const { loading, data, error, refresh } = useRequest(load, {
    refreshDeps: [searchParams], // 刷新的依赖项
  })
  return { loading, data, error, refresh }
}

export default useLoadQuestionListData
