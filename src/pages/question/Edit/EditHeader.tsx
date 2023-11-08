import React, { FC, useState, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Typography, Space, Tooltip, Input, message } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

import styles from './EditHeader.module.scss'
import { changePageInfoTitle } from '../../../store/pageInfoReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { updateQuestionById } from '../../../services/question'

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

const SaveButton: FC = () => {
  const pageInfo = useGetPageInfo()
  const { componentList = [] } = useGetComponentInfo()
  const { id = '' } = useParams()

  const { loading, run: save } = useRequest(
    async () => {
      await updateQuestionById(id, { ...pageInfo, componentList })
    },
    { manual: true }
  )

  // 快捷键保存
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  // 自动保存
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )

  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

const PublishButton: FC = () => {
  const nav = useNavigate()
  const pageInfo = useGetPageInfo()
  const { componentList = [] } = useGetComponentInfo()
  const { id = '' } = useParams()

  const { loading, run: publish } = useRequest(
    async () => {
      await updateQuestionById(id, {
        ...pageInfo,
        componentList,
        isPublished: true, // 发布问卷 isPublished 为 true
      })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        // 跳转至统计页
        nav(`/question/stat/${id}`)
      },
    }
  )
  return (
    <Button type="primary" onClick={publish} disabled={loading}>
      发布
    </Button>
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
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
