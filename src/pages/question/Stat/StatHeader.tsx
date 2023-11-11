import React, { FC, useRef } from 'react'
import { Space, Button, Typography, Input, Tooltip, InputRef, message, Popover } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'
import styles from './StatHeader.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const { Title } = Typography
const StatHeader: FC = () => {
  const nav = useNavigate()
  const { title } = useGetPageInfo()
  const { id } = useParams()
  const url = `http://192.168.2.13:3000/question/${id}`
  const inputRef = useRef<InputRef>(null)

  function handleCopy() {
    const elem = inputRef.current
    if (elem == null) return
    elem.select()
    document.execCommand('copy')
    message.success('复制成功')
  }

  const QRCodeElem = () => {
    return (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150}></QRCode>
      </div>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title level={3}>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <Space>
            <Input value={url} style={{ width: 300 }} ref={inputRef} />
            <Tooltip title="复制链接">
              <Button icon={<CopyOutlined />} onClick={handleCopy}></Button>
            </Tooltip>
            <Popover content={<QRCodeElem />}>
              <Button icon={<QrcodeOutlined />}></Button>
            </Popover>
          </Space>
        </div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
