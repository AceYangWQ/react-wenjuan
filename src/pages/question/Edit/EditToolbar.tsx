import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  copyComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

const EditToolbar: FC = () => {
  const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex + 1 === length

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

  function moveUp() {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }

  function moveDown() {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
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

      <Tooltip title="上移">
        <Button icon={<UpOutlined />} shape="circle" onClick={moveUp} disabled={isFirst}></Button>
      </Tooltip>

      <Tooltip title="下移">
        <Button
          icon={<DownOutlined />}
          shape="circle"
          onClick={moveDown}
          disabled={isLast}
        ></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
