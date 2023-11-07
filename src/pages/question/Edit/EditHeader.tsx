import React, { FC, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Typography, Space, Tooltip, Input } from 'antd'
import { LeftOutlined, EditOutlined } from '@ant-design/icons'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

import styles from './EditHeader.module.scss'
import { changePageInfoTitle } from '../../../store/pageInfoReducer'

const { Title } = Typography

const EditElem: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)

  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageInfoTitle(newTitle))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={changeTitle}
        onBlur={() => setEditState(false)}
        onPressEnter={() => setEditState(false)}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Tooltip title="编辑">
        <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)}></Button>
      </Tooltip>
    </Space>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <EditElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
