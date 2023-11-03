import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: '标题',
  type: 'questionTitle',
  Component,
  defaultProps: QuestionTitleDefaultProps,
}
