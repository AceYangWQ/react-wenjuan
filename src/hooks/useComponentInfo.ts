import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

function useComponentInfo() {
  const { componentList = [], selectedId } = useSelector<StateType>(
    state => state.components
  ) as ComponentsStateType
  return {
    componentList,
    selectedId,
  }
}

export default useComponentInfo
