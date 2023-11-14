import React, { FC, useCallback } from 'react'
import { Typography } from 'antd'
import { componentConfGroup, componentConfType } from '../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'

const { Title } = Typography

function GenComponent(c: componentConfType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.content}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map(c => GenComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
