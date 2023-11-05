export type QuestionInfoPropsType = {
  title?: string
  desc?: string

  // PropComponent 组件使用
  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述',
}
