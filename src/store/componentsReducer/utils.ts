import { ComponentInfoType, ComponentsStateType } from '.'

export function getNextComponentId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponent = componentList.filter(c => !c.isHidden)
  const index = visibleComponent.findIndex(c => c.fe_id === fe_id)
  if (index < 0) {
    return ''
  }

  let newSelectedId = ''
  const length = visibleComponent.length
  // 只有一个组件
  if (length <= 1) {
    newSelectedId = ''
  } else {
    // 删除的组件就是最后一个
    if (index + 1 === length) {
      newSelectedId = visibleComponent[index - 1].fe_id
    } else {
      // 删除的组件后面还有组件
      newSelectedId = visibleComponent[index + 1].fe_id
    }
  }
  return newSelectedId
}

export function insertNewComponent(draft: ComponentsStateType, newItem: ComponentInfoType) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(c => c.fe_id === selectedId)

  if (index < 0) {
    componentList.push(newItem)
  } else {
    componentList.splice(index + 1, 0, newItem)
  }
  draft.selectedId = newItem.fe_id
}
