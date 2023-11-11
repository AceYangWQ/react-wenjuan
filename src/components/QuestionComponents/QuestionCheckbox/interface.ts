export type OptionType = {
  value: string
  label: string
  checked: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  optionList?: OptionType[]
  isVertical?: boolean

  // 用于 PropComponent
  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  optionList: [
    { value: 'item1', label: '选项1', checked: false },
    { value: 'item2', label: '选项2', checked: false },
    { value: 'item3', label: '选项3', checked: false },
  ],
  isVertical: false,
}

// 统计组件
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
