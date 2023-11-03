import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionById } from '../services/question'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  async function load() {
    const data = await getQuestionById(id)
    return data
  }
  const { loading, data, error } = useRequest(load)
  return { loading, data, error }
}

export default useLoadQuestionData
