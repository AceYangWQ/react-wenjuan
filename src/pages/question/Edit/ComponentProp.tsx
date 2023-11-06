import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'

const NoProps: FC = () => {
  return <div style={{ textAlign: 'center' }}>没有选中的组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) {
    return <NoProps />
  }

  const { type, props, fe_id, isHidden, isLocked } = selectedComponent

  const component = getComponentConfByType(type)

  if (component == null) {
    return <NoProps />
  }

  const { PropComponent } = component

  function changeProps(newProps: ComponentPropsType) {
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
}

export default ComponentProp
