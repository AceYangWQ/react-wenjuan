export type OptionType = {
  value: string
  label: string
}

export type QuestionRadioPropsType = {
  title?: string
  value?: string
  options?: Array<OptionType>
  isVertical?: false

  // 用于 propComponent
  onChange?: (props: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  value: '',
  options: [
    { value: 'item1', label: '选项1' },
    { value: 'item2', label: '选项2' },
    { value: 'item3', label: '选项3' },
  ],
  isVertical: false,
}
