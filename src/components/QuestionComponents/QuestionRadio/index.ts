import { QuestionRadioDefaultProps } from './interface'
import Component from './Component'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'

export * from './interface'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: '单选标题',
  type: 'questionRadio',
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent,
}
