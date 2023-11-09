import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,
    // 没加 undo 之前
    // components: componentsReducer,

    // 加了 undo 之后
    components: undoable(componentsReducer, {
      limit: 20, // 撤销限制在 20 步
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
})
