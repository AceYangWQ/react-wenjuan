import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionList } from '../services/question'
import { LIST_SEARCH_PARAM_KEY } from '../constants'

type Options = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<Options> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  async function load() {
    const data = await getQuestionList({ keyword, isStar, isDeleted })
    return data
  }
  const { loading, data, error } = useRequest(load, {
    refreshDeps: [searchParams], // 刷新的依赖项
  })
  return { loading, data, error }
}

export default useLoadQuestionListData
