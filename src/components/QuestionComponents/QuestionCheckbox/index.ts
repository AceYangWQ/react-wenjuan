import { QuestionCheckboxDefaultProps } from './interface'
import Component from './Component'
import PropComponent from './PropComponent'

export * from './interface'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: '多选标题',
  type: 'questionCheckbox',
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
}
