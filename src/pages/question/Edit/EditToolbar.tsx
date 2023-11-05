import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  copyComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import useComponentInfo from '../../../hooks/useComponentInfo'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent } = useComponentInfo()
  const { isLocked } = selectedComponent || {}

  useBindCanvasKeyPress()

  const dispatch = useDispatch()

  function handleRemove() {
    dispatch(removeSelectedComponent())
  }

  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }

  function handleCopy() {
    dispatch(copyComponent())
  }

  function handlePaste() {
    dispatch(pasteCopiedComponent())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button
          icon={<DeleteOutlined />}
          shape="circle"
          onClick={handleRemove}
          disabled={!selectedId}
        ></Button>
      </Tooltip>

      <Tooltip title="隐藏">
        <Button
          icon={<EyeInvisibleOutlined />}
          shape="circle"
          onClick={handleHidden}
          disabled={!selectedId}
        ></Button>
      </Tooltip>

      <Tooltip title="锁定">
        <Button
          icon={<LockOutlined />}
          shape="circle"
          onClick={handleLock}
          disabled={!selectedId}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>

      <Tooltip title="复制">
        <Button
          icon={<CopyOutlined />}
          shape="circle"
          onClick={handleCopy}
          disabled={!selectedId}
        ></Button>
      </Tooltip>

      <Tooltip title="粘贴">
        <Button
          icon={<BlockOutlined />}
          shape="circle"
          onClick={handlePaste}
          disabled={copiedComponent == null || !selectedId}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
