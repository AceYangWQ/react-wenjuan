import Component from './Component'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: '输入框',
  type: 'questionInput',
  Component,
  defaultProps: QuestionInputDefaultProps,
}
