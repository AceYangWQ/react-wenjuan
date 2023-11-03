import React, { FC, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Spin } from 'antd'
import classNames from 'classnames'
import useComponentInfo from '../../../hooks/useComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { ComponentInfoType, changeSelectedId } from '../../../store/componentsReducer'

import styles from './EditCanvas.module.scss'

// import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'
// import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props}></Component>
}

type PropsType = {
  loading: boolean
}
const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useComponentInfo()
  const dispatch = useDispatch()

  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Spin></Spin>
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c

        const defaultWrapperClassName = styles['component-wrapper']
        const selectedClassName = styles.selected

        const wrapperClassName = classNames({
          [defaultWrapperClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })
        return (
          <div
            key={fe_id}
            className={wrapperClassName}
            onClick={event => {
              handleClick(event, fe_id)
            }}
          >
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        )
      })}
      {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  )
}

export default EditCanvas