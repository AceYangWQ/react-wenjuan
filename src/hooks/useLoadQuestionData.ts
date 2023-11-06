import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionById } from '../services/question'

import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { run, data, loading, error } = useRequest(
    async (id: string) => {
      if (!id) {
        throw new Error('没有问卷 id')
      }
      const data = await getQuestionById(id)
      return data
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (!data) return
    let { componentList = [], title = '', desc = '', css = '', js = '' } = data

    let selectedId
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
    dispatch(resetPageInfo({ title, desc, css, js }))
  }, [data, dispatch])

  useEffect(() => {
    run(id)
  }, [id, run])
  return { loading, error }
}

export default useLoadQuestionData
