import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type PageInfoType = {
  title: string
  desc?: string
  css?: string
  js?: string
}

export const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  css: '',
  js: '',
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    // 重置页面信息
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload
    },
    // 修改页面标题
    changePageInfoTitle: produce((draft: PageInfoType, action: PayloadAction<string>) => {
      draft.title = action.payload
    }),
  },
})

export const { resetPageInfo, changePageInfoTitle } = pageInfoSlice.actions

export default pageInfoSlice.reducer
