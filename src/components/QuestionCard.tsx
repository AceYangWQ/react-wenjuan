import React, { FC, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Space, Divider, Tag, Popconfirm, message, Modal } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'

import styles from './QuestionCard.module.scss'
import { duplicateQuestion, updateQuestionById } from '../services/question'

const { confirm } = Modal

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, answerCount, isStar, createdAt } = props
  const nav = useNavigate()

  const [starState, setStarState] = useState(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => await updateQuestionById(_id, { isStar: !starState }),
    {
      manual: true,
      onSuccess() {
        message.success('更新成功')
        setStarState(!starState)
      },
    }
  )

  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => await duplicateQuestion(_id),
    {
      manual: true,
      onSuccess(result) {
        message.success('复制成功')
        const { id } = result
        nav(`/question/edit/${id}`)
      },
    }
  )

  const [deleteState, setDeleteState] = useState(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionById(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setDeleteState(true)
      },
    }
  )

  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk: deleteQuestion,
    })
  }
  if (deleteState) return null

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              <Space>
                {starState && <StarOutlined style={{ color: 'red' }} />}
                {title}
              </Space>
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
              <span>问卷：{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '12px 0' }}></Divider>
        <div className={styles['button-container']}>
          <div className={styles.left}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={!isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles.right}>
            <Space>
              <Button
                icon={<StarOutlined />}
                type="text"
                size="small"
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {starState ? '取消标星' : '标星'}
              </Button>
              <Popconfirm
                title="确定复制该问卷？"
                okText="确定"
                cancelText="取消"
                onConfirm={duplicate}
                disabled={duplicateLoading}
              >
                <Button icon={<CopyOutlined />} type="text" size="small">
                  复制
                </Button>
              </Popconfirm>

              <Button
                icon={<DeleteOutlined />}
                type="text"
                size="small"
                onClick={del}
                disabled={deleteLoading}
              >
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionCard
