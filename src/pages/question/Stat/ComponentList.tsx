import React, { FC } from 'react'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { ComponentInfoType } from '../../../store/componentsReducer'

import styles from './ComponentList.module.scss'

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props}></Component>
}

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (id: string) => void
}
const ComponentList: FC<PropsType> = ({
  selectedComponentId,
  setSelectedComponentId,
  setSelectedComponentType,
}) => {
  const { componentList } = useGetComponentInfo()

  return (
    <div className={styles.container}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, type } = c

          const defaultWrapperClassName = styles['component-wrapper']
          const selectedClassName = styles.selected

          const wrapperClassName = classNames({
            [defaultWrapperClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId,
          })
          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
              }}
            >
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
