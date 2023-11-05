export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string

  // 用于 propComponent
  onChange?: (props: QuestionTextareaPropsType) => void
  disabled?: boolean
}

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '多行输入标题',
  placeholder: '请输入...',
}
