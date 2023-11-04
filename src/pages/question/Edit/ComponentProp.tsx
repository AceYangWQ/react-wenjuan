import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useComponentInfo from '../../../hooks/useComponentInfo'
import { ComponentPropsType, getComponentConfByType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'

const NoProps: FC = () => {
  return <div style={{ textAlign: 'center' }}>没有选中的组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useComponentInfo()
  if (selectedComponent == null) {
    return <NoProps />
  }

  const { type, props, fe_id } = selectedComponent

  const component = getComponentConfByType(type)

  if (component == null) {
    return <NoProps />
  }

  const { PropComponent } = component

  function changeProps(newProps: ComponentPropsType) {
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
