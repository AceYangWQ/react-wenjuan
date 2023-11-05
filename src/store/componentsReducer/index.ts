import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import clonedeep from 'lodash.clonedeep'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextComponentId, insertNewComponent } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 初始化数据
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 修改selectId
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    // 增加组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newItem = action.payload
        insertNewComponent(draft, newItem)
      }
    ),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { componentList } = draft
        const { fe_id, newProps } = action.payload
        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          }
        }
      }
    ),
    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId: removeId, componentList } = draft
      const newSelectedId = getNextComponentId(removeId, componentList)
      draft.selectedId = newSelectedId

      const index = componentList.findIndex(c => c.fe_id === removeId)
      if (index < 0) return
      componentList.splice(index, 1)
    }),
    // 修改组件的 隐藏/显示 属性
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { fe_id, isHidden } = action.payload
        const { componentList } = draft

        let newSelectedId = ''
        if (isHidden) {
          newSelectedId = getNextComponentId(fe_id, componentList)
        } else {
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId

        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),
    // 切换组件的 锁定 状态
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = action.payload
        const { componentList } = draft

        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),
    // 复制组件
    copyComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft

      const selectedComponent = componentList.find(c => c.fe_id === selectedId)
      if (selectedComponent == null) return
      draft.copiedComponent = clonedeep(selectedComponent)
    }),
    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return
      copiedComponent.fe_id = nanoid()
      insertNewComponent(draft, copiedComponent)
    }),
    // 选中上一个组件
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
      // 没有选中的组件 或者 选中的组件就是第一个
      if (selectedIndex <= 0) return
      // 设置 selectedId 为上一个组件的 fe_id
      draft.selectedId = componentList[selectedIndex - 1].fe_id
    }),
    // 选中下一个组件
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
      const length = componentList.length
      // 没有选中的组件
      if (selectedIndex < 0) return
      // 当前组件已经是最后一个了
      if (selectedIndex + 1 === length) return
      // 设置 selectedId 为下一个组件的 fe_id
      draft.selectedId = componentList[selectedIndex + 1].fe_id
    }),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copyComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
