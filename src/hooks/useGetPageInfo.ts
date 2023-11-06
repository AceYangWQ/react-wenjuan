import { useSelector } from 'react-redux'
import { PageInfoType } from '../store/pageInfoReducer'
import { StateType } from '../store'

function useGetPageInfo() {
  const pageInfo = useSelector<StateType>((state: StateType) => state.pageInfo) as PageInfoType
  return pageInfo
}

export default useGetPageInfo
