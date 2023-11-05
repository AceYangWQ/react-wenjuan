import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copyComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer'

// 是否
function isActiveElement() {
  const activeEle = document.activeElement
  if (activeEle === document.body) return true
  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  // 删除快捷键
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElement()) return
    dispatch(removeSelectedComponent())
  })

  // 复制快捷键
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElement()) return
    dispatch(copyComponent())
  })

  // 粘贴快捷键
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElement()) return
    dispatch(pasteCopiedComponent())
  })

  // 向上箭头选中
  useKeyPress('uparrow', () => {
    if (!isActiveElement()) return
    dispatch(selectPrevComponent())
  })

  // 向下箭头选中
  useKeyPress('downarrow', () => {
    if (!isActiveElement()) return
    dispatch(selectNextComponent())
  })
}

export default useBindCanvasKeyPress
